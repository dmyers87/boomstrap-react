"use strict";

var React = require("react/addons");
var cx = require("classnames");

var Fauxbox = require("./Fauxbox");
var FauxLink = require("./FauxLink");

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

  getDefaultProps: function getDefaultProps() {
    return {
      selectedValues: [],
      disabled: false,
      alignRight: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      open: false,
      search: null,
      activeIndex: 0,
      allowBlurEvent: false
    };
  },

  activate: function activate() {
    var _this = this;

    if (!this.props.disabled) {
      this.setState({
        open: true,
        allowBlurEvent: true
      }, function () {
        React.findDOMNode(_this.refs.searchInput).focus();
      });
    }
  },

  updateSearch: function updateSearch(e) {
    this.setState({
      search: e.target.value || "",
      activeIndex: 0
    });
  },

  setActiveItem: function setActiveItem(index) {
    this.setState({
      activeIndex: index
    });
  },

  getFilteredItems: function getFilteredItems() {
    var items = this.props.items && this.props.items.slice();
    var searchText = undefined;
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

  select: function select(index) {
    var _this = this;

    var selectedItem = this.getFilteredItems()[index];
    this.setState({
      search: "",
      open: false,
      activeIndex: 0,
      allowBlurEvent: true
    }, function () {
      var selectedValues = undefined;
      if (_this._payloadIsSelected(selectedItem.payload)) {
        selectedValues = _this.props.selectedValues.filter(function (val) {
          return val !== selectedItem.payload;
        });
      } else {
        selectedValues = _this.props.selectedValues.concat([selectedItem.payload]);
      }
      _this.props.onChange(selectedValues);
    });
  },

  onKeyDown: function onKeyDown(e) {
    var filteredItemMaxIndex = undefined;
    var activeIndex = undefined;

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

  allowBlurEvent: function allowBlurEvent() {
    this.setState({
      allowBlurEvent: true
    });
  },

  preventBlurEvent: function preventBlurEvent() {
    this.setState({
      allowBlurEvent: false
    });
  },

  onBlur: function onBlur() {
    if (this.state.allowBlurEvent) {
      this.setState({
        open: false
      });
    }
  },

  _renderBaseElement: function _renderBaseElement() {
    var showElement = undefined;
    var innerElement = undefined;
    var elementClass = undefined;
    var isEmpty = !this.props.text;

    if (!this.state.open) {
      elementClass = "btn btn-default form-control ui-select-match " + (this.props.buttonClass || "");

      if (isEmpty) {
        innerElement = React.createElement(
          "span",
          { className: "text-muted" },
          this.props.placeholder
        );
      } else {
        innerElement = React.createElement(
          "span",
          null,
          React.createElement(
            "span",
            null,
            this.props.text
          )
        );
      }

      showElement = React.createElement(
        "button",
        { type: "button", tabIndex: "-1",
          className: elementClass,
          disabled: this.props.disabled,
          onClick: this.activate, placeholder: this.props.placeholder },
        innerElement,
        React.createElement("span", { className: "caret" })
      );
    } else {
      elementClass = "form-control ui-select-search " + (this.props.inputClass || "");
      showElement = React.createElement("input", { type: "text", autoComplete: "off", tabIndex: "-1", ref: "searchInput",
        className: elementClass,
        placeholder: this.props.placeholder,
        value: this.state.search,
        onBlur: this.onBlur,
        onChange: this.updateSearch,
        onKeyDown: this.onKeyDown });
    }

    return showElement;
  },

  _payloadIsSelected: function _payloadIsSelected(payload) {
    return this.props.selectedValues.filter(function (selectedValue) {
      return selectedValue === payload;
    }).length > 0;
  },

  render: function render() {
    var _this = this;

    var showElement = this._renderBaseElement();

    var containerClass = cx("ui-select-bootstrap dropdown", {
      open: this.state.open
    });

    var dropdownElements = this.getFilteredItems().map(function (item, index) {
      var rowClass = cx("ui-select-choices-row", {
        active: _this.state.activeIndex === index
      });

      var itemSelected = _this._payloadIsSelected(item.payload);

      return React.createElement(
        "li",
        { className: "ui-select-choices-group", key: index },
        React.createElement(
          "div",
          {
            className: rowClass,
            onMouseEnter: _this.setActiveItem.bind(_this, index),
            onClick: _this.select.bind(_this, index) },
          React.createElement(
            FauxLink,
            { className: "ui-select-choices-row-inner" },
            React.createElement(Fauxbox, {
              id: "ui-multi-select-" + item.payload,
              checked: itemSelected,
              label: item.text })
          )
        )
      );
    });

    var dropdownMenuClass = cx("ui-select-choices ui-select-choices-content dropdown-menu", {
      "dropdown-menu-right": this.props.alignRight
    });

    return React.createElement(
      "div",
      { className: containerClass },
      showElement,
      this.state.open && dropdownElements.length ? React.createElement(
        "ul",
        {
          className: dropdownMenuClass,
          onMouseEnter: this.preventBlurEvent,
          onMouseLeave: this.allowBlurEvent,
          role: "menu", "aria-labelledby": "dLabel" },
        dropdownElements
      ) : null
    );
  }
});