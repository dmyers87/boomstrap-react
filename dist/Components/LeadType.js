'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var cx = require('classnames');

var PropTypes = React.PropTypes;
var addons = React.addons;

module.exports = React.createClass({
  displayName: 'LeadType',

  propTypes: {
    className: PropTypes.string,

    /**
     * Indicates whether or not this is a buyer lead type.
     */
    buyer: PropTypes.bool,

    /**
     * Indicates whether or not this is a seller lead type.
     */
    seller: PropTypes.bool,

    /**
     * For equal width lead type labels, set equal to true.
     */
    equal: PropTypes.bool,

    /**
     * For abbreviated lead type labels, set abbreviated to true.
     * Abbreviated version will always be uppercase.
     */
    abbreviated: PropTypes.bool,

    /**
     * Sometimes you just want to stand things on their heads.
     * Set vertical and abbreviated to true when you need your leadtype to reach for the stars.
     * This only applies to the B/S combination.
     */
    vertical: PropTypes.bool
  },

  mixins: [addons.PureRenderMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      className: '',
      buyer: false,
      seller: false,
      equal: false,
      abbreviated: false,
      vertical: false
    };
  },

  render: function render() {
    var _props = this.props;
    var buyer = _props.buyer;
    var seller = _props.seller;
    var equal = _props.equal;
    var abbreviated = _props.abbreviated;
    var vertical = _props.vertical;

    var props = _objectWithoutProperties(_props, ['buyer', 'seller', 'equal', 'abbreviated', 'vertical']);

    var leadTypeClass = cx(this.props.className, {
      'leadtype-buyer': buyer && !seller,
      'leadtype-seller': !buyer && seller,
      'leadtype-bs': buyer && seller,
      'leadtype-eq': equal,
      'leadtype-abbr': abbreviated,
      'leadtype-abbr-vertical': abbreviated && vertical
    });

    return React.createElement('span', _extends({}, props, { className: leadTypeClass }));
  }
});