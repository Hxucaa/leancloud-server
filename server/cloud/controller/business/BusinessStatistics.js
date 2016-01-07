"use strict";

//import _ from "lodash";
//import Validator from "validator";


export const beforeSave = function(request, response) {

  const businessStatistics = request.object;

  const businessId = businessStatistics.get("businessId");
  const participationType = businessStatistics.get("participationType");
  const count = businessStatistics.get("count");


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

export const afterSave = function(request) {
  /**
   *  Parameters
   */
  const businessStatistics = request.object;

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
