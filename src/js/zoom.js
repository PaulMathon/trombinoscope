
export class Zoomer {

  constructor(zoomSpeedMs) {
    this.scroller = initZoom(zoomSpeedMs);
  }

  activateZoom(context) {
    const zoomables = context.currentWindow.children;
    zoomables.forEach((zoomable, index) => {
      const onZoom = () => {
        if (context.currentWindow !== zoomable) {
          const [nbCol, nbLines] = computeNbColAndLines(zoomables.length);
          const [coordX, coordY] = computeCoords(index, [nbCol, nbLines]);
          console.log("coords", coordX, coordY);
          const htmlElement = context.currentWindow.htmlElement.querySelector(".window");
          this.scroller.scrollTo(
            coordX*htmlElement.clientWidth,
            coordY*htmlElement.clientHeight, true, context.getScale());
          context.update(zoomable);
        } 
      };
      zoomable.htmlElement.addEventListener("click", onZoom);
    }); 
  }

  zoomOut(context) {
    const scale = context.getScale() / context.currentWindow.nbColumns;
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

function computeCoords(zoomableEl, [nbCol, nbLines]) {
  const [Xidx, Yidx] =  computeWindowCoords(zoomableEl, nbCol);
  return [Xidx - ((nbCol-1)/2), Yidx - ((nbLines-1)/2)];
}

/**
 * Compute the coordinates of an element in the grid of its parents
 * @param {HtmlElement} element the element to locate
 * @param {int} nbCol number of columns of the element's parent
 * @returns {[int, int]} the coordinates
 */
function computeWindowCoords(index, nbCol) {
  return [
    index%nbCol,
    ~~(index/nbCol),
  ];
}

/**
 * Compute the appropriate number of columns and lines
 * for a window according to its number of children
 * @param {int} nbElements number of elements in a grid
 * @returns {[int, int]} the number of columns and lines
 */
function computeNbColAndLines(nbElements) {
  const nbColumns = Math.ceil(Math.sqrt(nbElements));
  const nbLines = Math.ceil(nbElements/nbColumns);
  return [nbColumns, nbLines];
}
