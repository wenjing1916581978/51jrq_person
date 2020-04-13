"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _constants = require('./../utils/constants.js');

var _utils = require('./../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CommPosi.__proto__ || Object.getPrototypeOf(CommPosi)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {
            loginInfo: {},
            processList: [],
            applyid: ''
        }, _this.props = {
            syncPosidata: {
                type: Object,
                default: null
            }
        }, _this.methods = {
            goToHomeView: function goToHomeView(corpid, jobid) {
                _wepy2.default.navigateTo({
                    url: "/pages/home/homeview?corpid=" + corpid + "&jobid=" + jobid
                });
            },
            goProcessView: function goProcessView(corpid, jobid, applyid) {
                if ((typeof applyid === "undefined" ? "undefined" : _typeof(applyid)) === "object") {
                    _wepy2.default.navigateTo({
                        url: "/pages/home/homeview?corpid=" + corpid + "&jobid=" + jobid
                    });
                    return;
                }
                if (this.applyid == applyid) {
                    this.applyid = -1111;
                    this.$apply();
                    return;
                }
                this.applyid = applyid;
                var that = this;
                this.getProcessView(applyid.toString()).then(function (data) {
                    var processList = data.data.list;
                    processList.forEach(function (element) {
                        element.data = _utils2.default.date('Y-m-d H:i', element.data / 1000);
                    });
                    // #star code#
                    var arr = [];
                    that.processList = processList.reduce(function (preValue, curValue) {
                        arr[curValue.status] ? '' : arr[curValue.status] = preValue.push(curValue);
                        return preValue;
                    }, []);
                    wx.hideLoading();
                    that.$apply();
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CommPosi, [{
        key: "onLoad",
        value: function onLoad(options) {
            this.loginInfo = wx.getStorageSync(_constants.LOGIN_INFO) || {};
        }
    }, {
        key: "getProcessView",

        //获取简历基本信息
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(applyid) {
                var json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                wx.showLoading({
                                    title: '加载中'
                                });
                                _context.next = 3;
                                return _api2.default.getProcessView({
                                    query: {
                                        head: {
                                            "transcode": "P00026",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": this.loginInfo.token,
                                            "tokenKey": this.loginInfo.tokenKey,
                                            "applyid": applyid
                                        }
                                    }
                                });

                            case 3:
                                json = _context.sent;
                                return _context.abrupt("return", json);

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getProcessView(_x) {
                return _ref2.apply(this, arguments);
            }

            return getProcessView;
        }()
    }]);

    return CommPosi;
}(_wepy2.default.component);

exports.default = CommPosi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1wb3NpMi5qcyJdLCJuYW1lcyI6WyJDb21tUG9zaSIsImNvbXBvbmVudHMiLCJkYXRhIiwibG9naW5JbmZvIiwicHJvY2Vzc0xpc3QiLCJhcHBseWlkIiwicHJvcHMiLCJzeW5jUG9zaWRhdGEiLCJ0eXBlIiwiT2JqZWN0IiwiZGVmYXVsdCIsIm1ldGhvZHMiLCJnb1RvSG9tZVZpZXciLCJjb3JwaWQiLCJqb2JpZCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb1Byb2Nlc3NWaWV3IiwiJGFwcGx5IiwidGhhdCIsImdldFByb2Nlc3NWaWV3IiwidG9TdHJpbmciLCJ0aGVuIiwibGlzdCIsImZvckVhY2giLCJlbGVtZW50IiwiZGF0ZSIsImFyciIsInJlZHVjZSIsInByZVZhbHVlIiwiY3VyVmFsdWUiLCJzdGF0dXMiLCJwdXNoIiwid3giLCJoaWRlTG9hZGluZyIsIm9wdGlvbnMiLCJnZXRTdG9yYWdlU3luYyIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJxdWVyeSIsImhlYWQiLCJ0b2tlbiIsInRva2VuS2V5IiwianNvbiIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDSTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXNCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFDbEJDLFUsR0FBYSxFLFFBSWJDLEksR0FBTztBQUNIQyx1QkFBVyxFQURSO0FBRUhDLHlCQUFhLEVBRlY7QUFHSEMscUJBQVM7QUFITixTLFFBTVBDLEssR0FBUTtBQUNKQywwQkFBYztBQUNWQyxzQkFBTUMsTUFESTtBQUVWQyx5QkFBUztBQUZDO0FBRFYsUyxRQVdSQyxPLEdBQVU7QUFDTkMsd0JBRE0sd0JBQ09DLE1BRFAsRUFDZUMsS0FEZixFQUNzQjtBQUN4QiwrQkFBS0MsVUFBTCxDQUFnQjtBQUNaQywwREFBb0NILE1BQXBDLGVBQW9EQztBQUR4QyxpQkFBaEI7QUFHSCxhQUxLO0FBTU5HLHlCQU5NLHlCQU1RSixNQU5SLEVBTWVDLEtBTmYsRUFNcUJULE9BTnJCLEVBTThCO0FBQ2hDLG9CQUFHLFFBQVFBLE9BQVIseUNBQVFBLE9BQVIsT0FBcUIsUUFBeEIsRUFBaUM7QUFDN0IsbUNBQUtVLFVBQUwsQ0FBZ0I7QUFDWkMsOERBQW9DSCxNQUFwQyxlQUFvREM7QUFEeEMscUJBQWhCO0FBR0E7QUFDSDtBQUNELG9CQUFHLEtBQUtULE9BQUwsSUFBZ0JBLE9BQW5CLEVBQTJCO0FBQ3ZCLHlCQUFLQSxPQUFMLEdBQWUsQ0FBQyxJQUFoQjtBQUNBLHlCQUFLYSxNQUFMO0FBQ0E7QUFDSDtBQUNELHFCQUFLYixPQUFMLEdBQWVBLE9BQWY7QUFDQSxvQkFBTWMsT0FBTyxJQUFiO0FBQ0EscUJBQUtDLGNBQUwsQ0FBb0JmLFFBQVFnQixRQUFSLEVBQXBCLEVBQXdDQyxJQUF4QyxDQUE2QyxnQkFBTTtBQUMvQyx3QkFBSWxCLGNBQWNGLEtBQUtBLElBQUwsQ0FBVXFCLElBQTVCO0FBQ0FuQixnQ0FBWW9CLE9BQVosQ0FBb0IsbUJBQVc7QUFDM0JDLGdDQUFRdkIsSUFBUixHQUFlLGdCQUFNd0IsSUFBTixDQUFXLFdBQVgsRUFBd0JELFFBQVF2QixJQUFULEdBQWUsSUFBdEMsQ0FBZjtBQUNILHFCQUZEO0FBR0E7QUFDQSx3QkFBSXlCLE1BQU0sRUFBVjtBQUNBUix5QkFBS2YsV0FBTCxHQUFtQkEsWUFBWXdCLE1BQVosQ0FBbUIsVUFBQ0MsUUFBRCxFQUFXQyxRQUFYLEVBQXdCO0FBQzFESCw0QkFBSUcsU0FBU0MsTUFBYixJQUF1QixFQUF2QixHQUE0QkosSUFBSUcsU0FBU0MsTUFBYixJQUF1QkYsU0FBU0csSUFBVCxDQUFjRixRQUFkLENBQW5EO0FBQ0EsK0JBQU9ELFFBQVA7QUFDSCxxQkFIa0IsRUFHaEIsRUFIZ0IsQ0FBbkI7QUFJQUksdUJBQUdDLFdBQUg7QUFDQWYseUJBQUtELE1BQUw7QUFDSCxpQkFiRDtBQWNIO0FBbENLLFM7Ozs7OytCQUpIaUIsTyxFQUFRO0FBQ1gsaUJBQUtoQyxTQUFMLEdBQWtCOEIsR0FBR0csY0FBSCwyQkFBaUMsRUFBbkQ7QUFDSDs7OztBQXNDRDs7aUdBQ3FCL0IsTzs7Ozs7O0FBQ2pCNEIsbUNBQUdJLFdBQUgsQ0FBZTtBQUNYQywyQ0FBTztBQURJLGlDQUFmOzt1Q0FHbUIsY0FBSWxCLGNBQUosQ0FBbUI7QUFDdENtQiwyQ0FBTztBQUNDQyw4Q0FBTTtBQUNGLHlEQUFhLFFBRFg7QUFFRixvREFBUTtBQUZOLHlDQURQO0FBS0N0Qyw4Q0FBTTtBQUNGLHFEQUFTLEtBQUtDLFNBQUwsQ0FBZXNDLEtBRHRCO0FBRUYsd0RBQVksS0FBS3RDLFNBQUwsQ0FBZXVDLFFBRnpCO0FBR0YsdURBQVdyQztBQUhUO0FBTFA7QUFEK0IsaUNBQW5CLEM7OztBQUFic0Msb0M7aUVBYUNBLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE1RXdCLGVBQUtDLFM7O2tCQUF0QjVDLFEiLCJmaWxlIjoiY29tbXBvc2kyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuICAgIGltcG9ydCBhcGkgZnJvbSBcIi4uL2FwaS9hcGlcIjtcclxuICAgIGltcG9ydCB7TE9HSU5fSU5GT30gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50c1wiO1xyXG4gICAgaW1wb3J0IHV0aWxzIGZyb20nLi4vdXRpbHMvdXRpbHMnO1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0ICBjbGFzcyBDb21tUG9zaSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgICAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIGxvZ2luSW5mbzoge30sXHJcbiAgICAgICAgICAgIHByb2Nlc3NMaXN0OiBbXSxcclxuICAgICAgICAgICAgYXBwbHlpZDogJydcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3BzID0ge1xyXG4gICAgICAgICAgICBzeW5jUG9zaWRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Mb2FkKG9wdGlvbnMpe1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luSW5mbyA9ICB3eC5nZXRTdG9yYWdlU3luYyhMT0dJTl9JTkZPKSB8fCB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIGdvVG9Ib21lVmlldyhjb3JwaWQsIGpvYmlkKSB7XHJcbiAgICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogYC9wYWdlcy9ob21lL2hvbWV2aWV3P2NvcnBpZD0ke2NvcnBpZH0mam9iaWQ9JHtqb2JpZH1gICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ29Qcm9jZXNzVmlldyhjb3JwaWQsam9iaWQsYXBwbHlpZCkge1xyXG4gICAgICAgICAgICAgICAgaWYoKHR5cGVvZiBhcHBseWlkKSA9PT0gXCJvYmplY3RcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2hvbWUvaG9tZXZpZXc/Y29ycGlkPSR7Y29ycGlkfSZqb2JpZD0ke2pvYmlkfWAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFwcGx5aWQgPT0gYXBwbHlpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseWlkID0gLTExMTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5aWQgPSBhcHBseWlkO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFByb2Nlc3NWaWV3KGFwcGx5aWQudG9TdHJpbmcoKSkudGhlbihkYXRhPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByb2Nlc3NMaXN0ID0gZGF0YS5kYXRhLmxpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0xpc3QuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5kYXRhID0gdXRpbHMuZGF0ZSgnWS1tLWQgSDppJywoZWxlbWVudC5kYXRhKS8xMDAwKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICNzdGFyIGNvZGUjXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wcm9jZXNzTGlzdCA9IHByb2Nlc3NMaXN0LnJlZHVjZSgocHJlVmFsdWUsIGN1clZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycltjdXJWYWx1ZS5zdGF0dXNdID8gJycgOiBhcnJbY3VyVmFsdWUuc3RhdHVzXSA9IHByZVZhbHVlLnB1c2goY3VyVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgW10pXHJcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6I635Y+W566A5Y6G5Z+65pys5L+h5oGvXHJcbiAgICAgICAgYXN5bmMgZ2V0UHJvY2Vzc1ZpZXcoYXBwbHlpZCkge1xyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0UHJvY2Vzc1ZpZXcoe1xyXG4gICAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJQMDAwMjZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhpcy5sb2dpbkluZm8udG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhpcy5sb2dpbkluZm8udG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYXBwbHlpZFwiOiBhcHBseWlkXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4ganNvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiJdfQ==