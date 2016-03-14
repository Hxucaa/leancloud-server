/**
 * Created by hxucaa on 2015-11-16.
 */

"use strict";

/* eslint-disable import/no-require */
const AV = require("leanengine");

const APP_ID = process.env.LC_APP_ID;
const APP_KEY = process.env.LC_APP_KEY;
const MASTER_KEY = process.env.LC_APP_MASTER_KEY;

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
// 如果不希望使用 masterKey 权限，可以将下面一行删除
//AV.Cloud.useMasterKey();

const app = require("./app");

// 端口一定要从环境变量 `LC_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
const PORT = parseInt(process.env.LC_APP_PORT || 3000, 10);

app.listen(PORT, () => console.log("Node app is running, port: ", PORT));
