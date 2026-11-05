# Apex Media

Apex Media's brand on the [Build'n'Bloom Base](../bnb_base_theme/README.md) theme: black and white with a red accent, Barlow Condensed headings, outlined buttons and a full-screen menu.

Replaces the old classic `apex_media` theme (v1.6.6).

## What's here

| | |
|---|---|
| `theme.json` | Apex colours (black, white, red `#b70000`), Barlow Condensed and system fonts, heading sizes, outlined white/black buttons with square corners and capitals |
| `parts/header.html` | Black header that stays at the top: logo on the left, then the menu, phone number and "Start a project". Below 1024px the menu becomes a button on the left that opens it full screen |
| `parts/footer.html`, `patterns/footer.php` | Black footer: logo and a line about Apex, the menu under "Explore", phone, email and a contact link under "Get in touch", then the copyright and Build'n'Bloom credit |
| `style.css` | Header layout, the full-screen menu styling, and the styling for each Apex pattern |
| `patterns/logo.php`, `patterns/header-actions.php` | Parts of the header (not in the inserter): the logo, and the phone number and "Start a project" button |
| `assets/images/apex-logo.png` | The APEX logo, trimmed and resized from the old theme's `Apex_Logo.png`. White lettering, so it needs a dark header |
| `patterns/hero.php` | **Apex hero**: showreel video with a label, headline, intro and two buttons over it, low on the left. In the inserter under Patterns → Apex Media |
| `patterns/proof.php` | **Apex trusted by**: the band under the hero, with a slider of client logos and one short review beside it |
| `patterns/services.php` | **Apex what we do**: heading and intro with four numbered service cards that link to the Services page |
| `patterns/work.php` | **Apex our work**: six recent projects as photo tiles with the client, type of work and a result, and a button to the portfolio |
| `patterns/testimonials.php` | **Apex testimonials**: three client reviews as cards with a photo of the person, their role and a link to the project; they swipe on phones |
| `patterns/contact.php` | **Apex contact**: closing section with phone, email and studio beside the enquiry form (the Contact Form 7 form titled "Apex enquiry") |
| `functions.php` | Registers the Apex Media pattern category and stops Contact Form 7 adding paragraphs inside the enquiry form |
| `styles/*.json` | Colour palette presets: **Apex Dark** and **Apex Red Header** |

Everything else (templates, page layout) comes from the parent theme.

## Setting up the site

1. Upload `bnb_base_theme` and `apex-media` to `wp-content/themes`, and install the Build'n'Bloom Gutenberg Blocks plugin.
2. Activate **Apex Media** under Appearance → Themes.
3. **Logo:** the header shows the APEX logo that comes with the theme, so there's nothing to set up. To use a different logo, set a Site Logo (add a Site Logo block anywhere in the Site Editor and upload the image) and the header uses that instead.
4. **Menu:** Appearance → Editor → Navigation, and edit the menu: add, remove and reorder its links there. The header shows that menu as links on desktop and in the full-screen menu on phones. The footer shows a menu under "Explore" too: select it in Appearance → Editor → Patterns → Footer to choose a different menu for it. Until a menu is made, WordPress lists every page. The phone number and "Start a project" button are in `patterns/header-actions.php`. The footer's about line and contact details are in `patterns/footer.php`, and its copyright line uses the site title from Settings → General.
5. **Site icon:** Settings → General → Site Icon (the old theme used `images/favicon.png`).
6. **Homepage:** Settings → Reading → "A static page", and choose the Home page. Set full-width pages like Home to the **Page without title (full width)** template so a Hero block can sit right under the header.

## Colour palette presets

Appearance → Editor → Styles → Colors → Palette shows the theme's default palette plus these presets. Picking one re-colours the whole site; picking the default switches back.

| Preset | Look |
|---|---|
| Default (`theme.json`) | White page, black header and footer, red `#b70000` hovers |
| Apex Dark (`styles/apex-dark.json`) | Near-black page with white text; a lighter red `#ff6b6b` so hovers stay readable on dark |
| Apex Red Header (`styles/apex-red-header.json`) | White page with a red header, footer and full-screen menu; hovers are black |

The logo's red A disappears on the red header, so Apex Red Header needs a different logo set as the Site Logo (see Setting up the site), such as an all-white version.

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

## Apex our work pattern

"Recent projects": six photo tiles in an Item Grid (3 across on desktop, 2 on tablets, 1 on phones), then a "View the full portfolio" button. Each tile is a Grid Card: the photo, the client as the title, and a line on the type of work, with the title and text over the bottom of the photo. **Bold text in a tile's text is shown as the red result label** (e.g. "135,000+ YouTube views"): put it on a new line (Shift+Enter) and make it bold. Phones show only the first four tiles. Placed straight after the What we do pattern, the space between them is removed so they read as one section.

The photos are the 1024px versions from the current site's media library, like the logos in the trusted by pattern. Each tile links to its case study on this site.

## Apex testimonials pattern

"Don't take our word for it": three reviews in a Carousel of Review Items. All three show on desktop, two on tablets and one on phones, with dots to swipe between them. Each card has a photo across the top, then the review, the person and a "See the project →" link to the case study, which sits at the bottom of every card. The photo is cropped to a 4:3 shape around the focal point set in the review's Image settings (set to the face for these photos). In the person's name and role (the Review Item's author), the bold part is the name and the line after it (Shift+Enter) is the role. Placed straight after What we do or Our work, the space between them is removed so they read as one section.

The reviews are single sentences from the testimonials on the Van Haven, Autobead and The Lost Foundry case studies. The photos are the portraits from the current homepage (576px versions, linked from its media library).

## Apex contact pattern

The page's closing section: "Ready to make something great?", a line about replying with ideas and a rough budget, and the phone number, email and studio, with the enquiry form beside them. On phones the form sits underneath. The bold word in each contact line is its label. The section has the anchor `contact`, so buttons can link to `#contact`.

The form is the **Contact Form 7** form titled **Apex enquiry**, so the form must keep that title. To set it up, add a new form under Contact → Add New, title it `Apex enquiry` and replace its Form tab with:

```
<div class="apex-form">
<label>Name [text* your-name autocomplete:name]</label>
<label>Email [email* your-email autocomplete:email]</label>
<label>Company [text your-company autocomplete:organization]</label>
<label>What do you need? [select your-need "Not sure yet" "Brand film" "Social content" "Event or launch" "Product or commercial"]</label>
<label class="apex-form__full">Tell us about the project [textarea* your-message x4]</label>
<div class="apex-form__full">[submit "Send enquiry"]</div>
</div>
```

On the Mail tab, set **To** to `contact@apex-media.uk`, **Subject** to `New enquiry from [your-name]`, **Additional headers** to `Reply-To: [your-email]`, and list the fields in the **Message body**:

```
Name: [your-name]
Email: [your-email]
Company: [your-company]
What they need: [your-need]

[your-message]
```

Fields wrapped in `apex-form__full` span both columns. Before launch, set up an SMTP plugin so email is delivered reliably, add Cloudflare Turnstile under Contact → Integration to stop spam, and send a test enquiry.
