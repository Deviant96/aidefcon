# Quick Start: Running AI Defcon via WordPress

Now that the React app is built and served through WordPress, follow these simple steps to run the application.

## ✅ One-Time Setup

### 1. Activate the WordPress Plugin

1. Go to **http://localhost/wordpress/wp-admin**
2. Navigate to **Plugins** in the left sidebar
3. Find **AI Defcon Core**
4. Click **Activate**

Expected result: You should see an **AI Defcon** menu appear in the sidebar.

### 2. Activate the WordPress Theme

1. Go to **http://localhost/wordpress/wp-admin**
2. Navigate to **Appearance** → **Themes**
3. Find the **AI Defcon** theme
4. Click **Activate**

Expected result: The theme card shows "Active" status.

---

## 🚀 Running the App

### Production Mode (Main)

Simply visit **http://localhost/wordpress** in your browser.

That's it! The React SPA is served directly from WordPress.

**Features:**
- ✅ Full CTF platform UI
- ✅ Team management, scoreboard, challenges
- ✅ Admin dashboard for event management
- ✅ All routing handled by React Router (no page reloads)

### Development Mode (Optional)

If you're actively editing React code and want instant hot reload:

```bash
npm run dev
```

Then visit **http://localhost:5173** in another browser tab.

**Note:** Dev server and production WordPress app run separately. See [GETTING-STARTED.md](GETTING-STARTED.md#development-mode-local-changes) for details on syncing changes.

---

## 🧪 Quick Test

1. **Visit homepage** → http://localhost/wordpress
   - See hero title, countdown, CTA buttons

2. **Browse as guest**
   - Click "Scoreboard" → See team rankings
   - Click "Challenges" → View categories and problems

3. **Test login** (mock)
   - Click "Sign In"
   - Try each method (Google, GitHub, Email OTP)
   - You should be logged in

4. **Test admin dashboard**
   - Go to http://localhost/wordpress/wp-admin
   - Click "AI Defcon" in sidebar
   - Try Competition Settings, Challenge CRUD, Team Management

5. **Test API** (optional)
   - Visit http://localhost/wordpress/wp-json/aidefcon/v1/challenges
   - Should see JSON response with challenge list

---

## 📁 What Was Set Up

```
wordpress/wp-content/themes/aidefcon/      # New WordPress theme
├── style.css                               # Theme header
├── functions.php                           # Theme logic (serves React)
├── index.html                              # React app entry point
├── favicon.svg
└── assets/
    ├── index-*.js                          # React bundle
    └── index-*.css                         # Styles
```

**How it works:**
1. WordPress theme's `functions.php` intercepts all non-admin requests
2. Redirects them to `index.html` (the React SPA)
3. React Router handles all client-side routing
4. React app calls WordPress REST API for data

---

## 🔄 Update Workflow

### After Making Frontend Changes

If you've edited React code during development (`npm run dev`), rebuild and deploy:

```bash
npm run build                                    # Build React app
cp -r dist/* wordpress/wp-content/themes/aidefcon/   # Copy to theme
```

Then refresh **http://localhost/wordpress** to see changes.

### After Making Backend Changes

If you've edited the WordPress plugin:

1. Edit `wordpress/wp-content/plugins/aidefcon-core/aidefcon-core.php`
2. Go to WordPress admin → **Plugins**
3. Deactivate **AI Defcon Core**
4. Activate **AI Defcon Core** again
5. Refresh the frontend

---

## 📚 More Info

- See [GETTING-STARTED.md](GETTING-STARTED.md) for full documentation
- See [DEVELOPMENT-PLAN.md](DEVELOPMENT-PLAN.md) for implementation status
- See [AI-DEFCON-CTF-SPEC.md](AI-DEFCON-CTF-SPEC.md) for product specification

---

## ⚡ Troubleshooting

**Problem:** Theme doesn't appear in Appearance → Themes
- **Solution:** Check that `wordpress/wp-content/themes/aidefcon/style.css` exists with theme header

**Problem:** API endpoints return 404
- **Solution:** Make sure AI Defcon Core plugin is activated (Plugins → look for it)

**Problem:** React app shows blank page
- **Solution:** Check browser DevTools console for errors. Verify React files exist in `wordpress/wp-content/themes/aidefcon/assets/`

---

**Ready to go!** 🛡️ Visit http://localhost/wordpress
