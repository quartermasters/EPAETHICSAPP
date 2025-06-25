# EPA Ethics App - Testing Guide

## 🧪 Comprehensive Testing Instructions

This guide provides detailed testing procedures for evaluating the EPA Ethics mobile application and administrative portal.

## Quick Demo Access

### Mobile App Testing (Primary Interface)
```bash
cd mobile
npm start
```
- **Web Access**: http://localhost:19006
- **QR Code**: Scan with Expo Go app on mobile device
- **Mobile Browser**: Use developer tools in desktop browser

### Admin Portal Testing
```bash
cd admin-portal
npm start
```
- **Access**: http://localhost:3000
- **Demo Login**: admin / demo123
- **MFA Code**: 123456

### Backend API Testing
```bash
cd backend
npm start
```
- **Health Check**: http://localhost:3001/api/health
- **API Documentation**: Swagger UI available

## 📱 Mobile App Testing Checklist

### 1. Home Screen
- [ ] App loads successfully with EPA branding
- [ ] St. Michael Enterprises attribution visible
- [ ] Contract number (68HERD25Q0050) displayed
- [ ] Navigation cards are accessible
- [ ] Progress summary displays correctly

### 2. Ethics Guide Screen  
- [ ] 6 training modules load correctly
- [ ] Module descriptions are comprehensive
- [ ] Progress indicators work properly
- [ ] Sample ethics content from 5 C.F.R. § 2635 displays
- [ ] Module completion status updates

### 3. Quiz Screen
- [ ] Quiz interface loads properly
- [ ] Questions progress correctly
- [ ] Multiple choice selection works
- [ ] Score calculation is accurate
- [ ] Results screen displays properly
- [ ] Quiz restart functionality works

### 4. Video Library Screen
- [ ] Video categories filter correctly
- [ ] Sample training videos display
- [ ] Video metadata (duration, difficulty) shows
- [ ] Accessibility features available
- [ ] Video selection and playback simulation works

### 5. Resources Screen
- [ ] FAQ section expands/collapses correctly
- [ ] Glossary terms search functionality
- [ ] Documents section displays resources
- [ ] Contact information is accessible
- [ ] Tab navigation works smoothly

## 🖥️ Admin Portal Testing Checklist

### 1. Login Screen
- [ ] Login form displays correctly
- [ ] Demo credentials work (admin/demo123)
- [ ] MFA simulation functions (code: 123456)
- [ ] EPA branding and compliance markers visible
- [ ] Error handling for invalid credentials

### 2. Dashboard Screen
- [ ] Statistics cards display data
- [ ] Quick actions navigation works
- [ ] Recent activity feed shows sample data
- [ ] User management links functional
- [ ] System health indicators working

### 3. Content Management Screen
- [ ] Module management tab displays
- [ ] Resource upload simulation works
- [ ] Content categorization functions
- [ ] File upload progress indicators
- [ ] Content editing interfaces accessible

### 4. Quiz Editor Screen
- [ ] Quiz creation interface loads
- [ ] Question type selection works
- [ ] Multiple choice, true/false, fill-in-blank supported
- [ ] Quiz preview functionality
- [ ] Save and publish simulation

## 🔧 Backend API Testing

### Health Check Endpoints
```bash
# Basic health check
curl http://localhost:3001/api/health

# Detailed system status
curl http://localhost:3001/api/health/detailed

# Database connectivity
curl http://localhost:3001/api/health/database
```

### Content API Endpoints
```bash
# Training modules
curl http://localhost:3001/api/content/modules

# Quiz questions
curl http://localhost:3001/api/content/quiz

# Video library
curl http://localhost:3001/api/content/videos

# Resources
curl http://localhost:3001/api/content/resources
```

### User Management Endpoints
```bash
# User progress
curl http://localhost:3001/api/users/progress

# User authentication (demo)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo123"}'
```

## 📱 Expo Go Mobile Testing

### Prerequisites
1. Install Expo Go app on iOS/Android device
2. Ensure mobile device and computer are on same network
3. Start the mobile development server

### Testing Steps
```bash
# Start with tunnel for remote access
cd mobile
npx expo start --tunnel
```

1. **Scan QR Code**: Use Expo Go app to scan the displayed QR code
2. **App Loading**: Verify app loads on physical device
3. **Navigation**: Test all screen transitions
4. **Touch Interactions**: Verify all buttons and gestures work
5. **Performance**: Check for smooth animations and transitions

## 🌐 Cross-Browser Testing

