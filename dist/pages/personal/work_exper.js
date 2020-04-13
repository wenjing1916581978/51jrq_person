'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseInfo = function (_wepy$page) {
    _inherits(BaseInfo, _wepy$page);

    function BaseInfo() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, BaseInfo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BaseInfo.__proto__ || Object.getPrototypeOf(BaseInfo)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '工作经历'
        }, _this.data = {
            corpname: '',
            postcode: '',
            starttime: '',
            endtime: '',
            workremark: '',
            workid: '',
            resumeid: '',
            token: '',
            tokenKey: ''
        }, _this.methods = {
            // 提交表单--基本信息编辑新增
            formSubmit: function formSubmit(e) {
                wx.showLoading({
                    title: '加载中'
                });
                if (this.workid != "undefined") {
                    e.detail.value.workid = this.workid;
                }
                var obj2 = {
                    "token": this.token,
                    "tokenKey": this.tokenKey,
                    "resumeid": this.resumeid
                };
                if (!obj2.resumeid) {
                    delete obj2['resumeid'];
                }
                var that = this;
                this.changeBaseInfo(e.detail.value, obj2).then(function (data) {
                    if (data.data && data.data.returnCode == "AAAAAAA") {
                        var pages = getCurrentPages();
                        var prevPage = pages[pages.length - 2];
                        prevPage.update(2);
                        wx.navigateBack({
                            delta: 1
                        });
                    } else {
                        console.log(data);
                    }
                    wx.hideLoading();
                });
            },
            bindDateChange1: function bindDateChange1(e) {
                this.starttime = e.detail.value;
                this.$apply();
            },
            bindDateChange2: function bindDateChange2(e) {
                this.endtime = e.detail.value;
                this.$apply();
            }

            //获取工作经历
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BaseInfo, [{
        key: 'onLoad',
        value: function onLoad(options) {
            this.workid = options.workid;
            this.resumeid = options.resumeid;
            this.$apply();
            var that = this;
            // 获取登录信息
            wx.getStorage({
                key: 'loginData',
                success: function success(res) {
                    that.token = res.data.token;
                    that.tokenKey = res.data.tokenKey;
                    that.$apply();
                    //获取求职意向
                    if (options.resumeid == '') {
                        return false;
                    }
                    that.getJobInfo(that.token, that.tokenKey, that.resumeid).then(function (json) {
                        if (json.data.returnCode == "AAAAAAA") {
                            var jobExper = JSON.parse(json.data.data);
                            var resultArr = jobExper.find(function (item) {
                                return item.workid == options.workid;
                            });
                            that.corpname = resultArr.corpname;
                            that.postcode = resultArr.postcode;
                            that.starttime = resultArr.starttime;
                            that.endtime = resultArr.endtime;
                            that.workremark = resultArr.workremark;
                            that.$apply();
                        } else {
                            _tip2.default.error(json.returnMsg);
                        }
                    });
                }
            });
        }
    }, {
        key: 'getJobInfo',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, tokenKey, resumeid) {
                var json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _api2.default.getResumeInfo({
                                    query: {
                                        head: {
                                            "transcode": "M0005",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": token,
                                            "tokenKey": tokenKey,
                                            "resumeid": resumeid
                                        }
                                    }
                                });

                            case 2:
                                json = _context.sent;
                                return _context.abrupt('return', json);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getJobInfo(_x, _x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return getJobInfo;
        }()

        //修改表单数据

    }, {
        key: 'changeBaseInfo',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(obj, obj2) {
                var data, resultObj, json;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                data = obj2;
                                resultObj = Object.assign(data, obj);
                                _context2.next = 4;
                                return _api2.default.getResumeInfo({
                                    query: {
                                        head: {
                                            "transcode": "M0015",
                                            "type": "h"
                                        },
                                        data: resultObj
                                    }
                                });

                            case 4:
                                json = _context2.sent;
                                return _context2.abrupt('return', json);

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function changeBaseInfo(_x4, _x5) {
                return _ref3.apply(this, arguments);
            }

            return changeBaseInfo;
        }()
    }]);

    return BaseInfo;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseInfo , 'pages/personal/work_exper'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtfZXhwZXIuanMiXSwibmFtZXMiOlsiQmFzZUluZm8iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNvcnBuYW1lIiwicG9zdGNvZGUiLCJzdGFydHRpbWUiLCJlbmR0aW1lIiwid29ya3JlbWFyayIsIndvcmtpZCIsInJlc3VtZWlkIiwidG9rZW4iLCJ0b2tlbktleSIsIm1ldGhvZHMiLCJmb3JtU3VibWl0IiwiZSIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImRldGFpbCIsInZhbHVlIiwib2JqMiIsInRoYXQiLCJjaGFuZ2VCYXNlSW5mbyIsInRoZW4iLCJyZXR1cm5Db2RlIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsImxlbmd0aCIsInVwZGF0ZSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiY29uc29sZSIsImxvZyIsImhpZGVMb2FkaW5nIiwiYmluZERhdGVDaGFuZ2UxIiwiJGFwcGx5IiwiYmluZERhdGVDaGFuZ2UyIiwib3B0aW9ucyIsImdldFN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwicmVzIiwiZ2V0Sm9iSW5mbyIsImpzb24iLCJqb2JFeHBlciIsIkpTT04iLCJwYXJzZSIsInJlc3VsdEFyciIsImZpbmQiLCJpdGVtIiwiZXJyb3IiLCJyZXR1cm5Nc2ciLCJnZXRSZXN1bWVJbmZvIiwicXVlcnkiLCJoZWFkIiwib2JqIiwicmVzdWx0T2JqIiwiT2JqZWN0IiwiYXNzaWduIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBRW5CQyxNLEdBQVM7QUFDVEMsb0NBQXdCO0FBRGYsUyxRQUlUQyxJLEdBQU87QUFDSEMsc0JBQVMsRUFETjtBQUVIQyxzQkFBUyxFQUZOO0FBR0hDLHVCQUFVLEVBSFA7QUFJSEMscUJBQVEsRUFKTDtBQUtIQyx3QkFBVyxFQUxSO0FBTUhD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QUFMLEdBQWdCNkMsVUFBVTdDLFFBQTFCO0FBQ0FrQixpQ0FBS2pCLFFBQUwsR0FBZ0I0QyxVQUFVNUMsUUFBMUI7QUFDQWlCLGlDQUFLaEIsU0FBTCxHQUFpQjJDLFVBQVUzQyxTQUEzQjtBQUNBZ0IsaUNBQUtmLE9BQUwsR0FBZTBDLFVBQVUxQyxPQUF6QjtBQUNBZSxpQ0FBS2QsVUFBTCxHQUFrQnlDLFVBQVV6QyxVQUE1QjtBQUNBYyxpQ0FBS2UsTUFBTDtBQUNILHlCQVRELE1BU087QUFDSCwwQ0FBSWUsS0FBSixDQUFVUCxLQUFLUSxTQUFmO0FBQ0g7QUFDSixxQkFiRDtBQWNIO0FBeEJTLGFBQWQ7QUE0Qkg7Ozs7aUdBNkNnQjFDLEssRUFBTUMsUSxFQUFTRixROzs7Ozs7O3VDQUNULGNBQUk0QyxhQUFKLENBQWtCO0FBQ3JDQywyQ0FBTztBQUNDQyw4Q0FBTTtBQUNGLHlEQUFhLE9BRFg7QUFFRixvREFBUTtBQUZOLHlDQURQO0FBS0NyRCw4Q0FBTTtBQUNGLHFEQUFTUSxLQURQO0FBRUYsd0RBQVlDLFFBRlY7QUFHRix3REFBWUY7QUFIVjtBQUxQO0FBRDhCLGlDQUFsQixDOzs7QUFBYm1DLG9DO2lFQWFDQSxJOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdYOzs7OztrR0FDcUJZLEcsRUFBSXBDLEk7Ozs7OztBQUNqQmxCLG9DLEdBQU9rQixJO0FBQ1BxQyx5QyxHQUFZQyxPQUFPQyxNQUFQLENBQWN6RCxJQUFkLEVBQW9Cc0QsR0FBcEIsQzs7dUNBQ0csY0FBSUgsYUFBSixDQUFrQjtBQUNyQ0MsMkNBQU87QUFDQ0MsOENBQU07QUFDRix5REFBYSxPQURYO0FBRUYsb0RBQVE7QUFGTix5Q0FEUDtBQUtDckQsOENBQU11RDtBQUxQO0FBRDhCLGlDQUFsQixDOzs7QUFBYmIsb0M7a0VBU0NBLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEvSHlCLGVBQUtnQixJOztrQkFBdEI3RCxRIiwiZmlsZSI6IndvcmtfZXhwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbiAgaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlSW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W3peS9nOe7j+WOhicsXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBjb3JwbmFtZTonJyxcclxuICAgICAgICBwb3N0Y29kZTonJyxcclxuICAgICAgICBzdGFydHRpbWU6JycsXHJcbiAgICAgICAgZW5kdGltZTonJyxcclxuICAgICAgICB3b3JrcmVtYXJrOicnLFxyXG4gICAgICAgIHdvcmtpZDonJyxcclxuICAgICAgICByZXN1bWVpZDogJycsXHJcbiAgICAgICAgdG9rZW46ICcnLFxyXG4gICAgICAgIHRva2VuS2V5OiAnJyxcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMud29ya2lkID0gb3B0aW9ucy53b3JraWQ7XHJcbiAgICAgICAgdGhpcy5yZXN1bWVpZCA9IG9wdGlvbnMucmVzdW1laWQ7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyDojrflj5bnmbvlvZXkv6Hmga9cclxuICAgICAgICB3eC5nZXRTdG9yYWdlKHtcclxuICAgICAgICAgICAga2V5OiAnbG9naW5EYXRhJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRva2VuID0gcmVzLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRva2VuS2V5ID0gcmVzLmRhdGEudG9rZW5LZXk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgLy/ojrflj5bmsYLogYzmhI/lkJFcclxuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMucmVzdW1laWQ9PScnKXtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdldEpvYkluZm8odGhhdC50b2tlbix0aGF0LnRva2VuS2V5LHRoYXQucmVzdW1laWQpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqb2JFeHBlciA9IEpTT04ucGFyc2UoanNvbi5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0QXJyID0gam9iRXhwZXIuZmluZChpdGVtID0+IGl0ZW0ud29ya2lkID09IG9wdGlvbnMud29ya2lkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvcnBuYW1lID0gcmVzdWx0QXJyLmNvcnBuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBvc3Rjb2RlID0gcmVzdWx0QXJyLnBvc3Rjb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YXJ0dGltZSA9IHJlc3VsdEFyci5zdGFydHRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kdGltZSA9IHJlc3VsdEFyci5lbmR0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LndvcmtyZW1hcmsgPSByZXN1bHRBcnIud29ya3JlbWFyaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAvLyDmj5DkuqTooajljZUtLeWfuuacrOS/oeaBr+e8lui+keaWsOWinlxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZih0aGlzLndvcmtpZCAhPSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgICAgIGUuZGV0YWlsLnZhbHVlLndvcmtpZCA9IHRoaXMud29ya2lkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBvYmoyID0ge1xyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGlzLnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGlzLnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bWVpZFwiOiB0aGlzLnJlc3VtZWlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIW9iajIucmVzdW1laWQpe1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG9iajJbJ3Jlc3VtZWlkJ11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VCYXNlSW5mbyhlLmRldGFpbC52YWx1ZSxvYmoyKS50aGVuKGRhdGE9PntcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZQYWdlLnVwZGF0ZSgyKVxyXG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmREYXRlQ2hhbmdlMTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0dGltZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZERhdGVDaGFuZ2UyOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kdGltZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blt6XkvZznu4/ljoZcclxuICAgIGFzeW5jIGdldEpvYkluZm8odG9rZW4sdG9rZW5LZXkscmVzdW1laWQpIHtcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAwNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuXCI6IHRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZXN1bWVpZFwiOiByZXN1bWVpZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/ruaUueihqOWNleaVsOaNrlxyXG4gICAgYXN5bmMgY2hhbmdlQmFzZUluZm8ob2JqLG9iajIpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IG9iajJcclxuICAgICAgICBsZXQgcmVzdWx0T2JqID0gT2JqZWN0LmFzc2lnbihkYXRhLCBvYmopO1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0UmVzdW1lSW5mbyh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0T2JqXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG4gIH1cclxuIl19