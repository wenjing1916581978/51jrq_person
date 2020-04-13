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

var regions = require('./../utils/regions.js');

var CityList = function (_wepy$component) {
    _inherits(CityList, _wepy$component);

    function CityList() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CityList);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CityList.__proto__ || Object.getPrototypeOf(CityList)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            regions: regions
        }, _this.props = {
            citySelected: {
                type: String,
                default: '全国'
            }
        }, _this.methods = {
            selectCityFn: function selectCityFn(event) {
                this.$emit('cityNameFn', event.target.dataset.cityName);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return CityList;
}(_wepy2.default.component);

exports.default = CityList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNpdHlsaXN0LmpzIl0sIm5hbWVzIjpbInJlZ2lvbnMiLCJyZXF1aXJlIiwiQ2l0eUxpc3QiLCJkYXRhIiwicHJvcHMiLCJjaXR5U2VsZWN0ZWQiLCJ0eXBlIiwiU3RyaW5nIiwiZGVmYXVsdCIsIm1ldGhvZHMiLCJzZWxlY3RDaXR5Rm4iLCJldmVudCIsIiRlbWl0IiwidGFyZ2V0IiwiZGF0YXNldCIsImNpdHlOYW1lIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUNBLElBQU9BLFVBQVVDLFFBQVEsa0JBQVIsQ0FBakI7O0lBRXFCQyxROzs7Ozs7Ozs7Ozs7Ozs4TEFDakJDLEksR0FBSztBQUNESCxxQkFBU0E7QUFEUixTLFFBSUxJLEssR0FBUTtBQUNKQywwQkFBYztBQUNWQyxzQkFBTUMsTUFESTtBQUVWQyx5QkFBUztBQUZDO0FBRFYsUyxRQU9SQyxPLEdBQVE7QUFDSkMsd0JBREksd0JBQ1NDLEtBRFQsRUFDZTtBQUNmLHFCQUFLQyxLQUFMLENBQVcsWUFBWCxFQUF5QkQsTUFBTUUsTUFBTixDQUFhQyxPQUFiLENBQXFCQyxRQUE5QztBQUNIO0FBSEcsUzs7OztFQVowQixlQUFLQyxTOztrQkFBdEJkLFEiLCJmaWxlIjoiY2l0eWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmNvbnN0ICByZWdpb25zID0gcmVxdWlyZSgnLi4vdXRpbHMvcmVnaW9ucycpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2l0eUxpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBkYXRhPXtcclxuICAgICAgICByZWdpb25zOiByZWdpb25zLFxyXG4gICAgfVxyXG5cclxuICAgIHByb3BzID0ge1xyXG4gICAgICAgIGNpdHlTZWxlY3RlZDoge1xyXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6ICflhajlm70nXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHM9e1xyXG4gICAgICAgIHNlbGVjdENpdHlGbihldmVudCl7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NpdHlOYW1lRm4nLCBldmVudC50YXJnZXQuZGF0YXNldC5jaXR5TmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19