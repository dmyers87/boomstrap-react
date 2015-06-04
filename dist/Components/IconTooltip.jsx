"use strict";

var React = require("react/addons");

// Components

var _require = require("react-bootstrap");

var OverlayTrigger = _require.OverlayTrigger;
var Tooltip = _require.Tooltip;

var Icon = require("./Icon");

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
      React.createElement(Icon, { icon: this.props.icon })
    ) : null;
  }
});