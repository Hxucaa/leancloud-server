"use strict";

describe("CloudFunction", () => {

  describe("checkUsernameAvailability", () => {

    let userFixture;

    beforeEach((done) => {
      userFixture = new Fixture.UserFixture();
      done();
    });

    context("given any data", () => {
      it("should return true", done => {
        request
          .post("/1.1/functions/checkUsernameAvailability")
          .send({
            username: userFixture.username
          })
          .expect(200, {
            result: true
          }, done);
      });
    });
  });
});
