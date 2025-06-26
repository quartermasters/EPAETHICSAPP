#!/bin/bash

echo "=================================================================="
echo "EPA ETHICS APP - INSTANT EXPO START"
echo "=================================================================="
echo "Contract: EPA 68HERD25Q0050"
echo "Developer: St. Michael Enterprises LLC"
echo "=================================================================="

# Check if backend is running
echo "🔍 Checking backend API..."
if curl -s http://localhost:3002/api/health > /dev/null; then
    echo "✅ Backend API is running"
else
    echo "❌ Backend API not running. Starting backend first..."
    cd ../backend
    nohup node src/demo-server.js > backend.log 2>&1 &
    echo "✅ Backend started"
    sleep 3
fi

cd mobile

echo ""
echo "📱 Starting EPA Ethics Mobile App with Expo Go..."
echo ""
echo "📋 MOBILE TESTING INSTRUCTIONS:"
echo ""
echo "1. 📱 Install 'Expo Go' app on your phone:"
echo "   • iOS: App Store"
echo "   • Android: Google Play Store"
echo ""
echo "2. 📶 Ensure phone and computer on same WiFi"
echo ""
echo "3. 🔍 Scan QR code when it appears below"
echo ""
echo "4. ⏳ Wait 1-2 minutes for app to build"
echo ""
echo "5. 🎯 Test all EPA Ethics features on your phone!"
echo ""

# Try multiple ways to start Expo
echo "🚀 Starting Expo development server..."

# Method 1: Try npx (most reliable)
if command -v npx &> /dev/null; then
    echo "✅ Using npx expo..."
    npx expo start --tunnel --clear
elif [ -f "/home/quartermasters/.npm-global/lib/node_modules/@expo/cli/build/bin/cli" ]; then
    echo "✅ Using direct path to Expo CLI..."
    node /home/quartermasters/.npm-global/lib/node_modules/@expo/cli/build/bin/cli start --tunnel --clear
elif [ -f "./node_modules/.bin/expo" ]; then
    echo "✅ Using local Expo CLI..."
    ./node_modules/.bin/expo start --tunnel --clear
else
    echo "❌ Cannot find Expo CLI. Installing locally..."
    npm install @expo/cli
    ./node_modules/.bin/expo start --tunnel --clear
fi

echo ""
echo "=================================================================="
echo "📱 EXPO GO TESTING READY!"
echo "=================================================================="
echo "✅ Backend API: http://localhost:3002/api/health"
echo "✅ Mobile Web Demo: http://localhost:19007"
echo "✅ Scan QR code above with Expo Go app"
echo "=================================================================="