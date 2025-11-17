# Environment Variables Setup

This guide explains how to set up the `.env` file for development, testing, and production environments.

## Overview

The `.env` file contains sensitive configuration that should NOT be committed to version control. It's listed in `.gitignore` to prevent accidental commits.

## Quick Setup

### For Local Development with Docker

1. Create a `.env` file in the project root:

```bash
cat > .env << 'EOF'
# MongoDB Configuration (Docker)
DATABASE_URI=mongodb://mongo:27017/labplusarts-b2b-landing-page

# Payload CMS Secret
PAYLOAD_SECRET=dev-secret-key-change-in-production

# Node Environment
NODE_ENV=development
EOF
```

2. Verify the file was created:
```bash
cat .env
```

### For Local MongoDB (Without Docker)

```bash
cat > .env << 'EOF'
# MongoDB Configuration (Local)
DATABASE_URI=mongodb://127.0.0.1:27017/labplusarts-b2b-landing-page

# Payload CMS Secret
PAYLOAD_SECRET=dev-secret-key-change-in-production

# Node Environment
NODE_ENV=development
EOF
```

## Environment Variables Reference

### Required Variables

#### `DATABASE_URI`

**Description:** Connection string for MongoDB

**Development with Docker:**
```
DATABASE_URI=mongodb://mongo:27017/labplusarts-b2b-landing-page
```

**Development locally:**
```
DATABASE_URI=mongodb://127.0.0.1:27017/labplusarts-b2b-landing-page
```

**Production (MongoDB Atlas):**
```
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/labplusarts-b2b-landing-page?retryWrites=true&w=majority
```

**Components:**
- `mongodb://` - Protocol
- `host:port` - MongoDB server address
- `/database-name` - Database name
- Query parameters (for Atlas) - Connection options

#### `PAYLOAD_SECRET`

**Description:** Secret key used by Payload CMS for encryption and signing

**Requirements:**
- Must be a cryptographically secure random string
- Minimum 32 characters recommended
- Different for each environment

**Generate a secure secret:**

```bash
# macOS / Linux / WSL
openssl rand -base64 32

# Output example:
# P7x/Q9mK2L1vN8pJ5fR4tH6gD3jW2sQ9V7nL4mK8cP1rS5hJ9oE6
```

**Development (temporary):**
```
PAYLOAD_SECRET=dev-secret-key-change-in-production
```

**Production (use generated value):**
```
PAYLOAD_SECRET=P7x/Q9mK2L1vN8pJ5fR4tH6gD3jW2sQ9V7nL4mK8cP1rS5hJ9oE6
```

### Optional Variables

#### `NODE_ENV`

**Description:** Node environment mode

**Values:**
- `development` - Development mode (faster startup, verbose logging)
- `production` - Production mode (optimized, minimal logging)

**Default:** `development`

```
NODE_ENV=development
```

#### `PORT`

**Description:** Port for the application

**Default:** `3000`

```
PORT=3000
```

#### `NEXTAUTH_URL` (if using authentication)

**Description:** URL for authentication callbacks

**Development:**
```
NEXTAUTH_URL=http://localhost:3000
```

**Production:**
```
NEXTAUTH_URL=https://yourdomain.com
```

#### `NEXTAUTH_SECRET` (if using authentication)

**Description:** Secret for NextAuth sessions

**Generate:**
```bash
openssl rand -base64 32
```

## Complete `.env` Templates

### Template 1: Local Development (Docker)

```env
# ============================================
# LOCAL DEVELOPMENT WITH DOCKER
# ============================================

# MongoDB via Docker
DATABASE_URI=mongodb://mongo:27017/labplusarts-b2b-landing-page

# Payload Secret
PAYLOAD_SECRET=dev-local-secret-change-in-production

# Environment
NODE_ENV=development
PORT=3000

# Optional: for debugging
DEBUG=payload:*
```

### Template 2: Local Development (Local MongoDB)

