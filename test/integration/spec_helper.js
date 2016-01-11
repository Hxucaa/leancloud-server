/**
 * Created by hxucaa on 2015-11-19.
 */

"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import AV from "leanengine";
import supertest from "supertest";
import defaults from "superagent-defaults";
import app from "~/app";
import * as Fixture from "./fixture/index";



chai.should();
chai.use(chaiAsPromised);

global.expect = chai.expect;
global.assert = chai.assert;
global.Fixture = Fixture;

const APP_ID = process.env.APP_ID ? process.env.APP_ID : require("../../config/secret").test.APP_ID;  // eslint-disable-line
const APP_KEY = process.env.APP_KEY ? process.env.APP_KEY : require("../../config/secret").test.APP_KEY;  // eslint-disable-line
const MASTER_KEY = process.env.MASTER_KEY ? process.env.MASTER_KEY : require("../../config/secret").test.MASTER_KEY;  // eslint-disable-line

// Initialize Leancloud SDK
AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

if (process.env.NODE_ENV === "test") {
  // 在测试环境
  AV.setProduction(false);
}
// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();


// 端口一定要从环境变量 `LC_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
const PORT = parseInt(process.env.LC_APP_PORT || 4000, 10);

app.listen(PORT, () => console.log("Node test app is running at port: ", PORT));


// Initialize superttest
const request = defaults(supertest(app));

request
  .set("X-AVOSCloud-Application-Id", APP_ID)
  .set("X-AVOSCloud-Application-Key", APP_KEY)
  // .set("X-AVOSCloud-Master-Key", MASTER_KEY)
  .set("Content-Type", "application/json");

global.request = request;

before(done => {
  console.log("---------------------------------------------------------------------------------");
  console.log("                    Integration      Test      Starting                          ");
  console.log("---------------------------------------------------------------------------------");
  console.log("");
  done();
});
