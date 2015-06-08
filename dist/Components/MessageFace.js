"use strict";

var React = require("react/addons");
var cx = require("classnames");

module.exports = React.createClass({
  displayName: "Message Face",

  propTypes: {
    placement: React.PropTypes.oneOf(["", "left", "top", "right", "bottom"])
  },

  render: function render() {
    var className = cx("message-face", {
      "message-face-arrow-left": this.props.placement === "left",
      "message-face-arrow-top": this.props.placement === "top",
      "message-face-arrow-bottom": this.props.placement === "bottom",
      "message-face-arrow-right": this.props.placement === "right"
    });

    return React.createElement(
      "div",
      { className: className },
      React.createElement(
        "div",
        { className: "message-face-eyes" },
        React.createElement("span", { className: "message-face-eye" }),
        React.createElement("span", { className: "message-face-eye" })
      ),
      React.createElement("div", { className: "message-face-mouth" })
    );
  }
});