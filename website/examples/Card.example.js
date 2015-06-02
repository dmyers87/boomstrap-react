var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Card</h4>
        <Card address={{ city:'Charleston', neighborhood:'Grassy Creek', state:'SC', street:'247 Palmetto' }} beds='4' baths='3' sqft='1800' acres='0.32' listingID='48891055' listPrice='$600,000' pricePerSqft='$249' isSmall/>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);