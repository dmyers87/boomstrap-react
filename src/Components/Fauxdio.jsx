'use strict';

var React = require('react/addons');
var cx    = React.addons.classSet;

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
    var fauxdioClassObj = {
      'fauxdio': true,
      'fauxdio-inline': !!this.props.inline
    };
    if (this.props.radioClass) {
      fauxdioClassObj[this.props.radioClass] = true;
    }
    var fauxdioClass = cx(fauxdioClassObj);

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
