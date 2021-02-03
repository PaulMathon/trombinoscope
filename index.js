import { fetchPractitioners } from "./js/data.js";

function computeNbColAndLines(nbElements) {
  const nbColumns = Math.ceil(Math.sqrt(nbElements));
  const nbLines = Math.ceil(nbElements / nbColumns);
  return [nbColumns, nbLines];
}

function main() {
  fetchPractitioners()
    .then(data=>{
      console.log(data);
    });
  const nbElements = 7;
  const [nbColumns, nbLines] = computeNbColAndLines(nbElements);
  let gridTempleColumns = "";
  for (let i=0; i < nbColumns; i++) {
    gridTempleColumns += "1fr ";
  }
  let gridTempleRows = "";
  for (let i=0; i < nbLines; i++) {
    gridTempleRows += "1fr ";
  }
  const overviewElements = document.getElementsByClassName("overview");
  for (let i=0; i < overviewElements.length; i++) {
    const element = overviewElements[i];
    element.style["grid-template-columns"] = gridTempleColumns;
    element.style["grid-template-rows"] = gridTempleRows;
  }

  const zoomableElements = document.getElementsByClassName("zoomable");
  for (let i=0; i < zoomableElements.length; i++) {
    const element = zoomableElements[i];
    element.addEventListener("click", (event) => {
      if (element.classList.contains("zoom")) {
        element.parentElement.style.width = "100%";
        element.parentElement.style.height = "100%";
        console.log(element.parentElement);
        element.parentElement.style.transform = "translate(0, 0)";
        element.classList.remove("zoom");
      } else {
        console.log("HEllo", element);
        element.parentElement.style.width = `${nbColumns*100}%`;
        element.parentElement.style.height = `${nbLines*100}%`;
        console.log(element.parentElement);
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

