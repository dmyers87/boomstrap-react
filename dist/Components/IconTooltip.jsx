"use strict";

var React = require("react/addons");

// Components
var OverlayTrigger = require("react-bootstrap/OverlayTrigger");
var Tooltip = require("react-bootstrap/Tooltip");

module.exports = React.createClass({
  displayName: "Icon Tooltip",

  propTypes: {
    showIf: React.PropTypes.bool,
    text: React.PropTypes.string,
    icon: React.PropTypes.string
  },
  render: function render() {
    return this.props.showIf ? React.createElement(
      OverlayTrigger,
      { placement: "top", overlay: React.createElement(
          Tooltip,
          null,
          this.props.text
        ) },
      React.createElement("span", { className: "ficon ficon-" + this.props.icon })
    ) : null;
  }
});