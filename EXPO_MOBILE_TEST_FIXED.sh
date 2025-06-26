#!/bin/bash

echo "=================================================================="
echo "EPA ETHICS APP - EXPO GO MOBILE TESTING (SDK 53 - FIXED)"
echo "=================================================================="
echo "Contract: EPA 68HERD25Q0050"
echo "Developer: St. Michael Enterprises LLC"
echo "Expo SDK: 53.0.0 | React Native: 0.74.5"
echo "=================================================================="

# Check if backend is running
echo "🔍 Checking if backend API is running..."
if ! curl -s http://localhost:3002/api/health > /dev/null; then
    echo "❌ Backend API is not running!"
    echo "Please run './INSTANT_FIX.sh' first to start the backend"
    exit 1
fi
echo "✅ Backend API is running"

# Navigate to mobile directory
cd mobile

echo ""
echo "📱 Setting up Expo Go mobile testing with fixed Metro..."

# Check if local Expo CLI exists
if [ ! -f "./node_modules/.bin/expo" ]; then
    echo "📦 Installing local Expo CLI..."
    npm install --save-dev @expo/cli@latest
fi

# Get the current IP address for API access
HOST_IP=$(hostname -I | awk '{print $1}' 2>/dev/null || echo "localhost")
echo "🌐 Using IP address: $HOST_IP"

echo "📸 Verifying mobile app assets..."

# Ensure assets directory exists
mkdir -p assets

# Create simple assets if they don't exist
if [ ! -f "assets/icon.png" ]; then
    echo "🖼️  Creating app icon..."
    # Create a simple 200x200 colored square as PNG placeholder
    cat > assets/icon.png << 'EOF'
iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVHic7dMxAQAAAMKg9U9tB2+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4M0CdYAAAQpN1UQAAAAElFTkSuQmCC
EOF
fi

if [ ! -f "assets/splash.png" ]; then
    echo "🌟 Creating splash screen..."
    cp assets/icon.png assets/splash.png
fi

if [ ! -f "assets/adaptive-icon.png" ]; then
    echo "📱 Creating adaptive icon..."
    cp assets/icon.png assets/adaptive-icon.png
fi

echo ""
echo "🚀 Starting Expo development server with LOCAL CLI..."
echo ""
echo "📋 IMPORTANT INSTRUCTIONS FOR MOBILE TESTING:"
echo ""
echo "1. 📱 Install/Update 'Expo Go' app on your phone:"
echo "   • App Store (iOS) - Ensure latest version for SDK 53"
echo "   • Google Play Store (Android) - Ensure latest version for SDK 53"
echo ""
echo "2. 📶 Ensure your phone and computer are on the same WiFi network"
echo ""
echo "3. 📊 Backend API confirmed running: http://localhost:3002/api/health"
echo ""
echo "4. 📱 When Expo starts, you'll see a QR code"
echo ""
echo "5. 🔍 Scan the QR code with:"
echo "   • iOS: Camera app (point at QR code)"
echo "   • Android: Expo Go app (tap 'Scan QR Code')"
echo ""
echo "6. ⏳ Wait 1-2 minutes for the app to build and load"
echo ""
echo "7. 🎯 Test all features:"
echo "   • Home screen with EPA branding"
echo "   • Ethics Guide modules"
echo "   • Knowledge Quiz"
echo "   • Training Videos"
echo "   • Resources section"
echo "   • Backend API connection status"
echo ""

echo "🌐 Starting Expo with tunnel mode using LOCAL CLI..."
echo ""

# Use local Expo CLI to avoid npx conflicts
if [ -f "./node_modules/.bin/expo" ]; then
    echo "✅ Using local Expo CLI (recommended)"
    ./node_modules/.bin/expo start --tunnel --clear
else
    echo "⚠️  Falling back to npx (may have issues)"
    npx expo start --tunnel --clear
fi

echo ""
echo "=================================================================="
echo "📱 EXPO GO MOBILE TESTING READY!"
echo "=================================================================="
echo "✅ Scan the QR code above with Expo Go app"
echo "✅ Backend API: http://localhost:3002/api/health"
echo "✅ Mobile Web Demo: http://localhost:19007"
echo "✅ Admin Portal: http://localhost:3003"
echo "=================================================================="