'use strict';

var React = require('react/addons');
var ImageWithFallback = require('boomstrap-react').Components.ImageWithFallback;
var request = require('superagent');

module.exports = React.createClass({
  getInitialState() {
    return {
      docs: ''
    };
  },

  componentDidMount() {
    request.get('docs/ImageWithFallback.md').end(function(res) {
      console.log(res);
      this.setState({
        docs: res
      });
    });
  },

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.state.docs}} />
    );
  }
});
