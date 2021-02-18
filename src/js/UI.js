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
  [Disposition.Speciality, Disposition.Cabinet, Disposition.City].forEach((option) => {
    if (optionsToKeep.indexOf(option) === -1) {
      document.getElementById(`${option}-btn`).style.display = "none";
    } else {
      document.getElementById(`${option}-btn`).style.display = "block";
    }
  });
};

UI.setDispositionFocus = function(optionToFocus) {
  [
    Disposition.None, Disposition.Speciality,
    Disposition.Cabinet, Disposition.City
  ].forEach((option) => {
    const optionButton = document.getElementById(`${option}-btn`);
    if (optionToFocus === option) {
      optionButton.classList.add("active");
    }
    else {
      optionButton.classList.remove("active");
    }
  });
};
