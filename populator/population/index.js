/**
 * Created by hxucaa on 2015-12-13.
 */

"use strict";

import Roles from "./Roles";
import { populateRegion } from "./Region";

export async function populate() {
  const roles = new Roles();

  await roles.saveToDatabase();
  await populateRegion();
}
