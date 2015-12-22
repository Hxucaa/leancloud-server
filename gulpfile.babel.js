/**
 * Created by hxucaa on 2015-11-17.
 */

"use strict";

import gulp from "gulp";
import runSequence from "run-sequence";
import mocha from "gulp-spawn-mocha";
import gutil from "gulp-util";
import eslint from "gulp-eslint";
import shell from "gulp-shell";
import del from "del";
import babel from "gulp-babel";
import jeditor from "gulp-json-editor";

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

const serverSrc = [
  "server/**/*",
  "config/**/*",
  "app.js",
  "server.js",
  "cloud.js"
];

const testSrc = [
  "test/**"
];

gulp.task("default", () => {

});

gulp.task("test:int", () => {

  process.env.NODE_ENV = "test";

  return gulp
    .src(["test/integration/**/*.js"], { read: false })
    .pipe(mocha({
      compilers: "js:babel-core/register",
      reporter: "nyan",
      timeout: 5000,
      ignoreLeaks: false,
      recursive: true,
      harmony: true
    }))
    .on("error", gutil.log);
});

gulp.task("test:sys", () => {

  process.env.NODE_ENV = "test";

  return gulp
    .src(["test/system/**/*.js"], { read: false })
    .pipe(mocha({
      compilers: "js:babel-core/register",
      reporter: "nyan",
      timeout: 15000,
      ignoreLeaks: false,
      recursive: true,
      harmony: true
    }))
    .on("error", gutil.log);
});

gulp.task("test", callback => {
  runSequence(
    "lint",
    "test:int",
    "test:sys",
    callback
  );
});

gulp.task("test:w", ["test:int", "test:sys"], () => {
  gulp.watch(
    serverSrc.concat(testSrc),
    ["test:int", "test:sys"]
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
    // has to load a dummy file, otherwise the stream won't run
    .src(["README.md"], { read: false })
    .pipe(shell(["./node_modules/.bin/jsdoc -t ./node_modules/ink-docstrap/template -c jsdoc.conf.json"])); // eslint-disable-line max-len
});

gulp.task("jsdoc:w", ["jsdoc"], () => {
  gulp.watch(serverSrc, ["jsdoc"]);
});

gulp.task("dist:compile:package", () => {
  return gulp
    .src(["package.json"])
    .pipe(jeditor((json) => {
      delete json.devDependencies; // eslint-disable-line prefer-reflect

      // only keep `start` script
      for (const prop in json.scripts) {
        if (prop !== "start") {
          delete json.scripts[ prop ];  // eslint-disable-line prefer-reflect
        }
      }
      return json; // must return JSON object.
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task("dist:compile:code", () => {
  return gulp
    .src(serverSrc, { base: "./" })
    .pipe(babel({
      presets: ["es2015"]
    }))
    .pipe(gulp.dest("dist"));
});

gulp.task("dist:compile", callback => {
  runSequence(
    "clean:dist",
    "dist:compile:code",
    "dist:compile:package",
    callback
  );
});

gulp.task("dist:compile:w", ["dist:compile"], () => {
  gulp.watch(serverSrc, ["dist:compile"]);
});

gulp.task("clean:dist", () => {
  return del([
    "dist/**/*",
    "!dist/.avoscloud"
  ]);
});

gulp.task("clean:jsdoc", () => {

  return del([
    jsdocConf.opts.destination
  ]);
});


gulp.task("watch", ["test:w", "lint:w", "jsdoc:w", "dist:compile:w"]);

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
  gutil.log("Run only integration tests");
  gutil.log("$ gulp test:int");
  gutil.log("");
  gutil.log("Run only system tests");
  gutil.log("$ gulp test:sys");
  gutil.log("");
  gutil.log("Watch tests");
  gutil.log("$ gulp test:w");
  gutil.log("");
  gutil.log("Watch lint and tests");
  gutil.log("$ gulp watch");
  gutil.log("");
  gutil.log("Generate jsdoc");
  gutil.log("$ gulp jsdoc");
  gutil.log("");
  gutil.log("Compile server");
  gutil.log("$ gulp dist:compile");
  gutil.log("");
  gutil.log(`--- ${pkg.name} Version: ${pkg.version} ---`);
  gutil.log("");
});
