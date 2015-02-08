'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName: 'Body Overlay',

  propTypes: {
    onClick: React.PropTypes.func
  },

  render() {
    var overlayStyle = {
      position: 'absolute',
      top: 0, right: 0, bottom: 0, left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.54)'
    };

    return <div style={overlayStyle} onClick={this.props.onClick}/>;
  }
});