### Required Browsers
- [ ] **Chrome** (Primary - latest version)
- [ ] **Firefox** (latest version)
- [ ] **Safari** (macOS/iOS)
- [ ] **Edge** (latest version)
- [ ] **Mobile Safari** (iOS)
- [ ] **Chrome Mobile** (Android)

### Browser-Specific Checks
- [ ] Mobile viewport rendering
- [ ] Touch/click event handling
- [ ] CSS grid and flexbox layout
- [ ] Font rendering and sizing
- [ ] Color contrast in different browsers

## ♿ Accessibility Testing

### Automated Testing
```bash
# Install accessibility testing tools
npm install -g @axe-core/cli

# Run accessibility audit
axe http://localhost:19006 --include "#root" --tags wcag2a,wcag2aa
```

### Manual Accessibility Checks
- [ ] **Keyboard Navigation**: Tab through all interactive elements
- [ ] **Screen Reader**: Test with NVDA/JAWS/VoiceOver
- [ ] **Color Contrast**: Verify 4.5:1 minimum ratio
- [ ] **Focus Indicators**: Visible focus outlines
- [ ] **Alternative Text**: All images have appropriate alt text
- [ ] **Semantic HTML**: Proper heading hierarchy
- [ ] **ARIA Labels**: Screen reader announcements

### Accessibility Test Commands
```bash
# Test color contrast
npm install -g color-contrast-analyzer
contrast-analyzer http://localhost:19006

# Test keyboard navigation
# Use Tab, Shift+Tab, Enter, Space, Arrow keys

# Test screen reader compatibility
# Enable screen reader and navigate through app
```

## 🚀 Performance Testing

### Lighthouse Audit
```bash
# Install Lighthouse
npm install -g lighthouse

# Run performance audit
lighthouse http://localhost:19006 --view --preset=perf

# Run accessibility audit
lighthouse http://localhost:19006 --view --preset=accessibility

# Run full audit
lighthouse http://localhost:19006 --view
```

### Performance Benchmarks
- [ ] **Load Time**: < 3 seconds on 3G connection
- [ ] **First Contentful Paint**: < 1.5 seconds
- [ ] **Time to Interactive**: < 5 seconds
- [ ] **Mobile Performance Score**: > 90
- [ ] **Accessibility Score**: 100/100

## 🔒 Security Testing

### Basic Security Checks
```bash
# Check for common vulnerabilities
npm audit

# Test HTTPS headers (if deployed)
curl -I https://your-app-url.com

# Test authentication endpoints
curl -X POST http://localhost:3001/api/auth/test
```

### Security Checklist
- [ ] **Input Validation**: Test with malicious inputs
- [ ] **Authentication**: Verify login/logout flow
- [ ] **Session Management**: Check session timeout
- [ ] **CSRF Protection**: Verify anti-CSRF tokens
- [ ] **XSS Prevention**: Test script injection attempts
- [ ] **SQL Injection**: Test database query security

## 📊 Test Results Documentation

### Test Report Template
```markdown
## Test Execution Report

**Date**: [Test Date]
**Tester**: [Tester Name]
**Environment**: [Browser/Device Details]

### Test Results Summary
- **Total Tests**: [Number]
- **Passed**: [Number]
- **Failed**: [Number]
- **Blocked**: [Number]

### Critical Issues Found
1. [Issue Description]
2. [Issue Description]

### Recommendations
1. [Recommendation]
2. [Recommendation]
```

## 🆘 Troubleshooting Common Issues

### Mobile App Won't Load
```bash
# Clear Expo cache
cd mobile
npx expo start -c

# Check node version
node --version  # Should be >= 18.0.0

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Admin Portal Connection Issues
```bash
# Check if backend is running
curl http://localhost:3001/api/health

# Restart backend
cd backend
npm start

# Check port conflicts
lsof -i :3000  # Admin portal port
lsof -i :3001  # Backend API port
```

### Database Connection Problems
```bash
# Check database status
cd backend
npm run db:status

# Reset database (if needed)
npm run db:reset

# Run migrations
npm run db:migrate
```

## 📞 Support and Reporting

### Issue Reporting
When reporting issues, please include:
1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Browser/device information**
5. **Screenshots or videos**

### Contact Information
- **Technical Support**: St. Michael Enterprises LLC
- **EPA Project Coordinator**: [Contact Information]
- **Contract Number**: 68HERD25Q0050

---

*This testing guide ensures comprehensive validation of the EPA Ethics application across all platforms and use cases.*