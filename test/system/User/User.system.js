/**
 * Created by hxucaa on 2015-11-19.
 */

"use strict";

//import _ from "lodash";
//const CM = require("cloudmodel");
//const User = CM.User;

import UserFixture from "../../fixture/User.fixture";
import { calculateAgeGroup, calculateHoroscope } from "../helper/utility";

describe("User", () => {

  describe("sign up", () => {

    let user;

    beforeEach(done => {
      user = new UserFixture();
      done();
    });

    it("should be able to register user in the database", done => {

      return AV.User.signUp(user.username, user.password, {
        "nickname": user.nickname,
        "type": user.type,
        "gender": user.gender,
        "birthday": user.birthday,
        "coverPhoto": new AV.File("avatar.png", user.coverPhoto)
      })
        .then(res => {
          res.get("username").should.be.equal(user.username);
          res.get("type").should.be.equal(user.type);
          res.get("gender").should.be.equal(user.gender);
          res.get("birthday").should.equalDate(user.birthday);
          res.get("coverPhoto").should.not.be.null;
          res.get("horoscope").should.equal(calculateHoroscope(user.birthday));
          res.get("ageGroup").should.equal(calculateAgeGroup(user.birthday));
          done();
        }, err => {
          done(err);
        });
    });

    describe("with invalid inputs", () => {

      it("should not be able to register user in the database", done => {
        return AV.User.signUp(user.username, user.password, {
          "nickname": user.nickname,
          "type": user.type,
          "gender": user.gender,
          "birthday": user.birthday
        })
          .then(null, err => {
            err.should.eql({ code: 113, message: "coverPhoto is required." });
            done();
          });
      });

    });
  });
});
