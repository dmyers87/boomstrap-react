'use strict';

var React = require('react/addons');

// Components
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Tooltip        = require('react-bootstrap/Tooltip');

module.exports = React.createClass({
  displayName: 'Icon Tooltip',

  propTypes: {
    showIf: React.PropTypes.bool,
    text: React.PropTypes.string,
    icon: React.PropTypes.string
  },
  render() {
    return (
      this.props.showIf ?
      <OverlayTrigger placement='top' overlay={<Tooltip>{this.props.text}</Tooltip>}>
        <span className={'ficon ficon-' + this.props.icon}></span>
      </OverlayTrigger> : null
    );
  }
});
