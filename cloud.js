
"use strict";

import AV from "leanengine";

import Controller from "./server/cloud/controller/index";
import CloudFunction from "./server/cloud/cloudfunction/index";

/** this function is called when the user sign up
 */
AV.Cloud.beforeSave("_User", Controller.User.beforeSave);
AV.Cloud.afterSave("_User", Controller.User.afterSave);
AV.Cloud.beforeUpdate("_User", Controller.User.beforeUpdate);
//AV.Cloud.beforeDelete("_User", Controller.User.beforeDelete);
//AV.Cloud.afterDelete("_User", Controller.User.afterDelete);

AV.Cloud.beforeSave("Relationship", Controller.Relationship.beforeSave);
AV.Cloud.beforeUpdate("Relationship", Controller.Relationship.beforeUpdate);

////////////////////////////////
// Business
////////////////////////////////

AV.Cloud.beforeSave("Business", Controller.Business.beforeSave);
AV.Cloud.beforeUpdate("Business", Controller.Business.beforeUpdate);
//AV.Cloud.beforeDelete("Business", Controller.Business.beforeDelete)
//AV.Cloud.afterDelete("Business", Controller.Business.afterDelete)

////////////////////////////////
// Address
////////////////////////////////

AV.Cloud.beforeSave("Address", Controller.Address.beforeSave);
AV.Cloud.beforeUpdate("Address", Controller.Address.beforeUpdate);

////////////////////////////////
// Event
////////////////////////////////

AV.Cloud.beforeSave("Event", Controller.Event.beforeSave);
AV.Cloud.beforeUpdate("Event", Controller.Event.beforeUpdate);

AV.Cloud.beforeSave("Event_Participation", Controller.Event_Participation.beforeSave);
AV.Cloud.beforeUpdate("Event_Participation", Controller.Event_Participation.beforeUpdate);

AV.Cloud.beforeSave("Archived_Event", Controller.Archived_Event.beforeSave);
AV.Cloud.beforeUpdate("Archived_Event", Controller.Archived_Event.beforeUpdate);

AV.Cloud.beforeSave(
  "Archived_Event_Participation",
  Controller.Archived_Event_Participation.beforeSave
);
AV.Cloud.beforeUpdate(
  "Archived_Event_Participation",
  Controller.Archived_Event_Participation.beforeUpdate
);

////////////////////////////////
// Cloud Functions
////////////////////////////////
AV.Cloud.define("getParticipantsPreview", CloudFunction.getParticipantsPreview);
AV.Cloud.define("checkUsernameAvailability", CloudFunction.checkUsernameAvailability);
AV.Cloud.define("openEvent", CloudFunction.openEvent);

module.exports = AV.Cloud;
