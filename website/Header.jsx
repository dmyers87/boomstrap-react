const React = require('react/addons');
const { Link } = require('react-router');

require('./less/header.less');

module.exports = React.createClass({
  displayName: 'Header',

  propTypes: {
    version: React.PropTypes.string
  },

  render() {

    return (
      <div className='header'>
        <img className='logo' src='react-boomstrap.svg'/>
        <div className='header-wrapper'>
          <span className='title'>Boomstrap React</span>
          <span className='version'>{this.props.version}</span>
          <div className='header-nav'>
            <Link to='/docs'>Docs</Link>
            <a href='https://github.com/BoomTownROI/boomstrap-react'>GitHub</a>
          </div>
        </div>
      </div>
    );
  }
});
