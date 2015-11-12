var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Fauxbox</h4>
        <Fauxbox checked id='fb1' label='Box'/>
        <Fauxbox checked={false} id='fb2' label='Is'/>
        <Fauxbox checked id='fb3' label='Faux'/>
        <Fauxbox checked={false} id='fb4' label='Yeaux!'/>
        <hr/>
        <h4 className='inline-block' style={{marginRight: 1 + 'em'}}>Inline Fauxbox: </h4>
        <Fauxbox checked id='fb5' label='Box' inline={true}/>
        <Fauxbox checked={false} id='fb6' label='Is' inline={true}/>
        <Fauxbox checked id='fb7' label='Faux'inline={true}/>
        <Fauxbox checked={false} id='fb8' label='Yeaux!' inline={true}/>
      </div>
    );
  }
});
ReactDOM.render(<ComponentExample/>, mountNode);