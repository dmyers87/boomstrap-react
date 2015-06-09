'use strict';

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

var React = require('react/addons');
var cx = require('classnames');

/**
 * Circles are colored dots representing time.
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

    var classes = cx('circle', this.props.className, _defineProperty({}, 'circle-' + this.props.type, this.props.type));

    return React.createElement('i', { className: classes });
  }

});