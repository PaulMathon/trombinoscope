import { config } from "./js/config/config.dev.js";
import { Utils } from "./js/Utils.js";
import { Context } from "./js/Contexts.js";

function main() {
  Utils.fetchPractitioners(config.dataUrl)
    .then((data) => {
      document.querySelector(".lds-roller").style.display = "none";
      if (data.error) {
        return;
      }
      new Context(config, data);
    });
}

main();
