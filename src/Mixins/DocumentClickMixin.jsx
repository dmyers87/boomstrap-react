/* eslint no-console:0*/

// Code used from DropdownStateMixin from react-bootstrap
// https://github.com/react-bootstrap/react-bootstrap/blob/master/src/DropdownStateMixin.js

const React = require('react/addons');

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

module.exports = {

  handleDocumentKeyUp: function(e) {
    if (e.keyCode === 27) {
      this.onDocumentClick();
    }
  },

  handleDocumentClick: function(e) {
    // If the click originated from within this component
    // don't do anything.
    if (isNodeInRoot(e.target, React.findDOMNode(this))) {
      return;
    }
    this.onDocumentClick();
  },

  componentDidMount: function() {
    if (this.onDocumentClick) {
      document.addEventListener('click', this.handleDocumentClick, false);
      document.addEventListener('keyup', this.handleDocumentKeyUp, false);
    } else if (console && console.warn) {
      console.warn('Please provide the function `onDocumentClick` to your Component');
    }
  },

  componentWillUnmount: function() {
    if (this.onDocumentClick) {
      document.removeEventListener('click', this.handleDocumentClick, false);
      document.removeEventListener('keyup', this.handleDocumentKeyUp, false);
    } else if (console && console.warn) {
      console.warn('Please provide the function `onDocumentClick` to your Component');
    }
  }
};
