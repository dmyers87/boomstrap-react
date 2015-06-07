var ComponentExample = React.createClass({
  render() {
    let list = [
      {text: 'One', payload: 1},
      {text: 'Two', payload: 2},
      {text: 'Three', payload: 3},
      {text: 'Four', payload: 4}
    ];

    return (
      <div>
        <h4>UISelect</h4>
        <UISelect buttonClass='btn-success' items={list} text={this.state.text} onChange={this.onChange} />
        <br />
        <UISelect buttonClass='btn-danger' items={list} text={this.state.text} onChange={this.onChange} />
        <br />
        <UISelect disabled buttonClass='btn-primary' text='Disabled state' />
        <br />
        <UISelect
          items={list}
          text={this.state.textInfo}
          placeholder='Placeholder text'
          onChange={this.onChange} />
        {/* For examples page usability. Prevents a need of scrolling. */}
        <div style={{'marginBottom': 100}} />
      </div>
    );
  },

  getInitialState() {
    return ({
      text: 'Choose your favorite number'
    });
  },

  onChange(selection) {
    let { text, payload } = selection;

    this.setState({
      text: `You chose ${text}; which has a payload of ${payload}`,
      textInfo: `Text for placeholder example. ${text} - ${payload}`
    });
  }
});

React.render(<ComponentExample />, mountNode)
