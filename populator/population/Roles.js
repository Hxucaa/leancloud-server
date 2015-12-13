/**
 * Created by hxucaa on 2015-11-20.
 */

"use strict";

/*eslint-disable no-shadow */

import AV from "avoscloud-sdk";

export default class RoleFixture {
  constructor() {
    this.userRole = (function() {
      const roleACL = new AV.ACL();

      roleACL.setPublicReadAccess(true);
      roleACL.setPublicWriteAccess(false);
      return new AV.Role("User", roleACL);
    })();

    this.merchantRole = (function() {
      const roleACL = new AV.ACL();

      roleACL.setPublicReadAccess(true);
      roleACL.setPublicWriteAccess(false);
      return new AV.Role("Merchant", roleACL);
    })();

    this.curatorRole = (function() {
      const roleACL = new AV.ACL();

      roleACL.setPublicReadAccess(true);
      roleACL.setPublicWriteAccess(false);
      return new AV.Role("Curator", roleACL);
    })();

    this.administratorRole = (function() {
      const roleACL = new AV.ACL();

      roleACL.setPublicReadAccess(true);
      roleACL.setPublicWriteAccess(false);
      return new AV.Role("Admin", roleACL);
    })();
  }

  async saveToDatabase() {

    try {
      await AV.Promise.when(
        this.userRole.save(),
        this.merchantRole.save(),
        this.curatorRole.save(),
        this.administratorRole.save()
      );

      this.userRole.getRoles().add(this.merchantRole);
      this.merchantRole.getRoles().add(this.curatorRole);
      this.curatorRole.getRoles().add(this.administratorRole);

      await AV.Promise.when(
        this.userRole.save(),
        this.merchantRole.save(),
        this.curatorRole.save(),
        this.administratorRole.save()
      );

      console.log("Successfully created roles in the database.");
    }
    catch (errors) {
      console.error("Failed creating roles in the database. Error messages: ");
      console.error(errors);
    }
  }
}
