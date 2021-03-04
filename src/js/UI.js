import { Disposition } from "./Disposition.js";
import { Utils } from "./Utils.js";

/**
 * Static class that handles every UI modifications
 */
export class UI {

}

UI.createWindowElement = function(children, containerName) {
  let container = document.createElement("div");
  container.classList.add("window");
  const content = createOverviewElement(children);
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
};

UI.buidPractitionerCardElement = function(practitioner, defaultProfileUrl) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("practitioner-container");

  const img = new Image();
  let fistError = true;
  img.onerror = () => {
    if (fistError) img.src = defaultProfileUrl;
    fistError = false;
  };
  img.src = practitioner.profileURL;
  img.classList.add("practitioner-img");

  const practitionerName = document.createElement("p");
  practitionerName.classList.add("practitioner-name");
  const span = document.createElement("span");
  span.innerText = `Dr ${practitioner.lastName}`;
  practitionerName.appendChild(span);

  cardContainer.appendChild(practitionerName);
  cardContainer.appendChild(img);
  return cardContainer;
};

UI.emptyElementContent = function(container) {
  if (container.children.length) {
    for (const child of container.children) {
      container.removeChild(child);
    }
  }
};

UI.addContextPath = function(window, onClick) {
  const contextContainer = document.getElementById("context-container");

  const separator = document.createElement("p");
  separator.innerText = " ᐅ ";
  separator.style.marginLeft = "1%";
  contextContainer.appendChild(separator);

  const newContextPath = document.createElement("p");
  newContextPath.id = window.name;
  newContextPath.classList.add("path-btn");
  newContextPath.innerText = `${window.name}`;
  newContextPath.style.marginLeft = "1%";
  newContextPath.addEventListener("click", onClick);

  contextContainer.appendChild(newContextPath);
};

UI.removeLastContextPath = function() {
  const contextContainer = document.getElementById("context-container");
  contextContainer.lastChild.remove();
  contextContainer.lastChild.remove();
};

UI.switchActiveDispositionElement = function(dispositionElement) {
  const newActiveButton = document.getElementById(`${dispositionElement}-btn`);
  const dispositionButtons = document.querySelectorAll(
    "#disposition-container #btn-container button"
  );
  dispositionButtons.forEach((button) => button.classList.remove("active"));
  newActiveButton.classList.add("active");
};

UI.setResetSearchButtonVisibility = function(visible) {
  const resetSearchButton = document.getElementById("reset-search-btn");
  if (visible) {
    resetSearchButton.style.visibility = "visible";
    resetSearchButton.style.opacity = 1;
  }
  else {
    resetSearchButton.style.visibility = "hidden";
    resetSearchButton.style.opacity = 0;
  }
};

UI.emptySearchInputs = function() {
  document.getElementById("input-name").value = "";
  document.getElementById("input-speciality").value = "";
  document.getElementById("input-cabinet").value = "";
  document.getElementById("input-city").value = "";
};

UI.keepDispositionOptions = function(optionsToKeep) {
  let lastElement = document.getElementById(`${Disposition.None}-btn`);
  lastElement.style["border-top-right-radius"] = 0;
  lastElement.style["border-bottom-right-radius"] = 0;
  [Disposition.Speciality, Disposition.City, Disposition.Cabinet].forEach((option) => {
    const dispositionButton = document.getElementById(`${option}-btn`);
    if (optionsToKeep.indexOf(option) === -1) {
      dispositionButton.classList.remove("visible");
      dispositionButton.classList.add("hidden");
    } else {
      lastElement = dispositionButton;
      dispositionButton.classList.add("visible");
      dispositionButton.classList.remove("hidden");
    }
    dispositionButton.style["border-top-right-radius"] = 0;
    dispositionButton.style["border-bottom-right-radius"] = 0;
  });
  lastElement.style["border-top-right-radius"] = "0.3em";
  lastElement.style["border-bottom-right-radius"] = "0.3em";
};

UI.setDispositionFocus = function(optionToFocus) {
  optionToFocus = optionToFocus || Disposition.None;
  ([
    Disposition.None, Disposition.Speciality,
    Disposition.Cabinet, Disposition.City
  ]).forEach((option) => {
    const optionButton = document.getElementById(`${option}-btn`);
    if (optionToFocus === option) {
      optionButton.classList.add("active");
    }
    else {
      optionButton.classList.remove("active");
    }
  });
};

UI.initSearchDatalists = function(data, criterias) {
  const names = data.map(({name}) => name)
    .sort((a, b) => a < b ? -1 : 1);
  Object.entries(criterias)
    .concat([["name", names]])
    .forEach(([criteria, categories]) => {
      const datalist = document.getElementById(`search-${criteria}`);
      for (const category of categories) {
        const option = document.createElement("option");
        option.value = category;
        datalist.appendChild(option);
      }
    });
};

UI.showError = function({error, message}) {
  const errorContainer = document.getElementById("error-container");
  errorContainer.querySelector("#error-title").innerText = error;
  errorContainer.querySelector("#error-message").innerText = message;
  errorContainer.classList.add("active");
  setTimeout(() => {
    errorContainer.classList.remove("active");
  }, 10000);
};

function createOverviewElement(children) {
  let content = document.createElement("div");
  content.classList.add("overview");
  for (const child of children) {
    content.appendChild(child.htmlElement); 
  }
  return content;
}
