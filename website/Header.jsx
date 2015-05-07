const React = require('react/addons');

require('./less/header.less');

module.exports = React.createClass({
  displayName: 'Header',

  render() {

    return (
      <div className='header'>
        <img className='logo' src='react-boomstrap.svg'/>
        <div className='header-wrapper'>
          <span className='title'>Boomstrap React</span>
        </div>
      </div>
    );
  }
});
