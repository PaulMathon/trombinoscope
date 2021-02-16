import { Zoomer } from "./zoom.js";

export class Context {

  constructor(config, window) {
    this.path = [window];
    this.currentWindow = window;
    this.zoomer = new Zoomer(config.zoomSpeedMs);
    this.zoomer.activateZoom(this);
    initContextUi(this);
    this.scrollPosition = {scrollX: 0, scrollY: 0};
  }

  reset(newCurrentWindow) {
    this.path[this.path.length - 1] = newCurrentWindow;
    this.currentWindow = newCurrentWindow;
    this.zoomer.activateZoom(this);
    initContextUi(this);
  }

  update(window) {
    const childrenName = this.currentWindow.children.map(({name}) => name);
    if (childrenName.indexOf(window.name) !== -1) {
      this.path.push(window);
      this.currentWindow = window;
      this.zoomer.activateZoom(this);
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