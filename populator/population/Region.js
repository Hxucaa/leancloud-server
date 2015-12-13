/**
 * Created by hxucaa on 2015-12-12.
 */

"use strict";

import RegionFixture from "./RegionFixture.json";
import AV from "avoscloud-sdk";
import progress from "../helper/progress";

const CM = require("cloudmodel")(AV); // eslint-disable-line import/no-require
const Region = CM.Region;

export async function populateRegion() {

  let savedCount = 0;
  let rejectedCount = 0;
  const length = RegionFixture.results.length;
  const bar = progress(length);

  console.log(`Total number of regions: ${length}`);

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
        bar.tick();
        savedCount++;
        return res;
      }, res => {
        rejectedCount++;
        return res;
      });
  });

  await AV.Promise.all(regions)
    .then(res => {
      console.log(`${savedCount} of regions are saved!`);
      console.error(`${rejectedCount} of regions are rejected!`);
      console.log("Saving region to database is SUCCESSFUL!");
      return res;
    }, err => {
      console.error("Saving region to database has been INTERRUPTED!");
      console.log(`${savedCount} of regions are saved!`);
      console.error(`${rejectedCount} of regions are rejected!`);
      return err;
    });
}
