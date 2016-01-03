/**
 * Created by hxucaa on 2015-11-19.
 */

"use strict";

//import _ from "lodash";

import { calculateAgeGroup, calculateHoroscope } from "../helper/utility";
// import cloudModel from "cloudmodel";
// const { User } = cloudModel(AV);

describe("User", () => {

  describe("sign up", () => {

    let userFixture;

    beforeEach((done) => {
      userFixture = new Fixture.UserFixture();
      done();
    });

    // afterEach((done) => {
    //   AV.Cloud.useMasterKey();
    //   const uQuery = new AV.Query(User);
    //
    //   uQuery.equalTo("username", userFixture.username);
    //   uQuery.first({
    //     success(user) {
    //       if (user) {
    //         user.destroy({
    //           success(object) {
    //             done();
    //           }
    //         });
    //       }
    //       else {
    //         done();
    //       }
    //     },
    //     error(err) {
    //       done(err);
    //     }
    //   });
    // });

    it("should be able to register user in the database", done => {

      return AV.User.signUp(userFixture.username, userFixture.password, {
        "nickname": userFixture.nickname,
        "type": userFixture.type,
        "gender": userFixture.gender,
        "birthday": userFixture.birthday,
        "coverPhoto": new AV.File("avatar.png", userFixture.coverPhoto)
      })
        .then(res => {
          res.get("username").should.be.equal(userFixture.username);
          res.get("type").should.be.equal(userFixture.type);
          res.get("gender").should.be.equal(userFixture.gender);
          res.get("birthday").should.equalDate(userFixture.birthday);

          // if it has id then its saved to database
          res.get("coverPhoto").id.should.not.be.null;
          res.get("horoscope").should.equal(calculateHoroscope(userFixture.birthday));
          res.get("ageGroup").should.equal(calculateAgeGroup(userFixture.birthday));
          done();
        }, err => {
          done(err);
        });
    });

    describe("with invalid inputs", () => {

      it("should not be able to register user in the database", done => {
        return AV.User.signUp(userFixture.username, userFixture.password, {
          "nickname": userFixture.nickname,
          "type": userFixture.type,
          "gender": userFixture.gender,
          "birthday": userFixture.birthday
        })
          .then(null, err => {
            err.should.eql({ code: 113, message: "coverPhoto is required." });
            done();
          });
      });

    });
  });
});
