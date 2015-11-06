/* eslint no-console:0*/
import React    from 'react';
import ReactDOM from 'react-dom';

/**
* Checks whether a node is within
* a root nodes tree
*
* @param {DOMElement} node
* @param {DOMElement} root
* @returns {boolean}
*/
function isNodeInRoot(node, root) {
  let cycleNode = node;
  while (cycleNode) {
    if (cycleNode === root) {
      return true;
    }
    cycleNode = cycleNode.parentNode;
  }

  return false;
}

function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }
  return Component.displayName || Component.name || 'Component';
}

export default function createDocumentClickContainer(Component) {
  const displayName = `documentClickContainer(${getDisplayName(Component)})`;

  return React.createClass({
    displayName,

    propTypes: {
      onDocumentClick: React.PropTypes.func
    },

    getDefaultProps() {
      return {
        onDocumentClick: () => {}
      };
    },

    componentDidMount: function() {
      document.addEventListener('click', this.handleDocumentClick, false);
      document.addEventListener('keyup', this.handleDocumentKeyUp, false);
    },

    componentWillUnmount: function() {
      document.removeEventListener('click', this.handleDocumentClick, false);
      document.removeEventListener('keyup', this.handleDocumentKeyUp, false);
    },

    handleDocumentKeyUp: function(e) {
      if (e.keyCode === 27) {
        this.props.onDocumentClick();
      }
    },

    handleDocumentClick: function(e) {
      // If the click originated from within this component
      // don't do anything.
      if (isNodeInRoot(e.target, ReactDOM.findDOMNode(this))) {
        return;
      }
      this.props.onDocumentClick();
    },

    render() {
      return <Component {...this.props} />;
    }
  });
}
