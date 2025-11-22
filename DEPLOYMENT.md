# 🌐 Deployment Guide

Complete guide to deploying your portfolio to the web.

## Deployment Options

### 1. Vercel (Recommended) ⭐

**Why Vercel:**
- Free for personal projects
- Automatic deployments from GitHub
- Built-in CI/CD
- Perfect for Next.js
- Free SSL certificates
- Global CDN

**Steps:**

1. **Prepare your repository:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Sign up at Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Choose "Continue with GitHub"

3. **Import your project:**
   - Click "New Project"
   - Find your `rohin-patel-portfolio` repository
   - Click "Import"

4. **Configure (Optional):**
   - Project Name: `rohin-patel-portfolio`
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Deploy:**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site is live!

6. **Get your URL:**
   - Vercel gives you a free URL: `your-project.vercel.app`
   - Every push to main auto-deploys!

### 2. Netlify

**Steps:**

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build your site:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod
   ```

**Or via Netlify website:**
- Go to [netlify.com](https://netlify.com)
- Drag and drop your `.next` folder
- Done!

### 3. GitHub Pages

**Note:** GitHub Pages requires static export. Add to `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

Then:
```bash
npm run build
# Deploy the 'out' folder to gh-pages branch
```

### 4. Custom VPS/Server

**Requirements:**
- Node.js 18+ installed
- PM2 or similar process manager

**Steps:**

1. Build your app:
   ```bash
   npm run build
   ```

2. Start with PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   ```

3. Setup reverse proxy (Nginx):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Custom Domain Setup

### Vercel Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `rohinpatel.com`)
4. Vercel provides DNS instructions:

**Option A: Using Vercel Nameservers (Easiest)**
- Point your domain's nameservers to Vercel
- Vercel manages everything

**Option B: Using A/CNAME Records**
- Add these DNS records at your domain registrar:
  ```
  A     @    76.76.21.21
  CNAME www  your-project.vercel.app
  ```

### Common Registrars

**Namecheap:**
1. Dashboard → Manage → Advanced DNS
2. Add A and CNAME records
3. Wait 5-30 minutes for DNS propagation

**Google Domains:**
1. DNS → Custom records
2. Add records
3. Save

**GoDaddy:**
1. DNS Management
2. Add records
3. Save

## Environment Variables

If you add API keys or secrets later:

1. **Local development** - Create `.env.local`:
   ```
   NEXT_PUBLIC_API_KEY=your_key
   ```

2. **Vercel** - Add in dashboard:
   - Settings → Environment Variables
   - Add key/value pairs
   - Redeploy

## Deployment Checklist

Before deploying, verify:

- [ ] All placeholder content updated
- [ ] Social media links work
- [ ] Email address is correct
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors in browser
- [ ] Tested on mobile
- [ ] Images optimized (if any)
- [ ] Meta tags updated in `app/layout.tsx`

## Automatic Deployments

### Vercel (Auto-enabled)
Every `git push` to main triggers a deployment!

### Branch Previews
- Push to any branch
- Vercel creates a preview URL
- Perfect for testing changes

### Production vs Preview
- `main` branch = Production
- Other branches = Preview deployments

## Performance Optimization

### Already Included:
✅ Server-side rendering  
✅ Automatic code splitting  
✅ Image optimization (Next.js)  
✅ Minification  
✅ CSS optimization  

### Optional Enhancements:

1. **Add analytics:**
   ```bash
   npm install @vercel/analytics
   ```

2. **Enable compression** (Vercel does this automatically)

3. **Optimize fonts** - Already using system fonts

## Monitoring

### Vercel Analytics (Free)
- Add to `app/layout.tsx`:
  ```tsx
  import { Analytics } from '@vercel/analytics/react';
  
  // In your layout:
  <Analytics />
  ```

### Google Analytics
Add to `app/layout.tsx`:
```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

## Troubleshooting

### Build Fails

1. Check build locally:
   ```bash
   npm run build
   ```

2. Check Node version:
   ```bash
   node --version  # Should be 18+
   ```

3. Clear cache:
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

### Domain Not Working

1. Check DNS propagation: [whatsmydns.net](https://whatsmydns.net)
2. Wait up to 48 hours (usually much faster)
3. Clear browser cache
4. Try incognito mode

### Site is Slow

1. Check Vercel deployment region
2. Enable Vercel Analytics to identify bottlenecks
3. Optimize images (use Next.js Image component)

## Updating Your Site

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Updated projects section"
   git push
   ```
4. Vercel auto-deploys in ~2 minutes!

## Rollbacks

If something breaks:

1. Go to Vercel dashboard
2. "Deployments" tab
3. Find working version
4. Click "..." → "Promote to Production"

## Security

Already included:
✅ HTTPS (free SSL via Vercel)  
✅ Security headers  
✅ No sensitive data exposure  

## Cost

### Vercel Free Tier Includes:
- Unlimited deployments
- 100 GB bandwidth/month
- 100 serverless function invocations/day
- SSL certificates
- DDoS protection

**This is more than enough for a personal portfolio!**

## Going Live Checklist

Final steps before sharing:

- [ ] Deployed to Vercel
- [ ] Custom domain connected (optional)
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] All links working
- [ ] Contact form/email tested
- [ ] Shared on LinkedIn
- [ ] Added to resume
- [ ] Updated GitHub profile

---

**Congratulations! Your portfolio is now live! 🎉**


