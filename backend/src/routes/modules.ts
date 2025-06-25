import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { pool } from '../config/database';
import { AppError, asyncWrapper } from '../middleware/errorHandler';
import { requireRole } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();

// GET /api/modules - Get all training modules
router.get('/', asyncWrapper(async (req, res) => {
  const modulesQuery = `
    SELECT 
      id, 
      title, 
      description, 
      content,
      module_order, 
      estimated_duration, 
      is_required, 
      is_active,
      created_at,
      updated_at
    FROM training_modules 
    WHERE is_active = true
    ORDER BY module_order ASC
  `;
  
  const result = await pool.query(modulesQuery);
  
  res.json({
    success: true,
    data: result.rows,
    message: 'Training modules retrieved successfully',
  });
}));

// GET /api/modules/:id - Get specific training module
router.get('/:id', 
  [param('id').isUUID().withMessage('Invalid module ID')],
  asyncWrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400);
    }

    const { id } = req.params;
    const user = (req as any).user;

    // Get module details
    const moduleQuery = `
      SELECT 
        id, 
        title, 
        description, 
        content,
        module_order, 
        estimated_duration, 
        is_required, 
        is_active,
        created_at,
        updated_at
      FROM training_modules 
      WHERE id = $1 AND is_active = true
    `;
    
    const moduleResult = await pool.query(moduleQuery, [id]);
    
    if (moduleResult.rows.length === 0) {
      throw new AppError('Training module not found', 404);
    }

    const module = moduleResult.rows[0];

    // Get user's progress for this module
    const progressQuery = `
      SELECT 
        status, 
        progress_percentage, 
        started_at, 
        completed_at, 
        time_spent
      FROM user_progress 
      WHERE user_id = $1 AND module_id = $2
    `;
    
    const progressResult = await pool.query(progressQuery, [user.id, id]);
    const progress = progressResult.rows[0] || null;

    // Get associated quiz
    const quizQuery = `
      SELECT 
        id, 
        title, 
        description, 
        passing_score, 
        max_attempts, 
        time_limit
      FROM quizzes 
      WHERE module_id = $1 AND is_active = true
    `;
    
    const quizResult = await pool.query(quizQuery, [id]);
    const quiz = quizResult.rows[0] || null;

    res.json({
      success: true,
      data: {
        ...module,
        progress,
        quiz,
      },
      message: 'Training module retrieved successfully',
    });
  })
);

// POST /api/modules/:id/start - Start a training module
router.post('/:id/start',
  [param('id').isUUID().withMessage('Invalid module ID')],
  asyncWrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400);
    }

    const { id } = req.params;
    const user = (req as any).user;

    // Check if module exists
    const moduleQuery = 'SELECT id FROM training_modules WHERE id = $1 AND is_active = true';
    const moduleResult = await pool.query(moduleQuery, [id]);
    
    if (moduleResult.rows.length === 0) {
      throw new AppError('Training module not found', 404);
    }

    // Check if progress already exists
    const existingProgressQuery = 'SELECT id, status FROM user_progress WHERE user_id = $1 AND module_id = $2';
    const existingProgress = await pool.query(existingProgressQuery, [user.id, id]);

    let progress;

    if (existingProgress.rows.length > 0) {
      // Update existing progress
      const updateQuery = `
        UPDATE user_progress 
        SET 
          status = 'in_progress',
          started_at = COALESCE(started_at, CURRENT_TIMESTAMP),
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1 AND module_id = $2
        RETURNING *
      `;
      
      const updateResult = await pool.query(updateQuery, [user.id, id]);
      progress = updateResult.rows[0];
    } else {
      // Create new progress record
      const insertQuery = `
        INSERT INTO user_progress (user_id, module_id, status, started_at)
        VALUES ($1, $2, 'in_progress', CURRENT_TIMESTAMP)
        RETURNING *
      `;
      
      const insertResult = await pool.query(insertQuery, [user.id, id]);
      progress = insertResult.rows[0];
    }

    logger.info(`User ${user.id} started module ${id}`);

    res.json({
      success: true,
      data: progress,
      message: 'Training module started successfully',
    });
  })
);

