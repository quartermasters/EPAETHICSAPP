#!/bin/bash

echo "========================================"
echo "EPA Ethics App - Local Development Setup"
echo "Developed by St. Michael Enterprises LLC"
echo "EPA Contract 68HERD25Q0050"
echo "========================================"
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${BLUE}Node.js version:${NC}"
node --version
echo

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}ERROR: package.json not found${NC}"
    echo "Please run this script from the EPA Ethics App root directory"
    exit 1
fi

echo -e "${YELLOW}Installing dependencies...${NC}"
echo

# Function to install dependencies with error checking
install_deps() {
    local dir=$1
    local name=$2
    
    echo -e "${BLUE}[$3] Installing $name dependencies...${NC}"
    if [ "$dir" != "." ]; then
        cd "$dir" || exit 1
    fi
    
    if npm install; then
        echo -e "${GREEN}✓ $name dependencies installed successfully${NC}"
    else
        echo -e "${RED}✗ Failed to install $name dependencies${NC}"
        exit 1
    fi
    
    if [ "$dir" != "." ]; then
        cd .. || exit 1
    fi
    echo
}

# Install dependencies
install_deps "." "root" "1/4"
install_deps "backend" "backend" "2/4"
install_deps "admin-portal" "admin portal" "3/4"
install_deps "mobile" "mobile app" "4/4"

echo "========================================"
echo -e "${GREEN}Setup Complete!${NC}"
echo "========================================"
echo
echo "The EPA Ethics App is now ready for local testing."
echo
echo -e "${BLUE}To start the application:${NC}"
echo "  1. Backend API: cd backend && npm run dev"
echo "  2. Admin Portal: cd admin-portal && npm run dev"
echo "  3. Mobile App: cd mobile && npm start"
echo
echo "Or run all at once: npm run dev:all"
echo
echo -e "${BLUE}Access points:${NC}"
echo "  - Backend API: http://localhost:3001"
echo "  - Admin Portal: http://localhost:3000"
echo "  - Mobile App: http://localhost:19006"
echo
echo -e "${BLUE}Test credentials:${NC}"
echo "  - Username: admin"
echo "  - Password: TestPassword123!"
echo "  - MFA Code: 123456"
echo
echo "For detailed testing instructions, see LOCAL_TESTING_GUIDE.md"
echo

# Make the script pause on macOS/Linux (equivalent to Windows pause)
read -p "Press any key to continue..."