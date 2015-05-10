const React    = require('react/addons');
const { Link } = require('react-router');

require('../less/SplashPage.less');

module.exports = React.createClass({
  displayName: 'Splash Page',

  propTypes: {
    version: React.PropTypes.string
  },

  render() {

    return (
      <div className='SplashPage'>
        <img className='SplashPage__logo' src='react-boomstrap.svg'/>
        <div className='SplashPage__overlay'>
          <span className='SplashPage__title'>Boomstrap React</span>
          <span className='SplashPage__version'>{this.props.version}</span>
          <div className='SplashPage__nav'>
            <Link to='/docs'>Docs</Link>
            <a href='https://github.com/BoomTownROI/boomstrap-react'>GitHub</a>
          </div>
        </div>
      </div>
    );
  }
});
