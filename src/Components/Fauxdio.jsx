'use strict';

var React = require('react/addons');
var cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Fauxdio',
  propTypes: {
    radioID: React.PropTypes.string,
    radioClass: React.PropTypes.string,
    labelClass: React.PropTypes.string,
    checked: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    inline: React.PropTypes.bool,
    label: React.PropTypes.node
  },
  render: function() {
    var labelClass = this.props.labelClass || '';
    var fauxdioClass = cx(this.props.radioClass, 'fauxdio', {
      'fauxdio-inline': !!this.props.inline
    });

    return (
      <div className={fauxdioClass}>
        <input
          id={this.props.radioID}
          type='radio'
          value={this.props.value}
          checked={this.props.checked}
          onChange={this.props.onChange} />
        <label className={labelClass} htmlFor={this.props.radioID}>{this.props.label}</label>
      </div>
    );
  }
});
