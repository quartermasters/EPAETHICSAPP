import express from 'express';
import { param, query, validationResult } from 'express-validator';
import { pool } from '../config/database';
import { AppError, asyncWrapper } from '../middleware/errorHandler';
import { requireRole } from '../middleware/auth';

const router = express.Router();

// GET /api/progress - Get user's progress across all modules
router.get('/', asyncWrapper(async (req, res) => {
  const user = (req as any).user;

  const progressQuery = `
    SELECT 
      up.id,
      up.module_id,
      up.status,
      up.progress_percentage,
      up.started_at,
      up.completed_at,
      up.time_spent,
      up.created_at,
      up.updated_at,
      tm.title as module_title,
      tm.description as module_description,
      tm.module_order,
      tm.estimated_duration,
      tm.is_required
    FROM user_progress up
    JOIN training_modules tm ON up.module_id = tm.id
    WHERE up.user_id = $1 AND tm.is_active = true
    ORDER BY tm.module_order ASC
  `;
  
  const result = await pool.query(progressQuery, [user.id]);
  
  res.json({
    success: true,
    data: result.rows,
    message: 'User progress retrieved successfully',
  });
}));

// GET /api/progress/summary - Get progress summary statistics
router.get('/summary', asyncWrapper(async (req, res) => {
  const user = (req as any).user;

  const summaryQuery = `
    SELECT 
      COUNT(*) as total_modules,
      COUNT(CASE WHEN up.status = 'completed' THEN 1 END) as completed_modules,
      COUNT(CASE WHEN up.status = 'in_progress' THEN 1 END) as in_progress_modules,
      COUNT(CASE WHEN up.status = 'not_started' OR up.id IS NULL THEN 1 END) as not_started_modules,
      COALESCE(AVG(CASE WHEN up.status = 'completed' THEN up.progress_percentage END), 0) as average_completion,
      COALESCE(SUM(up.time_spent), 0) as total_time_spent,
      COUNT(CASE WHEN tm.is_required = true AND up.status = 'completed' THEN 1 END) as required_completed,
      COUNT(CASE WHEN tm.is_required = true THEN 1 END) as total_required
    FROM training_modules tm
    LEFT JOIN user_progress up ON tm.id = up.module_id AND up.user_id = $1
    WHERE tm.is_active = true
  `;
  
  const result = await pool.query(summaryQuery, [user.id]);
  const summary = result.rows[0];

  // Calculate overall completion percentage
  const overallCompletion = summary.total_modules > 0 
    ? Math.round((summary.completed_modules / summary.total_modules) * 100)
    : 0;

  // Calculate required modules completion percentage
  const requiredCompletion = summary.total_required > 0
    ? Math.round((summary.required_completed / summary.total_required) * 100)
    : 0;

  res.json({
    success: true,
    data: {
      ...summary,
      overall_completion_percentage: overallCompletion,
      required_completion_percentage: requiredCompletion,
      total_modules: parseInt(summary.total_modules),
      completed_modules: parseInt(summary.completed_modules),
      in_progress_modules: parseInt(summary.in_progress_modules),
      not_started_modules: parseInt(summary.not_started_modules),
      required_completed: parseInt(summary.required_completed),
      total_required: parseInt(summary.total_required),
      total_time_spent: parseInt(summary.total_time_spent),
    },
    message: 'Progress summary retrieved successfully',
  });
}));

// GET /api/progress/leaderboard - Get leaderboard (optional feature)
router.get('/leaderboard', asyncWrapper(async (req, res) => {
  const { limit = 10 } = req.query;

  const leaderboardQuery = `
    SELECT 
      u.first_name,
      u.last_name,
      u.department,
      COUNT(CASE WHEN up.status = 'completed' THEN 1 END) as completed_modules,
      COALESCE(SUM(up.time_spent), 0) as total_time_spent,
      ROUND(AVG(CASE WHEN up.status = 'completed' THEN up.progress_percentage END), 2) as average_score
    FROM users u
    LEFT JOIN user_progress up ON u.id = up.user_id
    WHERE u.is_active = true
    GROUP BY u.id, u.first_name, u.last_name, u.department
    HAVING COUNT(CASE WHEN up.status = 'completed' THEN 1 END) > 0
    ORDER BY completed_modules DESC, total_time_spent ASC
    LIMIT $1
  `;
  
  const result = await pool.query(leaderboardQuery, [limit]);
  
  res.json({
    success: true,
    data: result.rows,
    message: 'Leaderboard retrieved successfully',
  });
}));

