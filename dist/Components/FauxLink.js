/*eslint no-script-url:0 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react/addons');

/**
 * Faux Link allows the user to create text that resembles a link
 *  without worrying about the href accidentally causing a route change.
 * It is intended to be used with actionable text that does not navigate.
 */
module.exports = React.createClass({
  displayName: 'Faux Link',

  render: function render() {
    return React.createElement('a', _extends({ href: 'javascript:void(0);' }, this.props));
  }
});