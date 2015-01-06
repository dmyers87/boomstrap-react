'use strict';

var React = require('react/addons');
var request = require('superagent');
var marked = require('marked');

module.exports = React.createClass({
  propTypes: {
    doc: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      docs: ''
    };
  },

  componentDidMount() {
    request.get(this.props.doc).end((res) => {
      this.setState({
        docs: marked(res.text)
      });
    });
  },

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.state.docs}} />
        <div>
          <h3>In Action</h3>
          {this.props.children}
        </div>
      </div>
    );
  }
});
