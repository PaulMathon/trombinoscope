
export class Zoomer {

  constructor(zoomSpeedMs) {
    const content = document.getElementById("display-content");
    this.scroller = initZoom(zoomSpeedMs, content);
    this.zoomSpeedMs = zoomSpeedMs;
  }

  activateZoom(context) {
    const container = document.getElementById("display-container");
    const zoomables = context.currentWindow.children;
    zoomables.forEach((zoomable) => {
      const onZoom = () => {
        if (context.path.map(({name}) => name).indexOf(zoomable.name) === -1) {

          const scale = container.clientWidth / zoomable.htmlElement.clientWidth;
          const [coordX, coordY] = computeCoords(zoomable.htmlElement); 
          this.scroller.scrollTo(coordX, coordY, true, scale);
          
          context.update(zoomable);
        } 
      };
      zoomable.htmlElement.addEventListener("click", onZoom);
    }); 
  }

  zoomIn(window) {

  }

  zoomOut(context) {
    const { scaleX } = context.getScale();
    const scale = scaleX / context.currentWindow.nbColumns;
    this.scroller.scrollTo(0, 0, true, scale);
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
  let contentWidth = content.clientWidth;
  let contentHeight = content.clientHeight;
  scroller.setDimensions(containerWidth, containerHeight, contentWidth, contentHeight);

  return scroller;
}

function computeCoords(element) {
  const content = document.getElementById("display-content");
  return [
    element.offsetLeft - (content.clientWidth / 2) + (element.clientWidth / 2),
    element.offsetTop - (content.clientHeight / 2) + (element.clientHeight / 2),
  ];
}
