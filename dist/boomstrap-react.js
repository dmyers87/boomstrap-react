!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.BoomStrapReact=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  Components: require('./Components/App.js'),
  Mixins:     require('./Mixins/App.js')
};

},{"./Components/App.js":3,"./Mixins/App.js":5}],2:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * This file contains a modified version of:
 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/EventListener.js
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * TODO: remove in favour of solution provided by:
 *  https://github.com/facebook/react/issues/285
 */

/**
 * Does not take into account specific nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  }
};

module.exports = EventListener;

},{}],3:[function(require,module,exports){
module.exports = {
  Fauxbox: require('./Fauxbox.jsx')
};

},{"./Fauxbox.jsx":4}],4:[function(require,module,exports){
'use strict';

var React = require('react/addons');
var cx    = React.addons.classSet;

module.exports = React.createClass({
  displayName: 'Fauxbox',

  propTypes: {
    boxID:      React.PropTypes.string,
    boxClass:   React.PropTypes.string,
    labelClass: React.PropTypes.string,
    checked:    React.PropTypes.bool.isRequired,
    onClick:    React.PropTypes.func,
    inline:     React.PropTypes.bool,
    label:      React.PropTypes.node
  },

  render: function() {
    var fauxboxClasses = {
      'fauxbox': true,
      'fauxbox-inline': !!this.props.inline
    };
    if (this.props.boxClass) {
      fauxboxClasses[this.props.boxClass] = true;
    }

    var fauxboxClass = cx(fauxboxClasses);
    var labelClass = this.props.labelClass || '';

    return (
      React.createElement("div", {className: fauxboxClass}, 
      React.createElement("input", {
        type: "checkbox", 
        id: this.props.boxID, 
        checked: this.props.checked, 
        readOnly: true, 
        onClick: this.props.onClick}), 
        React.createElement("label", {className: labelClass, htmlFor: this.props.boxID}, this.props.label)
      )
    );
  }
});

},{"react/addons":undefined}],5:[function(require,module,exports){
module.exports = {
  DocumentClickMixin: require('./DocumentClickMixin.jsx')
};

},{"./DocumentClickMixin.jsx":6}],6:[function(require,module,exports){
'use strict';

// Code used from DropdownStateMixin from react-bootstrap
// https://github.com/react-bootstrap/react-bootstrap/blob/master/src/DropdownStateMixin.js

var EventListener = require('react-bootstrap/utils/EventListener');

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

},{"react-bootstrap/utils/EventListener":2}]},{},[1])(1)
});