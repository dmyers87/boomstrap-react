'use strict';

var React = require('react/addons');
var cx = require('classnames');

// Components
var SvgIcon = require('./SvgIcon');

module.exports = React.createClass({
  displayName: 'Pager',

  propTypes: {
    currentPage: React.PropTypes.number.isRequired,
    totalItems: React.PropTypes.number.isRequired,
    itemsPerPage: React.PropTypes.number.isRequired,
    onPage: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onPage: function onPage() {},
      disabled: false,
      className: ''
    };
  },

  _getMaxPage: function _getMaxPage() {
    var maxPage = Math.floor(this.props.totalItems / this.props.itemsPerPage);
    if (this.props.totalItems % this.props.itemsPerPage) {
      maxPage++;
    }
    return maxPage;
  },

  _onPageBack: function _onPageBack() {
    if (this.props.currentPage > 1) {
      this.props.onPage(this.props.currentPage - 1);
    }
  },

  _onPageFwd: function _onPageFwd() {
    var maxPage = this._getMaxPage();
    if (this.props.currentPage !== maxPage) {
      this.props.onPage(this.props.currentPage + 1);
    }
  },

  render: function render() {
    var currentPage = this.props.currentPage;
    var maxPage = this._getMaxPage();

    var backBtnClass = cx('btn btn-default btn-icon', {
      'disabled': currentPage === 1 || this.props.disabled
    });

    var fwdBtnClass = cx('btn btn-default btn-icon', {
      'disabled': currentPage === maxPage || this.props.disabled
    });

    var pagerClass = cx('btn-group minimal-pager', this.props.className);

    return React.createElement(
      'div',
      { className: pagerClass },
      React.createElement(
        'button',
        { type: 'button', className: backBtnClass, onClick: this._onPageBack },
        React.createElement(SvgIcon, { icon: 'chevron-left' })
      ),
      React.createElement(
        'button',
        { type: 'button', className: fwdBtnClass, onClick: this._onPageFwd },
        React.createElement(SvgIcon, { icon: 'chevron-right' })
      )
    );
  }
});