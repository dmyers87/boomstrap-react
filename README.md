## <img src="react-boomstrap.svg" height="80" width="80"> Boomstrap React (Components and Mixins for Boomstrap) ![Build Status](https://travis-ci.org/BoomTownROI/boomstrap-react.svg?branch=master)

Boomstrap React is a library of components we use to build applications with our Pattern Library, Boomstrap.

## Installation and Usage

React Boomstrap can be used as a global via `window.BoomstrapReact`, but we much prefer the CommonJS Usage

### Global Installation and Usage

Download the file located at `dist/boomstrap-react.js` and include it in your browser `<script src="path/to/boomstrap-react.js"></script>`.  BoomstrapReact will be available on the window.

### CommonJS Installation and Usage

To install Boomstrap React

`npm install boomstrap-react --save`

Using Boomstrap React is as simple as

```js
var BoomstrapReact = require('boomstrap-react');
var Fauxbox = BoomstrapReact.Components.Fauxbox;
```

But individual components can be required also:

```js
var Fauxbox = require('boomstrap-react/Components/Fauxbox.jsx');
```
