var compileSass = require('broccoli-sass');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var styles = 'app/stylesheets/';

var appCss = compileSass([styles],
  'styles.scss',
  '/assets/css/styles.css'
  );

module.exports = mergeTrees([appCss]);
