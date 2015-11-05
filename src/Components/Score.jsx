const React = require('react');
const cx    = require('classnames');

/**
 * Use scores to rank / score data.
 */
module.exports = React.createClass({
  displayName: 'Score',
  propTypes: {
    score: React.PropTypes.number,
    size: React.PropTypes.string
  },
  render: function() {
    let scoreTranslation;

    scoreTranslation = parseInt(this.props.score, 10);
    if (isNaN(scoreTranslation)) {
      scoreTranslation = 0;
    }

    const scoreClass = cx('score', {
      'score-excellent': scoreTranslation >= 76,
      'score-good':      scoreTranslation >= 56 && scoreTranslation < 76,
      'score-average':   scoreTranslation >= 26 && scoreTranslation < 56,
      ['score-' + this.props.size]: this.props.size
    });

    return (
      <span className={scoreClass}>{this.props.score}</span>
    );
  }
});
