var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Card</h4>
        <Card address={{ city:'Mount Pleasant', neighborhood:'Grassy Creek', state:'SC', street:'227 Palmetto Bluff' }} beds='4' baths='3.5' sqft='3200' acres='0.32' listingID='11111111' listPrice='$725,000' pricePerSqft='$226' reduced={{changed:'20,000', changePercent:'10%', when:'05/12/15'}}/>
        &nbsp;&nbsp;
        <Card address={{ city:'Mount Pleasant', neighborhood:'Grassy Creek', state:'SC', street:'227 Palmetto Bluff' }} beds='4' baths='3.5' sqft='3200' acres='0.32' listingID='11111111' listPrice='$725,000' pricePerSqft='$226' isSmall/>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);