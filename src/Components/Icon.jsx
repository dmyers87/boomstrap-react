const React = require('react/addons');
const cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Icon',

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },

  render() {
    let { className, icon, ...props } = this.props;

    const iconClass = cx(
      className,
      'ficon',
      'ficon-' + icon
    );

    return <i className={iconClass} {...props} />;
  }
});
