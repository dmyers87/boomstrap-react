"use strict";

var React = require("react/addons");

module.exports = React.createClass({
  displayName: "IFrame",

  propTypes: {
    src: React.PropTypes.string.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    onCloseFrame: React.PropTypes.func
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    // React does not work with onLoad events in iFrames yet
    // Because of the event delegation setters
    // https://github.com/facebook/react/issues/1718
    var iframe = this.refs.iframe.getDOMNode();
    if (iframe.attachEvent) {
      iframe.attachEvent("onload", function () {
        _this._iFrameCloseRegister();
      });
    } else {
      iframe.onload = function () {
        _this._iFrameCloseRegister();
      };
    }
  },

  _iFrameCloseRegister: function _iFrameCloseRegister() {
    var _this = this;

    var element = this.refs.iframe.getDOMNode();
    if (element && element.contentWindow && element.contentWindow.registerClose) {
      element.contentWindow.registerClose(function () {
        _this.props.onCloseFrame();
      });
    }
  },

  render: function render() {
    var src = this.props.src;
    var width = this.props.width || null;
    var height = this.props.height || null;

    return React.createElement("iframe", { ref: "iframe",
      src: src,
      width: width,
      height: height,
      seamless: true,
      onLoad: this._iFrameCloseRegister });
  }
});