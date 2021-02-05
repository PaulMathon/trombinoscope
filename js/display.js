import { config } from "./config.js";
import { setZoomable } from "./zoom.js";

export function newDisplay(data, criterias, path) {
  
  const tree = createDisplayTree(data, criterias, path);

  let displayContainer = document.getElementById("display-content");
  displayContainer = addChildContainers(displayContainer, tree);
  const children = displayContainer.children;
  for (const child of children) {
    child.classList.add("zoomable");
  }
  const overviewElements = document.getElementsByClassName("overview");
  manageOverviewDisplay(overviewElements);
  setZoomable();
  optimizeContainerHeight();
  return displayContainer;
}

function createDisplayTree(data, criterias, paths) {
  let tree = {};
  if (paths.length === 0) {
    return data;
  } else {
    const path = paths[0];
    for (let criteria of criterias[path]) {
      const newData = data.filter((practitioner) =>
        (practitioner[path] &&
        // Filter by specility
        (practitioner[path].indexOf(criteria) !== -1 ||
        // Filter by cabinet
        practitioner[path].map(({name}) => name).indexOf(criteria) !== -1)) ||
        // filter by city
        practitioner.cabinets.map(({city}) => city).indexOf(criteria) !== -1
      );
      if (newData.length > 0) {
        tree[criteria] = createDisplayTree(newData, criterias, paths.slice(1, paths.length));
      }
    }
  }
  return tree;
}

function addChildContainers(rootElement, tree) {
  if (Array.isArray(tree)) {
    return addPractitionersCards(rootElement, tree);
  }
  const categories = Object.keys(tree);
  for (const category of categories) {
    let container = buildContainer(category);
    container = addChildContainers(container, tree[category]);

    let titleContainer = document.createElement("div");
    titleContainer.classList.add("title-container");
    let title = document.createElement("p");
    title.innerHTML = category;
    title.classList.add("category-title");
    titleContainer.appendChild(title);

    const wrapper = document.createElement("div");
    wrapper.classList.add("container-wrapper");
    wrapper.appendChild(titleContainer);
    wrapper.appendChild(container);
    rootElement.appendChild(wrapper);
  }
  return rootElement;
}

function buildContainer(category) {
  let container = document.createElement("div");
  container.classList.add("container");
  container.classList.add("overview");
  return container;
}

function addPractitionersCards(rootElement, practitioners) {
  for (const practitioner of practitioners) {
    rootElement.appendChild(buildPractitionerCard(practitioner));
  }
  return rootElement;
}

function buildPractitionerCard(practitioner) {
  const img = document.createElement("img");
  img.src = "./assets/profile.png";
  img.classList.add("practitioner-card");
  return img;
}

function manageOverviewDisplay(overviewElements) {
  for (let i=0; i < overviewElements.length; i++) {
    const element = overviewElements[i];
    const nbElements = element.childElementCount;
    const [nbColumns, nbLines] = computeNbColAndLines(nbElements);
    let gridTemplateColumns = "";
    for (let i=0; i < nbColumns; i++) {
      gridTemplateColumns += "1fr ";
    }
    let gridTemplateRows = "";
    for (let i=0; i < nbLines; i++) {
      gridTemplateRows += "1fr ";
    }
    element.style["grid-template-columns"] = gridTemplateColumns;
    element.style["grid-template-rows"] = gridTemplateRows;
  }
}

function computeNbColAndLines(nbElements) {
  const nbColumns = Math.ceil(Math.sqrt(nbElements));
  const nbLines = Math.ceil(nbElements / nbColumns);
  return [nbColumns < 2 ? 2 : nbColumns, nbLines < 2 ? 2 : nbLines];
}

function optimizeContainerHeight() {
  const containers = document.querySelectorAll(".container");
  const displayContainer = document.getElementById('display-container');
  const ratio = displayContainer.clientHeight / displayContainer.clientWidth;
  containers.forEach((container) => {
    const nbContainers = getNbContainers(container);
    const [nbCol, nbLines] = computeNbColAndLines(nbContainers);
    let height = Math.round((container.parentElement.parentElement.clientHeight/nbLines)*0.80);
    const newHeight = Math.round(ratio*container.offsetWidth);
    if (newHeight < height) {
      height = newHeight;
    }
    const width = (container.parentElement.parentElement.clientWidth / nbCol) * 0.85;
    container.style.height = `${height}px`;
    container.style.width = `${width}px`;


  });
}

function getNbContainers(container) {
  const sameLevelHtmlElements = Array.from(container.parentElement.parentElement.children);
  return sameLevelHtmlElements.filter((element) => element.classList.contains("container-wrapper")).length;
}
