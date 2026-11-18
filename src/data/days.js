// Day data for Debugg and Slay Week
// Edit this file to change copy without touching layout code

export const days = [
  {
    id: 'intro',
    label: 'Intro',
    className: 'slide--intro',
    fontDisplay: 'var(--font-block-bomb)',
    headline: 'Debugg and Slay Week',
    motto: 'Beyond the Code: celebrate the culture, creativity and innovation',
    details: [
      'From 30th November 2026',
      'Grand Finale: Friday 4th December',
      'LakeHub, Zone01 Kisumu'
    ],
    purpose: 'A week to step away from the screen and show who you are through culture, creativity and style, ending with a Grand Finale before we break for Christmas.',
    mandatory: true,
    perks: [
      'Best-dressed awards',
      'Talent show',
      'Free snacks on the final day'
    ],
    hint: 'Scroll for the daily dress codes',
    logo: true,
    // Sticker positions: { x%, y%, scale, rotation°, z }
    // Mobile (<=640), Tablet (<=1024), Desktop (>1024)
    stickers: [],
    decor: [],
    // Pin lengths for ScrollTrigger
    pinLength: {
      mobile: '140%',
      desktop: '220%'
    }
  },
  {
    id: 'mon',
    label: 'Mon',
    date: '30 Nov',
    className: 'slide--mon',
    fontDisplay: 'var(--font-thorm-floxy)',
    tagline: 'Deploy your future self.',
    tag: 'Any profession of your choice',
    headline: 'Monday 30 Nov\nCareer Wear',
    // Sticker layout: 9 positions, centerpiece at index 4 (s05) scaled 1.6x
    stickers: [
      // Mobile positions
      { mobile: { x: 15, y: 10, scale: 1.25, rot: -6, z: 10 }, tablet: { x: 12, y: 8, scale: 1.3, rot: -5, z: 10 }, desktop: { x: 10, y: 5, scale: 1.35, rot: -4, z: 10 } },
      { mobile: { x: 55, y: 5, scale: 1.2, rot: 4, z: 11 }, tablet: { x: 50, y: 3, scale: 1.25, rot: 3, z: 11 }, desktop: { x: 45, y: 2, scale: 1.3, rot: 2, z: 11 } },
      { mobile: { x: 85, y: 25, scale: 1.15, rot: 8, z: 12 }, tablet: { x: 82, y: 20, scale: 1.2, rot: 6, z: 12 }, desktop: { x: 80, y: 15, scale: 1.25, rot: 5, z: 12 } },
      { mobile: { x: 5, y: 40, scale: 1.2, rot: -8, z: 13 }, tablet: { x: 3, y: 35, scale: 1.25, rot: -6, z: 13 }, desktop: { x: 2, y: 30, scale: 1.3, rot: -5, z: 13 } },
      { mobile: { x: 45, y: 35, scale: 1.6, rot: 0, z: 20 }, tablet: { x: 42, y: 30, scale: 1.7, rot: 0, z: 20 }, desktop: { x: 40, y: 28, scale: 1.8, rot: 0, z: 20 } }, // centerpiece
      { mobile: { x: 75, y: 55, scale: 1.25, rot: 5, z: 14 }, tablet: { x: 72, y: 50, scale: 1.3, rot: 4, z: 14 }, desktop: { x: 70, y: 48, scale: 1.35, rot: 3, z: 14 } },
      { mobile: { x: 25, y: 70, scale: 1.2, rot: -4, z: 15 }, tablet: { x: 22, y: 65, scale: 1.25, rot: -3, z: 15 }, desktop: { x: 20, y: 62, scale: 1.3, rot: -2, z: 15 } },
      { mobile: { x: 60, y: 80, scale: 1.15, rot: 7, z: 16 }, tablet: { x: 58, y: 78, scale: 1.2, rot: 5, z: 16 }, desktop: { x: 56, y: 75, scale: 1.25, rot: 4, z: 16 } },
      { mobile: { x: 10, y: 85, scale: 1.2, rot: -7, z: 17 }, tablet: { x: 8, y: 82, scale: 1.25, rot: -5, z: 17 }, desktop: { x: 5, y: 80, scale: 1.3, rot: -4, z: 17 } }
    ],
    decor: [
      { type: 'tape', mobile: { x: 30, y: 5, w: 20, h: 3, rot: -10 }, tablet: { x: 28, y: 4, w: 22, h: 3, rot: -8 }, desktop: { x: 25, y: 3, w: 25, h: 3, rot: -5 } },
      { type: 'tape', mobile: { x: 70, y: 15, w: 15, h: 3, rot: 15 }, tablet: { x: 68, y: 12, w: 18, h: 3, rot: 12 }, desktop: { x: 65, y: 10, w: 20, h: 3, rot: 10 } },
      { type: 'stamp', text: 'APPROVED', mobile: { x: 85, y: 85, w: 25, h: 15, rot: 5 }, tablet: { x: 82, y: 82, w: 28, h: 16, rot: 3 }, desktop: { x: 80, y: 80, w: 30, h: 18, rot: 2 } },
      { type: 'clip', mobile: { x: 10, y: 25, w: 8, h: 12, rot: -20 }, tablet: { x: 8, y: 22, w: 10, h: 14, rot: -15 }, desktop: { x: 5, y: 20, w: 12, h: 16, rot: -10 } },
      { type: 'clip', mobile: { x: 90, y: 45, w: 8, h: 12, rot: 25 }, tablet: { x: 88, y: 42, w: 10, h: 14, rot: 20 }, desktop: { x: 85, y: 40, w: 12, h: 16, rot: 15 } },
      { type: 'note', text: '✓', mobile: { x: 40, y: 60, w: 6, h: 6, rot: 0 }, tablet: { x: 38, y: 58, w: 7, h: 7, rot: 0 }, desktop: { x: 35, y: 55, w: 8, h: 8, rot: 0 } },
      { type: 'staple', mobile: { x: 50, y: 90, w: 10, h: 4, rot: 0 }, tablet: { x: 48, y: 88, w: 12, h: 5, rot: 0 }, desktop: { x: 45, y: 85, w: 15, h: 6, rot: 0 } }
    ],
    pinLength: {
      mobile: '140%',
      desktop: '220%'
    }
  },
  {
    id: 'tue',
    label: 'Tue',
    date: '1 Dec',
    className: 'slide--tue',
    fontDisplay: 'var(--font-hype)',
    tagline: 'Push to prod, in style.',
    tags: ['Streetwear', 'Y2K', 'Meme of your choice'],
    headline: 'Tuesday 1 Dec\nStreetwear / Y2K',
    stickers: [
      { mobile: { x: 12, y: 12, scale: 1.25, rot: -8, z: 10 }, tablet: { x: 10, y: 10, scale: 1.3, rot: -6, z: 10 }, desktop: { x: 8, y: 8, scale: 1.35, rot: -5, z: 10 } },
      { mobile: { x: 55, y: 8, scale: 1.2, rot: 6, z: 11 }, tablet: { x: 52, y: 6, scale: 1.25, rot: 4, z: 11 }, desktop: { x: 48, y: 4, scale: 1.3, rot: 3, z: 11 } },
      { mobile: { x: 88, y: 22, scale: 1.15, rot: 10, z: 12 }, tablet: { x: 85, y: 18, scale: 1.2, rot: 8, z: 12 }, desktop: { x: 82, y: 15, scale: 1.25, rot: 6, z: 12 } },
      { mobile: { x: 5, y: 38, scale: 1.2, rot: -10, z: 13 }, tablet: { x: 3, y: 34, scale: 1.25, rot: -8, z: 13 }, desktop: { x: 2, y: 30, scale: 1.3, rot: -6, z: 13 } },
      { mobile: { x: 42, y: 32, scale: 1.6, rot: 2, z: 20 }, tablet: { x: 40, y: 28, scale: 1.7, rot: 1, z: 20 }, desktop: { x: 38, y: 25, scale: 1.8, rot: 0, z: 20 } }, // centerpiece
      { mobile: { x: 72, y: 52, scale: 1.25, rot: 7, z: 14 }, tablet: { x: 70, y: 48, scale: 1.3, rot: 5, z: 14 }, desktop: { x: 68, y: 45, scale: 1.35, rot: 4, z: 14 } },
      { mobile: { x: 22, y: 68, scale: 1.2, rot: -6, z: 15 }, tablet: { x: 20, y: 64, scale: 1.25, rot: -4, z: 15 }, desktop: { x: 18, y: 60, scale: 1.3, rot: -3, z: 15 } },
      { mobile: { x: 58, y: 78, scale: 1.15, rot: 9, z: 16 }, tablet: { x: 56, y: 75, scale: 1.2, rot: 7, z: 16 }, desktop: { x: 54, y: 72, scale: 1.25, rot: 5, z: 16 } },
      { mobile: { x: 8, y: 88, scale: 1.2, rot: -9, z: 17 }, tablet: { x: 6, y: 85, scale: 1.25, rot: -7, z: 17 }, desktop: { x: 4, y: 82, scale: 1.3, rot: -5, z: 17 } }
    ],
    decor: [
      { type: 'star', mobile: { x: 25, y: 8, w: 8, h: 8, rot: 0 }, tablet: { x: 22, y: 6, w: 10, h: 10, rot: 0 }, desktop: { x: 20, y: 5, w: 12, h: 12, rot: 0 } },
      { type: 'star', mobile: { x: 80, y: 8, w: 6, h: 6, rot: 15 }, tablet: { x: 78, y: 6, w: 8, h: 8, rot: 10 }, desktop: { x: 75, y: 4, w: 10, h: 10, rot: 8 } },
      { type: 'flash', mobile: { x: 50, y: 15, w: 30, h: 30, rot: 0 }, tablet: { x: 48, y: 12, w: 35, h: 35, rot: 0 }, desktop: { x: 45, y: 10, w: 40, h: 40, rot: 0 } },
      { type: 'vinyl', mobile: { x: 15, y: 55, w: 12, h: 12, rot: -10 }, tablet: { x: 12, y: 50, w: 15, h: 15, rot: -8 }, desktop: { x: 10, y: 45, w: 18, h: 18, rot: -5 } },
      { type: 'tape', text: 'SWAG', mobile: { x: 65, y: 30, w: 18, h: 4, rot: 5 }, tablet: { x: 62, y: 28, w: 20, h: 5, rot: 3 }, desktop: { x: 60, y: 25, w: 22, h: 5, rot: 2 } },
      { type: 'tape', text: 'DIVA', mobile: { x: 30, y: 75, w: 18, h: 4, rot: -5 }, tablet: { x: 28, y: 72, w: 20, h: 5, rot: -3 }, desktop: { x: 25, y: 70, w: 22, h: 5, rot: -2 } },
      { type: 'tag', text: 'PARENTAL ADVISORY', mobile: { x: 85, y: 90, w: 25, h: 8, rot: 10 }, tablet: { x: 82, y: 88, w: 28, h: 9, rot: 8 }, desktop: { x: 80, y: 85, w: 30, h: 10, rot: 5 } }
    ],
    pinLength: {
      mobile: '140%',
      desktop: '220%'
    }
  },
  {
    id: 'wed',
    label: 'Wed',
    date: '2 Dec',
    className: 'slide--wed',
    fontDisplay: 'var(--font-forever-young)',
    tagline: 'Pick your team.',
    tag: 'Jersey of your choice',
    headline: 'Wednesday 2 Dec\nSportswear (Jersey Edition)',
    stickers: [
      { mobile: { x: 10, y: 15, scale: 1.25, rot: -7, z: 10 }, tablet: { x: 8, y: 12, scale: 1.3, rot: -5, z: 10 }, desktop: { x: 6, y: 10, scale: 1.35, rot: -4, z: 10 } },
      { mobile: { x: 55, y: 10, scale: 1.2, rot: 5, z: 11 }, tablet: { x: 52, y: 8, scale: 1.25, rot: 3, z: 11 }, desktop: { x: 48, y: 6, scale: 1.3, rot: 2, z: 11 } },
      { mobile: { x: 90, y: 25, scale: 1.15, rot: 8, z: 12 }, tablet: { x: 87, y: 22, scale: 1.2, rot: 6, z: 12 }, desktop: { x: 84, y: 18, scale: 1.25, rot: 4, z: 12 } },
      { mobile: { x: 8, y: 40, scale: 1.2, rot: -9, z: 13 }, tablet: { x: 5, y: 36, scale: 1.25, rot: -7, z: 13 }, desktop: { x: 3, y: 32, scale: 1.3, rot: -5, z: 13 } },
      { mobile: { x: 42, y: 34, scale: 1.6, rot: -1, z: 20 }, tablet: { x: 40, y: 30, scale: 1.7, rot: 0, z: 20 }, desktop: { x: 38, y: 28, scale: 1.8, rot: 0, z: 20 } }, // centerpiece
      { mobile: { x: 75, y: 55, scale: 1.25, rot: 6, z: 14 }, tablet: { x: 72, y: 52, scale: 1.3, rot: 4, z: 14 }, desktop: { x: 70, y: 48, scale: 1.35, rot: 3, z: 14 } },
      { mobile: { x: 20, y: 70, scale: 1.2, rot: -5, z: 15 }, tablet: { x: 18, y: 66, scale: 1.25, rot: -3, z: 15 }, desktop: { x: 15, y: 62, scale: 1.3, rot: -2, z: 15 } },
      { mobile: { x: 60, y: 82, scale: 1.15, rot: 8, z: 16 }, tablet: { x: 58, y: 78, scale: 1.2, rot: 6, z: 16 }, desktop: { x: 55, y: 75, scale: 1.25, rot: 4, z: 16 } },
      { mobile: { x: 5, y: 88, scale: 1.2, rot: -8, z: 17 }, tablet: { x: 3, y: 85, scale: 1.25, rot: -6, z: 17 }, desktop: { x: 2, y: 82, scale: 1.3, rot: -4, z: 17 } }
    ],
    decor: [
      { type: 'number', text: '23', mobile: { x: 30, y: 10, w: 15, h: 18, rot: 0 }, tablet: { x: 28, y: 8, w: 18, h: 22, rot: 0 }, desktop: { x: 25, y: 6, w: 22, h: 26, rot: 0 } },
      { type: 'number', text: '10', mobile: { x: 75, y: 12, w: 12, h: 15, rot: 5 }, tablet: { x: 72, y: 10, w: 15, h: 18, rot: 3 }, desktop: { x: 70, y: 8, w: 18, h: 22, rot: 2 } },
      { type: 'stripe', mobile: { x: 10, y: 25, w: 35, h: 3, rot: 0 }, tablet: { x: 8, y: 22, w: 40, h: 4, rot: 0 }, desktop: { x: 5, y: 20, w: 45, h: 5, rot: 0 } },
      { type: 'pennant', mobile: { x: 85, y: 35, w: 10, h: 12, rot: -15 }, tablet: { x: 82, y: 32, w: 12, h: 15, rot: -10 }, desktop: { x: 80, y: 30, w: 15, h: 18, rot: -8 } },
      { type: 'light', mobile: { x: 45, y: 5, w: 40, h: 40, rot: 0 }, tablet: { x: 42, y: 3, w: 50, h: 50, rot: 0 }, desktop: { x: 40, y: 2, w: 60, h: 60, rot: 0 } },
      { type: 'ticket', mobile: { x: 55, y: 68, w: 12, h: 8, rot: 10 }, tablet: { x: 52, y: 65, w: 15, h: 10, rot: 8 }, desktop: { x: 50, y: 62, w: 18, h: 12, rot: 5 } },
      { type: 'speed', mobile: { x: 25, y: 80, w: 20, h: 5, rot: 0 }, tablet: { x: 22, y: 78, w: 25, h: 6, rot: 0 }, desktop: { x: 20, y: 75, w: 30, h: 7, rot: 0 } }
    ],
    pinLength: {
      mobile: '140%',
      desktop: '220%'
    }
  },
  {
    id: 'thu',
    label: 'Thu',
    date: '3 Dec',
    className: 'slide--thu',
    fontDisplay: 'var(--font-brown-wager)',
    tagline: 'Back to Hello World.',
    tags: ['Primary', 'Secondary'],
    headline: 'Thursday 3 Dec\nSchoolwear',
    stickers: [
      { mobile: { x: 12, y: 12, scale: 1.25, rot: -6, z: 10 }, tablet: { x: 10, y: 10, scale: 1.3, rot: -4, z: 10 }, desktop: { x: 8, y: 8, scale: 1.35, rot: -3, z: 10 } },
      { mobile: { x: 58, y: 8, scale: 1.2, rot: 4, z: 11 }, tablet: { x: 55, y: 6, scale: 1.25, rot: 3, z: 11 }, desktop: { x: 52, y: 4, scale: 1.3, rot: 2, z: 11 } },
      { mobile: { x: 88, y: 20, scale: 1.15, rot: 7, z: 12 }, tablet: { x: 85, y: 18, scale: 1.2, rot: 5, z: 12 }, desktop: { x: 82, y: 15, scale: 1.25, rot: 4, z: 12 } },
      { mobile: { x: 5, y: 38, scale: 1.2, rot: -8, z: 13 }, tablet: { x: 3, y: 35, scale: 1.25, rot: -6, z: 13 }, desktop: { x: 2, y: 32, scale: 1.3, rot: -4, z: 13 } },
      { mobile: { x: 42, y: 32, scale: 1.6, rot: 1, z: 20 }, tablet: { x: 40, y: 28, scale: 1.7, rot: 0, z: 20 }, desktop: { x: 38, y: 25, scale: 1.8, rot: 0, z: 20 } }, // centerpiece
      { mobile: { x: 72, y: 52, scale: 1.25, rot: 5, z: 14 }, tablet: { x: 70, y: 48, scale: 1.3, rot: 3, z: 14 }, desktop: { x: 68, y: 45, scale: 1.35, rot: 2, z: 14 } },
      { mobile: { x: 22, y: 68, scale: 1.2, rot: -4, z: 15 }, tablet: { x: 20, y: 64, scale: 1.25, rot: -3, z: 15 }, desktop: { x: 18, y: 60, scale: 1.3, rot: -2, z: 15 } },
      { mobile: { x: 58, y: 78, scale: 1.15, rot: 6, z: 16 }, tablet: { x: 56, y: 75, scale: 1.2, rot: 4, z: 16 }, desktop: { x: 54, y: 72, scale: 1.25, rot: 3, z: 16 } },
      { mobile: { x: 8, y: 88, scale: 1.2, rot: -7, z: 17 }, tablet: { x: 6, y: 85, scale: 1.25, rot: -5, z: 17 }, desktop: { x: 4, y: 82, scale: 1.3, rot: -3, z: 17 } }
    ],
    decor: [
      { type: 'ruled', mobile: { x: 20, y: 10, w: 25, h: 15, rot: 0 }, tablet: { x: 18, y: 8, w: 30, h: 18, rot: 0 }, desktop: { x: 15, y: 6, w: 35, h: 22, rot: 0 } },
      { type: 'plaid', mobile: { x: 70, y: 15, w: 18, h: 18, rot: 5 }, tablet: { x: 68, y: 12, w: 22, h: 22, rot: 3 }, desktop: { x: 65, y: 10, w: 26, h: 26, rot: 2 } },
      { type: 'star', mobile: { x: 30, y: 50, w: 6, h: 6, rot: 0 }, tablet: { x: 28, y: 48, w: 8, h: 8, rot: 0 }, desktop: { x: 25, y: 45, w: 10, h: 10, rot: 0 } },
      { type: 'star', mobile: { x: 80, y: 30, w: 5, h: 5, rot: 0 }, tablet: { x: 78, y: 28, w: 7, h: 7, rot: 0 }, desktop: { x: 75, y: 25, w: 9, h: 9, rot: 0 } },
      { type: 'tape', text: 'A+', mobile: { x: 45, y: 65, w: 12, h: 4, rot: -3 }, tablet: { x: 42, y: 62, w: 15, h: 5, rot: -2 }, desktop: { x: 40, y: 60, w: 18, h: 6, rot: -1 } },
      { type: 'pencil', mobile: { x: 15, y: 75, w: 10, h: 20, rot: -20 }, tablet: { x: 12, y: 72, w: 12, h: 24, rot: -15 }, desktop: { x: 10, y: 70, w: 15, h: 28, rot: -10 } },
      { type: 'label', text: 'NAME', mobile: { x: 85, y: 85, w: 15, h: 6, rot: 8 }, tablet: { x: 82, y: 82, w: 18, h: 7, rot: 5 }, desktop: { x: 80, y: 80, w: 20, h: 8, rot: 3 } }
    ],
    pinLength: {
      mobile: '140%',
      desktop: '220%'
    }
  },
  {
    id: 'fri',
    label: 'Fri',
    date: '4 Dec',
    className: 'slide--fri',
    fontDisplay: 'var(--font-tribal-broots)',
    tagline: 'Merge culture with code.',
    tags: ['Cultural wear', 'Talent show', 'Snacks provided!'],
    headline: 'Friday 4 Dec\nGrand Finale',
    subHeadline: 'Cultural Wear + Talent Show',
    stickers: [
      { mobile: { x: 10, y: 15, scale: 1.25, rot: -5, z: 10 }, tablet: { x: 8, y: 12, scale: 1.3, rot: -3, z: 10 }, desktop: { x: 6, y: 10, scale: 1.35, rot: -2, z: 10 } },
      { mobile: { x: 55, y: 10, scale: 1.2, rot: 4, z: 11 }, tablet: { x: 52, y: 8, scale: 1.25, rot: 2, z: 11 }, desktop: { x: 48, y: 6, scale: 1.3, rot: 1, z: 11 } },
      { mobile: { x: 90, y: 25, scale: 1.15, rot: 6, z: 12 }, tablet: { x: 87, y: 22, scale: 1.2, rot: 4, z: 12 }, desktop: { x: 84, y: 18, scale: 1.25, rot: 3, z: 12 } },
      { mobile: { x: 8, y: 40, scale: 1.2, rot: -7, z: 13 }, tablet: { x: 5, y: 36, scale: 1.25, rot: -5, z: 13 }, desktop: { x: 3, y: 32, scale: 1.3, rot: -3, z: 13 } },
      { mobile: { x: 42, y: 34, scale: 1.6, rot: 0, z: 20 }, tablet: { x: 40, y: 30, scale: 1.7, rot: 0, z: 20 }, desktop: { x: 38, y: 28, scale: 1.8, rot: 0, z: 20 } }, // centerpiece
      { mobile: { x: 75, y: 55, scale: 1.25, rot: 5, z: 14 }, tablet: { x: 72, y: 52, scale: 1.3, rot: 3, z: 14 }, desktop: { x: 70, y: 48, scale: 1.35, rot: 2, z: 14 } },
      { mobile: { x: 20, y: 70, scale: 1.2, rot: -4, z: 15 }, tablet: { x: 18, y: 66, scale: 1.25, rot: -2, z: 15 }, desktop: { x: 15, y: 62, scale: 1.3, rot: -1, z: 15 } },
      { mobile: { x: 60, y: 82, scale: 1.15, rot: 7, z: 16 }, tablet: { x: 58, y: 78, scale: 1.2, rot: 5, z: 16 }, desktop: { x: 55, y: 75, scale: 1.25, rot: 3, z: 16 } },
      { mobile: { x: 5, y: 88, scale: 1.2, rot: -6, z: 17 }, tablet: { x: 3, y: 85, scale: 1.25, rot: -4, z: 17 }, desktop: { x: 2, y: 82, scale: 1.3, rot: -2, z: 17 } }
    ],
    decor: [
      { type: 'afro-strip', mobile: { x: 5, y: 5, w: 30, h: 4, rot: 0 }, tablet: { x: 3, y: 3, w: 35, h: 5, rot: 0 }, desktop: { x: 2, y: 2, w: 40, h: 6, rot: 0 } },
      { type: 'afro-strip', mobile: { x: 65, y: 5, w: 30, h: 4, rot: 0 }, tablet: { x: 62, y: 3, w: 35, h: 5, rot: 0 }, desktop: { x: 60, y: 2, w: 40, h: 6, rot: 0 } },
      { type: 'drum', mobile: { x: 15, y: 50, w: 15, h: 18, rot: 0 }, tablet: { x: 12, y: 46, w: 18, h: 22, rot: 0 }, desktop: { x: 10, y: 42, w: 22, h: 26, rot: 0 } },
      { type: 'spotlight', mobile: { x: 40, y: 5, w: 50, h: 50, rot: 0 }, tablet: { x: 38, y: 3, w: 60, h: 60, rot: 0 }, desktop: { x: 35, y: 2, w: 70, h: 70, rot: 0 } },
      { type: 'confetti', mobile: { x: 80, y: 30, w: 15, h: 15, rot: 0 }, tablet: { x: 78, y: 28, w: 18, h: 18, rot: 0 }, desktop: { x: 75, y: 25, w: 22, h: 22, rot: 0 } },
      { type: 'snack', mobile: { x: 25, y: 78, w: 8, h: 8, rot: 10 }, tablet: { x: 22, y: 75, w: 10, h: 10, rot: 8 }, desktop: { x: 20, y: 72, w: 12, h: 12, rot: 5 } },
      { type: 'snack', mobile: { x: 85, y: 80, w: 7, h: 7, rot: -10 }, tablet: { x: 82, y: 78, w: 9, h: 9, rot: -8 }, desktop: { x: 80, y: 75, w: 11, h: 11, rot: -5 } }
    ],
    pinLength: {
      mobile: '140%',
      desktop: '220%'
    }
  }
];

export const closing = {
  text: 'See you at LakeHub.',
  dates: '30 Nov – 4 Dec 2026',
  dress: 'Dress to impress',
  logo: true
};