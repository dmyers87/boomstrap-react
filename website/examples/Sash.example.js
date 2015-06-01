var ComponentExample = React.createClass({

  render() {
    var style = {
      height: 50,
      position: 'relative'
    };
    return (
      <div>
        <h4>Sash</h4>
        <div style={style}>
          <Sash type='new'/>
        </div>
        <div style={style}>
          <Sash type='reduced'/>
        </div>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);