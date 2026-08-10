# Fix invisible elements in dark mode

## What's wrong

The three items you circled — the **VERIFIED** badge, the **HEAD OFFICE** label, and the **Download QR** button — all use the brand "primary" color. The app overrides that color at runtime with the very dark navy `#0B1F3A` from the company data, and it applies the same dark navy in dark mode too. On the dark background that's near-black on near-black, so those items disappear. The design system already ships a lighter blue for dark mode, but the runtime override wins over it.

## The fix

Make the runtime brand-color override dark-mode aware:

- Keep the dark navy for light mode (unchanged look).
- In dark mode, apply a lightened version of the same brand color so text, labels, and filled buttons keep proper contrast.
- Make sure the filled button (Download QR) pairs its background with a readable foreground color in both modes.

This is a presentation-only change; no content, layout, or feature behaviour changes. The same fix automatically restores every other element that uses the brand color in dark mode, not just the three circled ones.

## Technical detail

- `src/lib/company-store.tsx`: instead of unconditionally setting `--primary` / `--gold` on `document.documentElement`, derive light and dark variants (lighten the primary for dark via `color-mix`/OKLCH lightness bump) and write them scoped so the `.dark` class gets the lighter value. Also set the matching `--primary-foreground` so filled surfaces stay legible.
- Verify in the preview by toggling dark mode and checking the Hero badges, the Locations card headings, and the QR download button.
