var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <div>
          <h4>Lead Category</h4>
          <LeadCategory category={0}/>&nbsp;
          <LeadCategory category={1}/>&nbsp;
          <LeadCategory category={2}/>&nbsp;
          <LeadCategory category={3}/>&nbsp;
          <LeadCategory category={4}/>&nbsp;
          <LeadCategory category={5}/>&nbsp;
          <LeadCategory category={6}/>&nbsp;
          <LeadCategory category={10}/>&nbsp;
          <LeadCategory category={11}/>
        </div>
        <div>
          <h4>Muted</h4>
          <LeadCategory category={0} muted />&nbsp;
          <LeadCategory category={1} muted />&nbsp;
          <LeadCategory category={2} muted />&nbsp;
          <LeadCategory category={3} muted />&nbsp;
          <LeadCategory category={4} muted />&nbsp;
          <LeadCategory category={5} muted />&nbsp;
          <LeadCategory category={6} muted />&nbsp;
          <LeadCategory category={10} muted />&nbsp;
          <LeadCategory category={11} muted />
        </div>
        <div>
          <h4>Disabled</h4>
          <LeadCategory category={0} disabled />&nbsp;
          <LeadCategory category={1} disabled />&nbsp;
          <LeadCategory category={2} disabled />&nbsp;
          <LeadCategory category={3} disabled />&nbsp;
          <LeadCategory category={4} disabled />&nbsp;
          <LeadCategory category={5} disabled />&nbsp;
          <LeadCategory category={6} disabled />&nbsp;
          <LeadCategory category={10} disabled />&nbsp;
          <LeadCategory category={11} disabled />
        </div>
      </div>
    );
  }
});
ReactDOM.render(<ComponentExample/>, mountNode);