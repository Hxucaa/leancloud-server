/**
 * Created by Lance on 2016-03-11.
 */

//import * as _ from "lodash";
import { validation } from "leancloud-utility";

import { fieldRule } from "../utility/processValidation";

const { RelationshipValidation } = validation;

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
    await fieldRule(status, RelationshipValidation.verifyStatus);

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
    await fieldRule(status, RelationshipValidation.verifyStatus);

    /**
     * Operation
     */

    response.success();
  }
  catch (err) {
    response.error(err);
  }
};
