/**
 * Created by hxucaa on 15-09-19.
 */

"use strict";

const _ = require("lodash");
const AV = require("leanengine");
//const Validator = require("validator");
const Utility = require("../../utility/utility.js");

const CM = require("cloudmodel");
//const User = CM.User;
//const Business = CM.Business;
//const Participation = CM.Participation;
//const BusinessStatistics = CM.BusinessStatistics;
const UserStatistics = CM.UserStatistics;
const UserProfile = CM.UserProfile;

const beforeSave = function(request, response) {
  /**
   * Parameters
   */
  var user = request.object;
  var username = user.get("username");
  var password = user.get("password");
  var birthday = user.get("birthday");
  var nickname = user.get("nickname");

  // Username Validation
  var regex = /^[a-z0-9]+$/i;
  if (!username.match(regex)) {
    response.error("Username contains invalid characters.");
  }
  else if (username.length < 3) {
    response.error("Username too short, less than 3 characters.");
  }
  else if (username.length > 30) {
    response.error("Username too long, more than 30 characters.");
  }
  else if (!username.replace(/\s/g, "").length) {
    response.error("Username is all whitespace.");
  }

  // Allow a user record to only provide username and password on sign up
  // TODO: temporary solution. Will need to implement Username lookup cloud function.
  if (user.existed()) {

    // Nickname Validation
    if (nickname.length < 1) {
      response.error("Nickname cannot be blank.");
    }
    else if (!nickname.replace(/\s/g, "").length) {
      response.error("Nickname is all whitespace.");
    }
    else if (nickname.length > 20) {
      response.error("Nickname is longer than 20 characters.");
    }

    // Birthday Validation
    var oldestDate = new Date();
    var youngestDate = new Date();
    oldestDate.setYear(oldestDate.getFullYear() - 90);
    youngestDate.setYear(youngestDate.getFullYear() - 17);
    if (birthday < oldestDate) {
      response.error("Birthday is over maximum of 90 years old.");
    }
    else if (birthday > youngestDate) {
      response.error("Birthday is under minimum of 17 years old.");
    }

    // Horoscope and ageGroup calculation
    if (request.object.has("birthday")) {
      user.set("horoscope", Utility.calculateHoroscope(birthday));
      user.set("ageGroup", Utility.calculateAgeGroup(birthday));
    }

    // Password Validation currently not supported by LeanCloud
    if (password.length < 8) {
      response.error("Password is too short, less than 8 characters");
    }
    else if (password.length > 50) {
      response.error("Password is too long, more than 50 characters");
    }
    else if (password.search(/[a-zA-Z]/) === -1) {
      response.error("No letter found in password");
    }
    else if (password.search(/\d/) === -1 && password.search(/[A-Z]/) === -1) {
      response.error("No number or capital letter in password");
    }
    else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1) {
      response.error("Invalid character in password");
    }
  }

  response.success();
};

const afterSave = function(request) {
  /**
   *  Parameters
   */
  var user = request.object;

  /**
   * Validation
   */

  /**
   * Operation
   */

  if (!user.existed()) {

    // create UserStatistics
    var stat = new UserStatistics();
    stat.aaCount = 0;
    stat.treatCount = 0;
    stat.toGoCount = 0;

    // create Profile
    var profile = new UserProfile();

    // save UserStatistics and UserProfile to database and link them to User.
    profile.save(null)
      .then(res => {
        user.set("profile", profile);
        return stat.save(null);
      })
      .then(res => {
        user.set("stat", stat);
        return user.save();
      });

  }
};

const afterUpdate = function(request) {
  /**
   *  Parameters
   */
  var user = request.object;
  var birthday = user.get("birthday");

  // Nickname Validation
  //if (!nickname.replace(/\s/g, "").length) {
//    response.error("Nickname is all whitespace");
  //}
  // else if (nickname.length < 1) {
//    response.error("Nickname is blank");
  //}
  // else if (nickname.length > 20) {
//    response.error("Nickname is longer than 20 characters");
  //}

  /**
   *  Operation
   */
  if (user.has("birthday")) {
    user.set("horoscope", Utility.calculateHoroscope(birthday));
    user.set("ageGroup", Utility.calculateAgeGroup(birthday));
  }

  user.save();
};

const beforeDelete = function(request, response) {
  /**
   *  Parameters
   */
  //var user = request.object;
  //var profile = .get("profile");
  //var stat = user.get("stat");

  /**
   *  Operation
   */
  //AV.Cloud.useMasterKey();
  //user.fetch()
//    .then(function (result) {
//        console.log(result.get("stat"));
//        return result.get("stat").destroy();
//    })
//    //.then(function () {
//    //    return user.fetch({include: "profile"});
//    //})
//    //.then(function (result) {
//    //    return result.get("profile").destroy();
//    //})
//    .then(function () {
//        response.success();
//    }, function (err) {
//        response.error(err);
//    });
  //stat.destroy()
//    .then(function () {
//        return profile.destroy();
//    })
//    .then(function () {
//        response.success();
//    });
  response.success();
};

const afterDelete = function(request) {

  /**
   * Parameters
   */
  var user = request.object;
  var profile = user.get("profile");
  var stat = user.get("stat");

  /**
   * Validation
   */


  /**
   * Operation
   */
  AV.Cloud.useMasterKey();
  stat.destroy()
    .then(() => {
      return profile.destroy();
    });
};

module.exports = {
  beforeSave: beforeSave,
  afterSave: afterSave,
  afterUpdate: afterUpdate,
  beforeDelete: beforeDelete,
  afterDelete: afterDelete
};
