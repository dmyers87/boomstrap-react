const React = require('react/addons');
const cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Well',

  propTypes: {
    className: React.PropTypes.string,
    large:     React.PropTypes.bool,
    small:     React.PropTypes.bool
  },

  render() {
    const className = cx(
      this.props.className,
      'well',
      {
        'well-lg': this.props.large,
        'well-sm': this.props.small
      }
    );

    return <div {...this.props} className={className} />;
  }
});