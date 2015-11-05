const React = require('react');

module.exports = React.createClass({
  displayName: 'Icon',

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

    const classes = `${className} icon icon-${icon}`;

    return (
      <svg className={classes} {...props}>
        <use xlinkHref={`#icon-${icon}`} />
      </svg>
    );
  }
});
