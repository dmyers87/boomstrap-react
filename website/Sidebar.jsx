'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName: 'Sidebar',

  propTypes: {
    components: React.PropTypes.arrayOf(React.PropTypes.shape({
      path: React.PropTypes.string,
      name: React.PropTypes.string
    }))
  },

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

    var links = this.props.components.map(function(component) {
      return (
        <li><a href='#'>{component.name}</a></li>
      );
    });

    return (
      <div style={sideBarStyle}>
        <ul className="nav nav-blocks">
          {links}
        </ul>
      </div>
    );
  }
});
