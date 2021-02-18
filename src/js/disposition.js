import { UI } from "./UI.js";

export class Disposition {

  constructor(dispositionpPath) {
    this.dispositionPath = dispositionpPath;
    this.options = [
      Disposition.None,
      Disposition.Speciality,
      Disposition.Cabinet,
      Disposition.City,
    ];
  }

  /**
   * Adapt displayed buttons according to the context
   */
  adaptOptions(zoomLevel) {
    let options = this.options;
    if (zoomLevel === 1) {
      const pastCriteria = this.dispositionPath[0];
      switch (pastCriteria) {
        case "speciality":
          // remove speciality button
          options = options.filter((option) => option !== Disposition.Speciality);
          break;
        case "cabinet":
          // remove cabinet and city button
          options = options.filter((option) =>
            option !== Disposition.Cabinet && option !== Disposition.City
          );
          break;
        case "city":
          // remove city button
          options = options.filter((option) => option !== Disposition.City);
          break;
        default:
          break;
      }
    }
    if (zoomLevel >= 2) {
      // Everything except none button
      options = options.filter((option) => option === Disposition.None);
    }
    UI.keepDispositionOptions(options);
    UI.setDispositionFocus(this.dispositionPath[zoomLevel]);
  }

  /**
   * Set the right button to active
   */
  updateDispositionPath(dispositionPath, zoomLevel) {
    this.dispositionPath = dispositionPath;
    UI.switchActiveDispositionElement(dispositionPath[zoomLevel]);
  }
  
  /**
   * To improve
   * @param {*} zoomLevel 
   * @param {*} criteria 
   */
  getNewDispositionPath(zoomLevel, criteria) {
    this.dispositionPath[zoomLevel] = criteria;
    if (zoomLevel === 0) {
      if (criteria === Disposition.Speciality) {
        this.dispositionPath[1] = Disposition.Cabinet;
      }
      else {
        this.dispositionPath[1] = Disposition.Speciality;
      }
    }
    return this.dispositionPath;
  }
}

Disposition.None = "none";
Disposition.Speciality = "speciality";
Disposition.Cabinet = "cabinet";
Disposition.City = "city";
