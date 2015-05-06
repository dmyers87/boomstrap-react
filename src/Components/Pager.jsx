const React = require('react/addons');
const cx    = require('classnames');

module.exports = React.createClass({
  displayName: 'Pager',

  propTypes: {
    currentPage:  React.PropTypes.number.isRequired,
    totalItems:   React.PropTypes.number.isRequired,
    itemsPerPage: React.PropTypes.number.isRequired,
    onPage:       React.PropTypes.func,
    disabled:     React.PropTypes.bool
  },

  _getMaxPage() {
    let maxPage = Math.floor(this.props.totalItems / this.props.itemsPerPage);
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
    const maxPage = this._getMaxPage();
    if (this.props.currentPage !== maxPage) {
      this.props.onPage(this.props.currentPage + 1);
    }
  },

  render() {
    const currentPage = this.props.currentPage;
    const maxPage = this._getMaxPage();

    const backBtnClass = cx('btn btn-default btn-icon', {
      'disabled': currentPage === 1 || this.props.disabled
    });

    const fwdBtnClass = cx('btn btn-default btn-icon', {
      'disabled': currentPage === maxPage || this.props.disabled
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
