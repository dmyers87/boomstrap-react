"use strict";

var React = require("react/addons");
var cx = React.addons.classSet;

module.exports = React.createClass({
  displayName: "Pager",

  propTypes: {
    currentPage: React.PropTypes.number.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    itemsPerPage: React.PropTypes.number.isRequired,
    onPage: React.PropTypes.func
  },

  _getMaxPage: function () {
    var maxPage = this.props.totalItems / this.props.itemsPerPage;
    if (this.props.totalItems % this.props.itemsPerPage) {
      maxPage++;
    }
    return maxPage;
  },

  _onPageBack: function () {
    if (this.props.currentPage > 1) {
      this.props.onPage(this.props.currentPage - 1);
    }
  },

  _onPageFwd: function () {
    var maxPage = this._getMaxPage();
    if (this.props.currentPage !== maxPage) {
      this.props.onPage(this.props.currentPage + 1);
    }
  },

  render: function () {
    var currentPage = this.props.currentPage;
    var maxPage = this._getMaxPage();

    var backBtnClass = cx({
      "btn btn-default btn-icon": true,
      disabled: currentPage === 1
    });

    var fwdBtnClass = cx({
      "btn btn-default btn-icon": true,
      disabled: currentPage === maxPage
    });

    return React.createElement("div", {
      className: "btn-group minimal-pager"
    }, React.createElement("button", {
      type: "button",
      className: backBtnClass,
      onClick: this._onPageBack
    }, React.createElement("i", {
      className: "ficon ficon-chevron-left"
    })), React.createElement("button", {
      type: "button",
      className: fwdBtnClass,
      onClick: this._onPageFwd
    }, React.createElement("i", {
      className: "ficon ficon-chevron-right"
    })));
  }
});