var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Switcher</h4>
        <Switcher id='switcher1' checked={true}/>&nbsp;
        <Switcher id='switcher2' checked={false}/>
        <h4>Sizes</h4>
        <Switcher id='switcher3' checked={true} size='sm'/>&nbsp;
        <Switcher id='switcher4' checked={false} size='sm'/>&nbsp;
        <h4>Disabled</h4>
        <Switcher id='switcher5' checked={true} disabled={true}/>&nbsp;
        <Switcher id='switcher6' checked={false} disabled={true}/>
      </div>
    );
  }
});
ReactDOM.render(<ComponentExample/>, mountNode);