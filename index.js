import { fetchPractitioners, getCriterias } from "./js/data.js";
import { newDisplay } from "./js/display.js";
import { manageDisposition } from "./js/disposition.js";
import { setZoomable } from "./js/zoom.js";

function main() {
  fetchPractitioners()
    .then((data) => {
      const criterias = getCriterias(data);
      manageDisposition(data, criterias);
      newDisplay(data, criterias, ["specialities", "cabinets"]);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  main();
});

