const React = require('react/addons');

const Body          = require('./Body.jsx');
const GeneratedDoc  = require('./GeneratedDoc.jsx');
const Header        = require('./Header.jsx');

const MessageFace = require('../src/Components/MessageFace.jsx');
const messageFaceExample = require('raw!./examples/MessageFace.example.js');


const NavLinksBar = require('../src/Components/NavLinksBar');


const Playground = require('component-playground');

// Docs
const request = require('superagent');

require('./less/app.less');

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
      'WebkitTransform': 'translateX(' + translate + ')',
      'transform':       'translateX(' + translate + ')',
      'WebkitTransition': '.3s ease all',
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
      <div>
        <NavLinksBar navClass='nav-sm nav-fixed' activeKey={null}>
          {sideBarComponents.map((comp) => <li><a href={'#' + comp.name}>{comp.name}</a></li>)}
        </NavLinksBar>
        <div style={containerStyle}>
          <Body>
            <Header />
            <div className='container'>
              <div id='components' className='components'>
                {sideBarComponents.map((comp) => {
                  if (comp.name === 'MessageFace') {
                    return (
                      <GeneratedDoc name={comp.name} info={comp.info}>
                        <h4>Try it out!</h4>
                        <Playground
                          codeText={messageFaceExample}
                          theme={'neo'}
                          scope={{React: React, MessageFace: MessageFace}}/>
                      </GeneratedDoc>
                    );
                  }

                  return <GeneratedDoc name={comp.name} info={comp.info} />;
                })}
              </div>
            </div>
          </Body>
        </div>
      </div>
    );
  }
});

window.addEventListener('load', function() {
  React.render(<App />, document.getElementById('page'));
});
