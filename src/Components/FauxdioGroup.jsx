const React   = require('react');
const Fauxdio = require('./Fauxdio');

/**
 * Link your stylish Fauxdios together with the stylish FauxioGroup
 */
module.exports = React.createClass({
  displayName: 'Fauxdio Group',

  propTypes: {
    /**
     * The list of items
     */
    list: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number
        ]).isRequired,
        label: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.element
        ]),
        value: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.number
        ])
      })
    ).isRequired,
    /**
     * The name of the group
     */
    groupName: React.PropTypes.string.isRequired,
    /**
     * Sets a given item in the list to be (pre)selected
     */
    selectedValue: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    /**
     * A function to run when an item in the list is clicked. The value of the item is passed to the function
     */
    onClick: React.PropTypes.func,
    /**
     * A place for the various props you want to pass to the Fauxdios
     */
    fauxdioProps: React.PropTypes.shape({ ...Fauxdio.propTypes })
  },

  render() {
    const renderList = (item) => {
      return (
        <Fauxdio
          {...this.props.fauxdioProps}
          radioName={this.props.groupName}
          radioID={item.id.toString()}
          value={item.value}
          label={item.label}
          key={item.id}
          checked={item.value === this.props.selectedValue}
          onChange={() => this.props.onClick(item.value)}
        />
      );
    };

    return (
      <div className='form-group'>
        {this.props.list.map(renderList)}
      </div>
    );
  }
});
