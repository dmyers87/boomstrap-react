'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName: 'Sidebar Toggle',

  propTypes: {
    onClick: React.PropTypes.func
  },

  render() {
    var toggleStyle = {
      position: 'absolute',
      top:      10,
      left:     10,
      zIndex:   1,
      cursor:   'pointer'
    };

    var barStyle = {
      'height':          '4px',
      'width':           '20px',
      'backgroundColor': '#f68a24',
      'marginTop':       '2px'
    };
    return (
      <div style={toggleStyle} onClick={this.props.onClick}>
        <div style={barStyle}></div>
        <div style={barStyle}></div>
        <div style={barStyle}></div>
      </div>
    );
  }
});
