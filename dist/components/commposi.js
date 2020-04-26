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
            goDetails: function goDetails() {
                var obj = this.syncPosidata;
                var corpid = obj.companyid ? obj.companyid : obj.corpid;
                var jobid = obj.id ? obj.id : obj.jobid;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1wb3NpLmpzIl0sIm5hbWVzIjpbIkNvbW1Qb3NpIiwicHJvcHMiLCJzeW5jUG9zaWRhdGEiLCJ0eXBlIiwiT2JqZWN0IiwiZGVmYXVsdCIsIm1ldGhvZHMiLCJnb0RldGFpbHMiLCJvYmoiLCJjb3JwaWQiLCJjb21wYW55aWQiLCJqb2JpZCIsImlkIiwibGVuZ3RoIiwibmF2aWdhdGVUbyIsInVybCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXNCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFFbEJDLEssR0FBUTtBQUNKQywwQkFBYztBQUNWQyxzQkFBTUMsTUFESTtBQUVWQyx5QkFBUztBQUZDO0FBRFYsUyxRQVVSQyxPLEdBQVU7QUFDTkMscUJBRE0sdUJBQ007QUFDVixvQkFBSUMsTUFBTSxLQUFLTixZQUFmO0FBQ0Esb0JBQUlPLFNBQU9ELElBQUlFLFNBQUosR0FBY0YsSUFBSUUsU0FBbEIsR0FBNEJGLElBQUlDLE1BQTNDO0FBQ0Esb0JBQUlFLFFBQVFILElBQUlJLEVBQUosR0FBT0osSUFBSUksRUFBWCxHQUFjSixJQUFJRyxLQUE5QjtBQUNBLG9CQUFJQSxNQUFNRSxNQUFOLElBQWdCSixPQUFPSSxNQUFQLElBQWlCLENBQXJDLEVBQXdDO0FBQ3BDO0FBQ0g7QUFDRCwrQkFBS0MsVUFBTCxDQUFnQjtBQUNaQywwREFBb0NOLE1BQXBDLGVBQW9ERTtBQUR4QyxpQkFBaEI7QUFHRDtBQVhLLFM7Ozs7O2lDQUhGLENBQ1A7Ozs7RUFWa0MsZUFBS0ssUzs7a0JBQXRCaEIsUSIsImZpbGUiOiJjb21tcG9zaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbiAgICBpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0ICBjbGFzcyBDb21tUG9zaSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgIHN5bmNQb3NpZGF0YToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkxvYWQoKXtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIGdvRGV0YWlscygpIHtcclxuICAgICAgICAgICAgICBsZXQgb2JqID0gdGhpcy5zeW5jUG9zaWRhdGFcclxuICAgICAgICAgICAgICBsZXQgY29ycGlkPW9iai5jb21wYW55aWQ/b2JqLmNvbXBhbnlpZDpvYmouY29ycGlkXHJcbiAgICAgICAgICAgICAgbGV0IGpvYmlkID0gb2JqLmlkP29iai5pZDpvYmouam9iaWRcclxuICAgICAgICAgICAgICBpZiAoam9iaWQubGVuZ3RoICYmIGNvcnBpZC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgIHVybDogYC9wYWdlcy9ob21lL2hvbWV2aWV3P2NvcnBpZD0ke2NvcnBpZH0mam9iaWQ9JHtqb2JpZH1gXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19