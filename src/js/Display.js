import { Window, PractitionerCard } from "./Window.js";
import { fitText } from "./lib/fitText.js";
import { UI } from "./UI.js";

/**
 * Create a display of windows and sub-windows according to the
 * practitioners and a dispositionPath
 */
export class Display {

  constructor(config, criterias) {
    this.dispositionPath = config.defaultPath;
    this.defaultProfileUrl = config.defaultProfileUrl;
    this.criterias = criterias;
  }

  new(data, dispositionPath) {
    this.dispositionPath = dispositionPath ? dispositionPath : this.dispositionPath;
  
    const displayContent = document.getElementById("display-content");
    UI.emptyElementContent(displayContent);

    if (data.length > 0) {
      const mainWindow = createWindow(data, this.criterias, this.dispositionPath, this.defaultProfileUrl, "home");
      document.getElementById("display-content").appendChild(mainWindow.htmlElement);
      fitText();
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
}

function createWindow(data, criterias, dispositionPath, defaultProfileUrl, rootPath) {

  if (dispositionPath.length === 0) {
    const children = createPractitionerCards(data, defaultProfileUrl);
    return new Window(rootPath, children,
      UI.createWindowElement(children, rootPath));
  }
  else {
    const dispositionEl = dispositionPath[0];
    const practionerProperty = toPlural(dispositionEl);
    let children;
    if (practionerProperty) {
      children = [];
      for (let criteria of criterias[dispositionEl]) {
        const newData = data.filter((practitioner) =>
          (practitioner[practionerProperty] &&
          // Filter by speciality
          (practitioner[practionerProperty].indexOf(criteria) !== -1 ||
          // Filter by cabinet
          practitioner[practionerProperty].map(({name}) => name).indexOf(criteria) !== -1)) ||
          // Filter by city
          practitioner.cabinets.map(({city}) => city).indexOf(criteria) !== -1
        ); 
        if (newData.length > 0) {
          children.push(createWindow(newData, criterias, dispositionPath.slice(1, dispositionPath.length), defaultProfileUrl, criteria));
        }
      }
    } else {
      children = createPractitionerCards(data, defaultProfileUrl);
    }
    const htmlElement = UI.createWindowElement(children, rootPath);
    const window = new Window(rootPath, children, htmlElement);
    return window;
  }
}

function createPractitionerCards(data, defaultProfileUrl) {
  return data.map((practitioner) => 
    new PractitionerCard(
      practitioner,
      UI.buidPractitionerCardElement(practitioner, defaultProfileUrl),
      defaultProfileUrl
    )
  );
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

function toPlural(criteria) {
  switch (criteria) {
    case "speciality":
      return "specialities";
    case "cabinet":
      return "cabinets";
    case "city":
      return "cities";
  }
}

function adaptSizeToContent() {
  const elements = document.querySelectorAll('.window-title');
  
  if (elements.length <= 0) {
    return;
  }
  let minSize = parseInt(elements[0].style.fontSize.slice(0, -2));
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
