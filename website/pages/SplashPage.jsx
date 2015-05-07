const React  = require('react/addons');
const Header = require('../Header.jsx');

require('../less/app.less');

const App = React.createClass({
  displayName: 'App',

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
});

module.exports = App;
