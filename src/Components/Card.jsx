
const React                 = require('react/addons');
const cx                    = require('classnames');
const dateHelper            = require('../Utilities/dateHelper');
const Button                = require('react-bootstrap').Button;
const ImageWithFallback     = require('./ImageWithFallback');
const Icon                  = require('./Icon.jsx');

module.exports = React.createClass({
  displayName: 'Card',

  propTypes: {
    children: React.PropTypes.any,
    isSmall: React.PropTypes.bool,
    newProperty: React.PropTypes.string,
    offMarket: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ]),
    reduced: React.PropTypes.shape({
      changed: React.PropTypes.string,
      changePercent: React.PropTypes.string,
      when: React.PropTypes.string
    }),
    backOnMarket: React.PropTypes.string,
    imageSrc: React.PropTypes.array,
    listingUrl: React.PropTypes.string,
    fullAddress: React.PropTypes.string,
    address: React.PropTypes.shape({
      city:         React.PropTypes.string,
      street:       React.PropTypes.string,
      state:        React.PropTypes.string,
      neighborhood: React.PropTypes.string
    }),
    listPrice: React.PropTypes.string,
    pricePerSqft: React.PropTypes.string
  },

  _renderSash() {
    const props = this.props;
    let innerSash = <span />;
    let dateDistance = null;
    let sashClass = {
      'sash': true
    };

    if (props.newProperty) {
      sashClass['sash-new'] = true;
      dateDistance = dateHelper.distance(props.newProperty);
      innerSash = (
        <span>New <span className='sash-time'>{dateDistance}</span></span>
      );
    } else if (props.offMarket) {
      sashClass['sash-off'] = true;
      dateDistance = dateHelper.distance(props.offMarket);
      innerSash = (
        <span>Off Market <span className='sash-time'>{dateDistance}</span></span>
      );
    } else if (props.reduced) {
      sashClass['sash-reduced'] = true;
      dateDistance = dateHelper.distance(props.reduced.when);
      innerSash = (
        <span>
          <Icon icon='arrow-down' /> {props.reduced.changed} ({ props.reduced.changePercent }) <span className='sash-time'>{dateDistance}</span>
        </span>
      );
    } else if (props.backOnMarket) {
      sashClass['sash-back'] = true;
      dateDistance = dateHelper.distance(props.backOnMarket);
      innerSash = (
        <span>
          Back <span>{dateDistance}</span>
        </span>
      );
    } else {
      return null;
    }

    return (
      <div className={cx(sashClass)}>
        {innerSash}
      </div>
    );
  },

  _renderLocationPriceInfo() {
    const props = this.props;

    const listingClass = cx({
      'card-sm-priority card-sm-street': props.isSmall,
      'card-priority card-street': !props.isSmall
    });
    const listingLink = (
      <p className={listingClass}>
        <a target='_blank' href={props.listingUrl}>{props.address.street}</a>
      </p>
    );

    let listingMarkup = null;

    if (this.props.isSmall) {
      listingMarkup = (
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
        </div>);
    } else {
      listingMarkup = (
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
        </div>);
    }
    return (listingMarkup);

  },

  _renderStats() {
    const props = this.props;
    const cardStatsClass = cx({
      'card-sm-stats': this.props.isSmall,
      'card-stats': !this.props.isSmall
    });

    const cardStatClass = cx({
      'card-sm-stat': this.props.isSmall,
      'card-stat': !this.props.isSmall
    });

    return (
      <div>
        <div className={cardStatsClass}>
          <span className={cardStatClass}>{ props.beds } BEDS</span>
          <span className={cardStatClass}>{ props.baths } BATHS</span>
          <span className={cardStatClass}>{ props.sqft } SQFT</span>
          <span className={cardStatClass}>{ props.acres } ACRES</span>
        </div>
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
      </div>
    );
  },

  render() {
    const cardClass = cx({
      'card': true,
      'card-sm': this.props.isSmall
    });

    const cardContainerClass = cx({
      'card-sm-container': this.props.isSmall,
      'card-container card-intro': !this.props.isSmall
    });

    let imageSrc = null;
    if (this.props.imageSrc && this.props.imageSrc.length) {
      imageSrc = this.props.imageSrc[0];
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
              alt={ this.props.fullAddress }
              src={imageSrc}
              fallbackSrc={'//boomstatic.com/img/comingsoon-lg.jpg'}/>
          </div>
        </div>
        <div className={cardContainerClass}>
          {this._renderLocationPriceInfo()}
        </div>
        {this._renderStats()}
        {this.props.children}
      </div>
    );
  }
});
