# Cinematic Developer Portfolio
React + TypeScript + Vite + Tailwind + GSAP (ScrollTrigger) + Lucide.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
npm run preview
```

## Customise (everything lives in `src/data/portfolio.ts`)
- **Name / role / tagline / preloader text:** `name`, `role`, `tagline`, `preloaderRole`.
- **Character image:** put a transparent full-body PNG/WebP in `public/media/` and set `hero.image` (e.g. `/media/character.png`).
- **Walking video:** put a video in `public/media/` (WebM with alpha, or MP4 on a white background) and set `hero.video` + `hero.poster`. The character must walk LEFT→RIGHT in the source; it is never mirrored. If the video background isn't white, crop/mask it so it blends or sits cleanly.
- **Audio:** set `hero.audio`; a sound toggle appears only then.
- **About / Skills / Experience:** fill `about`, `skills`, `timeline`. Empty arrays hide the section and its nav link.
- **Projects:** replace the placeholder entries; add screenshots to `public/media/` and set `image`, `live`, `source`.
- **Contact:** set `email`, `linkedin`, `github`. Brand name, disciplines and the Founder entry are from the owner. Instagram is pre-set to https://www.instagram.com/dalu_krishnadas/.
- **Location / availability:** shown only when filled.
- Page `<title>` and description: `index.html`.

Notes: animations respect `prefers-reduced-motion`; the preloader auto-dismisses after 4.5s at most; content is never hidden by CSS, only by GSAP `from` tweens that are reverted on unmount.
