const React = require('react/addons');
const cx    = require('classnames');

const { PropTypes, addons } = React;

module.exports = React.createClass({
  displayName: 'LeadType',

  propTypes: {
    className:   PropTypes.string,

    /**
     * Indicates whether or not this is a buyer lead type.
     */
    buyer:       PropTypes.bool,

    /**
     * Indicates whether or not this is a seller lead type.
     */
    seller:      PropTypes.bool,

    /**
     * For equal width lead type labels, set equal to true.
     */
    equal:       PropTypes.bool,

    /**
     * For abbreviated lead type labels, set abbreviated to true.
     * Abbreviated version will always be uppercase.
     */
    abbreviated: PropTypes.bool,

    /**
     * Sometimes you just want to stand things on their heads.
     * Set vertical and abbreviated to true when you need your leadtype to reach for the stars.
     * This only applies to the B/S combination.
     */
    vertical:    PropTypes.bool
  },

  mixins: [addons.PureRenderMixin],

  getDefaultProps() {
    return {
      className: '',
      buyer: false,
      seller: false,
      equal: false,
      abbreviated: false,
      vertical: false
    };
  },

  render() {
    const {
      buyer,
      seller,
      equal,
      abbreviated,
      vertical,
      ...props
    } = this.props;

    const leadTypeClass = cx(this.props.className, {
      'leadtype-buyer':         buyer && !seller,
      'leadtype-seller':       !buyer &&  seller,
      'leadtype-bs':            buyer &&  seller,
      'leadtype-eq':            equal,
      'leadtype-abbr':          abbreviated,
      'leadtype-abbr-vertical': abbreviated && vertical
    });

    return (
      <span {...props} className={leadTypeClass} />
    );
  }
});
