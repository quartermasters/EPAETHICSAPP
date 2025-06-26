# EPA Ethics App - Comprehensive Testing Guide

## Quick Start (Recommended)

### Option 1: Start All Components at Once
```bash
./start-all.sh
```

### Option 2: Start Components Individually

**Terminal 1 - Backend API:**
```bash
./start-backend.sh
```

**Terminal 2 - Mobile App:**
```bash
./start-mobile.sh
```

**Terminal 3 - Admin Portal:**
```bash
./start-admin.sh
```

## Testing Each Component

### 1. Backend API (Port 3002)
- **Health Check**: http://localhost:3002/api/health
- **Test Endpoints**:
  - http://localhost:3002/api/content/modules
  - http://localhost:3002/api/content/quiz
  - http://localhost:3002/api/content/videos
  - http://localhost:3002/api/content/faq
  - http://localhost:3002/api/content/glossary

### 2. Mobile App (Port 19007)
- **Web Demo**: http://localhost:19007
- **Features to Test**:
  - Home screen with EPA branding
  - API connection status indicator
  - Ethics training modules
  - Knowledge quiz interface
  - Video library
  - Resources section

### 3. Admin Portal (Port 3003)
- **Admin Interface**: http://localhost:3003
- **Features to Test**:
  - Dashboard with system status
  - API connectivity indicator
  - Demo credentials display
  - Responsive design

## Mobile Testing with Expo Go

### Prerequisites
1. Install Expo Go app on your phone
2. Ensure your phone and computer are on the same WiFi network

### Steps
1. Install Expo CLI globally:
```bash
npm install -g @expo/cli
```

2. Start Expo development server:
```bash
cd mobile
npx expo start --tunnel
```

3. Scan QR code with Expo Go app
4. Wait for bundle to download (1-2 minutes first time)
5. Test full mobile experience

## Troubleshooting

### Port Conflicts
If you get "port already in use" errors:
```bash
# Kill processes on all ports
pkill -f "3002"
pkill -f "3003" 
pkill -f "19007"
```

### Node.js Issues
- Ensure Node.js 18+ is installed: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Dependencies Issues
Run the fix script again:
```bash
./fix-and-test.sh
```

## Expected Behavior

### ✅ Success Indicators
- Backend API returns JSON health status
- Mobile app shows "Backend connected" status
- Admin portal displays green "Online" status
- All components load without errors

### ❌ Common Issues
- Red "Backend offline" status = Backend not running
- Page not loading = Port conflicts or service not started
- Expo QR code not working = Network connectivity issues

## Demo Credentials

### Admin Portal
- **URL**: http://localhost:3003
- **Username**: admin
- **Password**: demo123
- **MFA Code**: 123456

### API Testing
- **Base URL**: http://localhost:3002/api/
- **Health Check**: /health
- **Content Endpoints**: /content/{modules,quiz,videos,faq,glossary}

## Federal Compliance Features

### Section 508 Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast color schemes
- Semantic HTML structure

### FedRAMP Low Security
- Rate limiting on API endpoints
- CORS protection
- Input validation
- Security headers

### EPA Branding
- Official EPA color scheme
- St. Michael Enterprises attribution
- Contract number display
- Professional federal styling

## Performance Targets

- **Load Time**: < 3 seconds
- **API Response**: < 500ms
- **Mobile Score**: 95+ Lighthouse
- **Accessibility**: 100% compliance

## Support

### Technical Issues
- **Email**: hello@quartermasters.me
- **Contract**: EPA 68HERD25Q0050
- **Developer**: St. Michael Enterprises LLC

### Documentation
- README.md - Project overview
- API documentation in backend/src/
- Component documentation in mobile/src/
