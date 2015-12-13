/**
 * Created by hxucaa on 2015-11-18.
 */

"use strict";

import ValidationError from "../../server/cloud/utility/validation/ValidationError";
import Validation from "../../server/cloud/utility/validation/ValidationAF";

/* eslint-disable no-invalid-this */

export default function(chai) {
  const ValidationErrorProperty = function() {
    chai.Assertion.addProperty(chai.Assertion.prototype, "validationError", function() {
      this.assert(
        this._obj instanceof ValidationError,
        "expected #{this} to be a ValidationError",
        "expected #{this} to not be a ValidationError"
      );
    });
  };

  chai.use(ValidationErrorProperty);

  const ValidationProperty = function() {
    chai.Assertion.addProperty(chai.Assertion.prototype, "validation", function() {
      this.assert(
        this._obj instanceof Validation,
        "expected #{this} to be a Validation",
        "expected #{this} to not be some other object"
      );
    });
  };

  chai.use(ValidationProperty);

  const AssertValidationErrorFailure = function() {
    chai.Assertion.addProperty("failure", function() {

      new chai.Assertion(this._obj).to.be.instanceof(Validation);

      this.assert(
        this._obj.isFailure === true,
        "expected #{this} to be a failed validation",
        "expected #{this} to not be a not failed validation"
      );
    });
  };

  chai.use(AssertValidationErrorFailure);

  const AssertValidationErrorSuccess = function() {
    chai.Assertion.addProperty("success", function() {

      new chai.Assertion(this._obj).to.be.instanceof(Validation);

      this.assert(
        this._obj.isSuccess === true,
        "expected #{this} to be a successful validation",
        "expected #{this} to not be a not succeeded validation"
      );
    });
  };

  chai.use(AssertValidationErrorSuccess);

  const AssertValidationErrorObjects = function() {
    function assertValidationErrors(n) {

      new chai.Assertion(this._obj).to.be.instanceof(Validation);

      const errors = this._obj.value;

      new chai.Assertion(errors).to.be.instanceof(Array);
      new chai.Assertion(errors).to.eql(n);
    }

    function chainValidationErrors() {
      chai.util.flag(this, "validation.errors", true);
    }
    chai.Assertion.addChainableMethod("errors", assertValidationErrors, chainValidationErrors);
  };

  chai.use(AssertValidationErrorObjects);
}
