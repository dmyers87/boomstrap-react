var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Score</h4>
        <Score score='99'/>&nbsp;
        <Score score='75'/>&nbsp;
        <Score score='50'/>&nbsp;
        <Score score='25'/>&nbsp;
        <h4>Sizes</h4>
        <Score score='99' size='lg'/>&nbsp;
        <Score score='75'/>&nbsp;
        <Score score='50' size='sm'/>&nbsp;
        <Score score='25' size='xs'/>&nbsp;
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);