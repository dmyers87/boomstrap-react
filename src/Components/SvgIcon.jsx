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
     * Path to SVG sprite.
     */
    iconPath: React.PropTypes.string,

    /**
     * Optionally include additional class name(s).
     */
    className: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      iconPath: 'svg/sprite.svg'
    };
  },

  render() {
    let { className, icon, iconPath, ...props } = this.props;

    let useTag = `<use xlink:href=${iconPath}#${icon} />`;

    const classes = cx(
      className,
      'icon',
      'icon-' + icon
    );

    const createUseTag = () => {
      return {
        __html: useTag
      };
    };

    return <svg className={classes} {...props} dangerouslySetInnerHTML={createUseTag()}/>;
  }
});
