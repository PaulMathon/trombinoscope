import { newDisplay } from "./display.js";

export function manageDisposition(data, criterias) {
  function onChangeDisposition(newDisposition) {
    return () => {
      const displayContainer = document.getElementById("display-content");
      while (displayContainer.firstChild) {
        displayContainer.removeChild(displayContainer.firstChild);
      }
      newDisplay(data, criterias, newDisposition);
    };
  }

  const specialityButton = document.getElementById("speciality-btn");
  specialityButton.focus();
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
