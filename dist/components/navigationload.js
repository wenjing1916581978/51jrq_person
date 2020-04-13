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

var NavigationLoad = function (_wepy$component) {
    _inherits(NavigationLoad, _wepy$component);

    function NavigationLoad() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, NavigationLoad);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NavigationLoad.__proto__ || Object.getPrototypeOf(NavigationLoad)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            syncLoadShow: {
                type: Boolean
                // default: false
            },
            message: {
                default: '正在加载中'
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return NavigationLoad;
}(_wepy2.default.component);

exports.default = NavigationLoad;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmlnYXRpb25sb2FkLmpzIl0sIm5hbWVzIjpbIk5hdmlnYXRpb25Mb2FkIiwicHJvcHMiLCJzeW5jTG9hZFNob3ciLCJ0eXBlIiwiQm9vbGVhbiIsIm1lc3NhZ2UiLCJkZWZhdWx0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsYzs7Ozs7Ozs7Ozs7Ozs7ME1BQ2pCQyxLLEdBQVE7QUFDSkMsMEJBQWM7QUFDVkMsc0JBQU1DO0FBQ047QUFGVSxhQURWO0FBS0pDLHFCQUFTO0FBQ0xDLHlCQUFTO0FBREo7QUFMTCxTOzs7O0VBRGdDLGVBQUtDLFM7O2tCQUE1QlAsYyIsImZpbGUiOiJuYXZpZ2F0aW9ubG9hZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0aW9uTG9hZCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICAgIHN5bmNMb2FkU2hvdzoge1xyXG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICAvLyBkZWZhdWx0OiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWVzc2FnZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiAn5q2j5Zyo5Yqg6L295LitJ1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuIl19