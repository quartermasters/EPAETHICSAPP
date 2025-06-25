# EPA Ethics App - Complete Setup Guide

## 🚀 Quick Start for Evaluators and Stakeholders

This guide provides step-by-step instructions for setting up and testing the EPA Ethics mobile application.

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 18.0.0 or higher
- **npm**: Latest version (comes with Node.js)
- **Git**: For version control
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge

### Required Tools
```bash
# Check Node.js version
node --version  # Should be >= 18.0.0

# Check npm version  
npm --version

# Install Expo CLI globally (for mobile testing)
npm install -g @expo/cli
```

## 📁 Project Structure Overview

```
EPAETHICSAPP/
├── 📱 mobile/                 # React Native mobile app
├── 🖥️ admin-portal/           # Next.js admin interface  
├── 🔧 backend/                # Node.js API server
├── 📚 shared/                 # Shared components and utilities
├── 📄 Documentation/          # Project documentation
├── 📋 README.md              # Main project documentation
├── 🧪 TESTING_GUIDE.md       # Comprehensive testing instructions
└── ⚙️ SETUP_GUIDE.md         # This setup guide
```

## 🔧 Installation Process

### Step 1: Clone and Navigate
```bash
# Clone the repository (if from Git)
git clone [repository-url]
cd EPAETHICSAPP

# Or if you have the project folder
cd path/to/EPAETHICSAPP
```

### Step 2: Install Dependencies for All Components

#### Backend API Setup
```bash
cd backend
npm install

# Optional: Check backend dependencies
npm list
```

#### Admin Portal Setup  
```bash
cd ../admin-portal
npm install

# Optional: Check admin portal dependencies
npm list
```

#### Mobile App Setup
```bash
cd ../mobile
npm install

# Optional: Check mobile dependencies
npm list
```

### Step 3: Environment Configuration

#### Backend Environment
```bash
# In backend/ directory
cp .env.example .env  # If example exists

# Or create .env file manually with:
# PORT=3001
# NODE_ENV=development
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=epa_ethics
```

#### Admin Portal Environment
```bash
# In admin-portal/ directory
# Default configuration uses localhost:3001 for API
# No additional environment setup required for demo
```

#### Mobile App Environment
```bash
# In mobile/ directory
# Configuration is handled in app.json and package.json
# Default API URL: http://localhost:3001
```

## 🚀 Starting the Application

### Option 1: Quick Demo Start (Recommended for Evaluators)

Open 3 terminal windows and run these commands:

#### Terminal 1: Backend API
```bash
cd backend
npm start

# Should see: "✅ EPA Ethics API Server running on http://localhost:3001"
```

#### Terminal 2: Admin Portal
```bash
cd admin-portal
npm start

# Should see: "✅ Admin Portal running on http://localhost:3000"
```

#### Terminal 3: Mobile App
```bash
cd mobile
npm start

# Should see Expo development server with QR code
# Access URL: http://localhost:19006
```

### Option 2: Step-by-Step Start

#### 1. Start Backend First
```bash
cd backend
npm start

# Wait for confirmation message
# API should be available at http://localhost:3001
```

#### 2. Test Backend Connectivity
```bash
# In a new terminal
curl http://localhost:3001/api/health

# Should return: {"status":"healthy","timestamp":"..."}
```

#### 3. Start Admin Portal
```bash
cd admin-portal
npm start

# Admin portal available at http://localhost:3000
```

#### 4. Start Mobile App
```bash
cd mobile
npm start

# Choose 'w' to open in web browser
# Or scan QR code with Expo Go app on mobile device
```

## 📱 Access Points and Demo Credentials

### Primary Access Points

| Component | URL | Purpose |
|-----------|-----|---------|
| **Mobile App** | http://localhost:19006 | Main ethics training interface |
| **Admin Portal** | http://localhost:3000 | Content management system |
| **Backend API** | http://localhost:3001 | REST API endpoints |
| **API Health** | http://localhost:3001/api/health | System status check |

### Demo Credentials

#### Admin Portal Login
- **Username**: `admin`
- **Password**: `demo123`  
- **MFA Code**: `123456` (for demonstration)

#### API Test User
- **Username**: `demo-user`
- **Password**: `demo123`

## 🧪 Quick Testing Verification

### 1. Verify Backend API
```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Test training modules endpoint
curl http://localhost:3001/api/content/modules

# Expected response: JSON array of training modules
```

### 2. Verify Admin Portal
1. Open http://localhost:3000
2. Click "Administrator Login"
3. Enter credentials: admin / demo123
4. Enter MFA code: 123456
5. Verify dashboard loads with statistics

### 3. Verify Mobile App
1. Open http://localhost:19006
2. Verify EPA branding displays
3. Test navigation to all 5 main sections:
   - Home Dashboard
   - Ethics Guide  
   - Knowledge Quiz
   - Training Videos
   - Resources

### 4. Verify Mobile App on Device (Optional)
1. Install Expo Go app on iOS/Android
2. Scan QR code from terminal
3. Test app functionality on actual device

## 🔍 Feature Verification Checklist

### Mobile App Features
- [ ] **Home Screen**: EPA branding, navigation cards, progress summary
- [ ] **Ethics Guide**: 6 training modules with 5 C.F.R. § 2635 content  
- [ ] **Knowledge Quiz**: Interactive assessment with scoring
- [ ] **Training Videos**: Video library with categories and search
- [ ] **Resources**: FAQ, glossary, documents, contact information

### Admin Portal Features  
- [ ] **Login System**: Authentication with MFA simulation
- [ ] **Dashboard**: Statistics, user management, quick actions
- [ ] **Content Management**: Module editing, resource upload simulation
- [ ] **Quiz Editor**: Question creation, multiple question types

### Compliance Features
- [ ] **Section 508**: Keyboard navigation, screen reader support
- [ ] **FedRAMP Low**: Security compliance markers visible
- [ ] **EPA Branding**: Official EPA styling and logos
- [ ] **Contract Attribution**: St. Michael Enterprises LLC, Contract 68HERD25Q0050

## 🚨 Troubleshooting Common Issues

### Port Conflicts
```bash
# Check if ports are in use
lsof -i :3000  # Admin portal
lsof -i :3001  # Backend API
lsof -i :19006 # Expo dev server

# Kill processes using ports (if needed)
kill -9 [PID]
```

### Node Version Issues
```bash
# Check Node version
node --version

# Should be >= 18.0.0
# Update Node.js if necessary from nodejs.org
```

### Dependency Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Expo/Mobile Issues
```bash
# Clear Expo cache
cd mobile
npx expo start -c

# Or restart with tunnel for mobile device access
npx expo start --tunnel
```

### Database Connection Issues
```bash
# For production setups, check database connectivity
# Demo mode works without database connection
cd backend
npm run db:status  # If available
```

## 📊 Performance Optimization

### Development Mode Performance
```bash
# For better performance in demo mode
cd mobile
npx expo start --no-dev --minify

# Or build for production testing
npx expo build:web
```

### Memory Management
```bash
# Monitor memory usage
node --max-old-space-size=4096 [your-start-command]

# Clear system memory
# Restart terminals if experiencing slowdown
```

## 🔒 Security Considerations

### Demo Environment Security
- All demo credentials are for testing only
- No real user data should be entered
- Reset demo environment between testing sessions

### Production Deployment Notes
- Change all default passwords
- Configure proper SSL certificates
- Set up production database
- Enable proper logging and monitoring

## 📞 Support and Contact

### Technical Issues
- **Primary Contact**: St. Michael Enterprises LLC
- **Contract Number**: EPA 68HERD25Q0050
- **Documentation**: See README.md and TESTING_GUIDE.md

### EPA Project Coordination
- **Ethics Office**: ethics@epa.gov
- **Technical Coordinator**: [Contact Information]

## 📚 Additional Resources

### Documentation Files
- **README.md**: Comprehensive project overview
- **TESTING_GUIDE.md**: Detailed testing procedures
- **Documentation/**: Additional project documentation

### Training Materials
- **User Guide**: Available in Documentation/
- **Admin Manual**: Available in Documentation/
- **Video Tutorials**: Embedded in application

## ✅ Setup Completion Checklist

Before proceeding with evaluation:

- [ ] All dependencies installed successfully
- [ ] Backend API running and responding
- [ ] Admin portal accessible with demo login
- [ ] Mobile app loading in browser
- [ ] All major features verified working
- [ ] Mobile device testing (if required)
- [ ] Basic accessibility checks passed

## 🎯 Next Steps

After successful setup:

1. **Review the application features** using the mobile interface
2. **Test administrative functions** via the admin portal
3. **Evaluate compliance features** (Section 508, FedRAMP markers)
4. **Review code quality** and documentation
5. **Assess scalability** and deployment readiness

---

*Setup guide for EPA Ethics App v1.0 - St. Michael Enterprises LLC | EPA Contract 68HERD25Q0050*