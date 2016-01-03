"use strict";

describe("UserFunction", () => {

  describe("checkUsernameAvailability", () => {

    let userFixture;

    beforeEach((done) => {
      userFixture = new Fixture.UserFixture();
      done();
    });

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
