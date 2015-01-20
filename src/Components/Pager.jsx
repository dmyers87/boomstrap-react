'use strict';

var React = require('react/addons');
var cx    = React.addons.classSet;

module.exports = React.createClass({
  displayName: 'Pager',

  propTypes: {
    currentPage:  React.PropTypes.number.isRequired,
    totalItems:   React.PropTypes.number.isRequired,
    itemsPerPage: React.PropTypes.number.isRequired,
    onPage:       React.PropTypes.func
  },

  _getMaxPage() {
    var maxPage = Math.floor(this.props.totalItems / this.props.itemsPerPage);
    if (this.props.totalItems % this.props.itemsPerPage) {
      maxPage++;
    }
    return maxPage;
  },

  _onPageBack() {
    if (this.props.currentPage > 1) {
      this.props.onPage(this.props.currentPage - 1);
    }
  },

  _onPageFwd() {
    var maxPage = this._getMaxPage();
    if (this.props.currentPage !== maxPage) {
      this.props.onPage(this.props.currentPage + 1);
    }
  },

  render() {
    var currentPage = this.props.currentPage;
    var maxPage = this._getMaxPage();

    var backBtnClass = cx({
      'btn btn-default btn-icon': true,
      'disabled': currentPage === 1
    });

    var fwdBtnClass = cx({
      'btn btn-default btn-icon': true,
      'disabled': currentPage === maxPage
    });

    return (
      <div className='btn-group minimal-pager'>
        <button type='button' className={backBtnClass} onClick={this._onPageBack}>
          <i className='ficon ficon-chevron-left' />
        </button>
        <button type='button' className={fwdBtnClass} onClick={this._onPageFwd}>
          <i className='ficon ficon-chevron-right' />
        </button>
      </div>
    );
  }
});
