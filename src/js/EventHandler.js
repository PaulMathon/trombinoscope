import { PractitionerCard } from "./Window.js";
import { UI } from "./UI.js";

export class EventHandler {

  constructor(context) {
    this.context = context;
    // Disposition button
    this.onDisposition();
    // Zoom in
    this.onZoom(this.context.contextPath[0]);
    // Context Path | Zoom out
    this.initContextPathEvents();
    // Search
    this.initSearchEvents();
  }

  onDisposition() {
    const specialityButton = document.getElementById("speciality-btn");
    specialityButton.classList.add("active");
  
    document.getElementById("none-btn").addEventListener("click",
      this.context.changeDisposition("none")
    );
    specialityButton.addEventListener("click",
      this.context.changeDisposition("speciality")
    );
    specialityButton.classList.add("focus");
    document.getElementById("city-btn").addEventListener("click",
      this.context.changeDisposition("city")
    );
    document.getElementById("cabinet-btn").addEventListener("click",
      this.context.changeDisposition("cabinet")
    );
  }

  onZoom(window) {
    window.children.forEach((zoomable) => {
      const onZoom = () => {
        if (this.context.contextPath.map(({name}) => name).indexOf(zoomable.name) === -1 &&
        !(zoomable instanceof PractitionerCard)) {
          this.context.next(zoomable);
        }
      };
      zoomable.htmlElement.addEventListener("click", onZoom);
    });
  }

  initContextPathEvents() {
    const contextContainer = document.getElementById("context-container");
    while (contextContainer.children.length > 1) {
      contextContainer.lastChild.remove();
    }
    contextContainer.childNodes.forEach((child) => 
      child.addEventListener("click", this.onPreviousContext())
    );
  }

  onPreviousContext() {
    const contextPath = this.context.contextPath;
    return (event) => {
      let currentWindow = contextPath[contextPath.length - 1];
      const windowToGoBack = event.target.id;
      while (currentWindow.name !== windowToGoBack) {
        this.context.previous();
        currentWindow = contextPath[contextPath.length - 1];
      }
    };
  }

  initSearchEvents() {

    document.getElementById("search-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        return this.context.onSearch();
      });

    document.getElementById("search-btn")
      .addEventListener("click", this.context.onSearch());

    document.getElementById("reset-search-btn")
      .addEventListener("click", this.context.onResetSearch());
  }
}