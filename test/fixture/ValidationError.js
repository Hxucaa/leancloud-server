/**
 * Created by hxucaa on 2015-11-18.
 */

"use strict";

import ValidationError from "../../server/cloud/utility/validation/ValidationError";

export const alphanumeric = new ValidationError(
  1001,
  "Username can only contain only letters and numbers."
);

export const length = new ValidationError(
  1002,
  "Username has to have between 5 to 30 characters."
);
