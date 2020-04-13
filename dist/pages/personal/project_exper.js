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
            navigationBarTitleText: '项目经验'
        }, _this.data = {
            projectname: '',
            companyname: '',
            starttime: '',
            endtime: '',
            projectremark: '',
            projectid: '',
            token: "",
            tokenKey: "",
            resumeid: ''
        }, _this.methods = {
            // 提交表单--基本信息编辑新增
            formSubmit: function formSubmit(e) {
                wx.showLoading({
                    title: '加载中'
                });
                if (this.projectid != "undefined") {
                    e.detail.value.projectid = this.projectid;
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
                        prevPage.update(4);
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
            this.projectid = options.projectid;
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
                                return item.projectid == options.projectid;
                            });
                            that.projectname = resultArr.projectname;
                            that.companyname = resultArr.companyname;
                            that.starttime = resultArr.starttime;
                            that.endtime = resultArr.endtime;
                            that.projectremark = resultArr.projectremark;
                            that.$apply();
                        } else {
                            _tip2.default.error(json.data.returnMsg);
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
                                            "transcode": "M0008",
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
                                            "transcode": "M0018",
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseInfo , 'pages/personal/project_exper'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RfZXhwZXIuanMiXSwibmFtZXMiOlsiQmFzZUluZm8iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInByb2plY3RuYW1lIiwiY29tcGFueW5hbWUiLCJzdGFydHRpbWUiLCJlbmR0aW1lIiwicHJvamVjdHJlbWFyayIsInByb2plY3RpZCIsInRva2VuIiwidG9rZW5LZXkiLCJyZXN1bWVpZCIsIm1ldGhvZHMiLCJmb3JtU3VibWl0IiwiZSIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImRldGFpbCIsInZhbHVlIiwib2JqMiIsInRoYXQiLCJjaGFuZ2VCYXNlSW5mbyIsInRoZW4iLCJyZXR1cm5Db2RlIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsImxlbmd0aCIsInVwZGF0ZSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiY29uc29sZSIsImxvZyIsImhpZGVMb2FkaW5nIiwiYmluZERhdGVDaGFuZ2UxIiwiJGFwcGx5IiwiYmluZERhdGVDaGFuZ2UyIiwib3B0aW9ucyIsImdldFN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwicmVzIiwiZ2V0Sm9iSW5mbyIsImpzb24iLCJqb2JFeHBlciIsIkpTT04iLCJwYXJzZSIsInJlc3VsdEFyciIsImZpbmQiLCJpdGVtIiwiZXJyb3IiLCJyZXR1cm5Nc2ciLCJnZXRSZXN1bWVJbmZvIiwicXVlcnkiLCJoZWFkIiwib2JqIiwicmVzdWx0T2JqIiwiT2JqZWN0IiwiYXNzaWduIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBRW5CQyxNLEdBQVM7QUFDVEMsb0NBQXdCO0FBRGYsUyxRQUlUQyxJLEdBQU87QUFDSEMseUJBQVksRUFEVDtBQUVIQyx5QkFBWSxFQUZUO0FBR0hDLHVCQUFVLEVBSFA7QUFJSEMscUJBQVEsRUFKTDtBQUtIQywy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Q29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbiAgaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlSW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mhueebrue7j+mqjCcsXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBwcm9qZWN0bmFtZTonJyxcclxuICAgICAgICBjb21wYW55bmFtZTonJyxcclxuICAgICAgICBzdGFydHRpbWU6JycsXHJcbiAgICAgICAgZW5kdGltZTonJyxcclxuICAgICAgICBwcm9qZWN0cmVtYXJrOicnLFxyXG4gICAgICAgIHByb2plY3RpZDonJyxcclxuICAgICAgICB0b2tlbjogXCJcIixcclxuICAgICAgICB0b2tlbktleTogXCJcIixcclxuICAgICAgICByZXN1bWVpZDonJ1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0aWQgPSBvcHRpb25zLnByb2plY3RpZDtcclxuICAgICAgICB0aGlzLnJlc3VtZWlkID0gb3B0aW9ucy5yZXN1bWVpZDtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyDojrflj5bnmbvlvZXkv6Hmga9cclxuICAgICAgICB3eC5nZXRTdG9yYWdlKHtcclxuICAgICAgICAgICAga2V5OiAnbG9naW5EYXRhJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRva2VuID0gcmVzLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRva2VuS2V5ID0gcmVzLmRhdGEudG9rZW5LZXk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgaWYob3B0aW9ucy5yZXN1bWVpZD09Jycpe1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v6I635Y+W5rGC6IGM5oSP5ZCRXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdldEpvYkluZm8odGhhdC50b2tlbix0aGF0LnRva2VuS2V5LHRoYXQucmVzdW1laWQpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqb2JFeHBlciA9IEpTT04ucGFyc2UoanNvbi5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0QXJyID0gam9iRXhwZXIuZmluZChpdGVtID0+IGl0ZW0ucHJvamVjdGlkID09IG9wdGlvbnMucHJvamVjdGlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByb2plY3RuYW1lID0gcmVzdWx0QXJyLnByb2plY3RuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNvbXBhbnluYW1lID0gcmVzdWx0QXJyLmNvbXBhbnluYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YXJ0dGltZSA9IHJlc3VsdEFyci5zdGFydHRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kdGltZSA9IHJlc3VsdEFyci5lbmR0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByb2plY3RyZW1hcmsgPSByZXN1bHRBcnIucHJvamVjdHJlbWFyaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLnJldHVybk1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIC8vIOaPkOS6pOihqOWNlS0t5Z+65pys5L+h5oGv57yW6L6R5paw5aKeXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvamVjdGlkICE9IFwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICAgICAgZS5kZXRhaWwudmFsdWUucHJvamVjdGlkID0gdGhpcy5wcm9qZWN0aWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG9iajIgPSB7XHJcbiAgICAgICAgICAgICAgICBcInRva2VuXCI6IHRoaXMudG9rZW4sXHJcbiAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRoaXMudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICBcInJlc3VtZWlkXCI6IHRoaXMucmVzdW1laWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighb2JqMi5yZXN1bWVpZCl7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqMlsncmVzdW1laWQnXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUJhc2VJbmZvKGUuZGV0YWlsLnZhbHVlLG9iajIpLnRoZW4oZGF0YT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlBhZ2UudXBkYXRlKDQpXHJcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZERhdGVDaGFuZ2UxOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnR0aW1lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRGF0ZUNoYW5nZTI6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmR0aW1lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluW3peS9nOe7j+WOhlxyXG4gICAgYXN5bmMgZ2V0Sm9iSW5mbyh0b2tlbix0b2tlbktleSxyZXN1bWVpZCkge1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0UmVzdW1lSW5mbyh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDA4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0b2tlbktleSxcclxuICAgICAgICAgICAgICAgICAgICBcInJlc3VtZWlkXCI6IHJlc3VtZWlkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5L+u5pS56KGo5Y2V5pWw5o2uXHJcbiAgICBhc3luYyBjaGFuZ2VCYXNlSW5mbyhvYmosb2JqMikge1xyXG4gICAgICAgIGxldCBkYXRhID0gb2JqMlxyXG4gICAgICAgIGxldCByZXN1bHRPYmogPSBPYmplY3QuYXNzaWduKGRhdGEsIG9iaik7XHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMThcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHRPYmpcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=