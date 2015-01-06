'use strict';

var React = require('react/addons');

var ImageWithFallbackDocs = require('./ImageWithFallbackDocs.jsx');

var App = React.createClass({
  render() {
    return (
      <div>
        <ImageWithFallbackDocs />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('components'));
