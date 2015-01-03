"use strict";

var React = require("react/addons");
var cx = React.addons.classSet;

module.exports = React.createClass({
  displayName: "Fauxbox",

  propTypes: {
    boxID: React.PropTypes.string,
    boxClass: React.PropTypes.string,
    labelClass: React.PropTypes.string,
    checked: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func,
    inline: React.PropTypes.bool,
    label: React.PropTypes.node
  },

  render: function () {
    var fauxboxClasses = {
      fauxbox: true,
      "fauxbox-inline": !!this.props.inline
    };
    if (this.props.boxClass) {
      fauxboxClasses[this.props.boxClass] = true;
    }

    var fauxboxClass = cx(fauxboxClasses);
    var labelClass = this.props.labelClass || "";

    return React.createElement("div", {
      className: fauxboxClass
    }, React.createElement("input", {
      type: "checkbox",
      id: this.props.boxID,
      checked: this.props.checked,
      readOnly: true,
      onClick: this.props.onClick
    }), React.createElement("label", {
      className: labelClass,
      htmlFor: this.props.boxID
    }, this.props.label));
  }
});