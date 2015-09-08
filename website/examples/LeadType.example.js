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
          <h4>Square</h4>
          <LeadType buyer square />&nbsp;
          <LeadType seller square />&nbsp;
          <LeadType buyer seller square />&nbsp;
        </div>
        <div>
          <h4>Square Small</h4>
          <LeadType buyer square small />&nbsp;
          <LeadType seller square small />&nbsp;
          <LeadType buyer seller square small />&nbsp;
        </div>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);