/**
 * Created by hxucaa on 2015-11-17.
 */

"use strict";

//import _ from "lodash";
import Chance from "chance";

import * as Rules from "~/server/cloud/controller/user/rules.js";

describe("User controller validation rules", () => {

  describe("isUsernameValid", () => {

    describe("generative testing", () => {

      const chance = new Chance();

      const generator = {
        alphanumeric(minLength, maxLength, quantity) {
          const array = [];

          for (let i = 0; i < quantity; i++) {
            const length = chance.integer({ min: minLength, max: maxLength });
            const str = chance.string({
              length,
              pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            });

            array.push(str);
          }
          return array;
        },
        ascii(minLength, maxLength, quantity) {
          const array = [];

          for (let i = 0; i < quantity; i++) {
            const length = chance.integer({ min: minLength, max: maxLength });
            const str = chance.string({ length, pool: "!@#$%^&*()[]" });

            array.push(str);
          }
          return array;
        }
      };

      it("should generate alphanumeric string of length 10 and all yield success", () => {
        generator.alphanumeric(5, 29, 100).forEach(username => {
          const result = Rules.verifyUsername(username);

          expect(result).to.be.success;
        });
      });

      describe("generate string longer than 30 characters", () => {
        it("should yield failure", () => {
          generator.alphanumeric(31, 50, 100).forEach(username => {
            const result = Rules.verifyUsername(username);

            expect(result).to.be.failure;
            expect(result).to.have.errors([Fixture.ValidationError.length]);
          });
        });
      });

      describe("generate string shorter than 5 characters", () => {
        it("should yield failure", () => {
          generator.alphanumeric(1, 4, 100).forEach(username => {
            const result = Rules.verifyUsername(username);

            expect(result).to.be.failure;
            expect(result).to.have.errors([Fixture.ValidationError.length]);
          });
        });
      });

      describe("generate string with symbols", () => {
        it("should yield failure", () => {
          generator.ascii(5, 29, 100).forEach(username => {
            const result = Rules.verifyUsername(username);

            expect(result).to.be.failure;
            expect(result).to.have.errors([Fixture.ValidationError.alphanumeric]);
          });
        });
      });
    });
  });
});
