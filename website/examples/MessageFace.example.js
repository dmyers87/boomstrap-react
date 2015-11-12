var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <MessageFace />&nbsp;
        <MessageFace placement='left'/>&nbsp;
        <MessageFace placement='top'/>&nbsp;
        <MessageFace placement='right'/>&nbsp;
        <MessageFace placement='bottom'/>
      </div>
    );
  }
});
ReactDOM.render(<ComponentExample/>, mountNode);