const React = require('react');
const cx    = require('classnames');
const PureRenderMixin = require('react-addons-pure-render-mixin');

const { PropTypes } = React;

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
     * For square (and stacked b/s) lead type labels, set square to true.
     */
    square:      PropTypes.bool,

    /**
     * Small augments square and produces leadtype-square-sm.
     * Small by itself does nothing.
     */
    small:       PropTypes.bool
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      className:    '',
      buyer:        false,
      seller:       false,
      square:       false,
      small:        false
    };
  },

  render() {
    const {
      buyer,
      seller,
      square,
      small,
      ...props
    } = this.props;

    const leadTypeClass = cx(this.props.className, {
      'leadtype-buyer':         buyer && !seller,
      'leadtype-seller':       !buyer &&  seller,
      'leadtype-bs':            buyer &&  seller,
      'leadtype-square':        square,
      'leadtype-square-sm':     square && small
    });

    return (
      <span {...props} className={leadTypeClass} />
    );
  }
});
