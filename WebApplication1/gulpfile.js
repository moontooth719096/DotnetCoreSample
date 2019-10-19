/// <binding AfterBuild='movenpmFile' Clean='clean:js' ProjectOpened='auto' />
const gulp = require("gulp"),
    rimraf = require("rimraf")
    concat = require("gulp-concat"),
    //cssmin = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify"),
    changed = require("gulp-changed"),
    hash = require("gulp-hash-filename"),
    uglifyCss = require("gulp-uglifycss");


//檔案要存的路徑
const paths = {
    root: "./wwwroot/",
    css: './wwwroot/css/',
    js: './wwwroot/js/',
    lib: './wwwroot/lib/'
};

//js檔名格式
paths.jsDist = paths.js + "**/*.js";//匹配所有 js 的文件所在路径
paths.minJsDist = paths.js + "**/*.min.js";//匹配所有 js 对应压缩后的文件所在路径
paths.concatJsDist = paths.js + "site.js";//将所有的 js 压缩到一个 js 文件后的路径

//css檔名格式
paths.CssDist = paths.css + "**/*.css";//匹配所有 js 的文件所在路径
paths.minCssDist = paths.css + "**/*.min.css";//匹配所有 js 对应压缩后的文件所在路径
paths.concatCssDist = paths.css + "site.css";//将所有的 js 压缩到一个 js 文件后的路径

//使用 npm 下载的前端组件包
const libs = [
    { name: "jquery", dist: "./node_modules/jquery/dist/**/*.*" },
    { name: "popper", dist: "./node_modules/popper.js/dist/**/*.*" },
    { name: "bootstrap", dist: "./node_modules/bootstrap/dist/**/*.*" },
    { name: "angular", dist: "./node_modules/angular/**/*.*" },
    { name: "font-awesome", dist: "./node_modules/font-awesome/*/**/*.*" }
    
];

//移动 npm 下载的前端组件包到 wwwroot 路径下
gulp.task("movenpmFile", done => {
    libs.forEach(function (item) {
        gulp.src(item.dist)
            .pipe(gulp.dest(paths.lib + item.name + "/dist"));
    });
    done()
});

gulp.task("clean:js", done => rimraf(paths.minJsDist, done));

//每一个 js 文件压缩到对应的 min.js
gulp.task("min:js", () => {
    return gulp.src([paths.jsDist, "!" + paths.minJsDist], { base: "." })
        .pipe(rename({ suffix: '.min' }))
        .pipe(changed('.'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

//将所有的 js 文件合并打包压缩到 app.min.js 中
gulp.task("concatmin:js", () => {
    return gulp.src([paths.jsDist, "!" + paths.minJsDist, "!" + paths.concatJsDist], { base: "." })
        .pipe(concat(paths.concatJsDist))
        .pipe(changed('.'))
        //.pipe(uglify())
        .pipe(gulp.dest("."));
});
//更改js檔名
gulp.task('assemble', function () {
    return gulp.src([paths.jsDist, "!" + paths.minJsDist], { base: "." })
        .pipe(hash({"format": "{name}.{hash: 5}{ext}"}))
        .pipe(gulp.dest('.'))
});

gulp.task("min:css", () => {
    return gulp.src([paths.CssDist, "!" + paths.minCssDist], { base: "." })
        .pipe(rename({ suffix: '.min' }))
        .pipe(changed('.'))
        .pipe(uglifyCss())
        .pipe(gulp.dest('.'));
});
//将所有的 css 文件合并打包压缩到 app.min.css 中
//gulp.task("concatmin:css", () => {
//    return gulp.src([paths.CssDist, "!" + paths.minCssDist, "!" + paths.concatCssDist], { base: "." })
//        .pipe(concat(paths.concatCssDist))
//        .pipe(changed('.'))
//        .pipe(gulp.dest("."));
//});

gulp.task("min", gulp.series(["min:js","min:css"]));
gulp.task("concatmin", gulp.series(["concatmin:js"]));

//监听文件变化后自动执行
gulp.task("auto", () => {
    gulp.watch(paths.js, gulp.series(["min:js", "concatmin:js"]));
    gulp.watch(paths.css, gulp.series(["min:css"]));
});