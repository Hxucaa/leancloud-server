/**
 * Created by hxucaa on 2015-11-19.
 */

"use strict";

//import _ from "lodash";

describe("User", () => {

  describe("beforeSave", () => {

    let userFixture;

    beforeEach((done) => {
      userFixture = new Fixture.UserFixture();
      done();
    });

    it("should pass", done => {
      request
        .post("/1.1/functions/_User/beforeSave")
        .send({
          "object": {
            username: userFixture.username,
            password: userFixture.password,
            nickname: userFixture.nickname,
            type: userFixture.type,
            gender: userFixture.gender,
            birthday: userFixture.birthday,
            coverPhoto: userFixture.coverPhoto
          }
        })
        .expect(200, {
          username: userFixture.username,
          password: userFixture.password,
          nickname: userFixture.nickname,
          type: userFixture.type,
          gender: userFixture.gender,
          birthday: userFixture.getTrimmedBirthday(),
          ageGroup: userFixture.getAgeGroup(),
          horoscope: userFixture.getHoroscope(),
          coverPhoto: userFixture.coverPhoto
        }, done);
    });


  });
});
