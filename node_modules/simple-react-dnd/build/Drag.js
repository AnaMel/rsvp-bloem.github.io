'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (options) {
  return function dragAndDropWrapper(WrappedComponent) {
    var Drag = function (_Component) {
      _inherits(Drag, _Component);

      function Drag() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Drag);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Drag.__proto__ || Object.getPrototypeOf(Drag)).call.apply(_ref, [this].concat(args))), _this), _this.handleDragStart = function (e) {
          var dragDropManager = _this.context.dragDropManager;

          dragDropManager.setActive(_this.props);

          if (e.dataTransfer !== undefined) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.dropEffect = 'move';
            e.dataTransfer.setData('text', 'drag'); // firefox fix
          }

          if (options.onDragStart) {
            options.onDragStart(dragDropManager.active);
          }
        }, _this.handleDragEnd = function (e) {
          e.preventDefault();

          var dragDropManager = _this.context.dragDropManager;

          if (options.onDragOver) {
            options.onDragEnd(dragDropManager.active);
          }
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(Drag, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          this.subscriptionID = this.context.dragDropManager.subscribe(function () {
            return _this2.forceUpdate();
          });

          this.node = (0, _reactDom.findDOMNode)(this);
          this.node.setAttribute('draggable', true);

          this.node.addEventListener('dragstart', this.handleDragStart);
          this.node.addEventListener('dragend', this.handleDragEnd);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.node.removeEventListener('dragstart', this.handleDragStart);
          this.node.removeEventListener('dragend', this.handleDragEnd);

          this.context.dragDropManager.unsubscribe(this.subscriptionID);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return Drag;
    }(_react.Component);

    Drag.contextTypes = {
      dragDropManager: _propTypes2.default.object
    };


    return Drag;
  };
};