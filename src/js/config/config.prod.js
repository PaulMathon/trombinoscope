import "./../../index.css";

export const config = {
  environment: "prod",
  defaultProfileUrl: "http://intercard-intranet.com/wp-content/uploads/2021/02/profile.png",
  dataUrl: "https://script.google.com/macros/s/AKfycbxA5bopu-OcyiugvQESWkgTy0ude_n_dXaUGF9L1Ij8qirIXAqEw4a55A/exec",
  defaultPath: ["speciality", "cabinet"],
  zoomSpeedMs: 500,
};

/**
 * WordPress specific
 */
const header = document.querySelector("header");
if (header) {
  header.style.height = "23vh";
}
const content = document.querySelector("#content");
if (content) {
  content.style.height = "77vh";
}
