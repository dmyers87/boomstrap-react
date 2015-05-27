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
    children: React.PropTypes.any,
    /**
     * Optionally include additional class name(s).
     */
    className:  React.PropTypes.string,
    /**
     * Optionally include a heading.
     */
    heading:    React.PropTypes.string,
    /**
     * Optionally include type.
     */
    type:       React.PropTypes.oneOf(['attention', 'danger', 'info', 'success', 'warning'])
  },

  getDefaultProps() {
    return {
      type:       'info'
    };
  },

  render() {
    const classes = cx('callout', 'callout-' + this.props.type, this.props.className);

    let calloutHeading = null;

    if (this.props.heading) {
      calloutHeading = (
        <h4>{this.props.heading}</h4>
      );
    }

    return (
      <div className={classes}>
        {calloutHeading}
        {this.props.children}
      </div>
    );
  }
});
