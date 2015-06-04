const React = require('react/addons');
const cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Profile Pic',

  propTypes: {
    /**
     * Optionally, set small to use small profile pic.
     */
    small:     React.PropTypes.bool,
    /**
     * Provide src prop when the image is available. If not set, initials will be shown.
     */
    src:       React.PropTypes.string,
    /**
     * Provide alt text for image when available.
     */
    alt:       React.PropTypes.string,
    /**
     * Provide initials to be displayed when photo is not present. Required as fallback to image.
     */
    initials:  React.PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      small: false,
      src: null,
      alt: null
    };
  },

  getInitialState() {
    return {
      error: false
    };
  },

  componentWillReceiveProps(nextProps) {
    console.log('yada');
    if (nextProps.src !== this.props.src) {
      this.setState({
        error: false
      });
    }
  },

  _handleImgError() {
    this.setState({
      error: true
    });
  },

  render() {
    const className = cx(
      'profile-pic',
      {
        'profile-pic--sm':        this.props.small,
        'profile-pic--initials':  !this.props.src || this.state.error
      }
    );

    if (this.props.src && !this.state.error) {
      return (
        <img
          onError={this._handleImgError}
          className={className}
          src={this.props.src}
          alt={this.props.alt} />
      );
    }

    return (
      <div className={className}>{this.props.initials}</div>
    );
  }
});
