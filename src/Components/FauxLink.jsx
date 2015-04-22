/*eslint no-script-url:0 */

'use strict';

const React = require('react/addons');

module.exports = React.createClass({
  displayName: 'Faux Link',

  render() {
    return (
      <a href='javascript:void(0);' {...this.props} />
    );
  }
});
