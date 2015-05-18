var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Fauxdio</h4>
        <Fauxdio id='fb1' checked={true} label='Radio'/>
        <Fauxdio id='fb2' checked={false} label='Is'/>
        <Fauxdio id='fb3' checked={false} label='Faux'/>
        <Fauxdio id='fb4' checked={false} label='Yeaux!'/>
        <hr/>
        <h4 className='inline-block' style={{marginRight: 1 + 'em'}}>Inline Fauxdio: </h4>
        <Fauxdio id='fb5' checked={false} label='Radio' inline={true}/>
        <Fauxdio id='fb6' checked={false} label='Is' inline={true}/>
        <Fauxdio id='fb7' checked={true} label='Faux'inline={true}/>
        <Fauxdio id='fb8' checked={false} label='Yeaux!' inline={true}/>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);