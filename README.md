# Debugg and Slay Week

A scroll-driven celebration site for Debugg and Slay Week at Zone01 Kisumu.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Sticker Pipeline

The sticker cutout script processes raw photos into die-cut stickers with white borders and ink outlines.

```bash
# Process all themes
npm run stickers

# Process a single theme
python scripts/cutout.py --only careerwear

# Process a single sticker
python scripts/cutout.py --only schoolwear:s07
```

### Requirements

- Python 3.10+
- Virtual environment with: `rembg[cpu]`, `pillow`, `scipy`, `scikit-image`, `tqdm`, `numpy`

### Output

- Cutouts (PNG): `build/cutouts/<theme>/s01.png` … `s09.png`
- Stickers (WebP): `public/stickers/<theme>/s01.webp` … `s09.webp`
- Contact sheets: `build/contact_sheets/<theme>_contact.png`
- Mapping report: `build/contact_sheets/mapping.txt`
- Problems report: `build/contact_sheets/problems.txt`

## Project Structure

```
├── assets/
│   ├── raw/           # Original photos (9 per theme)
│   └── logo/          # Zone01 Kisumu logo
├── build/             # Generated assets (cutouts, contact sheets)
├── public/
│   ├── stickers/      # Final WebP stickers (committed)
│   └── logo/          # Processed logo (committed)
├── scripts/
│   └── cutout.py      # Sticker pipeline
├── src/
│   ├── data/
│   │   └── days.js    # All copy & sticker positions
│   ├── styles/
│   │   ├── tokens.css # Design tokens
│   │   ├── base.css   # Reset, fonts, utilities
│   │   └── slides.css # Slide layouts
│   └── main.js        # GSAP ScrollTrigger animations
├── index.html
├── package.json
├── netlify.toml
└── vite.config.js
```

## Themes & Fonts

| Day | Theme | Display Font | Fallback |
|-----|-------|--------------|----------|
| Intro | — | Block Bomb | Bowlby One |
| Mon | Career Wear | Thorm Floxy | Rubik Distressed |
| Tue | Streetwear/Y2K | Hype | Rubik Bubbles |
| Wed | Sportswear | Forever Young | Shrikhand |
| Thu | Schoolwear | Brown Wager | Caprasimo |
| Fri | Grand Finale | Tribal Broots | Pirata One |

Body: Manrope | Scribbles: Caveat

## Deployment (Netlify)

1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Node version: 20 (set in netlify.toml)
5. Long-cache headers configured for `/stickers/*`, `/fonts/*`, `/logo/*`

```bash
# Manual deploy
npm run build
netlify deploy --prod --dir=dist
```

## Git Setup

```bash
git init -b main
git add .
git commit -m "Initial commit: Debugg and Slay Week site"
git remote add origin https://github.com/Mayan-Okul/debuggandslay.git
git push -u origin main
```

## Customization

Edit `src/data/days.js` to change:
- Headlines, taglines, dates, venue
- Sticker positions per breakpoint (mobile/tablet/desktop)
- Decorative elements
- Pin lengths for scroll animations

No layout code changes needed.