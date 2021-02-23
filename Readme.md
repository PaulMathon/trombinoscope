# Trombinoscope

![Trombinoscope demo](./assets/doc/trombi_demo.gif)

## Getting Started

The project is only static files, to bring modifications you will only need a browser.
To compile the final wordpress template, or to run the test, you will need a valid version of `npm` and then run the command `npm install` in the root of the folder. It will install all the dependencies needed for the project.

## Generating the final WordPress Template

You will first need to execute the 2 following actions before being able to generate:

1. Remove/comment the following line in the `index.html` 

Find the following line in the trombinoscope
```html
<link rel="stylesheet" href="index.css">
<script type="module" src="./index.js"></script>
```

```html
<!-- <link rel="stylesheet" href="index.css">
    <script type="module" src="./index.js"></script> -->
```

You can now run the command `npm run build` to create the final WordPress Template. In the `/dist` folder you will find 

## How does it works

### Fetching the data

### Building the display

### Initialize the context


## External Libraries

3 external libraries are used for this project:

- [FitText](https://github.com/adactio/FitText.js): Handles the auto resizing of the texts to fit in their containers
- [Zinga Scroller](https://github.com/doctyper/zynga-scroller): Simplified the zoom implementation
- [Tingle](https://github.com/deathbeds/tingle): Simplified the modal implementation, used for the practitioner card
