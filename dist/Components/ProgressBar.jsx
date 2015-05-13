"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react/addons");
var cx = require("classnames");

var _require = require("lodash");

var assign = _require.assign;
var omit = _require.omit;

module.exports = React.createClass({
  displayName: "Progress Bar",

  propTypes: {
    /**
     * Optionally include additional class name(s).
     */
    className: React.PropTypes.string,
    /**
     * Number 1-100 representing a percentage.
     */
    progress: React.PropTypes.number,

    /**
     * Set to 'true' to show label in progress bar.
     */
    showLabel: React.PropTypes.bool,

    /**
     * Options: xs, sm, lg.
     */
    size: React.PropTypes.oneOf(["", "xs", "sm", "lg"]),

    /**
     * Options: attention, danger, info, primary, success, success-to-danger, warning.
     */
    type: React.PropTypes.oneOf(["attention", "danger", "info", "primary", "success", "success-to-danger", "warning"])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      progress: 0,
      showLabel: false,
      size: "",
      type: "primary"
    };
  },

  render: function render() {
    var props = assign({}, this.props);

    var className = props.className;
    var progress = props.progress;
    var showLabel = props.showLabel;
    var size = props.size;
    var type = props.type;

    props = omit(props, ["className", "progress", "showLabel", "size", "type"]);

    var progressTranslation = progress;

    progressTranslation = parseInt(progress, 10);

    if (isNaN(progressTranslation) || progressTranslation < 0) {
      progressTranslation = 0;
    }

    var classes = cx("progress-bar", className, {
      "progress-bar--attention": type === "attention",
      "progress-bar--danger": type === "danger",
      "progress-bar--info": type === "info",
      "progress-bar--primary": type === "primary",
      "progress-bar--success": type === "success",
      "progress-bar--success-to-danger": type === "success-to-danger",
      "progress-bar--warning": type === "warning"
    }, {
      "progress-bar--xs": size === "xs",
      "progress-bar--sm": size === "sm",
      "progress-bar--lg": size === "lg"
    });

    /**
     * Style for progressing bar
     */
    var style = {
      transform: "translateX(" + progressTranslation + "%)",
      WebkitTransform: "translateX(" + progressTranslation + "%)"
    };

    /**
     * If showLabel is true and size isn't extra small, construct label
     */
    var label = null;

    if (showLabel && size !== "xs") {
      label = React.createElement(
        "div",
        { className: "progress-bar__bar__label" },
        progressTranslation + "%"
      );
    }

    return React.createElement(
      "div",
      _extends({ className: classes }, props),
      React.createElement(
        "div",
        { className: "progress-bar__bar", style: style },
        label
      )
    );
  }
});