/**
 * Created by hxucaa on 15-09-19.
 */

"use strict";

const Validator = require("validator");
const Utility = require("../../utility/utility.js");

//const CM = require("cloudmodel");
//const Business = CM.Business;


const beforeSave = function(request, response) {

  /**
   *  Parameters
   */
  var business = request.object;

  var userId = business.get("userId");
  var companyId = business.get("companyId");
  var name = business.get("name");
  var phone = business.get("phone");
  var email = business.get("email");
  var websiteUrl = business.get("websiteUrl");
  var addressId = business.get("addressId");
  //var coverImage = business.get("coverImage");
  var description = business.get("description");

  /**
   * Validation
   */

  if (!userId) {
    response.error("User ID cannot be blank.");
  }

  if (!companyId) {
    response.error("Company ID cannot be blank.");
  }

  if (Utility.isEmptyString(name) || !name) {
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
