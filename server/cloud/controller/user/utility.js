
/* eslint-disable complexity, max-statements */

import { model } from "leancloud-utility";

const { AgeGroup, Horoscope } = model;

/**
 * Convert birthday to horoscope.
 * @param {string} birthdate - The date of birth.
 * @returns {number|Horoscope} The corresponding Horoscope.
 */
export function calculateHoroscope(birthdate) {
  const birthdayInDate = new Date(birthdate);
  const month = birthdayInDate.getMonth() + 1;
  const date = birthdayInDate.getDate();

  if (month === 1 && date >= 20 || month === 2 && date <= 18) {
    return Horoscope.Capricorn;
  }
  else if (month === 2 && date >= 19 || month === 3 && date <= 20) {
    return Horoscope.Aquarius;
  }
  else if (month === 3 && date >= 21 || month === 4 && date <= 19) {
    return Horoscope.Pisces;
  }
  else if (month === 4 && date >= 20 || month === 5 && date <= 20) {
    return Horoscope.Aries;
  }
  else if (month === 5 && date >= 21 || month === 6 && date <= 21) {
    return Horoscope.Taurus;
  }
  else if (month === 6 && date >= 22 || month === 7 && date <= 22) {
    return Horoscope.Gemini;
  }
  else if (month === 7 && date >= 23 || month === 8 && date <= 22) {
    return Horoscope.Cancer;
  }
  else if (month === 8 && date >= 23 || month === 9 && date <= 22) {
    return Horoscope.Leo;
  }
  else if (month === 9 && date >= 23 || month === 10 && date <= 22) {
    return Horoscope.Virgo;
  }
  else if (month === 10 && date >= 23 || month === 11 && date <= 21) {
    return Horoscope.Libra;
  }
  else if (month === 11 && date >= 22 || month === 12 && date <= 21) {
    return Horoscope.Scorpio;
  }
  else if (month === 12 && date >= 22 || month === 1 && date <= 19) {
    return Horoscope.Sagittarius;
  }
}

/**
 * Convert birthday to age group.
 * @param {string} birthdate - The date of birth.
 * @returns {number|AgeGroup} The corresponding AgeGroup.
 */
export function calculateAgeGroup(birthdate) {
  const birthdayInDate = new Date(birthdate);
  const year = birthdayInDate.getFullYear();

  if (year >= 1910 && year <= 1919) { return AgeGroup.Group10; }
  else if (year >= 1920 && year <= 1929) { return AgeGroup.Group20; }
  else if (year >= 1930 && year <= 1939) { return AgeGroup.Group30; }
  else if (year >= 1940 && year <= 1949) { return AgeGroup.Group40; }
  else if (year >= 1950 && year <= 1959) { return AgeGroup.Group50; }
  else if (year >= 1960 && year <= 1969) { return AgeGroup.Group60; }
  else if (year >= 1970 && year <= 1979) { return AgeGroup.Group70; }
  else if (year >= 1980 && year <= 1989) { return AgeGroup.Group80; }
  else if (year >= 1990 && year <= 1999) { return AgeGroup.Group90; }
  else if (year >= 2000 && year <= 2009) { return AgeGroup.Group100; }
  else if (year >= 2010 && year <= 2019) { return AgeGroup.Group110; }

  return AgeGroup.Group120;
}
