const React = require('react/addons');
const cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Profile Pic',

  propTypes: {
    /**
     * Optionally, add additional classes to the component.
     */
    className:     React.PropTypes.string,
    /**
     * Optionally, set small to use small profile pic.
     */
    small:     React.PropTypes.bool,
    /**
     * Provide src prop when the image is available. If not set, initials will be shown.
     */
    src:       React.PropTypes.string,
    /**
     * Provide initials to be displayed when photo is not present. Required as fallback to image.
     */
    initials:  React.PropTypes.string.isRequired,
    /**
     * Optionally set buyer prop if you want to show leadtype styling.
     */
    buyer:  React.PropTypes.bool,
    /**
     * Optionally set seller prop if you want to show leadtype styling.
     */
    seller:  React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      className: null,
      small: false,
      src: null,
      buyer: false,
      seller: false
    };
  },

  getInitialState() {
    return {
      error: false
    };
  },

  componentWillReceiveProps(nextProps) {
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
      this.props.className,
      'profile-pic',
      {
        'profile-pic--sm':            this.props.small,
        'profile-pic--initials':      !this.props.src || this.state.error,
        'profile-pic--buyer':         this.props.buyer && !this.props.seller,
        'profile-pic--seller':        !this.props.buyer && this.props.seller,
        'profile-pic--buyer-seller':  this.props.buyer && this.props.seller
      }
    );
    const imgStyle = {
      display: 'none'
    };
    const style = {
      backgroundImage: `url(${this.props.src})`
    };

    if (this.props.src && !this.state.error) {
      return (
        <div className={className} style={style} data-initials={this.props.initials}>
        <img
          onError={this._handleImgError}
          style={imgStyle}
          src={this.props.src} />
        </div>
      );
    }

    return (
      <div className={className}>{this.props.initials}</div>
    );
  }
});
