import { Practitioner } from "./Practitioner.js";

export class Utils {
}

Utils.fetchPractitioners = function(url) {
  return fetch(url)
    .then((result) => result.json())
    .then((practitioners) => practitioners.map(
      ({firstName, lastName, specialities, cabinets, phones}) =>
      new Practitioner(firstName, lastName, specialities, cabinets, phones)));
};

Utils.getCriterias = function(data) {
  return {
    speciality: getSpecilitiesFromData(data),
    city: getCitiesFromData(data),
    cabinet: getCabinetsFromData(data),
  };
};

function getSpecilitiesFromData(data) {
  let specialities = [];
  data.forEach((practitioner) => {
    practitioner.specialities.forEach((speciality) => {
      if (specialities.indexOf(speciality) === -1) {
        specialities.push(speciality);
      }
    });
  });
  return specialities;
}

function getCitiesFromData(data) {
  let cities = [];
  data.forEach((practitioner) => {
    practitioner.cabinets.forEach(({city}) => {
      if (cities.indexOf(city) === -1) {
        cities.push(city);
      }
    });
  });
  return cities;
}

function getCabinetsFromData(data) {
  let cabinets = [];
  data.forEach((practitioner) => {
    practitioner.cabinets.forEach(({name}) => {
      if (cabinets.indexOf(name) === -1) {
        cabinets.push(name);
      }
    });
  });
  return cabinets;
}