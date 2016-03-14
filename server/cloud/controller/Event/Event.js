/**
 * Created by Lance on 2016-03-11.
 */

//import * as _ from "lodash";

import AV from "leanengine";
import { validation, model } from "leancloud-utility";

import { fieldRule } from "../utility/processValidation";

const { EventValidation } = validation;
const { Business } = model(AV);

export const beforeSave = async function(request, response) {

  /**
   * Parameters
   */
  const object = request.object;
  const status = object.get("status");
  const event_type = object.get("event_type");
  const business = object.get("business");
  //const initiator = object.get("initiator");


  try {

    /**
     * Validation
     */
    await fieldRule(status, EventValidation.verifyStatus);
    await fieldRule(event_type, EventValidation.verifyEventType);

    /**
     * Operation
     */

    const businessQuery = new AV.Query(Business);
    businessQuery.equalTo("objectId", business.getObjectId());

    const foundBusiness = await businessQuery.first();
    if (!foundBusiness) {
      response.error(JSON.stringify({
        code: 101,
        message: "Business does not exist."
      }));
    }
    else {
      response.success();
    }
  }
  catch (err) {
    response.error(err);
  }
};

export const beforeUpdate = async function(request, response) {

  /**
   * Parameters
   */
  const object = request.object;
  const status = object.get("status");
  const event_type = object.get("event_type");

  try {

    /**
     * Validation
     */
    await fieldRule(status, EventValidation.verifyStatus);
    await fieldRule(event_type, EventValidation.verifyEventType);

    /**
     * Operation
     */

    response.success();
  }
  catch (err) {
    response.error(err);
  }
};
