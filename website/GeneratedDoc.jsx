const React = require('react/addons');

module.exports = React.createClass({
  displayName: 'Generated Doc',

  propTypes: {
    name: React.PropTypes.string,
    info: React.PropTypes.shape({
      description: React.PropTypes.string,
      props: React.PropTypes.object
    })
  },

  renderTable() {
    const props = Object.keys(this.props.info.props);

    if (!props || !props.length) {
      return null;
    }

    let rows = props.sort((propA, propB) => {
      const thisPropA = this.props.info.props[propA];
      const thisPropB = this.props.info.props[propB];
      if (thisPropA.required && !thisPropB.required) {
        return -1;
      }

      if (propA < propB) {
        return -1;
      }

      return 1;
    }).map((prop, index) => {
      const thisProp = this.props.info.props[prop];
      return (
        <tr key={index}>
          <td>{prop}</td>
          <td>{thisProp.required ? <b>Yes</b> : 'No'}</td>
          <td>{thisProp.defaultValue || 'N/A'}</td>
          <td>{thisProp.type.name}</td>
          <td>{thisProp.description}</td>
        </tr>
      );
    });

    return (
      <div>
        <h4>Props</h4>
        <table className='table table-bordered'>
          <thead>
            <th>Name</th>
            <th>Required</th>
            <th>Default Value</th>
            <th>Type</th>
            <th>Description</th>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  },

  render() {
    const divStyle = {
      'padding': 10,
      'paddingTop': 60,
      'marginTop': 20,
      'marginBottom': 20,
      'position': 'relative'
    };

    const headerStyle = {
      'position': 'absolute',
      'top': 10,
      'left': 10,
      fontSize: 24,
      fontWeight: 500
    };

    let description = null;
    if (this.props.info.description) {
      description = (
        <div>
          <p className='lead'>{this.props.info.description}</p>
        </div>
      );
    }

    return (
      <div style={divStyle} id={this.props.name} className='shadow-depth-1'>
        <span style={headerStyle}>{this.props.name}</span>
        {description}
        {this.renderTable()}
        {this.props.children}
      </div>
    );
  }
});