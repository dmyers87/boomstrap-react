"use strict";

var React = require("react/addons");

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
    }))
  },

  getInitialState: function () {
    return {
      searchText: "",
      searchIndex: 0,
      searchLeft: 0
    };
  },

  componentDidMount: function () {
    var inputLeft = this.getDOMNode().offsetLeft;
    this.setState({
      searchLeft: inputLeft
    });
  },

  _onKeyDown: function (e) {
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

  _onChange: function (e) {
    var _this = this;
    this.setState({
      searchText: e.target.value
    }, function () {
      _this.props.onSearch(_this.state.searchText);
    });
  },

  _selectActive: function (index) {
    this.setState({
      searchIndex: index
    });
  },

  _selectMatch: function (payload) {
    var _this2 = this;
    // Blur input to close search
    this.refs.overlay._renderedComponent.getDOMNode().blur();

    this.setState({
      searchText: ""
    }, function () {
      _this2.props.onSelectMatch(payload);
      _this2.props.onSearch(_this2.state.searchText);
    });
  },

  _onFocus: function () {
    this.refs.overlay.show();
  },

  _onBlur: function () {
    this.refs.overlay.hide();
  },

  render: function () {
    var searchIcon = "ficon ficon-search";
    if (this.props.iconClass) {
      searchIcon += " " + this.props.iconClass;
    }

    var inputClass = "form-control ";
    if (this.props.inputClass) {
      inputClass += this.props.inputClass;
    }

    return React.createElement("div", {
      className: this.props.className
    }, React.createElement(OverlayTrigger, {
      ref: "overlay",
      trigger: "manual",
      defaultOverlayShown: false,
      overlay: React.createElement(UITypeaheadSelectOverlay, {
        positionLeftOverride: this.state.searchLeft,
        searchIndex: this.state.searchIndex,
        selectActive: this._selectActive,
        selectMatch: this._selectMatch,
        options: this.props.options
      }),
      placement: "bottom"
    }, React.createElement("input", {
      onFocus: this._onFocus,
      onBlur: this._onBlur,
      autoComplete: "off",
      type: "text",
      className: inputClass,
      placeholder: this.props.placeholder,
      onKeyDown: this._onKeyDown,
      onChange: this._onChange,
      value: this.state.searchText
    })), React.createElement("i", {
      className: searchIcon
    }));
  }
});