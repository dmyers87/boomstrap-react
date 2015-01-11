"use strict";

var React = require("react/addons");

module.exports = React.createClass({
  displayName: "Loader",

  render: function () {
    return React.createElement("div", {
      className: "loader"
    }, React.createElement("span", {
      className: "loader-pulse"
    }), React.createElement("span", {
      className: "loader-pulse"
    }), React.createElement("span", {
      className: "loader-pulse"
    }));
  }
});