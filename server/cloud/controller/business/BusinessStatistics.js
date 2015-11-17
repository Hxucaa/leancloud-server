"use strict";

const _ = require("lodash");
//const Validator = require("validator");

//const CM = require("cloudmodel");
//const BusinessStatistics = CM.BusinessStatistics;


const beforeSave = function(request, response) {

  var businessStatistics = request.object;

  var businessId = businessStatistics.get("businessId");
  var participationType = businessStatistics.get("participationType");
  var count = businessStatistics.get("count");


  if (!businessId) {
    response.error("Business ID cannot be blank.");
  }

  if (!participationType) {
    response.error("Participation type cannot be blank.");
  }
  // participationType is an enum, between 1 and 3
  if (participationType < 1 || participationType > 3) {
    response.error("Invalid participation type.");
  }

  // count can actually be 0 and valid, cannot just use !
  if (typeof count === "undefined") {
    response.error("Count cannot be blank.");
  }

  response.success();
};

const afterSave = function(request) {
  /**
   *  Parameters
   */
  var businessStatistics = request.object;

  /**
   * Validation
   */

  /**
   * Operation
   */

  if (businessStatistics.count < 1) {
    businessStatistics.isActive = false;
    businessStatistics.save();
  }
};

module.exports = {
  beforeSave: beforeSave,
  afterSave: afterSave
};
