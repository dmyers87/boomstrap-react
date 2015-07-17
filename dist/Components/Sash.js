'use strict';

var React = require('react/addons');
var cx = require('classnames');
var dateHelper = require('../Utilities/dateHelper');
var Icon = require('./Icon');

/**
 * Use sashes for showing property status.
 */
module.exports = React.createClass({
  displayName: 'Sash',

  propTypes: {
    /**
     * Optionally include additional class name(s).
     */
    className: React.PropTypes.string,
    /**
     * Type is required.
     */
    type: React.PropTypes.oneOf(['back', 'new', 'off', 'reduced']).isRequired,
    /**
     * Time stamp is required.
     */
    timeStamp: React.PropTypes.string.isRequired,
    /**
     * For 'reduced' type, include amount property was reduced in dollars
     */
    reducedAmount: React.PropTypes.string,
    /**
     * For 'reduced' type, include amount property was reduced as a percentage
     */
    reducedPercent: React.PropTypes.string
  },

  render: function render() {
    var classes = cx('sash', 'sash-' + this.props.type, this.props.className);
    var dateDistance = dateHelper.distance(this.props.timeStamp);

    var sashTitle = null;

    switch (this.props.type) {
      case 'back':
        sashTitle = 'Back';
        break;
      case 'new':
        sashTitle = 'New';
        break;
      case 'off':
        sashTitle = 'Off';
        break;
      case 'reduced':
        if (this.props.reducedAmount && this.props.reducedPercent) {
          sashTitle = React.createElement(
            'span',
            null,
            React.createElement(Icon, { icon: 'arrow-down' }),
            ' ',
            this.props.reducedAmount,
            ' (',
            this.props.reducedPercent,
            ')'
          );
        } else {
          sashTitle = 'Reduced';
        }
        break;
      default:
    }

    return React.createElement(
      'div',
      { className: classes },
      sashTitle,
      React.createElement(
        'span',
        { className: 'sash-time' },
        dateDistance
      )
    );
  }
});