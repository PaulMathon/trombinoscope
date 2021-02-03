import { config } from "./config.js";

export function fetchPractitioners() {
  return fetch(config.dataUrl)
    .then((result) => result.json());
}

export function getCriterias(data) {
  return {
    specialities: getSpecilitiesFromData(data),
    cities: getCitiesFromData(data),
    cabinets: getCabinetsFromData(data),
  };
}

export function getSpecilitiesFromData(data) {
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

export function getCitiesFromData(data) {
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

export function getCabinetsFromData(data) {
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


