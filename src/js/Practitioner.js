export class Practitioner {
  constructor(firstName, lastName, specialities, cabinets, profileURL) {
    this.name = `${lastName.toUpperCase()} ${firstName}`;
    this.firstName = firstName;
    this.lastName = lastName;
    this.cabinets = cabinets;
    this.specialities = specialities;
    this.profileURL = profileURL;
  }
}
