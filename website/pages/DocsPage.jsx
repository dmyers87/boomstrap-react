const React = require('react/addons');
const _     = require('lodash');
const { Link } = require('react-router');

const GeneratedDoc  = require('../GeneratedDoc.jsx');
const MessageFace = require('../../src/Components/MessageFace.jsx');
const messageFaceExample = require('raw!../examples/MessageFace.example.js');
const NavLinksBar = require('../../src/Components/NavLinksBar.jsx');
const navLinksBarExample = require('raw!../examples/NavLinksBar.example.js');

const Playground  = require('component-playground');

require('../less/app.less');

const DocsPage = React.createClass({
  displayName: 'Docs Page',

  propTypes: {
    components: React.PropTypes.array,
    params: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      components: [],
      params: {}
    };
  },

  render() {
    const sideBarComponents = this.props.components;

    const { params: { componentName }} = this.props;

    let doc = null;
    let componentIndex = null;
    if (componentName) {
      componentIndex = _.findIndex(sideBarComponents, (iComp) => iComp.name === componentName);
      if (componentIndex !== -1) {
        const comp = sideBarComponents[componentIndex];
        if (comp.name === 'MessageFace') {
          doc = (
            <GeneratedDoc name={comp.name} info={comp.info}>
              <h4>Try it out!</h4>
              <Playground
                codeText={messageFaceExample}
                theme={'neo'}
                scope={{React: React, MessageFace: MessageFace}}/>
            </GeneratedDoc>
          );
        } else if (comp.name === 'NavLinksBar') {
          doc = (
            <GeneratedDoc name={comp.name} info={comp.info}>
              <h4>Try it out!</h4>
              <Playground
                codeText={navLinksBarExample}
                theme={'neo'}
                scope={{React: React, NavLinksBar: NavLinksBar}}/>
            </GeneratedDoc>
          );
        } else {
          doc = <GeneratedDoc name={comp.name} info={comp.info} />;
        }
      }
    }

    return (
      <div>
        <NavLinksBar navClass='nav-sm nav-fixed' activeKey={componentIndex}>
          {sideBarComponents.map((comp) => <li><Link to={'/docs/' + comp.name}>{comp.name}</Link></li>)}
        </NavLinksBar>
        <div className='container'>
          <div id='components' className='components'>
            {doc}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DocsPage;
