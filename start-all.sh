#!/bin/bash

echo "======================================================================"
echo "EPA ETHICS APP - STARTING ALL COMPONENTS"
echo "======================================================================"
echo "Contract: EPA 68HERD25Q0050"
echo "Developer: St. Michael Enterprises LLC"
echo "======================================================================"

# Function to start component in background
start_component() {
    local name=$1
    local script=$2
    local port=$3
    
    echo "Starting $name on port $port..."
    ./$script &
    local pid=$!
    echo "$name started with PID $pid"
    
    # Wait a moment for the service to start
    sleep 3
    
    # Check if the service is running
    if kill -0 $pid 2>/dev/null; then
        echo "✅ $name is running successfully"
    else
        echo "❌ Failed to start $name"
    fi
}

# Start all components
start_component "Backend API" "start-backend.sh" "3002"
start_component "Mobile App" "start-mobile.sh" "19007" 
start_component "Admin Portal" "start-admin.sh" "3003"

echo ""
echo "======================================================================"
echo "ALL COMPONENTS STARTED!"
echo "======================================================================"
echo "🔌 Backend API:    http://localhost:3002/api/health"
echo "📱 Mobile App:     http://localhost:19007"
echo "🖥️  Admin Portal:   http://localhost:3003"
echo "======================================================================"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for user to stop
wait
