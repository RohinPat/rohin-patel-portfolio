# Rohin Patel - Personal Portfolio

A modern, interactive portfolio website showcasing my work in iOS development, AI/ML, and health tech.

**Currently:** iOS Engineer Co-op @ WHOOP  
**Education:** Northeastern University - B.S. Computer Science (AI Concentration)  
**Graduating:** 2026

## 🚀 Features

- **Stunning Animations**: Smooth transitions and effects using Framer Motion
- **Interactive Elements**: Particle background, 3D card effects, and hover animations
- **Responsive Design**: Optimized for all device sizes
- **Dark Mode**: Elegant dark theme with gradient accents
- **Project Showcase**: Filterable gallery of my best work
- **Timeline Experience**: Visual journey through my professional experience
- **Tech Stack Display**: Comprehensive overview of my skills and technologies

## 🛠️ Built With

- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rohin-patel/rohin-patel-portfolio.git
cd rohin-patel-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

Vercel will automatically detect Next.js and configure everything!

### Build for Production

```bash
npm run build
npm start
```

## 📝 Customization

### Update Your Information

1. **Personal Info**: Edit `components/Hero.tsx` for your name and intro
2. **Projects**: Modify the `projects` array in `components/Projects.tsx`
3. **Experience**: Update `components/Experience.tsx` with your work history
4. **Skills**: Edit skill categories in `components/Skills.tsx`
5. **Contact**: Change links in `components/Contact.tsx` and `components/Navigation.tsx`
6. **Metadata**: Update SEO info in `app/layout.tsx`

### Color Scheme

The portfolio uses a dark theme with blue/cyan gradients. To customize:
- Edit Tailwind config in `tailwind.config.ts`
- Modify gradient classes in components
- Update global styles in `app/globals.css`

## 📂 Project Structure

```
rohin-patel-portfolio/
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   └── ParticleBackground.tsx
├── lib/                 # Utility functions
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind configuration
```

## ✨ Key Features Explained

### Particle Background
Animated particle network that responds to viewport size

### 3D Project Cards
Interactive cards with hover effects and gradient backgrounds

### Animated Timeline
Visual timeline for work experience with smooth animations

### Smooth Scrolling
Anchor-based navigation with smooth scroll behavior

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Connect

- **Email**: rohin@example.com
- **LinkedIn**: [linkedin.com/in/rohin-patel](https://linkedin.com/in/rohin-patel)
- **GitHub**: [github.com/rohin-patel](https://github.com/rohin-patel)

---

Built with ❤️ using Next.js and TypeScript
My personal website and portfolio.
