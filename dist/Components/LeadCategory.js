'use strict';

var React = require('react/addons');
var cx = require('classnames');
var PureRenderMixin = React.addons.PureRenderMixin;

var LeadCategories = require('../Constants/LeadCategories');

var categories = {};
var abbrs = {};

LeadCategories.forEach(function (category) {
  categories[category.value.toString()] = category.name;
  abbrs[category.value.toString()] = category.abbr;
});

module.exports = React.createClass({
  displayName: 'Lead Category',

  propTypes: {
    category: React.PropTypes.number.isRequired,
    equal: React.PropTypes.bool,
    abbreviated: React.PropTypes.bool,
    small: React.PropTypes.bool,
    outline: React.PropTypes.bool,
    muted: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },

  mixins: [PureRenderMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      equal: false,
      abbreviated: false,
      small: false,
      outline: false,
      muted: false,
      disabled: false
    };
  },

  render: function render() {
    var _props = this.props;
    var equal = _props.equal;
    var abbreviated = _props.abbreviated;
    var small = _props.small;
    var outline = _props.outline;
    var muted = _props.muted;
    var disabled = _props.disabled;

    var category = categories[this.props.category];
    var abbr = abbrs[this.props.category];

    var categoryClass = 'leadcat-' + category.toLowerCase();
    var catClass = cx(categoryClass, 'leadcat', {
      'leadcat-eq-abbr': equal && abbreviated && !small,
      'leadcat-eq-abbr-sm': equal && abbreviated && small,
      'leadcat-eq': equal && !abbreviated,
      'leadcat-outline': outline,
      'leadcat-muted': muted,
      'leadcat-disabled': disabled
    });

    return React.createElement(
      'span',
      { className: catClass },
      abbreviated ? abbr : category
    );
  }
});