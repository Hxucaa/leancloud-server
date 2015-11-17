"use strict";

const AV = require("leanengine");

const Controller = require("./server/cloud/controller");
const CloudFunction = require("./server/cloud/cloudfunction");

/** this function is called when the user sign up,
 not called when user profile updates
 */
AV.Cloud.beforeSave("_User", Controller.User.beforeSave);
AV.Cloud.afterSave("_User", Controller.User.afterSave);
AV.Cloud.afterUpdate("_User", Controller.User.afterUpdate);
AV.Cloud.beforeDelete("_User", Controller.User.beforeDelete);
AV.Cloud.afterDelete("_User", Controller.User.afterDelete);

////////////////////////////////
// Business Operations
////////////////////////////////

AV.Cloud.beforeSave("Business", Controller.Business.beforeSave);
//AV.Cloud.afterSave("Business", Controller.Business.afterSave);
//AV.Cloud.beforeDelete("Business", Controller.Business.beforeDelete);
//AV.Cloud.afterDelete("Business", Controller.User.afterDelete);

////////////////////////////////
// Participation Operations
////////////////////////////////

AV.Cloud.beforeSave("Participation", Controller.Participation.beforeSave);
AV.Cloud.afterSave("Participation", Controller.Participation.afterSave);

////////////////////////////////
// Cloud Functions
////////////////////////////////
AV.Cloud.define("getParticipantsPreview", CloudFunction.getParticipantsPreview);

module.exports = AV.Cloud;
