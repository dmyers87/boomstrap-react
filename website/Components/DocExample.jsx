const React = require('react/addons');

const DocTypes = {
  AutoComplete: {
    Component: require('../../src/Components/AutoComplete.jsx'),
    Example:   require('raw!../examples/AutoComplete.example.js')
  },
  Callout: {
    Component: require('../../src/Components/Callout.jsx'),
    Example:   require('raw!../examples/Callout.example.js')
  },
  Fauxbox: {
    Component: require('../../src/Components/Fauxbox.jsx'),
    Example:   require('raw!../examples/Fauxbox.example.js')
  },
  Fauxdio: {
    Component: require('../../src/Components/Fauxdio.jsx'),
    Example:   require('raw!../examples/Fauxdio.example.js')
  },
  Icon: {
    Component: require('../../src/Components/Icon.jsx'),
    Example:   require('raw!../examples/Icon.example.js')
  },
  LeadCategory: {
    Component: require('../../src/Components/LeadCategory.jsx'),
    Example:   require('raw!../examples/LeadCategory.example.js')
  },
  Loader: {
    Component: require('../../src/Components/Loader.jsx'),
    Example:   require('raw!../examples/Loader.example.js')
  },
  Marker: {
    Component: require('../../src/Components/Marker.jsx'),
    Example:   require('raw!../examples/Marker.example.js')
  },
  MessageFace: {
    Component: require('../../src/Components/MessageFace.jsx'),
    Example:   require('raw!../examples/MessageFace.example.js')
  },
  NavLinksBar: {
    Component: require('../../src/Components/NavLinksBar.jsx'),
    Example:   require('raw!../examples/NavLinksBar.example.js')
  },
  Pager: {
    Component: require('../../src/Components/Pager.jsx'),
    Example:   require('raw!../examples/Pager.example.js')
  },
  ProgressBar: {
    Component: require('../../src/Components/ProgressBar.jsx'),
    Example:   require('raw!../examples/ProgressBar.example.js')
  },
  Score: {
    Component: require('../../src/Components/Score.jsx'),
    Example:   require('raw!../examples/Score.example.js')
  },
  Switcher: {
    Component: require('../../src/Components/Switcher.jsx'),
    Example:   require('raw!../examples/Switcher.example.js')
  },
  UISelect: {
    Component: require('../../src/Components/UISelect.jsx'),
    Example:   require('raw!../examples/UISelect.example.js')
  },
  Well: {
    Component: require('../../src/Components/Well.jsx'),
    Example:   require('raw!../examples/Well.example.js')
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
