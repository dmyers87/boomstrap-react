const React = require('react');
const cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Message Face',

  propTypes: {
    placement: React.PropTypes.oneOf(['', 'left', 'top', 'right', 'bottom'])
  },

  render() {
    const className = cx('message-face', {
      'message-face-arrow-left':   this.props.placement === 'left',
      'message-face-arrow-top':    this.props.placement === 'top',
      'message-face-arrow-bottom': this.props.placement === 'bottom',
      'message-face-arrow-right':  this.props.placement === 'right'
    });

    return (
      <div className={className}>
        <div className='message-face-eyes'>
          <span className='message-face-eye'></span>
          <span className='message-face-eye'></span>
        </div>
        <div className='message-face-mouth'></div>
      </div>
    );
  }
});
