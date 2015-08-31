const React = require('react/addons');
const cx    = require('classnames');

/**
 * Display radio buttons in style with the Fauxdio
 */
module.exports = React.createClass({
  displayName: 'Fauxdio',
  propTypes: {

    /**
     * Identifier provided to link together the input with the label
     */
    radioID: React.PropTypes.string.isRequired,

    /**
     * Optional class to pass to the div that wraps the Fauxdio
     */
    radioClass: React.PropTypes.string,

    /**
     * Identifier provided to link together the radio group
     */
    radioName: React.PropTypes.string.isRequired,

    /**
     * Optional class to pass to the label that accompanies the input
     */
    labelClass: React.PropTypes.string,

    /**
     * Indicates whether or not the Fauxdio is selected
     */
    checked: React.PropTypes.bool,

    /**
     * Provided for information on submitting forms
     */
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),

    /**
     * A callback to fire when the Fauxdio is selected.
     */
    onChange: React.PropTypes.func,

    /**
     * Indicates whether or not the Fauxdio is block element or inline-block element
     */
    inline: React.PropTypes.bool,

    /**
     * A label to accompany the Fauxdio.  Can be text or a React node
     */
    label: React.PropTypes.node
  },

  getDefaultProps() {
    return {
      checked: false
    };
  },

  render: function() {
    const labelClass = this.props.labelClass || '';
    const fauxdioClass = cx(this.props.radioClass, 'fauxdio', {
      'fauxdio-inline': !!this.props.inline
    });

    return (
      <div className={fauxdioClass}>
        <input
          id={this.props.radioID}
          type='radio'
          name={this.props.radioName}
          value={this.props.value}
          checked={this.props.checked}
          onChange={this.props.onChange} />
        <label className={labelClass} htmlFor={this.props.radioID}>{this.props.label}</label>
      </div>
    );
  }
});
