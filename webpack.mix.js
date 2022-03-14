let mix = require( 'laravel-mix' );
let path = require( 'path' );
const webpack = require( 'webpack' );


mix.alias( {
    '@': path.join( __dirname, '/vue/assets/images' ),
} );


/* sets the base output path for any mix assets. Fonts, images etc. */
mix.setPublicPath( 'public' );

/* load browser sync to reload page whenever script updates */
mix.browserSync( 'localhost' );


mix.js( 'vue/main.js', 'public/assets/js/main.js' ).vue();


/* disable build notifications */
mix.disableSuccessNotifications();

mix.autoload( {
    jquery: ['$', 'window.jQuery'],
} );


mix.webpackConfig( {
    plugins: [
        new webpack.DefinePlugin( {
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        } ),
    ],
} );
