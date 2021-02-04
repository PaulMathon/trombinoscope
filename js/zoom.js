

export function setZoomable() {
  const container = document.getElementById("display-container");
  const content = document.getElementById("display-content");
  const scroller = new Scroller(function(left, top, zoom) {
    content.style.transform = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
  }, {
    zooming: true,
  });
  const rect = container.getBoundingClientRect();
  scroller.setPosition(0, 0);
  let containerWidth = container.clientWidth;
  let containerHeight = container.clientHeight;
  let contentWidth = content.clientWidth;
  let contentHeight = content.clientHeight;
  scroller.setDimensions(containerWidth, containerHeight, contentWidth, contentHeight);

  const zoomableElements = document.getElementsByClassName("zoomable");
  
  for (const zoomableEl of zoomableElements) {
    const onZoom = (event) => {
      const [nbCol, nbLines] = computeNbColAndLines(zoomableElements.length);
      const [coordX, coordY] = computeCoords(zoomableEl, [nbCol, nbLines]);
      console.log("heyy", coordX, coordY);
      if (zoomableEl.classList.contains("zoomable")) {
        zoomableEl.classList.remove("zoomable");
        scroller.scrollTo(coordX*contentWidth/nbCol, coordY*contentHeight / nbLines, true, 2.5);
      } else {
        zoomableEl.classList.add("zoomable");
        scroller.scrollTo(0, 0, true, 1);

      }
    };
    zoomableEl.addEventListener("click", onZoom);
  }
}

function computeCoords(zoomableEl, [nbCol, nbLines]) {
  const [Xidx, Yidx] =  computeBoxIndices(zoomableEl, [nbCol, nbLines]);
  return [Xidx - ((nbCol-1)/2), Yidx - ((nbLines-1)/2)];
}


function computeBoxIndices(element, [nbCol, nbLines]) {
  return [
    Math.round(element.offsetLeft / (element.parentElement.clientWidth / nbCol)),
    Math.round(element.offsetTop / (element.parentElement.clientHeight / nbLines)),
  ];
}

function computeNbColAndLines(nbElements) {
  const nbColumns = Math.ceil(Math.sqrt(nbElements));
  const nbLines = Math.ceil(nbElements/nbColumns);
  return [nbColumns, nbLines];
}
