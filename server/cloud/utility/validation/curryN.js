/**
 * Created by hxucaa on 2015-11-17.
 */

"use strict";

/*eslint-disable */

// Int, (a1, a2, ..., aN -> b) -> a1 -> a2 -> ... -> aN -> b
export default function curryN(n, f) {
  return function _curryN(as) {
    return function() {
      var args = as.concat([].slice.call(arguments));
      return args.length < n ? _curryN(args) : f.apply(null, args);
    };
  }([]);
}
