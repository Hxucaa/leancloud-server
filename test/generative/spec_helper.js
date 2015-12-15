/**
 * Created by hxucaa on 2015-11-19.
 */

"use strict";

import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(chaiAsPromised);
import ValidationMatchers from "../helper/ValidationMatchers";
ValidationMatchers(chai); // eslint-disable-line new-cap


//const AV = require("leanengine")
global.expect = chai.expect;
global.assert = chai.assert;

//var RoleFixture = require("../Fixture/RoleFixture");
//var UserFixture = require("../Fixture/UserFixture");
//var BusinessFixture = require("../Fixture/BusinessFixture");

//const CM = require("cloudmodel")
//const User = CM.User
//const Role = CM.Role
//const Business = CM.Business
//const Participation = CM.Participation
//const BusinessStatistics = CM.BusinessStatistics
//const UserProfile = CM.UserProfile
//const UserStatistics = CM.UserStatistics
import * as Fixture from "../fixture";
global.Fixture = Fixture;

before(done => {
  console.log("---------------------------------------------------------------------------------");
  console.log("                   Generative      Test      Starting                            ");
  console.log("---------------------------------------------------------------------------------");
  console.log("");
  done();
});
