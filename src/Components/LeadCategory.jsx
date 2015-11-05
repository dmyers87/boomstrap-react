const React = require('react');
const cx    = require('classnames');
const PureRenderMixin = require('react-addons-pure-render-mixin');

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
    muted:       React.PropTypes.bool,
    disabled:    React.PropTypes.bool
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      muted:       false,
      disabled:    false
    };
  },

  render: function() {
    const {
      muted,
      disabled,
      ...props
    } = this.props;

    const category  = categories[this.props.category];
    const abbr      = abbrs[this.props.category];

    const categoryClass = 'leadcat-' + category.toLowerCase();
    const catClass = cx(categoryClass, 'leadcat', {
      'leadcat-muted':      muted,
      'leadcat-disabled':   disabled
    });

    return (
      <span {...props} className={catClass}>
        { abbr }
      </span>
    );
  }
});
