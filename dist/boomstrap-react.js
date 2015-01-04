!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.BoomstrapReact=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = {
  Components: require("./Components/App.js"),
  Mixins: require("./Mixins/App.js")
};

},{"./Components/App.js":3,"./Mixins/App.js":7}],2:[function(require,module,exports){
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
"use strict";

module.exports = {
  Fauxbox: require("./Fauxbox.jsx"),
  ImageWithFallback: require("./ImageWithFallback.jsx"),
  UISelect: require("./UISelect.jsx")
};

},{"./Fauxbox.jsx":4,"./ImageWithFallback.jsx":5,"./UISelect.jsx":6}],4:[function(require,module,exports){
"use strict";

var React = require("react/addons");
var cx = React.addons.classSet;

module.exports = React.createClass({
  displayName: "Fauxbox",

  propTypes: {
    id: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    labelClass: React.PropTypes.string,
    checked: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func,
    inline: React.PropTypes.bool,
    label: React.PropTypes.node
  },

  render: function () {
    var fauxboxClasses = {
      fauxbox: true,
      "fauxbox-inline": !!this.props.inline
    };
    if (this.props.className) {
      fauxboxClasses[this.props.className] = true;
    }

    var fauxboxClass = cx(fauxboxClasses);
    var labelClass = this.props.labelClass || "";

    return React.createElement("div", {
      className: fauxboxClass
    }, React.createElement("input", {
      type: "checkbox",
      id: this.props.id,
      checked: this.props.checked,
      readOnly: true,
      onClick: this.props.onClick
    }), React.createElement("label", {
      className: labelClass,
      htmlFor: this.props.id
    }, this.props.label));
  }
});

},{"react/addons":undefined}],5:[function(require,module,exports){
"use strict";

var React = require("react/addons");
var _ = require("lodash");

module.exports = React.createClass({
  displayName: "Image with Fallback",

  propTypes: {
    src: React.PropTypes.string.isRequired,
    fallbackSrc: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      src: null
    };
  },

  _onError: function () {
    if (!this.state.src) {
      this.setState({
        src: this.props.fallbackSrc
      });
    }
  },

  render: function () {
    var props = _.extend({}, this.props);
    delete props.fallbackSrc;
    delete props.src;

    var src = this.state.src || this.props.src;

    return React.createElement("img", React.__spread({
      src: src
    }, props, {
      onError: this._onError
    }));
  }
});

},{"lodash":undefined,"react/addons":undefined}],6:[function(require,module,exports){
"use strict";

var React = require("react/addons");
var cx = React.addons.classSet;

module.exports = React.createClass({
  displayName: "UISelect",

  propTypes: {
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    valueTranslation: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      value: React.PropTypes.any,
      valueTranslation: React.PropTypes.any
    })),
    buttonClass: React.PropTypes.string,
    inputClass: React.PropTypes.string,
    onChange: React.PropTypes.func,
    disabled: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      disabled: false
    };
  },

  getInitialState: function () {
    return {
      open: false,
      activeIndex: 0
    };
  },

  activate: function () {
    var _this = this;
    if (!this.props.disabled) {
      this.setState({
        open: true
      }, function () {
        _this.refs.searchInput.getDOMNode().focus();
      });
    }
  },

  updateSearch: function (e) {
    this.setState({
      search: e.target.value || "",
      activeIndex: 0
    });
  },

  setActiveItem: function (index) {
    this.setState({
      activeIndex: index
    });
  },

  getFilteredItems: function () {
    var _this2 = this;
    return this.props.items.filter(function (item) {
      return !_this2.state.search || item.valueTranslation.indexOf(_this2.state.search) !== -1;
    });
  },

  select: function (index) {
    var _this3 = this;
    var selectedItem = this.getFilteredItems()[index];
    this.setState({
      search: "",
      open: false,
      activeIndex: 0,
      allowBlurEvent: true
    }, function () {
      _this3.props.onChange(selectedItem);
    });
  },

  onKeyDown: function (e) {
    var filteredItemMaxIndex, activeIndex;

    if (e.key === "Enter") {
      e.preventDefault();
      this.select(this.state.activeIndex);
    } else {
      filteredItemMaxIndex = this.getFilteredItems().length - 1;
      activeIndex = this.state.activeIndex;

      if (e.key === "ArrowDown") {
        if (activeIndex < filteredItemMaxIndex) {
          e.preventDefault();
          this.setActiveItem(activeIndex + 1);
        }
      } else if (e.key === "ArrowUp" && activeIndex > 0) {
        e.preventDefault();
        this.setActiveItem(activeIndex - 1);
      }
    }
  },

  allowBlurEvent: function () {
    this.setState({
      allowBlurEvent: true
    });
  },

  preventBlurEvent: function () {
    this.setState({
      allowBlurEvent: false
    });
  },

  onBlur: function () {
    if (this.state.allowBlurEvent) {
      this.setState({
        open: false
      });
    }
  },

  render: function () {
    var _this4 = this;
    var containerClass = cx({
      "ui-select-bootstrap dropdown": true,
      open: this.state.open
    });

    var showElement, elementClass;
    var isEmpty = !this.props.valueTranslation;

    if (!this.state.open) {
      elementClass = "btn btn-default form-control ui-select-match " + (this.props.buttonClass || "");
      showElement = React.createElement("button", {
        type: "button",
        tabIndex: "-1",
        className: elementClass,
        disabled: this.props.disabled,
        onClick: this.activate,
        placeholder: this.props.placeholder
      }, isEmpty ? React.createElement("span", {
        className: "text-muted"
      }, this.props.placeholder) : React.createElement("span", null, React.createElement("span", null, this.props.valueTranslation)), React.createElement("span", {
        className: "caret"
      }));
    } else {
      elementClass = "form-control ui-select-search " + (this.props.inputClass || "");
      showElement = React.createElement("input", {
        type: "text",
        autoComplete: "off",
        tabIndex: "-1",
        ref: "searchInput",
        className: elementClass,
        placeholder: this.props.placeholder,
        value: this.state.search,
        onBlur: this.onBlur,
        onChange: this.updateSearch,
        onKeyDown: this.onKeyDown
      });
    }

    var dropdownElements = this.getFilteredItems().map(function (item, index) {
      var rowClass = cx({
        "ui-select-choices-row": true,
        active: _this4.state.activeIndex === index
      });

      return React.createElement("li", {
        className: "ui-select-choices-group",
        key: index
      }, React.createElement("div", {
        className: rowClass,
        onMouseEnter: _this4.setActiveItem.bind(_this4, index),
        onClick: _this4.select.bind(_this4, index)
      }, React.createElement("a", {
        href: "javascript:void(0)",
        className: "ui-select-choices-row-inner"
      }, React.createElement("div", null, item.valueTranslation))));
    });

    return React.createElement("div", {
      className: containerClass
    }, showElement, this.state.open && dropdownElements.length ? React.createElement("ul", {
      className: "ui-select-choices ui-select-choices-content dropdown-menu",
      onMouseEnter: this.preventBlurEvent,
      onMouseLeave: this.allowBlurEvent,
      role: "menu",
      "aria-labelledby": "dLabel"
    }, dropdownElements) : null);
  }
});

},{"react/addons":undefined}],7:[function(require,module,exports){
"use strict";

module.exports = {
  DocumentClickMixin: require("./DocumentClickMixin.jsx")
};

},{"./DocumentClickMixin.jsx":8}],8:[function(require,module,exports){
"use strict";

// Code used from DropdownStateMixin from react-bootstrap
// https://github.com/react-bootstrap/react-bootstrap/blob/master/src/DropdownStateMixin.js

var EventListener = require("react-bootstrap/utils/EventListener");

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
        console.warn("Please provide the function `onDocumentClick` to your Component");
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
      console.warn("Please provide the function `onDocumentClick` to your Component");
    }
  },

  bindRootCloseHandlers: function () {
    this._onDocumentClickListener = EventListener.listen(document, "click", this.handleDocumentClick);
    this._onDocumentKeyupListener = EventListener.listen(document, "keyup", this.handleDocumentKeyUp);
  },

  unbindRootCloseHandlers: function () {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
    }
  },

  componentDidMount: function () {
    this.bindRootCloseHandlers();
  },

  componentWillUnmount: function () {
    this.unbindRootCloseHandlers();
  }
};

module.exports = DocumentClickMixin;

},{"react-bootstrap/utils/EventListener":2}]},{},[1])(1)
});