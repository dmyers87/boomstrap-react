'use strict';

var React = require('react/addons');
var ImageWithFallback = require('../src/Components/ImageWithFallback.jsx');
var request = require('superagent');
var marked = require('marked');

module.exports = React.createClass({
  getInitialState() {
    return {
      docs: ''
    };
  },

  componentDidMount() {
    request.get('docs/ImageWithFallback.md').end((res) => {
      console.log(res.text);
      this.setState({
        docs: marked(res.text)
      });
    });
  },

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.state.docs}} />
        <div>
          <h3>In Action</h3>
          <ImageWithFallback
            src='http://2lnopk3ltiuj1tkm8y4d7nfx.wpengine.netdna-cdn.com/wp-content/themes/boomtownroi/images/site/boomtown-log.png'
            fallbackSrc='http://2lnopk3ltiuj1tkm8y4d7nfx.wpengine.netdna-cdn.com/wp-content/themes/boomtownroi/images/site/boomtown-logo.png' />
        </div>
      </div>
    );
  }
});
