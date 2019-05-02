const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const merge = require('merge-stream');
const sass = require('gulp-sass');
const zip = require('gulp-zip');
const config = require('./config.json');

// Set the output directories
const themeDir = (config.hasOwnProperty('name') && config.name.length > 0) ? config.name : 'theme';
const pluginDir = (config.hasOwnProperty('name') && config.name.length > 0) ? config.name + '-plugin' : 'plugin';



// Task: Build Theme
gulp.task('build-theme', () => {
    // Copy theme files
    let theme = gulp.src([
        './theme/**',
        '!theme/{js,js/**}',
        '!theme/{scss,scss/**}'
    ])
    .pipe(gulp.dest('./wordpress/wp-content/themes/' + themeDir));

    // Transpile JS using Babel
    let js = gulp.src([
        './theme/js/theme.js'
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./wordpress/wp-content/themes/' + themeDir + '/js'));

    // Compile SCSS
    let scss = gulp.src([
        './theme/scss/theme.scss'
    ])
    .pipe(sass({
        includePaths: ['node_modules/']
      }))
    .pipe(gulp.dest('./wordpress/wp-content/themes/' + themeDir + '/css'));

    // Merge each stream into one
    return merge(theme, js, scss);
});



// Task: Build Plugin
gulp.task('build-plugin', () => {
    // Copy plugin files
    let plugin = gulp.src([
        './plugin/**',
        '!plugin/{js,js/**}',
        '!plugin/{scss,scss/**}'
    ])
    .pipe(gulp.dest('./wordpress/wp-content/themes/' + pluginDir));

    // Transpile JS using Babel
    let js = gulp.src([
        './plugin/js/plugin.js'
    ])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./wordpress/wp-content/themes/' + pluginDir + '/js'));

    // Compile SCSS
    let scss = gulp.src([
        './plugin/scss/plugin.scss'
    ])
    .pipe(sass({
        includePaths: ['node_modules/']
      }))
    .pipe(gulp.dest('./wordpress/wp-content/themes/' + pluginDir + '/css'));

    // Merge each stream into one
    return merge(plugin, js, scss);
});



// Task: Zip
gulp.task('zip', () => {
    // Zip the theme directory
    let theme = gulp.src([
        './wordpress/wp-content/themes/' + themeDir + '/**'
    ])
    .pipe(zip(themeDir + '.zip'))
    .pipe(gulp.dest('./dist'));

    // Zip the plugin directory
    let plugin = gulp.src([
        './wordpress/wp-content/themes/' + pluginDir + '/**'
    ])
    .pipe(zip(pluginDir + '.zip'))
    .pipe(gulp.dest('./dist'));

    // Merge each stream into one
    return merge(theme, plugin);
});



// Task: Clean
gulp.task('clean', () => {
    return del(['dist/**']);
});



// Task: Build
gulp.task('build', gulp.series([
    'clean',
    ...(config.buildTheme ? ['build-theme'] : []),
    ...(config.buildPlugin ? ['build-plugin'] : [])
]));



// Task: Release
gulp.task('release', gulp.series([
    'build',
    'zip'
]));

// Watch

gulp.task('watch', function(callback) {

        gulp.watch('./theme/**/*', gulp.series('build-theme'));
    
        callback();
    
    });