
const React                 = require('react/addons');
const cx                    = require('classnames');
const ImageWithFallback     = require('./ImageWithFallback');
const Sash                  = require('./Sash.jsx');
const Icon                  = require('./Icon.jsx');
const {
  Button,
  Carousel,
  CarouselItem
} = require('react-bootstrap');

module.exports = React.createClass({
  displayName: 'Card',

  propTypes: {
    /**
     * Optionally include additional class name(s).
     */
    className:      React.PropTypes.string,
    children:       React.PropTypes.any,
    imageSrc:       React.PropTypes.array,
    listingUrl:     React.PropTypes.string,
    fullAddress:    React.PropTypes.string,
    address:        React.PropTypes.shape({
      city:            React.PropTypes.string,
      street:          React.PropTypes.string,
      state:           React.PropTypes.string,
      neighborhood:    React.PropTypes.string
    }),
    listPrice:      React.PropTypes.string,
    pricePerSqft:   React.PropTypes.string,
    sash:           React.PropTypes.shape({
      type:            React.PropTypes.string,
      timeStamp:       React.PropTypes.string,
      reducedAmount:   React.PropTypes.string,
      reducedPercent:  React.PropTypes.string
    })
  },

  _renderSash() {
    const props = this.props;
    if (props.sash) {
      return (
        <Sash type={ props.sash.type } reducedAmount= { props.sash.reducedAmount } reducedPercent= { props.sash.reducedPercent } timeStamp={ props.sash.timeStamp } />
      );
    }
  },

  _renderLocationPriceInfo() {
    const props = this.props;

    const listingLink = (
      <p className='card-priority card-street'>
        <a target='_blank' href={props.listingUrl}>{props.address.street}</a>
      </p>
    );

    return (
      <div>
        <p className='card-priority card-price'>{ props.listPrice }</p>
        {listingLink}
        <div className='row row-xcondensed'>
          <div className='col-xs-7'>
            <p className='small'>{ props.address.city } , { props.address.state }</p>
            <p className='small'>{ props.address.neighborhood }</p>
          </div>
          <div className='col-xs-5 text-right'>
            <p className='small'>{ props.pricePerSqft }/SQFT</p>
          </div>
        </div>
      </div>
    );

  },

  _renderStats() {
    const props = this.props;

    return (
      <div>
        <div className='card-stats'>
          <span className='card-stat'>{ props.beds } BEDS</span>
          <span className='card-stat'>{ props.baths } BATHS</span>
          <span className='card-stat'>{ props.sqft } SQFT</span>
          <span className='card-stat'>{ props.acres } ACRES</span>
        </div>
        {/*
        <div className='card-container'>
          <div className='row row-xcondensed'>
            <div className='col-sm-6'>
              <Button bsSize='small' className='btn-block'><Icon icon='star'/> 1220 Best-Fit</Button>
            </div>
            <div className='col-sm-6'>
              <Button bsSize='small' className='btn-block'><Icon icon='heart'/> 11 Favs</Button>
            </div>
          </div>
        </div>
        */}
      </div>
    );
  },

  _renderCarouselItem() {
    return (
      <CarouselItem>
        <ImageWithFallback src={imageSrc} fallbackSrc={'//boomstatic.com/img/comingsoon-lg.jpg'}/>
      </CarouselItem>
    );
  },

  _renderCarousel() {
    const props = this.props;

    let imageSrc = null;

    // If no imageSrc or if empty imageSrce array, return coming soon image
    if (!this.props.imageSrc || this.props.imageSrc && !this.props.imageSrc.length) {
      imageSrc = '//boomstatic.com/img/comingsoon-lg.jpg';
      return (
        <ImageWithFallback
                className='card-img'
                alt={ this.props.fullAddress }
                src={imageSrc}
                fallbackSrc={'//boomstatic.com/img/comingsoon-lg.jpg'}/>
      );
    }

    // If imageSrc only has one image in the array, return the image
    if (this.props.imageSrc && this.props.imageSrc.length === 1) {
      imageSrc = this.props.imageSrc[0];
      return (
        <ImageWithFallback
                className='card-img'
                alt={ this.props.fullAddress }
                src={imageSrc}
                fallbackSrc={'//boomstatic.com/img/comingsoon-lg.jpg'}/>
      );
    }

    return (
      <Carousel>
        {this.props.imageSrc.map(function(img) {
          return (
            <CarouselItem>
              <ImageWithFallback src={img} fallbackSrc={'//boomstatic.com/img/comingsoon-lg.jpg'}/>
            </CarouselItem>
          );
        })}
      </Carousel>
    );
    
  },

  render() {

    return (
      <div className='card'>
        <div className='card-photo'>
          <div className='card-photo-inner'>
            {this._renderSash()}
            {this._renderCarousel()}
          </div>
        </div>
        <div className='card-container card-intro'>
          {this._renderLocationPriceInfo()}
        </div>
        {this._renderStats()}
        {this.props.children}
      </div>
    );

  }
});
