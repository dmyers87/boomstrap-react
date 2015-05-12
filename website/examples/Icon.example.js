var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Icons</h4>
        <p style={{fontSize: 2 + 'em'}}>
          <Icon icon='heart' /> <Icon icon='eye' /> <Icon icon='chat' /> <Icon icon='user' /> <Icon icon='cog' /> 
          <Icon icon='chevron-left' /> <Icon icon='chevron-right' />
        </p>
        <a href={'http://boomtownroi.github.io/boomstrap/css/fonts/ficon-docs/demo.html'} target={'_blank'}>view full set</a>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);