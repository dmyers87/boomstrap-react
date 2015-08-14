const React = require('react/addons');

// Components
const { OverlayTrigger, Tooltip } = require('react-bootstrap');
const SvgIcon = require('./SvgIcon');

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
        <SvgIcon icon={this.props.icon} />
      </OverlayTrigger> : null
    );
  }
});
