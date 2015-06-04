
const React                 = require('react/addons');
const cx                    = require('classnames');
const ImageWithFallback     = require('./ImageWithFallback');
const Sash                  = require('./Sash.jsx');

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

    const listingClass = cx('card-sm-priority card-sm-street');
    const listingLink = (
      <p className={listingClass}>
        <a target='_blank' href={props.listingUrl}>{props.address.street}</a>
      </p>
    );

    return (
      <div className='row row-xcondensed'>
        <div className='col-xs-8'>
          {listingLink}
          <p className='xsmall'>{ props.address.city } , { props.address.state }</p>
          <p className='xsmall'>{ props.address.neighborhood }</p>
        </div>
        <div className='col-xs-4 text-right'>
          <p className='card-sm-priority card-sm-price'>{ props.listPrice }</p>
          <p className='xsmall'>{ props.pricePerSqft }/SQFT</p>
        </div>
      </div>
    );

  },

  _renderStats() {
    const props = this.props;
    const cardStatsClass = cx('card-sm-stats');
    const cardStatClass = cx('card-sm-stat');

    return (
      <div className={cardStatsClass}>
        <span className={cardStatClass}>{ props.beds } BEDS</span>
        <span className={cardStatClass}>{ props.baths } BATHS</span>
        <span className={cardStatClass}>{ props.sqft } SQFT</span>
        <span className={cardStatClass}>{ props.acres } ACRES</span>
      </div>
    );
  },

  render() {
    const props = this.props;
    const cardClass = cx('card card-sm');
    const cardContainerClass = cx('card-sm-container');

    let imageSrc = null;
    if (props.imageSrc && props.imageSrc.length) {
      imageSrc = props.imageSrc[0];
    } else {
      imageSrc = 'http://boomstatic.com/img/comingsoon-lg.jpg';
    }

    return (
      <div className={cardClass}>
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
        <div className={cardContainerClass}>
          {this._renderLocationPriceInfo()}
        </div>
        {this._renderStats()}
        {props.children}
      </div>
    );
  }
});
