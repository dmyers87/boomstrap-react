"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react/addons");
var cx = require("classnames");
var _ = require("lodash");

module.exports = React.createClass({
  displayName: "Icon",

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },

  render: function render() {
    var props = _.assign({}, this.props);
    var className = props.className;
    var icon = props.icon;

    // Remove className from props to prevent collision
    delete props.className;
    delete props.icon;

    var iconClass = cx(this.props.className, "ficon", "ficon-" + icon);

    return React.createElement("i", _extends({ className: iconClass }, props));
  }
});