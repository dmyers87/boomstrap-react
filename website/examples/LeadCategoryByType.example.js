var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <div>
          <h4>Buyer Lead Category</h4>
          <LeadCategoryByType category={0}/>&nbsp;
          <LeadCategoryByType category={1}/>&nbsp;
          <LeadCategoryByType category={2}/>&nbsp;
          <LeadCategoryByType category={3}/>&nbsp;
          <LeadCategoryByType category={4}/>&nbsp;
          <LeadCategoryByType category={5}/>&nbsp;
          <LeadCategoryByType category={6}/>&nbsp;
          <LeadCategoryByType category={10}/>&nbsp;
          <LeadCategoryByType category={11}/>
        </div>
        <div>
          <h4>Seller Lead Category</h4>
          <LeadCategoryByType seller category={0}/>&nbsp;
          <LeadCategoryByType seller category={1}/>&nbsp;
          <LeadCategoryByType seller category={2}/>&nbsp;
          <LeadCategoryByType seller category={3}/>&nbsp;
          <LeadCategoryByType seller category={4}/>&nbsp;
          <LeadCategoryByType seller category={5}/>&nbsp;
          <LeadCategoryByType seller category={6}/>&nbsp;
          <LeadCategoryByType seller category={10}/>&nbsp;
          <LeadCategoryByType seller category={11}/>
        </div>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);