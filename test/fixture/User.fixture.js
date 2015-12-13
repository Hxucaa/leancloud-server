/**
 * Created by hxucaa on 2015-12-10.
 */

"use strict";

import faker from "faker";
import fs from "fs";
import path from "path";
//faker.locale = "zh_CN";

class UserFixture {
  constructor() {
    this.username = `${faker.name.firstName()}${faker.name.lastName()}`;
    this.password = faker.internet.password();
    this.type = 1;
    this.nickname = faker.name.findName();
    this.gender = 1;
    this.birthday = faker.date.between(new Date(1960, 1, 1), new Date(1994, 1, 1));
    this.coverPhoto = fs.readFileSync(path.join(__dirname, "/images/3.jpeg"));  // eslint-disable-line no-sync
  }
}

export default UserFixture;
