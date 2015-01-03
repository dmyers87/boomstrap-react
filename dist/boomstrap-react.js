!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.BoomstrapReact=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";module.exports={Components:require("./Components/App.js"),Mixins:require("./Mixins/App.js")};
//# sourceMappingURL=out.js.map

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
"use strict";module.exports={Fauxbox:require("./Fauxbox.jsx"),ImageWithFallback:require("./ImageWithFallback.jsx"),UISelect:require("./UISelect.jsx")};
//# sourceMappingURL=out.js.map

},{"./Fauxbox.jsx":4,"./ImageWithFallback.jsx":5,"./UISelect.jsx":6}],4:[function(require,module,exports){
"use strict";var React=require("react/addons"),cx=React.addons.classSet;module.exports=React.createClass({displayName:"Fauxbox",propTypes:{id:React.PropTypes.string.isRequired,className:React.PropTypes.string,labelClass:React.PropTypes.string,checked:React.PropTypes.bool.isRequired,onClick:React.PropTypes.func,inline:React.PropTypes.bool,label:React.PropTypes.node},render:function(){var e={fauxbox:!0,"fauxbox-inline":!!this.props.inline};this.props.className&&(e[this.props.className]=!0);var s=cx(e),a=this.props.labelClass||"";return React.createElement("div",{className:s},React.createElement("input",{type:"checkbox",id:this.props.id,checked:this.props.checked,readOnly:!0,onClick:this.props.onClick}),React.createElement("label",{className:a,htmlFor:this.props.id},this.props.label))}});
//# sourceMappingURL=out.js.map

},{"react/addons":undefined}],5:[function(require,module,exports){
"use strict";var React=require("react/addons"),_=require("lodash");module.exports=React.createClass({displayName:"Image with Fallback",propTypes:{src:React.PropTypes.string.isRequired,fallbackSrc:React.PropTypes.string.isRequired},getInitialState:function(){return{src:null}},_onError:function(){this.state.src||this.setState({src:this.props.fallbackSrc})},render:function(){var r=_.extend({},this.props);delete r.fallbackSrc,delete r.src;var e=this.state.src||this.props.src;return React.createElement("img",React.__spread({src:e},r,{onError:this._onError}))}});
//# sourceMappingURL=out.js.map

},{"lodash":undefined,"react/addons":undefined}],6:[function(require,module,exports){
"use strict";var React=require("react/addons"),cx=React.addons.classSet;module.exports=React.createClass({displayName:"UISelect",propTypes:{value:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.number]),valueTranslation:React.PropTypes.string,placeholder:React.PropTypes.string,items:React.PropTypes.arrayOf(React.PropTypes.shape({value:React.PropTypes.any,valueTranslation:React.PropTypes.any})),buttonClass:React.PropTypes.string,inputClass:React.PropTypes.string,onChange:React.PropTypes.func,disabled:React.PropTypes.bool},getDefaultProps:function(){return{disabled:!1}},getInitialState:function(){return{open:!1,activeIndex:0}},activate:function(){var e=this;this.props.disabled||this.setState({open:!0},function(){e.refs.searchInput.getDOMNode().focus()})},updateSearch:function(e){this.setState({search:e.target.value||"",activeIndex:0})},setActiveItem:function(e){this.setState({activeIndex:e})},getFilteredItems:function(){var e=this;return this.props.items.filter(function(t){return!e.state.search||-1!==t.valueTranslation.indexOf(e.state.search)})},select:function(e){var t=this,a=this.getFilteredItems()[e];this.setState({search:"",open:!1,activeIndex:0,allowBlurEvent:!0},function(){t.props.onChange(a)})},onKeyDown:function(e){var t,a;"Enter"===e.key?(e.preventDefault(),this.select(this.state.activeIndex)):(t=this.getFilteredItems().length-1,a=this.state.activeIndex,"ArrowDown"===e.key?t>a&&(e.preventDefault(),this.setActiveItem(a+1)):"ArrowUp"===e.key&&a>0&&(e.preventDefault(),this.setActiveItem(a-1)))},allowBlurEvent:function(){this.setState({allowBlurEvent:!0})},preventBlurEvent:function(){this.setState({allowBlurEvent:!1})},onBlur:function(){this.state.allowBlurEvent&&this.setState({open:!1})},render:function(){var e,t,a=this,s=cx({"ui-select-bootstrap dropdown":!0,open:this.state.open}),n=!this.props.valueTranslation;this.state.open?(t="form-control ui-select-search "+(this.props.inputClass||""),e=React.createElement("input",{type:"text",autoComplete:"off",tabIndex:"-1",ref:"searchInput",className:t,placeholder:this.props.placeholder,value:this.state.search,onBlur:this.onBlur,onChange:this.updateSearch,onKeyDown:this.onKeyDown})):(t="btn btn-default form-control ui-select-match "+(this.props.buttonClass||""),e=React.createElement("button",{type:"button",tabIndex:"-1",className:t,disabled:this.props.disabled,onClick:this.activate,placeholder:this.props.placeholder},n?React.createElement("span",{className:"text-muted"},this.props.placeholder):React.createElement("span",null,React.createElement("span",null,this.props.valueTranslation)),React.createElement("span",{className:"caret"})));var r=this.getFilteredItems().map(function(e,t){var s=cx({"ui-select-choices-row":!0,active:a.state.activeIndex===t});return React.createElement("li",{className:"ui-select-choices-group",key:t},React.createElement("div",{className:s,onMouseEnter:a.setActiveItem.bind(a,t),onClick:a.select.bind(a,t)},React.createElement("a",{href:"javascript:void(0)",className:"ui-select-choices-row-inner"},React.createElement("div",null,e.valueTranslation))))});return React.createElement("div",{className:s},e,this.state.open&&r.length?React.createElement("ul",{className:"ui-select-choices ui-select-choices-content dropdown-menu",onMouseEnter:this.preventBlurEvent,onMouseLeave:this.allowBlurEvent,role:"menu","aria-labelledby":"dLabel"},r):null)}});
//# sourceMappingURL=out.js.map

},{"react/addons":undefined}],7:[function(require,module,exports){
"use strict";module.exports={DocumentClickMixin:require("./DocumentClickMixin.jsx")};
//# sourceMappingURL=out.js.map

},{"./DocumentClickMixin.jsx":8}],8:[function(require,module,exports){
"use strict";function isNodeInRoot(n,e){for(;n;){if(n===e)return!0;n=n.parentNode}return!1}var EventListener=require("react-bootstrap/utils/EventListener"),DocumentClickMixin={handleDocumentKeyUp:function(n){27===n.keyCode&&(this.onDocumentClick?this.onDocumentClick():console&&console.warn&&console.warn("Please provide the function `onDocumentClick` to your Component"))},handleDocumentClick:function(n){isNodeInRoot(n.target,this.getDOMNode())||(this.onDocumentClick?this.onDocumentClick():console&&console.warn&&console.warn("Please provide the function `onDocumentClick` to your Component"))},bindRootCloseHandlers:function(){this._onDocumentClickListener=EventListener.listen(document,"click",this.handleDocumentClick),this._onDocumentKeyupListener=EventListener.listen(document,"keyup",this.handleDocumentKeyUp)},unbindRootCloseHandlers:function(){this._onDocumentClickListener&&this._onDocumentClickListener.remove(),this._onDocumentKeyupListener&&this._onDocumentKeyupListener.remove()},componentDidMount:function(){this.bindRootCloseHandlers()},componentWillUnmount:function(){this.unbindRootCloseHandlers()}};module.exports=DocumentClickMixin;
//# sourceMappingURL=out.js.map

},{"react-bootstrap/utils/EventListener":2}]},{},[1])(1)
});