// PUT /api/modules/:id/progress - Update module progress
router.put('/:id/progress',
  [
    param('id').isUUID().withMessage('Invalid module ID'),
    body('progressPercentage').isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
    body('timeSpent').optional().isInt({ min: 0 }).withMessage('Time spent must be a positive number'),
    body('status').optional().isIn(['not_started', 'in_progress', 'completed']).withMessage('Invalid status'),
  ],
  asyncWrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400);
    }

    const { id } = req.params;
    const { progressPercentage, timeSpent, status } = req.body;
    const user = (req as any).user;

    // Check if module exists
    const moduleQuery = 'SELECT id FROM training_modules WHERE id = $1 AND is_active = true';
    const moduleResult = await pool.query(moduleQuery, [id]);
    
    if (moduleResult.rows.length === 0) {
      throw new AppError('Training module not found', 404);
    }

    // Determine final status
    let finalStatus = status;
    if (progressPercentage === 100 && !status) {
      finalStatus = 'completed';
    } else if (progressPercentage > 0 && !status) {
      finalStatus = 'in_progress';
    }

    // Update progress
    const updateQuery = `
      UPDATE user_progress 
      SET 
        progress_percentage = $3,
        time_spent = COALESCE($4, time_spent),
        status = COALESCE($5, status),
        completed_at = CASE 
          WHEN $5 = 'completed' OR ($3 = 100 AND status != 'completed') 
          THEN CURRENT_TIMESTAMP 
          ELSE completed_at 
        END,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1 AND module_id = $2
      RETURNING *
    `;
    
    const result = await pool.query(updateQuery, [
      user.id, 
      id, 
      progressPercentage, 
      timeSpent, 
      finalStatus
    ]);

    if (result.rows.length === 0) {
      throw new AppError('Progress record not found. Please start the module first.', 404);
    }

    const progress = result.rows[0];

    logger.info(`User ${user.id} updated progress for module ${id}: ${progressPercentage}%`);

    res.json({
      success: true,
      data: progress,
      message: 'Progress updated successfully',
    });
  })
);

// POST /api/modules - Create new training module (Admin only)
router.post('/',
  requireRole(['admin']),
  [
    body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    body('description').optional().trim(),
    body('content').isObject().withMessage('Content must be a valid JSON object'),
    body('moduleOrder').isInt({ min: 1 }).withMessage('Module order must be a positive integer'),
    body('estimatedDuration').isInt({ min: 1 }).withMessage('Estimated duration must be a positive integer'),
    body('isRequired').optional().isBoolean().withMessage('isRequired must be a boolean'),
  ],
  asyncWrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400);
    }

    const { title, description, content, moduleOrder, estimatedDuration, isRequired } = req.body;

    const insertQuery = `
      INSERT INTO training_modules (
        title, 
        description, 
        content, 
        module_order, 
        estimated_duration, 
        is_required
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const result = await pool.query(insertQuery, [
      title,
      description || null,
      JSON.stringify(content),
      moduleOrder,
      estimatedDuration,
      isRequired || true,
    ]);

    const module = result.rows[0];

    logger.info(`Admin created new training module: ${module.title}`);

    res.status(201).json({
      success: true,
      data: module,
      message: 'Training module created successfully',
    });
  })
);

// PUT /api/modules/:id - Update training module (Admin only)
router.put('/:id',
  requireRole(['admin']),
  [
    param('id').isUUID().withMessage('Invalid module ID'),
    body('title').optional().trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    body('description').optional().trim(),
    body('content').optional().isObject().withMessage('Content must be a valid JSON object'),
    body('moduleOrder').optional().isInt({ min: 1 }).withMessage('Module order must be a positive integer'),
    body('estimatedDuration').optional().isInt({ min: 1 }).withMessage('Estimated duration must be a positive integer'),
    body('isRequired').optional().isBoolean().withMessage('isRequired must be a boolean'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  ],
  asyncWrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400);
    }

    const { id } = req.params;
    const updates = req.body;

    // Build dynamic update query
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach((key) => {
      const dbField = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      if (key === 'content') {
        fields.push(`${dbField} = $${paramCount}`);
        values.push(JSON.stringify(updates[key]));
      } else {
        fields.push(`${dbField} = $${paramCount}`);
        values.push(updates[key]);
      }
      paramCount++;
    });

    if (fields.length === 0) {
      throw new AppError('No valid fields to update', 400);
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const updateQuery = `
      UPDATE training_modules 
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(updateQuery, values);

    if (result.rows.length === 0) {
      throw new AppError('Training module not found', 404);
    }

    const module = result.rows[0];

    logger.info(`Admin updated training module: ${module.title}`);

    res.json({
      success: true,
      data: module,
      message: 'Training module updated successfully',
    });
  })
);

// DELETE /api/modules/:id - Delete training module (Admin only)
router.delete('/:id',
  requireRole(['admin']),
  [param('id').isUUID().withMessage('Invalid module ID')],
  asyncWrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400);
    }

    const { id } = req.params;

    // Soft delete by setting is_active to false
    const deleteQuery = `
      UPDATE training_modules 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING title
    `;

    const result = await pool.query(deleteQuery, [id]);

    if (result.rows.length === 0) {
      throw new AppError('Training module not found', 404);
    }

    logger.info(`Admin deleted training module: ${result.rows[0].title}`);

    res.json({
      success: true,
      message: 'Training module deleted successfully',
    });
  })
);

export default router;