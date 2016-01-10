"use strict";

import AV from "leanengine";

describe("Business", () => {

  describe("beforeSave", () => {

    context("given correct data", () => {
      const exampleGeoPoint = new AV.GeoPoint({ latitude: 49.2827, longitude: 123.1207 });
      const userFixture = new Fixture.UserFixture();

      it("should pass", done => {
        request
          .post("/1.1/functions/Business/beforeSave")
          .send({
            "object": {
              name: "Shikib Incorporated",
              phone: "778-708-8117",
              description: "This is a business",
              coverImage: userFixture.coverPhoto,
              address: {
                street: "10351 Shell Road",
                regionCode: "130725",
                postalCode: "V7A 3W5",
                geolocation: exampleGeoPoint
              }
            }
          })
          .expect(200, {
            "address": {
              "geolocation": {
                "__type": "GeoPoint",
                "latitude": 49.2827,
                "longitude": 123.1207
              },
              "postalCode": "V7A 3W5",
              "regionCode": "130725",
              "street": "10351 Shell Road"
            },
            "coverImage": {
              "__type": "File",
              "name": "hello.txt",
              "url": "http://ac-1qdney6b.qiniudn.com/3zLG4o0d27MsCQ0qHGRg4JUKbaXU2fiE35HdhC8j.txt"
            },
            "description": "This is a business",
            "name": "Shikib Incorporated",
            "phone": "778-708-8117"
          }, done);
      });
    });
  });

  describe("beforeUpdate", () => {

    context("given correct data", () => {
      const exampleGeoPoint = new AV.GeoPoint({ latitude: 49.2827, longitude: 123.1207 });
      const userFixture = new Fixture.UserFixture();

      it("should pass", done => {
        request
          .post("/1.1/functions/Business/beforeUpdate")
          .send({
            "object": {
              name: "Shikib Incorporated",
              phone: "778-708-8117",
              description: "This is a business",
              coverImage: userFixture.coverPhoto,
              address: {
                street: "10351 Shell Road",
                regionCode: "130725",
                postalCode: "V7A 3W5",
                geolocation: exampleGeoPoint
              }
            }
          })
          .expect(200, {
            "address": {
              "geolocation": {
                "__type": "GeoPoint",
                "latitude": 49.2827,
                "longitude": 123.1207
              },
              "postalCode": "V7A 3W5",
              "regionCode": "130725",
              "street": "10351 Shell Road"
            },
            "coverImage": {
              "__type": "File",
              "name": "hello.txt",
              "url": "http://ac-1qdney6b.qiniudn.com/3zLG4o0d27MsCQ0qHGRg4JUKbaXU2fiE35HdhC8j.txt"
            },
            "description": "This is a business",
            "name": "Shikib Incorporated",
            "phone": "778-708-8117"
          }, done);
      });
    });
  });
});
