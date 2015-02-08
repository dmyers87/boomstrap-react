"use strict";

var React = require("react/addons");
var cx = React.addons.classSet;

module.exports = React.createClass({
  displayName: "UISelect",
  propTypes: {
    payload: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    text: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      payload: React.PropTypes.any,
      text: React.PropTypes.any
    })),
    buttonClass: React.PropTypes.string,
    inputClass: React.PropTypes.string,
    includeSearchInValues: React.PropTypes.bool,
    translateSearchValue: React.PropTypes.func,
    onChange: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    alignRight: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
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
    var _this2 = this;
    this.setState({
      search: e.target.value || ""
    }, function () {
      _this2.setActiveItem(0);
    });
  },

  setActiveItem: function (index) {
    var _this3 = this;
    this.setState({
      activeIndex: index
    }, function () {
      _this3._ensureHighlightVisible();
    });
  },

  _ensureHighlightVisible: function () {
    var containerRef = this.refs.dropdownMenu;
    var highlightedRef = this.refs["dropdownMenuItem_" + this.state.activeIndex];
    if (containerRef && highlightedRef) {
      var container = containerRef.getDOMNode();
      var highlighted = highlightedRef.getDOMNode();
      var posY = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
      var height = container.offsetHeight;

      if (posY > height) {
        container.scrollTop += posY - height;
      } else if (posY < highlighted.clientHeight) {
        container.scrollTop -= highlighted.clientHeight - posY;
      }
    }
  },

  getFilteredItems: function () {
    var items = this.props.items && this.props.items.slice();
    var searchText;
    if (items) {
      if (this.props.includeSearchInValues && this.state.search) {
        items.unshift({
          payload: this.state.search,
          text: this.props.translateSearchValue(this.state.search)
        });
      }

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
    var _this4 = this;
    var selectedItem = this.getFilteredItems()[index];
    this.setState({
      search: "",
      open: false,
      allowBlurEvent: true
    }, function () {
      _this4.setActiveItem(0);
      _this4.props.onChange(selectedItem);
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
    var _this5 = this;
    var containerClass = cx({
      "ui-select-bootstrap dropdown": true,
      open: this.state.open
    });

    var showElement;
    var isEmpty = !this.props.text;
    var elementClass;
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
      }, this.props.placeholder) : React.createElement("span", null, React.createElement("span", null, this.props.text)), React.createElement("span", {
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
        active: _this5.state.activeIndex === index
      });

      return React.createElement("li", {
        className: "ui-select-choices-group",
        key: index,
        ref: "dropdownMenuItem_" + index
      }, React.createElement("div", {
        className: rowClass,
        onMouseEnter: _this5.setActiveItem.bind(_this5, index),
        onClick: _this5.select.bind(_this5, index)
      }, React.createElement("a", {
        href: "javascript:void(0)",
        className: "ui-select-choices-row-inner"
      }, React.createElement("div", null, item.text))));
    });

    var dropdownMenuClass = cx({
      "ui-select-choices ui-select-choices-content dropdown-menu": true,
      "dropdown-menu-right": this.props.alignRight
    });

    return React.createElement("div", {
      className: containerClass
    }, showElement, this.state.open && dropdownElements.length ? React.createElement("ul", {
      ref: "dropdownMenu",
      className: dropdownMenuClass,
      onMouseEnter: this.preventBlurEvent,
      onMouseLeave: this.allowBlurEvent,
      role: "menu",
      "aria-labelledby": "dLabel"
    }, dropdownElements) : null);
  }
});