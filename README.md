
# Build'n'Bloom Block Plugins

This is the development site for the `build-n-bloom-blocks` plugin: one central plugin of custom Gutenberg blocks that can be installed on any Build'n'Bloom client site. The blocks provide the layout and behaviour; each site sets its own styles and content.

## Blocks

All blocks are in the **Build N Bloom** category of the block inserter.

#### Video Popup (`youtube-video`)

An image with a title and play button. Clicking it opens a YouTube or Vimeo video in a full screen popup.

#### Item Grid (`item-grid`) → Grid Card / Video Card

A grid of cards with separate column counts for desktop, tablet and mobile and a shared image shape. The grid only accepts **Grid Cards** (image, title, text, optional link) and **Video Cards** (short muted clip that plays on hover or loops, title, text, optional link), and the cards can only be added inside a grid.

#### Carousel (`carousel`) → Carousel Slide

A scrolling carousel with slides visible per screen size, optional arrows, dots, looping and autoplay (paused on hover, off for reduced motion). Use "Fit inside" image fit for logo strips. It only accepts **Carousel Slides** (image, optional caption and link), which can only be added inside a carousel.

#### Tabs (`tabs`) → Tab

Tabbed content. It only accepts **Tabs**; each Tab has a title (used for the tab button) and any blocks as its content. Tabs are keyboard accessible, can be linked to with a Tab's HTML anchor, and show as stacked headed sections if JavaScript is unavailable.

## Styling the blocks on a site

The plugin only ships layout CSS, so each site keeps its own look:

- **Block settings:** the parent blocks support the standard colour, spacing and alignment controls, and the cards/slides support colour, padding and font size. These use the site's own `theme.json` palette and font sizes.
- **Theme CSS:** the plugin's selectors use `:where()`, which has no specificity, so any rule in the site's stylesheet overrides them.
- **CSS custom properties:** set these in the site's stylesheet (e.g. on `:root`) to restyle every instance:

| Block | Custom properties |
| --- | --- |
| Item Grid, cards | `--bnb-grid-gap`, `--bnb-card-background`, `--bnb-card-radius`, `--bnb-card-padding` |
| Carousel | `--bnb-carousel-gap`, `--bnb-carousel-arrow-color`, `--bnb-carousel-arrow-background`, `--bnb-carousel-arrow-size`, `--bnb-carousel-dot-color`, `--bnb-carousel-dot-active-color` |
| Tabs | `--bnb-tabs-gap`, `--bnb-tabs-border`, `--bnb-tab-padding`, `--bnb-tab-background`, `--bnb-tab-color`, `--bnb-tab-active-background`, `--bnb-tab-active-color`, `--bnb-tab-active-border-color`, `--bnb-tab-panel-padding` |
| Video Popup | `--bnb-video-popup-text-color`, `--bnb-video-popup-icon-size`, `--bnb-video-popup-backdrop` |

```css
:root {
	--bnb-card-radius: 12px;
	--bnb-carousel-arrow-color: var(--wp--preset--color--primary);
	--bnb-tab-active-border-color: #b70000;
}
```

- **Turning blocks off:** a site can remove block families it doesn't use with the `build_n_bloom_blocks` filter (see `build-bloom-blocks.php`).

## Getting Started

When developing on this theme for the first time, follow these steps:

- Download the latest version of Wordpress from [WordPress.org](https://wordpress.org/download/)
- Clone this repo to the Mamp htdocs file inside the `wp-content` folder. This repo doesn't contain all the other WordPress files that are required for running
- Setup the database in the `wp-config.php` file and create new database in Mamp phpMyAdmin
- Within the `build-n-bloom-blocks` folder, install npm. Node modules should be excluded from being uploaded to git - confirm in the `.gitignore` file.
- Run `npm run build` initially to get the correct build, followed by `npm run start`

## Building in the plugin

It was decided that all the blocks would be contained within the one plugin so there aren't multiple types and versions. To start developing, go into the `plugins` > `build-n-bloom-blocks` folder.

The `build` folder is what is produced by running the npm package command using wp-scripts. This does not need to be touched.

The `includes` folder is where the development starts. All the blocks are listed in `block-editor` > `blocks`, shared sidebar controls are in `block-editor` > `components`, and shared helpers in `block-editor/utils.js`.

To add a block: create its folder, add it to the list in `build-bloom-blocks.php` and add an entry in `webpack.config.js`. A child block (one that should only be used inside another block) sets `parent` in its `block.json`, has no `editorScript`, and is imported from its parent's `index.js`; the parent passes `allowedBlocks` to its inner blocks so only its children can be added. Child styles go in the parent's `style.scss`.

Each block folder contains:

#### block.json

This file contains the settings for the block, including all the attributes.

#### editor.scss

Styles that only apply inside the block editor (the admin preview of the block).

#### index.js

Registers the block and contains the `edit` function: the settings panel controls in the sidebar and how the block displays in the editor.

#### save.js

Defines the HTML markup that is saved to the page and shown on the front end. If this markup changes, add the old version to `deprecated.js` so blocks already on pages don't show as invalid.

#### style.scss

Styles that apply on the front end (and in the editor).

#### view.js (optional)

Front-end JavaScript, loaded only on pages that use the block. Add it to `viewScript` in `block.json` and as an entry in `webpack.config.js`.