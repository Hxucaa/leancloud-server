/**
 * Created by hxucaa on 15-09-19.
 */

"use strict";

//import * as _ from "lodash";
import AV from "leanengine";
import { validation, model } from "leancloud-utility";

import { calculateHoroscope, calculateAgeGroup } from "./utility";
import { fieldRule } from "../utility/processValidation";

const { UserValidation } = validation;
const { UserType } = model(AV);

export const beforeSave = async function(request, response) {

  /**
   * Parameters
   */
  const user = request.object;
  const username = user.get("username");
  const status = user.get("status");
  const gender = user.get("gender");
  const birthday = user.get("birthday");
  const type = user.get("type");
  const nickname = user.get("nickname");


  try {
    /**
     * Validation
     */
    await fieldRule(username, UserValidation.verifyUsername);
    await fieldRule(type, UserValidation.verifyType);
    await fieldRule(status, UserValidation.verifyStatus);
    await fieldRule(gender, UserValidation.verifyGender);
    await fieldRule(birthday, UserValidation.verifyBirthday);
    await fieldRule(nickname, UserValidation.verifyNickname);

    /**
     * Operation
     */
    const horoscope = calculateHoroscope(birthday);
    const ageGroup = calculateAgeGroup(birthday);

    user.set("horoscope", horoscope);
    user.set("ageGroup", ageGroup);

    response.success();
  }
  catch (err) {
    response.error(err);
  }
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
  roleQuery.first()
    .then(res => {
      res.getUsers().add(user);
      return res.save();
    })
    .then(null, err => {
      console.error(err);
    });

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

export const beforeUpdate = async function(request, response) {

  /**
   * Parameters
   */
  const user = request.object;
  const type = user.get("type");
  const status = user.get("status");
  const gender = user.get("gender");
  const birthday = user.get("birthday");
  const nickname = user.get("nickname");

  try {
    /**
     * Validation
     */
    await fieldRule(type, UserValidation.verifyType);
    await fieldRule(status, UserValidation.verifyStatus);
    await fieldRule(gender, UserValidation.verifyGender);
    await fieldRule(birthday, UserValidation.verifyBirthday);
    await fieldRule(nickname, UserValidation.verifyNickname);

    /**
     * Operation
     */
    if (birthday) {

      const horoscope = calculateHoroscope(birthday);
      const ageGroup = calculateAgeGroup(birthday);

      user.set("horoscope", horoscope);
      user.set("ageGroup", ageGroup);
    }

    response.success();
  }
  catch (err) {
    response.error(err);
  }
};

//export const beforeDelete = function(request, response) {
//  /**
//   *  Parameters
//   */
//  //const user = request.object;
//
//  /**
//   *  Operation
//   */
//  response.success();
//};
//
//export const afterDelete = function(request) {
//
//  /**
//   * Parameters
//   */
//  //const user = request.object;
//
//  /**
//   * Validation
//   */
//
//
//  /**
//   * Operation
//   */
//};
