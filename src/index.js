import { config } from "./js/config.js";
import { fetchPractitioners, getCriterias } from "./js/data.js";
import { createDisplay } from "./js/display.js";
import { Context } from "./js/context.js";
import { manageDisposition } from "./js/disposition.js";

function main() {
  fetchPractitioners(config.dataUrl)
    .then((data) => {
      const criterias = getCriterias(data);
      const window = createDisplay(data, criterias, config.defaultPath);
      const context = new Context(window)
      manageDisposition(data, context, criterias);
    });
}

main();
