import { PractitionerCard } from "./Window.js";

/**
 * Handles all registered UI events: "click" or "submit" events
 * @param {object} context used to update context when events occur
 */
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

  /**
   * Init click listeners on disposition buttons
   */
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

  /**
   * Action when clicking on a window: zoom on the window
   * and set its sub-windows zoomable
   * @param {object} window to zoom in
   */
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

  /**
   * Add click event listener on the home button
   */
  initContextPathEvents() {
    document.getElementById("context-container")
      .children[0].addEventListener("click", this.onPreviousContext());
  }

  /**
   * Go back to the clicked path element
   * While the last element of the context path is not the corresponding
   * to the click path element, action this.context.previous() function
   */
  onPreviousContext() {
    const contextPath = this.context.contextPath;
    return (event) => {
      let currentWindow = contextPath[contextPath.length - 1];
      // The id of the path elements is the same used for window.name
      const windowToGoBack = event.target.id;
      while (currentWindow.name !== windowToGoBack) {
        this.context.previous();
        currentWindow = contextPath[contextPath.length - 1];
      }
    };
  }


  /**
   * Init events listener for the search (submit and clicks on buttons)
   */
  initSearchEvents() {

    document.getElementById("search-form")
      .addEventListener("submit", (event) => {
        // Avoid reeloading the page on submit
        event.preventDefault();
        return this.context.onSearch();
      });

    document.getElementById("search-btn")
      .addEventListener("click", this.context.onSearch());

    document.getElementById("reset-search-btn")
      .addEventListener("click", this.context.onResetSearch());
  }
}
