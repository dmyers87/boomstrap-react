const React = require('react');
const { omit } = require('lodash');

module.exports = React.createClass({
  displayName: 'Image with Fallback',

  propTypes: {
    src: React.PropTypes.string.isRequired,
    fallbackSrc: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      src: null
    };
  },

  _onError() {
    if (!this.state.src) {
      this.setState({
        src: this.props.fallbackSrc
      });
    }
  },

  render() {
    const props = omit(this.props, ['fallbackSrc', 'src']);

    const src = this.state.src || this.props.src;

    return (
      <img src={src} {...props} onError={this._onError}/>
    );
  }
});
