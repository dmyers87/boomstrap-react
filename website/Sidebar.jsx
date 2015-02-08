'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName: 'Sidebar',
  render() {
    var sideBarStyle = {
      width: '200px',
      zIndex: 11,
      boxShadow: '3px 0px 5px 0 rgba(0, 0, 0, 0.26)',
      position:  'absolute',
      top:    0,
      bottom: 0,
      left: '-200px'
    };

    return (
      <div style={sideBarStyle}>
        <ul className="nav nav-blocks">
          <li className="active"><a href="#">ImageWithFallback</a></li>
        </ul>
      </div>
    );
  }
});
