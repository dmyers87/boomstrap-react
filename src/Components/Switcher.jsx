'use strict';

var React = require('react/addons');
var cx    = React.addons.classSet;

module.exports = React.createClass({
  displayName: 'Switcher',

  propTypes: {
    id:         React.PropTypes.string.isRequired,
    className:  React.PropTypes.string,
    checked:    React.PropTypes.bool.isRequired,
    onClick:    React.PropTypes.func
  },

  render: function() {
    var switcherClasses = {
      'switcher': true,
    };
    if (this.props.className) {
      switcherClasses[this.props.className] = true;
    }

    var switcherClass = cx(switcherClasses);

    return (
      <div className={switcherClass}>
        <input type='checkbox'
          className='switcher__input'
          id={this.props.id}
          checked={this.props.checked}
          readOnly={true}
          onClick={this.props.onClick} />
        <label className='switcher__label' htmlFor={this.props.id}>
          <div className='switcher__inner'>
            <div className='switcher__on'>
              <i className='ficon ficon-checkmark'/>
            </div>
            <div className='switcher__off'>
              <i className='ficon ficon-cross'/>
            </div>
          </div>
        </label>
      </div>
    );
  }
});
