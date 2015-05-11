const React = require('react/addons');
const cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Progress Bar',

  propTypes: {
    position:   React.PropTypes.number,
    showLabel:  React.PropTypes.bool,
    size:       React.PropTypes.oneOf(['','xs','sm','lg']),
    type:       React.PropTypes.oneOf(['attention','danger','info','primary','success','success-to-danger','warning'])
  },

  getDefaultProps() {
    return {
      position:    0,
      showLabel:   false,
      size:        '',
      type:        'primary'
    };
  },

  render() {
    var positionTranslation,style,label;

    positionTranslation = parseInt(this.props.position, 10);
    if (isNaN(positionTranslation) || positionTranslation < 0) {
      positionTranslation = 0;
    }

    const classes = cx('progress-bar', {
      'progress-bar--attention':          this.props.type === 'attention',
      'progress-bar--danger':             this.props.type === 'danger',
      'progress-bar--info':               this.props.type === 'info',
      'progress-bar--primary':            this.props.type === 'primary',
      'progress-bar--success':            this.props.type === 'success',
      'progress-bar--success-to-danger':  this.props.type === 'success-to-danger',
      'progress-bar--warning':            this.props.type === 'warning'
    }, {
      'progress-bar--xs':                 this.props.size === 'xs',
      'progress-bar--sm':                 this.props.size === 'sm',
      'progress-bar--lg':                 this.props.size === 'lg'
    });

    // Style for positioning progres-bar__bar
    style = {
      transform: 'translateX(' + positionTranslation + '%)',
      WebkitTransform: 'translateX(' + positionTranslation + '%)'
    };

    // If showLabel is true and size isn't extra small, construct label
    label = null;
    if (this.props.showLabel && this.props.size != 'xs') {
      label = (
        <div className="progress-bar__bar__label">{positionTranslation + '%'}</div>
      );
    }

    return (
      <div className={classes}>
        <div className="progress-bar__bar" style={style}>
          {label}
        </div>
      </div>
    );

  }
});
