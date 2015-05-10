const React  = require('react/addons');
const Router = require('react-router');
const { RouteHandler, Route } = Router;

const SplashPage = require('./Pages/SplashPage');
const DocsPage   = require('./Pages/DocsPage');

const version = JSON.parse(require('raw!../package.json')).version;
const request = require('superagent');

request.get('docs/docs.json').end((err, data) => {
  if (err) {
    return;
  }

  const componentsBody = data.body;

  const components = Object.keys(componentsBody).map((component) => {
    const componentParts = component.split('/');
    const componentName = componentParts[componentParts.length - 1].split('.')[0];

    return {
      path: component,
      name: componentName,
      info: componentsBody[component]
    };
  });

  const App = React.createClass({
    displayName: 'App',
    render() {
      return (
        <div>
          <RouteHandler version={version} components={components} {...this.props} />
        </div>
      );
    }
  });

  // declare our routes and their hierarchy
  const routes = (
    <Route handler={App}>
      <Route path='/' handler={SplashPage}/>
      <Route path='docs' handler={DocsPage}/>
      <Route path='docs/:componentName' handler={DocsPage}/>
    </Route>
  );

  Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.getElementById('page'));
  });
});

