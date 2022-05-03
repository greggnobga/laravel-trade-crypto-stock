const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

/**
 * Compile scss styles.
 */
mix.sass('resources/css/scss/global.scss', 'public/assets/css/global.css');

/**
 * Compile javascript codes.
 */
mix.js('resources/js/global.js', 'public/assets/js');

/** copy image to public folder.
    mix.copy('resources/img', 'public/assets/img');
 */
/** compile glider and copy to public folder.
    mix.js('resources/vendor/glider/glider.js', 'public/assets/vendor/glider')
       .postCss('resources/vendor/glider/glider.css', 'public/assets/vendor/glider', [ ]);
 */

