const React = require('react/addons');
const cx    = require('classnames');

const OverlayTrigger           = require('react-bootstrap').OverlayTrigger;
const UITypeaheadSelectOverlay = require('./UITypeaheadSelectOverlay.jsx');

module.exports = React.createClass({
  displayName: 'UI Typeahead Select',

  propTypes: {
    className:     React.PropTypes.string,
    iconClass:     React.PropTypes.string,
    inputClass:    React.PropTypes.string,
    placeholder:   React.PropTypes.string,
    onSearch:      React.PropTypes.func,
    onSelectMatch: React.PropTypes.func,
    options:       React.PropTypes.arrayOf(
      React.PropTypes.shape({
        element: React.PropTypes.element,
        payload: React.PropTypes.any
      })
    ),
    overlayModal:  React.PropTypes.bool
  },

  getInitialState() {
    return {
      searchText: '',
      searchIndex: 0,
      searchLeft: 0
    };
  },

  componentDidMount() {
    this._updateSearchLeft();
  },

  componentDidUpdate() {
    this._updateSearchLeft();
  },

  _updateSearchLeft() {
    const node            = React.findDOMNode(this);
    const nodeBox         = node.getBoundingClientRect();
    const documentElement = document.documentElement;
    const searchLeft = nodeBox.left + window.pageXOffset - documentElement.clientLeft;
    if (searchLeft !== this.state.searchLeft) {
      this.setState({ searchLeft });
    }
  },

  _onKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
    }

    if (e.key === 'Enter') {
      if (this.props.options &&  this.props.options.length) {
        this._selectMatch(this.props.options[this.state.searchIndex].payload);
      }
      return;
    }

    let newSearchIndex = 0;
    if (e.key === 'ArrowDown') {
      if (this.state.searchIndex !== this.props.options.length - 1) {
        newSearchIndex = this.state.searchIndex + 1;
      }

      this.setState({
        searchIndex: newSearchIndex
      });
    } else if (e.key === 'ArrowUp') {
      if (this.state.searchIndex !== 0) {
        newSearchIndex = this.state.searchIndex - 1;
      } else {
        newSearchIndex = this.props.options.length - 1;
      }

      this.setState({
        searchIndex: newSearchIndex
      });
    }
  },

  _onChange(e) {
    this.setState({
      searchText: e.target.value
    }, () => {
      this.props.onSearch(this.state.searchText);
    });
  },

  _selectActive(index) {
    this.setState({
      searchIndex: index
    });
  },

  _selectMatch(payload) {
    // Blur input to close search
    this.refs.overlay.getOverlayDOMNode().blur();

    this.setState({
      searchText: ''
    }, () => {
      this.props.onSelectMatch(payload);
      this.props.onSearch(this.state.searchText);
    });
  },

  _onFocus() {
    this.refs.overlay.show();
  },

  _onBlur() {
    this.refs.overlay.hide();
  },

  render() {
    const searchIcon = cx('ficon ficon-search', this.props.iconClass);

    const inputClass = cx('form-control', this.props.inputClass);

    return (
      <div className={this.props.className}>
        <OverlayTrigger ref='overlay' trigger='manual'
          defaultOverlayShown={false}
          overlay={
            <UITypeaheadSelectOverlay
              positionLeftOverride={this.state.searchLeft}
              searchIndex={this.state.searchIndex}
              selectActive={this._selectActive}
              selectMatch={this._selectMatch}
              options={this.props.options}
              overlayModal={this.props.overlayModal}/>
          }
          placement='bottom'>
          <input
            onFocus={this._onFocus} onBlur={this._onBlur}
            autoComplete='off' type='text'
            className={inputClass}
            placeholder={this.props.placeholder}
            onKeyDown={this._onKeyDown}
            onChange={this._onChange}
            value={this.state.searchText}/>
        </OverlayTrigger>
        <i className={searchIcon}/>
      </div>
    );
  }
});
