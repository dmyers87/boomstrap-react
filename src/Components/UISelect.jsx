'use strict';

var React = require('react/addons');
var cx    = React.addons.classSet;

module.exports = React.createClass({
  displayName: 'UISelect',
  propTypes: {
    payload: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    text: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        payload: React.PropTypes.any,
        text: React.PropTypes.any
      })
    ),
    buttonClass: React.PropTypes.string,
    inputClass: React.PropTypes.string,
    includeSearchInValues: React.PropTypes.bool,
    translateSearchValue: React.PropTypes.func,
    onChange: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    alignRight: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
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
        this.refs.searchInput.getDOMNode().focus();
      });
    }
  },

  updateSearch(e) {
    this.setState({
      search: e.target.value || ''
    }, () => {
      this.setActiveItem(0);
    });
  },

  setActiveItem(index) {
    this.setState({
      activeIndex: index
    }, () => {
      this._ensureHighlightVisible();
    });
  },

  _ensureHighlightVisible() {
    var containerRef = this.refs.dropdownMenu;
    var highlightedRef = this.refs['dropdownMenuItem_' + this.state.activeIndex];
    if (containerRef && highlightedRef) {
      var container   = containerRef.getDOMNode();
      var highlighted = highlightedRef.getDOMNode();
      var posY   = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
      var height = container.offsetHeight;

      if (posY > height) {
        container.scrollTop += posY - height;
      } else if (posY < highlighted.clientHeight) {
        container.scrollTop -= highlighted.clientHeight - posY;
      }
    }
  },

  getFilteredItems() {
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

      return items.filter((item) => {
        var itemText    = item.text || '';
        var itemPayload = item.payload;
        if (itemPayload === null) {
          itemPayload = '';
        } else {
          itemPayload = itemPayload.toString();
        }
        return (
          itemText.toLowerCase().indexOf(searchText) !== -1 ||
          itemPayload.toLowerCase().indexOf(searchText) !== -1
        );
      });
    }

    return [];
  },

  select(index) {
    var selectedItem = this.getFilteredItems()[index];
    this.setState({
      search: '',
      open: false,
      allowBlurEvent: true
    }, () => {
      this.setActiveItem(0);
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

    var showElement;
    var isEmpty = !this.props.text;
    var elementClass;
    if (!this.state.open) {
      elementClass = 'btn btn-default form-control ui-select-match ' + (this.props.buttonClass || '');
      showElement = (
        <button type='button' tabIndex='-1'
          className={elementClass}
          disabled={this.props.disabled}
          onClick={this.activate} placeholder={this.props.placeholder}>
          { isEmpty ?
            (<span className='text-muted'>{this.props.placeholder}</span>) :
            (<span><span>{this.props.text}</span></span>) }
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
        <li className='ui-select-choices-group' key={index} ref={'dropdownMenuItem_' + index}>
          <div
            className={rowClass}
            onMouseEnter={this.setActiveItem.bind(this, index)}
            onClick={this.select.bind(this, index)}>
            <a href='javascript:void(0)' className='ui-select-choices-row-inner'>
              <div>{item.text}</div>
            </a>
          </div>
        </li>
      );
    });

    var dropdownMenuClass = cx({
      'ui-select-choices ui-select-choices-content dropdown-menu': true,
      'dropdown-menu-right': this.props.alignRight
    });

    return (
      <div className={containerClass}>
        {showElement}
        {this.state.open && dropdownElements.length ?
          <ul
            ref='dropdownMenu'
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
