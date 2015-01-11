"use strict";

var React = require("react/addons");
var cx = React.addons.classSet;
var PureRenderMixin = React.addons.PureRenderMixin;

var LeadCategories = require("../Constants/LeadCategories");

var categories = {}, abbrs = {};

LeadCategories.forEach(function (category) {
  categories[category.value.toString()] = category.name;
  abbrs[category.value.toString()] = category.abbr;
});

module.exports = React.createClass({
  displayName: "Lead Category",

  propTypes: {
    category: React.PropTypes.number,
    equal: React.PropTypes.bool,
    abbreviated: React.PropTypes.bool
  },

  mixins: [PureRenderMixin],

  render: function () {
    var category = categories[this.props.category];
    var abbr = abbrs[this.props.category];

    var isEqualLength = this.props.equal;
    var isAbbreviated = this.props.abbreviated;

    var categoryClass = "leadcat-" + category.toLowerCase();
    var catClass = categoryClass + " " + cx({
      leadcat: true,
      "leadcat-eq-abbr": isEqualLength && isAbbreviated,
      "leadcat-eq": isEqualLength && !isAbbreviated
    });

    return React.createElement("span", {
      className: catClass
    }, isAbbreviated ? abbr : category);
  }
});