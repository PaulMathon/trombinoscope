import { PractitionerCard, Window } from "./window.js";

export function createDisplay(data, criterias, paths) {

  const displayContent = document.getElementById("display-content");
  emptyContent(displayContent);

  if (data.length > 0) {
    const mainWindow = createWindow(data, criterias, paths, "home", null);
    document.getElementById("display-content").appendChild(mainWindow.htmlElement);

    optimizeTextSize();
    return mainWindow;
  }
  else {
    const errorMessage = document.createElement("p");
    errorMessage.id = "error-message";
    errorMessage.innerText = "Aucun praticien ne correspond à votre recherche...";
    displayContent.appendChild(errorMessage);
  }
}

function emptyContent(container) {
  if (container.children.length) {
    for (const child of container.children) {
      container.removeChild(child);
    }
  }
}

function createWindow(data, criterias, paths, rootPath) {

  if (paths.length === 0) {
    const children = createCards(data);
    return new Window(rootPath, children,
      buildWindowUi(children, rootPath));
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
    return window;
  }
}

function createCards(data) {
  return data.map((practitioner) => 
    new PractitionerCard(practitioner, buidPractitionerCardUi(practitioner)));
}

function buildWindowUi(children, containerName) {
  let container = document.createElement("div");
  container.classList.add("window");
  const content = createContent(children);
  if (containerName && containerName !== "home") {
    let title = document.createElement("p");
    title.innerHTML = containerName;
    title.classList.add("window-title");
    container.appendChild(title);
  } else {
    content.style.marginTop = "3%";
  }
  container.appendChild(content);

  return container;
}

export function buidPractitionerCardUi(practitioner) {
  const img = new Image();
  let tryCount = 1;
  const firstName = normalizeString(practitioner.firstName);
  const lastName = normalizeString(practitioner.lastName);
  img.onerror = () => {
    tryCount++;
    if (tryCount === 2) {
      img.src = `../assets/praticiens/${firstName}_${lastName}.jpg`;
    } else {
      img.src = "../assets/praticiens/profile.jpeg";
    }
  };
  img.src = `../assets/praticiens/${lastName}_${firstName}.jpg`;
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

function normalizeString(string) {
  return string.toLowerCase()
    .replace(" ", "-")
    .replace("ç", "c")
    .replace("ï", "i")
    .replace("î", "i")
    .replace("â", "a")
    .replace("à", "a")
    .replace("é", "e")
    .replace("è", "e")
    .replace("ê", "e");
}

function optimizeTextSize() {
  const titles = document.querySelectorAll(".window-title");
  titles.forEach((title) => window.fitText(title));
  adaptSizeToContent();

  window.addEventListener("resize", (event) => {
    setTimeout(() => {
      optimizeTextSize();
    }, 10);
  });
}

function adaptSizeToContent() {
  const elements = document.querySelectorAll('.window-title');
  let minSize = parseInt(elements[0].style.fontSize.slice(0, -2));

  if (elements.length < 0) {
    return;
  }
  const resizeText = (el) => {
    const newSize = parseInt(el.style.fontSize.slice(0, -2) - 1);
    if (newSize < minSize) {
      minSize = newSize;
    }
    el.style.fontSize = `${newSize}px`;
  };
  elements.forEach((el) => {
    while (el.scrollHeight > el.offsetHeight) {
      resizeText(el);
    }
  });
  return minSize;
}
