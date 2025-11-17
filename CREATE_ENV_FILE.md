# Creating Your .env File

The `.env` file is required but not included in version control for security reasons. Follow these steps to create it.

## Method 1: Using Terminal (Fastest)

### Copy from template:
```bash
cd /path/to/lpa-b2b-landing

# Copy the example (if it exists)
cp .env.example .env
```

### Or create from scratch (Docker setup):
```bash
cat > .env << 'EOF'
DATABASE_URI=mongodb://mongo:27017/labplusarts-b2b-landing-page
PAYLOAD_SECRET=dev-secret-key-change-in-production
EOF
```

### Or create from scratch (Local MongoDB):
```bash
cat > .env << 'EOF'
DATABASE_URI=mongodb://127.0.0.1:27017/labplusarts-b2b-landing-page
PAYLOAD_SECRET=dev-secret-key-change-in-production
EOF
```

### Verify it was created:
```bash
cat .env
```

## Method 2: Using Your Text Editor

### 1. Open your project folder
- Open VS Code, Sublime, or your favorite editor

### 2. Create new file
- Right-click in project root → "New File"
- Name it `.env`

### 3. Add this content:
```env
DATABASE_URI=mongodb://mongo:27017/labplusarts-b2b-landing-page
PAYLOAD_SECRET=dev-secret-key-change-in-production
```

### 4. Save the file
- Press Ctrl+S (or Cmd+S on Mac)
- Make sure it's in the project root (same level as `package.json`)

## Method 3: Using macOS Finder / Windows Explorer

### macOS:
1. Open Finder
2. Go to your project folder
3. Press Cmd+Shift+. (period) to show hidden files
4. Create new file named `.env`
5. Open with TextEdit
6. Paste the content from above
7. Format → Make Plain Text
8. Save

### Windows:
1. Open File Explorer
2. Go to your project folder
3. Right-click → New → Text Document
4. Rename to `.env` (replace `New Text Document.txt`)
5. Open with Notepad
6. Paste the content from above
7. Save

## Quick Reference: Where to Put It

The `.env` file should be in your project root:

```
lpa-b2b-landing/              ← Project root
├── .env                      ← YOUR FILE GOES HERE
├── docker-compose.yml
├── package.json
├── README.md
└── ... other files
```

## What Goes in `.env`?

### Minimum Configuration (Docker):
```env
DATABASE_URI=mongodb://mongo:27017/labplusarts-b2b-landing-page
PAYLOAD_SECRET=dev-secret-key-change-in-production
```

### Alternative: Local MongoDB:
```env
DATABASE_URI=mongodb://127.0.0.1:27017/labplusarts-b2b-landing-page
PAYLOAD_SECRET=dev-secret-key-change-in-production
```

### Alternative: MongoDB Atlas (Cloud):
```env
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/labplusarts-b2b-landing-page?retryWrites=true&w=majority
PAYLOAD_SECRET=dev-secret-key-change-in-production
```

## Important Notes

### ✅ Safe Practices
- ✅ File is in `.gitignore` (already configured)
- ✅ Don't commit `.env` to version control
- ✅ Each team member has their own `.env`
- ✅ Use this file to override defaults

### ❌ Common Mistakes
- ❌ Don't name it `.env.txt` - must be `.env` exactly
- ❌ Don't put spaces around the `=` sign: `DATABASE_URI = value` ❌
- ❌ Don't use quotes around values (usually): `DATABASE_URI=mongodb://...` ✅
- ❌ Don't leave it in a public folder or email it

## Verification Checklist

After creating `.env`:

1. **File exists in right location:**
   ```bash
   ls -la .env
   # Should show: .env
   ```

2. **File has content:**
   ```bash
   cat .env
   # Should show your DATABASE_URI and PAYLOAD_SECRET
   ```

3. **No trailing whitespace:**
   ```bash
   cat .env | od -c
   # Check for unexpected characters
   ```

4. **Start the app:**
   ```bash
   pnpm dev
   # Should connect to MongoDB successfully
   ```

## Troubleshooting

### File not found errors?
- Make sure `.env` is in the project **root** directory
- Use full path: `/path/to/project/.env`
- Check file name is exactly `.env`

### Application can't read `.env`?
- Restart development server after creating `.env`
- Check file permissions: `chmod 644 .env`
- Verify `.env` is in the right directory with `pwd` and `ls -la .env`

### Still having issues?
- See [ENV_SETUP.md](./ENV_SETUP.md) for detailed configuration help
- See [MONGODB_SETUP.md](./MONGODB_SETUP.md) for connection troubleshooting
- See [DOCKER_COMMANDS.md](./DOCKER_COMMANDS.md) for Docker issues

## Next Steps

After creating `.env`:

1. Start MongoDB:
   ```bash
   docker-compose up mongo -d
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the dev server:
   ```bash
   pnpm dev
   ```

4. Open in browser:
   ```
   http://localhost:3000
   ```

That's it! Your environment is now configured. 🎉


