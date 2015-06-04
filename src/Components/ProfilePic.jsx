const React = require('react/addons');
const cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Profile Pic',

  propTypes: {
    small:     React.PropTypes.bool,
    src:       React.PropTypes.string,
    alt:       React.PropTypes.string,
    initials:  React.PropTypes.string.isRequired
  },

  render() {
    const className = cx(
      'profile-pic',
      {
        'profile-pic--sm':        this.props.small,
        'profile-pic--initials':  this.props.initials
      }
    );

    if (this.props.src) {
      return (
        <img
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
