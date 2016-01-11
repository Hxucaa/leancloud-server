// Environment Initialization
var fs = require('fs');
var AV = require('avoscloud-sdk').AV;
var Business = AV.Object.extend("Business");
var User = AV.Object.extend("_User");
var Participation = AV.Object.extend("User_Business_Participation");

const APP_ID = process.env.APP_ID ? process.env.APP_ID : require("../../config/secret").test.APP_ID;
const APP_KEY = process.env.APP_KEY ? process.env.APP_KEY : require("../../config/secret").test.APP_KEY;
const MASTER_KEY = process.env.MASTER_KEY ? process.env.MASTER_KEY : require("../../config/secret").test.MASTER_KEY;

AV.useAVCloudUS();
AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
AV.Cloud.useMasterKey();

// Populate WantToGo
var testUsers = ["testuser1", "testuser2", "testuser3"];
var testUserIDs = [];
testUsers.forEach(function (username) {
	var IDQuery = new AV.Query(User);
	IDQuery.equalTo("username", username);
	IDQuery.find({
			success: function(results) {
				if (results.length > 0) {
					console.log("INFO: Found " + username + " in database");
					testUserIDs.push(results[0]);
				}
			},
			error: function(error) {
				console.log("ERROR: ID query failed at user: " + username);
			}
	});
});

var businessQuery = new AV.Query(Business);
var count = 0;
businessQuery.equalTo("isClaimed", false);
businessQuery.find({
	success: function(results) {
		results.forEach(function (business) {
			testUserIDs.forEach(function (user) {
				var participationQuery = new AV.Query(Participation);
				participationQuery.equalTo("user", user);
				participationQuery.equalTo("business", business);
				participationQuery.find({
					success: function (results) {
						if (results.length == 0) {
							var participation = new Participation();
							participation.set("business", business);
							participation.set("user", user);
							participation.save().then(function(obj) {
								count++;
								business.increment("wantToGoCounter");
								business.save().then(function (obj) {

								});
								console.log("INFO: Completed " + count + " participation populations");
							}, function(error) {
								console.log("ERROR: Participation save failed");
							});
						}
					}
				});
			});
		})
	}
});
