// Environment Initialization
var fs = require('fs');
var AV = require('avoscloud-sdk').AV;
var faker = require('faker');
var businessData = require("./business.json");

var Address = AV.Object.extend("Address");
var Business = AV.Object.extend("Business");

const APP_ID = process.env.APP_ID ? process.env.APP_ID : require("../config/secret").test.APP_ID;
const APP_KEY = process.env.APP_KEY ? process.env.APP_KEY : require("../config/secret").test.APP_KEY;
const MASTER_KEY = process.env.MASTER_KEY ? process.env.MASTER_KEY : require("../config/secret").test.MASTER_KEY;

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
// AV.Cloud.useMasterKey();
AV.setProduction(false);

// Helper Function
function saveBusiness(business) {
	// console.log(business);
	var businessName = business.get("name");
	business.save().then(function(obj) {
		console.log("INFO: " + businessName + " saved successfully");
	}, function(error) {
		console.log(error);
	});
}

function prepareAddress(address, street, regionCode, postalCode, geoPoint) {
	address.set("street", street);
	address.set("regionCode", "130725");
	address.set("postalCode", postalCode);
	address.set("geoLocation", geoPoint);

	return address;
}

function setAddress(business, address) {
	// console.log(address);
	business.set("address", address);
	saveBusiness(business);
}

// Populate Businesses
var counter = 0;
businessData.forEach(function (businessObject) {
	counter = counter + 1;
	var business = new Business();
	var imagePath = "./businessimage/business" + counter + ".jpg";
	var lat = 49.1962544;
	var lon = -123.1276811;

	fs.readFile(imagePath, function(err,data) {
		var image = new AV.File("business.jpg", data);

		business.set("coverImage", image);
		business.set("description", "sample business");

		for (var key in businessObject) {
			var keyName = key;
			var keyValue = businessObject[key];

			if (keyName == "nameSChinese") {
				business.set("name", keyValue);
			} else if (keyName == "phone") {
				business.set("phone", keyValue.trim());
			} else if (keyName == "latitude") {
				lat = keyValue;
			} else if (keyName == "longitude") {
				lon = keyValue;
			}	else if (keyName == "formattedAddress") {
				var address = new Address();
				var street = keyValue.split(",")[0];
				var postalCodeSection = keyValue.split(",")[2].trim().split(" ");
				var geoPoint = new AV.GeoPoint({latitude: lat, longitude: lon});
				if (postalCodeSection.length > 2) {
					var postalCode = postalCodeSection[1] + " " + postalCodeSection[2];
				} else {
					var postalCode = postalCodeSection[1];
				}

				setAddress(business, prepareAddress(address, street, "130725", postalCode, geoPoint));
			}
		}
	});
});
