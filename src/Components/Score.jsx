'use strict';

var React = require('react/addons');
var cx    = React.addons.classSet;

module.exports = React.createClass({
  displayName: 'Score',
  propTypes: {
    score: React.PropTypes.number,
    size: React.PropTypes.string
  },
  render: function() {
    var scoreClass = 'score';
    var scoreTranslation;

    scoreTranslation = parseInt(this.props.score, 10);
    if (isNaN(scoreTranslation)) {
      scoreTranslation = 0;
    }

    scoreClass += ' ' + cx({
      'score-excellent': scoreTranslation >= 76,
      'score-good':      scoreTranslation >= 56 && scoreTranslation < 76,
      'score-average':   scoreTranslation >= 26 && scoreTranslation < 56
    });

    if (this.props.size) {
      scoreClass += ' score-' + this.props.size;
    }

    return (
      <span className={scoreClass}>{this.props.score}</span>
    );
  }
});
