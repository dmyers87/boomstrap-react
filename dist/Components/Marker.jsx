"use strict";

var React = require("react/addons");
var cx = require("classnames");

module.exports = React.createClass({
  displayName: "Marker",

  propTypes: {
    type: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    showClose: React.PropTypes.bool,
    closeClass: React.PropTypes.string,
    onClose: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      type: "default",
      onClose: function onClose() {},
      showClose: true
    };
  },

  render: function render() {
    var markerClass = "marker marker-" + this.props.type;
    var closeClass = cx("ficon ficon-cross", this.props.closeClass);

    var close = null;
    if (this.props.showClose) {
      close = React.createElement("i", { className: closeClass, onClick: this.props.onClose });
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