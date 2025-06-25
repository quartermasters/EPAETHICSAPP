// EPA Ethics App Backend - Simplified for Local Testing
// Developed by St. Michael Enterprises LLC - EPA Contract 68HERD25Q0050

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false // Simplified for development
}));

// CORS for local development
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:19006'],
  credentials: true
}));

// Body parsing and compression
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'EPA Ethics Backend API',
    developer: 'St. Michael Enterprises LLC',
    contract: '68HERD25Q0050'
  });
});

// Mock Ethics Modules API
app.get('/api/content/modules', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Gift Ethics',
        description: 'Rules about accepting gifts, meals, and entertainment',
        category: 'Gift Ethics',
        icon: 'gift-outline',
        estimatedTime: '5 min read',
        order: 1,
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Financial Conflicts',
        description: 'Managing financial interests and investments',
        category: 'Financial Ethics',
        icon: 'cash-outline',
        estimatedTime: '7 min read',
        order: 2,
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Outside Activities',
        description: 'Rules for employment, speaking, and teaching',
        category: 'Outside Activities',
        icon: 'briefcase-outline',
        estimatedTime: '6 min read',
        order: 3,
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Use of Position',
        description: 'Proper use of government position and resources',
        category: 'Resource Use',
        icon: 'shield-outline',
        estimatedTime: '8 min read',
        order: 4,
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Post-Employment',
        description: 'Restrictions after leaving government service',
        category: 'Post-Employment',
        icon: 'exit-outline',
        estimatedTime: '9 min read',
        order: 5,
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  });
});

// Mock Quiz Questions API
app.get('/api/content/quiz', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        question: 'What is the general dollar limit for gifts that federal employees can accept from prohibited sources?',
        options: ['$10', '$20', '$50', '$100'],
        correctAnswer: 1,
        explanation: 'Federal employees generally cannot accept gifts worth $20 or more from prohibited sources.',
        category: 'Gift Ethics',
        difficulty: 'Beginner',
        order: 1,
        isActive: true
      },
      {
        id: '2',
        question: 'Which of the following would create a financial conflict of interest requiring recusal?',
        options: [
          'Owning $500 worth of stock in a company affected by your decision',
          'Owning $15,000 worth of stock in a company affected by your decision',
          'Having a savings account at a bank affected by your decision',
          'Owning shares in a widely diversified mutual fund'
        ],
        correctAnswer: 1,
        explanation: 'The $15,000 threshold applies to individual holdings.',
        category: 'Financial Conflicts',
        difficulty: 'Intermediate',
        order: 2,
        isActive: true
      },
      {
        id: '3',
        question: 'Can federal employees use government computers for personal email?',
        options: [
          'Yes, unlimited personal use is allowed',
          'Yes, but only during lunch breaks',
          'Limited personal use may be permitted',
          'No, absolutely no personal use is allowed'
        ],
        correctAnswer: 2,
        explanation: 'Limited personal use may be permitted, but policies vary by agency.',
        category: 'Use of Position',
        difficulty: 'Beginner',
        order: 3,
        isActive: true
      }
    ]
  });
});

// Mock Training Videos API
app.get('/api/content/videos', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'Gift and Travel Ethics',
        description: 'Learn about federal rules for accepting gifts, meals, and travel from outside sources.',
        duration: '12:45',
        category: 'Gift Ethics',
        difficulty: 'Beginner',
        releaseDate: new Date().toISOString(),
        isPublished: true
      },
      {
        id: '2',
        title: 'Financial Conflicts of Interest',
        description: 'Understanding financial conflicts and how to properly manage investments.',
        duration: '15:30',
        category: 'Financial Ethics',
        difficulty: 'Intermediate',
        releaseDate: new Date().toISOString(),
        isPublished: true
      }
    ]
  });
});

// Mock FAQ API
app.get('/api/content/faq', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        question: 'Can I accept a coffee from a contractor?',
        answer: 'Generally no, if the coffee costs more than $20 or if you would exceed the $50 annual limit from that source.',
        category: 'Gifts',
        order: 1,
        isPublished: true
      },
      {
        id: '2',
        question: 'Do I need to report stock investments to my ethics advisor?',
        answer: 'You should report any financial interests that could be affected by your official duties, particularly if they exceed $15,000 in value.',
        category: 'Financial',
        order: 2,
        isPublished: true
      }
    ]
  });
});

// Mock Glossary API
app.get('/api/content/glossary', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        term: 'Prohibited Source',
        definition: 'Any person or organization that seeks official action from your agency or does business with your agency.',
        category: 'General',
        isPublished: true
      },
      {
        id: '2',
        term: 'Financial Interest',
        definition: 'Any current or contingent ownership, equity, or security interest in an entity.',
        category: 'Financial',
        isPublished: true
      }
    ]
  });
});

// Mock Authentication API
app.post('/api/auth/login', (req, res) => {
  const { username, password, mfaCode } = req.body;
  
  // Mock authentication
  if (username === 'admin' && password === 'TestPassword123!') {
    if (!mfaCode) {
      return res.json({
        success: false,
        mfaRequired: true,
        message: 'MFA code required'
      });
    }
    
    if (mfaCode === '123456') {
      return res.json({
        success: true,
        token: 'mock-jwt-token',
        user: {
          id: '1',
          username: 'admin',
          role: 'admin',
          firstName: 'Test',
          lastName: 'Admin'
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid MFA code'
      });
    }
  }
  
  res.status(401).json({
    success: false,
    message: 'Invalid credentials'
  });
});

// Mock Admin API (protected)
app.get('/api/admin/users', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authorization required'
    });
  }
  
  res.json({
    success: true,
    data: [
      {
        id: '1',
        username: 'admin',
        email: 'admin@epa.gov',
        role: 'admin',
        isActive: true,
        lastLogin: new Date().toISOString()
      }
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('========================================');
  console.log('EPA Ethics Backend API');
  console.log('Developed by St. Michael Enterprises LLC');
  console.log('EPA Contract 68HERD25Q0050');
  console.log('========================================');
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`API Documentation: http://localhost:${PORT}/api/`);
  console.log('========================================');
});