/**
 * Created by hxucaa on 2015-11-19.
 */

"use strict";

//import _ from "lodash";
//const CM = require("cloudmodel");
//const User = CM.User;


describe("User", () => {

  const t = new Date(1988, 3, 7);
  const n = JSON.stringify(t).slice(1, -1);

  describe("beforeSave", () => {

    console.log(n);

    it("should pass", done => {
      request
        .post("/1.1/functions/_User/beforeSave")
        .send({
          "object": {
            username: "username",
            password: "password",
            nickname: "哈喽",
            type: 1,
            gender: 1,
            birthday: t
          }
        })
        .expect(200, {
          username: "username",
          password: "password",
          nickname: "哈喽",
          type: 1,
          gender: 1,
          birthday: n,
          ageGroup: 80,
          horoscope: 3
        }, done);
    });


  });
});
