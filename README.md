# BuiltSmart Onepager

Static landing page for BuiltSmart (Dutch), optimized for Netlify deployment.

## Scope
- Marketing one-pager + contact flow
- Legal pages (`/privacybeleid/`, `/gebruiksvoorwaarden/`, `/cookiebeleid/`, `/data-compliance/`)
- 404 page and shared header/footer partials

## Run locally
Open `index.html` in a local static server (recommended), for example VS Code Live Server.

## Deploy
- Target: Netlify
- Publish directory: project root (`.`)
- Config: `netlify.toml`
- Legacy `.html` URLs are redirected to clean folder URLs.

## Contact form
- Form lives at `/contact/`
- Uses Netlify Forms (`data-netlify="true"` + hidden `form-name`)
- Shows inline success/error feedback; no thank-you page redirect

## URL structure
- Home: `/`
- Contact: `/contact/`
- Legal pages use folder routes (no `.html` paths)

## Handoff
See `DESIGN-HANDOFF.md` for implementation details and design decisions.

## Project status
Frozen MVP handoff (February 2026). No further changes planned until upscale phase.
