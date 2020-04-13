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

var RelatedJob = function (_wepy$component) {
    _inherits(RelatedJob, _wepy$component);

    function RelatedJob() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RelatedJob);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RelatedJob.__proto__ || Object.getPrototypeOf(RelatedJob)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            syncRelatedJob: {
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

    return RelatedJob;
}(_wepy2.default.component);

exports.default = RelatedJob;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbGF0ZWRqb2IuanMiXSwibmFtZXMiOlsiUmVsYXRlZEpvYiIsInByb3BzIiwic3luY1JlbGF0ZWRKb2IiLCJ0eXBlIiwiT2JqZWN0IiwiZGVmYXVsdCIsIm1ldGhvZHMiLCJnb1RvSG9tZVZpZXciLCJjb3JwaWQiLCJqb2JpZCIsImxlbmd0aCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDSTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7Ozs7OztrTUFDakJDLEssR0FBUTtBQUNKQyw0QkFBZ0I7QUFDWkMsc0JBQU1DLE1BRE07QUFFWkMseUJBQVM7QUFGRztBQURaLFMsUUFPUkMsTyxHQUFVO0FBQ05DLHdCQURNLHdCQUNPQyxNQURQLEVBQ2VDLEtBRGYsRUFDc0I7QUFDeEIsb0JBQUlBLE1BQU1DLE1BQU4sSUFBZ0JGLE9BQU9FLE1BQVAsSUFBaUIsQ0FBckMsRUFBd0M7QUFDcEM7QUFDSDtBQUNELCtCQUFLQyxVQUFMLENBQWdCO0FBQ1pDLDBEQUFvQ0osTUFBcEMsZUFBb0RDO0FBRHhDLGlCQUFoQjtBQUdIO0FBUkssUzs7OztFQVIwQixlQUFLSSxTOztrQkFBeEJiLFUiLCJmaWxlIjoicmVsYXRlZGpvYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVsYXRlZEpvYiBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgICAgICBwcm9wcyA9IHtcclxuICAgICAgICAgICAgc3luY1JlbGF0ZWRKb2I6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAgICAgZ29Ub0hvbWVWaWV3KGNvcnBpZCwgam9iaWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqb2JpZC5sZW5ndGggJiYgY29ycGlkLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvaG9tZS9ob21ldmlldz9jb3JwaWQ9JHtjb3JwaWR9JmpvYmlkPSR7am9iaWR9YCAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiJdfQ==