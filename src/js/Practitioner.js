export class Practitioner {
  constructor(firstName, lastName, specialities, cabinets, phones, profileURL) {
    this.name = `${lastName.toUpperCase()} ${firstName}`;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cabinets = cabinets;
    this.specialities = specialities;
    this.phones = phones;
    this.profileURL = profileURL;
  }
}
