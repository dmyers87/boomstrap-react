var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Switcher</h4>
        <Switcher id='switcher1' checked={true} />&nbsp;
        <Switcher id='switcher2' />&nbsp;
        <Switcher id='switcher3' checked={true} size='sm' />&nbsp;
        <Switcher id='switcher4' size='sm' />&nbsp;
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);