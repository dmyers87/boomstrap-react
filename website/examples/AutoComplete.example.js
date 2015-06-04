// http://api.randomuser.me/?results=30

const ComponentExample = React.createClass({
  getInitialState() {
    return {
      items: [{ name: 'Mark Funk' }],
      loaded: true
    };
  },

  componentWillMount() {
    request.get('http://api.randomuser.me/')
      .query({ results: 30 })
      .end((err, data) => {
        if (err) {
          return err;
        }

        if (data && data.body && data.body.results) {
          this.setState({
            items: data.body.results.map(({ user }) => {
              const userName = `${user.name.first} ${user.name.last}`;
              return {
                name: userName
              };
            })
          });
        }
      });
  },

  selectItem(item) {
    alert(item);
  },

  render() {
    if (!this.state.loaded) {
      return <div />;
    }

    return (
      <AutoComplete
        getItemValue={(item) => item.name}
        inputClass='input-sm'
        items={this.state.items}
        menuStyle={{}}
        renderItem={(item, highlighted) => {
          return (
            <li tabIndex={0} key={item.name} className={highlighted ? 'active' : ''}>
              <a
                href='#'
                onClick={() => this.selectItem(item)}>
                {item.name}
              </a>
            </li>
          );
        }}
        renderMenu={(items /*, value */) => {
          return <ul className='dropdown-menu' style={{display: 'block'}}>{items}</ul>;
        }}
      />
    );
  }
});

React.render(<ComponentExample/>, mountNode);