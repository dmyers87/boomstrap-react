const React = require('react/addons');

const ModalOverlay = require('../Constants/BootstrapConstants').Modal.Overlay;

const UITypeaheadSelectOverlay = React.createClass({
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
    ),
    overlayModal: React.PropTypes.bool
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
    const options = this.props.options.map((result, index) => {
      const optionClass = this.props.searchIndex === index ? 'active' : '';
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
    const positionLeft = this.props.positionLeftOverride || this.props.positionLeft;

    let ulStyle = {
      display:  'block',
      position: 'absolute',
      left:     positionLeft,
      top:      this.props.positionTop
    };

    if (this.props.overlayModal) {
      ulStyle.zIndex = ModalOverlay.zIndex;
    }

    return (
      <ul
        style={ulStyle}
        className='dropdown-menu' role='listbox' aria-hidden='false'>
        {options}
      </ul>
    );
  }
});

module.exports = UITypeaheadSelectOverlay;
