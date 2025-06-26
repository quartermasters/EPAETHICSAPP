#!/bin/bash

echo "=================================================================="
echo "EPA ETHICS APP - EXPO GO MOBILE TESTING (SDK 53)"
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

# Check if Expo CLI is available
echo ""
echo "📱 Setting up Expo Go mobile testing..."

# Install Expo CLI if not available
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli@latest
fi

# Check SDK version
echo "🔍 Verifying Expo SDK 53..."
SDK_VERSION=$(npx expo --version 2>/dev/null || echo "unknown")
echo "Expo CLI Version: $SDK_VERSION"

# Update app.json with correct backend URL
echo "🔧 Configuring mobile app for Expo Go..."

# Get the current IP address for tunnel access
HOST_IP=$(hostname -I | awk '{print $1}' 2>/dev/null || echo "localhost")

# Update app.json to point to the correct backend
cat > app.json << EOF
{
  "expo": {
    "name": "EPA Ethics",
    "slug": "epa-ethics-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "gov.epa.ethics"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "gov.epa.ethics"
    },
    "platforms": ["ios", "android"],
    "extra": {
      "apiUrl": "http://$HOST_IP:3002"
    },
    "sdkVersion": "53.0.0",
    "runtimeVersion": "1.0.0"
  }
}
EOF

# Create missing asset files if they don't exist
echo "📸 Setting up mobile app assets..."

mkdir -p assets

# Create a simple icon if it doesn't exist
if [ ! -f "assets/icon.png" ]; then
    # Create a simple colored square as placeholder
    cat > assets/icon.png << 'EOF'
iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVHic7doxAQAAAMKg9U9tCU+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOBvAQIJAAGCNKzxAAAAAElFTkSuQmCC
EOF
fi

# Create splash screen if it doesn't exist
if [ ! -f "assets/splash.png" ]; then
    cp assets/icon.png assets/splash.png
fi

# Create adaptive icon if it doesn't exist
if [ ! -f "assets/adaptive-icon.png" ]; then
    cp assets/icon.png assets/adaptive-icon.png
fi

echo ""
echo "🚀 Starting Expo development server..."
echo ""
echo "📋 IMPORTANT INSTRUCTIONS FOR MOBILE TESTING:"
echo ""
echo "1. 📱 Install/Update 'Expo Go' app on your phone:"
echo "   • App Store (iOS) - Ensure latest version for SDK 53"
echo "   • Google Play Store (Android) - Ensure latest version for SDK 53"
echo ""
echo "2. 📶 Ensure your phone and computer are on the same WiFi network"
echo ""
echo "3. 📊 Make sure backend is running: http://localhost:3002/api/health"
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

# Start Expo with tunnel for better connectivity
echo "🌐 Starting Expo with tunnel mode for global access..."
echo ""

# Use tunnel mode which works even if phone/computer aren't on same network
npx expo start --tunnel --clear

echo ""
echo "=================================================================="
echo "📱 EXPO GO MOBILE TESTING READY!"
echo "=================================================================="
echo "✅ Scan the QR code above with Expo Go app"
echo "✅ Backend API: http://localhost:3002/api/health"
echo "✅ Mobile Web Demo: http://localhost:19007"
echo "✅ Admin Portal: http://localhost:3003"
echo "=================================================================="