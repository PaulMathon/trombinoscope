import * as fs from "fs";
import HTMLParser from 'node-html-parser';

const HTML = "./dist/index.html";
const CSS = "./dist/main.css";
const JS = "./dist/main.bundle.js";
const PHP_TEMPLATE = "./scripts/template.php";
const OUTPUT = "./dist/trombinoscope.php";

/**
 * Select elements to keep
 */
// Read css file
const cssString = "<style>\n" + fs.readFileSync(CSS).toString() + "\n</style>";
// Read js file
const jsString = "<script>\n" + fs.readFileSync(JS).toString() + "\n</script>";
// Select HTML elements to keep
const htmlString = fs.readFileSync(HTML).toString();
const htmlObj = HTMLParser.parse(htmlString);
const content = htmlObj.querySelector("body div");

const toKeep = "\n" + cssString + "\n" + content + "\n" + jsString;

/**
 * Insert html elements in php template and create the output template
 */
let phpTemplate = fs.readFileSync(PHP_TEMPLATE).toString();
phpTemplate = phpTemplate.replace("{{ replace }}", toKeep);
fs.writeFileSync(OUTPUT, phpTemplate);

console.info(`WordPress template successfully created at ${OUTPUT}`);
