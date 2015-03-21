'use strict';

var React = require('react/addons');
var cx    = require('classnames');

var Fauxbox = require('./Fauxbox.jsx');

module.exports = React.createClass({
  displayName: 'UI MultiSelect',

  propTypes: {
    selectedValues: React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ])
    ),
    placeholder: React.PropTypes.string,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        payload: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number
        ]),
        text: React.PropTypes.string
      })
    ),
    text: React.PropTypes.string,
    buttonClass: React.PropTypes.string,
    inputClass: React.PropTypes.string,
    onChange: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    alignRight: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      selectedValues: [],
      disabled: false,
      alignRight: false
    };
  },

  getInitialState() {
    return {
      open: false,
      search: null,
      activeIndex: 0,
      allowBlurEvent: false
    };
  },

  activate() {
    if (!this.props.disabled) {
      this.setState({
        open: true,
        allowBlurEvent: true
      }, () => {
        React.findDOMNode(this.refs.searchInput).focus();
      });
    }
  },

  updateSearch(e) {
    this.setState({
      search: e.target.value || '',
      activeIndex: 0
    });
  },

  setActiveItem(index) {
    this.setState({
      activeIndex: index
    });
  },

  getFilteredItems() {
    var items = this.props.items && this.props.items.slice();
    var searchText;
    if (items && items.length) {
      if (!this.state.search) {
        return items;
      }

      searchText = this.state.search.toLowerCase();

      return items.filter((item) => {
        return item.text.toLowerCase().indexOf(searchText) !== -1;
      });
    }

    return [];
  },

  select(index) {
    var selectedItem = this.getFilteredItems()[index];
    this.setState({
      search: '',
      open: false,
      activeIndex: 0,
      allowBlurEvent: true
    }, () => {
      var selectedValues;
      if (this._payloadIsSelected(selectedItem.payload)) {
        selectedValues = this.props.selectedValues.filter((val) => {
          return val !== selectedItem.payload;
        });
      } else {
        selectedValues = this.props.selectedValues.concat([selectedItem.payload]);
      }
      this.props.onChange(selectedValues);
    });
  },

  onKeyDown(e) {
    var filteredItemMaxIndex, activeIndex;

    if (e.key === 'Enter') {
      e.preventDefault();
      this.select(this.state.activeIndex);
    } else {

      filteredItemMaxIndex = this.getFilteredItems().length - 1;
      activeIndex = this.state.activeIndex;

      if (e.key === 'ArrowDown') {
        if (activeIndex < filteredItemMaxIndex) {
          e.preventDefault();
          this.setActiveItem(activeIndex + 1);
        }
      } else if (e.key === 'ArrowUp' && activeIndex > 0) {
        e.preventDefault();
        this.setActiveItem(activeIndex - 1);
      }
    }
  },

  allowBlurEvent() {
    this.setState({
      allowBlurEvent: true
    });
  },

  preventBlurEvent() {
    this.setState({
      allowBlurEvent: false
    });
  },

  onBlur() {
    if (this.state.allowBlurEvent) {
      this.setState({
        open: false
      });
    }
  },

  _renderBaseElement() {
    var showElement, innerElement;
    var isEmpty = !this.props.text;
    var elementClass;

    if (!this.state.open) {
      elementClass = 'btn btn-default form-control ui-select-match ' + (this.props.buttonClass || '');

      if (isEmpty) {
        innerElement = (
          <span className='text-muted'>{this.props.placeholder}</span>
        );
      } else {
        innerElement = (
          <span>
            <span>{this.props.text}</span>
          </span>
        );
      }

      showElement = (
        <button type='button' tabIndex='-1'
          className={elementClass}
          disabled={this.props.disabled}
          onClick={this.activate} placeholder={this.props.placeholder}>
          {innerElement}
          <span className='caret'></span>
        </button>
      );
    } else {
      elementClass = 'form-control ui-select-search ' + (this.props.inputClass || '');
      showElement = (
        <input type='text' autoComplete='off' tabIndex='-1' ref='searchInput'
          className={elementClass}
          placeholder={this.props.placeholder}
          value={this.state.search}
          onBlur={this.onBlur}
          onChange={this.updateSearch}
          onKeyDown={this.onKeyDown}/>
      );
    }

    return showElement;
  },

  _payloadIsSelected(payload) {
    return this.props.selectedValues.filter((selectedValue) => {
      return selectedValue === payload;
    }).length > 0;
  },

  render() {
    var showElement = this._renderBaseElement();

    var containerClass = cx('ui-select-bootstrap dropdown', {
      'open': this.state.open
    });

    var dropdownElements = this.getFilteredItems().map((item, index) => {
      var rowClass = cx('ui-select-choices-row', {
        'active': this.state.activeIndex === index
      });

      var itemSelected = this._payloadIsSelected(item.payload);

      return (
        <li className='ui-select-choices-group' key={index}>
          <div
            className={rowClass}
            onMouseEnter={this.setActiveItem.bind(this, index)}
            onClick={this.select.bind(this, index)}>
            <a href='javascript:void(0)' className='ui-select-choices-row-inner'>
            <Fauxbox
              id={'ui-multi-select-' + item.payload}
              checked={itemSelected}
              label={item.text}/>
            </a>
          </div>
        </li>
      );
    });

    var dropdownMenuClass = cx('ui-select-choices ui-select-choices-content dropdown-menu', {
      'dropdown-menu-right': this.props.alignRight
    });

    return (
      <div className={containerClass}>
      {showElement}
      {this.state.open && dropdownElements.length ?
        <ul
        className={dropdownMenuClass}
          onMouseEnter={this.preventBlurEvent}
          onMouseLeave={this.allowBlurEvent}
          role='menu' aria-labelledby='dLabel'>
          {dropdownElements}
        </ul>
        : null
      }
      </div>
    );
  }
});
