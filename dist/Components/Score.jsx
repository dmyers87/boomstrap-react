"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var React = require("react/addons");
var cx = require("classnames");

/**
 * Use scores to rank / score data.
 */
module.exports = React.createClass({
  displayName: "Score",
  propTypes: {
    score: React.PropTypes.number,
    size: React.PropTypes.string
  },
  render: function render() {
    var scoreTranslation = undefined;

    scoreTranslation = parseInt(this.props.score, 10);
    if (isNaN(scoreTranslation)) {
      scoreTranslation = 0;
    }

    var scoreClass = cx("score", _defineProperty({
      "score-excellent": scoreTranslation >= 76,
      "score-good": scoreTranslation >= 56 && scoreTranslation < 76,
      "score-average": scoreTranslation >= 26 && scoreTranslation < 56 }, "score-" + this.props.size, this.props.size));

    return React.createElement(
      "span",
      { className: scoreClass },
      this.props.score
    );
  }
});