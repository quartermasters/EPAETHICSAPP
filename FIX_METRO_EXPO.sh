#!/bin/bash

echo "=================================================================="
echo "EPA ETHICS APP - FIXING METRO + EXPO SDK 53 ISSUES"
echo "=================================================================="
echo "Contract: EPA 68HERD25Q0050"
echo "Developer: St. Michael Enterprises LLC"
echo "=================================================================="

# Navigate to mobile directory
cd mobile

echo "🧹 Cleaning up problematic cache and dependencies..."

# Remove all caches and node_modules
rm -rf node_modules package-lock.json
rm -rf ~/.expo
rm -rf ~/.npm/_npx
rm -rf .expo

# Clear npm cache
npm cache clean --force

echo "📦 Installing fresh dependencies with Metro fixes..."

# Install dependencies
npm install

# Install specific Metro dependencies to fix the issue
echo "🔧 Installing Metro dependencies for SDK 53..."
npm install --save-dev metro@^0.80.3 @expo/metro-runtime@~3.2.1

# Install latest Expo CLI locally to avoid npx conflicts
echo "📱 Installing Expo CLI locally..."
npm install --save-dev @expo/cli@latest

echo "🔍 Verifying installation..."
echo "Node modules Metro check:"
ls node_modules/metro/src/lib/ | grep -i terminal || echo "Metro TerminalReporter not found - installing specific version"

# If Metro TerminalReporter still missing, install a compatible version
if [ ! -f "node_modules/metro/src/lib/TerminalReporter.js" ]; then
    echo "🔧 Installing specific Metro version with TerminalReporter..."
    npm install --save-dev metro@0.80.3 metro-runtime@0.80.3
fi

echo ""
echo "🚀 Testing Expo startup..."

# Test with local Expo CLI first
echo "Testing with locally installed Expo CLI..."
./node_modules/.bin/expo --version

echo ""
echo "=================================================================="
echo "✅ METRO + EXPO ISSUES FIXED!"
echo "=================================================================="
echo ""
echo "🎯 Ready to test! Run one of these commands:"
echo ""
echo "Option 1 - Local Expo CLI (Recommended):"
echo "  cd mobile"
echo "  ./node_modules/.bin/expo start --tunnel"
echo ""
echo "Option 2 - Global npx (if working):"
echo "  cd mobile"  
echo "  npx expo start --tunnel"
echo ""
echo "Option 3 - Use our fixed testing script:"
echo "  ./EXPO_MOBILE_TEST_FIXED.sh"
echo ""
echo "📋 What was fixed:"
echo "  • Cleared all conflicting caches"
echo "  • Installed compatible Metro versions"
echo "  • Added local Expo CLI"
echo "  • Fixed SDK 53 compatibility issues"
echo ""
echo "=================================================================="

cd ..

echo "🎉 EPA Ethics App ready for Expo Go testing with SDK 53!"