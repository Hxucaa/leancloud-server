"use strict";

//import _ from "lodash";
import AV from "leanengine";
import { model } from "leancloud-utility";

const { Business, Participation } = model;

const prioritizeUsers = function(userArray) {
  const hasPicArray = userArray.filter(user => {
    return user.get("profileImg") !== null;
  });

  if (hasPicArray.length > 5) {
    let fArray = hasPicArray.filter(user => {
      return !user.get("gender");
    });
    const mArray = hasPicArray.filter(user => {
      return user.get("gender");
    });

    if (fArray.length < 5) {
      for (let i = 0; i < 5 - fArray.length; i++) {
        fArray.push(mArray[ i ]);
      }
    }
    else {
      fArray = fArray.slice(5);
    }

    return fArray;
  }
};

export default function getParticipantsPreview(request, response) {
  const businessID = request.params.business;
  const userArray = [];

  if (!businessID) {
    response.error("no business ID parameter passed to function");
  }

  const pQuery = new AV.Query(Participation);
  const queryBusiness = new Business();

  queryBusiness.id = businessID;
  pQuery.equalTo("business", queryBusiness);
  pQuery.include("user");
  pQuery.find()
    .then(results => {
      results.forEach(participation => {
        userArray.push(participation.get("user"));
      });
      const returnArray = prioritizeUsers(userArray);

      response.success(returnArray);
    }, err => {
      response.error(err);
    });
}
