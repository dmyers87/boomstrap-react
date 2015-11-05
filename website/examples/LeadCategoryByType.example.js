var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <div>
          <h4>Buyer Lead Category</h4>
          <LeadCategoryByType buyer category={0}/>&nbsp;
          <LeadCategoryByType buyer category={1}/>&nbsp;
          <LeadCategoryByType buyer category={2}/>&nbsp;
          <LeadCategoryByType buyer category={3}/>&nbsp;
          <LeadCategoryByType buyer category={4}/>&nbsp;
          <LeadCategoryByType buyer category={5}/>&nbsp;
          <LeadCategoryByType buyer category={6}/>&nbsp;
          <LeadCategoryByType buyer category={10}/>&nbsp;
          <LeadCategoryByType buyer category={11}/>
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
        <div>
          <h4>Buyer/Seller Lead Category</h4>
          <LeadCategoryByType buyer seller category={0}/>&nbsp;
          <LeadCategoryByType buyer seller category={1}/>&nbsp;
          <LeadCategoryByType buyer seller category={2}/>&nbsp;
          <LeadCategoryByType buyer seller category={3}/>&nbsp;
          <LeadCategoryByType buyer seller category={4}/>&nbsp;
          <LeadCategoryByType buyer seller category={5}/>&nbsp;
          <LeadCategoryByType buyer seller category={6}/>&nbsp;
          <LeadCategoryByType buyer seller category={10}/>&nbsp;
          <LeadCategoryByType buyer seller category={11}/>
        </div>
      </div>
    );
  }
});
ReactDOM.render(<ComponentExample/>, mountNode);