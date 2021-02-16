import { createDisplay } from "./display.js";

export function manageDisposition(context, data, criterias) {
  function onChangeDisposition(newDisposition) {
    return (event) => {
      
      switchActiveButton(event.target);

      const displayContainer = document.getElementById("display-content");
      while (displayContainer.firstChild) {
        displayContainer.removeChild(displayContainer.firstChild);
      }
      const newCurrentWindow = createDisplay(data, criterias, newDisposition);
      context.reset(newCurrentWindow);
    };
  }

  const specialityButton = document.getElementById("speciality-btn");
  specialityButton.classList.add("active");

  specialityButton.addEventListener("click",
    onChangeDisposition(["specialities", "cabinets"])
  );
  specialityButton.classList.add("focus");
  document.getElementById("city-btn").addEventListener("click",
    onChangeDisposition(["cities", "specialities"])
  );
  document.getElementById("cabinet-btn").addEventListener("click",
    onChangeDisposition(["cabinets", "specialities"])
  );
}

function switchActiveButton(activeButton) {
  const dispositionButtons = document.querySelectorAll("#disposition-container button");
  dispositionButtons.forEach((button) => button.classList.remove("active"));
  activeButton.classList.add("active");
}
