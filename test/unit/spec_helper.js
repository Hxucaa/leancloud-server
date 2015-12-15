/**
 * Created by hxucaa on 15-04-25.
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

//var busFix = new BusinessFixture();
//var userFix = new UserFixture();
//global.Fixture = {
//    "business1": function () {
//        return busFix.business1
//    },
//    "business2": function () {
//        return busFix.business2
//    },
//    "business3": function () {
//        return busFix.business3
//    },
//    "business4": function () {
//        return busFix.business4
//    },
//    "user1": function () {
//        return userFix.user1
//    },
//    "user2": function () {
//        return userFix.user2
//    },
//    "user3": function () {
//        return userFix.user3
//    },
//    "user4": function () {
//        return userFix.user4
//    }
//};


//global.populateOneBusinessToDB = function() {
//  var businessFixture = new BusinessFixture();
//  return businessFixture.saveOneBusinessToDB();
//};
//
//global.clearClass = function(avClass) {
//  var query = new AV.Query(avClass);
//  return query.find().then(results => {
//
//    var promises = [];
//    _.each(results, result => {
//      promises.push(result.destroy());
//    });
//    return AV.Promise.when(promises);
//  });
//};
//
//const clearDatabase = function() {
//  var clearTasks = [
//    clearClass(Business),
//    clearClass(BusinessStat),
//    clearClass(User),
//    clearClass(Profile),
//    clearClass(UserStat),
//    clearClass(Role),
//    clearClass(User_Business_Participation)
//  ];
//
//  return AV.Promise.when(clearTasks);
//};
//
///**
// * Populating database with fixture before testing starts.
// */
//before(() => {
//  AV.Promise.setPromisesAPlusCompliant(true);
//  ParseClient.initialize(true);
//  AV._useMasterKey = true;
//
//  var businessFixture = new BusinessFixture();
//  var userFixture = new UserFixture();
//  var roleFixture = new RoleFixture();
//  //return roleFixture.saveAllRolesToDB().then(function() {
//  //    return roleFixture.saveAllRoleHierarchiesToDB().then(function() {
//  //return userFixture.saveAllToDB();
//  //    });
//  //});
//});
//
///**
// * Purge database after testing completes.
// */
//after(done => {
//  AV._useMasterKey = true;
//  clearDatabase()
//    .then(res => {
//      done();
//    }, err => {
//      //console.log(JSON.stringify(err));
//      done();
//    });
//});

before(done => {
  console.log("---------------------------------------------------------------------------------");
  console.log("                   Unit      Test      Starting                                  ");
  console.log("---------------------------------------------------------------------------------");
  console.log("");
  done();
});
