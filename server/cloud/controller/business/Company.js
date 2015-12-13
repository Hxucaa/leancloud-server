"use strict";

//import _ from "lodash";
import Validator from "validator";

//const CM = require("cloudmodel");
//const Company = CM.Company;

/* eslint-disable complexity, max-statements */

export const beforeSave = function(request, response) {

  /**
   *  Parameters
   */
  const company = request.object;

  const companyName = company.get("companyName");
  const phone = company.get("phone");
  const email = company.get("email");
  const websiteUrl = company.get("websiteUrl");
  const addressId = company.get("addressId");
  //var coverImage = company.get("coverImage");
  const description = company.get("description");

  /**
   * Validation
   */
  if (!companyName) {
    response.error("Company name cannot be blank.");
  }
  if (companyName.length > 200) {
    response.error("Name must be 200 characters or fewer.");
  }

  if (phone.length > 20) {
    response.error("Phone number must be 20 characters or fewer.");
  }
  // TODO: phone number validation

  if (email.length > 100) {
    response.error("Email must be 100 characters or fewer");
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
