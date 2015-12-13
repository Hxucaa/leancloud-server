/**
 * Created by hxucaa on 2015-11-17.
 */

"use strict";

//import _ from "lodash";

import * as Rules from "~/server/cloud/controller/user/rules.js";

describe("User controller validation rules", () => {

  describe("#RULE isUsernameValid", () => {

    describe("success", () => {

      context("when username is between 5 to 30 in length and only alphanumeric", () => {
        it("should yield success", () => {
          const username = "sjdflkjslkdfjklsdjklf";
          const result = Rules.verifyUsername(username);

          expect(result).to.be.success;
        });
      });
    });

    describe("failure", () => {

      describe("username has whitespace", () => {

        context("is entirely whitespace", () => {
          it("should yield failure", () => {
            const username = "           ";
            const result = Rules.verifyUsername(username);

            expect(result).to.be.failure;
            expect(result).to.have.errors([Fixture.ValidationError.alphanumeric]);
          });
        });

        context("contains whitespace", () => {
          it("should yield failure", () => {
            const username = "dfsdfsdfsdf ";
            const result = Rules.verifyUsername(username);

            expect(result).to.be.failure;
            expect(result).to.have.errors([Fixture.ValidationError.alphanumeric]);
          });
        });
      });

      describe("when username contains chinese character", () => {
        it("should yield failure", () => {
          const username = "用户名用户名";
          const result = Rules.verifyUsername(username);

          expect(result).to.be.failure;
          expect(result).to.have.errors([Fixture.ValidationError.alphanumeric]);
        });
      });

      describe("when username contains symbols", () => {
        it("should yield failure", () => {
          const username = "fjdkf*&";
          const result = Rules.verifyUsername(username);

          expect(result).to.be.failure;
          expect(result).to.have.errors([Fixture.ValidationError.alphanumeric]);
        });
      });

      describe("when username length is less than 5", () => {
        it("should yield failure", () => {
          const username = "a";
          const result = Rules.verifyUsername(username);

          expect(result).to.be.failure;
          expect(result).to.have.errors([Fixture.ValidationError.length]);
        });


        it("should yield failure", () => {
          const username = "用户名";
          const result = Rules.verifyUsername(username);

          expect(result).to.be.failure;
          expect(result).to.have.errors([
            Fixture.ValidationError.alphanumeric,
            Fixture.ValidationError.length
          ]);
        });
      });

      describe("when username length is greater than 30", () => {
        it("should yield failure", () => {
          const username = Array(31).join("a");
          const result = Rules.verifyUsername(username);

          expect(result).to.be.failure;
          expect(result).to.have.errors([Fixture.ValidationError.length]);
        });
      });
    });
  });
});
