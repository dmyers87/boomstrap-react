var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Circle</h4>
        <p><Circle /> <em>default</em></p>
        <p><Circle type='now'/> now</p>
        <p><Circle type='today'/> today</p>
        <p><Circle type='14-days'/> 14-days</p>
        <p><Circle type='90-days'/> 90-days</p>
        <p><Circle type='forever'/> forever</p>
      </div>
    );
  }
});
ReactDOM.render(<ComponentExample/>, mountNode);