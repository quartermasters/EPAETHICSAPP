import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { pool } from '../config/database';
import { AppError, asyncWrapper } from '../middleware/errorHandler';
import { authMiddleware } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();

// Validation rules
const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastName').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('employeeId').optional().isLength({ min: 3 }).withMessage('Employee ID must be at least 3 characters'),
];

// Helper function to generate JWT token
const generateToken = (userId: string, email: string, role: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new AppError('Server configuration error', 500);
  }

  return jwt.sign(
    { userId, email, role },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// POST /api/auth/login
router.post('/login', loginValidation, asyncWrapper(async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400);
  }

  const { email, password } = req.body;

  // Find user by email
  const userQuery = `
    SELECT id, email, password_hash, first_name, last_name, role, is_active 
    FROM users 
    WHERE email = $1
  `;
  
  const userResult = await pool.query(userQuery, [email]);
  
  if (userResult.rows.length === 0) {
    throw new AppError('Invalid credentials', 401);
  }

  const user = userResult.rows[0];

  // Check if user is active
  if (!user.is_active) {
    throw new AppError('Account is deactivated', 401);
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  // Generate token
  const token = generateToken(user.id, user.email, user.role);

  // Update last login
  await pool.query(
    'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
    [user.id]
  );

  logger.info(`User logged in: ${user.email}`);

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
      token,
    },
    message: 'Login successful',
  });
}));

// POST /api/auth/register
router.post('/register', registerValidation, asyncWrapper(async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400);
  }

  const { email, password, firstName, lastName, department, employeeId } = req.body;

  // Check if user already exists
  const existingUserQuery = 'SELECT id FROM users WHERE email = $1';
  const existingUser = await pool.query(existingUserQuery, [email]);
  
  if (existingUser.rows.length > 0) {
    throw new AppError('User with this email already exists', 409);
  }

  // Check if employee ID already exists (if provided)
  if (employeeId) {
    const existingEmployeeQuery = 'SELECT id FROM users WHERE employee_id = $1';
    const existingEmployee = await pool.query(existingEmployeeQuery, [employeeId]);
    
    if (existingEmployee.rows.length > 0) {
      throw new AppError('User with this employee ID already exists', 409);
    }
  }

  // Hash password
  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create user
  const insertUserQuery = `
    INSERT INTO users (email, password_hash, first_name, last_name, department, employee_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, email, first_name, last_name, role, department, employee_id
  `;
  
  const newUser = await pool.query(insertUserQuery, [
    email,
    passwordHash,
    firstName,
    lastName,
    department || null,
    employeeId || null,
  ]);

  const user = newUser.rows[0];

  // Generate token
  const token = generateToken(user.id, user.email, user.role);

  logger.info(`New user registered: ${user.email}`);

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        department: user.department,
        employeeId: user.employee_id,
      },
      token,
    },
    message: 'Registration successful',
  });
}));

// GET /api/auth/me
router.get('/me', authMiddleware, asyncWrapper(async (req, res) => {
  const user = (req as any).user;
  
  res.json({
    success: true,
    data: user,
    message: 'User profile retrieved successfully',
  });
}));

// POST /api/auth/logout
router.post('/logout', authMiddleware, asyncWrapper(async (req, res) => {
  // In a JWT-based system, logout is handled client-side by removing the token
  // Here we just log the action and return success
  const user = (req as any).user;
  
  logger.info(`User logged out: ${user.email}`);
  
  res.json({
    success: true,
    message: 'Logout successful',
  });
}));

// POST /api/auth/change-password
router.post('/change-password', 
  authMiddleware,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
  ],
  asyncWrapper(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new AppError('Validation failed', 400);
    }

    const { currentPassword, newPassword } = req.body;
    const user = (req as any).user;

    // Get current password hash
    const userQuery = 'SELECT password_hash FROM users WHERE id = $1';
    const userResult = await pool.query(userQuery, [user.id]);
    
    if (userResult.rows.length === 0) {
      throw new AppError('User not found', 404);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userResult.rows[0].password_hash);
    
    if (!isCurrentPasswordValid) {
      throw new AppError('Current password is incorrect', 400);
    }

    // Hash new password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await pool.query(
      'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [newPasswordHash, user.id]
    );

    logger.info(`Password changed for user: ${user.email}`);

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  })
);

export default router;