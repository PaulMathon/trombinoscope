import { fetchPractitioners, getCriterias } from "./js/data.js";
import { newDisplay } from "./js/display.js";
import { manageDisposition } from "./js/disposition.js";

function main() {
  fetchPractitioners()
    .then((data) => {
      const criterias = getCriterias(data);
      manageDisposition(data, criterias);
      const displayContainer = newDisplay(data, criterias, ["specialities", "cabinets"]);
    });

  const zoomableElements = document.getElementsByClassName("zoomable");
  for (let i=0; i < zoomableElements.length; i++) {
    const element = zoomableElements[i];
    element.addEventListener("click", (event) => {
      if (element.classList.contains("zoom")) {
        element.parentElement.style.width = "100%";
        element.parentElement.style.height = "100%";
        element.parentElement.style.transform = "translate(0, 0)";
        element.classList.remove("zoom");
      } else {
        element.parentElement.style.width = `${nbColumns*100}%`;
        element.parentElement.style.height = `${nbLines*100}%`;
        element.parentElement.style.transform =
          `translate(-${element.offsetLeft*3}px, 0px)`;
        element.classList.add("zoom");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});

