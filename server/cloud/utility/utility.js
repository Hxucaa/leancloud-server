"use strict";

const calculateHoroscope = function(birthdate) {
  var month = birthdate.getMonth() + 1;
  var date = birthdate.getDate();
  var horoscopeIndex = 0;

  if (month === 1 && date >= 20 || month === 2 && date <= 18)         { horoscopeIndex = 1;  }
  else if (month === 2 && date >= 19 || month === 3 && date <= 20)    { horoscopeIndex = 2;  }
  else if (month === 3 && date >= 21 || month === 4 && date <= 19)    { horoscopeIndex = 3;  }
  else if (month === 4 && date >= 20 || month === 5 && date <= 20)    { horoscopeIndex = 4;  }
  else if (month === 5 && date >= 21 || month === 6 && date <= 21)    { horoscopeIndex = 5;  }
  else if (month === 6 && date >= 22 || month === 7 && date <= 22)    { horoscopeIndex = 6;  }
  else if (month === 7 && date >= 23 || month === 8 && date <= 22)    { horoscopeIndex = 7;  }
  else if (month === 8 && date >= 23 || month === 9 && date <= 22)    { horoscopeIndex = 8;  }
  else if (month === 9 && date >= 23 || month === 10 && date <= 22)   { horoscopeIndex = 9;  }
  else if (month === 10 && date >= 23 || month === 11 && date <= 21)  { horoscopeIndex = 10; }
  else if (month === 11 && date >= 22 || month === 12 && date <= 21)  { horoscopeIndex = 11; }
  else if (month === 12 && date >= 22 || month === 1 && date <= 19)   { horoscopeIndex = 12; }

  return horoscopeIndex;
};

const calculateAgeGroup = function(birthdate) {
  var year = birthdate.getFullYear() % 100; // Get only last two digits
  var result = 50;

  if (year >= 1960 && year <= 1969) { result = 60; }
  else if (year >= 1970 && year <= 1979) { result = 70; }
  else if (year >= 1980 && year <= 1989) { result = 80; }
  else if (year >= 1990 && year <= 1999) { result = 90; }
  else if (year >= 2000 && year <= 2009) { result = 0; }
  else if (year >= 2010 && year <= 2019) { result = 10; }
  else if (year >= 2020 && year <= 2029) { result = 20; }

  return result;
};

module.exports = {
  calculateHoroscope: calculateHoroscope,
  calculateAgeGroup: calculateAgeGroup
};
