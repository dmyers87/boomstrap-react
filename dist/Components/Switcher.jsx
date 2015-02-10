"use strict";

var React = require("react/addons");
var cx = React.addons.classSet;

module.exports = React.createClass({
  displayName: "Switcher",

  propTypes: {
    id: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    checked: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func
  },

  render: function () {
    var switcherClasses = {
      switcher: true };
    if (this.props.className) {
      switcherClasses[this.props.className] = true;
    }

    var switcherClass = cx(switcherClasses);

    return React.createElement("div", {
      className: switcherClass
    }, React.createElement("input", {
      type: "checkbox",
      className: "switcher__input",
      id: this.props.id,
      checked: this.props.checked,
      readOnly: true,
      onClick: this.props.onClick
    }), React.createElement("label", {
      className: "switcher__label",
      htmlFor: this.props.id
    }, React.createElement("div", {
      className: "switcher__inner"
    }, React.createElement("div", {
      className: "switcher__on"
    }, React.createElement("i", {
      className: "ficon ficon-checkmark"
    })), React.createElement("div", {
      className: "switcher__off"
    }, React.createElement("i", {
      className: "ficon ficon-cross"
    })))));
  }
});