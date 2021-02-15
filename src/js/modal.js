import { buidPractitionerCardUi } from "./display.js";

export function createContent(practitioner) {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const img = buidPractitionerCardUi(practitioner);
  modalContainer.appendChild(img);

  const textContainer = document.createElement("div");
  const pName = document.createElement("p");
  pName.innerText = `Prénom: ${practitioner.name}`;
  textContainer.appendChild(pName);

  const pLastName = document.createElement("p");
  pLastName.innerText = `Nom: ${practitioner.lastname}`;
  textContainer.appendChild(pLastName);

  const pSpeciliaties = document.createElement("p");
  pSpeciliaties.innerText = `Spécialité: ${practitioner.specialities.reduce((prevValue, value) => prevValue += `${value}, `, "")}`;
  textContainer.appendChild(pSpeciliaties);

  const pCabinets = document.createElement("p");
  pCabinets.innerText = `Cabinets: ${practitioner.cabinets.reduce((prevValue, value) => prevValue += `${value.name}, `, "")}`;
  textContainer.appendChild(pCabinets);
  modalContainer.appendChild(textContainer);

  return modalContainer.outerHTML;
}
