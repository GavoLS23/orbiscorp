'use strict';

var browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const swPrecache = require('sw-precache');
const pkg = require('./package.json');
const path = require('path');
const { series, parallel, watch } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const psi = require('psi');
const sass = require('gulp-sass')(require('sass'));
var del = require('del');
var vueify = require('gulp-vueify');

const $ = gulpLoadPlugins({
    rename: {
        'gulp-file-include': 'fileInclude'
    }
});

const { src, dest } = require('gulp');
const fs = require("fs");

function lint(cb) {
    return src(['src/scripts/**/*.js', '!node_modules/**'])
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

exports.lint = lint;

function images(cb) {
    return src('src/images/**/*')
      .pipe($.imagemin({
          progressive: true,
          interlaced: true
      }))
      .pipe(dest('dist/images'))
      .pipe($.size({ title: 'images' }))
}

function copy(cb) {
    return src([
        'src/*',
        '!src/*.html',
    ], {
        dot: true
    }).pipe(dest('dist'))
      .pipe($.size({ title: 'copy' }));
}

function copyFonts() {
    return src(['src/fonts/**/*'])
      .pipe(dest('dist/fonts'));
}

function styles() {
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

    return src([
        'src/**/*.scss',
        'src/**/*.css'
    ])
      .pipe($.sourcemaps.init())
      .pipe(sass({
          precision: 10
      }).on('error', sass.logError))
      .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe(dest('.tmp/styles'))
      .pipe($.if('*.css', $.cssnano()))
      .pipe($.size({ title: 'styles' }))
      .pipe($.sourcemaps.write('./'))
      .pipe(dest('.tmp'))
      .pipe(dest('dist'))
      .pipe(browserSync.stream());

}

function scripts() {
    return src([
        './src/**/*.js', '!./src/scripts', '!./src/scripts/*', '!./src/scripts/**/*', '!./src/*.js'
    ], { allowEmpty: true })
      .pipe($.debug({ title: 'scripts:' }))
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.sourcemaps.write())
      .pipe(dest('.tmp/scripts'))
      .pipe($.uglify())
      .pipe($.size({ title: 'scripts' }))
      .pipe($.sourcemaps.write('.'))
      .pipe(dest('dist'))
      .pipe(dest('.tmp'));
}

function indexScript() {
    return src([
        './src/scripts/index.js',
        './src/main.js'
    ])
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.sourcemaps.write())
      .pipe(dest('.tmp/scripts'))
      .pipe($.concat('index.min.js'))
      .pipe($.uglify())
      .pipe($.size({ title: 'scripts' }))
      .pipe($.sourcemaps.write('.'))
      .pipe(dest('dist/scripts'))
      .pipe(dest('.tmp/scripts'));
}

function scriptsVendor() {
    return src([
        './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        './node_modules/typed.js/lib/typed.min.js',
        './node_modules/particles.js/particles.js',
        './node_modules/jquery-validation/dist/jquery.validate.js'
    ], { allowEmpty: true })
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.sourcemaps.write())
      .pipe(dest('.tmp/scripts'))
      .pipe($.concat('main-vendor.min.js'))
      .pipe($.uglify())
      .pipe($.size({ title: 'scripts' }))
      .pipe($.sourcemaps.write('.'))
      .pipe(dest('dist/scripts'))
      .pipe(dest('.tmp/scripts'));
}

function html() {
    return src(['src/**/*.html', '!src/partials/**/*.html', '!src/partials/*.html', '!src/partials'])
      .pipe($.useref({
          searchPath: '{.tmp,app}',
          noAssets: true
      }))
      .pipe($.fileInclude({
          prefix: '@@',
          basepath: '@file'
      }))
      .pipe($.if('*.html', $.htmlmin({
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeOptionalTags: true
      })))
      .pipe($.if('*.html', $.size({ title: 'html', showFiles: true })))
      .pipe(dest('dist'));
}

function htmlDev() {
    return src(['src/**/*.html', '!src/partials/**/*.html', '!src/partials/*.html'])
      .pipe($.useref({
          searchPath: '{.tmp,app}',
          noAssets: true
      }))
      .pipe($.fileInclude({
          prefix: '@@',
          basepath: '@file'
      }))
      .pipe(dest('.tmp'))
      .pipe(browserSync.stream());
}

function clean() {
    return del(['.tmp', 'dist']);
}

exports.clean = clean;

function reloadBrowser(cb) {
    reload();
    cb();
}

function develop() {
    browserSync.init({
        notify: false,
        logPrefix: 'WSK',
        scrollElementMapping: ['main', '.mdl-layout'],
        server: ['.tmp', 'src'],
        port: 3000
    });

    watch(['src/**/*.html'], series(htmlDev));
    watch(['src/**/*.{scss,css}'], series(styles));
    watch(['src/**/*.js'], series(scripts, indexScript, reloadBrowser));
    watch(['src/images/**/*'], series(reloadBrowser));
    watch(['src/components/**/*.vue'], series(vueifyTask, reloadBrowser));
    watch(['src/**/*.vue'], series(vueifyTask, reloadBrowser));
}

exports.develop = series(clean, parallel(scriptsVendor, indexScript, scripts, styles, htmlDev, vueifyTask), develop);

function serveDist() {
    browserSync.init({
        notify: false,
        logPrefix: 'WSK',
        scrollElementMapping: ['main', '.mdl-layout'],
        server: 'dist',
        port: 3001
    });
}

exports.serveDist = series(serveDist);

exports.default = series(clean, styles, parallel(html, scripts, scriptsVendor, indexScript, images, copy, copyFonts, vueifyTask), series(copySwScripts, generateServiceWorkerTask));

async function pagespeedTask() {
    await psi.output('www.squars.tech', {
        strategy: 'mobile'
    });
}

exports.pagespeed = pagespeedTask;

function copySwScripts() {
    return src(['node_modules/sw-toolbox/sw-toolbox.js', 'src/scripts/sw/runtime-caching.js'])
      .pipe(dest('dist/scripts/sw'));
}

function generateServiceWorkerTask() {
    const rootDir = 'dist';
    const filepath = path.join(rootDir, 'service-worker.js');

    return swPrecache.write(filepath, {
        cacheId: pkg.name || 'squars',
        importScripts: [
            'scripts/sw/sw-toolbox.js',
            'scripts/sw/runtime-caching.js'
        ],
        staticFileGlobs: [
            `${rootDir}/images/**/*`,
            `${rootDir}/scripts/**/*.js`,
            `${rootDir}/styles/**/*.css`,
            `${rootDir}/*.{html,json}`
        ],
        stripPrefix: rootDir + '/'
    });
}

function packageTask(cb) {
    var fs = require('fs');
    var archiver = require('archiver');

    var output = fs.createWriteStream(__dirname + '/' + pkg.name + '.zip');
    var archive = archiver('zip', {
        zlib: { level: 9 }
    });

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    output.on('end', function () {
        console.log('Data has been drained');
    });

    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
        } else {
            throw err;
        }
    });

    archive.on('error', function (err) {
        throw err;
    });

    archive.pipe(output);

    archive.directory('dist', pkg.name);

    archive.finalize();
    cb();
}

exports.package = series(packageTask);

// Tarea de vueify
function vueifyTask() {
    return src(['src/components/**/*.vue', 'src/**/*.vue'])
      .pipe(vueify())
      .pipe(dest('./dist'));
}

exports.vueify = vueifyTask;
