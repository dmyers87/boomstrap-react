var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Callout</h4>
        <Callout>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit vel felis vehicula gravida.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit vel felis vehicula gravida.</p>
        </Callout>
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
React.render(<ComponentExample/>, mountNode);