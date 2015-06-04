'use strict';

var React = require('react/addons');
var cx = require('classnames');

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
    className: React.PropTypes.string,
    /**
     * Optionally include a heading.
     */
    heading: React.PropTypes.string,
    /**
     * Optionally include type.
     */
    type: React.PropTypes.oneOf(['attention', 'danger', 'info', 'success', 'warning'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      type: 'info'
    };
  },

  render: function render() {
    var classes = cx('callout', 'callout-' + this.props.type, this.props.className);

    var calloutHeading = null;

    if (this.props.heading) {
      calloutHeading = React.createElement(
        'h4',
        null,
        this.props.heading
      );
    }

    return React.createElement(
      'div',
      { className: classes },
      calloutHeading,
      this.props.children
    );
  }
});