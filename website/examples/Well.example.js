var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Well</h4>
        <Well>Look I'm in a well!</Well>
        <h4>Sizes</h4>
        <Well small={true}>Look I'm in a <strong>small</strong> well!</Well>
        <Well>Look I'm in a <strong>default</strong> well!</Well>
        <Well large={true}>Look I'm in a <strong>large</strong> well!</Well>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);