import * as path from "path";

export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve("dist"),
  },
};
