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
            navigationBarTitleText: '教育经历'
        }, _this.data = {
            school: '',
            specialtyid: '',
            starttime: '',
            endtime: '',
            educationbg: [],
            a_educationbg: '',
            educationbgstatus: true,
            index: '',
            educationid: '',
            token: "",
            tokenKey: "",
            resumeid: ''
        }, _this.methods = {
            // 提交表单--基本信息编辑新增
            formSubmit: function formSubmit(e) {
                wx.showLoading({
                    title: '加载中'
                });
                if (this.educationid != "undefined") {
                    e.detail.value.educationid = this.educationid;
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
                        prevPage.update(3);
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
            },
            bindPickerChange: function bindPickerChange(e) {
                this.educationbgstatus = false;
                this.index = e.detail.value;
                this.$apply();
            }

            //获取教育经历
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BaseInfo, [{
        key: 'onLoad',
        value: function onLoad(options) {
            this.educationid = options.educationid;
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
                                return item.educationid == options.educationid;
                            });
                            that.school = resultArr.school;
                            that.specialtyid = resultArr.specialtyid;
                            that.starttime = resultArr.starttime;
                            that.endtime = resultArr.endtime;
                            that.a_educationbg = resultArr.educationbg;
                            that.$apply();
                        } else {
                            _tip2.default.error(json.returnMsg);
                        }
                    });
                }
            });

            // 获取数据字典数据
            this.getDict("DICT_JOB_EDU").then(function (json) {
                if (json.data.returnCode == "AAAAAAA") {
                    var arr = [];
                    json.data.data.forEach(function (item, index) {
                        arr.push(item.label);
                    });
                    that.educationbg = arr;
                    that.$apply();
                } else {
                    _tip2.default.error(json.returnMsg);
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
                                            "transcode": "M0006",
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

        //获取数据字典

    }, {
        key: 'getDict',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(code) {
                var json;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _api2.default.getDictData({
                                    query: {
                                        head: {
                                            "transcode": "DC001",
                                            "type": "h"
                                        },
                                        data: {
                                            "groupcode": code,
                                            "selAll": "true"
                                        }
                                    }
                                });

                            case 2:
                                json = _context2.sent;
                                return _context2.abrupt('return', json);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getDict(_x4) {
                return _ref3.apply(this, arguments);
            }

            return getDict;
        }()

        //修改表单数据

    }, {
        key: 'changeBaseInfo',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(obj, obj2) {
                var data, resultObj, json;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                data = obj2;
                                resultObj = Object.assign(data, obj);
                                _context3.next = 4;
                                return _api2.default.getResumeInfo({
                                    query: {
                                        head: {
                                            "transcode": "M0016",
                                            "type": "h"
                                        },
                                        data: resultObj
                                    }
                                });

                            case 4:
                                json = _context3.sent;
                                return _context3.abrupt('return', json);

                            case 6:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function changeBaseInfo(_x5, _x6) {
                return _ref4.apply(this, arguments);
            }

            return changeBaseInfo;
        }()
    }]);

    return BaseInfo;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseInfo , 'pages/personal/edu_exper'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkdV9leHBlci5qcyJdLCJuYW1lcyI6WyJCYXNlSW5mbyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwic2Nob29sIiwic3BlY2lhbHR5aWQiLCJzdGFydHRpbWUiLCJlbmR0aW1lIiwiZWR1Y2F0aW9uYmciLCJhX2VkdWNhdGlvbmJnIiwiZWR1Y2F0aW9uYmdzdGF0dXMiLCJpbmRleCIsImVkdWNhdGlvbmlkIiwidG9rZW4iLCJ0b2tlbktleSIsInJlc3VtZWlkIiwibWV0aG9kcyIsImZvcm1TdWJtaXQiLCJlIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwiZGV0YWlsIiwidmFsdWUiLCJvYmoyIiwidGhhdCIsImNoYW5nZUJhc2VJbmZvIiwidGhlbiIsInJldHVybkNvZGUiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwibGVuZ3RoIiwidXBkYXRlIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjb25zb2xlIiwibG9nIiwiaGlkZUxvYWRpbmciLCJiaW5kRGF0ZUNoYW5nZTEiLCIkYXBwbHkiLCJiaW5kRGF0ZUNoYW5nZTIiLCJiaW5kUGlja2VyQ2hhbmdlIiwib3B0aW9ucyIsImdldFN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwicmVzIiwiZ2V0Sm9iSW5mbyIsImpzb24iLCJqb2JFeHBlciIsIkpTT04iLCJwYXJzZSIsInJlc3VsdEFyciIsImZpbmQiLCJpdGVtIiwiZXJyb3IiLCJyZXR1cm5Nc2ciLCJnZXREaWN0IiwiYXJyIiwiZm9yRWFjaCIsInB1c2giLCJsYWJlbCIsImdldFJlc3VtZUluZm8iLCJxdWVyeSIsImhlYWQiLCJjb2RlIiwiZ2V0RGljdERhdGEiLCJvYmoiLCJyZXN1bHRPYmoiLCJPYmplY3QiLCJhc3NpZ24iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7Ozs4TEFFbkJD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OlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG4gIGltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUluZm8gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG5cclxuICAgIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlZnogrLnu4/ljoYnLFxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgc2Nob29sOicnLFxyXG4gICAgICAgIHNwZWNpYWx0eWlkOicnLFxyXG4gICAgICAgIHN0YXJ0dGltZTonJyxcclxuICAgICAgICBlbmR0aW1lOicnLFxyXG4gICAgICAgIGVkdWNhdGlvbmJnOiBbXSxcclxuICAgICAgICBhX2VkdWNhdGlvbmJnOiAnJyxcclxuICAgICAgICBlZHVjYXRpb25iZ3N0YXR1czogdHJ1ZSxcclxuICAgICAgICBpbmRleDonJyxcclxuICAgICAgICBlZHVjYXRpb25pZDonJyxcclxuICAgICAgICB0b2tlbjogXCJcIixcclxuICAgICAgICB0b2tlbktleTogXCJcIixcclxuICAgICAgICByZXN1bWVpZDonJ1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5lZHVjYXRpb25pZCA9IG9wdGlvbnMuZWR1Y2F0aW9uaWQ7XHJcbiAgICAgICAgdGhpcy5yZXN1bWVpZCA9IG9wdGlvbnMucmVzdW1laWQ7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyDojrflj5bnmbvlvZXkv6Hmga9cclxuICAgICAgICB3eC5nZXRTdG9yYWdlKHtcclxuICAgICAgICAgICAga2V5OiAnbG9naW5EYXRhJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRva2VuID0gcmVzLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRva2VuS2V5ID0gcmVzLmRhdGEudG9rZW5LZXk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgLy/ojrflj5bmsYLogYzmhI/lkJFcclxuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMucmVzdW1laWQ9PScnKXtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdldEpvYkluZm8odGhhdC50b2tlbix0aGF0LnRva2VuS2V5LHRoYXQucmVzdW1laWQpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqb2JFeHBlciA9IEpTT04ucGFyc2UoanNvbi5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0QXJyID0gam9iRXhwZXIuZmluZChpdGVtID0+IGl0ZW0uZWR1Y2F0aW9uaWQgPT0gb3B0aW9ucy5lZHVjYXRpb25pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zY2hvb2wgPSByZXN1bHRBcnIuc2Nob29sO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNwZWNpYWx0eWlkID0gcmVzdWx0QXJyLnNwZWNpYWx0eWlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YXJ0dGltZSA9IHJlc3VsdEFyci5zdGFydHRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kdGltZSA9IHJlc3VsdEFyci5lbmR0aW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFfZWR1Y2F0aW9uYmcgPSByZXN1bHRBcnIuZWR1Y2F0aW9uYmc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlwLmVycm9yKGpzb24ucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8g6I635Y+W5pWw5o2u5a2X5YW45pWw5o2uXHJcbiAgICAgICAgdGhpcy5nZXREaWN0KFwiRElDVF9KT0JfRURVXCIpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyciA9IFtdXHJcbiAgICAgICAgICAgICAgICBqc29uLmRhdGEuZGF0YS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lZHVjYXRpb25iZyA9IGFycjtcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIC8vIOaPkOS6pOihqOWNlS0t5Z+65pys5L+h5oGv57yW6L6R5paw5aKeXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmKHRoaXMuZWR1Y2F0aW9uaWQgIT0gXCJ1bmRlZmluZWRcIil7XHJcbiAgICAgICAgICAgICAgICBlLmRldGFpbC52YWx1ZS5lZHVjYXRpb25pZCA9IHRoaXMuZWR1Y2F0aW9uaWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG9iajIgPSB7XHJcbiAgICAgICAgICAgICAgICBcInRva2VuXCI6IHRoaXMudG9rZW4sXHJcbiAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRoaXMudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICBcInJlc3VtZWlkXCI6IHRoaXMucmVzdW1laWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighb2JqMi5yZXN1bWVpZCl7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqMlsncmVzdW1laWQnXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUJhc2VJbmZvKGUuZGV0YWlsLnZhbHVlLG9iajIpLnRoZW4oZGF0YT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlBhZ2UudXBkYXRlKDMpXHJcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZERhdGVDaGFuZ2UxOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnR0aW1lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRGF0ZUNoYW5nZTI6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmR0aW1lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGlja2VyQ2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWR1Y2F0aW9uYmdzdGF0dXMgPSBmYWxzZSA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5pWZ6IKy57uP5Y6GXHJcbiAgICBhc3luYyBnZXRKb2JJbmZvKHRva2VuLHRva2VuS2V5LHJlc3VtZWlkKSB7XHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMDZcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbixcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVzdW1laWRcIjogcmVzdW1laWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlbDmja7lrZflhbhcclxuICAgIGFzeW5jIGdldERpY3QoY29kZSkge1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0RGljdERhdGEoe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJEQzAwMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImdyb3VwY29kZVwiOiBjb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic2VsQWxsXCI6IFwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5L+u5pS56KGo5Y2V5pWw5o2uXHJcbiAgICBhc3luYyBjaGFuZ2VCYXNlSW5mbyhvYmosb2JqMikge1xyXG4gICAgICAgIGxldCBkYXRhID0gb2JqMlxyXG4gICAgICAgIGxldCByZXN1bHRPYmogPSBPYmplY3QuYXNzaWduKGRhdGEsIG9iaik7XHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMTZcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXN1bHRPYmpcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=