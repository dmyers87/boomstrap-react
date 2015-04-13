'use strict';

var React = require('react/addons');
var DocWithExample = require('./DocWithExample.jsx');

var Sidebar       = require('./Sidebar.jsx');
var SidebarToggle = require('./SidebarToggle.jsx');
var Body          = require('./Body.jsx');
var BodyOverlay   = require('./BodyOverlay.jsx');

// Docs
var request = require('superagent');

// Components

var ImageWithFallback = require('../src/Components/ImageWithFallback.jsx');
var Pager = require('../src/Components/Pager.jsx');


var App = React.createClass({
  getInitialState() {
    return {
      open: false,
      components: {}
    };
  },

  componentDidMount() {
    var _this = this;
    request.get('docs/docs.json').end(function(err, data) {
      if (err) {
        return;
      }

      _this.setState({
        components: data.body
      });
    });
  },

  _onToggleSidebar() {
    this.setState({
      open: !this.state.open
    });
  },

  render() {
    var overlay = null;
    var toggle = null;
    if (this.state.open) {
      overlay = (
        <BodyOverlay onClick={this._onToggleSidebar} />
      );
    } else {
      toggle = <SidebarToggle onClick={this._onToggleSidebar} />;
    }

    var translate = this.state.open ? '200px' : '0px';
    var containerStyle = {
      'width':    '100%',
      'height':   '100%',
      'position': 'relative',
      'webkitTransform': 'translateX(' + translate + ')',
      'transform':       'translateX(' + translate + ')',
      'webkitTransition': '.3s ease all',
      'transition':       '.3s ease all'
    };

    var sideBarComponents = Object.keys(this.state.components).map(function(component) {
      var componentParts = component.split('/');
      var componentName = componentParts[componentParts.length - 1];

      return {
        path: component,
        name: componentName
      };
    });

    return (
      <div style={containerStyle}>
        <Body open={this.state.open}>
          {toggle}
          <div className='container'>
            <h1>
              Boomstrap React&nbsp;
              <img src='react-boomstrap.svg' height='80' width='80'/>
            </h1>
            <div id='components'>
              <DocWithExample doc='docs/ImageWithFallback.md'>
                <ImageWithFallback
                  src='http://2lnopk3ltiuj1tkm8y4d7nfx.wpengine.netdna-cdn.com/wp-content/themes/boomtownroi/images/site/boomtown-log.png'
                  fallbackSrc='http://2lnopk3ltiuj1tkm8y4d7nfx.wpengine.netdna-cdn.com/wp-content/themes/boomtownroi/images/site/boomtown-logo.png' />
              </DocWithExample>
            </div>
          </div>
          {overlay}
        </Body>
        <Sidebar open={this.state.open} components={sideBarComponents} />
      </div>
    );
  }
});

window.addEventListener('load', function() {
  React.render(<App />, document.body);
});
