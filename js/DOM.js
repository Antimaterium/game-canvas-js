window.$ = (function () {
  'use strict';
  const DOM = function (selector) {
    this.selector = selector || null;
    this.element = null;
  };
  DOM.prototype.init = function () {
    switch (this.selector[0]) {
      case '<':
        let matches = this.selector.match(/<([\w-]*)>/);
        if (matches === null || matches === undefined) {
          throw 'Invalid Selector / Node';
          return false;
        }
        let nodeName = matches[0].replace('<', '').replace('>', '');
        this.element = document.createElement(nodeName);
        break;
      default:
        this.element = document.querySelector(this.selector);
    }
  };

  DOM.prototype.on = function (event, callback) {
    let evt = this.eventHandler.bindEvent(event, callback, this.element);
  };

  DOM.prototype.off = function (event) {
    let evt = this.eventHandler.unbindEvent(event, this.element);
  };

  DOM.prototype.val = function (newVal) {
    return (newVal !== undefined ? this.element.value = newVal : this.element.value);
  };

  DOM.prototype.append = function (html) {
    this.element.innerHTML = this.element.innerHTML + html;
  };

  DOM.prototype.prepend = function (html) {
    this.element.innerHTML = html + this.element.innerHTML;
  };

  DOM.prototype.html = function (html) {
    if (html === undefined) {
      return this.element.innerHTML;
    }
    this.element.innerHTML = html;
  };

  DOM.prototype.eventHandler = {
    events: [],
    bindEvent: function (event, callback, targetElement) {
      this.unbindEvent(event, targetElement);
      targetElement.addEventListener(event, callback, false);
      this.events.push({
        type: event,
        event: callback,
        target: targetElement
      });
    },
    findEvent: function (event) {
      return this.events.filter(function (evt) {
        return (evt.type === event);
      }, event)[0];
    },
    unbindEvent: function (event, targetElement) {
      let foundEvent = this.findEvent(event);
      if (foundEvent !== undefined) {
        targetElement.removeEventListener(event, foundEvent.event, false);
      }
      this.events = this.events.filter(function (evt) {
        return (evt.type !== event);
      }, event);
    }
  };

  const $ = function (selector) {
    let el = new DOM(selector);
    el.init();
    return el;
  }

  return $
})();