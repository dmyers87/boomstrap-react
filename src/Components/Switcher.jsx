const React = require('react/addons');
const cx    = require('classnames');
const Icon  = require('./Icon');

const { assign, omit } = require('lodash');

/**
 * Toggle switch.
 */
module.exports = React.createClass({
  displayName: 'Switcher',

  propTypes: {
    checked:    React.PropTypes.bool.isRequired,
    /**
     * Optionally include additional class name(s).
     */
    className:  React.PropTypes.string,
    /**
     * Disable switcher.
     */
    disabled:   React.PropTypes.bool,
    id:         React.PropTypes.string.isRequired,
    onClick:    React.PropTypes.func,
    /**
     * Options: sm.
     */
    size:       React.PropTypes.oneOf(['', 'sm'])
  },

  getDefaultProps() {
    return {
      disabled:     false,
      size:         ''
    };
  },

  render: function() {

    let props = assign({}, this.props);

    const {
      checked,
      className,
      disabled,
      id,
      onClick,
      size
    } = props;

    props = omit(props, ['checked', 'className', 'disabled', 'id', 'onClick', 'size']);

    const switcherClass = cx('switcher', className, {
      'switcher--sm': size === 'sm',
      'switcher--disabled': disabled
    });

    const switcherLabelClass = cx('switcher__label', {
      'switcher__label--sm': size === 'sm'
    });

    return (
      <div className={switcherClass} {...props}>
        <input type='checkbox'
          className='switcher__input'
          id={id}
          checked={checked}
          readOnly={true}
          onClick={onClick} />
        <label className={switcherLabelClass} htmlFor={id}>
          <div className='switcher__inner'>
            <div className='switcher__on'>
              <Icon icon='checkmark' />
            </div>
            <div className='switcher__off'>
              <Icon icon='cross' />
            </div>
          </div>
        </label>
      </div>
    );
  }
});
