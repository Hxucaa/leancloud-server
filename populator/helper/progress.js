/**
 * Created by hxucaa on 2015-12-13.
 */

"use strict";

import ProgressBar from "progress";

export default function(length) {
  return new ProgressBar(
    "populating Region (Total: :total) [:bar] :percent ETA: :eta",
    {
      width: 50,
      total: length
    }
  );
}
