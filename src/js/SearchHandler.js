import { UI } from "./UI.js";

export class SearchHandler {

  constructor(data, criterias) {
    this.data = data;
    UI.initSearchDatalists(data, criterias);
  }

  getParams() {
    const params = {
      name: document.getElementById("input-name").value,
      speciality: document.getElementById("input-speciality").value,
      cabinet: document.getElementById("input-cabinet").value,
      city: document.getElementById("input-city").value,
    };
    if (!params.name && !params.speciality && !params.cabinet && !params.city) {
      return false;
    }
    return params;
  }

  filter(name) {
    return this.data.filter((practitioner) => {
      if (name && !practitioner.name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }
      return true;
    });
  }

  getDispositionPath(searchParams) {
    let dispositionPath = [];
    if (searchParams.speciality) {
      dispositionPath.push("speciality");
    }
    if (searchParams.cabinet) {
      dispositionPath.push("cabinet");
    }
    if (searchParams.city) {
      dispositionPath.push("city");
    }
    if (dispositionPath.length === 0) {
      dispositionPath = ["speciality", "cabinet"];
    }
    else if (dispositionPath.length === 1) {
      if (dispositionPath[0] === "speciality") {
        dispositionPath.push("cabinet");
      }
      else {
        dispositionPath.push("speciality");
      }
    }
    return dispositionPath;
  }

  getWindowPath(mainWindow, dispositionPath, searchParams) {
    let windowPath = [];
    for (const dispositionEl of dispositionPath) {
      const searchValue = searchParams[dispositionEl].toLowerCase();
      mainWindow = mainWindow.children.filter(({name}) => {
        name = name.toLowerCase(); 
        return (name === searchValue || name.includes(searchValue) || searchValue.includes(name));
      })[0];
      if (mainWindow) {
        windowPath.push(mainWindow);
      }
    }
    return windowPath.slice(0, countParams(searchParams));
  }
}

function countParams(params) {
  return Object.entries(params).reduce((previousValue, [key, value]) =>
    previousValue + ((key !== "name" && value) ? 1 : 0), 0);
}