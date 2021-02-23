import "./../../index.css";

export const config = {
  environment: "prod",
  mediaPath: "<?php echo get_template_directory_uri();?>/media/assets/praticiens",
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
