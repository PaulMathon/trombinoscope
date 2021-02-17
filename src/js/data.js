export function fetchPractitioners(url) {
  return fetch(url)
    .then((result) => result.json())
    .then((practitioners) => practitioners.map(
      ({firstName, lastName, specialities, cabinets, phones}) =>
      new Practitioner(firstName, lastName, specialities, cabinets, phones)));
}

class Practitioner {
  constructor(firstName, lastName, specialities, cabinets, phones) {
    this.name = `${firstName} ${lastName.toUpperCase()}`;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cabinets = cabinets;
    this.specialities = specialities;
    this.phones = phones;
  }
}

export function getCriterias(data) {
  return {
    specialities: getSpecilitiesFromData(data),
    cities: getCitiesFromData(data),
    cabinets: getCabinetsFromData(data),
  };
}

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
