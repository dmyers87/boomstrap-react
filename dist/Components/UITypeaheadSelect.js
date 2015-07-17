'use strict';

var React = require('react/addons');
var cx = require('classnames');

var _require = require('react-bootstrap');

var Overlay = _require.Overlay;

var UITypeaheadSelectOverlay = require('./UITypeaheadSelectOverlay');

module.exports = React.createClass({
  displayName: 'UI Typeahead Select',

  propTypes: {
    /**
     * Class for Container of Typeahead
     */
    className: React.PropTypes.string,

    /**
     * Class for Icon in input
     */
    iconClass: React.PropTypes.string,

    /**
     * Class for input
     */
    inputClass: React.PropTypes.string,

    /**
     * Placeholder text for input
     */
    placeholder: React.PropTypes.string,

    /**
     * Function to call when the user types in the input
     */
    onSearch: React.PropTypes.func,

    /**
     * Function to call when the user selects an item in the dropdown
     */
    onSelectMatch: React.PropTypes.func,

    /**
     * Array of options to display to the user
     */
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      element: React.PropTypes.node,
      payload: React.PropTypes.any
    })),

    /**
     * Indicates this typeahead is on a modal and must be a higher zIndex
     */
    overlayModal: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      className: '',
      iconClass: '',
      inputClass: '',
      placeholder: '',
      onSearch: function onSearch() {},
      onSelectMatch: function onSelectMatch() {},
      options: [],
      overlayModal: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      searchText: '',
      searchIndex: 0,
      searchLeft: 0,
      overlayShown: false
    };
  },

  keyHandlers: {
    Enter: function Enter() {
      if (this.props.options.length) {
        this._selectMatch(this.props.options[this.state.searchIndex].payload);
      }
    },

    ArrowDown: function ArrowDown() {
      var searchIndex = 0;
      if (this.state.searchIndex !== this.props.options.length - 1) {
        searchIndex = this.state.searchIndex + 1;
      }

      this.setState({ searchIndex: searchIndex });
    },

    ArrowUp: function ArrowUp() {
      var searchIndex = undefined;
      if (this.state.searchIndex !== 0) {
        searchIndex = this.state.searchIndex - 1;
      } else {
        searchIndex = Math.max(this.props.options.length - 1, 0);
      }

      this.setState({ searchIndex: searchIndex });
    }
  },

  _onKeyDown: function _onKeyDown(e) {
    if (this.keyHandlers[e.key]) {
      e.preventDefault();
      this.keyHandlers[e.key].bind(this)(e);
    }
  },

  _onChange: function _onChange(e) {
    var _this = this;

    this.setState({
      searchText: e.target.value
    }, function () {
      _this.props.onSearch(_this.state.searchText);
    });
  },

  _selectActive: function _selectActive(index) {
    this.setState({
      searchIndex: index
    });
  },

  _selectMatch: function _selectMatch(payload) {
    var _this2 = this;

    this.setState({
      searchText: '',
      overlayShown: false
    }, function () {
      _this2.props.onSelectMatch(payload);
      _this2.props.onSearch(_this2.state.searchText);
      React.findDOMNode(_this2.refs.searchInput).blur();
    });
  },

  _onFocus: function _onFocus() {
    var node = React.findDOMNode(this);
    var nodeBox = node.getBoundingClientRect();
    var documentElement = document.documentElement;
    var searchLeft = nodeBox.left + window.pageXOffset - documentElement.clientLeft;
    this.setState({
      searchLeft: searchLeft,
      overlayShown: true
    });
  },

  _onBlur: function _onBlur() {
    this.setState({
      overlayShown: false
    });
  },

  render: function render() {
    var _this3 = this;

    var searchIcon = cx('ficon ficon-search', this.props.iconClass);
    var inputClass = cx('form-control', this.props.inputClass);

    return React.createElement(
      'div',
      { className: this.props.className },
      React.createElement('input', {
        ref: 'searchInput',
        onFocus: this._onFocus,
        onBlur: this._onBlur,
        autoComplete: 'off', type: 'text',
        className: inputClass,
        placeholder: this.props.placeholder,
        onKeyDown: this._onKeyDown,
        onChange: this._onChange,
        value: this.state.searchText }),
      React.createElement('i', { className: searchIcon }),
      React.createElement(
        Overlay,
        {
          show: this.state.overlayShown,
          target: function () {
            return React.findDOMNode(_this3);
          },
          placement: 'bottom' },
        React.createElement(UITypeaheadSelectOverlay, {
          positionLeftOverride: this.state.searchLeft,
          searchIndex: this.state.searchIndex,
          selectActive: this._selectActive,
          selectMatch: this._selectMatch,
          options: this.props.options,
          overlayModal: this.props.overlayModal })
      )
    );
  }
});
/* e */ /* e */ /* e */