
const React                 = require('react/addons');
const cx                    = require('classnames');
const SvgIcon               = require('./SvgIcon');
const ImageWithFallback     = require('./ImageWithFallback');
const Sash                  = require('./Sash');
const {
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
    }),
    beds:           React.PropTypes.string,
    baths:          React.PropTypes.string,
    sqft:           React.PropTypes.string,
    acres:          React.PropTypes.string
  },

  _renderSash() {
    const {sash} = this.props;
    if (sash) {
      return (
        <Sash
          type={sash.type}
          reducedAmount= {sash.reducedAmount}
          reducedPercent= {sash.reducedPercent}
          timeStamp={sash.timeStamp} />
      );
    }
  },

  _renderLocationPriceInfo() {
    const props = this.props;

    const listingLink = (
      <p className='card-priority card-street'>
        <a target='_blank' href={props.listingUrl }>{props.address.street}</a>
      </p>
    );

    return (
      <div>
        <p className='card-priority card-price'>{props.listPrice}</p>
        {listingLink}
        <div className='row row-xcondensed'>
          <div className='col-xs-7'>
            <p className='small'>{props.address.city}, {props.address.state}</p>
            <p className='small'>{props.address.neighborhood}</p>
          </div>
          <div className='col-xs-5 text-right'>
            <p className='small'>{props.pricePerSqft}/SQFT</p>
          </div>
        </div>
      </div>
    );
  },

  _renderStats() {
    const { beds, baths, sqft, acres } = this.props;

    return (
      <div>
        <div className='card-stats'>
          <span className='card-stat'>{beds} BEDS</span>
          <span className='card-stat'>{baths} BATHS</span>
          <span className='card-stat'>{sqft} SQFT</span>
          <span className='card-stat'>{acres} ACRES</span>
        </div>
      </div>
    );
  },

  _renderCarousel() {
    const props = this.props;

    let images = props.imageSrc || [];

    if (!images.length || images.length === 1) {
      const img = images[0] || '//boomstatic.com/img/comingsoon-lg.jpg';
      return (
        <ImageWithFallback
          className='card-img'
          alt={props.fullAddress}
          src={img}
          fallbackSrc={'//boomstatic.com/img/comingsoon-lg.jpg'}/>
      );
    }

    return (
      <Carousel indicators={false} prevIcon={<SvgIcon icon='chevron-left'/>} nextIcon={<SvgIcon icon='chevron-right'/>}>
        {images.map((img) => {
          return (
            <CarouselItem>
              <ImageWithFallback
                src={img}
                fallbackSrc={'//boomstatic.com/img/comingsoon-lg.jpg'}/>
            </CarouselItem>
          );
        })}
      </Carousel>
    );
  },

  render() {

    const classes = cx('card', this.props.className);

    return (
      <div className={classes}>
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
