const React = require('react/addons');
const cx    = require('classnames');

/**
 * Use callouts to display important information or messages.
 */
module.exports = React.createClass({
  displayName: 'Callout',

  propTypes: {
    /**
     * Optionally include children.
     */
    children:   React.PropTypes.node,
    /**
     * Optionally include additional class name(s).
     */
    className:  React.PropTypes.string,
    /**
     * Optionally include a heading.
     */
    heading:    React.PropTypes.string,
    /**
     * Options: attention, danger, info, success, warning.
     */
    type:       React.PropTypes.oneOf(['attention', 'danger', 'info', 'success', 'warning'])
  },

  getDefaultProps() {
    return {
      type: 'info'
    };
  },

  render() {
    const classes = cx('callout', 'callout-' + this.props.type, this.props.className);

    return (
      <div className={classes}>
        {this.props.heading ? <h4>{this.props.heading}</h4> : null}
        {this.props.children}
      </div>
    );
  }
});
