'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName: 'Marker',

  propTypes: {
    type:       React.PropTypes.string,
    label:      React.PropTypes.string.isRequired,
    showClose:  React.PropTypes.bool,
    closeClass: React.PropTypes.string,
    onClose:    React.PropTypes.func
  },

  getDefaultProps() {
    return {
      type:      'default',
      onClose:   function() {},
      showClose: true
    };
  },

  render() {
    var markerClass = 'marker marker-' + this.props.type;
    var closeClass = 'ficon ficon-cross';
    if (this.props.closeClass) {
      closeClass += ' ' + this.props.closeClass;
    }

    var close = null;

    if (this.props.showClose) {
      close = (
        <i className={closeClass} onClick={this.props.onClose} />
      );
    }

    return (
      <span className={markerClass}>
        <span>{this.props.label} </span>
        {close}
      </span>
    );
  }
});
