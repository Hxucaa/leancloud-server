/**
 * Created by Lance on 2015-12-22.
 */

"use strict";

import { isUndefined } from "lodash/lang";

/**
 * The rule for a field.
 * @param {any} value - Any value.
 * @param {Function} validation - Validation function aka the rule.
 * @returns {null} nothing.
 */
export const fieldRule = (value, validation) => (errorHandler) => {

  if (!isUndefined(value)) {
    const result = validation(value);

    if (result.isFailure) {
      errorHandler(result.value);
    }
  }

};

/**
 * Validate request against a bunch of rules.
 * @param {Function} errorHandler - A callback function which gets run when an error occurs.
 * @param {Function} rules - A bunch of rules.
 * @returns {null} nothing.
 */
export const validateRequest = (errorHandler, ...rules) => {
  rules.map(r => r(errorHandler));
};
