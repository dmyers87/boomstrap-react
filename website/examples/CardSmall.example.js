var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Card Small</h4>
        <CardSmall imageSrc={['http://photos.boomtowncdn.com/charleston/orig_boomver_1_1303255-50.jpg','http://photos.boomtowncdn.com/charleston/orig_boomver_1_1303255-52.jpg']} address={{ city:'Mount Pleasant', neighborhood:'Grassy Creek', state:'SC', street:'227 Palmetto Bluff' }} beds='4' baths='3.5' sqft='3200' acres='0.32' listingID='11111111' listPrice='$725,000' pricePerSqft='$226'/>
        &nbsp;&nbsp;
        <CardSmall imageSrc={['http://photos.boomtowncdn.com/charleston/orig_boomver_1_1303255-50.jpg']} sash={{ type: 'new', timeStamp: '06/04/15'}} address={{ city:'Mount Pleasant', neighborhood:'Grassy Creek', state:'SC', street:'227 Palmetto Bluff' }} beds='4' baths='3.5' sqft='3200' acres='0.32' listingID='11111111' listPrice='$725,000' pricePerSqft='$226'/>
        &nbsp;&nbsp;
        <CardSmall imageSrc={['http://photos.boomtowncdn.com/charleston/orig_boomver_1_1303255-50.jpg']} sash={{ type: 'reduced', reducedAmount: '$20,000', reducedPercent: '10%', timeStamp: '06/02/15'}} address={{ city:'Mount Pleasant', neighborhood:'Grassy Creek', state:'SC', street:'227 Palmetto Bluff' }} beds='4' baths='3.5' sqft='3200' acres='0.32' listingID='11111111' listPrice='$725,000' pricePerSqft='$226'/>
        &nbsp;&nbsp;
        <CardSmall imageSrc={['http://photos.boomtowncdn.com/charleston/orig_boomver_1_1303255-50.jpg']} sash={{ type: 'off', timeStamp: '05/29/15'}} address={{ city:'Mount Pleasant', neighborhood:'Grassy Creek', state:'SC', street:'227 Palmetto Bluff' }} beds='4' baths='3.5' sqft='3200' acres='0.32' listingID='11111111' listPrice='$725,000' pricePerSqft='$226'/>
        &nbsp;&nbsp;
        <CardSmall imageSrc={['http://photos.boomtowncdn.com/charleston/orig_boomver_1_1303255-50.jpg']} sash={{ type: 'back', timeStamp: '05/22/15'}} address={{ city:'Mount Pleasant', neighborhood:'Grassy Creek', state:'SC', street:'227 Palmetto Bluff' }} beds='4' baths='3.5' sqft='3200' acres='0.32' listingID='11111111' listPrice='$725,000' pricePerSqft='$226'/>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);