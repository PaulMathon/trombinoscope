import { UI } from "./UI.js";


/**
 * 
 */
export class Modal {
  constructor(defaultProfileUrl) {
    this.defaultProfileUrl = defaultProfileUrl;
  }

  new(practitioner) {
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    const img = UI.buidPractitionerCardElement(practitioner, this.defaultProfileUrl);
    modalContainer.appendChild(img);

    const textContainer = document.createElement("div");
    textContainer.classList.add("textcontainer");
    const h2Name = document.createElement("h2");
    h2Name.innerText = `Dr. ${practitioner.lastName}`;
    textContainer.appendChild(h2Name);

    const pSpeciliaties = document.createElement("p");
    pSpeciliaties.innerText = `Spécialité(s) : ${practitioner.specialities
      .reduce((prevValue, value, index) =>prevValue +=
        `${value}${index+1 < practitioner.specialities.length ? " ● " : ""} `, "")
    }`;
    textContainer.appendChild(pSpeciliaties);

    const pCabinetTitle = document.createElement("p");
    pCabinetTitle.innerText = "Cabinets :";
    textContainer.appendChild(pCabinetTitle);

    const cabinetList = document.createElement("ul");
    practitioner.cabinets.forEach(({name, city, postalCode, address, phone}) => {
      const li = document.createElement("li");
      li.innerText = `${name}: ${city}, ${postalCode}, ${address}, ${phone}`;
      cabinetList.appendChild(li);
    });
    textContainer.appendChild(cabinetList);

    const pPhones = document.createElement("p");
    pPhones.innerText = `Téléphones: ${practitioner.cabinets
      .reduce((prevValue, {phone}, index) => prevValue +=
        `${phone}${index+1 < practitioner.cabinets.length ? " ● " : ""}`, "")
    }`;
    textContainer.appendChild(pPhones);
    modalContainer.appendChild(textContainer);

    return modalContainer.outerHTML;
  }
}
