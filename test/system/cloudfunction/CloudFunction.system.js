"use strict";

import { model } from "leancloud-utility";

const { User } = model;

describe("CloudFunction", () => {

  describe("checkUsernameAvailability", () => {

    let userFixture;

    beforeEach((done) => {
      userFixture = new Fixture.UserFixture();
      done();
    });

    it("should return true if username is available", done => {
      AV.Cloud.run("checkUsernameAvailability", { username: userFixture.username })
        .then(result => {
          result.should.equal(true);
          done();
        }, err => {
          done(err);
        });
    });

    it("should return false if the username is taken", done => {
      return User.signUp(userFixture.username, userFixture.password, {
        "nickname": userFixture.nickname,
        "type": userFixture.type,
        "gender": userFixture.gender,
        "birthday": userFixture.birthday,
        "coverPhoto": new AV.File("avatar.png", userFixture.coverPhoto)
      })
        .then(res => {
          return AV.Cloud.run("checkUsernameAvailability", { username: userFixture.username });
        })
        .then(result => {
          result.should.equal(false);
          done();
        }, err => {
          done(err);
        });
    });
  });
});