// GET /api/progress/:moduleId - Get progress for specific module
router.get('/:moduleId',
  [param('moduleId').isUUID().withMessage('Invalid module ID')],
  asyncWrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400);
    }

    const { moduleId } = req.params;
    const user = (req as any).user;

    const progressQuery = `
      SELECT 
        up.id,
        up.module_id,
        up.status,
        up.progress_percentage,
        up.started_at,
        up.completed_at,
        up.time_spent,
        up.created_at,
        up.updated_at,
        tm.title as module_title,
        tm.description as module_description,
        tm.estimated_duration
      FROM user_progress up
      JOIN training_modules tm ON up.module_id = tm.id
      WHERE up.user_id = $1 AND up.module_id = $2 AND tm.is_active = true
    `;
    
    const result = await pool.query(progressQuery, [user.id, moduleId]);
    
    if (result.rows.length === 0) {
      // Check if module exists
      const moduleCheck = await pool.query(
        'SELECT id FROM training_modules WHERE id = $1 AND is_active = true',
        [moduleId]
      );
      
      if (moduleCheck.rows.length === 0) {
        throw new AppError('Training module not found', 404);
      }
      
      // Module exists but no progress record
      return res.json({
        success: true,
        data: null,
        message: 'No progress found for this module',
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0],
      message: 'Module progress retrieved successfully',
    });
  })
);

// GET /api/progress/admin/overview - Admin overview of all user progress
router.get('/admin/overview',
  requireRole(['admin']),
  asyncWrapper(async (req, res) => {
    const { department, status, moduleId } = req.query;

    let whereClause = 'WHERE tm.is_active = true AND u.is_active = true';
    const params: any[] = [];
    let paramCount = 1;

    if (department) {
      whereClause += ` AND u.department = $${paramCount}`;
      params.push(department);
      paramCount++;
    }

    if (status) {
      whereClause += ` AND up.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (moduleId) {
      whereClause += ` AND tm.id = $${paramCount}`;
      params.push(moduleId);
      paramCount++;
    }

    const overviewQuery = `
      SELECT 
        u.id as user_id,
        u.first_name,
        u.last_name,
        u.email,
        u.department,
        u.employee_id,
        tm.id as module_id,
        tm.title as module_title,
        tm.module_order,
        COALESCE(up.status, 'not_started') as status,
        COALESCE(up.progress_percentage, 0) as progress_percentage,
        up.started_at,
        up.completed_at,
        COALESCE(up.time_spent, 0) as time_spent
      FROM users u
      CROSS JOIN training_modules tm
      LEFT JOIN user_progress up ON u.id = up.user_id AND tm.id = up.module_id
      ${whereClause}
      ORDER BY u.last_name, u.first_name, tm.module_order
    `;
    
    const result = await pool.query(overviewQuery, params);
    
    // Get summary statistics
    const statsQuery = `
      SELECT 
        COUNT(DISTINCT u.id) as total_users,
        COUNT(DISTINCT tm.id) as total_modules,
        COUNT(CASE WHEN up.status = 'completed' THEN 1 END) as total_completions,
        COUNT(CASE WHEN up.status = 'in_progress' THEN 1 END) as total_in_progress,
        ROUND(AVG(CASE WHEN up.status = 'completed' THEN up.progress_percentage END), 2) as average_completion_score
      FROM users u
      CROSS JOIN training_modules tm
      LEFT JOIN user_progress up ON u.id = up.user_id AND tm.id = up.module_id
      ${whereClause}
    `;
    
    const statsResult = await pool.query(statsQuery, params);
    
    res.json({
      success: true,
      data: {
        progress: result.rows,
        statistics: statsResult.rows[0],
      },
      message: 'Admin progress overview retrieved successfully',
    });
  })
);

// GET /api/progress/admin/export - Export progress data (Admin only)
router.get('/admin/export',
  requireRole(['admin']),
  asyncWrapper(async (req, res) => {
    const exportQuery = `
      SELECT 
        u.employee_id,
        u.first_name,
        u.last_name,
        u.email,
        u.department,
        tm.title as module_title,
        tm.module_order,
        tm.is_required,
        COALESCE(up.status, 'not_started') as status,
        COALESCE(up.progress_percentage, 0) as progress_percentage,
        up.started_at,
        up.completed_at,
        COALESCE(up.time_spent, 0) as time_spent_minutes
      FROM users u
      CROSS JOIN training_modules tm
      LEFT JOIN user_progress up ON u.id = up.user_id AND tm.id = up.module_id
      WHERE tm.is_active = true AND u.is_active = true
      ORDER BY u.department, u.last_name, u.first_name, tm.module_order
    `;
    
    const result = await pool.query(exportQuery);
    
    // Set CSV headers
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=ethics_training_progress.csv');
    
    // Create CSV content
    const headers = [
      'Employee ID',
      'First Name', 
      'Last Name',
      'Email',
      'Department',
      'Module Title',
      'Module Order',
      'Required',
      'Status',
      'Progress %',
      'Started At',
      'Completed At',
      'Time Spent (Minutes)'
    ];
    
    let csvContent = headers.join(',') + '\n';
    
    result.rows.forEach(row => {
      const csvRow = [
        row.employee_id || '',
        row.first_name,
        row.last_name,
        row.email,
        row.department || '',
        `"${row.module_title}"`,
        row.module_order,
        row.is_required ? 'Yes' : 'No',
        row.status,
        row.progress_percentage,
        row.started_at ? row.started_at.toISOString() : '',
        row.completed_at ? row.completed_at.toISOString() : '',
        row.time_spent_minutes
      ];
      csvContent += csvRow.join(',') + '\n';
    });
    
    res.send(csvContent);
  })
);

export default router;