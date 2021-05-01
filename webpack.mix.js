let mix = require("laravel-mix");

/* sets the base output path for any mix assets. Fonts, images etc. */
mix.setPublicPath("public");

/* load browser sync to reload page whenever script updates */
mix.browserSync("localhost");


mix.js("vue/main.js", "public/assets/js/main.js").vue();


/* disable build notifications */
mix.disableSuccessNotifications();
