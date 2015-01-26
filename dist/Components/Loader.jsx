"use strict";

var React = require("react/addons");

module.exports = React.createClass({
  displayName: "Loader",

  render: function () {
    return React.createElement("div", React.__spread({
      className: "loader"
    }, this.props), React.createElement("span", {
      className: "loader-pulse"
    }), React.createElement("span", {
      className: "loader-pulse"
    }), React.createElement("span", {
      className: "loader-pulse"
    }));
  }
});