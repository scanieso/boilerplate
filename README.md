# Boilerplate

Front-end boilerplate for new projects.

## File Structure

File / folder | Purpose
--- | ---
`app/` | Contains unprocessed images, javascripts, stylesheets, jekyll files.
`app/images/` | Contains images to be generated into touch icons and favicons, images to have responsive counterparts generated, and images to be sprited.
`app/javascripts` | Contains ES6 style JavaScript modules and generated ES5 versions of modules.
`app/jekyll/` | Contains Jekyll includes, layouts and page templates.
`app/stylesheets` | Contains `.scss` modules, vendor Sass and `styles.scss` manifest.
`bower_components`| Contains packages downloaded via `bower`.
`bower.json` | Manifest for Bower packages.
`Gruntfile.js` | Configuration for Grunt tasks.
`node_modules` | Nodes packages for Grunt tasks downloaded via `npm`.
`package.json` | Manifest for Grunt packages.
`public/` | Contains compiled HTML and assets. Run server from here.
`README.md` | Notes about the project.
`tmp` | Holds temporary files during processing.

## General

- Please take care to maintain existing code styles.

## HTML

- Uses [jekyll](http://jekyllrb.com/).
- Make edits to layouts, includes and other HTML files within `app/jekyll/`.

## CSS / Scss

#### Vendor
- [Bourbon](http://bourbon.io/)
- [Normalize](http://necolas.github.io/normalize.css/)

## JS

## Build

Uses [Grunt](http://gruntjs.com/). Default task runs `connect` and `watch`.

    $ bower install
    $ npm install
    $ grunt

### Dependencies

See corresponding plugin page for more detail.

- sass
- jekyll
- phantomJS or canvas or Graphics Magick or Image Magick (for sprite task)
- Graphics Magick or Image Magick (for responsive-images)
- fontforge, ttfautohint (for webfont)
