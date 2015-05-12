const React = require('react/addons');

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
    const iframe = React.findDOMNode(this.refs.iframe);
    if (iframe.attachEvent) {
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
    const element = React.findDOMNode(this.refs.iframe);
    if (element &&
      element.contentWindow &&
      element.contentWindow.registerClose) {
      element.contentWindow.registerClose((options) => {
        this.props.onCloseFrame(options);
      });
    }
  },

  render: function() {
    const src    = this.props.src;
    const width  = this.props.width  || null;
    const height = this.props.height || null;

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