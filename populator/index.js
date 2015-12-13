#!/usr/bin/env node

"use strict";

/* eslint-disable import/no-require */

const AV = require("avoscloud-sdk");
const argv = require("yargs")
  .usage("Usage: $0 <command> [options]")
  .command("populate", "Populate the database")
  .demand(1)
  .example(
    "$0 populate -i <<APP_ID>> -k <<APP_KEY>> -m <<MASTER_KEY>>",
    "Populate database with provided ID and Key"
  )

  .demand("i")
  .alias("i", "id")
  .nargs("i", 1)
  .describe("i", "App ID")

  .demand("k")
  .alias("k", "key")
  .nargs("k", 1)
  .describe("k", "App Key")

  .demand("m")
  .alias("m", "master")
  .nargs("m", 1)
  .describe("m", "Master Key")

  .help("h")
  .alias("h", "help")
  
  .epilog("copyright 2015")
  .argv;

// babel 编译
require("babel-core/register");
require("babel-polyfill");
// All modules after this line will be transpiled, but not this file.
// 在这句后面引入的模块，都将会自动通过 babel 编译，但当前文件不会被 babel 编译。

const population = require("./population");

const APP_ID = argv.id;
const APP_KEY = argv.key;
const MASTER_KEY = argv.master;

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
//AV.useAVCloudUS();
// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

population.populate();
