"use strict";

var React = require("react/addons");
var cx = require("classnames");
var dateHelper = require("../Utilities/dateHelper");
var Button = require("react-bootstrap").Button;

var ImageWithFallback = require("boomstrap-react").Components.ImageWithFallback;

var Icon = require("./Icon.jsx");

module.exports = React.createClass({
  displayName: "Card",

  propTypes: {
    children: React.PropTypes.any,
    isSmall: React.PropTypes.bool,
    newProperty: React.PropTypes.string,
    offMarket: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
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
      city: React.PropTypes.string,
      street: React.PropTypes.string,
      state: React.PropTypes.string,
      neighborhood: React.PropTypes.string
    }),
    listPrice: React.PropTypes.string,
    pricePerSqft: React.PropTypes.string
  },

  _renderSash: function _renderSash() {
    var props = this.props;
    var innerSash = React.createElement("span", null);
    var dateDistance = null;
    var sashClass = {
      sash: true
    };

    if (props.newProperty) {
      sashClass["sash-new"] = true;
      dateDistance = dateHelper.distance(props.newProperty);
      innerSash = React.createElement(
        "span",
        null,
        "New ",
        React.createElement(
          "span",
          { className: "sash-time" },
          dateDistance
        )
      );
    } else if (props.offMarket) {
      sashClass["sash-off"] = true;
      dateDistance = dateHelper.distance(props.offMarket);
      innerSash = React.createElement(
        "span",
        null,
        "Off Market ",
        React.createElement(
          "span",
          { className: "sash-time" },
          dateDistance
        )
      );
    } else if (props.reduced) {
      sashClass["sash-reduced"] = true;
      dateDistance = dateHelper.distance(props.reduced.when);
      innerSash = React.createElement(
        "span",
        null,
        React.createElement(Icon, { icon: "arrow-down" }),
        " ",
        props.reduced.changed,
        " (",
        props.reduced.changePercent,
        ") ",
        React.createElement(
          "span",
          { className: "sash-time" },
          dateDistance
        )
      );
    } else if (props.backOnMarket) {
      sashClass["sash-back"] = true;
      dateDistance = dateHelper.distance(props.backOnMarket);
      innerSash = React.createElement(
        "span",
        null,
        "Back ",
        React.createElement(
          "span",
          null,
          dateDistance
        )
      );
    } else {
      return null;
    }

    return React.createElement(
      "div",
      { className: cx(sashClass) },
      innerSash
    );
  },

  _renderLocationPriceInfo: function _renderLocationPriceInfo() {
    var props = this.props;

    var listingClass = cx({
      "card-sm-priority card-sm-street": props.isSmall,
      "card-priority card-street": !props.isSmall
    });
    var listingLink = React.createElement(
      "p",
      { className: listingClass },
      React.createElement(
        "a",
        { target: "_blank", href: props.listingUrl },
        props.address.street
      )
    );

    var listingMarkup = null;

    if (this.props.isSmall) {
      listingMarkup = React.createElement(
        "div",
        { className: "row row-xcondensed" },
        React.createElement(
          "div",
          { className: "col-xs-8" },
          listingLink,
          React.createElement(
            "p",
            { className: "xsmall" },
            props.address.city,
            " , ",
            props.address.state
          ),
          React.createElement(
            "p",
            { className: "xsmall" },
            props.address.neighborhood
          )
        ),
        React.createElement(
          "div",
          { className: "col-xs-4 text-right" },
          React.createElement(
            "p",
            { className: "card-sm-priority card-sm-price" },
            props.listPrice
          ),
          React.createElement(
            "p",
            { className: "xsmall" },
            props.pricePerSqft,
            "/SQFT"
          )
        )
      );
    } else {
      listingMarkup = React.createElement(
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
    }
    return listingMarkup;
  },

  _renderStats: function _renderStats() {
    var props = this.props;
    var cardStatsClass = cx({
      "card-sm-stats": this.props.isSmall,
      "card-stats": !this.props.isSmall
    });

    var cardStatClass = cx({
      "card-sm-stat": this.props.isSmall,
      "card-stat": !this.props.isSmall
    });

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: cardStatsClass },
        React.createElement(
          "span",
          { className: cardStatClass },
          props.beds,
          " BEDS"
        ),
        React.createElement(
          "span",
          { className: cardStatClass },
          props.baths,
          " BATHS"
        ),
        React.createElement(
          "span",
          { className: cardStatClass },
          props.sqft,
          " SQFT"
        ),
        React.createElement(
          "span",
          { className: cardStatClass },
          props.acres,
          " ACRES"
        )
      ),
      React.createElement(
        "div",
        { className: "card-container" },
        React.createElement(
          "div",
          { className: "row row-xcondensed" },
          React.createElement(
            "div",
            { className: "col-sm-6" },
            React.createElement(
              Button,
              { bsSize: "small", className: "btn-block" },
              React.createElement(Icon, { icon: "star" }),
              " 1220 Best-Fit"
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-6" },
            React.createElement(
              Button,
              { bsSize: "small", className: "btn-block" },
              React.createElement(Icon, { icon: "heart" }),
              " 11 Favs"
            )
          )
        )
      )
    );
  },

  render: function render() {
    var cardClass = cx({
      card: true,
      "card-sm": this.props.isSmall
    });

    var cardContainerClass = cx({
      "card-sm-container": this.props.isSmall,
      "card-container card-intro": !this.props.isSmall
    });

    var imageSrc = null;
    if (this.props.imageSrc && this.props.imageSrc.length) {
      imageSrc = this.props.imageSrc[0];
    } else {
      imageSrc = "http://boomstatic.com/img/comingsoon-lg.jpg";
    }

    return React.createElement(
      "div",
      { className: cardClass },
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
        { className: cardContainerClass },
        this._renderLocationPriceInfo()
      ),
      this._renderStats(),
      this.props.children
    );
  }
});