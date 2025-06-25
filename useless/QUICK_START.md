# 🚀 EPA Ethics App - Quick Start Guide

**Developed by St. Michael Enterprises LLC**  
**EPA Contract 68HERD25Q0050**

---

## ⚡ Fastest Way to Test Locally

### 1. **Prerequisites Check**
- ✅ **Node.js 18+** installed ([Download here](https://nodejs.org/))
- ✅ **Git** installed
- ✅ **Modern web browser** (Chrome, Firefox, Safari, Edge)

### 2. **One-Click Setup**

#### Windows Users:
```cmd
# Double-click or run in Command Prompt
run-local.bat
```

#### Mac/Linux Users:
```bash
# Run in Terminal
./run-local.sh
```

### 3. **Manual Setup** (if scripts don't work)
```bash
# Install all dependencies
npm install
cd backend && npm install && cd ..
cd admin-portal && npm install && cd ..
cd mobile && npm install && cd ..

# Start all services
npm run dev:all
```

---

## 🌐 **Access the Applications**

Once running, open these URLs in your browser:

### 📱 **Mobile App** (Main User Interface)
**URL:** http://localhost:19006  
- ✨ **Public interface** - No login required
- 📚 Ethics guide, quizzes, videos, resources
- ♿ **Fully accessible** design

### 🔐 **Admin Portal** (Content Management)
**URL:** http://localhost:3000  
- 🛡️ **Secure login required**
- 📝 Content management system
- 👥 User administration

**Test Login Credentials:**
- **Username:** `admin`
- **Password:** `TestPassword123!`
- **MFA Code:** `123456`

### 🔧 **Backend API** (Development)
**URL:** http://localhost:3001  
- ⚡ REST API endpoints
- 📊 Health check: http://localhost:3001/api/health

---

## 📱 **Mobile App Testing**

### **Browser Testing** (Recommended for quick testing)
1. Open http://localhost:19006
2. Press `F12` for developer tools
3. Click mobile device icon (📱) to simulate phones
4. Test different screen sizes

### **Phone Testing** (Real device)
1. Install **Expo Go** app on your phone
2. Scan QR code from terminal
3. App loads directly on your device

---

## ✅ **Quick Feature Test Checklist**

### Mobile App Features:
- [ ] **Home Screen** - Welcome and quick actions
- [ ] **Ethics Guide** - Interactive learning modules  
- [ ] **Quiz** - Test your knowledge functionality
- [ ] **Videos** - Training video library
- [ ] **Resources** - FAQ, glossary, documents
- [ ] **Accessibility** - Screen reader, keyboard navigation

### Admin Portal Features:
- [ ] **Login** - Secure authentication with MFA
- [ ] **Dashboard** - Overview and analytics
- [ ] **Content Management** - Edit modules, quizzes, videos
- [ ] **User Management** - Admin accounts
- [ ] **Reports** - Usage and compliance reports

---

## 🔍 **API Testing**

Test the backend API directly:

```bash
# Health check
curl http://localhost:3001/api/health

# Get ethics content
curl http://localhost:3001/api/content/modules
curl http://localhost:3001/api/content/quiz
curl http://localhost:3001/api/content/faq
```

---

## 🛠️ **Troubleshooting**

### **Port Already in Use?**
```bash
# Kill processes on ports
# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3001 | xargs kill -9
```

### **Dependencies Issues?**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **App Not Loading?**
1. Check Node.js version: `node --version` (should be 18+)
2. Check if all ports are free (3000, 3001, 19006)
3. Try running components individually:
   ```bash
   cd backend && npm run dev      # Terminal 1
   cd admin-portal && npm run dev # Terminal 2  
   cd mobile && npm start         # Terminal 3
   ```

---

## 📊 **Performance & Quality Testing**

### **Run All Tests**
```bash
npm run test:all              # Unit and integration tests
npm run test:accessibility    # Section 508 compliance
npm run security:scan         # Security vulnerability scan
npm run lint:all             # Code quality check
```

### **Load Testing**
```bash
npm install -g k6
k6 run tests/performance/api-load-test.js
```

---

## 🏆 **Success Indicators**

### ✅ **Everything Working When You See:**
- 🟢 **Mobile App**: Loads with EPA branding and navigation
- 🟢 **Admin Portal**: Login screen with St. Michael branding
- 🟢 **Backend API**: Health check returns `{"status": "healthy"}`
- 🟢 **No Console Errors**: Clean browser developer console
- 🟢 **Responsive Design**: Works on mobile and desktop views

### 📈 **Expected Performance:**
- ⚡ **Page Load**: < 2 seconds
- 🔄 **API Response**: < 500ms
- 📱 **Mobile Smooth**: 60fps animations
- ♿ **Accessibility**: 100% WCAG AA compliance

---

## 📞 **Need Help?**

### **Documentation:**
- 📖 **Detailed Guide**: `LOCAL_TESTING_GUIDE.md`
- 🚀 **Deployment**: `DEPLOYMENT_GUIDE.md`  
- ♿ **Accessibility**: `docs/ACCESSIBILITY_COMPLIANCE.md`
- 🛡️ **Security**: `docs/FEDRAMP_SECURITY.md`

### **Common Commands:**
```bash
npm run dev:all          # Start everything
npm run test:all         # Run all tests
npm run build:all        # Build for production
npm run lint:all         # Check code quality
```

### **Log Files:**
- Backend: `backend/logs/`
- Browser: Developer Console (F12)
- Mobile: Metro bundler output

---

## 🎯 **What to Test First**

### **5-Minute Quick Test:**
1. ✅ Open mobile app → Navigate through all 5 tabs
2. ✅ Try a quiz → Complete 2-3 questions  
3. ✅ Check accessibility → Use Tab key to navigate
4. ✅ Login to admin → Use test credentials
5. ✅ API health → Visit http://localhost:3001/api/health

### **Complete Testing:**
Follow the comprehensive test cases in `LOCAL_TESTING_GUIDE.md`

---

**🎉 You're now ready to test the EPA Ethics App locally!**

*For production deployment and advanced configuration, see the other documentation files.*