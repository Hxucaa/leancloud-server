/**
 * Created by hxucaa on 2015-12-12.
 */

"use strict";

import { validateRequest, fieldRule } from "../utility/processValidation";
import { validation, model } from "leancloud-utility";

const { AddressValidation } = validation;
const { Region } = model;

function processRegion(request, response) {

  const address = request.object;
  const street = address.get("street");
  const regionCode = address.get("regionCode");

  if (regionCode) {
    const region = Region.matchByCode(regionCode);

    if (Region.isMunicipality(region)) {
      const province = Region.getParent(region);
      const fullAddress = `${province.regionNameC}${region.regionNameC}${street}`;

      address.set("fullAddress", fullAddress);
      address.set("city", region.code);
      address.set("province", province.code);
    }
    else if (Region.isDistrict(region)) {
      const municipality = Region.getParent(region);
      const province = Region.getParent(municipality);
      const fullAddress = `${province.regionNameC}
                          ${municipality.regionNameC}
                          ${region.regionNameC}
                          ${street}`;

      address.set("fullAddress", fullAddress);
      address.set("city", municipality.code);
      address.set("province", province.code);
    }
    else {
      response.error("Region is not level 2 or level 3");
    }
  }
}

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
  processRegion(request, response);

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
  processRegion(request, response);

  response.success();
};
