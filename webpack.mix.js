const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/** bundle javascript and sass. */
mix.js('resources/js/boot.js', 'public/js/main.js')
    .sass('resources/scss/global.scss', 'public/css/main.css')
    .react();

/** create source maps. */
mix.sourceMaps(true);

/** copy svg sprite. */
mix.copy('resources/icons', 'public/icons');

/** copy images. */
mix.copy('resources/images', 'public/images');