const React  = require('react/addons');
const Header = require('../Header.jsx');

const App = React.createClass({
  displayName: 'App',

  propTypes: {
    version: React.PropTypes.string
  },

  render() {
    return (
      <div>
        <Header version={this.props.version}/>
      </div>
    );
  }
});

module.exports = App;
