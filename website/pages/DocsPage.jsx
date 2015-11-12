const React = require('react');
const cx    = require('classnames');
const _     = require('lodash');
const { Link } = require('react-router');

const GeneratedDoc = require('../Components/GeneratedDoc.jsx');
const NavLinksBar  = require('../../src/Components/NavLinksBar.jsx');

require('../less/DocsPage.less');

const DocsPage = React.createClass({
  displayName: 'Docs Page',

  propTypes: {
    components: React.PropTypes.array,
    params: React.PropTypes.object,
    version: React.PropTypes.string
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
        doc = <GeneratedDoc name={comp.name} info={comp.info} />;
      }
    }

    return (
      <div className='container-fluid DocsPage'>
        <span className='DocsPage__version'>Version {this.props.version}</span>
        <NavLinksBar navClass='nav-sm DocsPage__nav' activeKey={componentIndex}>
        {
          sideBarComponents.map((comp, index) => {
            const listItemClass = cx({
              'active': index === componentIndex
            });
            return (
              <li className={listItemClass} key={index}>
                <Link to={'/docs/' + comp.name}>{comp.name}</Link>
              </li>
            );
          })
        }
        </NavLinksBar>
        <div id='components' className='DocsPage__components'>
          {doc}
        </div>
      </div>
    );
  }
});

module.exports = DocsPage;