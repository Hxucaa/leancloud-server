/**
 * Created by hxucaa on 15-09-19.
 */

"use strict";

import Validator from "validator";

//const CM = require("cloudmodel");
//const Business = CM.Business;

/* eslint-disable complexity, max-statements */

export const beforeSave = function(request, response) {

  /**
   *  Parameters
   */
  const business = request.object;

  const userId = business.get("userId");
  const companyId = business.get("companyId");
  const name = business.get("name");
  const phone = business.get("phone");
  const email = business.get("email");
  const websiteUrl = business.get("websiteUrl");
  const addressId = business.get("addressId");
  //const coverImage = business.get("coverImage");
  const description = business.get("description");

  /**
   * Validation
   */

  if (!userId) {
    response.error("User ID cannot be blank.");
  }

  if (!companyId) {
    response.error("Company ID cannot be blank.");
  }

  if (!name) {
    response.error("Name cannot be blank.");
  }
  // TODO: 20 characters is kind of short for a name
  if (name > 20) {
    response.error("Name must be 20 characters or fewer.");
  }

  if (phone.length > 20) {
    response.error("Phone number must be 20 characters or fewer.");
  }
  // TODO: phone number validation

  if (email.length > 100) {
    response.error("Email must be 100 characters or fewer.");
  }
  if (!Validator.isEmail(email)) {
    response.error("Invalid email.");
  }

  if (websiteUrl.length > 200) {
    response.error("Website URL must be 200 characters or fewer.");
  }

  const isValidURL = Validator.isUrl(websiteUrl, { protocols: ["http", "https"] });

  if (!isValidURL) {
    response.error("Invalid website URL.");
  }

  if (!addressId) {
    response.error("Address ID cannot be blank.");
  }
  if (addressId.length > 20) {
    response.error("Address ID must be 20 characters or fewer.");
  }

  // TODO: coverImage validation

  if (description.length > 500) {
    response.error("Description must be 500 characters or fewer.");
  }

  response.success();
};
