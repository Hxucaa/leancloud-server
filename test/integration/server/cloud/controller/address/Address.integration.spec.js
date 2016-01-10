"use strict";

import AV from "leanengine";

describe("Address", () => {

  describe("beforeSave", () => {

    context("given correct data", () => {
      const exampleGeoPoint = new AV.GeoPoint({ latitude: 49.2827, longitude: 123.1207 });

      it("should pass", done => {
        request
          .post("/1.1/functions/Address/beforeSave")
          .send({
            "object": {
              street: "10351 Shell Road",
              regionCode: "130725",
              postalCode: "V7A 3W5",
              geolocation: exampleGeoPoint
            }
          })
          .expect(200, {
            street: "10351 Shell Road",
            regionCode: "130725",
            postalCode: "V7A 3W5",
            fullAddress: "河北省张家口市尚义县10351 Shell Road",
            geolocation: {
              "__type": "GeoPoint",
              "latitude": 49.2827,
              "longitude": 123.1207
            }
          }, done);
      });
    });

  });

  describe("beforeUpdate", () => {

    context("given correct data", () => {
      const exampleGeoPoint = new AV.GeoPoint({ latitude: 49.2827, longitude: 123.1207 });

      it("should pass", done => {
        request
          .post("/1.1/functions/Address/beforeUpdate")
          .send({
            "object": {
              street: "10351 Shell Road",
              regionCode: "130725",
              postalCode: "V7A 3W5",
              geolocation: exampleGeoPoint
            }
          })
          .expect(200, {
            street: "10351 Shell Road",
            regionCode: "130725",
            postalCode: "V7A 3W5",
            fullAddress: "河北省张家口市尚义县10351 Shell Road",
            geolocation: {
              "__type": "GeoPoint",
              "latitude": 49.2827,
              "longitude": 123.1207
            }
          }, done);
      });
    });

  });
});
