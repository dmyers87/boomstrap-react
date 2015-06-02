"use strict";

var React = require("react/addons");
var cx = require("classnames");

// Components
var Icon = require("./Icon.jsx");

/**
 * Use sashes for showing property status.
 */
module.exports = React.createClass({
  displayName: "Sash",

  propTypes: {
    /**
     * Optionally include additional class name(s).
     */
    className: React.PropTypes.string,
    /**
     * Type is required.
     */
    type: React.PropTypes.oneOf(["back", "new", "off", "reduced"]).isRequired
  },

  render: function render() {
    var classes = cx("sash", "sash-" + this.props.type, this.props.className);

    var sashType = this.props.type;
    if (sashType === "reduced") {
      sashType = React.createElement(Icon, { icon: "arrow-down" });
    }

    return React.createElement(
      "div",
      { className: classes },
      sashType,
      React.createElement(
        "span",
        { className: "sash-time" },
        "10 mins ago"
      )
    );
  }
});