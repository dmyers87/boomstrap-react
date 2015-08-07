'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var cx = require('classnames');

module.exports = React.createClass({
  displayName: 'SvgIcon',

  propTypes: {
    /**
     * Icon name.
     */
    icon: React.PropTypes.string.isRequired,

    /**
     * Optionally include additional class name(s).
     */
    className: React.PropTypes.string
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var icon = _props.icon;

    var props = _objectWithoutProperties(_props, ['className', 'icon']);

    var useTag = '<use xlink:href=#' + icon + ' />';

    var classes = cx(className, 'icon', 'icon-' + icon);

    var createUseTag = function createUseTag() {
      return {
        __html: useTag
      };
    };

    return React.createElement('svg', _extends({ className: classes }, props, { dangerouslySetInnerHTML: createUseTag() }));
  }
});