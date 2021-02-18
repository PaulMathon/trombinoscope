export class Zoomer {

  constructor(zoomSpeedMs) {
    const content = document.getElementById("display-content");
    this.scroller = initZoom(zoomSpeedMs, content);
    this.zoomSpeedMs = zoomSpeedMs;
  }

  zoomIn(window) {
    const container = document.getElementById("display-container");
    let scale = container.clientWidth / window.htmlElement.clientWidth;
    if (window.htmlElement.clientHeight * scale > container.clientHeight) {
      scale = container.clientHeight / window.htmlElement.clientHeight;
    }
    const [coordX, coordY] = computeCoords(window.htmlElement);
    this.scroller.scrollTo(coordX, coordY, true, scale);
  }

  zoomOut(window) {
    const container = document.getElementById("display-container");
    let scale = container.clientWidth / window.htmlElement.clientWidth;
    if (window.name === "home") {
      scale = 1;
    }
    const [coordX, coordY] = computeCoords(window.htmlElement);
    this.scroller.scrollTo(coordX, coordY, true, scale);
  }
}

function initZoom(zoomSpeedMs, content) {
  const scroller = new Scroller((left, top, zoom) => {
    content.style.transform = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
    content.style.transition = `${zoomSpeedMs}ms`;
  }, { zooming: true });

  const container = document.getElementById("display-container");
  scroller.setPosition(0, 0);
  let containerWidth = container.clientWidth;
  let containerHeight = container.clientHeight;
  scroller.setDimensions(containerWidth, containerHeight, containerWidth, containerHeight);

  return scroller;
}

function computeCoords(element) {
  const content = document.getElementById("display-content");
  return [
    element.offsetLeft - (content.clientWidth / 2) + (element.clientWidth / 2),
    element.offsetTop - (content.clientHeight / 2) + (element.clientHeight / 2),
  ];
}
