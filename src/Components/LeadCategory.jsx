const React = require('react/addons');
const cx    = require('classnames');
const PureRenderMixin = React.addons.PureRenderMixin;

const LeadCategories = require('../Constants/LeadCategories');

let categories = {};
let abbrs      = {};

LeadCategories.forEach(function(category) {
  categories[category.value.toString()] = category.name;
  abbrs[category.value.toString()] = category.abbr;
});

module.exports = React.createClass({
  displayName: 'Lead Category',

  propTypes: {
    category:    React.PropTypes.number.isRequired,
    equal:       React.PropTypes.bool,
    abbreviated: React.PropTypes.bool,
    small:       React.PropTypes.bool,
    outline:     React.PropTypes.bool,
    muted:       React.PropTypes.bool,
    disabled:    React.PropTypes.bool
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      equal:       false,
      abbreviated: false,
      small:       false,
      outline:     false,
      muted:       false,
      disabled:    false
    };
  },

  render: function() {
    const {
      equal,
      abbreviated,
      small,
      outline,
      muted,
      disabled
    } = this.props;

    const category  = categories[this.props.category];
    const abbr      = abbrs[this.props.category];

    const categoryClass = 'leadcat-' + category.toLowerCase();
    const catClass = cx(categoryClass, 'leadcat', {
      'leadcat-eq-abbr':    equal && abbreviated && !small,
      'leadcat-eq-abbr-sm': equal && abbreviated && small,
      'leadcat-eq':         equal && !abbreviated,
      'leadcat-outline':    outline,
      'leadcat-muted':      muted,
      'leadcat-disabled':   disabled
    });

    return (
      <span className={catClass}>{ abbreviated ? abbr : category }</span>
    );
  }
});
