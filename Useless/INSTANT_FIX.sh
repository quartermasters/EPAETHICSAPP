#!/bin/bash

echo "=================================================================="
echo "EPA ETHICS APP - INSTANT FIX AND START"
echo "=================================================================="
echo "Contract: EPA 68HERD25Q0050"
echo "Developer: St. Michael Enterprises LLC"  
echo "=================================================================="

# Kill any existing processes
echo "🧹 Cleaning up existing processes..."
pkill -f "3002" 2>/dev/null || true
pkill -f "3003" 2>/dev/null || true  
pkill -f "19007" 2>/dev/null || true
pkill -f "expo" 2>/dev/null || true
pkill -f "next" 2>/dev/null || true
sleep 3

echo ""
echo "1️⃣ Starting Backend API..."
cd backend
nohup node src/demo-server.js > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
sleep 5

# Test backend
if curl -s http://localhost:3002/api/health > /dev/null; then
    echo "✅ Backend API is working! (http://localhost:3002/api/health)"
else
    echo "❌ Backend API failed - check backend.log"
    exit 1
fi

echo ""
echo "2️⃣ Starting Mobile App..."
cd ../mobile
nohup node simple-app.js > mobile.log 2>&1 &
MOBILE_PID=$!
echo "Mobile PID: $MOBILE_PID"
sleep 5

# Test mobile
if curl -s http://localhost:19007 > /dev/null; then
    echo "✅ Mobile App is working! (http://localhost:19007)"
else
    echo "❌ Mobile App failed - check mobile.log"
    exit 1
fi

echo ""
echo "3️⃣ Starting Admin Portal..."
cd ../admin-portal
nohup npm run dev -- --port 3003 > admin.log 2>&1 &
ADMIN_PID=$!
echo "Admin PID: $ADMIN_PID"
sleep 15

# Test admin (wait longer for Next.js to compile)
for i in {1..30}; do
    if curl -s http://localhost:3003 > /dev/null; then
        echo "✅ Admin Portal is working! (http://localhost:3003)"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Admin Portal failed - check admin.log"
        exit 1
    fi
    sleep 2
done

cd ..

echo ""
echo "=================================================================="
echo "🎉 ALL COMPONENTS ARE NOW RUNNING SUCCESSFULLY!"
echo "=================================================================="
echo "🔌 Backend API:    http://localhost:3002/api/health"
echo "📱 Mobile App:     http://localhost:19007"
echo "🖥️  Admin Portal:   http://localhost:3003"
echo "=================================================================="
echo ""
echo "📋 Demo Credentials for Admin Portal:"
echo "   Username: admin"
echo "   Password: demo123"
echo "   MFA Code: 123456"
echo ""
echo "📱 For mobile testing with Expo Go:"
echo "   cd mobile && npx expo start --tunnel"
echo ""
echo "📊 Process IDs:"
echo "   Backend: $BACKEND_PID"
echo "   Mobile:  $MOBILE_PID"
echo "   Admin:   $ADMIN_PID"
echo ""
echo "🛑 To stop all services:"
echo "   kill $BACKEND_PID $MOBILE_PID $ADMIN_PID"
echo ""
echo "📝 Logs are available in:"
echo "   backend/backend.log"
echo "   mobile/mobile.log" 
echo "   admin-portal/admin.log"
echo ""
echo "✅ EPA Ethics App is ready for evaluation!"
echo "=================================================================="