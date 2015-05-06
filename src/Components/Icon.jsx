const React = require('react/addons');
const cx    = require('classnames');

const { assign, omit } = require('lodash');

module.exports = React.createClass({
  displayName: 'Icon',

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },

  render() {
    let props = assign({}, this.props);
    const { className, icon } = props;

    // Remove className from props to prevent collision
    props = omit(props, ['className', 'icon']);

    const iconClass = cx(
      className,
      'ficon',
      'ficon-' + icon
    );

    return <i className={iconClass} {...props} />;
  }
});
