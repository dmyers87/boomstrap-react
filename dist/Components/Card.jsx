"use strict";

var React = require("react/addons");
var cx = require("classnames");
var ImageWithFallback = require("./ImageWithFallback");
var Sash = require("./Sash.jsx");
var Icon = require("./Icon.jsx");
var Button = require("react-bootstrap").Button;

module.exports = React.createClass({
  displayName: "Card",

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
    })
  },

  _renderSash: function _renderSash() {
    var props = this.props;
    if (props.sash) {
      return React.createElement(Sash, { type: props.sash.type, reducedAmount: props.sash.reducedAmount, reducedPercent: props.sash.reducedPercent, timeStamp: props.sash.timeStamp });
    }
  },

  _renderLocationPriceInfo: function _renderLocationPriceInfo() {
    var props = this.props;

    var listingLink = React.createElement(
      "p",
      { className: "card-priority card-street" },
      React.createElement(
        "a",
        { target: "_blank", href: props.listingUrl },
        props.address.street
      )
    );

    return React.createElement(
      "div",
      null,
      React.createElement(
        "p",
        { className: "card-priority card-price" },
        props.listPrice
      ),
      listingLink,
      React.createElement(
        "div",
        { className: "row row-xcondensed" },
        React.createElement(
          "div",
          { className: "col-xs-7" },
          React.createElement(
            "p",
            { className: "small" },
            props.address.city,
            " , ",
            props.address.state
          ),
          React.createElement(
            "p",
            { className: "small" },
            props.address.neighborhood
          )
        ),
        React.createElement(
          "div",
          { className: "col-xs-5 text-right" },
          React.createElement(
            "p",
            { className: "small" },
            props.pricePerSqft,
            "/SQFT"
          )
        )
      )
    );
  },

  _renderStats: function _renderStats() {
    var props = this.props;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "card-stats" },
        React.createElement(
          "span",
          { className: "card-stat" },
          props.beds,
          " BEDS"
        ),
        React.createElement(
          "span",
          { className: "card-stat" },
          props.baths,
          " BATHS"
        ),
        React.createElement(
          "span",
          { className: "card-stat" },
          props.sqft,
          " SQFT"
        ),
        React.createElement(
          "span",
          { className: "card-stat" },
          props.acres,
          " ACRES"
        )
      )
    );
  },

  render: function render() {
    var cardClass = cx("card");

    var imageSrc = null;
    if (this.props.imageSrc && this.props.imageSrc.length) {
      imageSrc = this.props.imageSrc[0];
    } else {
      imageSrc = "http://boomstatic.com/img/comingsoon-lg.jpg";
    }

    return React.createElement(
      "div",
      { className: "card" },
      React.createElement(
        "div",
        { className: "card-photo" },
        React.createElement(
          "div",
          { className: "card-photo-inner" },
          this._renderSash(),
          React.createElement(ImageWithFallback, {
            className: "card-img",
            alt: this.props.fullAddress,
            src: imageSrc,
            fallbackSrc: "//boomstatic.com/img/comingsoon-lg.jpg" })
        )
      ),
      React.createElement(
        "div",
        { className: "card-container card-intro" },
        this._renderLocationPriceInfo()
      ),
      this._renderStats(),
      this.props.children
    );
  }
});
/*
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
*/