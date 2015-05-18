var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Pager</h4>
        <Pager currentPage={1} itemsPerPage={50} totalItems={400} />
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);