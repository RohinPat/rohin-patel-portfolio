# 🚀 Quick Start Guide

Get your portfolio running in 3 minutes!

## Step 1: Install Dependencies

Open your terminal in this folder and run:

```bash
npm install
```

This will install all the required packages (Next.js, React, Framer Motion, etc.)

## Step 2: Run the Development Server

```bash
npm run dev
```

Then open your browser to [http://localhost:3000](http://localhost:3000)

You should see your portfolio live! 🎉

## Step 3: Customize Your Content

### Update Personal Information

1. **Your Name & Intro** - Edit `components/Hero.tsx` (lines 41-58)
2. **Your Projects** - Edit the `projects` array in `components/Projects.tsx` (lines 6-62)
3. **Your Experience** - Edit `components/Experience.tsx` (lines 5-43)
4. **Your Skills** - Edit `components/Skills.tsx` (lines 6-49)
5. **Contact Info** - Update links in `components/Contact.tsx` and `components/Navigation.tsx`

### Important Links to Update

Search for these placeholders and replace them:
- `rohin@example.com` → Your email
- `https://github.com/rohin-patel` → Your GitHub URL
- `https://linkedin.com/in/rohin-patel` → Your LinkedIn URL

## Step 4: Deploy to Vercel (FREE!)

### Option A: Via Vercel Website (Easiest)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub

3. Click **"New Project"**

4. Import your `rohin-patel-portfolio` repository

5. Click **"Deploy"** (Vercel auto-detects Next.js!)

6. Wait 2 minutes → Your site is live! 🎊

### Option B: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Step 5: Add a Custom Domain (Optional)

In your Vercel project dashboard:
1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `rohinpatel.com`)
3. Follow Vercel's DNS instructions

## 🎨 Customization Tips

### Change Colors

Edit `tailwind.config.ts` or search for gradient classes like:
- `gradient-text-blue` (blue/cyan gradient)
- `from-blue-500 to-cyan-500`

### Add Images

Put images in the `public/` folder and reference them like:
```tsx
<img src="/your-image.png" alt="Description" />
```

### Modify Animations

All animations use Framer Motion. Look for:
- `motion.div`
- `initial`, `animate`, `whileHover` props

## 🐛 Common Issues

**"Command not found: npm"**
- Install Node.js from [nodejs.org](https://nodejs.org)

**"Port 3000 already in use"**
- Run: `npm run dev -- -p 3001` (uses port 3001 instead)

**Build errors**
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Run `npm run build`

## 📱 Testing on Mobile

1. On your computer, run `npm run dev`
2. Find your local IP (run `ipconfig` on Windows or `ifconfig` on Mac)
3. On your phone, visit `http://YOUR-IP:3000`

## 🎯 Next Steps

- [ ] Customize all personal information
- [ ] Add real project images
- [ ] Update social media links
- [ ] Test on different devices
- [ ] Deploy to Vercel
- [ ] Share your awesome portfolio!

## 💡 Pro Tips

- The site is fully responsive - test it on mobile!
- Particle animations perform best on desktop
- All sections use smooth scroll anchors (#projects, #experience, etc.)
- The site works great with or without JavaScript (progressive enhancement)

Need help? Check the main README.md or open an issue on GitHub!


