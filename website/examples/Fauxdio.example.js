var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Fauxdio</h4>
        <Fauxdio radioID='optionRadios1' checked radioName='optionRadiosOne' label='Radio'/>
        <Fauxdio radioID='optionRadios2' radioName='optionRadiosOne' label='Is'/>
        <Fauxdio radioID='optionRadios3' radioName='optionRadiosOne' label='Faux'/>
        <Fauxdio radioID='optionRadios4' radioName='optionRadiosOne' label='Yeaux!'/>
        <hr/>
        <h4 className='inline-block' style={{marginRight: 1 + 'em'}}>Inline Fauxdio: </h4>
        <Fauxdio radioID='optionRadios5' radioName='optionRadiosTwo'label='Radio' inline={true}/>
        <Fauxdio radioID='optionRadios6' radioName='optionRadiosTwo'label='Is' inline={true}/>
        <Fauxdio radioID='optionRadios7' checked radioName='optionRadiosTwo'label='Faux'inline={true}/>
        <Fauxdio radioID='optionRadios8' radioName='optionRadiosTwo'label='Yeaux!' inline={true}/>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);