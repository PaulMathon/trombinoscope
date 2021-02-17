import { createDisplay } from "./display.js";
import {config} from "./config.js";

export function manageDisposition(context, data, criterias) {
  let currentDisposition=config.defaultPath;
  function onChangeDisposition(criteria) {
    return (event) => {
      switchActiveButton(event.target);
      currentDisposition = getDisposition(context.path, currentDisposition, criteria);

      const displayContainer = document.getElementById("display-content");
      while (displayContainer.firstChild) {
        displayContainer.removeChild(displayContainer.firstChild);
      }
      const newCurrentWindow = createDisplay(data, criterias, currentDisposition);
      context.reset(newCurrentWindow);
    };
  }

  const specialityButton = document.getElementById("speciality-btn");
  specialityButton.classList.add("active");

  document.getElementById("none-btn").addEventListener("click",
    onChangeDisposition([])
  );
  specialityButton.addEventListener("click",
    onChangeDisposition("specialities")
  );
  specialityButton.classList.add("focus");
  document.getElementById("city-btn").addEventListener("click",
    onChangeDisposition("cities")
  );
  document.getElementById("cabinet-btn").addEventListener("click",
    onChangeDisposition("cabinets")
  );
}

function switchActiveButton(activeButton) {
  const dispositionButtons = document.querySelectorAll("#disposition-container button");
  dispositionButtons.forEach((button) => button.classList.remove("active"));
  activeButton.classList.add("active");
}

function getDisposition(path, dispositionPath, criteria) {
  const pastPath = dispositionPath.slice(0, path.length - 1);
  let nextPath = pastPath.length >= 2 ? [] : [criteria];
  if (pastPath.length === 0) {
    nextPath.push(criteria === "specialities" ? "cabinets" : "specialities");
  }
  return pastPath.concat(nextPath);
}
