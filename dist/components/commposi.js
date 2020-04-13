'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommPosi = function (_wepy$component) {
    _inherits(CommPosi, _wepy$component);

    function CommPosi() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CommPosi);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CommPosi.__proto__ || Object.getPrototypeOf(CommPosi)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            syncPosidata: {
                type: Object,
                default: null
            }
        }, _this.methods = {
            goToHomeView: function goToHomeView(corpid, jobid) {
                if (jobid.length && corpid.length == 0) {
                    return;
                }
                _wepy2.default.navigateTo({
                    url: '/pages/home/homeview?corpid=' + corpid + '&jobid=' + jobid
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CommPosi, [{
        key: 'onLoad',
        value: function onLoad() {}
    }]);

    return CommPosi;
}(_wepy2.default.component);

exports.default = CommPosi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1wb3NpLmpzIl0sIm5hbWVzIjpbIkNvbW1Qb3NpIiwicHJvcHMiLCJzeW5jUG9zaWRhdGEiLCJ0eXBlIiwiT2JqZWN0IiwiZGVmYXVsdCIsIm1ldGhvZHMiLCJnb1RvSG9tZVZpZXciLCJjb3JwaWQiLCJqb2JpZCIsImxlbmd0aCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNJOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVzQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBRWxCQyxLLEdBQVE7QUFDSkMsMEJBQWM7QUFDVkMsc0JBQU1DLE1BREk7QUFFVkMseUJBQVM7QUFGQztBQURWLFMsUUFVUkMsTyxHQUFVO0FBQ05DLHdCQURNLHdCQUNPQyxNQURQLEVBQ2VDLEtBRGYsRUFDc0I7QUFDeEIsb0JBQUlBLE1BQU1DLE1BQU4sSUFBZ0JGLE9BQU9FLE1BQVAsSUFBaUIsQ0FBckMsRUFBd0M7QUFDcEM7QUFDSDtBQUNELCtCQUFLQyxVQUFMLENBQWdCO0FBQ1pDLDBEQUFvQ0osTUFBcEMsZUFBb0RDO0FBRHhDLGlCQUFoQjtBQUdIO0FBUkssUzs7Ozs7aUNBSEYsQ0FDUDs7OztFQVZrQyxlQUFLSSxTOztrQkFBdEJiLFEiLCJmaWxlIjoiY29tbXBvc2kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG4gICAgaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJztcclxuXHJcbiAgICBleHBvcnQgZGVmYXVsdCAgY2xhc3MgQ29tbVBvc2kgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIHByb3BzID0ge1xyXG4gICAgICAgICAgICBzeW5jUG9zaWRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Mb2FkKCl7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgICAgICBnb1RvSG9tZVZpZXcoY29ycGlkLCBqb2JpZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpvYmlkLmxlbmd0aCAmJiBjb3JwaWQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvaG9tZS9ob21ldmlldz9jb3JwaWQ9JHtjb3JwaWR9JmpvYmlkPSR7am9iaWR9YCAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiJdfQ==