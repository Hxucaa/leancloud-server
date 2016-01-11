// Environment Initialization
var fs = require('fs');
var AV = require('avoscloud-sdk').AV;
var faker = require('faker');

var Business = AV.Object.extend("Business");
var User = AV.Object.extend("_User");
var Participation = AV.Object.extend("User_Business_Participation");


const APP_ID = process.env.APP_ID ? process.env.APP_ID : require("../config/secret").test.APP_ID;
const APP_KEY = process.env.APP_KEY ? process.env.APP_KEY : require("../config/secret").test.APP_KEY;
const MASTER_KEY = process.env.MASTER_KEY ? process.env.MASTER_KEY : require("../config/secret").test.MASTER_KEY;

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
AV.Cloud.useMasterKey();
AV.setProduction(false);

// Helper Functions
var saveUser = function(user) {
	var username = user.get("username");
	user.signUp().then(function(obj) {
		console.log("INFO: " + username + " registered successfully");
	}, function(error) {
		console.log(error);
	});
}

// Populate Predefined Users
var testUsers = ["test1", "test2", "test3", "test4", "test5"];
var minDate = new Date(1970, 1, 1);
var maxDate = new Date(1996, 12, 1);
testUsers.forEach(function (username) {
	var predefinedUser = new User();
	var imagePath = "./userimage/" + username + ".jpg";
	fs.readFile(imagePath, function(err, data) {
		var image = new AV.File(username + ".jpg", data);
		predefinedUser.set("coverPhoto", image);
		predefinedUser.set("username", username);
		predefinedUser.set("password", username);
		predefinedUser.set("nickname", username);
		predefinedUser.set("type", 1);
		predefinedUser.set("gender", (Math.floor(Math.random() * 2)));
		predefinedUser.set("birthday", faker.date.between(minDate, maxDate));

		saveUser(predefinedUser);
	});
});

var numArray = [];
for (var i = 1; i < 101; i++) {
	numArray.push(i)
}
// Populate Random Users
numArray.forEach(function(i) {
	var randomUser = new User();
	var randomUsername = faker.name.firstName() + faker.name.lastName();
	randomUsername = (randomUsername.split("'").pop()).substring(0,28)
	var imagePath = "./userimage/random" + i + ".jpg";
	fs.readFile(imagePath, function(err, data) {
		var image = new AV.File(randomUsername + ".jpg", data);
		randomUser.set("coverPhoto", image);
		randomUser.set("username", randomUsername);
		randomUser.set("password", randomUsername);
		randomUser.set("nickname", randomUsername);
		randomUser.set("type", 1);
		randomUser.set("gender", (Math.floor(Math.random() * 2)));
		randomUser.set("birthday", faker.date.between(minDate, maxDate));

		saveUser(randomUser);
	});
});
