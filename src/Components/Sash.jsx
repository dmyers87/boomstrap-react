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
    timeStamp:      React.PropTypes.string.isRequired,
    reducedAmount:  React.PropTypes.string,
    reducedPercent: React.PropTypes.string
  },

  render() {
    const classes = cx('sash', 'sash-' + this.props.type, this.props.className);
    let dateDistance = dateHelper.distance(this.props.timeStamp);

    let sashTitle = null;

    if (this.props.type === 'back') {
      sashTitle = 'Back';
    } else if (this.props.type === 'new') {
      sashTitle = 'New';
    } else if (this.props.type === 'off') {
      sashTitle = 'Off';
    } else if (this.props.type === 'reduced') {
      sashTitle = <span><Icon icon='arrow-down' /> {this.props.reducedAmount} ({this.props.reducedPercent})</span>;
    }

    return (
      <div className={classes}>
        {sashTitle}
        <span className='sash-time'>{dateDistance}</span>
      </div>
    );
  }
});
