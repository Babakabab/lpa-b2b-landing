# MongoDB & Docker Setup Summary

Quick reference for getting MongoDB and Docker running on this project.

## 📋 Setup Checklist

- [ ] Docker Desktop installed ([download here](https://www.docker.com/products/docker-desktop))
- [ ] `.env` file created with `DATABASE_URI` and `PAYLOAD_SECRET`
- [ ] MongoDB container started (`docker-compose up mongo -d`)
- [ ] Dependencies installed (`pnpm install`)
- [ ] Development server running (`pnpm dev`)
- [ ] Admin panel accessible (`http://localhost:3000/admin`)

## 🚀 Quick Start (2 minutes)

### 1. Create `.env` File

```bash
cat > .env << 'EOF'
DATABASE_URI=mongodb://mongo:27017/labplusarts-b2b-landing-page
PAYLOAD_SECRET=dev-secret-key-change-in-production
EOF
```

### 2. Start MongoDB

```bash
docker-compose up mongo -d
```

### 3. Start the Project

```bash
pnpm install
pnpm dev
```

### 4. Access Admin Panel

Open browser to: `http://localhost:3000/admin`

---

## 📚 Detailed Guides

| Guide | Purpose |
|-------|---------|
| **[MONGODB_SETUP.md](./MONGODB_SETUP.md)** | Complete MongoDB setup (Docker, Local, Atlas) |
| **[ENV_SETUP.md](./ENV_SETUP.md)** | Environment variables configuration |
| **[DOCKER_COMMANDS.md](./DOCKER_COMMANDS.md)** | Common Docker commands & troubleshooting |

---

## 🔧 Development Commands

### Start All Services
```bash
docker-compose up          # Start MongoDB + Payload (foreground)
docker-compose up -d       # Start in background
```

### Start Individual Services
```bash
docker-compose up mongo -d    # MongoDB only
docker-compose up payload     # Payload/Node only (requires MongoDB)
pnpm dev                      # Local Node without Docker
```

### Stop Services
```bash
docker-compose stop        # Stop all (keeps data)
docker-compose down        # Remove containers (keeps data)
docker-compose down -v     # Remove everything (DELETES DATA)
```

### View Status & Logs
```bash
docker-compose ps          # List running containers
docker-compose logs mongo  # View MongoDB logs
docker-compose logs -f     # Follow all logs
```

### Access MongoDB
```bash
docker-compose exec mongo mongosh
```

---

## ✅ Verify Setup

### Check Docker
```bash
docker-compose ps
# Should show:
# NAME                COMMAND                  SERVICE   STATUS
# lpa-b2b-mongo       "mongod --storageEngine" mongo     Up
# lpa-b2b-payload     "sh -c npm install..."   payload   Up
```

### Check MongoDB Connection
```bash
docker-compose exec mongo mongosh --eval "db.runCommand({ ping: 1 })"
# Should output: { ok: 1 }
```

### Check Application
```bash
curl http://localhost:3000
# Should return HTML page
```

---

## 🎯 Common Scenarios

### Scenario 1: Fresh Start
```bash
# If starting from scratch
docker-compose down -v                    # Clean up
cat > .env << 'EOF'
DATABASE_URI=mongodb://mongo:27017/labplusarts-b2b-landing-page
PAYLOAD_SECRET=dev-secret
EOF
docker-compose up mongo -d                # Start MongoDB
pnpm install && pnpm dev                  # Install & run
```

### Scenario 2: MongoDB Already Running
```bash
# If MongoDB is already running locally
cat > .env << 'EOF'
DATABASE_URI=mongodb://127.0.0.1:27017/labplusarts-b2b-landing-page
PAYLOAD_SECRET=dev-secret
EOF
pnpm install && pnpm dev                  # Run locally
```

### Scenario 3: Using MongoDB Atlas (Cloud)
```bash
# Sign up at mongodb.com/cloud/atlas
cat > .env << 'EOF'
DATABASE_URI=mongodb+srv://user:password@cluster.mongodb.net/labplusarts-b2b-landing-page?retryWrites=true&w=majority
PAYLOAD_SECRET=dev-secret
EOF
pnpm install && pnpm dev                  # Run locally
```

### Scenario 4: Port Conflict
```bash
# If port 27017 is already in use
# Edit docker-compose.yml:
# ports:
#   - '27018:27017'  # Use 27018 instead
# Then update .env:
# DATABASE_URI=mongodb://mongo:27018/labplusarts-b2b-landing-page
docker-compose up mongo -d
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `.env` not working | Check file is in project root, use absolute path if needed |
| MongoDB won't start | Run `docker-compose down -v && docker-compose up mongo -d` |
| Connection refused | Verify MongoDB running: `docker-compose ps` |
| Port already in use | Change port in `docker-compose.yml` and update `DATABASE_URI` |
| Containers won't stop | Run `docker-compose kill` |
| Out of disk space | Run `docker system prune -a -f` |

For more help, see:
- [DOCKER_COMMANDS.md](./DOCKER_COMMANDS.md#troubleshooting) - Detailed troubleshooting
- [MongoDB Docs](https://docs.mongodb.com) - MongoDB help
- [Payload Docs](https://payloadcms.com/docs) - Payload CMS help

---

## 🔐 Security Notes

### Development
- ✅ Use simple secrets (`dev-secret-key-etc`)
- ✅ `.env` is gitignored by default
- ✅ Local MongoDB is fine for development

### Production
- ✅ Generate secure secrets: `openssl rand -base64 32`
- ✅ Use MongoDB Atlas or managed service
- ✅ Enable authentication
- ✅ Use HTTPS
- ✅ Backup regularly
- ❌ Never commit `.env` files
- ❌ Never share secrets via chat/email

---

## 📦 Project Structure

```
lpa-b2b-landing/
├── docker-compose.yml      # ← Docker services config
├── Dockerfile             # ← App container config
├── .env                   # ← Environment variables (created by you)
├── .env.example           # ← Template (check for reference)
├── package.json           # ← Dependencies
├── src/
│   ├── payload.config.ts  # ← Payload CMS config (uses DATABASE_URI)
│   └── ...
├── MONGODB_SETUP.md       # ← Complete MongoDB setup guide
├── ENV_SETUP.md           # ← Environment variables guide
├── DOCKER_COMMANDS.md     # ← Docker commands reference
├── SETUP_SUMMARY.md       # ← This file
└── README.md              # ← Main project documentation
```

---

## 🎓 Learning Resources

- **Docker Basics**: https://docs.docker.com/get-started/
- **Docker Compose**: https://docs.docker.com/compose/
- **MongoDB**: https://docs.mongodb.com/
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas/
- **Payload CMS**: https://payloadcms.com/docs/
- **Next.js**: https://nextjs.org/docs

---

## 💡 Tips & Tricks

### Speed Up Docker Builds
```bash
# Use Docker BuildKit for faster builds
export DOCKER_BUILDKIT=1
docker-compose up --build
```

### Monitor Docker Resources
```bash
# Real-time stats
docker stats

# Disk usage
docker system df
```

### Backup MongoDB Data
```bash
# Inside container
docker-compose exec mongo mongodump -o /data/db/backup

# To host machine
docker cp lpa-b2b-mongo:/data/db ./mongo-backup
```

### Development with Auto-reload
```bash
# Terminal 1: Start MongoDB
docker-compose up mongo -d

# Terminal 2: Run dev server with file watching
pnpm dev     # Auto-reloads on file changes
```

---

## ❓ FAQ

**Q: Do I need Docker to run this project?**
A: No, you can run MongoDB locally. See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for alternatives.

**Q: Can I use MongoDB Atlas instead of Docker?**
A: Yes! See [MONGODB_SETUP.md](./MONGODB_SETUP.md#option-2-mongodb-atlas-cloud) for setup.

**Q: Will my database persist if I stop Docker?**
A: Yes, data is stored in a Docker volume (`data`). It survives `docker-compose down`.

**Q: How do I delete all data and start fresh?**
A: Run `docker-compose down -v` to remove containers and volumes.

**Q: Can I use a different MongoDB port?**
A: Yes, edit `docker-compose.yml` ports and update `DATABASE_URI`.

**Q: How do I backup my database?**
A: Run `docker-compose exec mongo mongodump -o /backup` or use MongoDB Atlas automated backups.

---

## 🆘 Need Help?

1. Check the relevant guide:
   - Setup issues? → [MONGODB_SETUP.md](./MONGODB_SETUP.md)
   - Environment variables? → [ENV_SETUP.md](./ENV_SETUP.md)
   - Docker commands? → [DOCKER_COMMANDS.md](./DOCKER_COMMANDS.md)

2. Check troubleshooting sections in the guides

3. Visit official docs:
   - MongoDB: https://docs.mongodb.com
   - Payload CMS: https://payloadcms.com/docs
   - Docker: https://docs.docker.com

4. Check project issues: https://github.com/payloadcms/payload

---

## 🎉 You're All Set!

You now have MongoDB and Docker configured for this project. Start developing! 🚀

**Next Steps:**
1. Create your first admin user (when you run `pnpm dev`)
2. Explore the Payload admin panel
3. Seed sample data (optional)
4. Start building your content!

Happy coding! 💻


