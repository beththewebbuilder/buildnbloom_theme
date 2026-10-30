# Luffman Engineering

Luffman Engineering's brand on the [Build'n'Bloom Base](../bnb_base_theme/README.md) theme: steel and paper with an ember accent, Barlow type and square buttons.

## What's here

| | |
|---|---|
| `theme.json` | Luffman colours, self-hosted Barlow, Barlow Condensed and IBM Plex Mono, heading sizes, square buttons and a 1240px wide layout |
| `parts/` | Header with phone number and quote button, and a footer with the company address |
| `patterns/header-actions.php` | The header's phone number and quote button |
| `styles/blocks/` | Block styles: **Eyebrow** (Paragraph), **Dark section** and **Spec card** (Group), **Spec table** (Table) |
| `style.css` | The little CSS `theme.json` can't do |
| `assets/fonts/` | Latin web fonts from Fontsource, under the SIL Open Font License |

Everything else (templates, page layout) comes from the parent theme.

## Colours beyond the standard slots

| Slug | Used for |
|---|---|
| `surface` | Cards on the paper background |
| `steel` | Dark sections |
| `accent-text` | Small orange text and links on light backgrounds. Ember (`primary`) is too light to read at small sizes there |
| `subtle-text` | Secondary text |

## Setting up the site

1. Upload `bnb_base_theme` and `luffman-engineering` to `wp-content/themes`, and install the Build'n'Bloom Gutenberg Blocks plugin.
2. Activate **Luffman Engineering** under Appearance → Themes.
3. **Site title:** Settings → General. Use a logo instead if you want "Engineering" in orange, as a site title can only be one colour.
4. **Menu:** Appearance → Editor → Patterns → Header, select the menu and choose or create it.
5. **Homepage:** Settings → Reading → "A static page". Set full-width pages to the **Page without title (full width)** template.

## Quote form

Use a form plugin that sends by email through SMTP:

- Allow `.dxf`, `.dwg`, `.step`, `.stp` and `.pdf` uploads, which WordPress blocks by default.
- Limit uploads to 15MB in total. Email encoding adds about a third, and Gmail's limit is 25MB per message.
- Attach files to the email and don't keep copies on the server, as drawings may be confidential.
- Send a real file at the limit before launch, because the mail service may have a lower limit than Gmail.
