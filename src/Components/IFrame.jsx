'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName: 'IFrame',

  propTypes: {
    src:          React.PropTypes.string.isRequired,
    width:        React.PropTypes.number,
    height:       React.PropTypes.number,
    onCloseFrame: React.PropTypes.func
  },

  componentDidMount() {
    // React does not work with onLoad events in iFrames yet
    // Because of the event delegation setters
    // https://github.com/facebook/react/issues/1718
    var iframe = React.findDOMNode(this.refs.iframe);
    if (iframe.attachEvent){
      iframe.attachEvent('onload', () => {
        this._iFrameCloseRegister();
      });
    } else {
      iframe.onload = () => {
        this._iFrameCloseRegister();
      };
    }
  },

  _iFrameCloseRegister() {
    var element = React.findDOMNode(this.refs.iframe);
    if (element &&
      element.contentWindow &&
      element.contentWindow.registerClose) {
      element.contentWindow.registerClose(() => {
        this.props.onCloseFrame();
      });
    }
  },

  render: function() {
    var src    = this.props.src;
    var width  = this.props.width  || null;
    var height = this.props.height || null;

    return (
      <iframe ref='iframe'
        src={src}
        width={width}
        height={height}
        seamless={true}
        onLoad={this._iFrameCloseRegister} />
    );
  }
});
