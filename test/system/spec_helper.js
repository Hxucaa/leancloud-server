/**
 * Created by hxucaa on 2015-12-09.
 */

"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import AV from "avoscloud-sdk";
import secret from "~/config/secret";

import * as Fixture from "../fixture/index";

chai.should();
chai.use(chaiAsPromised);
chai.use(require("chai-datetime")); // eslint-disable-line import/no-require

global.expect = chai.expect;
global.assert = chai.assert;
global.Fixture = Fixture;

// Initialize Leancloud SDK
AV.initialize(secret.test.APP_ID, secret.test.APP_KEY, secret.test.MASTER_KEY);
// 如果不希望使用 masterKey 权限，可以将下面一行删除
//AV.Cloud.useMasterKey();

global.AV = AV;

before(done => {
  console.log("---------------------------------------------------------------------------------");
  console.log("                    System      Test      Starting                               ");
  console.log("---------------------------------------------------------------------------------");
  console.log("");
  done();
});
