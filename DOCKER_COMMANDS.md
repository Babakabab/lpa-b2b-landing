# Docker Commands Reference

Quick reference for common Docker commands for this project.

## Container Management

### Start Services

```bash
# Start everything (MongoDB + Payload)
docker-compose up

# Start MongoDB only (in background)
docker-compose up mongo -d

# Start Payload only (MongoDB must be running)
docker-compose up payload

# Rebuild and start (if Dockerfile changed)
docker-compose up --build
```

### Stop Services

```bash
# Stop all services (keeps data)
docker-compose stop

# Stop specific service
docker-compose stop mongo

# Stop and remove containers (keeps data volumes)
docker-compose down

# Stop and remove everything including volumes (DELETES DATA)
docker-compose down -v
```

### View Status

```bash
# List running containers
docker-compose ps

# Show all containers (including stopped)
docker-compose ps -a

# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs mongo
docker-compose logs payload

# Follow logs (live)
docker-compose logs -f mongo
docker-compose logs -f payload
```

## MongoDB Specific

### Access MongoDB Shell

```bash
# Connect to MongoDB via docker-compose
docker-compose exec mongo mongosh

# Or if running MongoDB directly with Docker
docker exec lpa-b2b-mongo mongosh
```

### Common MongoDB Commands

```javascript
// Inside MongoDB shell:

// Show all databases
show dbs

// Switch to your database
use labplusarts-b2b-landing-page

// Show all collections
show collections

// Check connection status
db.runCommand({ ping: 1 })

// View collection stats
db.collection_name.stats()

// Exit shell
exit
```

### Check MongoDB Health

```bash
# Quick health check
docker-compose exec mongo mongosh --eval "db.runCommand({ ping: 1 })"

# Detailed status
docker-compose exec mongo mongosh --eval "db.serverStatus()"
```

## Debugging

### View Container Details

```bash
# Inspect MongoDB container
docker-compose ps mongo
docker inspect lpa-b2b-mongo

# Get container IP address
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' lpa-b2b-mongo
```

### Check Logs for Errors

```bash
# View last 50 lines
docker-compose logs --tail=50 mongo

# Follow logs with timestamps
docker-compose logs -f --timestamps mongo

# View since specific time
docker-compose logs --since 10m mongo
```

### Network Debugging

```bash
# Check if containers can communicate
docker-compose exec payload ping mongo

# View network configuration
docker network inspect lpa-network
```

## Cleanup & Maintenance

### Remove Unused Resources

```bash
# Remove stopped containers
docker container prune -f

# Remove dangling volumes
docker volume prune -f

# Remove unused images
docker image prune -f

# Complete cleanup (use with caution)
docker system prune -a -f
```

### Restart Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart mongo

# Restart with rebuild
docker-compose up --build
```

## Disk Space

### Check Docker Disk Usage

```bash
# View Docker disk space usage
docker system df

# Detailed volume info
docker volume ls

# Remove specific volume
docker volume rm volume_name
```

## Development Workflow

### Development Loop

```bash
# 1. Start MongoDB first (recommended)
docker-compose up mongo -d

# 2. In another terminal, start your local dev server
pnpm dev

# OR start everything together
docker-compose up

# 3. View logs
docker-compose logs -f

# 4. When done, stop services
docker-compose down
```

### Force Rebuild

```bash
# If you modified Dockerfile or docker-compose.yml
docker-compose down -v
docker-compose up --build
```

### Fresh Start (Warning: Deletes Data)

```bash
# Remove everything and start fresh
docker-compose down -v
docker-compose up
```

## Production Tips

### For Production Deployments

```bash
# Run in detached mode
docker-compose up -d

# Use specific image tags (not 'latest')
# Edit docker-compose.yml to use: mongo:7.0 instead of mongo:latest

# Enable restart policy
# Add to mongo service:
# restart_policy:
#   condition: on-failure
#   max_attempts: 3

# Setup backup
docker exec lpa-b2b-mongo mongodump -o /backup
```

## Useful Aliases

Add to your `.bash_profile`, `.zshrc`, or similar:

```bash
# Docker Compose shortcuts
alias dc="docker-compose"
alias dcup="docker-compose up -d"
alias dcdown="docker-compose down"
alias dclogs="docker-compose logs -f"
alias dcps="docker-compose ps"

# MongoDB specific
alias mongosh-app="docker-compose exec mongo mongosh"
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 27017
lsof -i :27017

# Kill process
kill -9 <PID>

# Or use different port in docker-compose.yml:
# ports:
#   - '27018:27017'
```

### Connection Refused

```bash
# Check if containers are running
docker-compose ps

# Check MongoDB health
docker-compose exec mongo mongosh --eval "db.runCommand({ ping: 1 })"

# View MongoDB logs
docker-compose logs mongo
```

### Out of Disk Space

```bash
# Clean up all Docker resources
docker system prune -a -f --volumes

# Or remove specific volume
docker volume ls
docker volume rm lpa-b2b-landing_data
```

## More Information

- Docker Compose Docs: https://docs.docker.com/compose/
- MongoDB Docs: https://docs.mongodb.com/
- Docker CLI Reference: https://docs.docker.com/engine/reference/commandline/


