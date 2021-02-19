import { Disposition } from "./Disposition.js";

export class UI {

}

UI.addContextPath = function(window, onClick) {
  const contextContainer = document.getElementById("context-container");

  const separator = document.createElement("p");
  separator.innerText = " ᐅ ";
  separator.style.marginLeft = "1%";
  separator.style.marginBottom = "0";
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
  const dispositionButtons = document.querySelectorAll("#disposition-container button");
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
