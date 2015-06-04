'use strict';

var React = require('react/addons');

var _require = require('lodash');

var assign = _require.assign;

var cx = require('classnames');

/**
 * AutoComplete provides a way to have a typeahead with a dropdown menu.
 */
var AutoComplete = React.createClass({
  displayName: 'AutoComplete',

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
     * Function to invoke when the value has changed.
     */
    onChange: React.PropTypes.func,

    /**
     * Function that is used to render individual items.  Gets the item and whether or not this index is highlighted as parameters.
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
      inputClass: '',
      renderMenu: function renderMenu(items /*, value */) {
        return React.createElement(
          'div',
          null,
          items
        );
      },
      shouldItemRender: function shouldItemRender() {
        return true;
      },
      sortItems: function sortItems() {
        return 0;
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: this.props.initialValue || '',
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
    var _this2 = this;

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
        _this2.maybeAutoCompleteText();
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
    var _this3 = this;

    this.setState({
      value: event.target.value,
      performAutoCompleteOnKeyUp: true
    }, function () {
      _this3.props.onChange(_this3.state.value);
    });
  },

  handleKeyUp: function handleKeyUp() {
    var _this4 = this;

    if (this.state.performAutoCompleteOnKeyUp) {
      this.setState({ performAutoCompleteOnKeyUp: false }, function () {
        _this4.maybeAutoCompleteText();
      });
    }
  },

  getFilteredItems: function getFilteredItems() {
    var _this5 = this;

    return this.props.items.filter(function (item) {
      return _this5.props.shouldItemRender(item, _this5.state.value);
    }).sort(function (a, b) {
      return _this5.props.sortItems(a, b, _this5.state.value);
    });
  },

  maybeAutoCompleteText: function maybeAutoCompleteText() {
    var _this6 = this;

    if (this.state.value === '') {
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
        var node = React.findDOMNode(_this6.refs.input);
        var setSelection = function setSelection() {
          node.value = itemValue;
          node.setSelectionRange(_this6.state.value.length, itemValue.length);
        };

        if (highlightedIndex === null) {
          _this6.setState({ highlightedIndex: 0 }, setSelection);
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
    var _this7 = this;

    var _state2 = this.state;
    var menuTop = _state2.menuTop;
    var menuLeft = _state2.menuLeft;
    var menuWidth = _state2.menuWidth;
    var value = _state2.value;
    var highlightedIndex = _state2.highlightedIndex;

    var items = this.getFilteredItems().map(function (item, index) {
      return _this7.props.renderItem(item, highlightedIndex === index);
    });
    var style = {
      left: menuLeft,
      top: menuTop,
      minWidth: menuWidth,
      position: 'fixed'
    };
    return React.createElement(
      'div',
      { style: style },
      this.props.renderMenu(items, value)
    );
  },

  getActiveItemValue: function getActiveItemValue() {
    if (this.state.highlightedIndex === null) {
      return '';
    }
    return this.props.getItemValue(this.props.items[this.state.highlightedIndex]);
  },

  render: function render() {
    var _this8 = this;

    var inputClass = cx('form-control', this.props.inputClass);
    return React.createElement(
      'div',
      { style: { display: 'inline-block' } },
      React.createElement('input', {
        className: inputClass,
        role: 'combobox',
        'aria-label': this.getActiveItemValue(),
        ref: 'input',
        onFocus: function () {
          return _this8.setState({ isOpen: true });
        },
        onBlur: function () {
          return _this8.setState({ isOpen: false, highlightedIndex: null });
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