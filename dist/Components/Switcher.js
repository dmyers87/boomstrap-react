'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react/addons');
var cx = require('classnames');
var SvgIcon = require('./SvgIcon');

var _require = require('lodash');

var assign = _require.assign;
var omit = _require.omit;

/**
 * Toggle switch.
 */
module.exports = React.createClass({
  displayName: 'Switcher',

  propTypes: {
    checked: React.PropTypes.bool.isRequired,
    /**
     * Optionally include additional class name(s).
     */
    className: React.PropTypes.string,
    /**
     * Disable switcher.
     */
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    /**
     * Options: sm.
     */
    size: React.PropTypes.oneOf(['', 'sm'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false,
      size: ''
    };
  },

  render: function render() {

    var props = assign({}, this.props);

    var checked = props.checked;
    var className = props.className;
    var disabled = props.disabled;
    var id = props.id;
    var onClick = props.onClick;
    var size = props.size;

    props = omit(props, ['checked', 'className', 'disabled', 'id', 'onClick', 'size']);

    var switcherClass = cx('switcher', className, {
      'switcher--sm': size === 'sm',
      'switcher--disabled': disabled
    });

    var switcherLabelClass = cx('switcher__label', {
      'switcher__label--sm': size === 'sm'
    });

    return React.createElement(
      'div',
      _extends({ className: switcherClass }, props),
      React.createElement('input', { type: 'checkbox',
        className: 'switcher__input',
        id: id,
        checked: checked,
        readOnly: true,
        onClick: onClick }),
      React.createElement(
        'label',
        { className: switcherLabelClass, htmlFor: id },
        React.createElement(
          'div',
          { className: 'switcher__inner' },
          React.createElement(
            'div',
            { className: 'switcher__on' },
            React.createElement(SvgIcon, { icon: 'checkmark' })
          ),
          React.createElement(
            'div',
            { className: 'switcher__off' },
            React.createElement(SvgIcon, { icon: 'cross' })
          )
        )
      )
    );
  }
});