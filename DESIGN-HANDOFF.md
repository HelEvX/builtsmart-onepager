# BuiltSmart Design Handoff

## UI Button System (source of truth)

All product buttons must use the shared classes from `css/base.css`.

### Variants (exactly 4)

1. Primary Filled → `btn btn--primary btn--filled`
2. Primary Outlined → `btn btn--primary btn--outlined`
3. Secondary Filled → `btn btn--secondary btn--filled`
4. Secondary Outlined → `btn btn--secondary btn--outlined`

Use `btn--outlined` as the only outlined treatment class.

## State behavior

Each variant has defined states in `css/base.css`:

- default
- hover
- active (pressed)
- focus-visible (focus ring)
- disabled (`btn--disabled`, `[disabled]`, or `[aria-disabled="true"]`)

Do not redefine button colors in section/component CSS.
Only spacing/layout rules are allowed outside `css/base.css`.

## Usage rules

- Always include all three classes: `btn` + intent (`btn--primary` or `btn--secondary`) + treatment (`btn--filled` or `btn--outlined`).
- Never ship a new button with only `btn`.
- Use primary for main conversion actions; use secondary for less prominent actions.
- Keep button text in sentence case or uppercase based on current component style, but do not change token colors per page.

## Where to edit the system

- Token values: `css/tokens.css`
- Semantic mapping and button logic: `css/base.css`
- Contextual sizing/layout only: component files (`css/header.css`, `css/contact-section.css`, etc.)

## Current live mapping

- Header CTA (`partials/header.html`): primary filled
- Contact submit (`contact.html`): primary filled
- Thank-you page CTA (`bedankt.html`): primary filled
- FAQ banner CTA (`index.html`): primary filled
- Mid-page CTA (`index.html`): primary filled
- Pricing CTAs (`index.html`): secondary outlined

If a new page introduces additional buttons, classify each one into one of the four variants before merging.

## Typography System (source of truth)

Typography is now token-driven from `css/tokens.css` and consumed in shared/component CSS.

### Core type tokens

- Body: `--ui-fs-body`, `--ui-lh-body`
- Body variants: `--ui-fs-body-lg`, `--ui-fs-body-md`
- Headings: `--ui-fs-h1` to `--ui-fs-h4`, `--ui-lh-h1` to `--ui-lh-h4`, `--ui-fw-h1` to `--ui-fw-h4`
- Heading tracking: `--ui-tracking-heading`, `--ui-tracking-heading-wide`
- Buttons: `--ui-fs-button` (used by `.btn`)

Responsive typography scales through token overrides in `css/tokens.css` media queries. Avoid hard-coding heading/body/button sizes in component files unless there is a true one-off requirement.

### Where typography is wired

- Global body/headings/buttons: `css/base.css`
- Section titles: `css/title.css`
- Page heading banner: `css/page-heading.css`
- Hero content: `css/hero.css`
- FAQ + call-to-action text: `css/faq.css`, `css/call-to-action.css`
- Pricing cards: `css/services.css`
