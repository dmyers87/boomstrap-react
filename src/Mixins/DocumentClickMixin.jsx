'use strict';

// Code used from DropdownStateMixin from react-bootstrap
// https://github.com/react-bootstrap/react-bootstrap/blob/master/src/DropdownStateMixin.js

var EventListener = require('react-bootstrap/lib/utils/EventListener');

/**
* Checks whether a node is within
* a root nodes tree
*
* @param {DOMElement} node
* @param {DOMElement} root
* @returns {boolean}
*/
function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

var DocumentClickMixin = {

  handleDocumentKeyUp: function (e) {
    if (e.keyCode === 27) {
      if (this.onDocumentClick) {
        this.onDocumentClick();
      } else if (console && console.warn) {
        console.warn('Please provide the function `onDocumentClick` to your Component');
      }
    }
  },

  handleDocumentClick: function (e) {
    // If the click originated from within this component
    // don't do anything.
    if (isNodeInRoot(e.target, this.getDOMNode())) {
      return;
    }

    if (this.onDocumentClick) {
      this.onDocumentClick();
    } else if (console && console.warn) {
      console.warn('Please provide the function `onDocumentClick` to your Component');
    }
  },

  bindRootCloseHandlers: function () {
    this._onDocumentClickListener =
    EventListener.listen(document, 'click', this.handleDocumentClick);
    this._onDocumentKeyupListener =
    EventListener.listen(document, 'keyup', this.handleDocumentKeyUp);
  },

  unbindRootCloseHandlers: function () {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
    }
  },

  componentDidMount: function() {
    this.bindRootCloseHandlers();
  },

  componentWillUnmount: function () {
    this.unbindRootCloseHandlers();
  }
};

module.exports = DocumentClickMixin;
