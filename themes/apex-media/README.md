# Apex Media

Apex Media's brand on the [Build'n'Bloom Base](../bnb_base_theme/README.md) theme: black and white with a red accent, Barlow Condensed headings, outlined buttons and a full-screen menu.

Replaces the old classic `apex_media` theme (v1.6.6).

## What's here

| | |
|---|---|
| `theme.json` | Apex colours (black, white, red `#b70000`), Barlow Condensed and system fonts, heading sizes, outlined white/black buttons with square corners and capitals |
| `parts/header.html` | Black header with the menu button on the left and the logo in the centre; the menu opens full screen |
| `style.css` | Header layout, the full-screen menu styling, and the Apex hero styling |
| `patterns/hero.php` | **Apex hero**: showreel video with a label, headline, intro and two buttons over it, low on the left. In the inserter under Patterns → Apex Media |
| `patterns/proof.php` | **Apex trusted by**: the band under the hero, with a slider of client logos and one short review beside it |
| `patterns/services.php` | **Apex what we do**: heading and intro with four numbered service cards that link to the Services page |
| `functions.php` | Registers the Apex Media pattern category |
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

## Fonts

Headings, buttons, the menu and the site title use **Barlow Condensed** (500, 600 and 700), loaded from `assets/fonts/` so nothing is fetched from Google. Body text stays on the system font. Barlow Condensed is under the SIL Open Font License, so it is free to use on the web.

The old theme used Qualy, declared without a font file, so it only showed on computers that had it installed. To use another font, add its `.woff2` files to `assets/fonts/` and change the `heading` entry and its `fontFace` list in `theme.json`.

## Not carried over from the old theme

- **Contact form** (`page-content.php`): it posted to a `bt_scf` AJAX handler that isn't in the theme. Use a form plugin on the Contact page instead.
- **Instagram feed** on the homepage: add the `[instagram-feed feed=1]` shortcode to the Home page with a Shortcode block.
- **Bootstrap, jQuery, Slick and the Font Awesome kit** loaded from CDNs: no longer needed. The Build'n'Bloom blocks replace the old custom carousel, item grid, tabs and background media styles. The Carousel block brings its own copy of Slick, and WordPress's jQuery, only on pages that use it.

## Apex hero pattern

Uses the Build'n'Bloom **Hero Video or Image** block. Insert it, then choose the showreel under the block's Background settings (a fallback image is recommended so something shows before the video loads). Until a video is chosen it shows on black.

Everything over the video is ordinary blocks inside the hero, so lines, buttons or a list can be added, moved or removed. The red label and the red word in the heading use `#ff4545`, a brighter red than the brand `#b70000`, which is too dark to read on black. A fade on the left and bottom keeps the text readable over a bright video.

## Apex trusted by pattern

The band that goes straight under the hero: a "Trusted by" slider of client logos on the left and one short review on the right, with a red line beside it. On phones the review sits under the logos. The logo slider is a Carousel block; the review is a core Quote block, so its words and name are edited in place.

The logos are linked from the current site's media library (`apex-media.uk/wp-content/uploads/…`), which stays in place when this theme replaces the old one. If the site moves, re-choose them in each slide's settings. They are white artwork, so keep the band dark. Links from the logos to the case studies are filled in with the site's address when the pattern is inserted.

## Apex what we do pattern

"What we do" heading with an intro underneath, then four service cards in an Item Grid (4 across on desktop, 2 on tablets, 1 on phones). Each card is a Grid Card with a title, a line of text and a link; the whole card is clickable. The red numbers (01, 02…) and "Find out more →" are added by `style.css`, so they stay in order when cards are added, removed or moved. "Find out more" only shows on cards with a link. The cards and the intro's "tell us the goal" link point to `/services/` and `/contact/` on this site.
