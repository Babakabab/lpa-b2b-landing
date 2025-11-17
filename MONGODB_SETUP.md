# MongoDB Setup Guide

This project uses MongoDB with Payload CMS. Your project already has Docker configured for MongoDB. Follow this guide to get started.

## Prerequisites

- **Docker** and **Docker Compose** installed on your machine
  - [Install Docker Desktop](https://www.docker.com/products/docker-desktop)

## Quick Start with Docker

### Step 1: Create Environment Variables

Create a `.env` file in the project root (this file will be gitignored for security):

```bash
cp .env.example .env
```

Or manually create `.env` with:

```env
DATABASE_URI=mongodb://mongo:27017/labplusarts-b2b-landing-page
PAYLOAD_SECRET=your-secure-secret-key-change-in-production
```

**For production**, generate a secure secret:
```bash
openssl rand -base64 32
```

### Step 2: Start MongoDB Only

To start just the MongoDB container:

```bash
docker-compose up mongo -d
```

This will:
- Start MongoDB on `localhost:27017`
- Create a persistent volume for data (`data`)
- Store the container as a background process (`-d` flag)

Verify MongoDB is running:
```bash
docker-compose ps
```

You should see the `mongo` service in the output with status "Up".

### Step 3: Start the Full Stack

To start both MongoDB and the Payload/Next.js application:

```bash
docker-compose up
```

This will:
1. Start MongoDB container
2. Install dependencies (using pnpm)
3. Start the development server
4. Make the app accessible at `http://localhost:3000`

### Step 4: Install Dependencies (if not using full stack)

If MongoDB is running but you want to run Node.js locally:

```bash
pnpm install
pnpm dev
```

## Useful Docker Commands

### View MongoDB logs
```bash
docker-compose logs mongo
```

### View running containers
```bash
docker-compose ps
```

### Stop MongoDB
```bash
docker-compose stop mongo
```

### Stop all services
```bash
docker-compose down
```

### Stop all services and remove volumes
```bash
docker-compose down -v
```

### Access MongoDB shell
```bash
docker-compose exec mongo mongosh
```

## Verify MongoDB Connection

Once MongoDB is running, verify the connection:

### Using mongosh (if installed locally)
```bash
mongosh mongodb://127.0.0.1:27017
```

### Using Docker
```bash
docker-compose exec mongo mongosh
```

### Check database exists
```javascript
show dbs
use labplusarts-b2b-landing-page
show collections
```

## Alternative Setup Options

### Option 1: Local MongoDB (Without Docker)

If you prefer to run MongoDB locally without Docker:

1. **Install MongoDB**
   - [Download and install MongoDB](https://www.mongodb.com/docs/manual/installation/)

2. **Update `.env`**
   ```env
   DATABASE_URI=mongodb://127.0.0.1:27017/labplusarts-b2b-landing-page
   ```

3. **Start MongoDB** (command varies by OS):
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```

4. **Run the project**
   ```bash
   pnpm install
   pnpm dev
   ```

### Option 2: MongoDB Atlas (Cloud)

For cloud-hosted MongoDB:

1. **Create a MongoDB Atlas account** at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a cluster** and get your connection string

3. **Update `.env`** with your connection string:
   ```env
   DATABASE_URI=mongodb+srv://username:password@cluster0.mongodb.net/labplusarts-b2b-landing-page?retryWrites=true&w=majority
   ```

4. **Run the project**
   ```bash
   pnpm install
   pnpm dev
   ```

## Database Initialization

When you first run the project:

1. Visit `http://localhost:3000`
2. Follow the on-screen instructions to create your first admin user
3. Login to access the Payload admin panel
4. Optionally seed the database with demo data from the admin dashboard

## Troubleshooting

### MongoDB connection refused
- Check if Docker is running: `docker ps`
- Check if MongoDB container is running: `docker-compose ps`
- Verify the `DATABASE_URI` in `.env` matches your setup

### Port already in use
If port 27017 is already in use:
- Change the port in `docker-compose.yml`:
  ```yaml
  mongo:
    ports:
      - '27018:27017'  # Use 27018 instead
  ```
- Update `DATABASE_URI` accordingly

### Container crashes on startup
- Check logs: `docker-compose logs mongo`
- Ensure `.env` file exists and has required variables
- Try removing and recreating: `docker-compose down -v && docker-compose up`

## Performance Tips

### For Development
- MongoDB is optimized for your use case out of the box
- Keep the mongo container running in the background

### For Production
- See the MongoDB [production deployment guide](https://www.mongodb.com/docs/manual/administration/production-checklist/)
- Consider using MongoDB Atlas or a managed service
- Enable authentication and encryption
- Set up regular backups

## Next Steps

After setup:
1. Read [README.md](./README.md) for project overview
2. Check [QUICK_START.md](./QUICK_START.md) for additional setup info
3. Visit the Payload CMS admin at `http://localhost:3000/admin`
4. Explore the documentation at [payloadcms.com/docs](https://payloadcms.com/docs)


