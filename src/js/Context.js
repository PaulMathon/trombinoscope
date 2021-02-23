import { Display } from "./Displays.js";
import { Disposition } from "./Dispositions.js";
import { Zoomer } from "./Zoomer.js";
import { SearchHandler } from "./SearchHandler.js";
import { Utils } from "./Utils.js";
import { EventHandler } from "./EventHandler.js";
import { UI } from "./UI.js";


/**
 * Manage actions according to the context
 * @param {object} config Main configuration of the application
 * @param {array} data Array of practitioners
 */
export class Context {

  constructor(config, data) {
    this.config = config;
    this.data = data;
    this.criterias = Utils.getCriterias(data);
    this.searchHandler = new SearchHandler(data, this.criterias);
    this.display = new Display(config, this.criterias);
    this.disposition = new Disposition(config.defaultPath);
    this.zoomer = new Zoomer(config.zoomSpeedMs);
    this.contextPath = [this.display.new(this.data)];
    this.eventHandler = new EventHandler(this);
  }

  getCurrentWindow() {
    return this.contextPath[this.contextPath.length - 1];
  }

  getZoomLevel() {
    return this.contextPath.length - 1;
  }

  replaceCurrentWindow(window) {
    this.contextPath[this.contextPath.length - 1] = window;
    this.eventHandler.onZoom(window);
  }

  previous() {
    if (this.contextPath.length > 1) {
      this.contextPath.pop();
      this.zoomer.zoomOut(this.getCurrentWindow());
      this.disposition.adaptOptions(this.getZoomLevel());
      this.eventHandler.onZoom(this.getCurrentWindow());
      UI.removeLastContextPath();
    }
  }

  next(window) {
    const childrenName = this.getCurrentWindow().children.map(({name}) => name);
    if (this.getCurrentWindow().name !== window.name && childrenName.indexOf(window.name) !== -1) {
      this.contextPath.push(window);
      this.zoomer.zoomIn(window);
      this.eventHandler.onZoom(window);
      this.disposition.adaptOptions(this.getZoomLevel());
      UI.addContextPath(window, this.eventHandler.onPreviousContext());
    }
  }

  onSearch() {
    return () => {
      const searchParams = this.searchHandler.getParams();
      // Filter on name
      const searchData = this.searchHandler.filter(searchParams.name);
      const dispositionPath = this.searchHandler.getDispositionPath(searchParams);
      let previousTimeout = 0;
      while (this.contextPath.length > 1) {
        this.previous();
        previousTimeout += this.config.zoomSpeedMs;
      }
      if (searchData.length < this.data.length) {
        UI.setResetSearchButtonVisibility(true);
      }
      const mainWindow = this.display.new(searchData, dispositionPath);
      this.replaceCurrentWindow(mainWindow);
      const windowPath = this.searchHandler.getWindowPath(mainWindow, dispositionPath, searchParams);
      this.disposition.updateDispositionPath(dispositionPath, this.getZoomLevel());
      // Wait before zoomOut finishes
      setTimeout(() => {
        this.replaceCurrentWindow(mainWindow);
        for (const window of windowPath) {
          this.next(window);
        }
      }, previousTimeout); 
    };
  }

  onResetSearch() {
    return () => {
      while (this.contextPath.length > 1) {
        this.previous();
      }
      const homeWindow = this.display.new(this.data);
      this.replaceCurrentWindow(homeWindow);
      this.eventHandler.onZoom(homeWindow);
      UI.setResetSearchButtonVisibility(false);
    };
  }


  changeDisposition(criteria) {
    return () => {
      const newDispositonPath = this.disposition.getNewDispositionPath(
        this.getZoomLevel(), criteria
      );
      this.disposition.updateDispositionPath(newDispositonPath, this.getZoomLevel());
      const lastContextPath = this.contextPath;
      this.contextPath[0] = this.display.new(this.data, newDispositonPath);
      for (let i=1; i<lastContextPath.length; i++) {
        this.contextPath[i] = this.contextPath[i-1].children.filter(
          ({name}) => lastContextPath[i].name === name)[0];
      }
      this.eventHandler.onZoom(this.getCurrentWindow());
    };
  }
}
