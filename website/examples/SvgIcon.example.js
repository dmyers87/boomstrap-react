var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>SVG Icons</h4>
        <p style={{fontSize: '2em'}}>
          <SvgIcon icon='heart'/> <SvgIcon icon='eye'/> <SvgIcon icon='chat'/> <SvgIcon icon='user'/> <SvgIcon icon='cog'/> 
          <SvgIcon icon='chevron-left'/> <SvgIcon icon='chevron-right'/>
        </p>
        <a href={'http://boomtownroi.github.io/boomstrap/svg/sprite.symbol.html'} target={'_blank'}>view full set</a>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);