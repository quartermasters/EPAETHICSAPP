# EPA Ethics App - Docker Setup Guide

## Quick Start

1. **Prerequisites**
   - Docker Desktop installed
   - Docker Compose installed
   - Make (optional, for convenience commands)

2. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd EPAETHICSAPP
   cp .env.example .env
   ```

3. **Start the Application**
   ```bash
   # Using Make (recommended)
   make up-dev

   # Or using Docker Compose directly
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
   ```

4. **Access the Application**
   - **Backend API**: http://localhost:3001
   - **Admin Portal**: http://localhost:3000
   - **Mobile App**: http://localhost:19006
   - **Database**: localhost:5432

## Service Details

### Backend API (Port 3001)
- Node.js/Express API server
- PostgreSQL database integration
- JWT authentication
- File upload handling

### Admin Portal (Port 3000)
- Next.js web application
- Content management interface
- User administration
- Analytics dashboard

### Mobile App (Port 19006)
- React Native with Expo
- Web preview available
- Mobile development server
- Hot reloading enabled

### PostgreSQL Database (Port 5432)
- Persistent data storage
- Automatic schema initialization
- Development data seeding

### Redis Cache (Port 6379)
- Session storage
- API response caching
- Real-time features support

## Common Commands

```bash
# Start all services
make up-dev

# View logs
make logs

# Stop all services
make down

# Restart a specific service
make restart-backend
make restart-admin
make restart-mobile

# Access container shells
make shell-backend
make shell-admin
make shell-mobile

# Database operations
make db-shell     # Connect to PostgreSQL
make db-reset     # Reset database (WARNING: Deletes data)

# Development operations
make install      # Install dependencies
make lint         # Run linting
make test         # Run tests

# Clean up
make clean        # Remove all containers and volumes
```

## Development Workflow

1. **Make changes to code** - Files are mounted as volumes for hot reloading
2. **View logs** - `make logs` to see real-time output
3. **Test changes** - Access services through web browser or mobile
4. **Debug issues** - Use `make shell-<service>` to access container shells

## Environment Variables

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `NEXTAUTH_SECRET` - NextAuth session secret
- `API_URL` - Backend API URL for frontend services

## Database Management

### Initial Setup
The database is automatically initialized with:
- Schema creation
- Sample data
- Default admin user (admin@epa.gov / admin123)

### Reset Database
```bash
make db-reset
```
**WARNING**: This deletes all data and recreates the database.

### Connect to Database
```bash
make db-shell
```

### Backup/Restore
```bash
# Backup
docker-compose exec postgres pg_dump -U postgres epa_ethics > backup.sql

# Restore
docker-compose exec -T postgres psql -U postgres epa_ethics < backup.sql
```

## Troubleshooting

### Port Conflicts
If ports are already in use, modify `docker-compose.yml`:
```yaml
ports:
  - "3002:3001"  # Change host port (left side)
```

### Container Won't Start
```bash
# Check logs
make logs-<service>

# Rebuild container
docker-compose build --no-cache <service>
```

### Database Connection Issues
```bash
# Check database status
docker-compose ps postgres

# View database logs
docker-compose logs postgres

# Reset database
make db-reset
```

### Permission Issues
```bash
# Fix file permissions (macOS/Linux)
sudo chown -R $USER:$USER .

# Or run with proper permissions
docker-compose exec --user root backend chown -R node:node /app
```

## Production Considerations

This Docker setup is for **development only**. For production:

1. Use multi-stage builds for smaller images
2. Implement proper secrets management
3. Use external database services
4. Configure SSL/TLS certificates
5. Implement container health checks
6. Use production-grade reverse proxy
7. Configure logging and monitoring

## File Structure

```
EPAETHICSAPP/
├── docker-compose.yml          # Main compose file
├── docker-compose.dev.yml      # Development overrides
├── .dockerignore              # Docker ignore rules
├── .env.example               # Environment template
├── Makefile                   # Convenience commands
├── backend/
│   ├── Dockerfile             # Backend container
│   └── db/init.sql           # Database schema
├── admin-portal/
│   └── Dockerfile             # Admin portal container
└── mobile/
    └── Dockerfile             # Mobile app container
```

## Next Steps

1. Start the application: `make up-dev`
2. Visit http://localhost:3000 for admin portal
3. Visit http://localhost:19006 for mobile app
4. Begin development with hot reloading enabled