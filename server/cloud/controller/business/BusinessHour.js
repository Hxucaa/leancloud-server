"use strict";

//import _ from "lodash";
//import Validator from "validator";

/* eslint-disable complexity, max-statements */

export const beforeSave = function(request, response) {

  const businessHour = request.object;

  const businessId = businessHour.get("businessId");
  const day = businessHour.get("day");
  const timeFrom = businessHour.get("timeFrom");
  const timeEnd = businessHour.get("timeEnd");

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

  if (!timeEnd) {
    response.error("End time cannot be blank.");
  }

  // timeEnd must be later than timeFrom
  // TODO: check 24hr type, assuming it"s a standard JS Date object
  if (timeFrom.getTime() <= timeEnd.getTime()) {
    response.error("End time must be later than start time.");
  }


  response.success();
};
