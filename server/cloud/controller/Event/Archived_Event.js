/**
 * Created by Lance on 2016-03-11.
 */

//import * as _ from "lodash";
import { fieldRule } from "../utility/processValidation";
import { validation } from "leancloud-utility";

const { ArchivedEventValidation } = validation;

export const beforeSave = async function(request, response) {

  /**
   * Parameters
   */
  const user = request.object;
  const status = user.get("status");
  const event_type = user.get("event_type");

  try {

    /**
     * Validation
     */
    await fieldRule(status, ArchivedEventValidation.verifyStatus);
    await fieldRule(event_type, ArchivedEventValidation.verifyEventType);

    /**
     * Operation
     */

    response.success();
  }
  catch (err) {
    response.error(err);
  }
};

export const beforeUpdate = async function(request, response) {

  /**
   * Parameters
   */
  const user = request.object;
  const status = user.get("status");
  const event_type = user.get("event_type");

  try {

    /**
     * Validation
     */
    await fieldRule(status, ArchivedEventValidation.verifyStatus);
    await fieldRule(event_type, ArchivedEventValidation.verifyEventType);

    /**
     * Operation
     */

    response.success();
  }
  catch (err) {
    response.error(err);
  }
};
