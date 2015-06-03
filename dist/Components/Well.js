'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react/addons');
var cx = require('classnames');

module.exports = React.createClass({
  displayName: 'Well',

  propTypes: {
    className: React.PropTypes.string,
    large: React.PropTypes.bool,
    small: React.PropTypes.bool
  },

  render: function render() {
    var className = cx(this.props.className, 'well', {
      'well-lg': this.props.large,
      'well-sm': this.props.small
    });

    return React.createElement('div', _extends({}, this.props, { className: className }));
  }
});