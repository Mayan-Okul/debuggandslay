# AGENTS.md - Debugg and Slay Week Project Rules

## Working Rules (follow all the time)
- Code short and clean. Minimal or no comments.
- Complete file replacements, not diff-style patches.
- Define every color, font and spacing value once as a CSS variable in tokens.css. Never use a literal color or a new variable name elsewhere without adding it to tokens.css first.
- One commit per logical change, with the commit message included. Show me a preview (screenshot or dev-server URL) before committing.
- Verify in a real browser (Playwright screenshots) before saying anything is done. Never claim it works without checking.
- Create AGENTS.md first, summarizing these rules plus sections 2, 3 and 4, so they persist.

## Hard Content Rules
- Title spelling is exactly **Debugg and Slay Week** (two g's). Use it in `<title>`, headings and share tags.
- Motto, exactly: **Beyond the Code: celebrate the culture, creativity and innovation**
- Do NOT name any career or profession anywhere: not in copy, labels, alt text, filenames or code. No names of real people either. Alt text is generic, like "Outfit inspiration, sticker 3 of 9".
- No brands, characters or logos that aren't mine. Decorations are drawn by you in CSS or SVG.
- Event facts (use exactly):
  - From 30th November 2026, Monday to Friday
  - Grand Finale Friday 4th December 2026
  - Venue: LakeHub, Zone01 Kisumu
  - Participation is mandatory all week
  - Dress to impress for a chance at best-dressed awards, catch the talent show, free snacks on the final day
  - Purpose: a week to step away from the screen and show who you are through culture, creativity and style, ending with a Grand Finale before we break for Christmas.
- Keep all copy in `src/data/days.js` so I can edit it without touching layout code.

## Inputs on Disk (discover, don't assume)
- `reference/`: my reference images. Open and study them before designing.
  - the tall Y2K collage = the visual reference for EVERY slide: many cut-out pieces layered and overlapping at slight angles in one dense cluster, a big centerpiece, smaller pieces around it, tight edges, no gaps
  - the three font sheets = how each display font looks (Thorm Floxy, Block Bomb, Hype in the graffiti sheet; Forever Young and Brown Wager in the retro sheet; Tribal Broots in the tribal sheet)
- `assets/raw/`: my original photos, one subfolder per theme, 9 photos each, backgrounds NOT removed. Map folders to days by name (career, streetwear/y2k, jersey/sportswear, schoolwear, cultural). If any mapping is ambiguous, or a folder doesn't have 9 images, ask me before continuing.
- `assets/logo/`: the Zone01 Kisumu logo. If missing, leave a clearly marked placeholder and tell me.
- `fonts/`: my font files. Match loosely by name (ThormFloxy, thorm-floxy, etc.).

## Phase 1: Sticker Pipeline (script, not manual)
Write `scripts/cutout.py`. Set up a venv and install `rembg[cpu]`, `pillow`, `scipy`.
For each raw photo:
1. Remove the background with rembg (isnet-general-use model).
2. Keep only the largest connected region of the alpha (threshold 40) and drop stray fragments, such as parts of other people at the edges. Crop to the bounding box.
3. Resize so the height is at most 900px.
4. Make the die-cut sticker: using a distance transform of the alpha, add a white border about 3% of the image height wide, then a 3px ink-colored (#111) outline just outside the white border. The border follows the shape, never a rounded box or circle. The CSS adds the soft shadow.
5. Save as WebP (quality 90) to `public/stickers/<theme>/s01.webp` ... `s09.webp`. Numeric names only, never the original filenames. Keep the plain cut-outs as PNG in `build/cutouts/` for manual fixes.
6. Build one contact sheet per theme on a magenta background and look at it. List every sticker with a rough edge, a missing limb, leftover background or a dark subject lost in a dark background. Fix what you can (try the u2net model or tweak the threshold), and report the rest to me by new filename.
**CHECKPOINT 1**: show me the contact sheets and the list of problems. Wait for my OK.

## Phase 2: Stack and Scaffold
- Vite + vanilla JS + GSAP with ScrollTrigger (npm). No UI framework. One `index.html`, `src/main.js`, `src/styles/{tokens,base,slides}.css`, `src/data/days.js`.
- Load my fonts with `@font-face` (woff2 first, then ttf/otf, font-display: swap, preload the display fonts).
- If a font file is missing, use its Google Font fallback and tell me which ones are missing:
  - Block Bomb → Bowlby One
  - Thorm Floxy → Rubik Distressed
  - Hype → Rubik Bubbles
  - Forever Young → Shrikhand
  - Brown Wager → Caprasimo
  - Tribal Broots → Pirata One
- Body and labels: Manrope. Annotation scribbles: Caveat.

## Design System
- White theme: page background #fff with a faint paper grain (inline SVG noise, very low opacity). Each day brings its own accent palette, but the page itself stays white.
- Lettering looks like craft paper pieces put together (ransom-note collage). Every headline is split into letters; each letter sits on its own paper chip with slightly different rotation, baseline jitter, torn-edge clip-path (3 variants), a hard 2px offset shadow and the day's palette colors. Pick black or white letters per chip for contrast. A few chips get a strip of translucent tape. Smaller words (dates, venue, tags) sit on cut paper strips and labels. Use the day's display font for all headlines and big words.
- Stickers: the die-cut WebPs from phase 1, shown with a layered soft shadow (drop-shadow). No circles, no round frames, no cards.
- Overlap composition: each day's board is one dense cluster like the Y2K reference. 9 stickers, one centerpiece at about 1.3x scale, the others around it, each overlapping neighbours by 15–35%, rotations between -9° and 9°, later stickers on top. Never cover a face or the main outfit of another sticker by more than about 20%. Mix in decorative pieces drawn by you (tape, stars, arrows, stamps, scribbles, theme props) between the stickers.
- Store sticker positions, sizes, rotations and z-order per breakpoint (mobile up to 640px, tablet up to 1024px, desktop) as percentages in `days.js`. Start from a sensible layout, then screenshot at each breakpoint and tune it until it looks like the reference.

## Motion: Stickers Place Themselves as You Scroll
- Each day board is pinned (ScrollTrigger, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true). Pin length about +=170% of the viewport on desktop and +=140% on mobile. Use `gsap.matchMedia()` for breakpoints.
- Sequence on scrub: headline chips drop in one by one (stagger about 0.05) and settle at their angles. Then the 9 stickers go one by one: each starts off-screen from an alternating edge, scale 1.5, rotated up to ±40°, flies in, then lands with a small overshoot (back.out), a squash and press, while the shadow tightens from big and soft to small and close, as if someone pressed a sticker onto paper. The decorative pieces land after, then the tags.
- Each day gets its own personality but the same underlying system.
- prefers-reduced-motion: no pinning, no scrub, everything shown in the final composed state.
- Only animate transform and opacity. Add will-change only during the animation.

## Slides (in Order)
Fixed nav: five small paper tabs (Mon, Tue, Wed, Thu, Fri) at the top that scroll to each day and highlight the current one. Respect safe-area insets.

**Slide 1: Intro** (display font: Block Bomb)
- Palette from the flyer: orange #EE6A14, teal #19B3A0, sun #F6B81C, red #D8322B, ink #111.
- Taped African-print paper strips (CSS or SVG geometric patterns in those colors) along the top and bottom.
- Headline "Debugg and Slay Week" in paper chips. The motto on a torn paper strip with a blinking cursor, like a code prompt.
- Detail labels: "From 30th November 2026", "Grand Finale: Friday 4th December", "LakeHub, Zone01 Kisumu". Purpose paragraph on cut paper. A "MANDATORY" rubber stamp. Perk tags: Best-dressed awards, Talent show, Free snacks on the final day. The logo as a sticker. Hint: "Scroll for the daily dress codes".
- No photo stickers here. Motion: chips drop in, labels slap on, stamp lands with a thud.

**Slide 2: Monday 30 Nov, Career Wear** (Thorm Floxy)
- Palette: navy #0E1A36, gold #D9AA4C, brick red, sticky-note yellow, paper white. Props: paper clips, binder clips, sticky notes, a stamp reading "APPROVED", checklist ticks, a staple.
- Tagline: "Deploy your future self." Tag: "Any profession of your choice". No profession names.
- Motion: crisp and orderly, stickers snap in like documents being stamped.

**Slide 3: Tuesday 1 Dec, Streetwear / Y2K** (Hype)
- Palette: hot pink #FF2E93, chrome silver, denim blue #3B5B8C, lime #C6FF3D, black. Props: stars, camera flash burst, vinyl record, sticker words "SWAG" and "DIVA", "I am the designer of my own style.", a parental-advisory style tag.
- Tagline: "Push to prod, in style." Tags: "Streetwear", "Y2K", "Meme of your choice".
- Motion: fast, bouncy slam-ins with a quick flash on each landing.

**Slide 4: Wednesday 2 Dec, Sportswear (Jersey Edition)** (Forever Young)
- Palette: grass green #1F9D55, electric blue #2D5BFF, white, red #E63946, yellow. Props: big jersey numbers, stripes, pennant triangles, stadium light rays, a ticket stub, speed lines.
- Tagline: "Pick your team." Tag: "Jersey of your choice".
- Motion: stickers shoot in with speed lines like a kicked ball and bounce once.

**Slide 5: Thursday 3 Dec, Schoolwear** (Brown Wager)
- Palette: bus yellow #F2C230, school maroon #7A2E2E, plaid red, notebook blue, chalk green. Props: ruled paper strips, plaid washi tape, gold star stickers, red-pen ticks, an "A+" mark, a pencil, name labels.
- Tagline: "Back to Hello World." Tags: "Primary", "Secondary".
- Motion: stickers get pinned on like a notice board and swing like a pendulum for a moment when they land.

**Slide 6: Friday 4 Dec, Grand Finale** (Tribal Broots)
- Palette: deep brown #2A1A10, sand #C9965B, ochre, plus the flyer colors. Letters are white on dark brown chips (like the font reference). Props: African-print patch strips, a drum, a spotlight beam, confetti, snack stickers.
- Heading "Grand Finale", sub "Cultural Wear + Talent Show". Tagline: "Merge culture with code." Tags: "Cultural wear", "Talent show", "Snacks provided!".
- Motion: the biggest. Stickers land on a drum rhythm (even stagger about 0.12s) with a tiny screen shake and a confetti burst at the end.

**Closing strip**: "See you at LakeHub." with the dates, "Dress to impress" and the logo.

## Responsive, Performance, Accessibility
- Mobile first. Test at 360, 390, 768, 1024 and 1440px wide. No horizontal scroll at any width. Use 100svh, clamp() and vw units. Gutters at least 16px.
- Each sticker at most 120KB. Lazy-load stickers below the fold. Total page under 5MB. Smooth at 60fps on a mid-range phone.
- Visible keyboard focus on nav, real alt text, readable contrast on every chip.
- Add share tags: title, description, and an og:image screenshot of slide 1.

## Phases and Checkpoints
1. Create AGENTS.md. Run phase 1 (stickers). CHECKPOINT 1.
2. Scaffold and build tokens plus Slide 1 and Slide 2. Show screenshots at 390px and 1440px, and a screen recording or step-through of the scroll animation if you can. CHECKPOINT 2: wait for my OK or changes.
3. Build slides 3 to 6 and the closing strip, one commit per slide.
4. QA: Playwright screenshots at all 5 widths for every slide, check for horizontal overflow, console errors and missing images. Fix everything you find.
5. Build to dist/ and give me the exact steps to deploy to Netlify so I get a link to send.
At the end, report: what you built, which stickers still need manual fixes, which fonts or logo files were missing, and anything you assumed.

## Add-on: Logo, Replicated Fonts, Git and Netlify Setup
**A. Extract the logo from the flyer**
- The flyer is `assets/logo`. The Zone01 Kisumu logo is at the top center: black "Zone" wordmark, small blue "Kisumu", and a blue "01" made of dots.
- Crop only the logo, tight with a little padding. Upscale 3x with Lanczos.
- Make the white background transparent without rembg, keeping the blue dots clean: derive alpha from how far each pixel is from white, with a soft edge. Save `assets/logo/zone01-kisumu.png` and `.webp`.
- If potrace is available, also trace a vector `assets/logo/zone01-kisumu.svg`. If not, skip it.
- Preview it on white and on a coloured background. Tell me if the edges look jagged or the resolution is too low.
- Use it as a sticker (same white border and ink outline as the photos) on the intro and closing slides.

**B. Replicate the display fonts**
I may not have the font files. For each font, in this order:
1. If a matching file exists in `fonts/`, use it.
2. Otherwise recreate the look from the images in `reference/`. Start from the closest Google Font in the main prompt's fallback list, then match the reference with CSS: `-webkit-text-stroke` with `paint-order: stroke fill`, layered `text-shadow` for offsets and 3D echoes, and an SVG `feTurbulence` plus `feDisplacementMap` filter for rough or distressed edges.
Looks to match (study the reference sheets):
- Block Bomb: heavy blocky graffiti capitals, soft corners, thick black fill, tightly stacked lines.
- Thorm Floxy: distressed, grunge-textured block capitals with a white inline and a stamped feel.
- Hype: bubbly puffed graffiti letters with a thick white outline inside a black outer outline, tilted and overlapping, small sparkle stars.
- Forever Young: fat retro rounded letters with a solid offset drop-shadow echo.
- Brown Wager: chunky retro soft serif with curvy swashes.
- Tribal Broots: angular, hand-cut capitals, white on dark brown, with a sand-coloured ornament border.
For each font, render the headline words in a test page, put a screenshot next to the matching reference crop, and adjust until they are close. Up to 3 rounds per font. Then show me all six side by side.
Tribal Broots, extra step: its full A to Z is printed in the reference sheet. Crop each letter, trace it into a vector shape (potrace), and build a small font `fonts/TribalBroots-replica.woff2` with A to Z using fonttools. Use it for the Grand Finale slide. If the result looks poor, skip it and use the CSS recreation instead, and tell me.
Keep headlines as real text (accessible and selectable), never baked into images.

**C. Git and Netlify Setup**
The project directory is `debuggandslay`.
- `git init -b main` if it isn't a repo yet.
- `.gitignore`: node_modules, dist, build, .venv, assets/raw, reference, .DS_Store, .env. Keep public/stickers, assets/logo and fonts committed, since Netlify only runs the build and never the sticker script.
- `netlify.toml`: build command `npm run build`, publish directory `dist`, NODE_VERSION = "20", and long-cache headers for `/stickers/*` and `/fonts/*`.
- Short README.md: how to run dev, build, and re-run the sticker script.
- One commit per logical change, with the commit message shown. Do NOT push and do not touch my git credentials.
- At the end, print the exact commands to connect `https://github.com/Mayan-Okul/debuggandslay.git` as origin and push main.