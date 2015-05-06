"use strict";

var React = require("react/addons");
var cx = require("classnames");

var OverlayTrigger = require("react-bootstrap").OverlayTrigger;
var UITypeaheadSelectOverlay = require("./UITypeaheadSelectOverlay.jsx");

module.exports = React.createClass({
  displayName: "UI Typeahead Select",

  propTypes: {
    className: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    inputClass: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onSearch: React.PropTypes.func,
    onSelectMatch: React.PropTypes.func,
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
      element: React.PropTypes.element,
      payload: React.PropTypes.any
    })),
    overlayModal: React.PropTypes.bool
  },

  getInitialState: function getInitialState() {
    return {
      searchText: "",
      searchIndex: 0,
      searchLeft: 0
    };
  },

  componentDidMount: function componentDidMount() {
    this._updateSearchLeft();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._updateSearchLeft();
  },

  _updateSearchLeft: function _updateSearchLeft() {
    var node = React.findDOMNode(this);
    var nodeBox = node.getBoundingClientRect();
    var documentElement = document.documentElement;
    var searchLeft = nodeBox.left + window.pageXOffset - documentElement.clientLeft;
    if (searchLeft !== this.state.searchLeft) {
      this.setState({ searchLeft: searchLeft });
    }
  },

  _onKeyDown: function _onKeyDown(e) {
    if (e.key === "Enter" || e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      if (this.props.options && this.props.options.length) {
        this._selectMatch(this.props.options[this.state.searchIndex].payload);
      }
      return;
    }

    var newSearchIndex = 0;
    if (e.key === "ArrowDown") {
      if (this.state.searchIndex !== this.props.options.length - 1) {
        newSearchIndex = this.state.searchIndex + 1;
      }

      this.setState({
        searchIndex: newSearchIndex
      });
    } else if (e.key === "ArrowUp") {
      if (this.state.searchIndex !== 0) {
        newSearchIndex = this.state.searchIndex - 1;
      } else {
        newSearchIndex = this.props.options.length - 1;
      }

      this.setState({
        searchIndex: newSearchIndex
      });
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
    var _this = this;

    // Blur input to close search
    this.refs.overlay.getOverlayDOMNode().blur();

    this.setState({
      searchText: ""
    }, function () {
      _this.props.onSelectMatch(payload);
      _this.props.onSearch(_this.state.searchText);
    });
  },

  _onFocus: function _onFocus() {
    this.refs.overlay.show();
  },

  _onBlur: function _onBlur() {
    this.refs.overlay.hide();
  },

  render: function render() {
    var searchIcon = cx("ficon ficon-search", this.props.iconClass);

    var inputClass = cx("form-control", this.props.inputClass);

    return React.createElement(
      "div",
      { className: this.props.className },
      React.createElement(
        OverlayTrigger,
        { ref: "overlay", trigger: "manual",
          defaultOverlayShown: false,
          overlay: React.createElement(UITypeaheadSelectOverlay, {
            positionLeftOverride: this.state.searchLeft,
            searchIndex: this.state.searchIndex,
            selectActive: this._selectActive,
            selectMatch: this._selectMatch,
            options: this.props.options,
            overlayModal: this.props.overlayModal }),
          placement: "bottom" },
        React.createElement("input", {
          onFocus: this._onFocus, onBlur: this._onBlur,
          autoComplete: "off", type: "text",
          className: inputClass,
          placeholder: this.props.placeholder,
          onKeyDown: this._onKeyDown,
          onChange: this._onChange,
          value: this.state.searchText })
      ),
      React.createElement("i", { className: searchIcon })
    );
  }
});