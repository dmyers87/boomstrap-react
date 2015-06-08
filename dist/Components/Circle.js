'use strict';

var React = require('react/addons');
var cx = require('classnames');

/**
 * Circles are just the colored dots next to times, online now, etc.
 */
module.exports = React.createClass({

  displayName: 'Circle',

  propTypes: {
    /**
     * Optionally include additional class name(s).
     */
    className: React.PropTypes.string,
    /**
     * Optionally include type.
     */
    type: React.PropTypes.oneOf(['', 'now', 'today', '14-days', '90-days', 'forever'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      type: ''
    };
  },

  render: function render() {

    var classes = cx('circle', 'circle-' + this.props.type, this.props.className);

    return React.createElement('i', { className: classes });
  }

});