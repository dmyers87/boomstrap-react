'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var LeadCategory = require('./LeadCategory');
var LeadType = require('./LeadType');

var PureRenderMixin = React.addons.PureRenderMixin;

module.exports = React.createClass({
  displayName: 'LeadCategoryByType',

  propTypes: _extends({
    className: React.PropTypes.string,

    /**
     * Indicates whether or not this is a seller category
     */
    seller: React.PropTypes.bool

  }, LeadCategory.propTypes),

  mixins: [PureRenderMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      seller: false
    };
  },

  render: function render() {
    var _props = this.props;
    var seller = _props.seller;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['seller', 'className']);

    return React.createElement(
      'span',
      { className: className },
      React.createElement(LeadType, {
        buyer: !seller,
        seller: seller,
        abbreviated: true,
        style: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        } }),
      React.createElement(LeadCategory, _extends({}, props, {
        style: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        } }))
    );
  }
});