const React = require('react/addons');
const cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'SvgIcon',

  propTypes: {
    /**
     * Icon name.
     */
    icon: React.PropTypes.string.isRequired,

    /**
     * Optionally include additional class name(s).
     */
    className: React.PropTypes.string
  },

  render() {
    let { className, icon, ...props } = this.props;

    let useTag = `<use xlink:href=#icon-${icon} />`;

    const classes = cx(
      className,
      'icon',
      'icon-' + icon
    );

    const useTagHtml = {
      __html: useTag
    };

    return <svg className={classes} {...props} dangerouslySetInnerHTML={useTagHtml}/>;
  }
});
