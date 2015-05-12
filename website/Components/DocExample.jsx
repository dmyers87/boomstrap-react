const React = require('react/addons');

const DocTypes = {
  MessageFace: {
    Component: require('../../src/Components/MessageFace.jsx'),
    Example:   require('raw!../examples/MessageFace.example.js')
  },
  NavLinksBar: {
    Component: require('../../src/Components/NavLinksBar.jsx'),
    Example:   require('raw!../examples/NavLinksBar.example.js')
  },
  ProgressBar: {
    Component: require('../../src/Components/ProgressBar.jsx'),
    Example:   require('raw!../examples/ProgressBar.example.js')
  }
}
const Playground  = require('component-playground');

module.exports = React.createClass({
  displayName: 'Doc Example',

  propTypes: {
    name: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      name: ''
    };
  },

  render() {
    const docType = DocTypes[this.props.name]
    if (!docType) {
      return <div />
    }

    const scope = {
      React: React,
      [this.props.name]: docType.Component
    };
    console.log(scope);

    return (
      <div>
        <h4>Try it out!</h4>
        <Playground
          key={this.props.name}
          codeText={docType.Example}
          theme={'neo'}
          scope={scope}/>
      </div>
    )
  }
})