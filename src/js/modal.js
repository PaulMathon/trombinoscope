import { buidPractitionerCardUi } from "./Display.js";

export function createContent(practitioner) {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const img = buidPractitionerCardUi(practitioner);
  modalContainer.appendChild(img);

  const textContainer = document.createElement("div");
  const pName = document.createElement("p");
  pName.innerText = `Nom: ${practitioner.name}`;
  textContainer.appendChild(pName);

  const pSpeciliaties = document.createElement("p");
  pSpeciliaties.innerText = `Spécialité: ${practitioner.specialities
    .reduce((prevValue, value, index) =>prevValue +=
      `${value}${index+1 < practitioner.specialities.length ? " ● " : ""} `, "")
  }`;
  textContainer.appendChild(pSpeciliaties);

  const pCabinets = document.createElement("p");
  pCabinets.innerText = `Cabinets: ${practitioner.cabinets
    .reduce((prevValue, value, index) => prevValue +=
    `${value.name}${index+1 < practitioner.cabinets.length ? " ● " : ""} `, "")
  }`;
  textContainer.appendChild(pCabinets);

  const pPhones = document.createElement("p");
  pPhones.innerText = `Téléphones: ${practitioner.phones
    .reduce((prevValue, value, index) => prevValue +=
      `${value}${index+1 < practitioner.phones.length ? " ● " : ""}`, "")
  }`;
  textContainer.appendChild(pPhones);
  modalContainer.appendChild(textContainer);

  return modalContainer.outerHTML;
}
