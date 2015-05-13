var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Fauxbox</h4>
        <Fauxbox id='fb1' label='Box'/>
        <Fauxbox id='fb2' label='Is' />
        <Fauxbox id='fb3' label='Faux'/>
        <Fauxbox id='fb4' label='Yeaux!'/>
        <hr/>
        <h4 className='inline-block' style={{marginRight: 1 + 'em'}}>Inline Fauxbox: </h4>
        <Fauxbox id='fb5' label='Box' inline={true} />
        <Fauxbox id='fb6' label='Is' inline={true} />
        <Fauxbox id='fb7' label='Faux'inline={true} />
        <Fauxbox id='fb8' label='Yeaux!' inline={true} />
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);