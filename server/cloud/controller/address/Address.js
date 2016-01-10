/**
 * Created by hxucaa on 2015-12-12.
 */
/* eslint-disable prefer-template, newline-after-var */

"use strict";

import { validateRequest, fieldRule } from "../utility/processValidation";
import { validation, model } from "leancloud-utility";

const { AddressValidation } = validation;
const { Region } = model;

export const beforeSave = function(request, response) {

  // Parameters
  const address = request.object;
  const street = address.get("street");
  const regionCode = address.get("regionCode");

  // Validation
  validateRequest(error => response.error(error),
     fieldRule(street, AddressValidation.verifyStreet),
     fieldRule(regionCode, AddressValidation.verifyRegionCode)
   );

  // Operation
  if (regionCode) {
    const region = Region.matchByCode(regionCode);

    if (Region.isMunicipality(region)) {
      const province = Region.parent(region);
      const fullAddress = province.regionNameC +
                          region.regionNameC + street;

      address.set("fullAddress", fullAddress);
    }
    else if (Region.isDistrict(region)) {
      const municipality = Region.parent(region);
      const province = Region.parent(municipality);
      const fullAddress = province.regionNameC +
                          municipality.regionNameC +
                          region.regionNameC + street;

      address.set("fullAddress", fullAddress);
    }
    else {
      response.error("Region is not level 2 or level 3");
    }
  }

  response.success();
};

export const beforeUpdate = function(request, response) {

  // Parameters
  const address = request.object;
  const street = address.get("street");
  const regionCode = address.get("regionCode");

  // Validation
  validateRequest(error => response.error(error),
     fieldRule(street, AddressValidation.verifyStreet),
     fieldRule(regionCode, AddressValidation.verifyRegionCode)
   );

  // Operation
  if (regionCode) {
    const region = Region.matchByCode(regionCode);

    if (Region.isMunicipality(region)) {
      const province = Region.parent(region);
      const fullAddress = province.regionNameC +
                          region.regionNameC + street;

      address.set("fullAddress", fullAddress);
    }
    else if (Region.isDistrict(region)) {
      const municipality = Region.parent(region);
      const province = Region.parent(municipality);
      const fullAddress = province.regionNameC +
                          municipality.regionNameC +
                          region.regionNameC + street;

      address.set("fullAddress", fullAddress);
    }
    else {
      response.error("Region is not level 2 or level 3");
    }
  }

  response.success();
};
