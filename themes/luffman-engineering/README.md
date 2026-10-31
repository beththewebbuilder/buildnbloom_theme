# Luffman Engineering

Luffman Engineering's brand on the [Build'n'Bloom Base](../bnb_base_theme/README.md) theme: steel and paper with a forest green accent, Barlow type and square buttons.

## What's here

| | |
|---|---|
| `theme.json` | Luffman colours, self-hosted Barlow, Barlow Condensed and IBM Plex Mono, heading sizes, square buttons and a 1240px wide layout |
| `parts/` | Header with phone number and quote button, and a footer with the company address |
| `patterns/` | The header's phone number and quote button, plus homepage sections: Luffman hero, Proof bar, Quick answers, What we do, Process finder, Same part four processes, Workshop film and story, Our work, Firepit designer, and Get a quote |
| `templates/archive-job.html` | The Our work page listing every job |
| `styles/blocks/` | Block styles: **Eyebrow** (Paragraph), **Dark section** and **Spec card** (Group), **Spec table** (Table) |
| `style.css` | The little CSS `theme.json` can't do |
| `assets/fonts/` | Latin web fonts from Fontsource, under the SIL Open Font License |

Everything else (templates, page layout) comes from the parent theme.

## Colours beyond the standard slots

| Slug | Used for |
|---|---|
| `surface` | Cards on the paper background |
| `steel` | Dark sections |
| `accent-text` | Small green text and links on light backgrounds |
| `primary-on-dark` | Light green. Automatically replaces `primary` in the header, hero, footer and Dark sections, where forest green is too dark to see |
| `subtle-text` | Secondary text |

## Setting up the site

1. Upload `bnb_base_theme` and `luffman-engineering` to `wp-content/themes`, and install the Build'n'Bloom Gutenberg Blocks plugin.
2. Activate **Luffman Engineering** under Appearance → Themes.
3. **Site title:** Settings → General. Use a logo instead if you want "Engineering" in green, as a site title can only be one colour.
4. **Menu:** Appearance → Editor → Patterns → Header, select the menu and choose or create it.
5. **Homepage:** Settings → Reading → "A static page". Set full-width pages to the **Page without title (full width)** template.

## Laser Cut Animation

The hero uses the **Laser Cut Animation** block from Luffman Blocks. Its caption and screen reader description are in the block sidebar; the drawing is `blocks/laser-cut/drawing.svg`. It shows the finished part in the editor, without JavaScript and for visitors who prefer reduced motion, and only runs while on screen.

## Process Finder

The rules are set on each **Finder Process** block in the editor: tick the materials it suits, set its thickness limits, and rank it for each priority (1 is recommended first, 0 means it isn't offered for that priority). Materials, priorities and the slider range are on the parent block. Run `npm run build` in `luffman-blocks` after changing its code.

## Product Configurator

Each product is a **Product Configurator** block holding **Option Groups** (such as size or material), which hold **Product Options**. Options, notes, photos and prices are all content.

- **Conditional groups:** set a group's **Only show when** to an earlier group's key and an option value, such as `style=round`.
- **Asking the visitor:** an option's **Ask the visitor** panel can show a text box, an artwork upload, or both when it's selected.
- **Photos:** an option's **Photos** join the preview as one slider, with thumbnails underneath, when it's selected. Changing any option returns to the preview.
- **Previews:** **Stacked images** layers each chosen option's image, so a new product needs no code. A new drawn preview, like the firepit, is added in `blocks/product-configurator/view.js`.

The enquiry button fills in the quote form's message and adds any uploaded artwork to the form. If the form is on another page, the message travels in the link but the artwork doesn't.

## Firepit patterns

To add a pattern, add a **Product Option** to the **Pattern** group and upload its image under **Pattern or preview image**:

- **Flat artwork, wrapped around the drum:** a long, flat black-and-white strip. White areas are cut out, or turn on **Cut out the dark areas** if yours is the other way round. **Trim border** ignores a plain edge around the artwork.
- **Finished photo or render, shown as it is:** a picture of the finished firepit. It can't be turned.

The firepit needs the group keys `style`, `pattern`, `size`, `material` and `plate`, and the material values `mild`, `paint`, `s3cr` and `s304`. The artwork and photos in `assets/firepit/` came from Luffman's current site. Safari is a stand-in drawn in code until its flat artwork is uploaded.

## Our work

Install the **Luffman Blocks** plugin. Jobs are added under **Our work** in the admin, each with a title, sector, process, material and result. The latest three show on the homepage, and all of them at `/our-work/`.

## Quote form

The Get a quote pattern shows the Contact Form 7 form titled **Get a quote**, so the form must keep that title. The host needs PHP 8.3 or newer for Contact Form 7.

- **Uploads:** one file up to 15MB (DXF, DWG, STEP, PDF, ZIP or an image). Email encoding adds about a third, and Gmail's limit is 25MB per message. The file is attached to the email and Contact Form 7 deletes its temporary copy.
- **Before launch:** change the form's Mail recipient from the site admin address to `luffmaneng@gmail.com`, and set up an SMTP plugin so email is delivered reliably.
- **Spam:** add Cloudflare Turnstile under Contact → Integration.
- **Test:** send a real file at the limit, because the mail service may have a lower limit than Gmail.
