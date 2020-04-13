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
            navigationBarTitleText: '求职意向'
        }, _this.data = {
            jobnature: [],
            postids: [],
            sitecity: [],
            expectsalarycode: [],
            poststime: [],
            functions: "",
            selfremark: "",
            a_jobnature: "",
            a_postids: "",
            a_sitecity: "",
            a_expectsalarycode: "",
            a_poststime: "",
            jobnaturestatus: true,
            postidsstatus: true,
            sitecitystatus: true,
            expectsalarycodestatus: true,
            poststimestatus: true,
            index1: "",
            index2: "",
            index3: "",
            index4: "",
            index5: "",
            jobApply: {},
            token: "",
            tokenKey: "",
            resumeid: '',
            jobintentcode: ''
        }, _this.methods = {
            // 提交表单--基本信息编辑新增
            formSubmit: function formSubmit(e) {
                wx.showLoading({
                    title: '加载中'
                });
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
                        prevPage.update(1);
                        wx.navigateBack({
                            delta: 1
                        });
                    } else {
                        _tip2.default.error(data.data.returnMsg);
                    }
                    wx.hideLoading();
                });
            },
            bindPickerChange1: function bindPickerChange1(e) {
                this.jobnaturestatus = false;
                this.index1 = e.detail.value;
                this.$apply();
            },
            bindPickerChange2: function bindPickerChange2(e) {
                this.postidsstatus = false;
                this.index2 = e.detail.value;
                this.$apply();
            },
            bindPickerChange3: function bindPickerChange3(e) {
                this.sitecitystatus = false;
                this.index3 = e.detail.value;
                this.$apply();
            },
            bindPickerChange4: function bindPickerChange4(e) {
                this.expectsalarycodestatus = false;
                this.index4 = e.detail.value;
                this.$apply();
            },
            bindPickerChange5: function bindPickerChange5(e) {
                this.poststimestatus = false;
                this.index5 = e.detail.value;
                this.$apply();
            }

            //获取简历基本信息
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BaseInfo, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            this.resumeid = options.resumeid;
            this.$apply();
            var arr = ['DICT_JOB_JOBTYPE', 'DICT_COMP_INDUSTRY', 'DICT_COMP_CITY', 'DICT_RESUME_ESC', 'DICT_RESUME_POSTTIME'];
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
                    that.getJobInfo(res.data.token, res.data.tokenKey, that.resumeid).then(function (json) {
                        if (json.data.returnCode == "AAAAAAA") {
                            var jobApply = JSON.parse(json.data.data);
                            that.jobApply = {
                                "jobnature": jobApply.jobnature,
                                "postids": jobApply.postids,
                                "sitecity": jobApply.sitecity,
                                "expectsalarycode": jobApply.expectsalarycode,
                                "poststime": jobApply.poststime,
                                "functions": jobApply.functions,
                                "selfremark": jobApply.selfremark
                            };
                            that.a_jobnature = jobApply.jobnature;
                            that.a_postids = jobApply.postids;
                            that.a_sitecity = jobApply.sitecity;
                            that.a_expectsalarycode = jobApply.expectsalarycode;
                            that.a_poststime = jobApply.poststime;
                            that.functions = jobApply.functions;
                            that.selfremark = jobApply.selfremark;
                            that.jobintentcode = jobApply.jobintentcode;
                            that.$apply();
                        } else {
                            _tip2.default.error(json.returnMsg);
                        }
                    });
                }
            });

            // 获取数据字典
            arr.forEach(function (item, index) {
                switch (item) {
                    case "DICT_COMP_CITY":
                        // 城市
                        _this2.getDict(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.sitecity = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.returnMsg);
                            }
                        });
                        break;
                    case "DICT_JOB_JOBTYPE":
                        // 工作类型
                        _this2.getDict(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.jobnature = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.returnMsg);
                            }
                        });
                        break;
                    case "DICT_COMP_INDUSTRY":
                        // 期望行业
                        _this2.getDict(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.postids = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.returnMsg);
                            }
                        });
                        break;
                    case "DICT_RESUME_ESC":
                        // 期望薪资
                        _this2.getDict(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.expectsalarycode = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.returnMsg);
                            }
                        });
                        break;
                    case "DICT_RESUME_POSTTIME":
                        // 到岗时间
                        _this2.getDict(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.poststime = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.returnMsg);
                            }
                        });
                        break;
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
                                            "transcode": "M0004",
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
                var data, Key, resultObj, json;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                data = obj2;

                                for (Key in obj) {
                                    if (!obj[Key]) {
                                        delete obj[Key];
                                    }
                                }
                                resultObj = Object.assign(data, this.jobApply, obj);

                                if (this.jobintentcode) {
                                    resultObj.jobintentcode = this.jobintentcode;
                                }
                                _context3.next = 6;
                                return _api2.default.getResumeInfo({
                                    query: {
                                        head: {
                                            "transcode": "M0014",
                                            "type": "h"
                                        },
                                        data: resultObj
                                    }
                                });

                            case 6:
                                json = _context3.sent;
                                return _context3.abrupt('return', json);

                            case 8:
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseInfo , 'pages/personal/job_want'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYl93YW50LmpzIl0sIm5hbWVzIjpbIkJhc2VJbmZvIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJqb2JuYXR1cmUiLCJwb3N0aWRzIiwic2l0ZWNpdHkiLCJleHBlY3RzYWxhcnljb2RlIiwicG9zdHN0aW1lIiwiZnVuY3Rpb25zIiwic2VsZnJlbWFyayIsImFfam9ibmF0dXJlIiwiYV9wb3N0aWRzIiwiYV9zaXRlY2l0eSIsImFfZXhwZWN0c2FsYXJ5Y29kZSIsImFfcG9zdHN0aW1lIiwiam9ibmF0dXJlc3RhdHVzIiwicG9zdGlkc3N0YXR1cyIsInNpdGVjaXR5c3RhdHVzIiwiZXhwZWN0c2FsYXJ5Y29kZXN0YXR1cyIsInBvc3RzdGltZXN0YXR1cyIsImluZGV4MSIsImluZGV4MiIsImluZGV4MyIsImluZGV4NCIsImluZGV4NSIsImpvYkFwcGx5IiwidG9rZW4iLCJ0b2tlbktleSIsInJlc3VtZWlkIiwiam9iaW50ZW50Y29kZSIsIm1ldGhvZHMiLCJmb3JtU3VibWl0IiwiZSIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm9iajIiLCJ0aGF0IiwiY2hhbmdlQmFzZUluZm8iLCJkZXRhaWwiLCJ2YWx1ZSIsInRoZW4iLCJyZXR1cm5Db2RlIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsImxlbmd0aCIsInVwZGF0ZSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiZXJyb3IiLCJyZXR1cm5Nc2ciLCJoaWRlTG9hZGluZyIsImJpbmRQaWNrZXJDaGFuZ2UxIiwiJGFwcGx5IiwiYmluZFBpY2tlckNoYW5nZTIiLCJiaW5kUGlja2VyQ2hhbmdlMyIsImJpbmRQaWNrZXJDaGFuZ2U0IiwiYmluZFBpY2tlckNoYW5nZTUiLCJvcHRpb25zIiwiYXJyIiwiZ2V0U3RvcmFnZSIsImtleSIsInN1Y2Nlc3MiLCJyZXMiLCJnZXRKb2JJbmZvIiwianNvbiIsIkpTT04iLCJwYXJzZSIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJnZXREaWN0IiwicHVzaCIsImxhYmVsIiwiZ2V0UmVzdW1lSW5mbyIsInF1ZXJ5IiwiaGVhZCIsImNvZGUiLCJnZXREaWN0RGF0YSIsIm9iaiIsIktleSIsInJlc3VsdE9iaiIsIk9iamVjdCIsImFzc2lnbiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUVuQkMsTSxHQUFTO0FBQ1RDLG9DQUF3QjtBQURmLFMsUUFJVEMsSSxHQUFPO0FBQ0hDLHVCQUFXLEVBRFI7QUFFSEMscUJBQVMsRUFGTjtBQUdIQyxzQkFBVSxFQUhQO0FBSUhDLDhCQUFrQixFQUpmO0FBS0hDLHVCQUFXLEVBTFI7QUFNSEMsdUJBQVcsRUFOUjtBQU9IQyx3QkFBVyxFQVBSO0FBUUhDLHlCQUFhLEVBUlY7QUFTSEMsdUJBQVcsRUFUUjtBQVVIQyx3QkFBWSxFQVZUO0FBV0hDLGdDQUFvQixFQVhqQjtBQVlIQyx5QkFBYSxFQVpWO0FBYUhDLDZCQUFpQixJQWJkO0FBY0hDLDJCQUFlLElBZFo7QUFlSEMsNEJBQWdCLElBZmI7QUFnQkhDLG9DQUF3QixJQWhCckI7QUFpQkhDLDZCQUFpQixJQWpCZDtBQWtCSEMsb0JBQVEsRUFsQkw7QUFtQkhDLG9CQUFRLEVBbkJMO0FBb0JIQyxvQkFBUSxFQXBCTDtBQXFCSEMsb0JBQVEsRUFyQkw7QUFzQkhDLG9CQUFRLEVBdEJMO0FBdUJIQyxzQkFBVSxFQXZCUDtBQXdCSEMsbUJBQU8sRUF4Qko7QUF5QkhDLHNCQUFVLEVBekJQO0FBMEJIQyxzQkFBUyxFQTFCTjtBQTJCSEMsMkJBQWM7QUEzQlgsUyxRQXlKUEMsTyxHQUFVO0FBQ047QUFDQUMsd0JBQVksb0JBQVNDLENBQVQsRUFBWTtBQUNwQkMsbUJBQUdDLFdBQUgsQ0FBZTtBQUNYQywyQkFBTztBQURJLGlCQUFmO0FBR0Esb0JBQUlDLE9BQU87QUFDUCw2QkFBUyxLQUFLVixLQURQO0FBRVAsZ0NB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QixFQUFtQ3VELEdBQW5DLEM7O0FBQ2hCLG9DQUFHLEtBQUtuRCxhQUFSLEVBQXNCO0FBQ2xCcUQsOENBQVVyRCxhQUFWLEdBQTBCLEtBQUtBLGFBQS9CO0FBQ0g7O3VDQUNrQixjQUFJOEMsYUFBSixDQUFrQjtBQUNyQ0MsMkNBQU87QUFDQ0MsOENBQU07QUFDRix5REFBYSxPQURYO0FBRUYsb0RBQVE7QUFGTix5Q0FEUDtBQUtDM0UsOENBQU1nRjtBQUxQO0FBRDhCLGlDQUFsQixDOzs7QUFBYmhCLG9DO2tFQVNDQSxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBOVF5QixlQUFLbUIsSTs7a0JBQXRCdEYsUSIsImZpbGUiOiJqb2Jfd2FudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuICBpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VJbmZvIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuXHJcbiAgICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5rGC6IGM5oSP5ZCRJyxcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGpvYm5hdHVyZTogW10sXHJcbiAgICAgICAgcG9zdGlkczogW10sXHJcbiAgICAgICAgc2l0ZWNpdHk6IFtdLFxyXG4gICAgICAgIGV4cGVjdHNhbGFyeWNvZGU6IFtdLFxyXG4gICAgICAgIHBvc3RzdGltZTogW10sXHJcbiAgICAgICAgZnVuY3Rpb25zOiBcIlwiLFxyXG4gICAgICAgIHNlbGZyZW1hcms6XCJcIixcclxuICAgICAgICBhX2pvYm5hdHVyZTogXCJcIixcclxuICAgICAgICBhX3Bvc3RpZHM6IFwiXCIsXHJcbiAgICAgICAgYV9zaXRlY2l0eTogXCJcIixcclxuICAgICAgICBhX2V4cGVjdHNhbGFyeWNvZGU6IFwiXCIsXHJcbiAgICAgICAgYV9wb3N0c3RpbWU6IFwiXCIsXHJcbiAgICAgICAgam9ibmF0dXJlc3RhdHVzOiB0cnVlLFxyXG4gICAgICAgIHBvc3RpZHNzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgc2l0ZWNpdHlzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgZXhwZWN0c2FsYXJ5Y29kZXN0YXR1czogdHJ1ZSxcclxuICAgICAgICBwb3N0c3RpbWVzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgaW5kZXgxOiBcIlwiLFxyXG4gICAgICAgIGluZGV4MjogXCJcIixcclxuICAgICAgICBpbmRleDM6IFwiXCIsXHJcbiAgICAgICAgaW5kZXg0OiBcIlwiLFxyXG4gICAgICAgIGluZGV4NTogXCJcIixcclxuICAgICAgICBqb2JBcHBseToge30sXHJcbiAgICAgICAgdG9rZW46IFwiXCIsXHJcbiAgICAgICAgdG9rZW5LZXk6IFwiXCIsXHJcbiAgICAgICAgcmVzdW1laWQ6JycsXHJcbiAgICAgICAgam9iaW50ZW50Y29kZTonJ1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bWVpZCA9IG9wdGlvbnMucmVzdW1laWQ7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICBjb25zdCBhcnIgPSBbJ0RJQ1RfSk9CX0pPQlRZUEUnLCdESUNUX0NPTVBfSU5EVVNUUlknLCdESUNUX0NPTVBfQ0lUWScsJ0RJQ1RfUkVTVU1FX0VTQycsJ0RJQ1RfUkVTVU1FX1BPU1RUSU1FJ11cclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyDojrflj5bnmbvlvZXkv6Hmga9cclxuICAgICAgICB3eC5nZXRTdG9yYWdlKHtcclxuICAgICAgICAgICAga2V5OiAnbG9naW5EYXRhJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRva2VuID0gcmVzLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRva2VuS2V5ID0gcmVzLmRhdGEudG9rZW5LZXk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgaWYob3B0aW9ucy5yZXN1bWVpZD09Jycpe1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v6I635Y+W5rGC6IGM5oSP5ZCRXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdldEpvYkluZm8ocmVzLmRhdGEudG9rZW4sIHJlcy5kYXRhLnRva2VuS2V5LCB0aGF0LnJlc3VtZWlkKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGpvYkFwcGx5ID0gSlNPTi5wYXJzZShqc29uLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5qb2JBcHBseSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqb2JuYXR1cmVcIjogam9iQXBwbHkuam9ibmF0dXJlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBvc3RpZHNcIjogam9iQXBwbHkucG9zdGlkcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzaXRlY2l0eVwiOiBqb2JBcHBseS5zaXRlY2l0eSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJleHBlY3RzYWxhcnljb2RlXCI6IGpvYkFwcGx5LmV4cGVjdHNhbGFyeWNvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicG9zdHN0aW1lXCI6IGpvYkFwcGx5LnBvc3RzdGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmdW5jdGlvbnNcIjogam9iQXBwbHkuZnVuY3Rpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNlbGZyZW1hcmtcIjogam9iQXBwbHkuc2VsZnJlbWFya1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFfam9ibmF0dXJlID0gam9iQXBwbHkuam9ibmF0dXJlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYV9wb3N0aWRzID0gam9iQXBwbHkucG9zdGlkcztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFfc2l0ZWNpdHkgPSBqb2JBcHBseS5zaXRlY2l0eTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFfZXhwZWN0c2FsYXJ5Y29kZSA9IGpvYkFwcGx5LmV4cGVjdHNhbGFyeWNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hX3Bvc3RzdGltZSA9IGpvYkFwcGx5LnBvc3RzdGltZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZ1bmN0aW9ucyA9IGpvYkFwcGx5LmZ1bmN0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNlbGZyZW1hcmsgPSBqb2JBcHBseS5zZWxmcmVtYXJrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuam9iaW50ZW50Y29kZSA9IGpvYkFwcGx5LmpvYmludGVudGNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLmVycm9yKGpzb24ucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgLy8g6I635Y+W5pWw5o2u5a2X5YW4XHJcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKChpdGVtLGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIFwiRElDVF9DT01QX0NJVFlcIjovLyDln47luIJcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGljdChpdGVtKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAganNvbi5kYXRhLmRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2l0ZWNpdHkgPSBhcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLmVycm9yKGpzb24ucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRJQ1RfSk9CX0pPQlRZUEVcIjovLyDlt6XkvZznsbvlnotcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGljdChpdGVtKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAganNvbi5kYXRhLmRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuam9ibmF0dXJlID0gYXJyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLnJldHVybk1zZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJESUNUX0NPTVBfSU5EVVNUUllcIjovLyDmnJ/mnJvooYzkuJpcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGljdChpdGVtKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAganNvbi5kYXRhLmRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucG9zdGlkcyA9IGFycjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRElDVF9SRVNVTUVfRVNDXCI6Ly8g5pyf5pyb6Jaq6LWEXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpY3QoaXRlbSkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIGpzb24uZGF0YS5kYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmV4cGVjdHNhbGFyeWNvZGUgPSBhcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLmVycm9yKGpzb24ucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRJQ1RfUkVTVU1FX1BPU1RUSU1FXCI6Ly8g5Yiw5bKX5pe26Ze0XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpY3QoaXRlbSkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIGpzb24uZGF0YS5kYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBvc3RzdGltZSA9IGFycjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAvLyDmj5DkuqTooajljZUtLeWfuuacrOS/oeaBr+e8lui+keaWsOWinlxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB2YXIgb2JqMiA9IHtcclxuICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhpcy50b2tlbixcclxuICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhpcy50b2tlbktleSxcclxuICAgICAgICAgICAgICAgIFwicmVzdW1laWRcIjogdGhpcy5yZXN1bWVpZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFvYmoyLnJlc3VtZWlkKXtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmoyWydyZXN1bWVpZCddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQmFzZUluZm8oZS5kZXRhaWwudmFsdWUsb2JqMikudGhlbihkYXRhPT57XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2UGFnZS51cGRhdGUoMSlcclxuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihkYXRhLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRQaWNrZXJDaGFuZ2UxOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuam9ibmF0dXJlc3RhdHVzID0gZmFsc2UgO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4MSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFBpY2tlckNoYW5nZTI6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wb3N0aWRzc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXgyID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGlja2VyQ2hhbmdlMzogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNpdGVjaXR5c3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXgzID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGlja2VyQ2hhbmdlNDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLmV4cGVjdHNhbGFyeWNvZGVzdGF0dXMgPSBmYWxzZSA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXg0ID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGlja2VyQ2hhbmdlNTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvc3RzdGltZXN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4NSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlueugOWOhuWfuuacrOS/oeaBr1xyXG4gICAgYXN5bmMgZ2V0Sm9iSW5mbyh0b2tlbiwgdG9rZW5LZXksIHJlc3VtZWlkKSB7XHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMDRcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbixcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVzdW1laWRcIjogcmVzdW1laWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlbDmja7lrZflhbhcclxuICAgIGFzeW5jIGdldERpY3QoY29kZSkge1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0RGljdERhdGEoe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJEQzAwMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImdyb3VwY29kZVwiOiBjb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwic2VsQWxsXCI6IFwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG4gICAgLy/kv67mlLnooajljZXmlbDmja5cclxuICAgIGFzeW5jIGNoYW5nZUJhc2VJbmZvKG9iaixvYmoyKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBvYmoyXHJcbiAgICAgICAgZm9yICh2YXIgS2V5IGluIG9iail7XHJcbiAgICAgICAgICAgIGlmKCFvYmpbS2V5XSl7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqW0tleV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzdWx0T2JqID0gT2JqZWN0LmFzc2lnbihkYXRhLCB0aGlzLmpvYkFwcGx5LCBvYmopO1xyXG4gICAgICAgIGlmKHRoaXMuam9iaW50ZW50Y29kZSl7XHJcbiAgICAgICAgICAgIHJlc3VsdE9iai5qb2JpbnRlbnRjb2RlID0gdGhpcy5qb2JpbnRlbnRjb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAxNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHJlc3VsdE9ialxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH1cclxuICB9XHJcbiJdfQ==