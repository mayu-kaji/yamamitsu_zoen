// gulpのメソッド呼び出し
// src：参照元指定、dest：出力先指定、watch：ファイル監視、series：直列処理、parallel：並列処理
const { src, dest, watch, series, parallel } = require("gulp");

// 入出力先指定
const srcBase = "../src";
const distBase = "../assets";
const srcPath = {
  css: srcBase + "/sass/**/*.scss",
  img: srcBase + "/img/**/*",
  html: srcBase + "/**/*.html",
  php: srcBase + "/**/*.php",
  js: srcBase + "/js/**/*.js",
};
const distPath = {
  css: distBase + "/css/",
  img: distBase + "/img/",
  html: distBase + "/**/*.html",
  js: distBase + "/js/",
  php: distBase + "/**/*.php",
};

// ローカルサーバー立ち上げ
const browserSync = require("browser-sync").create();
const connect = require("gulp-connect-php");
const usePhp = false; // PHPを使用する場合はtrueにする
const connectOption = {
  base: distBase,
  port: 8001,
  keepalive: true,
};

const serve = (done) => {
  if (usePhp) {
    // PHPサーバーを起動
    connect.server(connectOption, function () {
      browserSync.init({
        proxy: "127.0.0.1:8001", // PHPサーバーのアドレス
      });
    });
  } else {
    // HTMLサーバーを起動
    browserSync.init({
      server: {
        baseDir: distBase, // HTMLファイルのディレクトリ
      },
    });
  }
  done();
};
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

// htmlの整形
const htmlbeautify = require("gulp-html-beautify");
const htmlBeautify = () => {
  return src(srcPath.html)
    .pipe(
      htmlbeautify({
        indent_size: 2,
        indent_char: " ",
        max_preserve_newlines: 1,
        preserve_newlines: true,
        unformatted: true,
        end_with_newline: true,
      })
    )
    .pipe(dest(distBase));
};

// phpの整形
const php = () => {
  return src(srcPath.php).pipe(dest(distBase));
};

// Sassコンパイル
const sass = require("gulp-sass")(require("sass")); // sassコンパイル（DartSass対応）
const sassGlob = require("gulp-sass-glob-use-forward"); // globパターンを使用可にする
const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない
const notify = require("gulp-notify"); // エラー発生時のアラート出力
const postcss = require("gulp-postcss"); // PostCSS利用
const cssnext = require("postcss-cssnext"); // 最新CSS使用を先取り
const cssDeclarationSorter = require("css-declaration-sorter"); // CSSプロパティをソート
const browsers = [
  // 対応ブラウザの指定
  "last 2 versions",
  "> 5%",
  "ie = 11",
  "not ie <= 10",
  "ios >= 8",
  "and_chr >= 5",
  "Android >= 5",
];

const cssSass = (isProduction = false) => {
  const sassOptions = isProduction ? { outputStyle: "compressed" } : { outputStyle: "expanded" };
  const postcssPlugins = [cssnext({ features: { rem: true } }, browsers), cssDeclarationSorter({ order: "alphabetical" })];

  return src(srcPath.css, { sourcemaps: !isProduction }) // ソースマップのオプションを追加
    .pipe(sassGlob())
    .pipe(sass.sync(sassOptions).on("error", sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(dest(distPath.css, { sourcemaps: "." })) // ソースマップの保存先指定
    .pipe(notify({ message: "Sassをコンパイルしました！", onLast: true }));
};

// 画像圧縮
const imagemin = require("gulp-imagemin"); // 画像圧縮
const imageminMozjpeg = require("imagemin-mozjpeg"); // jpgの高圧縮に必要
const imageminPngquant = require("imagemin-pngquant"); // pngの高圧縮に必要
const imageminSvgo = require("imagemin-svgo"); // svgの高圧縮に必要

const imgImagemin = async () => {

  return src(srcPath.img)
    .pipe(
      imagemin(
        [
          imageminMozjpeg({
            quality: 75,
          }),
          imageminPngquant(),
          imageminSvgo({
            plugins: [
              {
                removeViewbox: false, // viewBox属性を削除しない
              },
            ],
          }),
        ],
        {
          verbose: true,
        }
      )
    )


    .pipe(dest(distPath.img));
};

// jsの圧縮
const uglify = require("gulp-uglify"); // js圧縮
const jsProcess = (isProduction = false) => {
  if (isProduction) {
    // 本番モードの場合、ファイルを圧縮
    return src(srcPath.js).pipe(uglify()).pipe(dest(distPath.js));
  } else {
    // 開発モードの場合、ファイルをそのまま出力
    return src(srcPath.js).pipe(dest(distPath.js));
  }
};

// ファイルの変更を検知
const watchFiles = () => {
  watch(
    srcPath.css,
    series(() => cssSass(false), browserSyncReload)
  );
  watch(srcPath.img, series(imgImagemin, browserSyncReload));
  watch(srcPath.html, series(htmlBeautify, browserSyncReload));
  watch(
    srcPath.js,
    series(() => jsProcess(false), browserSyncReload)
  );
  watch(srcPath.php, series(php, browserSyncReload));
};

// clean
const del = require("del");
const delPath = {
  css: distBase + "/css/common.css",
  cssMap: distBase + "/css/common.css.map",
  img: distBase + "/img/",
};
const clean = (done) => {
  del(distPath.css, { force: true });
  del(delPath.img, { force: true });
  done();
};

// buildタスク
exports.build = series(
  clean,
  htmlBeautify,
  () => jsProcess(true),
  imgImagemin,
  () => cssSass(true)
);

// defaultタスク
// defaultタスク
exports.default = series(
  series(
    clean,
    htmlBeautify,
    () => jsProcess(false),
    imgImagemin,
    () => cssSass(false)
  ),
  parallel(watchFiles, serve)
);
