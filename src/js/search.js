import { createDisplay } from "./display.js";
import { config } from "./config.js";

export function initSearchUi(context, data, criterias) {
  initDatalist(criterias.specialities, "speciality");
  initDatalist(criterias.cabinets, "cabinet");
  initDatalist(criterias.cities, "city");

  document.getElementById("search-btn")
    .addEventListener("click", onSearch(context, data, criterias));
}

function onSearch(context, data, criterias) {
  return (event) => {
    event.preventDefault();
    const params = {
      name: document.getElementById("search-name").value,
      specialities: document.getElementById("input-speciality").value,
      cabinets: document.getElementById("input-cabinet").value,
      cities: document.getElementById("input-city").value,
    };
    
    // Filter on name
    const newData = filterData(data, params);

    // Manage disposition
    const newPath = getNewPath(params);

    // Create new window with new data and disposition
    let newWindow = createDisplay(newData, criterias, newPath);
    if (newWindow) {
      const nbParams = countParams(params);
      context.reset(newWindow);
      for (let i=0; i<nbParams; i++) {
        const criteria = newPath.shift();
        newWindow = newWindow.children
          .filter((child) => child.name === params[criteria])[0];
        context.update(newWindow);
      }
    } else {
      document.getElementById("display-content").style.transform = "scale(1)";
    }
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
    if (params.name && !practitioner.name.toLowerCase().includes(params.name.toLowerCase())) {
      return false;
    }
    if (params.specialities && practitioner.specialities.indexOf(params.specialities) === -1) {
      return false;
    }
    if (params.cabinets && practitioner.cabinets.map(({name}) => name).indexOf(params.cabinets) === -1) {
      return false;
    }
    if (params.cities && practitioner.cabinets.map(({city}) => city).indexOf(params.cities) === -1) {
      return false;
    }
    return true;
  });
}

function getNewPath(params) {
  // search: spe, cabinet, ville -> ["specialities", "ville", "cabinets"]
  if (params.specialities && params.cabinets && params.cities) {
    return ["specialities", "cities", "cabinets"];
  }
  // search: spe, cabinet -> ["specialities", "cabinets"]
  else if (params.specialities && params.cabinets) {
    return ["specialities", "cabinets"];
  }
  // search: spe, ville -> ["specialities", "cities"]
  else if (params.specialities && params.cities) {
    return ["specialities", "cities"];
  }
  // search: cabinet, ville -> ["cabinets", "cities"]
  else if (params.cabinets && params.cities) {
    return ["cities", "cabinets"];
  }
  // search: spe -> ["specialities", "cabinets"]
  else if (params.specialities) {
    return ["specialities", "cabinets"];
  }
  // search: cabinet -> ["cabinets", "specialities"]
  else if (params.cabinets) {
    return ["cabinets", "specialities"];
  }
  // search: ville -> ["specialities", "cabinets"]
  else if (params.cities) {
    return ["cities", "specialities"];
  }
  return config.defaultPath;
}

function countParams(params) {
  return Object.entries(params).reduce((previousValue, [key, value]) =>
    previousValue + ((key !== "name" && value) ? 1 : 0), 0);
}