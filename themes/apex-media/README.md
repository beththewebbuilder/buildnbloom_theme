# Apex Media

Apex Media's brand on the [Build'n'Bloom Base](../bnb_base_theme/README.md) theme: black and white with a red accent, Qualy headings, outlined buttons and a full-screen menu.

Replaces the old classic `apex_media` theme (v1.6.6).

## What's here

| | |
|---|---|
| `theme.json` | Apex colours (black, white, red `#b70000`), Qualy and system fonts, heading sizes, outlined white/black buttons |
| `parts/header.html` | Black header with the menu button on the left and the logo in the centre; the menu opens full screen |
| `style.css` | Header layout and the full-screen menu styling |
| `styles/*.json` | Colour palette presets: **Apex Dark** and **Apex Red Header** |

Everything else (templates, footer, page layout) comes from the parent theme.

## Setting up the site

1. Upload `bnb_base_theme` and `apex-media` to `wp-content/themes`, and install the Build'n'Bloom Gutenberg Blocks plugin.
2. Activate **Apex Media** under Appearance → Themes.
3. **Logo:** Appearance → Editor → Patterns → Header, select the logo and upload `Apex_Logo.png`.
4. **Menu:** in the same header, select the menu and choose or create the menu. Social links (Facebook, Instagram, LinkedIn) can be added inside it with the Social Icons block. The old theme had them with placeholder `#` links.
5. **Site icon:** Settings → General → Site Icon (the old theme used `images/favicon.png`).
6. **Homepage:** Settings → Reading → "A static page", and choose the Home page. Set full-width pages like Home to the **Page without title (full width)** template so a Hero block can sit right under the header.

## Colour palette presets

Appearance → Editor → Styles → Colors → Palette shows the theme's default palette plus these presets. Picking one re-colours the whole site; picking the default switches back.

| Preset | Look |
|---|---|
| Default (`theme.json`) | White page, black header and footer, red `#b70000` hovers |
| Apex Dark (`styles/apex-dark.json`) | Near-black page with white text; a lighter red `#ff6b6b` so hovers stay readable on dark |
| Apex Red Header (`styles/apex-red-header.json`) | White page with a red header, footer and full-screen menu; hovers are black |

To add another, copy one of the files, change its `title` and colours, and keep all ten slugs. Each file must only contain colours, or WordPress lists it as a full style instead of a palette. Check text contrast for new colours (4.5:1 for normal text, 3:1 for large text).

## Qualy font

The old theme declared Qualy without a font file, so it only showed on computers that had it installed. To load it for everyone:

1. Put the web font in `assets/fonts/`, e.g. `assets/fonts/qualy.woff2` (check the font licence allows web use).
2. Add a `fontFace` to the Qualy entry in `theme.json`:

```json
{
	"slug": "heading",
	"name": "Qualy",
	"fontFamily": "Qualy, \"Segoe UI\", system-ui, sans-serif",
	"fontFace": [
		{ "fontFamily": "Qualy", "fontWeight": "400", "fontStyle": "normal", "fontDisplay": "swap", "src": [ "file:./assets/fonts/qualy.woff2" ] }
	]
}
```

## Not carried over from the old theme

- **Contact form** (`page-content.php`): it posted to a `bt_scf` AJAX handler that isn't in the theme. Use a form plugin on the Contact page instead.
- **Instagram feed** on the homepage: add the `[instagram-feed feed=1]` shortcode to the Home page with a Shortcode block.
- **Bootstrap, jQuery, Slick and the Font Awesome kit** loaded from CDNs: no longer needed. The Build'n'Bloom blocks replace the old custom carousel, item grid, tabs and background media styles.
