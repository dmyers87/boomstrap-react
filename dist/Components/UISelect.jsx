"use strict";

var React = require("react/addons");
var cx = React.addons.classSet;

module.exports = React.createClass({
  displayName: "UISelect",

  propTypes: {
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    valueTranslation: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      value: React.PropTypes.any,
      valueTranslation: React.PropTypes.any
    })),
    buttonClass: React.PropTypes.string,
    inputClass: React.PropTypes.string,
    onChange: React.PropTypes.func,
    disabled: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      disabled: false
    };
  },

  getInitialState: function () {
    return {
      open: false,
      activeIndex: 0
    };
  },

  activate: function () {
    var _this = this;
    if (!this.props.disabled) {
      this.setState({
        open: true
      }, function () {
        _this.refs.searchInput.getDOMNode().focus();
      });
    }
  },

  updateSearch: function (e) {
    this.setState({
      search: e.target.value || "",
      activeIndex: 0
    });
  },

  setActiveItem: function (index) {
    this.setState({
      activeIndex: index
    });
  },

  getFilteredItems: function () {
    var _this2 = this;
    return this.props.items.filter(function (item) {
      return !_this2.state.search || item.valueTranslation.indexOf(_this2.state.search) !== -1;
    });
  },

  select: function (index) {
    var _this3 = this;
    var selectedItem = this.getFilteredItems()[index];
    this.setState({
      search: "",
      open: false,
      activeIndex: 0,
      allowBlurEvent: true
    }, function () {
      _this3.props.onChange(selectedItem);
    });
  },

  onKeyDown: function (e) {
    var filteredItemMaxIndex, activeIndex;

    if (e.key === "Enter") {
      e.preventDefault();
      this.select(this.state.activeIndex);
    } else {
      filteredItemMaxIndex = this.getFilteredItems().length - 1;
      activeIndex = this.state.activeIndex;

      if (e.key === "ArrowDown") {
        if (activeIndex < filteredItemMaxIndex) {
          e.preventDefault();
          this.setActiveItem(activeIndex + 1);
        }
      } else if (e.key === "ArrowUp" && activeIndex > 0) {
        e.preventDefault();
        this.setActiveItem(activeIndex - 1);
      }
    }
  },

  allowBlurEvent: function () {
    this.setState({
      allowBlurEvent: true
    });
  },

  preventBlurEvent: function () {
    this.setState({
      allowBlurEvent: false
    });
  },

  onBlur: function () {
    if (this.state.allowBlurEvent) {
      this.setState({
        open: false
      });
    }
  },

  render: function () {
    var _this4 = this;
    var containerClass = cx({
      "ui-select-bootstrap dropdown": true,
      open: this.state.open
    });

    var showElement, elementClass;
    var isEmpty = !this.props.valueTranslation;

    if (!this.state.open) {
      elementClass = "btn btn-default form-control ui-select-match " + (this.props.buttonClass || "");
      showElement = React.createElement("button", {
        type: "button",
        tabIndex: "-1",
        className: elementClass,
        disabled: this.props.disabled,
        onClick: this.activate,
        placeholder: this.props.placeholder
      }, isEmpty ? React.createElement("span", {
        className: "text-muted"
      }, this.props.placeholder) : React.createElement("span", null, React.createElement("span", null, this.props.valueTranslation)), React.createElement("span", {
        className: "caret"
      }));
    } else {
      elementClass = "form-control ui-select-search " + (this.props.inputClass || "");
      showElement = React.createElement("input", {
        type: "text",
        autoComplete: "off",
        tabIndex: "-1",
        ref: "searchInput",
        className: elementClass,
        placeholder: this.props.placeholder,
        value: this.state.search,
        onBlur: this.onBlur,
        onChange: this.updateSearch,
        onKeyDown: this.onKeyDown
      });
    }

    var dropdownElements = this.getFilteredItems().map(function (item, index) {
      var rowClass = cx({
        "ui-select-choices-row": true,
        active: _this4.state.activeIndex === index
      });

      return React.createElement("li", {
        className: "ui-select-choices-group",
        key: index
      }, React.createElement("div", {
        className: rowClass,
        onMouseEnter: _this4.setActiveItem.bind(_this4, index),
        onClick: _this4.select.bind(_this4, index)
      }, React.createElement("a", {
        href: "javascript:void(0)",
        className: "ui-select-choices-row-inner"
      }, React.createElement("div", null, item.valueTranslation))));
    });

    return React.createElement("div", {
      className: containerClass
    }, showElement, this.state.open && dropdownElements.length ? React.createElement("ul", {
      className: "ui-select-choices ui-select-choices-content dropdown-menu",
      onMouseEnter: this.preventBlurEvent,
      onMouseLeave: this.allowBlurEvent,
      role: "menu",
      "aria-labelledby": "dLabel"
    }, dropdownElements) : null);
  }
});