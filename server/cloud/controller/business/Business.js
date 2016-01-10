/**
 * Created by hxucaa on 15-09-19.
 */

"use strict";

import { validateRequest, fieldRule } from "../utility/processValidation";
import { validation } from "leancloud-utility";

const { BusinessValidation } = validation;

/* eslint-disable complexity, max-statements */

export const beforeSave = function(request, response) {

  // Parameters
  const business = request.object;
  const email = business.get("email");
  const name = business.get("name");
  const websiteUrl = business.get("websiteUrl");
  const description = business.get("description");

  // Validation
  validateRequest(error => response.error(error),
     fieldRule(email, BusinessValidation.verifyEmail),
     fieldRule(name, BusinessValidation.verifyName),
     fieldRule(websiteUrl, BusinessValidation.verifyUrl),
     fieldRule(description, BusinessValidation.verifyDescription)
  );

  response.success();
};

export const beforeUpdate = function(request, response) {

  // Parameters
  const business = request.object;
  const email = business.get("email");
  const name = business.get("name");
  const websiteUrl = business.get("websiteUrl");
  const description = business.get("description");

  // Validation
  validateRequest(error => response.error(error),
     fieldRule(email, BusinessValidation.verifyEmail),
     fieldRule(name, BusinessValidation.verifyName),
     fieldRule(websiteUrl, BusinessValidation.verifyUrl),
     fieldRule(description, BusinessValidation.verifyDescription)
  );

  response.success();
};
