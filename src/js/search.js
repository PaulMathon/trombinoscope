import { createDisplay } from "./display.js";
import { config } from "./config.js";

export function initSearchUi(data, criterias) {
  initDatalist(criterias.specialities, "speciality");
  initDatalist(criterias.cabinets, "cabinet");
  initDatalist(criterias.cities, "city");

  document.getElementById("search-btn").addEventListener("click", onSearch(data, criterias));
}

function onSearch(data, criterias) {
  return () => {
    const params = {
      name: document.getElementById("search-name").value,
      speciality: document.getElementById("input-speciality").value,
      cabinet: document.getElementById("input-cabinet").value,
      city: document.getElementById("input-city").value,
    };
    
    const newData = filterData(data, params);

    createDisplay(newData, criterias, config.defaultPath);
  };
}

function initDatalist(categories, categoryName) {

  const datalist = document.getElementById(`search-${categoryName}`);
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    datalist.appendChild(option);
  }
}

function filterData(data, params) {
  return data.filter((practitioner) => {
    if (params.name && !practitioner.name.toLowerCase().includes(params.name) &&
      !practitioner.lastname.toLowerCase().includes(params.name)) {
      return false;
    }
    if (params.speciality && practitioner.specialities.indexOf(params.speciality) === -1) {
      return false;
    }
    if (params.cabinet && practitioner.cabinets.map(({name}) => name).indexOf(params.cabinet) === -1) {
      return false;
    }
    return true;
  });
}
