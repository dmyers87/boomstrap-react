'use strict';

var React = require('react/addons');
var cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Fauxbox',

  propTypes: {
    id:         React.PropTypes.string.isRequired,
    className:  React.PropTypes.string,
    labelClass: React.PropTypes.string,
    checked:    React.PropTypes.bool.isRequired,
    onClick:    React.PropTypes.func,
    inline:     React.PropTypes.bool,
    label:      React.PropTypes.node
  },

  render: function() {
    var fauxboxClass = cx(this.props.className, 'fauxbox', {
      'fauxbox-inline': !!this.props.inline
    });
    var labelClass = this.props.labelClass || '';

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
