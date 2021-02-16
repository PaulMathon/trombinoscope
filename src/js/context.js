import { Zoomer } from "./zoom.js";
import { PractitionerCard } from "./window.js";

export class Context {

  constructor(config, window) {
    this.path = [window];
    this.currentWindow = window;
    this.zoomer = new Zoomer(config.zoomSpeedMs);
    this.activateZoom();
    initContextUi(this);
    this.scrollPosition = {scrollX: 0, scrollY: 0};
  }

  reset(newCurrentWindow) {
    this.path[this.path.length - 1] = newCurrentWindow;
    this.currentWindow = newCurrentWindow;
    this.activateZoom();
    initContextUi(this);
  }

  update(window) {
    const childrenName = this.currentWindow.children.map(({name}) => name);
    if (childrenName.indexOf(window.name) !== -1) {
      this.path.push(window);
      this.currentWindow = window;
      this.activateZoom();
      addContextPath(this, window);
    }
    else {
      this.update(this.path.pop());
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
    if (this.path.length === 1) {
      this.scrollPosition = {scrollX: 0, scrollY: 0};
    }
  }

  activateZoom() {
    console.log("ACTIVATE WINDOW", this.currentWindow);
    this.currentWindow.children.forEach((zoomable) => {
      const onZoom = () => {
        if (this.path.map(({name}) => name).indexOf(zoomable.name) === -1 &&
        !(zoomable instanceof PractitionerCard)) {
          this.zoomer.zoomIn(zoomable);
          this.update(zoomable);
        }
      };
      zoomable.htmlElement.addEventListener("click", onZoom);
    });
  }
}

function initContextUi(context) {
  const contextContainer = document.getElementById("context-container");
  contextContainer.childNodes.forEach((child) => {
    child.addEventListener("click", (event) => {
      context.rollBackContext(event.target.id);
    });
  });
}

function addContextPath(context, window) {
  const contextContainer = document.getElementById("context-container");

  const separator = document.createElement("p");
  separator.innerText = " ᐅ ";
  separator.style.marginLeft = "1%";
  separator.style.marginBottom = "0";
  contextContainer.appendChild(separator);

  const newContextPath = document.createElement("p");
  newContextPath.id = window.name;
  newContextPath.classList.add("path-btn");
  newContextPath.innerText = `${window.name}`;
  newContextPath.style.marginLeft = "1%";
  newContextPath.addEventListener("click", (event) => {
    context.rollBackContext(event.target.id);
  });

  contextContainer.appendChild(newContextPath);
}

function removeLastContextPath() {
  const contextContainer = document.getElementById("context-container");
  contextContainer.lastChild.remove();
  contextContainer.lastChild.remove();
}