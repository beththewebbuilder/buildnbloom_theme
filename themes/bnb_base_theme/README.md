# Build'n'Bloom Base

Parent block theme shared by Build'n'Bloom client sites. It holds the layout, templates and design settings; each client gets a small child theme with just their brand.

Use it with the **Build'n'Bloom Gutenberg Blocks** plugin.

## What's here

| | |
|---|---|
| `theme.json` | Design settings every site shares: colour slots, fonts, font sizes, spacing, layout widths, headings, links and buttons |
| `templates/` | Page, page without title (full width), single post, blog, archive, search and 404 |
| `parts/` | Header (logo, site title, menu) and footer |
| `patterns/footer-credits.php` | Footer copyright line (current year + site name) and the Build'n'Bloom credit |
| `style.css` | The little CSS theme.json can't do (sticky header, focus outlines) |

## Colour slots

Templates and styles only use these names, never fixed colours, so a child theme re-brands everything by setting them:

| Slug | Used for |
|---|---|
| `base` / `contrast` | Page background / text |
| `primary` / `on-primary` | Buttons and links / text on them |
| `secondary` / `on-secondary` | Hover states / text on them |
| `header` / `on-header` | Header and footer background / text |
| `muted`, `border` | Light section backgrounds, borders |

Fonts work the same way: `body` and `heading`.

Other settings a child theme can change in `settings.custom`:

- `button.radius`: button corner radius (default `4px`)
- `header.position`: `sticky` (default) or `static`

## Making a client theme

1. Copy `apex-media` and rename the folder, e.g. `luffman-engineering`.
2. In its `style.css`, change the name and description. Keep `Template: bnb_base_theme`.
3. In its `theme.json`, set the client's colours for every slug above (a child's palette replaces the parent's, so list them all), their fonts, and any heading or button changes.
4. Delete `parts/header.html` to use the standard header, or edit it for a custom one. Any template or part in the child replaces the parent's.
5. Upload both `bnb_base_theme` and the child theme to the site, and activate the child theme.

Logos, menus, the site icon and the homepage are set per site in the admin, not in the theme.
