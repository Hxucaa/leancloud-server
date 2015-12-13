/**
 * Created by hxucaa on 2015-11-20.
 */

"use strict";

import Roles from "./Roles";
import RegionFixture from "./RegionFixture.json";
import AV from "leanengine";
const CM = require("cloudmodel")(AV);
const Region = CM.Region;

export async function populate() {
  const roles = new Roles();

  try {
    await roles.saveToDatabase();
  }
  catch (err) {
    console.error(err);
  }

  try {
    let savedCount = 0;
    let rejectedCount = 0;

    console.log(`Total number of regions: ${RegionFixture.results.length}`);

    const regions = RegionFixture.results.map(x => {
      const region = new Region();
      region.code = x.code;
      region.countryCode = x.countryCode;
      region.regionNameE = x.regionNameE;
      region.regionNameC = x.regionNameC;
      region.level = parseInt(x.level, 10);
      region.upperRegion = x.upperRegion;

      return region.save()
        .then(res => {
          savedCount++;
          //console.info(`${++savedCount} saved!`);
          return res;
        }, res => {
          rejectedCount++;
          //console.log(x);
          //console.error(`${++rejectedCount} rejected!`);
          return res;
        });
    });

    AV.Promise.all(regions)
      .then(res => {
        console.log(`${savedCount} saved!`);
      }, err => {
        console.error("Saving region is rejected!")
      });

  }
  catch (errors) {
    console.error(errors);
  }
}
