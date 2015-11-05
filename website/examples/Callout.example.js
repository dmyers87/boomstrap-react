var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Callout</h4>
        <Callout>
          <p>Just a default callout without a heading and two paragraphs.</p>
          <p>Just a default callout without a heading and two paragraphs.</p>
        </Callout>
        <Callout heading='Highway to the Danger Zone!' type='danger' />
        <Callout heading='Callout Attention' type='attention'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit vel felis vehicula gravida.
        </Callout>
        <Callout heading='Callout Danger' type='danger'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit vel felis vehicula gravida.
        </Callout>
        <Callout heading='Callout Info' type='info'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit vel felis vehicula gravida.
        </Callout>
        <Callout heading='Callout Success' type='success'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit vel felis vehicula gravida.
        </Callout>
        <Callout heading='Callout Warning' type='warning'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit vel felis vehicula gravida.
        </Callout>
      </div>
    );
  }
});
ReactDOM.render(<ComponentExample/>, mountNode);