"use strict";

//import _ from "lodash";
import AV from "leanengine";
import { model } from "leancloud-utility";

const { User } = model;

export default async function checkUsernameAvailability(request, response) {
  const username = request.params.username;

  if (!username) {
    response.error("no username parameter passed to function");
  }

  const uQuery = new AV.Query(User);

  uQuery.equalTo("username", username);
  try {
    const result = await uQuery.first();

    response.success(!Boolean(result));
  }
  catch (err) {
    response.error(err);
  }
};
