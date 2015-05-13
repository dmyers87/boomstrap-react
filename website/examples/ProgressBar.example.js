var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <ProgressBar position={60} />&nbsp;
        <ProgressBar position={80} type='success-to-danger' />&nbsp;
        <ProgressBar position={40} type='attention' showLabel={true} />&nbsp;
        <ProgressBar position={30} type='info' size='xs' />&nbsp;
        <ProgressBar position={40} type='danger' size='sm' />&nbsp;
        <ProgressBar position={50} type='success' showLabel={true} />&nbsp;
        <ProgressBar position={60} type='warning' size='lg' />&nbsp;
      </div>
    );
  }
});
React.render(<ComponentExample/>, mountNode);