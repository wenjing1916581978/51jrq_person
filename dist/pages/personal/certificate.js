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
            navigationBarTitleText: '证书'
        }, _this.data = {
            certname: '',
            gaintime: '',
            certid: '',
            token: "",
            tokenKey: "",
            resumeid: ''
        }, _this.methods = {
            // 提交表单--基本信息编辑新增
            formSubmit: function formSubmit(e) {
                wx.showLoading({
                    title: '加载中'
                });
                if (this.certid != "undefined") {
                    e.detail.value.certid = this.certid;
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
                        prevPage.update(5);
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
                this.gaintime = e.detail.value;
                this.$apply();
            }

            //获取证书
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BaseInfo, [{
        key: 'onLoad',
        value: function onLoad(options) {
            this.certid = options.certid;
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
                    if (options.resumeid == '') {
                        return false;
                    }
                    //获取求职意向
                    that.getJobInfo(that.token, that.tokenKey, that.resumeid).then(function (json) {
                        if (json.data.returnCode == "AAAAAAA") {
                            var jobExper = JSON.parse(json.data.data);
                            var resultArr = jobExper.find(function (item) {
                                return item.certid == options.certid;
                            });
                            that.certname = resultArr.certname;
                            that.gaintime = resultArr.gaintime;
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
                                            "transcode": "M0010",
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
                                            "transcode": "M0020",
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseInfo , 'pages/personal/certificate'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRlLmpzIl0sIm5hbWVzIjpbIkJhc2VJbmZvIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJjZXJ0bmFtZSIsImdhaW50aW1lIiwiY2VydGlkIiwidG9rZW4iLCJ0b2tlbktleSIsInJlc3VtZWlkIiwibWV0aG9kcyIsImZvcm1TdWJtaXQiLCJlIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwiZGV0YWlsIiwidmFsdWUiLCJvYmoyIiwidGhhdCIsImNoYW5nZUJhc2VJbmZvIiwidGhlbiIsInJldHVybkNvZGUiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwibGVuZ3RoIiwidXBkYXRlIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjb25zb2xlIiwibG9nIiwiaGlkZUxvYWRpbmciLCJiaW5kRGF0ZUNoYW5nZTEiLCJzdGFydHRpbWUiLCIkYXBwbHkiLCJiaW5kRGF0ZUNoYW5nZTIiLCJvcHRpb25zIiwiZ2V0U3RvcmFnZSIsImtleSIsInN1Y2Nlc3MiLCJyZXMiLCJnZXRKb2JJbmZvIiwianNvbiIsImpvYkV4cGVyIiwiSlNPTiIsInBhcnNlIiwicmVzdWx0QXJyIiwiZmluZCIsIml0ZW0iLCJlcnJvciIsInJldHVybk1zZyIsImdldFJlc3VtZUluZm8iLCJxdWVyeSIsImhlYWQiLCJvYmoiLCJyZXN1bHRPYmoiLCJPYmplY3QiLCJhc3NpZ24iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFFbkJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUlUQyxJLEdBQU87QUFDSEMsc0JBQVMsRUFETjtBQUVIQyxzQkFBUyxFQUZOO0FBR0hDLG9CQUFPLEVBSEo7QUFJSEMsbUJBQU8sRUFKSjtBQUtIQyxzQkFBVSxFQUxQO0FBTUhDLHNCQUFTO0FBTk4sUyxRQTBDUEMs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YyxpQ0FBS2dCLE1BQUw7QUFDSCx5QkFORCxNQU1PO0FBQ0gsMENBQUllLEtBQUosQ0FBVVAsS0FBS1EsU0FBZjtBQUNIO0FBQ0oscUJBVkQ7QUFXSDtBQXJCUyxhQUFkO0FBeUJIOzs7O2lHQTZDZ0I1QyxLLEVBQU1DLFEsRUFBU0MsUTs7Ozs7Ozt1Q0FDVCxjQUFJMkMsYUFBSixDQUFrQjtBQUNyQ0MsMkNBQU87QUFDQ0MsOENBQU07QUFDRix5REFBYSxPQURYO0FBRUYsb0RBQVE7QUFGTix5Q0FEUDtBQUtDbkQsOENBQU07QUFDRixxREFBU0ksS0FEUDtBQUVGLHdEQUFZQyxRQUZWO0FBR0Ysd0RBQVlDO0FBSFY7QUFMUDtBQUQ4QixpQ0FBbEIsQzs7O0FBQWJrQyxvQztpRUFhQ0EsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHWDs7Ozs7a0dBQ3FCWSxHLEVBQUlyQyxJOzs7Ozs7QUFDakJmLG9DLEdBQU9lLEk7QUFDUHNDLHlDLEdBQVlDLE9BQU9DLE1BQVAsQ0FBY3ZELElBQWQsRUFBb0JvRCxHQUFwQixDOzt1Q0FDRyxjQUFJSCxhQUFKLENBQWtCO0FBQ3JDQywyQ0FBTztBQUNDQyw4Q0FBTTtBQUNGLHlEQUFhLE9BRFg7QUFFRixvREFBUTtBQUZOLHlDQURQO0FBS0NuRCw4Q0FBTXFEO0FBTFA7QUFEOEIsaUNBQWxCLEM7OztBQUFiYixvQztrRUFTQ0EsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXpIeUIsZUFBS2dCLEk7O2tCQUF0QjNELFEiLCJmaWxlIjoiY2VydGlmaWNhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbiAgaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlSW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfor4HkuaYnLFxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgY2VydG5hbWU6JycsXHJcbiAgICAgICAgZ2FpbnRpbWU6JycsXHJcbiAgICAgICAgY2VydGlkOicnLFxyXG4gICAgICAgIHRva2VuOiBcIlwiLFxyXG4gICAgICAgIHRva2VuS2V5OiBcIlwiLFxyXG4gICAgICAgIHJlc3VtZWlkOicnXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLmNlcnRpZCA9IG9wdGlvbnMuY2VydGlkO1xyXG4gICAgICAgIHRoaXMucmVzdW1laWQgPSBvcHRpb25zLnJlc3VtZWlkO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy8g6I635Y+W55m75b2V5L+h5oGvXHJcbiAgICAgICAgd3guZ2V0U3RvcmFnZSh7XHJcbiAgICAgICAgICAgIGtleTogJ2xvZ2luRGF0YScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC50b2tlbiA9IHJlcy5kYXRhLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgdGhhdC50b2tlbktleSA9IHJlcy5kYXRhLnRva2VuS2V5O1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMucmVzdW1laWQ9PScnKXtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+iOt+WPluaxguiBjOaEj+WQkVxyXG4gICAgICAgICAgICAgICAgdGhhdC5nZXRKb2JJbmZvKHRoYXQudG9rZW4sdGhhdC50b2tlbktleSx0aGF0LnJlc3VtZWlkKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgam9iRXhwZXIgPSBKU09OLnBhcnNlKGpzb24uZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdEFyciA9IGpvYkV4cGVyLmZpbmQoaXRlbSA9PiBpdGVtLmNlcnRpZCA9PSBvcHRpb25zLmNlcnRpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jZXJ0bmFtZSA9IHJlc3VsdEFyci5jZXJ0bmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5nYWludGltZSA9IHJlc3VsdEFyci5nYWludGltZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAvLyDmj5DkuqTooajljZUtLeWfuuacrOS/oeaBr+e8lui+keaWsOWinlxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZih0aGlzLmNlcnRpZCAhPSBcInVuZGVmaW5lZFwiKXtcclxuICAgICAgICAgICAgICAgIGUuZGV0YWlsLnZhbHVlLmNlcnRpZCA9IHRoaXMuY2VydGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBvYmoyID0ge1xyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGlzLnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGlzLnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bWVpZFwiOiB0aGlzLnJlc3VtZWlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIW9iajIucmVzdW1laWQpe1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG9iajJbJ3Jlc3VtZWlkJ11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VCYXNlSW5mbyhlLmRldGFpbC52YWx1ZSwgb2JqMikudGhlbihkYXRhPT57XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgICAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXZQYWdlLnVwZGF0ZSg1KVxyXG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmREYXRlQ2hhbmdlMTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0dGltZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZERhdGVDaGFuZ2UyOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FpbnRpbWUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W6K+B5LmmXHJcbiAgICBhc3luYyBnZXRKb2JJbmZvKHRva2VuLHRva2VuS2V5LHJlc3VtZWlkKSB7XHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMTBcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbixcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVzdW1laWRcIjogcmVzdW1laWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9XHJcblxyXG4gICAgLy/kv67mlLnooajljZXmlbDmja5cclxuICAgIGFzeW5jIGNoYW5nZUJhc2VJbmZvKG9iaixvYmoyKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBvYmoyXHJcbiAgICAgICAgbGV0IHJlc3VsdE9iaiA9IE9iamVjdC5hc3NpZ24oZGF0YSwgb2JqKTtcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAyMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3VsdE9ialxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH1cclxuICB9XHJcbiJdfQ==