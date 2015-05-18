const React = require('react/addons');
const cx    = require('classnames');

// Components
const Icon = require('./Icon.jsx');

module.exports = React.createClass({
  displayName: 'Pager',

  propTypes: {
    currentPage:  React.PropTypes.number.isRequired,
    totalItems:   React.PropTypes.number.isRequired,
    itemsPerPage: React.PropTypes.number.isRequired,
    onPage:       React.PropTypes.func,
    disabled:     React.PropTypes.bool,
    className:    React.PropTypes.string
  },

  getDefaultProps() {
    return {
      onPage:    function() {},
      disabled:  false,
      className: ''
    };
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

    const pagerClass = cx('btn-group minimal-pager', this.props.className);

    return (
      <div className={pagerClass}>
        <button type='button' className={backBtnClass} onClick={this._onPageBack}>
          <Icon icon='chevron-left' />
        </button>
        <button type='button' className={fwdBtnClass} onClick={this._onPageFwd}>
          <Icon icon='chevron-right' />
        </button>
      </div>
    );
  }
});
