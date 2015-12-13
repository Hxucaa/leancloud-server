/**
 * Created by hxucaa on 2015-11-17.
 */

"use strict";

//const DEBUG = process.env.NODE_ENV === "debug";
//const CI = process.env.CI === "false";

import gulp from "gulp";
import runSequence from "run-sequence";
import mocha from "gulp-spawn-mocha";
import gutil from "gulp-util";
import eslint from "gulp-eslint";
import shell from "gulp-shell";
import del from "del";

import jsdocConf from "./jsdoc.conf.json";
import pkg from "./package.json";

const lintSrc = [
  "server/**/*.js",
  "test/**/*.js",
  "config/**/*.js",
  "app.js",
  "cloud.js",
  "server.js",
  "gulpfile.babel.js",
  "gulp/**/*.js",
  "!config/secret.js"
];

gulp.task("default", () => {

});

gulp.task("test:unit", () => {
  return gulp
    .src(["test/unit/**/*.js"], { read: false })
    .pipe(mocha({
      compilers: "js:babel-core/register",
      reporter: "spec",
      timeout: 5000,
      ignoreLeaks: false,
      r: "test/unit/spec_helper.js",
      recursive: true,
      harmony: true
    }))
    .on("error", gutil.log);
});

gulp.task("test:gen", () => {
  return gulp
    .src(["test/generative/**/*.js"], { read: false })
    .pipe(mocha({
      compilers: "js:babel-core/register",
      reporter: "spec",
      timeout: 5000,
      ignoreLeaks: false,
      r: "test/generative/spec_helper.js",
      recursive: true,
      harmony: true
    }))
    .on("error", gutil.log);
});

gulp.task("test:inter", () => {
  return gulp
    .src(["test/integration/**/*.js"], { read: false })
    .pipe(mocha({
      compilers: "js:babel-core/register",
      reporter: "spec",
      timeout: 5000,
      ignoreLeaks: false,
      r: "test/integration/spec_helper.js",
      recursive: true,
      harmony: true
    }))
    .on("error", gutil.log);
});

gulp.task("test:sys", () => {
  return gulp
    .src(["test/system/**/*.js"], { read: false })
    .pipe(mocha({
      compilers: "js:babel-core/register",
      reporter: "spec",
      timeout: 30000,
      ignoreLeaks: false,
      r: "test/system/spec_helper.js",
      recursive: true,
      harmony: true
    }))
    .on("error", gutil.log);
});

gulp.task("test", callback => {
  runSequence(
    "lint",
    "test:unit",
    "test:gen",
    "test:inter",
    "test:system",
    callback
  );
});

gulp.task("test:w", ["test:unit", "test:gen", "test:inter", "test:sys"], () => {
  gulp.watch(
    ["server/**", "test/**", "config/**", "app.js", "cloud.js", "server.js"],
    ["test:unit", "test:gen", "test:inter", "test:sys"]
  );
});

gulp.task("lint", () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it"s best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(lintSrc)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint({
      warnFileIgnored: true,
      fix: true,
      useEslintrc: true
    }))
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format());
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    //.pipe(eslint.failAfterError());
});

gulp.task("lint:w", ["lint"], () => {
  gulp.watch(lintSrc, ["lint"]);
});

gulp.task("jsdoc", ["clean:jsdoc"], () => {
  return gulp
    .src(["server/cloud/cloudfunction", "server/cloud/controller", "README.md"], { read: false })
    .pipe(shell(["./node_modules/.bin/jsdoc -t ./node_modules/ink-docstrap/template -c jsdoc.conf.json"])); // eslint-disable-line max-len
});

gulp.task("clean:jsdoc", () => {

  return del([
    jsdocConf.opts.destination
  ]);
});


gulp.task("watch", ["test:w", "lint:w"]);

gulp.task("help", () => { // eslint-disable-line max-statements
  gutil.log("");
  gutil.log(`--- ${pkg.name} Version: ${pkg.version} ---`);
  gutil.log("");
  gutil.log("See all of the available tasks:");
  gutil.log("$ gulp -T");
  gutil.log("");
  gutil.log("Run eslint:");
  gutil.log("$ gulp lint");
  gutil.log("");
  gutil.log("Watch lint");
  gutil.log("$ gulp lint:w");
  gutil.log("");
  gutil.log("Run all tests");
  gutil.log("$ gulp test");
  gutil.log("");
  gutil.log("Run only unit tests");
  gutil.log("$ gulp test:unit");
  gutil.log("");
  gutil.log("Run only generative tests");
  gutil.log("$ gulp test:gen");
  gutil.log("");
  gutil.log("Run only integration tests");
  gutil.log("$ gulp test:int");
  gutil.log("");
  gutil.log("Run only system tests");
  gutil.log("$ gulp test:sys");
  gutil.log("");
  gutil.log("Watch lint and tests");
  gutil.log("$ gulp watch");
  gutil.log("");
  gutil.log("Generate jsdoc");
  gutil.log("$ gulp jsdoc");
  gutil.log("");
  gutil.log("Watch tests");
  gutil.log("$ gulp test:w");
  gutil.log("");
  gutil.log(`--- ${pkg.name} Version: ${pkg.version} ---`);
  gutil.log("");
});
