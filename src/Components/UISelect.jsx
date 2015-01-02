'use strict';

var React = require('react/addons');
var cx    = React.addons.classSet;

module.exports = React.createClass({
  displayName: 'UISelect',

  propTypes: {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    valueTranslation: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.any,
        valueTranslation: React.PropTypes.any
      })
    ),
    buttonClass: React.PropTypes.string,
    inputClass: React.PropTypes.string,
    onChange: React.PropTypes.func,
    disabled: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      disabled: false
    };
  },

  getInitialState() {
    return {
      open: false,
      activeIndex: 0
    };
  },

  activate() {
    if (!this.props.disabled) {
      this.setState({
        open: true
      }, () => {
        this.refs.searchInput.getDOMNode().focus();
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
    return this.props.items.filter((item) => {
      return !this.state.search || item.valueTranslation.indexOf(this.state.search) !== -1;
    });
  },

  select(index) {
    var selectedItem = this.getFilteredItems()[index];
    this.setState({
      search: '',
      open: false,
      activeIndex: 0,
      allowBlurEvent: true
    }, () => {
      this.props.onChange(selectedItem);
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

  render() {
    var containerClass = cx({
      'ui-select-bootstrap dropdown': true,
      'open': this.state.open
    });

    var showElement, elementClass;
    var isEmpty = !this.props.valueTranslation;

    if (!this.state.open) {
      elementClass = 'btn btn-default form-control ui-select-match ' + (this.props.buttonClass || '');
      showElement = (
        <button type='button' tabIndex='-1'
          className={elementClass}
          disabled={this.props.disabled}
          onClick={this.activate} placeholder={this.props.placeholder}>
          { isEmpty ?
            (<span className='text-muted'>{this.props.placeholder}</span>) :
            (<span><span>{this.props.valueTranslation}</span></span>) }
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

    var dropdownElements = this.getFilteredItems().map((item, index) => {
      var rowClass = cx({
        'ui-select-choices-row': true,
        'active': this.state.activeIndex === index
      });

      return (
        <li className='ui-select-choices-group' key={index}>
          <div
            className={rowClass}
            onMouseEnter={this.setActiveItem.bind(this, index)}
            onClick={this.select.bind(this, index)}>
            <a href='javascript:void(0)' className='ui-select-choices-row-inner'>
              <div>{item.valueTranslation}</div>
            </a>
          </div>
        </li>
      );
    });

    return (
      <div className={containerClass}>
        {showElement}
        {this.state.open && dropdownElements.length ?
          <ul
          className='ui-select-choices ui-select-choices-content dropdown-menu'
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
