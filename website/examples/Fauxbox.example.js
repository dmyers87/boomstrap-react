

var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <Fauxbox id='fb1' label='Box'/>
        <Fauxbox id='fb2' label='Is' checked={true} />
        <Fauxbox id='fb3' label='Faux'/>
        <Fauxbox id='fb4' label='Yeaux!'/>
        <hr/>
        <Fauxbox id='fb5' label='Inline One' inline={true}/>
        <Fauxbox id='fb6' label='Inline Two' inline={true} />
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);