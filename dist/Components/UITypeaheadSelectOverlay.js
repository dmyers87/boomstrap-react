'use strict';

var React = require('react/addons');

var ModalOverlay = require('../Constants/BootstrapConstants').Modal.Overlay;

var UITypeaheadSelectOverlay = React.createClass({
  displayName: 'UI Typeahead Select Overlay',

  propTypes: {
    positionLeft: React.PropTypes.number,
    positionLeftOverride: React.PropTypes.number,
    positionTop: React.PropTypes.number,
    searchIndex: React.PropTypes.number,
    selectActive: React.PropTypes.func,
    selectMatch: React.PropTypes.func,
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      element: React.PropTypes.element,
      payload: React.PropTypes.any
    })),
    overlayModal: React.PropTypes.bool
  },

  _selectActive: function _selectActive(index) {
    this.props.selectActive(index);
  },

  _selectMatch: function _selectMatch(index) {
    this.props.selectMatch(index);
  },

  render: function render() {
    var _this = this;

    if (!this.props.options || !this.props.options.length) {
      return React.createElement('span', null);
    }

    // Select is fired on mouse down so that the select fires
    // Before the input blur
    var options = this.props.options.map(function (result, index) {
      var optionClass = _this.props.searchIndex === index ? 'active' : '';
      return React.createElement(
        'li',
        { role: 'option', key: index,
          className: optionClass,
          onMouseEnter: _this._selectActive.bind(_this, index),
          onMouseDown: _this._selectMatch.bind(_this, result.payload) },
        React.createElement(
          'a',
          { tabIndex: '-1' },
          result.element
        )
      );
    });

    // OverlayTrigger uses offsetWidth to calculate left, which is often 0
    // at the time of render.  Just allow us to override what it thinks the left
    // should be.
    var positionLeft = this.props.positionLeftOverride || this.props.positionLeft;

    var ulStyle = {
      display: 'block',
      position: 'absolute',
      left: positionLeft,
      top: this.props.positionTop
    };

    if (this.props.overlayModal) {
      ulStyle.zIndex = ModalOverlay.zIndex;
    }

    return React.createElement(
      'ul',
      {
        style: ulStyle,
        className: 'dropdown-menu', role: 'listbox', 'aria-hidden': 'false' },
      options
    );
  }
});

module.exports = UITypeaheadSelectOverlay;