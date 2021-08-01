const { task, src, dest, watch, series, parallel } = require("gulp");

const config               = require("./config.js");
const sass                 = require("gulp-sass")(require("sass"));
const postcss              = require("gulp-postcss");

const autoprefixer         = require("autoprefixer");
const cssnano              = require("cssnano");

// ┌─────────────────────────────────────────┐
// │           CSS Transpile task            │
// └─────────────────────────────────────────┘

task("css_transpile", function() {
    let postcss_plugins = [
        autoprefixer(),
        cssnano()
    ];

    return src(config.path_to_src("scss/**/*.scss"))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcss_plugins))
        .pipe(dest(config.path_to_build("css/")))
    ;
});
