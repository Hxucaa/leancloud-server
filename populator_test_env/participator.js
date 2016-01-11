// Environment Initialization
var fs = require('fs');
var AV = require('avoscloud-sdk').AV;
var faker = require('faker');
var async = require('async');
var businessData = require("./business.json");

var Business = AV.Object.extend("Business");
var User = AV.Object.extend("_User");
var Participation = AV.Object.extend("User_Business_Participation");


const APP_ID = process.env.APP_ID ? process.env.APP_ID : require("../config/secret").test.APP_ID;
const APP_KEY = process.env.APP_KEY ? process.env.APP_KEY : require("../config/secret").test.APP_KEY;
const MASTER_KEY = process.env.MASTER_KEY ? process.env.MASTER_KEY : require("../config/secret").test.MASTER_KEY;

AV.useAVCloudUS();
AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
AV.Cloud.useMasterKey();

// Global variables
var businessUIDs = [];
var numBusinesses = 0;
var randomUsers = [];

// Get list of businesses
function getBusinesses() {
	businessData.forEach(function(businessObject) {
		for (var key in businessObject) {
			var keyName = key;
			var keyValue = businessObject[key];
			if (keyName == "uid") {
				businessUIDs.push(keyValue);
				numBusinesses += 1;
			}
		}
	});
}

// Randomly populate participation
function populateRandomUsers() {
	for (i = 1; i < 296; i++) {
		randomUsers.push("random" + i);
	}
}

// Participate random users
function participateRandomUsers() {
	randomUsers.forEach(function(username) {
		var userQuery = new AV.Query(User);
		userQuery.equalTo("username", username);
		userQuery.find({
			success: function(results) {
				if (results.length > 0) {
					var user = results[0];
					var businessIndex = Math.floor(Math.random() * numBusinesses);
					var randomBusiness = businessUIDs[businessIndex];

					var businessQuery = new AV.Query(Business);
					businessQuery.equalTo("uid", randomBusiness);
					businessQuery.find({
						success: function(results) {
							if (results.length > 0) {
								var business = results[0];
								var participation = new Participation();
								participation.set("business", business);
								participation.set("user", user);
								participation.set("participationType", Math.floor(Math.random() * 3));
								participation.save().then(function(obj) {
									console.log("INFO: " + username + " participation created at " + randomBusiness);
								});
							}
						}
					});
				}
			}
		});
	});
}

// Populate participation database
getBusinesses();
populateRandomUsers();
participateRandomUsers();
