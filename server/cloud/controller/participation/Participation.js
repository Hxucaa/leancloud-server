/**
 * Created by hxucaa on 15-09-19.
 */

"use strict";

//import _ from "lodash";
//import Validator from "validator";
import AV from "leanengine";
import { model } from "leancloud-utility";

const { Business } = model;

export const beforeSave = function(request, response) {
  const participation = request.object;
  const participationType = participation.get("participationType");

  // Participation Type Validation
  if (participationType < 0) {
    response.error("Participation type invalid");
  }
  else if (participationType > 2) {
    response.error("Participation type invalid");
  }

  response.success();
};

export const afterSave = function(request) {
  const participation = request.object;
  const participationType = participation.get("participationType");
  const business = participation.get("business");

  if (!request.object.existed()) {
    const query = new AV.Query(Business);

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
