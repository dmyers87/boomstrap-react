"use strict";

var React = require("react/addons");
var cx = React.addons.classSet;

module.exports = React.createClass({
  displayName: "Fauxbox",

  propTypes: {
    id: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    labelClass: React.PropTypes.string,
    checked: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func,
    inline: React.PropTypes.bool,
    label: React.PropTypes.node
  },

  render: function render() {
    var fauxboxClasses = {
      fauxbox: true,
      "fauxbox-inline": !!this.props.inline
    };
    if (this.props.className) {
      fauxboxClasses[this.props.className] = true;
    }

    var fauxboxClass = cx(fauxboxClasses);
    var labelClass = this.props.labelClass || "";

    return React.createElement(
      "div",
      { className: fauxboxClass },
      React.createElement("input", {
        type: "checkbox",
        id: this.props.id,
        checked: this.props.checked,
        readOnly: true,
        onClick: this.props.onClick }),
      React.createElement(
        "label",
        { className: labelClass, htmlFor: this.props.id },
        this.props.label
      )
    );
  }
});