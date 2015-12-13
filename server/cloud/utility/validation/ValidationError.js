/**
 * Created by hxucaa on 2015-11-17.
 */

"use strict";

export default class ValidationError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
  }
}
