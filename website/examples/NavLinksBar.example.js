var ComponentExample = React.createClass({
  getInitialState() {
    return {
      activeKey: null
    };
  },

  updateActiveKey(index) {
    this.setState({
      activeKey: index
    });
  },

  render() {
    const navBlocks = [
      <li><a href='javascript:void(0);' onClick={() => this.updateActiveKey(0)}>Nav Link 0</a></li>,
      <li><a href='javascript:void(0);' onClick={() => this.updateActiveKey(1)}>Nav Link 1</a></li>,
      <li><a href='javascript:void(0);' onClick={() => this.updateActiveKey(2)}>Nav Link 2</a></li>,
      <li><a href='javascript:void(0);' onClick={() => this.updateActiveKey(3)}>Crazy Nav Block 3</a></li>,
      <li><a href='javascript:void(0);' onClick={() => this.updateActiveKey(4)}>Nav Link 4</a></li>
      ];

    const navLinksHorizontal = [
      <li><a href='javascript:void(0);' onClick={() => this.updateActiveKey(0)}>Nav Link 0</a></li>,
      <li><a href='javascript:void(0);' onClick={() => this.updateActiveKey(1)}>Crazy Nav Link 1</a></li>,
      <li><a href='javascript:void(0);' onClick={() => this.updateActiveKey(2)}>Nav Link 2</a></li>,
      <li><a href='javascript:void(0);' onClick={() => this.updateActiveKey(3)}>Nav Link 3</a></li>,
      <li><a href='javascript:void(0);' onClick={() => this.updateActiveKey(4)}>Nav Link 4</a></li>
    ];

    return (
      <div>
        <NavLinksBar orientation='vertical' activeKey={this.state.activeKey}>
          {navBlocks}
        </NavLinksBar>
        <NavLinksBar orientation='horizontal' activeKey={this.state.activeKey}>
          {navLinksHorizontal}
        </NavLinksBar>
      </div>
    );
  }
});
ReactDOM.render(<ComponentExample/>, mountNode);