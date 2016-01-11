/*
|--------------------------------------------------------------------------
| Environment Initialization
|--------------------------------------------------------------------------
*/
var fs = require("fs");
var AV = require("avoscloud-sdk").AV;
var async = require("async");
var _ = require("lodash");

const APP_ID = process.env.APP_ID ? process.env.APP_ID : require("../config/secret").test.APP_ID;
const APP_KEY = process.env.APP_KEY ? process.env.APP_KEY : require("../config/secret").test.APP_KEY;
const MASTER_KEY = process.env.MASTER_KEY ? process.env.MASTER_KEY : require("../config/secret").test.MASTER_KEY;

AV.useAVCloudUS();
AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
AV.Cloud.useMasterKey();

var currentDate = new Date();
var egLatLon = new AV.GeoPoint(49.2663074, -123.1386987);
var sampleImage;
fs.readFile("./userimage/random1.jpg", function(err, data) {
	sampleImage = new AV.File("sample.jpg", data);
});

var Province = AV.Object.extend("Province");
var City = AV.Object.extend("City");
var Address = AV.Object.extend("Address");

var User = AV.Object.extend("_User");
var Role = AV.Object.extend("_Role");
var UserRole = AV.Object.extend("UserRole");
var UserPhoto = AV.Object.extend("UserPhoto");
var UserStatistics = AV.Object.extend("UserStatistics");
var UserProfile = AV.Object.extend("UserProfile");

var Company = AV.Object.extend("Company");
var Business = AV.Object.extend("Business");
var BusinessHour = AV.Object.extend("BusinessHour");
var BusinessStatistics = AV.Object.extend("BusinessStatistics");

var Participation = AV.Object.extend("Participation");
var ParticipationMember = AV.Object.extend("ParticipationMember");
var PrivateMessage = AV.Object.extend("PrivateMessage");


/*
|--------------------------------------------------------------------------
| Geographic Table Setup
|--------------------------------------------------------------------------
*/
var province = new Province();
var city = new City();
var address = new Address();

var user = new User();
var role = new Role();
var userRole = new UserRole();
var userPhoto = new UserPhoto();
var userStatistics = new UserStatistics();
var userProfile = new UserProfile();

var company = new Company();
var business = new Business();
var businessHour = new BusinessHour();
var businessStatistics = new BusinessStatistics();

var participation = new Participation();
var participationMember = new ParticipationMember();
var privateMessage = new PrivateMessage();

var saveTables = function() {
	province.set("name", "British Columbia");
	province.set("shortName", "BC");
	province.set("countryId", 1);
	province.set("isActive", true);

	city.set("name", "Vancouver");
	city.set("shortName", "VAN");
	city.set("provinceId", province);
	city.set("isActive", true);

	address.set("streetLine1", "11000 Shell Road");
	address.set("streetLine2", "Unit 28");
	address.set("cityId", city);
	address.set("provinceId", province);
	address.set("postalCode", "V7A 3W5");
	address.set("geoLocation", egLatLon);
	address.set("fullAddress", "11000 Shell Road, Richmond, BC, V7A 3W5");
	address.set("isActive", true);

	/*
	|--------------------------------------------------------------------------
	| User Table Setup
	|--------------------------------------------------------------------------
	*/

	user.set("type", 1);
	user.set("status", 1);
	user.set("isActive", true);
	user.set("username", "williamisafuckingidiot");
	user.set("password", "hunter2");

	role.set("name", "rolename");
	role.set("isActive", true);

	userRole.set("userId", user);
	userRole.set("roleId", role);
	userRole.set("isActive", true);

	userPhoto.set("userId", user);
	userPhoto.set("image", sampleImage);
	userPhoto.set("imageTitle", "Image Title");
	userPhoto.set("isActive", true);


	userStatistics.set("userId", user);
	userStatistics.set("participationType", 1);
	userStatistics.set("count", 1);
	userStatistics.set("isActive", true);


	userProfile.set("userId", user);
	userProfile.set("nickName", "Nickname");
	userProfile.set("birthday", currentDate);
	userProfile.set("ageGroup", 90);
	userProfile.set("horoscope", 1);
	userProfile.set("addressId", address);
	userProfile.set("coverPhoto", sampleImage);
	userProfile.set("latestLocation", egLatLon);
	userProfile.set("isActive", true);


	/*
	|--------------------------------------------------------------------------
	| Business Table Setup
	|--------------------------------------------------------------------------
	*/
	company.set("companyName", "Company Name");
	company.set("phone", "6043048117");
	company.set("email", "business@business.com");
	company.set("websiteUrl", "website.com");
	company.set("addressId", address);
	company.set("isActive", true);


	business.set("userId", user);
	business.set("companyId", company);
	business.set("name", "Business Name");
	business.set("phone", "7787070088");
	business.set("email", "business@business.com");
	business.set("websiteUrl", "bigbusiness.com");
	business.set("addressId", address);
	business.set("isActive", true);


	businessHour.set("businessId", business);
	businessHour.set("day", 1);
	businessHour.set("timeFrom", currentDate);
	businessHour.set("timeEnd", currentDate);
	businessHour.set("isActive", true);


	businessStatistics.set("businessId", business);
	businessStatistics.set("participationType", 1);
	businessStatistics.set("count", 1);
	businessStatistics.set("isActive", true);

	/*
	|--------------------------------------------------------------------------
	| Participation Table Setup
	|--------------------------------------------------------------------------
	*/
	participation.set("userId", user);
	participation.set("businessId", business);
	participation.set("participationType", 1);
	participation.set("status", 1);
	participation.set("isActive", true);



	participationMember.set("participationId", participation);
	participationMember.set("userId", user);
	participationMember.set("isActive", true);


	privateMessage.set("participationId", participation);
	privateMessage.set("invitorId", user);
	privateMessage.set("inviteeId", user);
	// privateMessage.set("messageId", 1);
	privateMessage.set("isActive", true);

	return new AV.Promise();
}

