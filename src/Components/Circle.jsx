const React = require('react/addons');
const cx    = require('classnames');

/**
 * Circles are colored dots representing time.
 */
module.exports = React.createClass({

  displayName: 'Circle',

  propTypes: {
    /**
     * Optionally include additional class name(s).
     */
    className:  React.PropTypes.string,
    /**
     * Optionally include type.
     */
    type:       React.PropTypes.oneOf(['', 'now', 'today', '14-days', '90-days', 'forever'])
  },

  getDefaultProps() {
    return {
      type:     ''
    };
  },

  render() {

    const classes = cx('circle', 'circle-' + this.props.type, this.props.className);

    return (
      <i className={classes} />
    );
  }

});
