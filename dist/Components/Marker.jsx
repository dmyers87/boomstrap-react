"use strict";

var React = require("react/addons");
var cx = require("classnames");

// Components
var Icon = require("./Icon.jsx");

/**
 * Use markers to represent current searching / filtering parameters.
 */
module.exports = React.createClass({
  displayName: "Marker",

  propTypes: {
    type: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    showClose: React.PropTypes.bool,
    closeClass: React.PropTypes.string,
    onClose: React.PropTypes.func,
    className: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      type: "default",
      onClose: function onClose() {},
      closeClass: "",
      showClose: true,
      className: ""
    };
  },

  render: function render() {
    var markerClass = cx("marker", "marker-" + this.props.type, this.props.className);

    var close = null;
    if (this.props.showClose) {
      close = React.createElement(Icon, { icon: "cross", className: this.props.closeClass, onClick: this.props.onClose });
    }

    return React.createElement(
      "span",
      { className: markerClass },
      React.createElement(
        "span",
        null,
        this.props.label,
        " "
      ),
      close
    );
  }
});