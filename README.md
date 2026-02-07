# LogopediperFemije

A Gatsby-based React application configured for automated deployment to GitHub Pages.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher (20.x LTS recommended)
- npm or yarn

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run develop
   ```

   The site will be available at `http://localhost:8000`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Serve production build locally:**
   ```bash
   npm run serve
   ```

   The site will be available at `http://localhost:9000/LogopediperFemije`

## 📁 Project Structure

```
LogopediperFemije/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── src/
│   ├── components/
│   │   └── Layout.js           # Reusable layout component
│   ├── pages/
│   │   └── index.js            # Homepage
│   ├── images/                 # Image assets
│   └── styles/
│       └── global.css          # Global styles
├── gatsby-config.js            # Gatsby configuration
├── gatsby-browser.js           # Browser APIs
├── gatsby-node.js              # Node APIs
└── package.json                # Project dependencies
```

## 🔧 Configuration

### Path Prefix

This project is configured to deploy to GitHub Pages at `https://emuzhaqi.github.io/LogopediperFemije/`. The path prefix `/LogopediperFemije` is set in `gatsby-config.js`.

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The site will be automatically deployed on every push to the `main` branch

## 🚢 Deployment

The project uses GitHub Actions for automated deployment:

- **Trigger:** Push to `main` branch or manual workflow dispatch
- **Build Process:**
  1. Checkout code
  2. Setup Node.js 20.x
  3. Install dependencies with `npm ci`
  4. Build Gatsby site with `gatsby build --prefix-paths`
  5. Upload artifact
  6. Deploy to GitHub Pages
- **Live URL:** https://emuzhaqi.github.io/LogopediperFemije/

## 📝 Available Scripts

- `npm run develop` - Start development server
- `npm start` - Alias for develop
- `npm run build` - Build for production (includes path prefix)
- `npm run serve` - Serve production build locally
- `npm run clean` - Clean Gatsby cache and public folder

## 🛠️ Technologies

- **Gatsby 5.x** - Static site generator
- **React 18.x** - UI library
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Hosting

## 📦 Plugins

- `gatsby-plugin-image` - Optimized image handling
- `gatsby-plugin-manifest` - PWA manifest configuration
- `gatsby-plugin-sharp` - Image processing
- `gatsby-source-filesystem` - File system source plugin
- `gatsby-transformer-sharp` - Image transformer

## 🤝 Contributing

1. Create a new branch from `main`
2. Make your changes
3. Test locally with `npm run develop`
4. Build and verify with `npm run build && npm run serve`
5. Push to your branch
6. Create a pull request to `main`

## 📄 License

MIT
