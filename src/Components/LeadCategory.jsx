const React = require('react/addons');
const cx    = require('classnames');
const PureRenderMixin = React.addons.PureRenderMixin;

const LeadCategories = require('../Constants/LeadCategories');

let categories = {};
let abbrs = {};

LeadCategories.forEach(function(category) {
  categories[category.value.toString()] = category.name;
  abbrs[category.value.toString()] = category.abbr;
});

module.exports = React.createClass({
  displayName: 'Lead Category',

  propTypes: {
    category:    React.PropTypes.number,
    equal:       React.PropTypes.bool,
    abbreviated: React.PropTypes.bool
  },

  mixins: [PureRenderMixin],

  render: function() {
    const category = categories[this.props.category];
    const abbr     = abbrs[this.props.category];

    const isEqualLength = this.props.equal;
    const isAbbreviated = this.props.abbreviated;

    const categoryClass = 'leadcat-' + category.toLowerCase();
    const catClass = cx(categoryClass, 'leadcat', {
      'leadcat-eq-abbr': isEqualLength && isAbbreviated,
      'leadcat-eq':      isEqualLength && !isAbbreviated
    });

    return (
      <span className={catClass}>{ isAbbreviated ? abbr : category }</span>
    );
  }
});
