import * as fs from "fs";
import HTMLParser from 'node-html-parser';

const HTML = "./dist/index.html";
const PHP_TEMPLATE = "./scripts/template.php";
const OUTPUT = "./dist/trombinoscope.php";

/**
 * Select html elements to keep
 */
const htmlString = fs.readFileSync(HTML).toString();
const htmlObj = HTMLParser.parse(htmlString);
const link = htmlObj.querySelector("link");
const script = htmlObj.querySelector("script");
const content = htmlObj.querySelector("body div");

const toKeep = "\n" + link + "\n" + script + "\n" + content;

/**
 * Insert html elements in php template and create the output template
 */
let phpTemplate = fs.readFileSync(PHP_TEMPLATE).toString();
phpTemplate = phpTemplate.replace("{{ replace }}", toKeep);
fs.writeFileSync(OUTPUT, phpTemplate);

console.info(`WordPress template successfully created at ${OUTPUT}`);
