const React = require('react/addons');
const cx    = require('classnames');

/**
 * Much like the similarly named hairstyle of the '00s, the Fauxbox replaces something functional with something flashy in hopes to lure the user into touching it.
 * Fauxbox is a drop-in replacement for checkboxes in Boomstrap.
 */
const Fauxbox = React.createClass({
  displayName: 'Fauxbox',

  propTypes: {
    /**
     * Identifier used to link the label and the checkbox
     */
    id:         React.PropTypes.string.isRequired,

    /**
     * Optional class to provide to div wrapping Fauxbox
     */
    className:  React.PropTypes.string,

    /**
     * Optional class to provide to wrap the label
     */
    labelClass: React.PropTypes.string,

    /**
     * Indicated whether or not the Fauxbox is checked
     */
    checked:    React.PropTypes.bool.isRequired,

    /**
     * Event to fire when the Fauxbox is clicked
     */
    onClick:    React.PropTypes.func,

    /**
     * Indicates whether or not the Fauxbox is a block element or inline-block element
     */
    inline:     React.PropTypes.bool,

    /**
     * Label that is tied to updating the Fauxbox
     */
    label:      React.PropTypes.node
  },

  render: function() {
    const fauxboxClass = cx(this.props.className, 'fauxbox', {
      'fauxbox-inline': !!this.props.inline
    });
    const labelClass = this.props.labelClass || '';

    return (
      <div className={fauxboxClass}>
        <input
          type='checkbox'
          id={this.props.id}
          checked={this.props.checked}
          readOnly={true}
          onClick={this.props.onClick} />
        <label className={labelClass} htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
  }
});

module.exports = Fauxbox;
