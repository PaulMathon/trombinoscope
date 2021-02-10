import { Zoomer } from "./zoom.js";

export class Context {

  constructor(config, window) {
    this.path = [window];
    this.currentWindow = window;
    this.zoomer = new Zoomer(config.zoomSpeedMs);
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
    console.log("update", window);
    if (this.currentWindow.children.map(({name}) => name).indexOf(window.name) !== -1) {
      this.path.push(window);
      this.currentWindow = window;
      this.zoomer.activateZoom(this);
      addContextPath(this, window);
    }
    else {
      while (this.path.length > 0) {
        const parent = this.path.pop();
        removeLastContextPath();

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
      this.path.pop();
      this.currentWindow = this.path[this.path.length - 1];
      this.zoomer.zoomOut(this);
      removeLastContextPath();
    }
  }

  getScale() {
    console.log(this.path);
    return this.path.reduce((prevValue, value) => prevValue * value.nbColumns, 1);
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

function addContextPath(context, window) {
  const contextContainer = document.getElementById("context-container");

  const newContextPath = document.createElement("p");
  newContextPath.id = window.name;
  newContextPath.classList.add("path-btn");
  newContextPath.innerText = `${window.name} >`;
  newContextPath.style.marginLeft = "1%";
  newContextPath.addEventListener("click", (event) => {
    context.rollBackContext(event.target.id);
  });

  contextContainer.appendChild(newContextPath);
}

function removeLastContextPath() {
  const contextContainer = document.getElementById("context-container");
  contextContainer.lastChild.remove();
}