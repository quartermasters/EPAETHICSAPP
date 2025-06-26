const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(compression());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3003', 'http://localhost:19006', 'http://localhost:19007'],
    credentials: true
}));
app.use(express.json());
app.use(morgan('combined'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        developer: 'St. Michael Enterprises LLC - EPA Contract 68HERD25Q0050',
        service: 'EPA Ethics Backend API',
        version: '1.0.0'
    });
});

// Sample ethics content endpoints
app.get('/api/content/modules', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 1,
                title: "Federal Ethics Basics",
                description: "Introduction to the 14 principles of ethical conduct for federal employees",
                estimatedTime: "25 minutes",
                status: "available"
            },
            {
                id: 2,
                title: "Conflict of Interest Rules",
                description: "Understanding financial and personal conflicts of interest",
                estimatedTime: "30 minutes", 
                status: "available"
            },
            {
                id: 3,
                title: "Gift and Travel Restrictions",
                description: "The $20 rule and exceptions for federal employees",
                estimatedTime: "35 minutes",
                status: "available"
            }
        ]
    });
});

app.get('/api/content/quiz', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 1,
                question: "What is the maximum value of a gift a federal employee can accept from a non-federal source?",
                category: "Gift Rules",
                type: "multiple-choice"
            },
            {
                id: 2,
                question: "When must a federal employee file a financial disclosure report?",
                category: "Financial Disclosure",
                type: "multiple-choice"
            }
        ]
    });
});

app.get('/api/content/videos', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 1,
                title: "EPA Ethics Overview",
                description: "Comprehensive introduction to EPA ethics requirements",
                duration: "15:30",
                category: "General"
            },
            {
                id: 2,
                title: "Identifying Conflicts of Interest", 
                description: "How to recognize and handle potential conflicts",
                duration: "12:45",
                category: "Conflicts"
            }
        ]
    });
});

app.get('/api/content/faq', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 1,
                question: "What should I do if I'm offered a gift?",
                answer: "Gifts from non-federal sources are generally limited to $20 per source per occasion, with annual limits."
            },
            {
                id: 2,
                question: "Can I accept speaking fees?",
                answer: "Federal employees generally cannot accept compensation for speaking engagements related to their official duties."
            }
        ]
    });
});

app.get('/api/content/glossary', (req, res) => {
    res.json({
        success: true,
        data: [
            {
                id: 1,
                term: "Conflict of Interest",
                definition: "A situation where personal interests could inappropriately influence official duties."
            },
            {
                id: 2,
                term: "Financial Disclosure",
                definition: "Required reporting of financial interests that could create conflicts of interest."
            }
        ]
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('======================================================================');
    console.log('  EPA ETHICS BACKEND API - DEMO MODE');
    console.log('  Contract: EPA 68HERD25Q0050');
    console.log('  Developer: St. Michael Enterprises LLC');
    console.log('======================================================================');
    console.log(`  Backend API running on port ${PORT}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`  API Endpoints: http://localhost:${PORT}/api/`);
    console.log('======================================================================');
});

module.exports = app;
