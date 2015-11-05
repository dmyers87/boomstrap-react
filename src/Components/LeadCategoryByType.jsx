const React         = require('react');
const LeadCategory  = require('./LeadCategory');
const LeadType      = require('./LeadType');

const PureRenderMixin = require('react-addons-pure-render-mixin');

module.exports = React.createClass({
  displayName: 'LeadCategoryByType',

  propTypes: {
    className: React.PropTypes.string,

    /**
     * Indicates whether or not this is a buyer category
     */
    buyer: React.PropTypes.bool,

    /**
     * Indicates whether or not this is a seller category
     */
    seller: React.PropTypes.bool,
    ...LeadCategory.propTypes
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      buyer:  false,
      seller: false
    };
  },

  render: function() {
    const {
      buyer,
      seller,
      className,
      ...props
    } = this.props;

    if (!buyer && !seller) {
      return null;
    }

    return (
      <span className={className}>
        <LeadType
          buyer={buyer}
          seller={seller}
          abbreviated
          style={{
            borderTopRightRadius:    0,
            borderBottomRightRadius: 0
          }}/>
        <LeadCategory
          {...props}
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
          }}/>
      </span>
    );
  }
});

