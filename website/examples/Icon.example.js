var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Icons (using font icons)</h4>
        <div className="callout callout-danger">
          <h4>Deprecated Font Icons</h4>
          <p>We have switched to an SVG icon system. Font icons are still available for use but 
          development has stopped and they will eventually be removed from the project. Moving 
          forward, please use the SvgIcon component.</p>
        </div>
        <p style={{fontSize: '2em'}}>
          <Icon icon='heart'/> <Icon icon='eye'/> <Icon icon='chat'/> <Icon icon='user'/> <Icon icon='cog'/> 
          <Icon icon='chevron-left'/> <Icon icon='chevron-right'/>
        </p>
        <a href={'http://boomtownroi.github.io/boomstrap/css/fonts/ficon-docs/demo.html'} target={'_blank'}>view full set</a>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);