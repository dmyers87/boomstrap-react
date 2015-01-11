"use strict";

var React = require("react/addons");
var cx = React.addons.classSet;

var Fauxbox = require("./Fauxbox.jsx");

module.exports = React.createClass({
  displayName: "UI MultiSelect",

  propTypes: {
    selectedValues: React.PropTypes.arrayOf(React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number])),
    placeholder: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      payload: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
      text: React.PropTypes.string
    })),
    text: React.PropTypes.string,
    buttonClass: React.PropTypes.string,
    inputClass: React.PropTypes.string,
    onChange: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    alignRight: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      selectedValues: [],
      disabled: false,
      alignRight: false
    };
  },

  getInitialState: function () {
    return {
      open: false,
      search: null,
      activeIndex: 0,
      allowBlurEvent: false
    };
  },

  activate: function () {
    var _this = this;
    if (!this.props.disabled) {
      this.setState({
        open: true,
        allowBlurEvent: true
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
    var items = this.props.items && this.props.items.slice();
    var searchText;
    if (items && items.length) {
      if (!this.state.search) {
        return items;
      }

      searchText = this.state.search.toLowerCase();

      return items.filter(function (item) {
        return item.text.toLowerCase().indexOf(searchText) !== -1;
      });
    }

    return [];
  },

  select: function (index) {
    var _this2 = this;
    var selectedItem = this.getFilteredItems()[index];
    this.setState({
      search: "",
      open: false,
      activeIndex: 0,
      allowBlurEvent: true
    }, function () {
      var selectedValues;
      if (_this2._payloadIsSelected(selectedItem.payload)) {
        selectedValues = _this2.props.selectedValues.filter(function (val) {
          return val !== selectedItem.payload;
        });
      } else {
        selectedValues = _this2.props.selectedValues.concat([selectedItem.payload]);
      }
      _this2.props.onChange(selectedValues);
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

  _renderBaseElement: function () {
    var showElement, innerElement;
    var isEmpty = !this.props.text;
    var elementClass;

    if (!this.state.open) {
      elementClass = "btn btn-default form-control ui-select-match " + (this.props.buttonClass || "");

      if (isEmpty) {
        innerElement = React.createElement("span", {
          className: "text-muted"
        }, this.props.placeholder);
      } else {
        innerElement = React.createElement("span", null, React.createElement("span", null, this.props.text));
      }

      showElement = React.createElement("button", {
        type: "button",
        tabIndex: "-1",
        className: elementClass,
        disabled: this.props.disabled,
        onClick: this.activate,
        placeholder: this.props.placeholder
      }, innerElement, React.createElement("span", {
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

    return showElement;
  },

  _payloadIsSelected: function (payload) {
    return this.props.selectedValues.filter(function (selectedValue) {
      return selectedValue === payload;
    }).length > 0;
  },

  render: function () {
    var _this3 = this;
    var showElement = this._renderBaseElement();

    var containerClass = cx({
      "ui-select-bootstrap dropdown": true,
      open: this.state.open
    });

    var dropdownElements = this.getFilteredItems().map(function (item, index) {
      var rowClass = cx({
        "ui-select-choices-row": true,
        active: _this3.state.activeIndex === index
      });

      var itemSelected = _this3._payloadIsSelected(item.payload);

      return React.createElement("li", {
        className: "ui-select-choices-group",
        key: index
      }, React.createElement("div", {
        className: rowClass,
        onMouseEnter: _this3.setActiveItem.bind(_this3, index),
        onClick: _this3.select.bind(_this3, index)
      }, React.createElement("a", {
        href: "javascript:void(0)",
        className: "ui-select-choices-row-inner"
      }, React.createElement(Fauxbox, {
        id: "ui-multi-select-" + item.payload,
        checked: itemSelected,
        label: item.text
      }))));
    });

    var dropdownMenuClass = cx({
      "ui-select-choices ui-select-choices-content dropdown-menu": true,
      "dropdown-menu-right": this.props.alignRight
    });

    return React.createElement("div", {
      className: containerClass
    }, showElement, this.state.open && dropdownElements.length ? React.createElement("ul", {
      className: dropdownMenuClass,
      onMouseEnter: this.preventBlurEvent,
      onMouseLeave: this.allowBlurEvent,
      role: "menu",
      "aria-labelledby": "dLabel"
    }, dropdownElements) : null);
  }
});