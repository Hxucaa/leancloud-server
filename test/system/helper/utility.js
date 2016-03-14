/**
 * Created by hxucaa on 2015-12-12.
 */

"use strict";

export function calculateHoroscope(birthdate) { // eslint-disable-line complexity
  const birthdayInDate = new Date(birthdate);
  const month = birthdayInDate.getMonth() + 1;
  const date = birthdayInDate.getDate();

  if (month === 1 && date >= 20 || month === 2 && date <= 18) {
    return 1;
  }
  else if (month === 2 && date >= 19 || month === 3 && date <= 20) {
    return 2;
  }
  else if (month === 3 && date >= 21 || month === 4 && date <= 19) {
    return 3;
  }
  else if (month === 4 && date >= 20 || month === 5 && date <= 20) {
    return 4;
  }
  else if (month === 5 && date >= 21 || month === 6 && date <= 21) {
    return 5;
  }
  else if (month === 6 && date >= 22 || month === 7 && date <= 22) {
    return 6;
  }
  else if (month === 7 && date >= 23 || month === 8 && date <= 22) {
    return 7;
  }
  else if (month === 8 && date >= 23 || month === 9 && date <= 22) {
    return 8;
  }
  else if (month === 9 && date >= 23 || month === 10 && date <= 22) {
    return 9;
  }
  else if (month === 10 && date >= 23 || month === 11 && date <= 21) {
    return 10;
  }
  else if (month === 11 && date >= 22 || month === 12 && date <= 21) {
    return 11;
  }
  //else if (month === 12 && date >= 22 || month === 1 && date <= 19) {
  else {
    return 12;
  }
}

export function calculateAgeGroup(birthdate) {  // eslint-disable-line complexity
  const birthdayInDate = new Date(birthdate);
  const year = birthdayInDate.getFullYear();

  if (year >= 1910 && year <= 1919) { return 10; }
  else if (year >= 1920 && year <= 1929) { return 20; }
  else if (year >= 1930 && year <= 1939) { return 30; }
  else if (year >= 1940 && year <= 1949) { return 40; }
  else if (year >= 1950 && year <= 1959) { return 50; }
  else if (year >= 1960 && year <= 1969) { return 60; }
  else if (year >= 1970 && year <= 1979) { return 70; }
  else if (year >= 1980 && year <= 1989) { return 80; }
  else if (year >= 1990 && year <= 1999) { return 90; }
  else if (year >= 2000 && year <= 2009) { return 100; }
  else if (year >= 2010 && year <= 2019) { return 110; }

  return 120;
}
