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

const browserSync          = require("browser-sync").create();
const reload               = browserSync.reload;

// ┌─────────────────────────────────────────┐
// │           CSS Transpile task            │
// └─────────────────────────────────────────┘

//task("css_transpile", function() {
//    let postcss_plugins = [
//        autoprefixer(),
//        cssnano()
//    ];
//
//    return src(config.path_to_src("scss/style.scss"))
//        .pipe(sourcemaps.init())
//        .pipe(sass().on('error', sass.logError))
//        .pipe(postcss(postcss_plugins))
//        .pipe(sourcemaps.write("."))
//        .pipe(dest(config.path_to_build("/")))
//        .pipe(browserSync.stream())
//    ;
//});

task("css_transpile", function() {
    let postcss_plugins = [
        autoprefixer(),
        cssnano()
    ];

    return src(config.path_to_src("scss/style.scss"))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postcss_plugins))
        .pipe(dest(config.path_to_build("/")))
        .pipe(reload({stream: true}))
    ;
});

// ┌─────────────────────────────────────────┐
// │            TS Transpile task            │
// └─────────────────────────────────────────┘

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
// │               Assets task               │
// └─────────────────────────────────────────┘
task("copy-assets", function() {
	return src(config.path_to_src("assets/**/*"))
		.pipe(dest(config.path_to_build("/assets")));
});

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

task("build", parallel("css_transpile", "copy-assets", "copy-html", "ts_transpile"))

// ┌─────────────────────────────────────────┐
// │               Watch task                │
// └─────────────────────────────────────────┘
task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: config.path_to_build("/")
        }
    });

    watch("src/scss/**/*.scss", series("css_transpile"));
    watch("src/html/**/*.html", series("copy-html",    (cb) => {reload(); cb();}));
    watch("src/ts/**/*.ts"    , series("ts_transpile", (cb) => {reload(); cb();}));
})

task("serve", series("build", "browser-sync"));
