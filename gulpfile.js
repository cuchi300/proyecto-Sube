const { src, dest, watch, series } = require('gulp');

// css
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const terser = require('gulp-terser');

// imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css() {
    return src('src/scss/app.scss')
        .pipe(plumber())
        .pipe(sass({ outputStyle: ('compressed') }))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'))
}
function imagenes() {
    const opciones = {
        optimizationLevel: 3
    }
    return src('src/img/**/*')
        .pipe(imagemin(opciones))
        .pipe(dest('build/img'))
}
function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
}

function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(terser())
        .pipe(dest('build/js'))
    done()
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done()
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.javascript = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(javascript, css, dev);