/**
 * Created by hxucaa on 15-09-19.
 */

"use strict";

import { fieldRule } from "../utility/processValidation";
import { validation } from "leancloud-utility";

const { BusinessValidation } = validation;

/* eslint-disable complexity, max-statements */

export const beforeSave = async function(request, response) {

  /**
   * Parameters
   */
  const business = request.object;
  const email = business.get("email");
  const name = business.get("name");
  const websiteUrl = business.get("websiteUrl");
  const description = business.get("description");

  try {

    /**
     * Validation
     */
    await fieldRule(email, BusinessValidation.verifyEmail);
    await fieldRule(name, BusinessValidation.verifyName);
    await fieldRule(websiteUrl, BusinessValidation.verifyUrl);
    await fieldRule(description, BusinessValidation.verifyDescription);

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
  const business = request.object;
  const email = business.get("email");
  const name = business.get("name");
  const websiteUrl = business.get("websiteUrl");
  const description = business.get("description");

  try {

    /**
     * Validation
     */
    await fieldRule(email, BusinessValidation.verifyEmail);
    await fieldRule(name, BusinessValidation.verifyName);
    await fieldRule(websiteUrl, BusinessValidation.verifyUrl);
    await fieldRule(description, BusinessValidation.verifyDescription);

    /**
     * Operation
     */

    response.success();
  }
  catch (err) {
    response.error(err);
  }
};
