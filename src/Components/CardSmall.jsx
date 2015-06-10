
const React                 = require('react/addons');
const cx                    = require('classnames');
const ImageWithFallback     = require('./ImageWithFallback');
const Sash                  = require('./Sash');

module.exports = React.createClass({
  displayName: 'Card Small',

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
      <p className='card-sm-priority card-sm-street'>
        <a target='_blank' href={props.listingUrl}>{props.address.street}</a>
      </p>
    );

    return (
      <div className='row row-xcondensed'>
        <div className='col-xs-8'>
          {listingLink}
          <p className='xsmall'>{props.address.city}, {props.address.state}</p>
          <p className='xsmall'>{props.address.neighborhood}</p>
        </div>
        <div className='col-xs-4 text-right'>
          <p className='card-sm-priority card-sm-price'>{props.listPrice}</p>
          <p className='xsmall'>{props.pricePerSqft}/SQFT</p>
        </div>
      </div>
    );

  },

  _renderStats() {
    const { beds, baths, sqft, acres } = this.props;

    return (
      <div className='card-sm-stats'>
        <span className='card-sm-stat'>{beds} BEDS</span>
        <span className='card-sm-stat'>{baths} BATHS</span>
        <span className='card-sm-stat'>{sqft} SQFT</span>
        <span className='card-sm-stat'>{acres} ACRES</span>
      </div>
    );
  },

  render() {
    const props = this.props;

    const classes = cx('card card-sm', props.className);

    let imageSrc = null;
    if (props.imageSrc && props.imageSrc.length) {
      imageSrc = props.imageSrc[0];
    } else {
      imageSrc = '//boomstatic.com/img/comingsoon-lg.jpg';
    }

    return (
      <div className={classes}>
        <div className='card-photo'>
          <div className='card-photo-inner'>
            {this._renderSash()}
            <ImageWithFallback
              className='card-img'
              alt={props.fullAddress}
              src={imageSrc}
              fallbackSrc={'//boomstatic.com/img/comingsoon-lg.jpg'}/>
          </div>
        </div>
        <div className='card-sm-container'>
          {this._renderLocationPriceInfo()}
        </div>
        {this._renderStats()}
        {this.props.children}
      </div>
    );
  }
});
