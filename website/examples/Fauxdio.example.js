var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Fauxdio</h4>
        <Fauxdio radioID='fb1' checked={true} label='Radio'/>
        <Fauxdio radioID='fb2' checked={false} label='Is'/>
        <Fauxdio radioID='fb3' checked={false} label='Faux'/>
        <Fauxdio radioID='fb4' checked={false} label='Yeaux!'/>
        <hr/>
        <h4 className='inline-block' style={{marginRight: 1 + 'em'}}>Inline Fauxdio: </h4>
        <Fauxdio radioID='fb5' checked={false} label='Radio' inline={true}/>
        <Fauxdio radioID='fb6' checked={false} label='Is' inline={true}/>
        <Fauxdio radioID='fb7' checked={true} label='Faux'inline={true}/>
        <Fauxdio radioID='fb8' checked={false} label='Yeaux!' inline={true}/>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);