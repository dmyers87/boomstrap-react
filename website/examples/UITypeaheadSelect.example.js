const options = [
  { element: <strong>Mark Funk</strong>, payload: 'Mark Funk' },
  { element: <strong>Ian Gruelich</strong>, payload: 'Ian Gruelich' },
  { element: <strong>Craig Anthony</strong>, payload: 'Craig Anthony' },
  { element: <strong>Sean McCambridge</strong>, payload: 'Sean McCambridge' },
  { element: <strong>Christian Cox</strong>, payload: 'Christian Cox' },

]

var ComponentExample = React.createClass({
  getInitialState() {
    return {
      selectedPayload: '',
      currentSearch: ''
    };
  },

  _onSearch(currentSearch) {
    this.setState({ currentSearch });
  },

  _onSelectMatch(selectedPayload) {
    this.setState({ selectedPayload });
  },

  render() {
    let selectedElement = null;
    if (this.state.selectedPayload) {
      selectedElement = (
        <div style={{marginTop: 10}}>You have selected {this.state.selectedPayload}</div>
      );
    }

    let innerOptions = [];
    if (this.state.currentSearch) {
      innerOptions = options.filter((option) => {
        return option.payload.toLowerCase().indexOf(this.state.currentSearch.toLowerCase()) !== -1;
      });
    }

    return (
      <div>
        <UITypeaheadSelect
          className='typeahead-search'
          iconClass='typeahead-search__icon'
          placeholder='Find a Boomstrap Contributor!'
          onSearch={this._onSearch}
          onSelectMatch={this._onSelectMatch}
          options={innerOptions} />
        {selectedElement}
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);