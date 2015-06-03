const React      = require('react/addons');
const cx         = require('classnames');
const dateHelper = require('../Utilities/dateHelper');
const Icon       = require('./Icon.jsx');

/**
 * Use sashes for showing property status.
 */
module.exports = React.createClass({
  displayName: 'Sash',

  propTypes: {
    /**
     * Optionally include additional class name(s).
     */
    className:      React.PropTypes.string,
    /**
     * Type is required.
     */
    type:           React.PropTypes.oneOf(['back', 'new', 'off', 'reduced']).isRequired,
    /**
     * Time stamp is required.
     */
    timeStamp:      React.PropTypes.string.isRequired,
    /**
     * For 'reduced' type, include amount property was reduced in dollars
     */
    reducedAmount:  React.PropTypes.string,
    /**
     * For 'reduced' type, include amount property was reduced as a percentage
     */
    reducedPercent: React.PropTypes.string
  },

  render() {
    const classes = cx('sash', 'sash-' + this.props.type, this.props.className);
    let dateDistance = dateHelper.distance(this.props.timeStamp);

    let sashTitle = null;

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
          sashTitle = <span><Icon icon='arrow-down' /> {this.props.reducedAmount} ({this.props.reducedPercent})</span>;
        } else {
          sashTitle = 'Reduced';
        }
        break;
      default:
    }

    return (
      <div className={classes}>
        {sashTitle}
        <span className='sash-time'>{dateDistance}</span>
      </div>
    );
  }
});
