'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var cx = require('classnames');

module.exports = React.createClass({
  displayName: 'Icon',

  propTypes: {
    /**
     * Icon name.
     */
    icon: React.PropTypes.string.isRequired,

    /**
     * Path to SVG sprite.
     */
    iconPath: React.PropTypes.string,

    /**
     * Optionally include additional class name(s).
     */
    className: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      iconPath: 'svg/sprite.svg'
    };
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var icon = _props.icon;
    var iconPath = _props.iconPath;

    var props = _objectWithoutProperties(_props, ['className', 'icon', 'iconPath']);

    var useTag = '<use xlink:href=' + iconPath + '#' + icon + ' />';

    var classes = cx(className, 'icon', 'icon-' + icon);

    var createUseTag = function createUseTag() {
      return {
        __html: useTag
      };
    };

    return React.createElement('svg', _extends({ className: classes }, props, { dangerouslySetInnerHTML: createUseTag() }));
  }
});