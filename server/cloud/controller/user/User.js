/**
 * Created by hxucaa on 15-09-19.
 */

"use strict";

//import * as _ from "lodash";
import AV from "leanengine";
import * as Rules from "./rules";
import { calculateHoroscope, calculateAgeGroup } from "./utility";

const CM = require("cloudmodel")(AV); // eslint-disable-line import/no-require
//const User = CM.User;
const UserType = CM.UserType;

function processValidation(response, validation) {
  validation.forEach( v => {
    if (v.isFailure) {
      response.error(v.value);
    }
  });
}

export const beforeSave = function(request, response) {
  /**
   * Parameters
   */
  const user = request.object;
  const username = user.get("username");
  //const status = user.get("status");
  const gender = user.get("gender");
  const birthday = user.get("birthday");
  const type = user.get("type");

  /**
   * Validation
   */
  processValidation(response,
    [
      Rules.verifyUsername(username),
      Rules.verifyType(type),
      //Rules.verifyStatus(status),
      Rules.verifyGender(gender),
      Rules.verifyBirthday(birthday)
    ]
  );

  /**
   * Operation
   */

  const horoscope = calculateHoroscope(birthday);
  const ageGroup = calculateAgeGroup(birthday);

  user.set("horoscope", horoscope);
  user.set("ageGroup", ageGroup);

  response.success();


  //const roleQuery = new AV.Query(AV.Role)
  //roleQuery.equalTo("name", "User")
  //query.find()
  //  .then(result => {
  //    if (result.length === 1) {
  //
  //    }
  //    else if (result.length === 0) {
  //      const roleACL = new AV.ACL()
  //      roleACL.setPublicReadAccess(true)
  //      roleACL.setPublicWriteAccess(false)
  //      const userRole = new AV.Role("User", roleACL)
  //
  //
  //    }
  //  }, err => {
  //    response.error(err)
  //  })


};

export const afterSave = function(request) {
  /**
   *  Parameters
   */
  const user = request.object;
  const type = user.get("type");

  /**
   * Validation
   */

  /**
   * Operation
   */

  (async () => {
    try {
      /**
       * Assign either User or Merchant role to the user.
       */
      const roleQuery = new AV.Query(AV.Role);

      if (type === UserType.User) {
        roleQuery.equalTo("name", "User");
      }
      else {
        roleQuery.equalTo("name", "Merchant");
      }
      const roleQueryResult = await roleQuery.first();

      roleQueryResult.getUsers().add(user);
      await roleQueryResult.save();
    }
    catch (err) {
      console.error(err);
    }
  })();
  //(async () => {
  //  try {
  //    // create UserStatistics
  //    const stat = new UserStatistics();
  //
  //    // save UserStatistics to database
  //    const statResult = await stat.save(null);
  //
  //    // link the saved stat to user and save it
  //    user.set("stat", statResult);
  //    const userResult = await user.save(null);
  //
  //    // create UserProfile
  //    const profile = new UserProfile();
  //
  //    // https://leancloud.cn/docs/js_guide.html#一对一关系和一对多关系
  //    /* 如果是现有对象想要关联到新对象，你同样可以通过只用它们的 objectId 来连接彼此。
  //    请注意，不能直接将现有对象设置进去，而是必须 new 一个新对象并只设置 objectId 属性
  //     */
  //    const newUser = new User();
  //
  //    newUser.id = userResult.id;
  //    profile.set("user", newUser);
  //
  //    await profile.save(null);
  //  }
  //  catch (err) {
  //    console.error(err);
  //  }
  //})();
};

export const beforeUpdate = function(request, response) {

  /**
   * Parameters
   */
  const user = request.object;
  //const status = user.get("status");
  const gender = user.get("gender");
  const birthday = user.get("birthday");
  const type = user.get("type");

  /**
   * Validation
   */
  processValidation(response,
    [
      Rules.verifyType(type),
      //Rules.verifyStatus(status),
      Rules.verifyGender(gender),
      Rules.verifyBirthday(birthday)
    ]
  );

  if (birthday) {

    const horoscope = calculateHoroscope(birthday);
    const ageGroup = calculateAgeGroup(birthday);

    user.set("horoscope", horoscope);
    user.set("ageGroup", ageGroup);
  }


  response.success();
};

export const beforeDelete = function(request, response) {
  /**
   *  Parameters
   */
  //const user = request.object;

  /**
   *  Operation
   */
  response.success();
};

export const afterDelete = function(request) {

  /**
   * Parameters
   */
  //const user = request.object;

  /**
   * Validation
   */


  /**
   * Operation
   */
};
