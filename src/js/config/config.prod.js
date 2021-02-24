import "./../../index.css";

export const config = {
  environment: "prod",
  defaultProfileUrl: "http://intercard-intranet.com/wp-content/uploads/2021/02/profile.png",
  dataUrl: "https://script.google.com/macros/s/AKfycbywa_fzotVjoX96bdDzstaYtqUOlt-SML8hId919FqEl63mIoPUH9g1/exec",
  defaultPath: ["speciality", "cabinet"],
  zoomSpeedMs: 500,
};

/**
 * WordPress specific
 */
const header = document.querySelector("header");
if (header) {
  header.style.height = "20vh";
}
const content = document.querySelector("#content");
if (content) {
  content.style.height = "80vh";
}
