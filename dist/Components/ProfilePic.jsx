"use strict";

var React = require("react/addons");
var cx = require("classnames");

module.exports = React.createClass({
  displayName: "Profile Pic",

  propTypes: {
    small: React.PropTypes.bool,
    src: React.PropTypes.string,
    alt: React.PropTypes.string,
    initials: React.PropTypes.string.isRequired
  },

  render: function render() {
    var className = cx("profile-pic", {
      "profile-pic--sm": this.props.small,
      "profile-pic--initials": this.props.initials
    });

    if (this.props.src) {
      return React.createElement("img", {
        className: className,
        src: this.props.src,
        alt: this.props.alt });
    }

    return React.createElement(
      "div",
      { className: className },
      this.props.initials
    );
  }
});