var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>SVG Icons</h4>
        <p style={{fontSize: '2em'}}>
          <SvgIcon icon='heart' className='text-danger'/>&nbsp;
          <SvgIcon icon='eye' className='text-info'/>&nbsp;
          <SvgIcon icon='chat' className='text-attention'/>&nbsp;
          <SvgIcon icon='user'/>&nbsp;
          <SvgIcon icon='cog'/>&nbsp;
          <SvgIcon icon='chevron-left'/>&nbsp;
          <SvgIcon icon='chevron-right'/>
        </p>
        <a href={'//boomtownroi.github.io/boomstrap/svg/sprite.symbol.html'} target={'_blank'}>view full set</a>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);