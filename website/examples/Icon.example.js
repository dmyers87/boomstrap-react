var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>SVG Icons</h4>
        <p style={{fontSize: '2em'}}>
          <Icon icon='heart' className='text-danger'/>&nbsp;
          <Icon icon='eye' className='text-info'/>&nbsp;
          <Icon icon='chat' className='text-attention'/>&nbsp;
          <Icon icon='user'/>&nbsp;
          <Icon icon='cog'/>&nbsp;
          <Icon icon='chevron-left'/>&nbsp;
          <Icon icon='chevron-right'/>
        </p>
        <a href={'//boomtownroi.github.io/boomstrap/svg/sprite.symbol.html'} target={'_blank'}>view full set</a>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);
