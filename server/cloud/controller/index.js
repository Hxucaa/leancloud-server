/**
 * Created by hxucaa on 2015-11-16.
 */

"use strict";

const path = require("path");

module.exports = {
  Business: require(path.join(__dirname, "business/Business")),
  BusinessHour: require(path.join(__dirname, "business/BusinessHour")),
  BusinessStatistics: require(path.join(__dirname, "business/BusinessStatistics")),
  Company: require(path.join(__dirname, "business/Company")),
  Participation: require(path.join(__dirname, "participation/Participation")),
  User: require(path.join(__dirname, "user/User"))
};