saveTables();


province.save().then(function(obj) {
	console.log("INFO: Province table setup complete");
	return city.save();
}).then(function(obj) {
	console.log("INFO: City table setup complete");
	return address.save();
}).then(function(obj) {
	console.log("INFO: Address table setup complete");
	return user.save();
}).then(function(obj) {
	console.log("INFO: User table setup population complete");
	return role.save();
}).then(function(obj) {
	console.log("INFO: Role table setup complete");
	return userRole.save();
}).then(function(obj) {
	console.log("INFO: UserRole table setup complete");
	userPhoto.save();
}).then(function(obj) {
	console.log("INFO: UserPhoto table setup complete");
	return userStatistics.save();
}).then(function(obj) {
	console.log("INFO: UserStatistics table setup complete");
	return userProfile.save();
}).then(function(obj) {
	console.log("INFO: UserProfile table setup complete");
	return company.save();
}).then(function(obj) {
	console.log("INFO: Company table setup complete");
	return business.save();
}).then(function(obj) {
	console.log("INFO: Business table setup complete");
	businessHour.save();
}).then(function(obj) {
	console.log("INFO: BusinessHour table setup complete");
	return businessStatistics.save();
}).then(function(obj) {
	console.log("INFO: BusinessStatistics table setup complete");
	return participation.save();
}).then(function(obj) {
	console.log("INFO: Participation table setup complete");
	return participationMember.save();
}).then(function(obj) {
	console.log("INFO: ParticipationMember table setup complete");
	return privateMessage.save();
}).then(function(obj) {
	console.log("INFO: PrivateMessage table setup complete");
/*
|--------------------------------------------------------------------------
| Purge Sample Data
|--------------------------------------------------------------------------
*/
  return province.destroy();
}).then(function(obj) {
	return city.destroy();
}).then(function(obj) {
	return address.destroy();
}).then(function(obj) {
	console.log("INFO: Sample geographic data purged");
	return user.destroy();
}).then(function(obj) {
	return role.destroy();
})
.then(function(obj) {
	return userRole.destroy();
})
.then(function(obj) {
	return userPhoto.destroy();
})
.then(function(obj) {
	return userStatistics.destroy();
})
.then(function(obj) {
	return userProfile.destroy();
})
.then(function(obj) {
	console.log("INFO: Sample user data purged");
	return company.destroy();
}).then(function(obj) {
	return business.destroy();
})
.then(function(obj) {
	return businessHour.destroy();
})
.then(function(obj) {
	return businessStatistics.destroy();
})
.then(function(obj) {
	console.log("INFO: Sample business data purged");
	return participation.destroy();
}).then(function(obj) {
	return participationMember.destroy();
})
.then(function(obj) {
	return privateMessage.destroy();
})
.then(function(obj) {
	console.log("INFO: Sample participation data purged");
	return;
}, function(err) {
	console.error(err);
	return;
});




