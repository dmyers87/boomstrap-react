var ComponentExample = React.createClass({
  render() {
    var items = [
      {id: 0, label: 'Alabama', value: 'AL'},
      {id: 1, label: 'Delaware', value: 'DE'},
      {id: 2, label: 'Florida', value: 'FL'},
      {id: 4, label: 'North Carolina', value: 'NC'},
      {id: 5, label: 'South Carolina', value: 'SC'},
    ];

    var selectedValue = 'SC';

    var handleClick = function(value) {
      alert(value);
    };

    return (
      <FauxdioGroup list={items} groupName='states' selectedValue={selectedValue} onClick={handleClick} />
    );
  }
});
React.render(<ComponentExample/>, mountNode);
