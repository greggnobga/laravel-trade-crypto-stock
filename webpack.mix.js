const mix = require("laravel-mix");
const tailwind = require("tailwindcss");
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

/** bundle javascript and tailwind. */
mix.js("resources/js/main.js", "public/js/main.js")
    .postCss("resources/css/app.css", "public/css/app.css", [tailwind])
    .react();

/** create source maps. */
mix.sourceMaps(true);

/** copy svg sprite. */
mix.copy("resources/icons", "public/icons");

/** copy images. */
mix.copy("resources/images", "public/images");
