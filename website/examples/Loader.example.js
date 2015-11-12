var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Loader</h4>
        <Loader/>
      </div>
    );
  }
});
ReactDOM.render(<ComponentExample/>, mountNode);