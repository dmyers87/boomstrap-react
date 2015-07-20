const React         = require('react/addons');
const LeadCategory  = require('./LeadCategory');
const LeadType      = require('./LeadType');

const PureRenderMixin = React.addons.PureRenderMixin;

module.exports = React.createClass({
  displayName: 'LeadCategoryByType',

  propTypes: {
    className: React.PropTypes.string,

    /**
     * Indicates whether or not this is a seller category
     */
    seller: React.PropTypes.bool,

    ...LeadCategory.propTypes
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      seller: false
    };
  },

  render: function() {
    const {
      seller,
      className,
      ...props
    } = this.props;

    return (
      <span className={className}>
        <LeadType
          buyer={!seller}
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
