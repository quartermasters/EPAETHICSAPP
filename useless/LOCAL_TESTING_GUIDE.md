# EPA Ethics App - Local Testing Guide

## 🚀 Quick Start Guide

This guide will help you run and test the EPA Ethics App locally on your development machine.

---

## 📋 Prerequisites

### Required Software
```bash
# Node.js (v18 or higher)
node --version  # Should be 18.0.0 or higher
npm --version   # Should be 8.0.0 or higher

# Git
git --version

# For mobile development (optional)
# iOS: Xcode (Mac only)
# Android: Android Studio
```

### Install Node.js (if needed)
- **Windows/Mac**: Download from [nodejs.org](https://nodejs.org/)
- **Using package managers**:
  ```bash
  # Windows (using Chocolatey)
  choco install nodejs
  
  # Mac (using Homebrew)
  brew install node
  
  # Linux (Ubuntu/Debian)
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

---

## 🏗️ Setup Instructions

### 1. Navigate to Project Directory
```bash
cd /mnt/d/EPAETHICSAPP
# Or wherever you have the project files
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install admin portal dependencies
cd admin-portal
npm install
cd ..

# Install mobile app dependencies
cd mobile
npm install
cd ..
```

### 3. Environment Setup

#### Backend Environment Variables
```bash
# Create backend/.env file
cd backend
cat > .env << EOF
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=epa_ethics_dev
DB_USER=postgres
DB_PASSWORD=password

JWT_SECRET=your-jwt-secret-here-dev
SESSION_SECRET=your-session-secret-here-dev
ENCRYPTION_KEY=your-encryption-key-here-dev

ALLOWED_ORIGINS=http://localhost:3000,http://localhost:19006

# For local development
LOG_LEVEL=debug
RATE_LIMIT_MAX=1000
EOF
cd ..
```

#### Admin Portal Environment Variables
```bash
# Create admin-portal/.env.local file
cd admin-portal
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here-dev
NODE_ENV=development
EOF
cd ..
```

---

## 🗄️ Database Setup (Optional for Testing)

### Option 1: Use SQLite (Easiest)
```bash
# Backend will automatically create SQLite database for development
# No additional setup needed
```

### Option 2: Use PostgreSQL (Recommended)
```bash
# Install PostgreSQL
# Windows: Download from postgresql.org
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
sudo -u postgres psql
CREATE DATABASE epa_ethics_dev;
CREATE USER epa_user WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE epa_ethics_dev TO epa_user;
\q
```

---

## 🚀 Running the Applications

### Method 1: Run All Components Simultaneously
```bash
# From project root
npm run dev:all
```

### Method 2: Run Components Individually

#### Terminal 1 - Backend API
```bash
cd backend
npm run dev
# Backend will run on http://localhost:3001
```

#### Terminal 2 - Admin Portal
```bash
cd admin-portal
npm run dev
# Admin portal will run on http://localhost:3000
```

#### Terminal 3 - Mobile App (Web Version)
```bash
cd mobile
npm start
# Mobile app will run on http://localhost:19006
```

---

## 📱 Testing the Mobile App

### Web Browser Testing
1. Open http://localhost:19006
2. Use browser developer tools to simulate mobile devices
3. Test different screen sizes and orientations

### iOS Simulator (Mac Only)
```bash
cd mobile
npm run ios
# Requires Xcode to be installed
```

### Android Emulator
```bash
cd mobile
npm run android
# Requires Android Studio and emulator setup
```

### Physical Device Testing
```bash
cd mobile
# Install Expo Go app on your phone
# Scan QR code from terminal output
npm start
```

---

## 🌐 Testing the Admin Portal

### Access Points
- **URL**: http://localhost:3000
- **Test Login**: 
  - Username: `admin`
  - Password: `TestPassword123!`
  - MFA Code: `123456` (for testing)

### Test Features
1. **Authentication Flow**
   - Login with credentials
   - MFA verification
   - Session management

2. **Content Management**
   - View ethics modules
   - Manage quiz questions
   - Upload training videos
   - Edit FAQ and glossary

3. **User Management**
   - View user accounts
   - Manage permissions
   - Audit logs

---

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm test
npm run test:coverage
```

### Admin Portal Tests
```bash
cd admin-portal
npm test
npm run test:e2e
```

### Mobile App Tests
```bash
cd mobile
npm test
```

### Integration Tests
```bash
# From project root
npm run test:integration
```

### Accessibility Tests
```bash
npm run test:accessibility
```

---

## 🔍 API Testing

### Using curl
```bash
# Health check
curl http://localhost:3001/api/health

# Get ethics modules
curl http://localhost:3001/api/content/modules

# Get quiz questions
curl http://localhost:3001/api/content/quiz
```

### Using Postman
1. Import the API collection from `tests/postman/`
2. Set environment variables:
   - `base_url`: http://localhost:3001
   - `admin_url`: http://localhost:3000

### API Endpoints to Test
```
GET  /api/health              - Health check
GET  /api/content/modules     - Ethics modules
GET  /api/content/quiz        - Quiz questions
GET  /api/content/videos      - Training videos
GET  /api/content/faq         - FAQ items
GET  /api/content/glossary    - Glossary terms
POST /api/auth/login          - Admin login
GET  /api/admin/users         - User management (requires auth)
```

---

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill processes on specific ports
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

#### Node Modules Issues
```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Or use npm cache clean
npm cache clean --force
npm install
```

#### Database Connection Issues
```bash
# Check if PostgreSQL is running
# Windows: Check Services
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Reset database
npm run migrate:reset
npm run seed
```

#### Mobile App Not Loading
```bash
# Clear Expo cache
cd mobile
npx expo start --clear

# Reset Metro bundler cache
npx react-native start --reset-cache
```

### Environment Issues
```bash
# Check Node.js version
node --version  # Should be 18+

# Check npm version
npm --version   # Should be 8+

# Update npm if needed
npm install -g npm@latest
```

---

## 📊 Performance Testing

### Load Testing
```bash
# Install k6
npm install -g k6

# Run load tests
cd tests/performance
k6 run api-load-test.js
```

### Bundle Size Analysis
```bash
cd admin-portal
npm run analyze

cd mobile
npx expo build:web --analyze
```

---

## 🛡️ Security Testing

### Vulnerability Scanning
```bash
# Audit npm dependencies
npm audit
npm audit fix

# Run security tests
npm run security:scan
```

### SSL/HTTPS Testing (Production)
```bash
# Test SSL configuration
openssl s_client -connect localhost:3001 -servername localhost
```

---

## 📱 Device-Specific Testing

### iOS Testing Checklist
- [ ] Safari browser compatibility
- [ ] VoiceOver screen reader
- [ ] iOS accessibility features
- [ ] Portrait/landscape orientation
- [ ] Different iPhone screen sizes

### Android Testing Checklist
- [ ] Chrome browser compatibility
- [ ] TalkBack screen reader
- [ ] Android accessibility features
- [ ] Portrait/landscape orientation
- [ ] Different Android screen sizes

### Desktop Testing Checklist
- [ ] Chrome, Firefox, Safari, Edge
- [ ] Keyboard navigation
- [ ] Screen reader compatibility (NVDA, JAWS)
- [ ] High contrast mode
- [ ] Zoom functionality (up to 200%)

---

## 📝 Test Data

### Sample Users
```json
{
  "admin": {
    "username": "admin",
    "password": "TestPassword123!",
    "role": "admin",
    "mfaEnabled": true
  },
  "content_manager": {
    "username": "content_mgr",
    "password": "TestPassword123!",
    "role": "content_manager",
    "mfaEnabled": false
  }
}
```

### Test Content
- 5 Ethics modules with complete content
- 6 Quiz questions with explanations
- 6 Training videos (placeholder data)
- 20+ FAQ items
- 15+ Glossary terms

---

## 🚦 Success Criteria

### ✅ Backend API
- [ ] All endpoints respond with 200 status
- [ ] Health check passes
- [ ] Authentication works
- [ ] Data CRUD operations function
- [ ] Security headers present

### ✅ Admin Portal
- [ ] Login flow completes
- [ ] All pages load without errors
- [ ] Content management works
- [ ] Responsive design functions
- [ ] Accessibility tests pass

### ✅ Mobile App
- [ ] App loads on all screen sizes
- [ ] Navigation works smoothly
- [ ] All content displays correctly
- [ ] Accessibility features work
- [ ] Offline mode functions

### ✅ Integration
- [ ] Frontend communicates with backend
- [ ] Real-time updates work
- [ ] Error handling functions
- [ ] Performance is acceptable
- [ ] Security measures active

---

## 📞 Getting Help

### Common Commands Reference
```bash
# Start everything
npm run dev:all

# Run tests
npm run test:all

# Build for production
npm run build:all

# Check code quality
npm run lint:all

# Security scan
npm run security:scan

# Accessibility test
npm run test:accessibility
```

### Log Files
- Backend: `backend/logs/app.log`
- Admin Portal: Browser Developer Console
- Mobile: Metro bundler output

### Support
- Check `TROUBLESHOOTING.md` for specific issues
- Review error logs in respective directories
- Ensure all environment variables are set correctly

---

**Happy Testing! 🎉**

*This guide covers local development testing. For production deployment, refer to `DEPLOYMENT_GUIDE.md`.*