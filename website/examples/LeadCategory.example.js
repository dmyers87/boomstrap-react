var ComponentExample = React.createClass({
  render() {
    return (
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
    );
  }
});
React.render(<ComponentExample/>, mountNode);