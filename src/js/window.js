export class Window {

  constructor(name, children, htmlElement) {
    this.name = name;
    this.children = children;
    [this.nbColumns, this.nbLines] = computeNbColAndLines(this.children.length);
    this.htmlElement = this.manageGrid(htmlElement);
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

function computeNbColAndLines(nbElements) {
  const nbColumns = Math.ceil(Math.sqrt(nbElements));
  const nbLines = Math.ceil(nbElements / nbColumns);
  return [nbColumns < 2 ? 2 : nbColumns, nbLines < 2 ? 2 : nbLines];
}

