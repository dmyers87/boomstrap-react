const React = require('react/addons');

module.exports = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    info: React.PropTypes.shape({
      description: React.PropTypes.string,
      props: React.PropTypes.object
    })
  },

  renderRows() {
    return Object.keys(this.props.info.props).sort((propA, propB) => {
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
  },

  render() {
    const divStyle = {
      'boxShadow': '0px 2px  5px  0 rgba(0, 0, 0, 0.26)',
      'padding': 10,
      'marginTop': 20,
      'marginBottom': 20
    };

    return (
      <div style={divStyle} id={this.props.name}>
        <h1>{this.props.name}</h1>
        <h3>Description</h3>
        <p>{this.props.info.description}</p>
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
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
});