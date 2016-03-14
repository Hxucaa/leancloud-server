"use strict";

import AV from "leanengine";
import { model } from "leancloud-utility";

import { extractHookError } from "../controller/utility/processValidation";

const { Business, Event, EventStatus } = model(AV);

export default async function openEvent(request, response) {
  const businessId = request.params.businessId;
  const currentUser = request.user;
  const event_type = 3;

  try {
    if (!currentUser) {
      throw new Error("You must log in before using this endpoint.");
    }

    if (!businessId) {
      throw new Error("no business ID parameter passed to function");
    }
    const event = new Event();
    const business = new Business();
    business.id = businessId;
    event.initiator = currentUser;
    event.business = business;
    event.event_type = event_type;
    event.status = EventStatus.Open;

    const result = await event.save();

    response.success(result);
  }
  catch (err) {
    console.log(err);
    const newError = extractHookError(err);
    if (newError) {
      response.error(newError);
    }
    else {
      response.error(err);
    }
  }
}
