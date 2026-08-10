# Remove the logo's black box

Right now the logo image is a rectangle with a solid black background, so inside the round badge you see a black block instead of the badge surface. The fix is to make the logo background transparent so the logo sits directly on the white circle in light mode and on the dark circle in dark mode.

## What changes

- Produce two transparent-background versions of the logo:
  - a dark-ink version for light mode (dark navy lettering, no background)
  - a white-ink version for dark mode (white lettering, no background)
- In the hero badge, show the dark-ink logo in light mode and the white-ink logo in dark mode, both with no black box behind them.
- Keep everything else — circle size, gradient ring, glow, badges, layout — exactly as it is.

## Technical notes

- Use the image editor on `src/assets/logo-light.png` and `src/assets/logo.png` with background removal to create transparent PNGs (`logo-mark-light.png`, `logo-mark-dark.png`).
- In `src/components/card/Hero.tsx`, render two `img` elements in the badge, one with `dark:hidden` and one with `hidden dark:block`, keeping the current sizing classes and alt text.
- No changes to data, styles tokens, or other sections.
