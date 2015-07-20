'use strict';

var React = require('react/addons');
var cx = require('classnames');

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
    value: React.PropTypes.string,

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

  getDefaultProps: function getDefaultProps() {
    return {
      checked: false
    };
  },

  render: function render() {
    var labelClass = this.props.labelClass || '';
    var fauxdioClass = cx(this.props.radioClass, 'fauxdio', {
      'fauxdio-inline': !!this.props.inline
    });

    return React.createElement(
      'div',
      { className: fauxdioClass },
      React.createElement('input', {
        id: this.props.radioID,
        type: 'radio',
        name: this.props.radioName,
        value: this.props.value,
        checked: this.props.checked,
        onChange: this.props.onChange }),
      React.createElement(
        'label',
        { className: labelClass, htmlFor: this.props.radioID },
        this.props.label
      )
    );
  }
});