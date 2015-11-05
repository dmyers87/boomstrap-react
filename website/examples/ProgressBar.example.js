var ComponentExample = React.createClass({
  render() {
    return (
      <div>
        <ProgressBar progress={60}/>&nbsp;
        <ProgressBar progress={80} type='success-to-danger'/>&nbsp;
        <ProgressBar progress={40} type='attention' showLabel={true}/>&nbsp;
        <ProgressBar progress={30} type='info' size='xs'/>&nbsp;
        <ProgressBar progress={40} type='danger' size='sm'/>&nbsp;
        <ProgressBar progress={50} type='success' showLabel={true}/>&nbsp;
        <ProgressBar progress={60} type='warning' size='lg'/>&nbsp;
      </div>
    );
  }
});
ReactDOM.render(<ComponentExample />, mountNode);
