import { config } from "./js/config.js";
import { Utils } from "./js/Utils.js";
import { Context } from "./js/Context.js";

function main() {
  Utils.fetchPractitioners(config.dataUrl)
    .then((data) => {
      document.querySelector(".lds-roller").style.display = "none";
      if (data.error) {
        return;
      }
      const context = new Context(config, data);
    });
}

main();
