"use strict";

var React = require("react/addons");
var cx = require("classnames");

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

    return React.createElement(
      "div",
      { className: classes },
      this.props.type,
      React.createElement(
        "span",
        { className: "sash-time" },
        "10 mins ago"
      )
    );
  }
});