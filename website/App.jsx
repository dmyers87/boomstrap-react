'use strict';

var React = require('react/addons');
var DocWithExample = require('./DocWithExample.jsx');

// Components

var ImageWithFallback = require('../src/Components/ImageWithFallback.jsx');


var App = React.createClass({
  render() {
    return (
      <div>
        <DocWithExample doc='docs/ImageWithFallback.md'>
          <ImageWithFallback
            src='http://2lnopk3ltiuj1tkm8y4d7nfx.wpengine.netdna-cdn.com/wp-content/themes/boomtownroi/images/site/boomtown-log.png'
            fallbackSrc='http://2lnopk3ltiuj1tkm8y4d7nfx.wpengine.netdna-cdn.com/wp-content/themes/boomtownroi/images/site/boomtown-logo.png' />
        </DocWithExample>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('components'));
