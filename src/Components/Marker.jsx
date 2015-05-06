const React = require('react/addons');
const cx    = require('classnames');

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
    const markerClass = 'marker marker-' + this.props.type;
    const closeClass = cx('ficon ficon-cross', this.props.closeClass);

    let close = null;
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
