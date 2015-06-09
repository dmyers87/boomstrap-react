'use strict';

var React = require('react/addons');
var cx = require('classnames');
var ImageWithFallback = require('./ImageWithFallback');
var Sash = require('./Sash');

var _require = require('react-bootstrap');

var Button = _require.Button;
var Carousel = _require.Carousel;
var CarouselItem = _require.CarouselItem;

module.exports = React.createClass({
  displayName: 'Card',

  propTypes: {
    /**
     * Optionally include additional class name(s).
     */
    className: React.PropTypes.string,
    children: React.PropTypes.any,
    imageSrc: React.PropTypes.array,
    listingUrl: React.PropTypes.string,
    fullAddress: React.PropTypes.string,
    address: React.PropTypes.shape({
      city: React.PropTypes.string,
      street: React.PropTypes.string,
      state: React.PropTypes.string,
      neighborhood: React.PropTypes.string
    }),
    listPrice: React.PropTypes.string,
    pricePerSqft: React.PropTypes.string,
    sash: React.PropTypes.shape({
      type: React.PropTypes.string,
      timeStamp: React.PropTypes.string,
      reducedAmount: React.PropTypes.string,
      reducedPercent: React.PropTypes.string
    }),
    beds: React.PropTypes.string,
    baths: React.PropTypes.string,
    sqft: React.PropTypes.string,
    acres: React.PropTypes.string
  },

  _renderSash: function _renderSash() {
    var props = this.props;
    if (props.sash) {
      return React.createElement(Sash, {
        type: props.sash.type,
        reducedAmount: props.sash.reducedAmount,
        reducedPercent: props.sash.reducedPercent,
        timeStamp: props.sash.timeStamp });
    }
  },

  _renderLocationPriceInfo: function _renderLocationPriceInfo() {
    var props = this.props;

    var listingLink = React.createElement(
      'p',
      { className: 'card-priority card-street' },
      React.createElement(
        'a',
        { target: '_blank', href: props.listingUrl },
        props.address.street
      )
    );

    return React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        { className: 'card-priority card-price' },
        props.listPrice
      ),
      listingLink,
      React.createElement(
        'div',
        { className: 'row row-xcondensed' },
        React.createElement(
          'div',
          { className: 'col-xs-7' },
          React.createElement(
            'p',
            { className: 'small' },
            props.address.city,
            ', ',
            props.address.state
          ),
          React.createElement(
            'p',
            { className: 'small' },
            props.address.neighborhood
          )
        ),
        React.createElement(
          'div',
          { className: 'col-xs-5 text-right' },
          React.createElement(
            'p',
            { className: 'small' },
            props.pricePerSqft,
            '/SQFT'
          )
        )
      )
    );
  },

  _renderStats: function _renderStats() {
    var _props = this.props;
    var beds = _props.beds;
    var baths = _props.baths;
    var sqft = _props.sqft;
    var acres = _props.acres;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'card-stats' },
        React.createElement(
          'span',
          { className: 'card-stat' },
          beds,
          ' BEDS'
        ),
        React.createElement(
          'span',
          { className: 'card-stat' },
          baths,
          ' BATHS'
        ),
        React.createElement(
          'span',
          { className: 'card-stat' },
          sqft,
          ' SQFT'
        ),
        React.createElement(
          'span',
          { className: 'card-stat' },
          acres,
          ' ACRES'
        )
      )
    );
  },

  _renderCarousel: function _renderCarousel() {
    var props = this.props;

    var images = props.imageSrc || [];

    if (!images.length || images.length === 1) {
      var img = images[0] || '//boomstatic.com/img/comingsoon-lg.jpg';
      return React.createElement(ImageWithFallback, {
        className: 'card-img',
        alt: props.fullAddress,
        src: img,
        fallbackSrc: '//boomstatic.com/img/comingsoon-lg.jpg' });
    }

    return React.createElement(
      Carousel,
      null,
      images.map(function (img) {
        return React.createElement(
          CarouselItem,
          null,
          React.createElement(ImageWithFallback, {
            src: img,
            fallbackSrc: '//boomstatic.com/img/comingsoon-lg.jpg' })
        );
      })
    );
  },

  render: function render() {

    var classes = cx('card', this.props.className);

    return React.createElement(
      'div',
      { className: classes },
      React.createElement(
        'div',
        { className: 'card-photo' },
        React.createElement(
          'div',
          { className: 'card-photo-inner' },
          this._renderSash(),
          this._renderCarousel()
        )
      ),
      React.createElement(
        'div',
        { className: 'card-container card-intro' },
        this._renderLocationPriceInfo()
      ),
      this._renderStats(),
      this.props.children
    );
  }
});