"use strict";

var React = require("react/addons");

module.exports = React.createClass({
  displayName: "Marker",

  propTypes: {
    type: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    showClose: React.PropTypes.bool,
    closeClass: React.PropTypes.string,
    onClose: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      type: "default",
      onClose: function () {},
      showClose: true
    };
  },

  render: function () {
    var markerClass = "marker marker-" + this.props.type;
    var closeClass = "ficon ficon-cross";
    if (this.props.closeClass) {
      closeClass += " " + this.props.closeClass;
    }

    var close = null;

    if (this.props.showClose) {
      close = React.createElement("i", {
        className: closeClass,
        onClick: this.props.onClose
      });
    }

    return React.createElement("span", {
      className: markerClass
    }, React.createElement("span", null, this.props.label, " "), close);
  }
});