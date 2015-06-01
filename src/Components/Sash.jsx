const React = require('react/addons');
const cx    = require('classnames');

// Components
const Icon = require('./Icon.jsx');

/**
 * Use sashes for showing property status.
 */
module.exports = React.createClass({
  displayName: 'Sash',

  propTypes: {
    /**
     * Optionally include additional class name(s).
     */
    className:  React.PropTypes.string,
    /**
     * Type is required.
     */
    type:       React.PropTypes.oneOf(['back', 'new', 'off', 'reduced']).isRequired
  },

  render() {
    const classes = cx('sash', 'sash-' + this.props.type, this.props.className);

    let sashType = this.props.type;
    if (sashType == 'reduced') {
      sashType = <Icon icon='arrow-down' />;
    }

    return (
      <div className={classes}>
        {sashType}
        <span className="sash-time">10 mins ago</span>
      </div>
    );
  }
});
