import { Zoomer } from "./zoom.js";

export class Context {

  constructor(window) {
    this.path = [window];
    this.currentWindow = window;
    this.zoomer = new Zoomer();
    this.zoomer.activateZoom(this);
    initContextUi(this);
  }

  reset(newCurrentWindow) {
    this.path[this.path.length - 1] = newCurrentWindow;
    this.currentWindow = newCurrentWindow;
    this.zoomer.activateZoom(this);
    initContextUi(this);
  }

  update(window) {
    console.log("update", this.currentWindow.children.map(({name}) => name));
    if (this.currentWindow.children.map(({name}) => name).indexOf(window.name) !== -1) {
      console.log("hey");
      this.path.push(window);
      this.currentWindow = window;
      this.zoomer.activateZoom(this);
      addContextPath(window);
    }
    else {
      while (this.path.length > 0) {
        const parent = this.path.pop();
        removeLastContextPath();
        console.log("ayo");


        if (parent === window) {
          return;
        }
        else if (parent) {

        }
      }
    }

    
  }

  rollBackContext(windowName) {
    while (this.path.length > 0 &&
      this.path[this.path.length - 1].name !== windowName) {
      const stepWindow = this.path.pop();
      this.currentWindow = this.path[this.path.length - 1];
      this.zoomer.zoomOut(stepWindow);
      removeLastContextPath();
      console.log("after zoom out", this.path);
    }
  }

  getScale() {
    return this.path.reduce((prevValue, value) => prevValue + value.nbColumns, 0);
  }
}

function initContextUi(context) {
  const contextContainer = document.querySelector("#context-container");
  contextContainer.childNodes.forEach((child) => {
    child.addEventListener("click", (event) => {
      context.rollBackContext(event.target.id);
    });
  });
}

function addContextPath(window) {
  const contextContainer = document.getElementById("context-container");

  const newContextPath = document.createElement("p");
  newContextPath.id = window.name;
  newContextPath.innerText = window.name;
  newContextPath.addEventListener("click", (event) => {
    rollBackContext(event.target.id);
  });

  contextContainer.appendChild(newContextPath);
}

function removeLastContextPath() {
  const contextContainer = document.getElementById("context-container");
  contextContainer.lastChild.remove();
}