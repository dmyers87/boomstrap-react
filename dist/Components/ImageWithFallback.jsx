"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react/addons");

var _require = require("lodash");

var extend = _require.extend;
var omit = _require.omit;

module.exports = React.createClass({
  displayName: "Image with Fallback",

  propTypes: {
    src: React.PropTypes.string.isRequired,
    fallbackSrc: React.PropTypes.string.isRequired
  },

  getInitialState: function getInitialState() {
    return {
      src: null
    };
  },

  _onError: function _onError() {
    if (!this.state.src) {
      this.setState({
        src: this.props.fallbackSrc
      });
    }
  },

  render: function render() {
    var props = omit(extend({}, this.props), ["fallbackSrc", "src"]);

    var src = this.state.src || this.props.src;

    return React.createElement("img", _extends({ src: src }, props, { onError: this._onError }));
  }
});