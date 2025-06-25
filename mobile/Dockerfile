# Mobile App Dockerfile
FROM node:18-alpine

# Install global dependencies for Expo
RUN npm install -g @expo/cli

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose Expo ports
EXPOSE 19000 19001 19002 19006

# Development command (will be overridden by docker-compose)
CMD ["npx", "expo", "start", "--web"]