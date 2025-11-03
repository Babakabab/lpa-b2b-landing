# Quick Start Guide - B2B Landing Page

## 🚀 Get Your Site Running in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- pnpm installed
- MongoDB connection (local or cloud)

---

## Step 1: Environment Setup

Create a `.env` file in the project root:

```bash
# Database
DATABASE_URI=mongodb://localhost:27017/labplusarts-b2b

# Payload
PAYLOAD_SECRET=your-secret-key-here-change-this

# Server
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

---

## Step 2: Install Dependencies

```bash
pnpm install
```

---

## Step 3: Start Development Server

```bash
pnpm dev
```

The site will be available at:
- **Frontend:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

---

## Step 4: Create Admin Account

1. Navigate to http://localhost:3000/admin
2. Create your first admin user
3. Log in to the Payload CMS admin panel

---

## Step 5: Create Homepage

### Option A: Quick Setup (5 minutes)

1. In the admin panel, go to **Collections → Pages**
2. Click **Create New**
3. Set the following:
   - **Title:** `Home`
   - **Slug:** `home`
   - **Status:** `Published`

4. **Add a simple B2B Hero block:**
   - Click "Add Block" in the Content tab
   - Select "B2B Hero"
   - **Heading:** `Alle laborders, uitslagen en opvolging—op één NL-compliant platform`
   - **Subheading:** Add some text about your platform
   - Add trust badges
   - Save

5. **Publish the page**

6. Visit http://localhost:3000 to see your homepage!

---

### Option B: Complete Setup (30 minutes)

Follow the comprehensive guide in `/HOMEPAGE_CONTENT_GUIDE.md` to add all blocks with full Dutch and English content.

**Recommended block order:**
1. B2B Hero
2. How It Works
3. Pain Points & Solutions
4. Coverage Highlight
5. Clinical Governance
6. Security & Compliance
7. Integrations List
8. Pricing Framing
9. Proof Strip

---

## Step 6: Configure Header & Footer

### Header Navigation
1. Go to **Globals → Header**
2. Add navigation items (About, Services, Pricing, Contact, etc.)
3. Save

### Footer Configuration
The footer is pre-configured with:
- Company description
- Navigation from header
- Privacy & Compliance links (create these pages as needed)
- Compliance badges

---

## Step 7: Add Localization Content

1. Create a page in Dutch (NL) first
2. **Switch locale:**
   - Look for the locale selector in the admin panel
   - Switch from "Nederlands" to "English"
3. Enter English translations for all content
4. Save

The language switcher in the header will now work correctly!

---

## 🎨 Customization Tips

### Update Company Name
**File:** `/src/Footer/Component.tsx`

Change line 26:
```tsx
<p className="text-sm text-white/80">
  Your company description here
</p>
```

And line 95:
```tsx
<p>&copy; {new Date().getFullYear()} Your Company Name. Alle rechten voorbehouden.</p>
```

---

### Update Logo
**File:** `/src/components/Logo/Logo.tsx`

Replace with your logo SVG or image component.

---

### Adjust Colors
**File:** `/src/app/(frontend)/globals.css`

Modify the CSS variables if you need to adjust brand colors:
```css
--primary: 213 58% 23%; /* #1B365D */
--secondary: 210 100% 50%; /* #0066CC */
--accent: 148 24% 62%; /* #7BA98A */
```

---

## 📱 Test Your Site

### Desktop
- Open http://localhost:3000
- Test language switcher (NL/EN)
- Verify all blocks render correctly
- Check responsive behavior by resizing browser

### Mobile
- Open Chrome DevTools (F12)
- Toggle device toolbar (Cmd+Shift+M on Mac, Ctrl+Shift+M on Windows)
- Test on iPhone and iPad viewports
- Verify touch targets are at least 44x44px

### Accessibility
1. Install axe DevTools browser extension
2. Run accessibility audit
3. Fix any issues reported

---

## 🚢 Deployment

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to Other Platforms

The site is a standard Next.js app and can be deployed to:
- Vercel
- Netlify
- AWS Amplify
- DigitalOcean
- Railway
- Render

---

## 🔍 Troubleshooting

### "Cannot connect to database"
- Check MongoDB is running
- Verify `DATABASE_URI` in `.env`
- Ensure MongoDB connection string is correct

### "Locale not working"
- Clear browser localStorage
- Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
- Check Payload config has localization enabled

### "Blocks not rendering"
- Run `pnpm generate:types` to regenerate TypeScript types
- Restart development server
- Clear `.next` cache: `rm -rf .next`

### "Styles not applying"
- Check Tailwind config includes all directories
- Verify CSS is imported in layout
- Check for CSS specificity conflicts

---

## 📚 Key Documents

- **`/HOMEPAGE_CONTENT_GUIDE.md`** - All content in NL/EN for every block
- **`/IMPLEMENTATION_SUMMARY.md`** - Technical details of what was built
- **`/b2b-landing-page.plan.md`** - Original implementation plan

---

## 🎯 Next Actions

1. ✅ Get site running locally
2. ✅ Create admin account
3. ✅ Build homepage with content guide
4. ✅ Test language switching
5. 📝 Create additional pages:
   - About Us
   - Pricing
   - Privacy Policy
   - DPA/DPIA documents
   - Contact
6. 📸 Add real images and logos
7. 🎥 Consider adding video testimonials
8. 📊 Set up analytics
9. 🚀 Deploy to production

---

## 💡 Pro Tips

### Performance
- Use WebP images for faster loading
- Lazy load images below the fold
- Optimize images before uploading

### SEO
- Add meta descriptions to all pages
- Use structured data (JSON-LD) for rich snippets
- Create XML sitemap (auto-generated by Next.js)
- Add robots.txt

### Content Strategy
- Update blog regularly for SEO
- Create case studies with real customer data
- Add FAQ section for common questions
- Include clear CTAs on every page

### Conversion Optimization
- A/B test different headlines
- Add live chat for instant support
- Create dedicated landing pages for PPC campaigns
- Use heatmap tools (Hotjar) to optimize layout

---

## 🆘 Need Help?

- **Payload CMS Docs:** https://payloadcms.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS Docs:** https://tailwindcss.com/docs

---

**Happy Building! 🎉**

Your B2B blood testing platform homepage is ready to help Dutch clinics streamline their lab ordering process.







