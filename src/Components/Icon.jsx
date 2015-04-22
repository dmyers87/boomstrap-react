'use strict';

const React = require('react/addons');
const cx    = require('classnames');
const _     = require('lodash');

module.exports = React.createClass({
  displayName: 'Icon',

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    className: React.PropTypes.string
  },

  render() {
    let props = _.assign({}, this.props);
    const { className, icon } = props;

    // Remove className from props to prevent collision
    delete props.className;
    delete props.icon;

    var iconClass = cx(
      this.props.className,
      'ficon',
      'ficon-' + icon
    );

    return <i className={iconClass} {...props} />;
  }
});
