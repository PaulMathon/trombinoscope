import { buidPractitionerCardUi } from "./Display.js";


/**
 * 
 */
export class Modal {
  constructor(mediaPath) {
    this.mediaPath = mediaPath;
  }

  new(practitioner) {
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    const img = buidPractitionerCardUi(practitioner, this.mediaPath);
    modalContainer.appendChild(img);

    const textContainer = document.createElement("div");
    const h2Name = document.createElement("h2");
    h2Name.innerText = `Dr. ${practitioner.lastName}`;
    textContainer.appendChild(h2Name);

    const pSpeciliaties = document.createElement("p");
    pSpeciliaties.innerText = `Spécialité: ${practitioner.specialities
      .reduce((prevValue, value, index) =>prevValue +=
        `${value}${index+1 < practitioner.specialities.length ? " ● " : ""} `, "")
    }`;
    textContainer.appendChild(pSpeciliaties);

    const pCabinetTitle = document.createElement("p");
    pCabinetTitle.innerText = "Cabinets:";
    textContainer.appendChild(pCabinetTitle);

    const cabinetList = document.createElement("ul");
    practitioner.cabinets.forEach(({name, city, postalCode, address}) => {
      const li = document.createElement("li");
      li.innerText = `${name}: ${city}, ${postalCode}, ${address}`;
      cabinetList.appendChild(li);
    });
    textContainer.appendChild(cabinetList);

    const pPhones = document.createElement("p");
    pPhones.innerText = `Téléphones: ${practitioner.phones
      .reduce((prevValue, value, index) => prevValue +=
        `${value}${index+1 < practitioner.phones.length ? " ● " : ""}`, "")
    }`;
    textContainer.appendChild(pPhones);
    modalContainer.appendChild(textContainer);

    return modalContainer.outerHTML;
  }
}
