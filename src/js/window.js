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
      for (let i=0; i < this.nbColumns; i++) {
        gridTemplateColumns += "1fr ";
      }
      let gridTemplateRows = "";
      for (let i=0; i < this.nbLines; i++) {
        gridTemplateRows += "1fr ";
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

  constructor({name, lastname, specialities, cabinets}, htmlElement) {
    this.practitioner = new Practitioner(name, lastname, specialities, cabinets);
    this.htmlElement = htmlElement;
  }
}

class Practitioner {
  constructor(name, lastname, specialities, cabinets) {
    this.name = name;
    this.lastname = lastname;
    this.cabinets = cabinets;
    this.specialities = specialities;
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

