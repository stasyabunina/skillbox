const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const svgSprite = require('gulp-svg-sprite');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const sass = require('gulp-sass')(require('sass'));

const clean = () => {
	return del(['dist'])
}

const styles = () => {
  return src(['src/sass/**/*.scss', 'src/sass/**/*.css'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
};

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist'))
}

const scripts = () => {
  return src(
    ['src/js/components/**.js', 'src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('script.js'))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

const svgSprites = () => {
  return src('src/img/svg/**.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(dest('dist/img'))
}

const images = () => {
  return src([
    'src/img/**.jpg',
    'src/img/**.png',
    'src/img/**.jpeg',
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/**/*.jpeg'
  ])
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 90, progressive: true }),
      imagemin.optipng({optimizationLevel: 2}),
    ]))
    .pipe(dest('dist/img'))
}

const svg = () => {
  return src('src/img/*.svg')
    .pipe(dest('dist/img'))
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist"
    },
  });

  watch('src/sass/**/*.scss', styles);
  watch('src/*.html', htmlMinify);
  watch('src/img/*.{jpg,jpeg,png}', images);
  watch('src/img/**/*.{jpg,jpeg,png}', images);
  watch('src/img/*.svg', svg);
  watch('src/img/svg/**.svg', svgSprites);
  watch('src/resources/**', resources);
  watch('src/js/**/*.js', scripts);
}

exports.styles = styles;
exports.clean = clean;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;

exports.default = series(clean, scripts, styles, resources, images, svg, svgSprites, htmlMinify, watchFiles);
