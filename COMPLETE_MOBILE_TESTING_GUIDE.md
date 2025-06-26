# EPA Ethics App - Complete Mobile Testing Guide

## 🚀 Two Ways to Test the Mobile App

### Option 1: Web Demo (Quick Testing)
```bash
./INSTANT_FIX.sh
# Then open: http://localhost:19007
```

### Option 2: Real Mobile Device with Expo Go (Full Experience)
```bash
./EXPO_MOBILE_TEST.sh
```

---

## 📱 Expo Go Mobile Testing (Recommended)

### Prerequisites
1. **Install Expo Go** on your phone:
   - **iOS**: Download from App Store
   - **Android**: Download from Google Play Store

2. **Network Setup**:
   - Ensure your phone and computer are on the same WiFi network
   - OR use tunnel mode (works from anywhere)

### Step-by-Step Process

#### Step 1: Start Backend Services
```bash
cd /mnt/d/EPAETHICSAPP
./INSTANT_FIX.sh
```
Wait for confirmation that all services are running.

#### Step 2: Start Expo Mobile Testing
```bash
./EXPO_MOBILE_TEST.sh
```

#### Step 3: Mobile App Testing
1. **QR Code will appear** in your terminal
2. **Scan with your phone**:
   - **iOS**: Open Camera app, point at QR code, tap notification
   - **Android**: Open Expo Go app, tap "Scan QR Code"
3. **Wait for build** (1-2 minutes first time)
4. **App loads** on your actual mobile device!

### What You'll Test on Mobile

#### ✅ Core Features
- **Home Screen**: EPA branding, navigation, progress summary
- **Ethics Guide**: 6 interactive training modules
- **Knowledge Quiz**: Interactive assessment with scoring
- **Training Videos**: Professional video library
- **Resources**: FAQ, glossary, and documents
- **Backend Integration**: Real-time API connectivity

#### ✅ Mobile-Specific Features
- **Touch Navigation**: Swipe, tap, pinch gestures
- **Native Performance**: Smooth animations and transitions
- **Device Features**: Proper mobile layouts and responsiveness
- **Accessibility**: Screen reader support, font scaling
- **Network Handling**: Online/offline status detection

#### ✅ Federal Compliance Testing
- **Section 508**: Accessibility features work on mobile
- **EPA Branding**: Official colors and styling display correctly
- **Performance**: App loads in under 3 seconds
- **Security**: Encrypted communication with backend

---

## 🔧 Troubleshooting Mobile Testing

### QR Code Not Working
```bash
# Try tunnel mode for global access
cd mobile
npx expo start --tunnel --clear
```

### App Won't Load
1. **Check Backend**: Visit http://localhost:3002/api/health
2. **Check Network**: Ensure phone/computer on same WiFi
3. **Clear Cache**: In Expo Go, shake device → "Reload"
4. **Restart Expo**: Ctrl+C, then restart script

### Build Errors
```bash
# Clear Expo cache and restart
cd mobile
npx expo start --clear
```

### Dependencies Issues
```bash
# Reinstall mobile dependencies
cd mobile
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Expected Mobile Performance

### Load Times
- **Initial App Load**: < 3 seconds
- **Screen Navigation**: < 0.5 seconds
- **API Calls**: < 1 second
- **Content Loading**: < 2 seconds

### Features Working
- ✅ Touch navigation between screens
- ✅ Real-time backend connectivity
- ✅ Smooth animations and transitions
- ✅ Responsive design on all screen sizes
- ✅ EPA branding and federal styling
- ✅ Accessibility features (VoiceOver/TalkBack)

---

## 🎯 Demo Scenarios

### Scenario 1: New Employee Training
1. Open app on mobile device
2. Navigate to Ethics Guide
3. Complete first training module
4. Take knowledge quiz
5. View training videos
6. Access resources for reference

### Scenario 2: Quick Reference
1. Use search in Resources section
2. Find specific ethics rule
3. Share link with colleague
4. Bookmark important content

### Scenario 3: Accessibility Testing
1. Enable VoiceOver (iOS) or TalkBack (Android)
2. Navigate using screen reader
3. Test keyboard navigation
4. Verify high contrast mode

---

## 📞 Support

### Issues with Mobile Testing
- **Email**: hello@quartermasters.me
- **Contract**: EPA 68HERD25Q0050
- **Developer**: St. Michael Enterprises LLC

### Common Solutions
- **QR Code Issues**: Use tunnel mode (`--tunnel` flag)
- **Network Problems**: Check WiFi connectivity
- **Build Failures**: Clear cache and restart
- **Performance Issues**: Check backend health endpoint

---

## ✅ Verification Checklist

### Before Testing
- [ ] Backend API running (http://localhost:3002/api/health)
- [ ] Expo Go app installed on phone
- [ ] Phone and computer on same WiFi (or using tunnel)
- [ ] All dependencies installed

### During Testing
- [ ] QR code scans successfully
- [ ] App builds and loads on device
- [ ] All navigation tabs work
- [ ] Backend connection shows "online"
- [ ] Content loads in all sections

### After Testing
- [ ] All features tested and working
- [ ] Performance meets federal standards
- [ ] Accessibility features verified
- [ ] EPA branding displays correctly

**🎉 Ready for Federal Deployment!**