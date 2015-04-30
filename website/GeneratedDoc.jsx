const React = require('react/addons');

module.exports = React.createClass({
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
        <h3>Props</h3>
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
    )
  },

  render() {
    const divStyle = {
      'padding': 10,
      'marginTop': 20,
      'marginBottom': 20
    };

    let description = null;
    if (this.props.info.description) {
      description = (
        <div>
          <h3>Description</h3>
          <p>{this.props.info.description}</p>
        </div>
      );
    }

    return (
      <div style={divStyle} id={this.props.name} className='shadow-depth-1'>
        <h1>{this.props.name}</h1>
        {description}
        {this.renderTable()}
        {this.props.children}
      </div>
    );
  }
});