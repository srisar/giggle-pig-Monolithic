let mix = require("laravel-mix");
let path = require("path");


mix.alias({
    "@": path.join(__dirname, "/vue/assets/images")
});


/* sets the base output path for any mix assets. Fonts, images etc. */
mix.setPublicPath("public");

/* load browser sync to reload page whenever script updates */
mix.browserSync("localhost");


mix.js("vue/main.js", "public/assets/js/main.js").vue();


/* disable build notifications */
mix.disableSuccessNotifications();


mix.override(webpackConfig => {
    // BUG: vue-loader doesn"t handle file-loader"s default esModule:true setting properly causing
    // <img src="[object module]" /> to be output from vue templates.
    // WORKAROUND: Override mixs and turn off esModule support on images.
    // FIX: When vue-loader fixes their bug AND laravel-mix updates to the fixed version
    // this can be removed
    webpackConfig.module.rules.forEach(rule => {
        if (rule.test.toString() === "/(\\.(png|jpe?g|gif|webp)$|^((?!font).)*\\.svg$)/") {
            if (Array.isArray(rule.use)) {
                rule.use.forEach(ruleUse => {
                    if (ruleUse.loader === "file-loader") {
                        ruleUse.options.esModule = false;
                    }
                });
            }
        }
    });
});
