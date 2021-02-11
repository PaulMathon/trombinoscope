import { PractitionerCard, Window } from "./window.js";

export function createDisplay(data, criterias, paths) {
  const window = createWindow(data, criterias, paths, "home", null);

  document.getElementById("display-content").appendChild(window.htmlElement);
  return window;
}

function createWindow(data, criterias, paths, rootPath) {

  if (paths.length === 0) {
    const children = createCards(data);
    return new Window("practitioner",
      children,
      buildWindowUi(children)
    );
  }
  else {
    const path = paths[0];
    let children = [];
    for (let criteria of criterias[path]) {
      const newData = data.filter((practitioner) =>
        (practitioner[path] &&
        // Filter by speciality
        (practitioner[path].indexOf(criteria) !== -1 ||
        // Filter by cabinet
        practitioner[path].map(({name}) => name).indexOf(criteria) !== -1)) ||
        // Filter by city
        practitioner.cabinets.map(({city}) => city).indexOf(criteria) !== -1
      ); 
      if (newData.length > 0) {
        children.push(createWindow(newData, criterias, paths.slice(1, paths.length), criteria));
      }
    }
    const htmlElement = buildWindowUi(children, rootPath);
    const window = new Window(rootPath, children, htmlElement);
    setUpParent(window, null);
    return window;
  }
}

function createCards(data) {
  return data.map((practitioner) => 
    new PractitionerCard(practitioner, buidPractitionerCardUi(practitioner)));
}

function buildWindowUi(children, containerName) {
  let container = document.createElement("div");
  container.classList.add("window")
  if (containerName && containerName !== "home") {
    let title = document.createElement("p");
    title.innerHTML = containerName;
    container.appendChild(title);
  }
  const content = createContent(children);
  container.appendChild(content);

  return container;
}

function buidPractitionerCardUi(practitioner) {
  const img = new Image();
  let tryCount = 1;
  const name = normalizeString(practitioner.name);
  const lastname = normalizeString(practitioner.lastname);
  img.onerror = () => {
    tryCount++;
    if (tryCount === 2) {
      img.src = `../assets/praticiens/${lastname}_${name}.jpg`;
    } else {
      img.src = "../assets/praticiens/profile.jpeg";
    }
  };
  img.src = `../assets/praticiens/${name}_${lastname}.jpg`;
  img.classList.add("practitioner-card");
  return img;
}

function createContent(children) {
  let content = document.createElement("div");
  content.classList.add("overview");
  for (const child of children) {
    content.appendChild(child.htmlElement); 
  }
  return content;
}

function setUpParent(window, parent) {
  window.parent = parent;
  if (window.children && window.children.length > 0) {
    for (const child of window.children) {
      setUpParent(child, window);
    }
  }
  return window;
}

function normalizeString(string) {
  return string.toLowerCase()
    .replace(" ", "-")
    .replace("ç", "c")
    .replace("é", "e");
}
