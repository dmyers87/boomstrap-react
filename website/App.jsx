const React = require('react/addons');
const _     = require('lodash');

const Sidebar       = require('./Sidebar.jsx');
const Body          = require('./Body.jsx');
const GeneratedDoc  = require('./GeneratedDoc.jsx');
const Header        = require('./Header.jsx');

const MessageFace = require('../src/Components/MessageFace.jsx');

// Docs
const request = require('superagent');

const styles = require('./Styles');

const App = React.createClass({
  displayName: 'App',

  getInitialState() {
    return {
      open: false,
      components: {}
    };
  },

  componentWillMount() {
    request.get('docs/docs.json').end((err, data) => {
      if (err) {
        return;
      }

      this.setState({
        components: data.body
      });
    });
  },

  _onToggleSidebar() {
    this.setState({
      open: !this.state.open
    });
  },

  render() {
    const translate = this.state.open ? '200px' : '0px';
    const containerStyle = {
      'width':    '100%',
      'height':   '100%',
      'position': 'relative',
      'webkitTransform': 'translateX(' + translate + ')',
      'transform':       'translateX(' + translate + ')',
      'webkitTransition': '.3s ease all',
      'transition':       '.3s ease all'
    };

    const sideBarComponents = Object.keys(this.state.components).map((component) => {
      const componentParts = component.split('/');
      const componentName = componentParts[componentParts.length - 1].split('.')[0];

      return {
        path: component,
        name: componentName,
        info: this.state.components[component]
      };
    });

    return (
      <div style={containerStyle}>
        <Body>
            <Header />
          <div className='container'>
            <div id='components'>
              {sideBarComponents.map((comp) => {
                if (comp.name === 'MessageFace') {
                  return (
                    <GeneratedDoc name={comp.name} info={comp.info}>
                      <h4>Examples</h4>
                      <MessageFace />&nbsp;
                      <MessageFace placement='left'/>&nbsp;
                      <MessageFace placement='top'/>&nbsp;
                      <MessageFace placement='right'/>&nbsp;
                      <MessageFace placement='bottom'/>
                    </GeneratedDoc>
                  )
                }

                return <GeneratedDoc name={comp.name} info={comp.info} />;
              })}
            </div>
          </div>
        </Body>
      </div>
    );
  }
});

window.addEventListener('load', function() {
  React.render(<App />, document.body);
});
