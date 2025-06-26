#!/bin/bash

echo "🔧 Fixing import paths in mobile app..."

cd mobile/src

# Fix all import paths from shared/design to local design
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|../../../shared/design/design-system|../../design/design-system|g'
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|../../../shared/design/st-michael-branding|../../design/st-michael-branding|g'

echo "✅ All import paths fixed!"

cd ../..

echo "🚀 Now restarting Expo..."
echo "Press 'r' in Expo to reload the app, or Ctrl+C and restart"