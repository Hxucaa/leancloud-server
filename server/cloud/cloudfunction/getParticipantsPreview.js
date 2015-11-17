"use strict";

const _ = require("lodash");
const AV = require("leanengine");

const CM = require("cloudmodel");
const Business = CM.Business;
const Participation = CM.Participation;

const getParticipantsPreview = function(request, response) {
  var businessID = request.params.business;
  var userArray = [];

  if (!businessID) {
    response.error("no business ID parameter passed to function");
  }

  var pQuery = new AV.Query(Participation);
  var queryBusiness = new Business();
  queryBusiness.id = businessID;
  pQuery.equalTo("business", queryBusiness);
  pQuery.include("user");
  pQuery.find()
    .then(results => {
      results.forEach(participation => {
        userArray.push(participation.get("user"));
      });
      const returnArray = prioritizeUsers(userArray);

      response.success(returnArray);
    }, err => {
      response.error(err);
    });
};

const prioritizeUsers = function(userArray) {
  var hasPicArray = userArray.filter(user => {
    return user.get("profileImg") != null;
  });

  if (hasPicArray.length > 5) {
    var fArray = hasPicArray.filter(user => {
      return !user.get("gender");
    });
    var mArray = hasPicArray.filter(user => {
      return user.get("gender");
    });

    if (fArray.length < 5) {
      for (var i = 0; i < 5 - fArray.length; i++) {
        fArray.push(mArray[i]);
      }
    }
    else {
      fArray = fArray.slice(5);
    }

    return fArray;
  }
  else {
    return hasPicArray;
  }
};

module.exports = {
  getParticipantsPreview: getParticipantsPreview
};
