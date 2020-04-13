'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BombScreen = function (_wepy$component) {
    _inherits(BombScreen, _wepy$component);

    function BombScreen() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, BombScreen);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BombScreen.__proto__ || Object.getPrototypeOf(BombScreen)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            isShow: {
                default: false
            }
        }, _this.methods = {
            close: function close() {
                this.isShow = false;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BombScreen, [{
        key: 'showPopScreen',
        value: function showPopScreen() {
            this.isShow = true;
            this.$apply();
        }
    }]);

    return BombScreen;
}(_wepy2.default.component);

exports.default = BombScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvbWJzY3JlZW4uanMiXSwibmFtZXMiOlsiQm9tYlNjcmVlbiIsInByb3BzIiwiaXNTaG93IiwiZGVmYXVsdCIsIm1ldGhvZHMiLCJjbG9zZSIsIiRhcHBseSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7Ozs7Ozs7OztJQUNxQkEsVTs7Ozs7Ozs7Ozs7Ozs7a01BQ2pCQyxLLEdBQVE7QUFDSkMsb0JBQU87QUFDSEMseUJBQVM7QUFETjtBQURILFMsUUFLUkMsTyxHQUFVO0FBQ05DLGlCQURNLG1CQUNFO0FBQ0oscUJBQUtILE1BQUwsR0FBYyxLQUFkO0FBQ0g7QUFISyxTOzs7Ozt3Q0FNTTtBQUNaLGlCQUFLQSxNQUFMLEdBQWMsSUFBZDtBQUNBLGlCQUFLSSxNQUFMO0FBQ0g7Ozs7RUFmbUMsZUFBS0MsUzs7a0JBQXhCUCxVIiwiZmlsZSI6ImJvbWJzY3JlZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9tYlNjcmVlbiBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgICAgICBwcm9wcyA9IHtcclxuICAgICAgICAgICAgaXNTaG93OntcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAgICAgY2xvc2UoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzaG93UG9wU2NyZWVuKCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiJdfQ==