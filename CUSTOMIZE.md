# 🎨 Customization Guide

Make this portfolio truly yours!

## Quick Customization (5 minutes)

### 1. Update Your Name and Intro

**File:** `components/Hero.tsx`

Find and replace:
```tsx
<span className="gradient-text-blue">Rohin Patel</span>
```

And update the description:
```tsx
Building the future at the intersection of{" "}
<span className="text-blue-400 font-semibold">AI</span>,{" "}
<span className="text-purple-400 font-semibold">Computer Vision</span>, and{" "}
<span className="text-cyan-400 font-semibold">Health Tech</span>.
```

### 2. Update Contact Information

**Files to edit:**
- `components/Contact.tsx` (lines 60-100)
- `components/Navigation.tsx` (lines 20-24)

Replace:
- `rohin@example.com` → Your email
- `https://github.com/rohin-patel` → Your GitHub
- `https://linkedin.com/in/rohin-patel` → Your LinkedIn

### 3. Update Projects

**File:** `components/Projects.tsx`

Edit the `projects` array starting at line 6:

```tsx
{
  title: "Your Project Name",
  description: "What it does and why it's cool",
  tech: ["Tech", "Stack", "Here"],
  icon: Car, // Choose from: Car, Activity, Cog, Gamepad2, MessageSquare, Brain
  gradient: "from-blue-500 to-cyan-500", // Pick any gradient
  category: "AI/CV", // Or: Mobile/Health, Robotics, Game Dev
}
```

**Available Icons:**
- `Car` - For vehicle/transportation projects
- `Activity` - For health/fitness projects
- `Cog` - For robotics/hardware
- `Gamepad2` - For games
- `MessageSquare` - For chat/messaging
- `Brain` - For AI/ML projects

Import more from lucide-react if needed!

### 4. Update Experience

**File:** `components/Experience.tsx`

Edit the `experiences` array:

```tsx
{
  company: "Company Name",
  role: "Your Role",
  period: "2024",
  description: [
    "What you did",
    "Key achievement",
    "Another accomplishment",
  ],
  tech: ["Tech", "Used", "Here"],
  color: "blue", // or "purple", "cyan"
}
```

### 5. Update Skills

**File:** `components/Skills.tsx`

Modify `skillCategories` array to match your skills:

```tsx
{
  title: "Category Name",
  icon: Brain, // Choose from available icons
  skills: ["Skill 1", "Skill 2", "Skill 3"],
  gradient: "from-purple-500 to-pink-500",
}
```

## Advanced Customization

### Change Color Scheme

**File:** `tailwind.config.ts`

Current gradients use blue/cyan. To change:

1. **Find all gradient classes:**
   - `gradient-text-blue`
   - `from-blue-500 to-cyan-500`

2. **Replace with your colors:**
   - Purple theme: `from-purple-500 to-pink-500`
   - Green theme: `from-green-500 to-emerald-500`
   - Orange theme: `from-orange-500 to-red-500`

3. **Update in these files:**
   - `app/globals.css` (gradient-text classes)
   - `components/Hero.tsx`
   - `components/Navigation.tsx`
   - All component files

### Modify Animations

**Speed up/slow down:**

Find `transition` props in components:
```tsx
transition={{ duration: 0.6 }} // Increase for slower, decrease for faster
```

**Change animation types:**
```tsx
initial={{ opacity: 0, y: 20 }} // Start state
animate={{ opacity: 1, y: 0 }}  // End state
```

**Popular animation variations:**
- Slide from left: `x: -50` → `x: 0`
- Slide from right: `x: 50` → `x: 0`
- Fade in: `opacity: 0` → `opacity: 1`
- Scale up: `scale: 0.9` → `scale: 1`

### Particle Background

**File:** `components/ParticleBackground.tsx`

**Adjust particle count:**
```tsx
const particleCount = 100; // Increase for more particles
```

**Change particle color:**
```tsx
ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`; 
// Change RGB values (59, 130, 246 = blue)
// Try: (168, 85, 247) for purple
```

**Adjust connection distance:**
```tsx
if (distance < 120) { // Increase for more connections
```

### Add Your Own Sections

Create a new component in `components/`:

```tsx
"use client";

import { motion } from "framer-motion";

export default function NewSection() {
  return (
    <section id="new-section" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold gradient-text-blue"
        >
          New Section
        </motion.h2>
        {/* Your content */}
      </div>
    </section>
  );
}
```

Then add to `app/page.tsx`:
```tsx
import NewSection from "@/components/NewSection";

// In the component:
<NewSection />
```

### Add Images

1. **Add images to `public/` folder:**
   ```
   public/
   ├── profile.jpg
   ├── project1.png
   └── project2.png
   ```

2. **Use in components:**
   ```tsx
   <img src="/profile.jpg" alt="Profile" className="rounded-full" />
   ```

3. **Or use Next.js Image (optimized):**
   ```tsx
   import Image from 'next/image';
   
   <Image 
     src="/profile.jpg" 
     alt="Profile" 
     width={400} 
     height={400}
     className="rounded-full"
   />
   ```

### Customize Metadata (SEO)

**File:** `app/layout.tsx`

Update for better search engine ranking:

```tsx
export const metadata: Metadata = {
  title: "Your Name - What You Do",
  description: "Your custom description for search engines",
  keywords: ["Your", "Keywords", "Here"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name - Portfolio",
    description: "Your description",
    type: "website",
    images: ['/og-image.png'], // Add a 1200x630 image
  },
};
```

### Add Google Analytics

1. Get your GA tracking ID

2. **Add to `app/layout.tsx`:**

```tsx
import Script from 'next/script';

// Inside the <body> tag:
<>
  <Script
    src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
    strategy="afterInteractive"
  />
  <Script id="google-analytics" strategy="afterInteractive">
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `}
  </Script>
  {children}
</>
```

### Add a Blog Section

Create `components/Blog.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

const blogPosts = [
  {
    title: "Building an Edge AI System",
    excerpt: "How I built a real-time car counter on Raspberry Pi",
    date: "Nov 20, 2024",
    readTime: "5 min",
    link: "/blog/edge-ai-system",
  },
  // Add more posts
];

export default function Blog() {
  return (
    <section id="blog" className="min-h-screen py-20 px-4">
      {/* Similar structure to Projects component */}
    </section>
  );
}
```

### Mobile Responsiveness

Already included! But to customize breakpoints:

**Tailwind breakpoints:**
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up

**Example:**
```tsx
<div className="text-2xl md:text-4xl lg:text-6xl">
  {/* Small on mobile, larger on desktop */}
</div>
```

## Theme Variations

### Light Mode Support

Add light mode toggle:

1. **Install next-themes:**
   ```bash
   npm install next-themes
   ```

2. **Create theme provider** (see Next.js docs)

3. **Add toggle button** in Navigation

### Cyberpunk Theme

```css
/* In globals.css */
:root {
  --neon-blue: #00f3ff;
  --neon-pink: #ff006e;
  --dark-bg: #0a0a0a;
}
```

Use neon colors and add glitch effects!

### Minimalist Theme

- Remove particle background
- Use simple hover effects
- Stick to black/white/one accent
- Remove gradients
- Use more whitespace

## Pro Tips

1. **Keep it fast:** Don't add too many heavy animations
2. **Test on mobile:** Most recruiters will view on phones first
3. **Keep content updated:** Add new projects regularly
4. **Use real images:** Stock photos look generic
5. **Proofread:** Typos hurt credibility
6. **Get feedback:** Ask friends to review

## Before/After Checklist

Before customizing:
- [ ] Read through all components
- [ ] Understand the structure
- [ ] Save a backup (`git commit`)

After customizing:
- [ ] Test `npm run dev` works
- [ ] Check on mobile (Chrome DevTools)
- [ ] Fix any console errors
- [ ] Test all links
- [ ] Verify animations work
- [ ] Check loading speed

## Need Help?

- **Framer Motion:** [framer.com/motion](https://www.framer.com/motion/)
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com)
- **Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **Lucide Icons:** [lucide.dev](https://lucide.dev)

---

Make it yours! 🎨



