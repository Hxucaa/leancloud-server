/**
 * Created by Lance on 2015-12-22.
 */

"use strict";

export function processValidation(response, validation) {
  validation.forEach( v => {
    if (v.isFailure) {
      response.error(v.value);
    }
  });
}
