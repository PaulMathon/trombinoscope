import { config } from "./js/config.js";
import { fetchPractitioners, getCriterias } from "./js/data.js";
import { createDisplay } from "./js/display.js";
import { Context } from "./js/context.js";
import { manageDisposition } from "./js/disposition.js";
import { initSearchUi } from "./js/search.js";

function main() {
  fetchPractitioners(config.dataUrl)
    .then((data) => {
      document.querySelector(".lds-roller").style.display = "none";
      const criterias = getCriterias(data);
      const window = createDisplay(data, criterias, config.defaultPath);
      const context = new Context(config, window)
      manageDisposition(data, context, criterias);
      initSearchUi(data, criterias);
    });
}

main();
