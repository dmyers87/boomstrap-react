'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName: 'Body',

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
});
