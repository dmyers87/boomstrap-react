/*eslint no-script-url:0 */

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react/addons");

module.exports = React.createClass({
  displayName: "Faux Link",

  render: function render() {
    return React.createElement("a", _extends({ href: "javascript:void(0);" }, this.props));
  }
});