"use strict";

//import _ from "lodash";
import AV from "leanengine";
import { model } from "leancloud-utility";

const { User } = model(AV);

export default function checkUsernameAvailability(request, response) {
  const username = request.params.username;

  if (!username) {
    response.error("no username parameter passed to function");
  }

  const uQuery = new AV.Query(User);

  uQuery.equalTo("username", username);
  uQuery.first()
    .then(res => {
      response.success(!res);
    }, err => {
      response.error(err);
    });
}
