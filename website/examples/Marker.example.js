var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <h4>Default Marker</h4>
        <Marker label='marker'/>&nbsp;
        <Marker label='marker' type='primary'/>&nbsp;
        <Marker label='marker' type='attention'/>&nbsp;
        <Marker label='marker' type='success'/>&nbsp;
        <Marker label='marker' type='info'/>&nbsp;
        <Marker label='marker' type='warning'/>&nbsp;
        <Marker label='marker' type='danger'/>&nbsp;
        <Marker label='marker' type='dark'/>
        <h4>Contextual Marker</h4>
        <Marker label='Mark Funk' type='name'/>&nbsp;
        <Marker label='29464' type='zip'/>
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);