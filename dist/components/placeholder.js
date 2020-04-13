'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlaceHolder = function (_wepy$component) {
    _inherits(PlaceHolder, _wepy$component);

    function PlaceHolder() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PlaceHolder);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PlaceHolder.__proto__ || Object.getPrototypeOf(PlaceHolder)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            syncShow: {
                type: Boolean,
                default: false
            },
            message: {
                default: '没有相关信息'
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return PlaceHolder;
}(_wepy2.default.component);

exports.default = PlaceHolder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYWNlaG9sZGVyLmpzIl0sIm5hbWVzIjpbIlBsYWNlSG9sZGVyIiwicHJvcHMiLCJzeW5jU2hvdyIsInR5cGUiLCJCb29sZWFuIiwiZGVmYXVsdCIsIm1lc3NhZ2UiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxXOzs7Ozs7Ozs7Ozs7OztvTUFDakJDLEssR0FBUTtBQUNKQyxzQkFBVTtBQUNQQyxzQkFBTUMsT0FEQztBQUVQQyx5QkFBUztBQUZGLGFBRE47QUFLSkMscUJBQVM7QUFDTEQseUJBQVM7QUFESjtBQUxMLFM7Ozs7RUFENkIsZUFBS0UsUzs7a0JBQXpCUCxXIiwiZmlsZSI6InBsYWNlaG9sZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYWNlSG9sZGVyIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgICAgc3luY1Nob3c6IHtcclxuICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWVzc2FnZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAn5rKh5pyJ55u45YWz5L+h5oGvJ1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuIl19