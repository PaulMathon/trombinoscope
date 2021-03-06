import { Modal } from "./Modal.js";
import { tingle } from "./lib/tingle.js";


/**
 * 
 */
export class Window {

  constructor(name, children, htmlElement) {
    this.name = name;
    this.children = children;
    [this.nbColumns, this.nbLines] = computeNbColAndLines(this.children.length);
    this.htmlElement = this.manageGrid(htmlElement);
    [this.windowWidth, this.windowHeight] = computeWindowDims(this.htmlElement);
  }

  manageGrid(htmlElement) {
    const contentElement = htmlElement.querySelector(".overview");
    if (contentElement) {
      let gridTemplateColumns = "";
      const percentColumns = 100/this.nbColumns;

      for (let i=0; i < this.nbColumns; i++) {
        gridTemplateColumns += `${percentColumns.toFixed(1)}% `;
      }
      let gridTemplateRows = "";
      const percentRows = 100/this.nbLines;

      for (let i=0; i < this.nbLines; i++) {
        gridTemplateRows += `${percentRows.toFixed(1)}% `;
      }
      contentElement.style["grid-template-columns"] = gridTemplateColumns;
      contentElement.style["grid-template-rows"] = gridTemplateRows;
    }
    return htmlElement;
  }

  getDims() {
    const window = this.htmlElement.querySelector(".window");
    if (window) {
      return [window.clientWidth, window.clientHeight];
    }
    return [this.htmlElement.clientWidth, this.htmlElement.clientHeight];
  }
}

export class PractitionerCard {

  constructor(practitioner, htmlElement, defaultProfileUrl) {
    this.practitioner = practitioner;
    this.htmlElement = htmlElement;

    this.htmlElement.querySelector(".practitioner-img").addEventListener("click", this.openModal());
    this.htmlElement.querySelector(".practitioner-name").addEventListener("click", this.openModal());
    this.modal = new Modal(defaultProfileUrl);
  }

  openModal() {
    return () => {
      var modal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        beforeClose: function() {
          return true;
        }
      });

      // set content
      modal.setContent(this.modal.new(this.practitioner));

      // open modal
      modal.open();
    };
  }
}

/**
 * Compute the appropriate number of columns and lines
 * for a window according to its number of children
 * @param {int} nbElements number of elements in a grid
 * @returns {[int, int]} the number of columns and lines
 */
function computeNbColAndLines(nbElements) {
  const nbColumns = Math.ceil(Math.sqrt(nbElements));
  const nbLines = Math.ceil(nbElements / nbColumns);
  return [nbColumns < 2 ? 2 : nbColumns, nbLines < 2 ? 2 : nbLines];
}

function computeWindowDims(htmlElement) {
  const window = htmlElement.querySelector(".window");
  if (window) {
    return [window.clientWidth, window.clientHeight];
  }
  return [htmlElement.clientWidth, htmlElement.clientHeight];
}

