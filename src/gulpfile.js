const { task, src, dest, watch, series, parallel } = require("gulp");

const config               = require("./config.js");

const sass                 = require("gulp-sass");
//const postcss              = require("gulp-postcss");
//
//const autoprefixer         = require("autoprefixer");
//const cssnano              = require("cssano");


// ┌─────────────────────────────────────────┐
// │               Watch tasks               │
// └─────────────────────────────────────────┘

task("css_transpile", function() {
    return src(config.path_to_src("scss/**/*.scss"))
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(config.path_to_build("css/")))
    ;
});
