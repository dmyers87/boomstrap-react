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
          <Sash type='new' timeStamp='05/22/15' />
        </div>
        <div style={style}>
          <Sash type='reduced' reducedAmount='$20,000' reducedPercent='10%' timeStamp='06/01/15' />
        </div>
        <div style={style}>
          <Sash type='off' timeStamp='05/29/15' />
        </div>
        <div style={style}>
          <Sash type='back' timeStamp='06/02/15' />
        </div>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);