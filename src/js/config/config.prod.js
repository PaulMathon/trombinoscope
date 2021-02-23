import "./../../index.css";

export const config = {
  environment: "prod",
  mediaPath: "",
  dataUrl: "https://script.google.com/macros/s/AKfycbywa_fzotVjoX96bdDzstaYtqUOlt-SML8hId919FqEl63mIoPUH9g1/exec",
  defaultPath: ["speciality", "cabinet"],
  zoomSpeedMs: 500,
};

/**
 * WordPress specific
 */
document.querySelector("header").style.height = "20vh";
document.querySelector("#content").style.height = "80vh";
