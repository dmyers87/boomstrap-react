/*eslint no-script-url:0 */
const React = require('react/addons');

/**
 * Faux Link allows the user to create text that resembles a link
 *  without worrying about the href accidentally causing a route change.
 * It is intended to be used with actionable text that does not navigate.
 */
module.exports = React.createClass({
  displayName: 'Faux Link',

  render() {
    return (
      <a href='javascript:void(0);' {...this.props} />
    );
  }
});
