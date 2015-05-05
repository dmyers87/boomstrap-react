const React          = require('react/addons');
const cx             = require('classnames');
const cloneWithProps = React.addons.cloneWithProps;

const Orientations = {
  'Vertical':   'vertical',
  'Horizontal': 'horizontal'
};

const getVerticalNavPos = (child) => {
  const childTop    = child.offsetTop;
  const childHeight = child.getBoundingClientRect().height;

  return {
    top:    childTop,
    height: childHeight
  };
};

const getHorizontalNavPos = (child) => {
  const { left, width } = child.getBoundingClientRect();
  return { left, width };
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
    activeKey:   React.PropTypes.number,

    /**
     * Optional class for wrapping the list
     */
    navClass:    React.PropTypes.string,

    /**
     * Optional class for wrapping the bar that slides
     */
    barClass:    React.PropTypes.string,

    /**
     * Direction of the list ('vertical' or 'horizontal'), defaults to 'vertical'
     */
    orientation: React.PropTypes.oneOf(['vertical', 'horizontal']),

    /**
     * Actual Nav Links to render (expected in <li><a /></li> format)
     * This property is provided by React children
     */
    children:    React.PropTypes.any
  },

  getDefaultProps() {
    return {
      orientation: 'vertical',
      activeKey: null,
      navClass: '',
      barClass: ''
    };
  },

  getInitialState() {
    return {
      navPositions: {}
    };
  },

  componentDidMount() {
    this._fillNavPositions();
  },

  componentDidUpdate() {
    const childCount = React.Children.count(this.props.children);
    if (childCount && childCount !== this.state.childCount) {
      this._fillNavPositions();
    }
  },

  _fillNavPositions() {
    let navPositions = {};
    let childCount   = 0;


    const getNavPos = this.props.orientation === Orientations.Vertical ?
      getVerticalNavPos :
      getHorizontalNavPos;

    Object.keys(this.refs).forEach((ref, index) => {
      if (ref.indexOf('navChild-') !== -1) {
        const child = React.findDOMNode(this.refs[ref]);
        navPositions[index] = getNavPos(child);
        childCount++;
      }
    });
    this.setState({
      navPositions: navPositions,
      childCount:   childCount
    });
  },

  render() {
    const listClass = cx('nav', this.props.navClass, {
      'nav-blocks': this.props.orientation === Orientations.Vertical,
      'nav-links':  this.props.orientation === Orientations.Horizontal
    });
    const barClass = cx('nav-links__bar', this.props.barClass);

    let barStyle = {};
    if (this.props.orientation === Orientations.Vertical) {
      let barHeight = 0;
      let barTop    = 0;
      if (this.props.activeKey !== null) {
        const activeNav = this.state.navPositions[this.props.activeKey];
        if (activeNav) {
          barTop    = activeNav.top;
          barHeight = activeNav.height;
        }
      }
      const transform = `translateY(${barTop}px)`;
      barStyle = {
        transform:       transform,
        WebkitTransform: transform,
        msTransform:     transform,
        height:          `${barHeight}px`,
        width:           '3px',
        top:             '0'
      };
    } else {
      // Horizontal bar
      let barWidth = 0;
      let barLeft  = 0;
      if (this.props.activeKey !== null) {
        const activeNav = this.state.navPositions[this.props.activeKey];
        if (activeNav) {
          barLeft    = activeNav.left;
          barWidth   = activeNav.width;
        }
      }
      const transform = `translateX(${barLeft}px)`;
      barStyle = {
        transform:       transform,
        WebkitTransform: transform,
        msTransform:     transform,
        height:          '3px',
        width:           `${barWidth}px`,
        left:            '0',
        bottom:          '0'
      };
    }

    return (
      <div style={{position: 'relative'}}>
        <ul className={listClass}>
          {React.Children.map(this.props.children, (child, index) => {
            return cloneWithProps(child, {
              key: index,
              ref: 'navChild-' + index
            });
          })}
          <span className={barClass} style={barStyle} />
        </ul>
      </div>
    );
  }
});
