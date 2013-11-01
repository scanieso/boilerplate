# Boilerplate

Front-end boilerplate for new projects.

- For development files, please see `app/`.
- For production files, please see `public/`.

## General

- Please take care to maintain existing code styles.

## CSS / Scss

#### Vendor styles include:
- [Bourbon](http://bourbon.io/)

#### Design Practices
- For the most part, use top spacing instead of bottom and left instead of right for `:first-child` browser support.

## JS

## Build

Uses [Gruntjs](http://gruntjs.com/). Default task runs `watch`.

### Tasks

#### JavaScript

- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint): Validate files with JSHint
- [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat): Concatenate files
- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify): Minify `.js` files

#### CSS

- [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass): Compile Sass
- [grunt-combine-media-queries](https://github.com/buildingblocks/grunt-combine-media-queries): Combine matching media queries into one
- [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin): Minify `.css` files

#### HTML

- [grunt-jekyll](https://github.com/dannygarcia/grunt-jekyll): Compile Jekyll
- [grunt-htmllint](https://github.com/jzaefferer/grunt-html): Validate files

#### Image

- [grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith): Generate sprite and accompanying Sass from set of images
- [grunt-responsive-images](https://github.com/andismith/grunt-responsive-images): Generate various sized images
- [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin): Minify `.png`, `.jpg`, `.gif` files

#### Misc

- [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy): Copy files
- [grunt-webfont](https://github.com/sapegin/grunt-webfont): Generate custom icon font and accompanying Sass from set of SVG files
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch): Run predefined tasks once certain files are changed, added or deleted
- [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent): Run tasks concurrently (useful for slower tasks)
