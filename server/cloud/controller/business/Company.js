"use strict";

const _ = require("lodash");
const Validator = require("validator");
const Utility = require("../../utility/utility.js");

//const CM = require("cloudmodel");
//const Company = CM.Company;

const beforeSave = function(request, response) {

  /**
   *  Parameters
   */
  var company = request.object;

  var companyName = company.get("companyName");
  var phone = company.get("phone");
  var email = company.get("email");
  var websiteUrl = company.get("websiteUrl");
  var addressId = company.get("addressId");
  //var coverImage = company.get("coverImage");
  var description = company.get("description");

  /**
   * Validation
   */
  if (Utility.isEmptyString(companyName) || !companyName) {
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
  var isValidURL = Validator.isUrl(websiteUrl, { protocols: ["http", "https"] });
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


module.exports = {
  beforeSave: beforeSave
};
