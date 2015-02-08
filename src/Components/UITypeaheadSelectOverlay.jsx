'use strict';

var React = require('react/addons');

var UITypeaheadSelectOverlay = React.createClass({
  displayName: 'UI Typeahead Select Overlay',

  propTypes: {
    positionLeft: React.PropTypes.number,
    positionLeftOverride: React.PropTypes.number,
    positionTop:  React.PropTypes.number,
    searchIndex:  React.PropTypes.number,
    selectActive: React.PropTypes.func,
    selectMatch:  React.PropTypes.func,
    options: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        element: React.PropTypes.element,
        payload: React.PropTypes.any
      })
    )
  },

  _selectActive(index) {
    this.props.selectActive(index);
  },

  _selectMatch(index) {
    this.props.selectMatch(index);
  },

  render() {
    if (!this.props.options || !this.props.options.length) {
      return <span />;
    }

    // Select is fired on mouse down so that the select fires
    // Before the input blur
    var options = this.props.options.map((result, index) => {
      var optionClass = this.props.searchIndex === index ? 'active': '';
      return (
        <li role='option' key={index}
          className={optionClass}
          onMouseEnter={this._selectActive.bind(this, index)}
          onMouseDown={this._selectMatch.bind(this, result.payload)}>
          <a tabIndex='-1'>{result.element}</a>
        </li>
      );
    });

    // OverlayTrigger uses offsetWidth to calculate left, which is often 0
    // at the time of render.  Just allow us to override what it thinks the left
    // should be.
    var positionLeft = this.props.positionLeftOverride || this.props.positionLeft;

    return (
      <ul
        style={{
          display:  'block',
          position: 'absolute',
          left: positionLeft,
          top:  this.props.positionTop
        }}
        className='dropdown-menu' role='listbox' aria-hidden='false'>
        {options}
      </ul>
    );
  }
});

module.exports = UITypeaheadSelectOverlay;