```env
# ============================================
# LOCAL DEVELOPMENT WITH LOCAL MONGODB
# ============================================

# MongoDB local
DATABASE_URI=mongodb://127.0.0.1:27017/labplusarts-b2b-landing-page

# Payload Secret
PAYLOAD_SECRET=dev-local-secret-change-in-production

# Environment
NODE_ENV=development
PORT=3000
```

### Template 3: Staging/Production with MongoDB Atlas

```env
# ============================================
# PRODUCTION WITH MONGODB ATLAS
# ============================================

# MongoDB Atlas
DATABASE_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER_URL/labplusarts-b2b-landing-page?retryWrites=true&w=majority

# Payload Secret (USE GENERATED SECURE VALUE)
PAYLOAD_SECRET=P7x/Q9mK2L1vN8pJ5fR4tH6gD3jW2sQ9V7nL4mK8cP1rS5hJ9oE6

# Environment
NODE_ENV=production
PORT=3000

# Authentication
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=another-secure-generated-value-here

# Optional: monitoring and analytics
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

## Security Best Practices

### ✅ DO:
- ✅ Generate secure random strings for secrets using `openssl rand -base64 32`
- ✅ Use environment-specific values for each environment
- ✅ Keep `.env` in `.gitignore` (already configured)
- ✅ Rotate secrets periodically
- ✅ Use strong, unique passwords for database credentials
- ✅ Restrict file permissions: `chmod 600 .env`
- ✅ Use managed services (MongoDB Atlas) for production
- ✅ Document required variables in a `.env.example` file

### ❌ DON'T:
- ❌ Commit `.env` file to version control
- ❌ Use weak or predictable secrets
- ❌ Reuse secrets across environments
- ❌ Share `.env` files via chat or email
- ❌ Use "password" or other common values as secrets
- ❌ Log environment variables in error messages
- ❌ Store `.env` in public repositories

## Verification

### Test MongoDB Connection

After setting up `.env`, verify the connection:

```bash
# With Docker running
docker-compose exec mongo mongosh mongodb://mongo:27017

# Or locally
mongosh mongodb://127.0.0.1:27017
```

### Start the Application

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Should see: "Local:  http://localhost:3000"
```

### Check Admin Panel

Visit `http://localhost:3000/admin` and verify you can access the Payload admin panel.

## Environment Variable Tips

### Debugging

```bash
# Print environment variables (be careful with secrets)
env | grep -i mongo
env | grep -i payload

# Or in .env file, add debug mode
DEBUG=payload:*
```

### Multiple Environments

Keep separate `.env` files for different contexts:

```bash
.env                 # Current development
.env.production      # Production reference (never commit secrets)
.env.staging         # Staging reference
.env.example         # Template for team (without secrets)
```

Then load them manually:
```bash
cp .env.production .env
pnpm dev
```

Or use a tool like [direnv](https://direnv.net/):
```bash
# .envrc file (direnv)
dotenv .env.development
```

## Troubleshooting

### "DATABASE_URI not set"

**Problem:** Error about missing `DATABASE_URI`

**Solution:**
1. Create `.env` file in project root
2. Add `DATABASE_URI=mongodb://mongo:27017/labplusarts-b2b-landing-page`
3. Restart the application

### "Connection refused"

**Problem:** Cannot connect to MongoDB

**Solution:**
1. Check MongoDB is running: `docker-compose ps`
2. Verify `DATABASE_URI` is correct
3. For Docker: use `mongo` hostname, not `localhost`
4. For local: use `127.0.0.1`, not `localhost`

### "Invalid connection string"

**Problem:** MongoDB connection string error

**Solution:**
1. Verify format: `mongodb://[user:password@]host:port/database`
2. For MongoDB Atlas: ensure `?retryWrites=true&w=majority` is appended
3. Escape special characters in passwords: `%40` for `@`

## Resources

- [MongoDB Connection Strings](https://docs.mongodb.com/manual/reference/connection-string/)
- [MongoDB Atlas Setup](https://docs.mongodb.com/atlas/getting-started/)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Environment Variables Best Practices](https://12factor.net/config)


