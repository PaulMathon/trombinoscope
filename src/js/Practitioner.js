export class Practitioner {
  constructor(firstName, lastName, specialities, cabinets, phones) {
    this.name = `${firstName} ${lastName.toUpperCase()}`;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cabinets = cabinets;
    this.specialities = specialities;
    this.phones = phones;
  }
}
