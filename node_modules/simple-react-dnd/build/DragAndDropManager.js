"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DragAndDropManager = function () {
  function DragAndDropManager() {
    _classCallCheck(this, DragAndDropManager);

    this.active = null;
    this.subscriptions = [];
    this.id = -1;
  }

  _createClass(DragAndDropManager, [{
    key: "setActive",
    value: function setActive(activeProps) {
      this.active = activeProps;
      this.subscriptions.forEach(function (subscription) {
        return subscription.callback();
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      this.id += 1;
      this.subscriptions.push({
        callback: callback,
        id: this.id
      });

      return this.id;
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(id) {
      this.subscriptions = this.subscriptions.filter(function (sub) {
        return sub.id !== id;
      });
    }
  }]);

  return DragAndDropManager;
}();

exports.default = DragAndDropManager;