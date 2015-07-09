const React      = require('react/addons');
const DocExample = require('./DocExample');

require('../less/GeneratedDoc');

const DocProps = {
  'SHAPE': 'shape',
  'ARRAYOF': 'arrayOf',
  'UNION': 'union',
  'ENUM': 'enum'
};

module.exports = React.createClass({
  displayName: 'Generated Doc',

  propTypes: {
    name: React.PropTypes.string,
    info: React.PropTypes.shape({
      description: React.PropTypes.string,
      props: React.PropTypes.object
    })
  },

  renderPropType(type = {}) {
    let values;
    const name = type.name;
    switch (name) {
      case DocProps.UNION:
        values = type.value.map(this.renderPropType);
        return `${values.join(' or ')}`;

      case DocProps.ARRAYOF:
        const value = this.renderPropType(type.value);
        return `[ ${value} ]`;

      case DocProps.SHAPE:
        values = Object.keys(type.value).map((propName) => {
          const val = this.renderPropType(type.value[propName]);
          return `${propName}: ${val}`;
        });
        return `{ ${values.join(', ')} }`;

      case DocProps.ENUM:
        values = type.value.map((val) => val.value);
        return `Options: [ ${values.join(', ')} ]`;

      default:
        return name;
    }
  },

  renderPropRow(prop, index) {
    const thisProp = this.props.info.props[prop];
    let valueColumn = this.renderPropType(thisProp.type);
    return (
      <tr key={index}>
        <td>{prop}</td>
        <td>{thisProp.required ? <b>Yes</b> : 'No'}</td>
        <td>{thisProp.defaultValue || 'N/A'}</td>
        <td>{valueColumn}</td>
        <td>{thisProp.description}</td>
      </tr>
      );
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
    }).map(this.renderPropRow);

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
    let description = null;
    if (this.props.info.description) {
      description = (
        <div>
          <p className='lead'>{this.props.info.description}</p>
        </div>
      );
    }

    return (
      <div id={this.props.name} className='GeneratedDoc shadow-depth-1'>
        <span className='GeneratedDoc__header'>{this.props.name}</span>
        {description}
        {this.renderTable()}
        <DocExample name={this.props.name} />
      </div>
    );
  }
});
