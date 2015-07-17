'use strict';

var React = require('react/addons');
var cx = require('classnames');

var Orientations = {
  'Vertical': 'vertical',
  'Horizontal': 'horizontal'
};

var getVerticalNavPos = function getVerticalNavPos(child) {
  var top = child.offsetTop;

  var _child$getBoundingClientRect = child.getBoundingClientRect();

  var height = _child$getBoundingClientRect.height;

  top = Math.round(top);
  height = Math.round(height);

  return { top: top, height: height };
};

var getHorizontalNavPos = function getHorizontalNavPos(child) {
  var left = child.offsetLeft;

  var _child$getBoundingClientRect2 = child.getBoundingClientRect();

  var width = _child$getBoundingClientRect2.width;

  left = Math.round(left);
  width = Math.round(width);

  return { left: left, width: width };
};

/**
 * Nav Links Bar provides an animated `tab switcher`-like control
 */
module.exports = React.createClass({
  displayName: 'Nav Links Bar',

  propTypes: {
    /**
     * The current key of the child that should have the bar
     */
    activeKey: React.PropTypes.number,

    /**
     * Optional class for wrapping the list
     */
    navClass: React.PropTypes.string,

    /**
     * Optional class for wrapping the bar that slides
     */
    barClass: React.PropTypes.string,

    /**
     * Direction of the list ('vertical' or 'horizontal'), defaults to 'vertical'
     */
    orientation: React.PropTypes.oneOf(['vertical', 'horizontal']),

    /**
     * Actual Nav Links to render (expected in <li><a /></li> format)
     * This property is provided by React children
     */
    children: React.PropTypes.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      orientation: 'vertical',
      activeKey: null,
      navClass: '',
      barClass: ''
    };
  },

  getInitialState: function getInitialState() {
    return {
      navPositions: {}
    };
  },

  componentDidMount: function componentDidMount() {
    this._fillNavPositions();
  },

  componentDidUpdate: function componentDidUpdate() {
    var childCount = React.Children.count(this.props.children);
    if (childCount && childCount !== this.state.childCount) {
      this._fillNavPositions();
    }
  },

  _fillNavPositions: function _fillNavPositions() {
    var _this = this;

    var navPositions = {};
    var childCount = 0;

    var getNavPos = this.props.orientation === Orientations.Vertical ? getVerticalNavPos : getHorizontalNavPos;

    Object.keys(this.refs).forEach(function (ref, index) {
      if (ref.indexOf('navChild-') !== -1) {
        var child = React.findDOMNode(_this.refs[ref]);
        navPositions[index] = getNavPos(child);
        childCount++;
      }
    });

    this.setState({
      navPositions: navPositions,
      childCount: childCount
    });
  },

  render: function render() {
    var listClass = cx('nav', this.props.navClass, {
      'nav-blocks': this.props.orientation === Orientations.Vertical,
      'nav-links': this.props.orientation === Orientations.Horizontal
    });
    var barClass = cx('nav-links__bar', this.props.barClass);

    var barStyle = {};
    if (this.props.orientation === Orientations.Vertical) {
      var barHeight = 0;
      var barTop = 0;
      if (this.props.activeKey !== null) {
        var activeNav = this.state.navPositions[this.props.activeKey];
        if (activeNav) {
          barTop = activeNav.top;
          barHeight = activeNav.height;
        }
      }
      var transform = 'translateY(' + barTop + 'px)';
      barStyle = {
        transform: transform,
        WebkitTransform: transform,
        msTransform: transform,
        height: '' + barHeight + 'px',
        top: '0'
      };
    } else {
      // Horizontal bar
      var barWidth = 0;
      var barLeft = 0;
      if (this.props.activeKey !== null) {
        var activeNav = this.state.navPositions[this.props.activeKey];
        if (activeNav) {
          barLeft = activeNav.left;
          barWidth = activeNav.width;
        }
      }
      var transform = 'translateX(' + barLeft + 'px)';
      barStyle = {
        transform: transform,
        WebkitTransform: transform,
        msTransform: transform,
        width: '' + barWidth + 'px',
        left: '0',
        bottom: '0'
      };
    }

    return React.createElement(
      'div',
      { style: { position: 'relative' } },
      React.createElement(
        'ul',
        { className: listClass },
        React.Children.map(this.props.children, function (child, index) {
          return React.cloneElement(child, {
            key: index,
            ref: 'navChild-' + index
          });
        }),
        React.createElement('span', { className: barClass, style: barStyle })
      )
    );
  }
});