// https://www.typescriptlang.org/docs/handbook/gulp.html

const { task, src, dest, watch, series, parallel } = require("gulp");

const config               = require("./config.js");

const fancy_log            = require("fancy-log");

const sass                 = require("gulp-sass")(require("sass"));
const postcss              = require("gulp-postcss");
const typescript           = require("gulp-typescript");
const uglify               = require("gulp-uglify");
const sourcemaps           = require("gulp-sourcemaps");

const source               = require("vinyl-source-stream");
const buffer               = require("vinyl-buffer");

const autoprefixer         = require("autoprefixer");
const cssnano              = require("cssnano");

const browserify           = require("browserify");
const watchify             = require("watchify");
const tsify                = require("tsify");

// ┌─────────────────────────────────────────┐
// │             Watchify config             │
// └─────────────────────────────────────────┘

//const watchedBrowserify = watchify(
//    browserify({
//            basedir: ".",
//            debug: true,
//            entries: ["src/ts/main.ts"],
//            cache: {},
//            packageCache: {},
//            packageCache: {},
//        }).plugin(tsify)
//);

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

// ┌─────────────────────────────────────────┐
// │            TS Transpile task            │
// └─────────────────────────────────────────┘

//task("ts_transpile", function() {
//    return watchedBrowserify
//        .bundle()
//        .pipe(source("index.js"))
//        .pipe(buffer())
//        .pipe(sourcemaps.init({loadMaps: true}))
//        .pipe(uglify())
//        .pipe(sourcemaps.write("./"))
//        .pipe(dest(config.path_to_build("js/")))
//})

task("ts_transpile", function() {
    return browserify({
        basedir: "./src/ts",
        debug: true,
        entries: ["main.ts"],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(dest(config.path_to_build("js/")));
})

// ┌─────────────────────────────────────────┐
// │             copy html task              │
// └─────────────────────────────────────────┘

task("copy-html", function() {
    return src(config.path_to_src("html/*.html"))
        .pipe(dest(config.path_to_build("/")))
});

// ┌─────────────────────────────────────────┐
// │               Build task                │
// └─────────────────────────────────────────┘

task("build", parallel("css_transpile", "copy-html", "ts_transpile"))
