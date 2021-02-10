
export class Zoomer {

  constructor(zoomSpeedMs) {
    this.scroller = initZoom(zoomSpeedMs);
  }

  activateZoom(context) {
    const zoomables = context.currentWindow.children;
    zoomables.forEach((zoomable, index) => {
      const onZoom = () => {
        if (context.path.map(({name}) => name).indexOf(zoomable.name) === -1) {
          const {scaleX, scaleY} = context.getScale();
          const [coordX, coordY] = computeCoords(index,
            [context.currentWindow.nbColumns, context.currentWindow.nbLines],
            scaleX, scaleY);
          const [windowWidth, windowHeight] = context.currentWindow.getDims();
          this.scroller.scrollTo(
            coordX*windowWidth,coordY*windowHeight,true, scaleX);
          context.update(zoomable);
        } 
      };
      zoomable.htmlElement.addEventListener("click", onZoom);
    }); 
  }

  zoomOut(context) {
    const { scaleX } = context.getScale();
    const scale = scaleX / context.currentWindow.nbColumns;
    this.scroller.scrollTo(0, 0, true, scale);
  }
}

function initZoom(zoomSpeedMs) {
  const content = document.getElementById("display-content");
  const scroller = new Scroller((left, top, zoom) => {
    content.style.transform = 'translate3d(' + (-left) + 'px,' + (-top) + 'px,0) scale(' + zoom + ')';
    content.style.transition = `${zoomSpeedMs}ms`;
  }, { zooming: true });

  const container = document.getElementById("display-container");
  const rect = container.getBoundingClientRect();
  scroller.setPosition(0, 0);
  let containerWidth = container.clientWidth;
  let containerHeight = container.clientHeight;
  let contentWidth = content.clientWidth;
  let contentHeight = content.clientHeight;
  scroller.setDimensions(containerWidth, containerHeight, contentWidth, contentHeight);

  return scroller;
}

function computeCoords(windowIndex, [nbCol, nbLines], scaleX, scaleY) {
  const [Xidx, Yidx] =  computeWindowCoords(windowIndex, nbCol);
  return [
    Xidx - (scaleX - 1)/2,
    Yidx - (scaleY-1)/2,
  ];
}

/**
 * Compute the coordinates of an element in the grid of its parents
 * @param {HtmlElement} element the element to locate
 * @param {int} nbCol number of columns of the element's parent
 * @returns {[int, int]} the coordinates
 */
function computeWindowCoords(windowIndex, nbCol) {
  return [
    windowIndex%nbCol,
    ~~(windowIndex/nbCol),
  ];
}


