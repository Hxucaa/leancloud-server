"use strict";

const _ = require("lodash");
const Utility = require("../../utility/utility.js");

//const CM = require("cloudmodel");
//const BusinessHour = CM.BusinessHour;


const beforeSave = function(request, response) {

  var businessHour = request.object;

  var businessId = businessHour.get("businessId");
  var day = businessHour.get("day");
  var timeFrom = businessHour.get("timeFrom");
  var timeEnd = businessHour.get("timeEnd");

  if (!businessId) {
    response.error("Business ID cannot be blank.");
  }

  if (!day) {
    response.error("Day cannot be blank.");
  }
  // day is an enum, between 1 and 7
  if (day < 1 || day > 7) {
    response.error("Invalid day.");
  }

  if (!timeFrom) {
    response.error("Start time cannot be blank.");
  }
  if (!Utility.isValid24HrTime(timeFrom)) {
    response.error("Start time is invalid.");
  }

  if (!timeEnd) {
    response.error("End time cannot be blank.");
  }
  if (!Utility.isValid24HrTime(timeEnd)) {
    response.error("End time is invalid.");
  }

  // timeEnd must be later than timeFrom
  // TODO: check 24hr type, assuming it"s a standard JS Date object
  if (timeFrom.getTime() <= timeEnd.getTime()) {
    response.error("End time must be later than start time.");
  }


  response.success();
};

module.exports = {
  beforeSave: beforeSave
};
