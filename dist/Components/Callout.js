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
    children: React.PropTypes.node,
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

    return React.createElement(
      'div',
      { className: classes },
      this.props.heading ? React.createElement(
        'h4',
        null,
        this.props.heading
      ) : null,
      this.props.children
    );
  }
});