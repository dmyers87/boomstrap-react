'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Components = require('./Components');
var Constants = require('./Constants');
var Mixins = require('./Mixins');

module.exports = _extends({
  Components: Components,
  Constants: Constants,
  Mixins: Mixins
}, Components, Constants, Mixins);