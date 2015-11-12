const React = require('react');
const cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Loader',

  propTypes: {
    className:   React.PropTypes.string,
    desaturated: React.PropTypes.bool,
    small:       React.PropTypes.bool,
    center:      React.PropTypes.bool
  },

  render() {
    const className = cx('loader', this.props.className, {
      'loader-sm':          this.props.small,
      'loader-desaturated': this.props.desaturated,
      'text-center':        this.props.center
    });

    return (
      <div {...this.props} className={className}>
        <span className='loader-pulse'/>
        <span className='loader-pulse'/>
        <span className='loader-pulse'/>
      </div>
    );
  }
});
