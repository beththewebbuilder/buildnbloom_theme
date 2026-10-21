
# Build'n'Bloom Block Plugins

This is a theme for designing custom gutenberg blocks for WordPress website to ease site creation.  It contains the following:

#### Image/Video Banner

This was the first block to be created for this plugin in March 2024. It allows an image to be selected for both desktop and mobile sized screens, image height, position, opacity and content position to be set. Either image or video can be selected and will adjust accordingly.
A header, subheading and a button can be added to this block. Left blank it will just be an image or video banner. 

TODO:
- Style the front-end view to match the settings selected

OTHER BLOCKS:
- Image slider was optional overlay text
- Video player

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

The `includes` folder is where the development starts. All the blocks are listed in `block-editor` > `blocks`. Each block folder contains:

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