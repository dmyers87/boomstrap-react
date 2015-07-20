var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <div>
          <h4>Default</h4>
          <LeadType buyer />&nbsp;
          <LeadType seller />&nbsp;
          <LeadType buyer seller />&nbsp;
        </div>
        <div>
          <h4>Equal Width</h4>
          <LeadType buyer equal />&nbsp;
          <LeadType seller equal />&nbsp;
          <LeadType buyer seller equal />&nbsp;
        </div>
        <div>
          <h4>Abbreviated</h4>
          <LeadType buyer abbreviated />&nbsp;
          <LeadType seller abbreviated />&nbsp;
          <LeadType buyer seller abbreviated />&nbsp;
        </div>
        <div>
          <h4>Abbreviated Vertical</h4>
          <LeadType buyer abbreviated vertical />&nbsp;
          <LeadType seller abbreviated vertical />&nbsp;
          <LeadType buyer seller abbreviated vertical />&nbsp;
        </div>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);