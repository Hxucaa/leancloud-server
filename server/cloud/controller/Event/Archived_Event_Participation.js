/**
 * Created by Lance on 2016-03-11.
 */

//import * as _ from "lodash";
import { fieldRule } from "../utility/processValidation";
import { validation } from "leancloud-utility";

const { ArchivedEventParticipationValidation } = validation;

export const beforeSave = async function(request, response) {

  /**
   * Parameters
   */
  const user = request.object;
  const status = user.get("status");

  try {

    /**
     * Validation
     */
    await fieldRule(status, ArchivedEventParticipationValidation.verifyStatus);

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

  try {

    /**
     * Validation
     */
    await fieldRule(status, ArchivedEventParticipationValidation.verifyStatus);

    /**
     * Operation
     */

    response.success();
  }
  catch (err) {
    response.error(err);
  }
};
