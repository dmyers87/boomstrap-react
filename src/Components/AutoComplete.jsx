const React    = require('react/addons');
const {assign} = require('lodash');
const cx       = require('classnames');

/**
 * AutoComplete provides a way to have a typeahead with a dropdown menu.
 */
const AutoComplete = React.createClass({
  displayName: 'AutoComplete',

  propTypes: {
    /**
     * Function to extrapolate the value of an item from an item.
     */
    getItemValue:     React.PropTypes.func,

    /**
     * Initial value in the input
     */
    initialValue:     React.PropTypes.any,

    /**
     * Class to be applied to the input
     */
    inputClass:       React.PropTypes.string,

    /**
     * Array of items to display in the dropdown.
     */
    items:            React.PropTypes.arrayOf(React.PropTypes.any).isRequired,

    /**
     * Function to invoke when the value has changed.
     */
    onChange:         React.PropTypes.func,

    /**
     * Function that is used to render individual items.  Gets the item and whether or not this index is highlighted as parameters.
     */
    renderItem:       React.PropTypes.func.isRequired,

    /**
     * Function that is used to render the menu.  Takes items and current value as parameters.
     */
    renderMenu:       React.PropTypes.func,

    /**
     * Function used to determine whether the item in the list should render. Takes item and current value as parameters.
     */
    shouldItemRender: React.PropTypes.func,

    /**
     * Sorting function used to sort items in the Menu.  Takes both items and current value as parameters.
     */
    sortItems:        React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onChange(/* value */) {},
      getItemValue(item) {
        return item;
      },
      inputClass: '',
      renderMenu(items /*, value */) {
        return (
          <div>
            {items}
          </div>
        );
      },
      shouldItemRender() {
        return true;
      },
      sortItems() {
        return 0;
      }
    };
  },

  getInitialState() {
    return {
      value:                       this.props.initialValue || '',
      isOpen:                      false,
      highlightedIndex:            null,
      performAutoCompleteOnKeyUp:  false,
      performAutoCompleteOnUpdate: false
    };
  },

  keyDownHandlers: {
    ArrowDown(event) {
      event.preventDefault();

      const { highlightedIndex } = this.state;
      const index = (
        highlightedIndex === null ||
        highlightedIndex === this.getFilteredItems().length - 1
      ) ?  0 : highlightedIndex + 1;

      this.setState({
        highlightedIndex:           index,
        isOpen:                     true,
        performAutoCompleteOnKeyUp: true
      });
    },

    ArrowUp(event) {
      event.preventDefault();
      const { highlightedIndex } = this.state;
      const index = (
        highlightedIndex === 0 ||
        highlightedIndex === null
      ) ? this.getFilteredItems().length - 1 : highlightedIndex - 1;

      this.setState({
        highlightedIndex:           index,
        isOpen:                     true,
        performAutoCompleteOnKeyUp: true
      });
    },

    Enter() {
      const { highlightedIndex } = this.state;
      if (highlightedIndex === null) {
        // hit enter after focus but before doing anything so no autocomplete attempt yet
        this.setState({
          isOpen: false
        }, () => {
          React.findDOMNode(this.refs.input).select();
        });
      } else {
        this.setState({
          value: this.props.getItemValue(
            this.getFilteredItems()[highlightedIndex]
          ),
          isOpen: false,
          highlightedIndex: 0
        }, () => {
          React.findDOMNode(this.refs.input).select();
        });
      }
    },

    Escape() {
      this.setState({
        highlightedIndex: null,
        isOpen: false
      });
    }
  },

  componentWillReceiveProps() {
    this.setState({ performAutoCompleteOnUpdate: true });
  },

  componentDidUpdate(prevProps, prevState) {
    const { isOpen, performAutoCompleteOnUpdate } = this.state;
    if (isOpen === true && prevState.isOpen === false) {
      this.setMenuPositions();
    }
    if (isOpen && performAutoCompleteOnUpdate) {
      /* eslint react/no-did-update-set-state: 0 */
      // Allowing this because it only happens under certain conditions
      this.setState({ performAutoCompleteOnUpdate: false }, () => {
        this.maybeAutoCompleteText();
      });
    }
  },

  handleKeyDown(event) {
    if (this.keyDownHandlers[event.key]) {
      this.keyDownHandlers[event.key].call(this, event);
    } else {
      this.setState({
        highlightedIndex: null,
        isOpen: true
      });
    }
  },

  handleChange(event) {
    this.setState({
      value: event.target.value,
      performAutoCompleteOnKeyUp: true
    }, () => {
      this.props.onChange(this.state.value);
    });
  },

  handleKeyUp() {
    if (this.state.performAutoCompleteOnKeyUp) {
      this.setState({ performAutoCompleteOnKeyUp: false }, () => {
        this.maybeAutoCompleteText();
      });
    }
  },

  getFilteredItems() {
    return this.props.items.filter((item) => (
      this.props.shouldItemRender(item, this.state.value)
    )).sort((a, b) => (
      this.props.sortItems(a, b, this.state.value)
    ));
  },

  maybeAutoCompleteText() {
    if (this.state.value === '') {
      return;
    }

    const { highlightedIndex } = this.state;
    const items = this.getFilteredItems();
    if (items.length === 0) {
      return;
    }

    const matchedItem = highlightedIndex !== null ?
      items[highlightedIndex] : items[0];
    const itemValue = this.props.getItemValue(matchedItem);
    const itemValueDoesMatch = (itemValue.toLowerCase().indexOf(
      this.state.value.toLowerCase()
    ) === 0);

    if (itemValueDoesMatch) {
      let node = React.findDOMNode(this.refs.input);
      const setSelection = () => {
        node.value = itemValue;
        node.setSelectionRange(this.state.value.length, itemValue.length);
      };

      if (highlightedIndex === null) {
        this.setState({ highlightedIndex: 0 }, setSelection);
      } else {
        setSelection();
      }
    }
  },

  setMenuPositions() {
    const node          = React.findDOMNode(this.refs.input);
    const rect          = node.getBoundingClientRect();
    const computedStyle = getComputedStyle(node);
    const marginBottom  = parseInt(computedStyle.marginBottom, 10);
    const marginLeft    = parseInt(computedStyle.marginLeft, 10);
    const marginRight   = parseInt(computedStyle.marginRight, 10);
    this.setState({
      menuTop:   rect.bottom + marginBottom,
      menuLeft:  rect.left + marginLeft,
      menuWidth: rect.width + marginLeft + marginRight
    });
  },

  renderMenu() {
    const { menuTop, menuLeft, menuWidth, value, highlightedIndex } = this.state;
    const items = this.getFilteredItems().map((item, index) => (
      this.props.renderItem(item, highlightedIndex === index)
    ));
    const style = {
      left:     menuLeft,
      top:      menuTop,
      minWidth: menuWidth,
      position: 'fixed'
    };
    return (
      <div style={style}>
        {this.props.renderMenu(items, value)}
      </div>
    );
  },

  getActiveItemValue() {
    if (this.state.highlightedIndex === null) {
      return '';
    }
    return this.props.getItemValue(this.props.items[this.state.highlightedIndex]);
  },

  render() {
    const inputClass = cx('form-control', this.props.inputClass);
    return (
      <div style={{display: 'inline-block'}}>
        <input
          className={inputClass}
          role='combobox'
          aria-label={this.getActiveItemValue()}
          ref='input'
          onFocus={() => this.setState({ isOpen: true })}
          onBlur={() => this.setState({ isOpen: false, highlightedIndex: null })}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          value={this.state.value} />
        {this.state.isOpen && this.renderMenu()}
      </div>
    );
  }
});

module.exports = AutoComplete;
