"use strict";

var React = require("react/addons");

var _require = require("lodash");

var assign = _require.assign;

var cx = require("classnames");

/**
 * AutoComplete provides a way to have a typeahead with a dropdown menu.
 */
var AutoComplete = React.createClass({
  displayName: "AutoComplete",

  propTypes: {
    /**
     * Function to extrapolate the value of an item from an item.
     */
    getItemValue: React.PropTypes.func,

    /**
     * Initial value in the input
     */
    initialValue: React.PropTypes.any,

    /**
     * Class to be applied to the input
     */
    inputClass: React.PropTypes.string,

    /**
     * Array of items to display in the dropdown.
     */
    items: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,

    /**
     * Style attributes to be applied to the menu.
     */
    menuStyle: React.PropTypes.object,

    /**
     * Function to invoke when the value has changed.
     */
    onChange: React.PropTypes.func,

    /**
     * Function that is used to render individual items.  Gets the item and the highlighted index as parameters.
     */
    renderItem: React.PropTypes.func.isRequired,

    /**
     * Function that is used to render the menu.  Takes items and current value as parameters.
     */
    renderMenu: React.PropTypes.func,

    /**
     * Function used to determine whether the item in the list should render. Takes item and current value as parameters.
     */
    shouldItemRender: React.PropTypes.func,

    /**
     * Sorting function used to sort items in the Menu.  Takes both items and current value as parameters.
     */
    sortItems: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onChange: function onChange() {},
      getItemValue: function getItemValue(item) {
        return item;
      },
      inputClass: "",
      renderMenu: function renderMenu(items /*, value */) {
        return React.createElement(
          "div",
          { style: this.menuStyle },
          items
        );
      },
      shouldItemRender: function shouldItemRender() {
        return true;
      },
      sortItems: function sortItems() {
        return 0;
      },
      menuStyle: {
        borderRadius: "3px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        background: "rgba(255, 255, 255, 0.9)",
        padding: "2px 0",
        fontSize: "90%"
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.initialValue || "",
      isOpen: false,
      highlightedIndex: null,
      performAutoCompleteOnKeyUp: false,
      performAutoCompleteOnUpdate: false
    };
  },

  keyDownHandlers: {
    ArrowDown: function ArrowDown(event) {
      event.preventDefault();

      var highlightedIndex = this.state.highlightedIndex;

      var index = highlightedIndex === null || highlightedIndex === this.getFilteredItems().length - 1 ? 0 : highlightedIndex + 1;

      this.setState({
        highlightedIndex: index,
        isOpen: true,
        performAutoCompleteOnKeyUp: true
      });
    },

    ArrowUp: function ArrowUp(event) {
      event.preventDefault();
      var highlightedIndex = this.state.highlightedIndex;

      var index = highlightedIndex === 0 || highlightedIndex === null ? this.getFilteredItems().length - 1 : highlightedIndex - 1;

      this.setState({
        highlightedIndex: index,
        isOpen: true,
        performAutoCompleteOnKeyUp: true
      });
    },

    Enter: function Enter() {
      var _this = this;

      var highlightedIndex = this.state.highlightedIndex;

      if (highlightedIndex === null) {
        // hit enter after focus but before doing anything so no autocomplete attempt yet
        this.setState({
          isOpen: false
        }, function () {
          React.findDOMNode(_this.refs.input).select();
        });
      } else {
        this.setState({
          value: this.props.getItemValue(this.getFilteredItems()[highlightedIndex]),
          isOpen: false,
          highlightedIndex: 0
        }, function () {
          React.findDOMNode(_this.refs.input).select();
        });
      }
    },

    Escape: function Escape() {
      this.setState({
        highlightedIndex: null,
        isOpen: false
      });
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps() {
    this.setState({ performAutoCompleteOnUpdate: true });
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    var _this = this;

    var _state = this.state;
    var isOpen = _state.isOpen;
    var performAutoCompleteOnUpdate = _state.performAutoCompleteOnUpdate;

    if (isOpen === true && prevState.isOpen === false) {
      this.setMenuPositions();
    }
    if (isOpen && performAutoCompleteOnUpdate) {
      /* eslint react/no-did-update-set-state: 0 */
      // Allowing this because it only happens under certain conditions
      this.setState({ performAutoCompleteOnUpdate: false }, function () {
        _this.maybeAutoCompleteText();
      });
    }
  },

  handleKeyDown: function handleKeyDown(event) {
    if (this.keyDownHandlers[event.key]) {
      this.keyDownHandlers[event.key].call(this, event);
    } else {
      this.setState({
        highlightedIndex: null,
        isOpen: true
      });
    }
  },

  handleChange: function handleChange(event) {
    var _this = this;

    this.setState({
      value: event.target.value,
      performAutoCompleteOnKeyUp: true
    }, function () {
      _this.props.onChange(_this.state.value);
    });
  },

  handleKeyUp: function handleKeyUp() {
    var _this = this;

    if (this.state.performAutoCompleteOnKeyUp) {
      this.setState({ performAutoCompleteOnKeyUp: false }, function () {
        _this.maybeAutoCompleteText();
      });
    }
  },

  getFilteredItems: function getFilteredItems() {
    var _this = this;

    return this.props.items.filter(function (item) {
      return _this.props.shouldItemRender(item, _this.state.value);
    }).sort(function (a, b) {
      return _this.props.sortItems(a, b, _this.state.value);
    });
  },

  maybeAutoCompleteText: function maybeAutoCompleteText() {
    var _this = this;

    if (this.state.value === "") {
      return;
    }

    var highlightedIndex = this.state.highlightedIndex;

    var items = this.getFilteredItems();
    if (items.length === 0) {
      return;
    }

    var matchedItem = highlightedIndex !== null ? items[highlightedIndex] : items[0];
    var itemValue = this.props.getItemValue(matchedItem);
    var itemValueDoesMatch = itemValue.toLowerCase().indexOf(this.state.value.toLowerCase()) === 0;

    if (itemValueDoesMatch) {
      (function () {
        var node = React.findDOMNode(_this.refs.input);
        var setSelection = function () {
          node.value = itemValue;
          node.setSelectionRange(_this.state.value.length, itemValue.length);
        };

        if (highlightedIndex === null) {
          _this.setState({ highlightedIndex: 0 }, setSelection);
        } else {
          setSelection();
        }
      })();
    }
  },

  setMenuPositions: function setMenuPositions() {
    var node = React.findDOMNode(this.refs.input);
    var rect = node.getBoundingClientRect();
    var computedStyle = getComputedStyle(node);
    var marginBottom = parseInt(computedStyle.marginBottom, 10);
    var marginLeft = parseInt(computedStyle.marginLeft, 10);
    var marginRight = parseInt(computedStyle.marginRight, 10);
    this.setState({
      menuTop: rect.bottom + marginBottom,
      menuLeft: rect.left + marginLeft,
      menuWidth: rect.width + marginLeft + marginRight
    });
  },

  renderMenu: function renderMenu() {
    var _this = this;

    var _state = this.state;
    var menuTop = _state.menuTop;
    var menuLeft = _state.menuLeft;
    var menuWidth = _state.menuWidth;
    var value = _state.value;
    var highlightedIndex = _state.highlightedIndex;

    var items = this.getFilteredItems().map(function (item, index) {
      return _this.props.renderItem(item, highlightedIndex === index);
    });
    var style = assign({
      left: menuLeft,
      top: menuTop,
      minWidth: menuWidth,
      position: "fixed"
    }, this.props.menuStyle);
    return React.createElement(
      "div",
      { style: style },
      this.props.renderMenu(items, value)
    );
  },

  getActiveItemValue: function getActiveItemValue() {
    if (this.state.highlightedIndex === null) {
      return "";
    }
    return this.props.getItemValue(this.props.items[this.state.highlightedIndex]);
  },

  render: function render() {
    var _this = this;

    var inputClass = cx("form-control", this.props.inputClass);
    return React.createElement(
      "div",
      { style: { display: "inline-block" } },
      React.createElement("input", {
        className: inputClass,
        role: "combobox",
        "aria-label": this.getActiveItemValue(),
        ref: "input",
        onFocus: function () {
          return _this.setState({ isOpen: true });
        },
        onBlur: function () {
          return _this.setState({ isOpen: false, highlightedIndex: null });
        },
        onChange: this.handleChange,
        onKeyDown: this.handleKeyDown,
        onKeyUp: this.handleKeyUp,
        value: this.state.value }),
      this.state.isOpen && this.renderMenu()
    );
  }
});

module.exports = AutoComplete;
/* value */