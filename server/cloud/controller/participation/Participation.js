/**
 * Created by hxucaa on 15-09-19.
 */

"use strict";

const _ = require("lodash");
const AV = require("leanengine");
//const Validator = require("validator");

const CM = require("cloudmodel");
//const User = CM.User;
const Business = CM.Business;
//const Participation = CM.Participation;
//const BusinessStatistics = CM.BusinessStatistics;
//const UserStatistics = CM.UserStatistics;

const beforeSave = function(request, response) {
  var participation = request.object;
  var participationType = participation.get("participationType");

  // Participation Type Validation
  if (participationType < 0) {
    response.error("Participation type invalid");
  }
  else if (participationType > 2) {
    response.error("Participation type invalid");
  }

  response.success();
};

const afterSave = function(request) {
  var participation = request.object;
  var participationType = participation.get("participationType");
  var business = participation.get("business");

  if (!request.object.existed()) {
    var query = new AV.Query(Business);
    query.get(business.id)
      .then(queriedBusiness => {
        if (participationType === 0) {
          queriedBusiness.increment("toGoCount");
        }
        else if (participationType === 1) {
          queriedBusiness.increment("treatCount");
        }
        else if (participationType === 2) {
          queriedBusiness.increment("aaCount");
        }
        queriedBusiness.save();
      });
  }
};

module.exports = {
  beforeSave: beforeSave,
  afterSave: afterSave
};
