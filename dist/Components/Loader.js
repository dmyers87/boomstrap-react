'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react/addons');
var cx = require('classnames');

module.exports = React.createClass({
  displayName: 'Loader',

  propTypes: {
    className: React.PropTypes.string,
    desaturated: React.PropTypes.bool,
    small: React.PropTypes.bool,
    center: React.PropTypes.bool
  },

  render: function render() {
    var className = cx('loader', this.props.className, {
      'loader-sm': this.props.small,
      'loader-desaturated': this.props.desaturated,
      'text-center': this.props.center
    });

    return React.createElement(
      'div',
      _extends({}, this.props, { className: className }),
      React.createElement('span', { className: 'loader-pulse' }),
      React.createElement('span', { className: 'loader-pulse' }),
      React.createElement('span', { className: 'loader-pulse' })
    );
  }
});