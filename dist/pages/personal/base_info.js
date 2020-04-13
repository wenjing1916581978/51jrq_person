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
            navigationBarTitleText: '基本信息'
        }, _this.components = {}, _this.data = {
            username: '',
            resumename: '',
            workyears: [],
            borndate: '',
            telephone: '',
            index: '',
            index2: '',
            index3: '',
            index4: '',
            index5: '',
            index6: '',
            email: "",
            jobstatus: [],
            marital: [],
            city: [],
            sex: [],
            baseInfo: {},
            address: '',
            // ============
            workcity: '',
            workcitystatus: true,
            a_workyears: '',
            workyearsstatus: true,
            a_jobstatus: '',
            jobstatusstatus: true,
            livecity: '',
            livecitystatus: true,
            a_marital: '',
            maritalstatus: true,
            a_sex: '',
            sexstatus: true,
            token: '',
            tokenKey: '',
            resumeid: ''
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
                        // wx.redirectTo({
                        //     url: `resume?resumeid=${data.data.resumeid ||that.resumeid}`
                        // })
                        console.log('保存', data);

                        var pages = getCurrentPages();
                        var prevPage = pages[pages.length - 2];

                        if (data.data.resumeid) {
                            prevPage.update(0, data.data.resumeid);
                        } else {
                            prevPage.update(0);
                        }
                        wx.navigateBack({
                            delta: 1
                        });
                    } else {
                        console.log(data);
                    }
                    wx.hideLoading();
                });
            },
            bindDateChange: function bindDateChange(e) {
                this.borndate = e.detail.value;
                this.$apply();
            },
            bindPickerChange: function bindPickerChange(e) {
                this.workyearsstatus = false;
                this.index = e.detail.value;
                this.$apply();
            },
            bindPickerChange2: function bindPickerChange2(e) {
                this.jobstatusstatus = false;
                this.index2 = e.detail.value;
                this.$apply();
            },
            bindPickerChange3: function bindPickerChange3(e) {
                this.maritalstatus = false;
                this.index3 = e.detail.value;
                this.$apply();
            },
            bindPickerChange4: function bindPickerChange4(e) {
                this.workcitystatus = false;
                this.index4 = e.detail.value;
                this.$apply();
            },
            bindPickerChange5: function bindPickerChange5(e) {
                this.livecitystatus = false;
                this.index5 = e.detail.value;
                this.$apply();
            },
            bindPickerChange6: function bindPickerChange6(e) {
                this.sexstatus = false;
                this.index6 = e.detail.value;
                this.$apply();
            }

        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BaseInfo, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            this.resumeid = options.resumeid;
            this.$apply();
            // 获取登录信息
            var that = this;
            wx.getStorage({
                key: 'loginData',
                success: function success(res) {
                    that.token = res.data.token;
                    that.tokenKey = res.data.tokenKey;
                    if (options.resumeid == '') {
                        return false;
                    }
                    //获取简历基本信息
                    that.getResumeInfo(options.resumeid, res.data.token, res.data.tokenKey).then(function (json) {
                        if (json.data.returnCode == "AAAAAAA") {
                            var baseInfo = JSON.parse(json.data.data);
                            that.baseInfo = {
                                "username": baseInfo.username,
                                "resumename": baseInfo.newresumename,
                                "borndate": baseInfo.borndate,
                                "address": baseInfo.address,
                                "workyears": baseInfo.workyears,
                                "jobstatus": baseInfo.jobstatus,
                                "livecityid": baseInfo.livecityid,
                                "marital": baseInfo.marital,
                                "telephone": baseInfo.telephone,
                                "email": baseInfo.email,
                                "sex": baseInfo.sex
                            };
                            that.username = baseInfo.username;
                            that.resumename = baseInfo.newresumename;
                            that.borndate = baseInfo.borndate;
                            that.address = baseInfo.address;
                            that.a_workyears = baseInfo.workyears;
                            that.a_jobstatus = baseInfo.jobstatus;
                            that.livecity = baseInfo.livecityid;
                            that.a_marital = baseInfo.marital;
                            that.a_sex = baseInfo.sex;
                            that.telephone = baseInfo.telephone;
                            that.email = baseInfo.email;
                            that.$apply();
                        } else {
                            _tip2.default.error(json.returnMsg);
                        }
                    });
                }
            });
            // 获取数据字典
            var arr = ["DICT_COMP_CITY", "DICT_RESUME_WORKYEAR", "DICT_RESUME_JOBSTATU", "DICT_RESUME_WEDDING", "DICT_BASE_SEX"];
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
                                that.city = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.returnMsg);
                            }
                        });
                        break;
                    case "DICT_RESUME_WORKYEAR":
                        // 工作年限
                        _this2.getDict(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.workyears = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.returnMsg);
                            }
                        });
                        break;
                    case "DICT_RESUME_JOBSTATU":
                        // 工作状况
                        _this2.getDict(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.jobstatus = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.returnMsg);
                            }
                        });
                        break;
                    case "DICT_RESUME_WEDDING":
                        // 婚姻状况
                        _this2.getDict(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.marital = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.returnMsg);
                            }
                        });
                        break;
                    case "DICT_BASE_SEX":
                        // 性别
                        _this2.getDict(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.sex = arr;
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
        key: 'getDict',


        //获取数据字典
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(code) {
                var json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
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
                                json = _context.sent;
                                return _context.abrupt('return', json);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getDict(_x) {
                return _ref2.apply(this, arguments);
            }

            return getDict;
        }()

        //获取简历基本信息

    }, {
        key: 'getResumeInfo',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resumeid, token, tokenKey) {
                var json;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _api2.default.getResumeInfo({
                                    query: {
                                        head: {
                                            "transcode": "M0003",
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
                                json = _context2.sent;
                                return _context2.abrupt('return', json);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getResumeInfo(_x2, _x3, _x4) {
                return _ref3.apply(this, arguments);
            }

            return getResumeInfo;
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
                                resultObj = Object.assign(data, this.baseInfo, obj);
                                _context3.next = 5;
                                return _api2.default.getResumeInfo({
                                    query: {
                                        head: {
                                            "transcode": "M0013",
                                            "type": "h"
                                        },
                                        data: resultObj
                                    }
                                });

                            case 5:
                                json = _context3.sent;
                                return _context3.abrupt('return', json);

                            case 7:
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseInfo , 'pages/personal/base_info'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2VfaW5mby5qcyJdLCJuYW1lcyI6WyJCYXNlSW5mbyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiZGF0YSIsInVzZXJuYW1lIiwicmVzdW1lbmFtZSIsIndvcmt5ZWFycyIsImJvcm5kYXRlIiwidGVsZXBob25lIiwiaW5kZXgiLCJpbmRleDIiLCJpbmRleDMiLCJpbmRleDQiLCJpbmRleDUiLCJpbmRleDYiLCJlbWFpbCIsImpvYnN0YXR1cyIsIm1hcml0YWwiLCJjaXR5Iiwic2V4IiwiYmFzZUluZm8iLCJhZGRyZXNzIiwid29ya2NpdHkiLCJ3b3JrY2l0eXN0YXR1cyIsImFfd29ya3llYXJzIiwid29ya3llYXJzc3RhdHVzIiwiYV9qb2JzdGF0dXMiLCJqb2JzdGF0dXNzdGF0dXMiLCJsaXZlY2l0eSIsImxpdmVjaXR5c3RhdHVzIiwiYV9tYXJpdGFsIiwibWFyaXRhbHN0YXR1cyIsImFfc2V4Iiwic2V4c3RhdHVzIiwidG9rZW4iLCJ0b2tlbktleSIsInJlc3VtZWlkIiwibWV0aG9kcyIsImZvcm1TdWJtaXQiLCJlIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwib2JqMiIsInRoYXQiLCJjaGFuZ2VCYXNlSW5mbyIsImRldGFpbCIsInZhbHVlIiwidGhlbiIsInJldHVybkNvZGUiLCJjb25zb2xlIiwibG9nIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsImxlbmd0aCIsInVwZGF0ZSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiaGlkZUxvYWRpbmciLCJiaW5kRGF0ZUNoYW5nZSIsIiRhcHBseSIsImJpbmRQaWNrZXJDaGFuZ2UiLCJiaW5kUGlja2VyQ2hhbmdlMiIsImJpbmRQaWNrZXJDaGFuZ2UzIiwiYmluZFBpY2tlckNoYW5nZTQiLCJiaW5kUGlja2VyQ2hhbmdlNSIsImJpbmRQaWNrZXJDaGFuZ2U2Iiwib3B0aW9ucyIsImdldFN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwicmVzIiwiZ2V0UmVzdW1lSW5mbyIsImpzb24iLCJKU09OIiwicGFyc2UiLCJuZXdyZXN1bWVuYW1lIiwibGl2ZWNpdHlpZCIsImVycm9yIiwicmV0dXJuTXNnIiwiYXJyIiwiZm9yRWFjaCIsIml0ZW0iLCJnZXREaWN0IiwicHVzaCIsImxhYmVsIiwiY29kZSIsImdldERpY3REYXRhIiwicXVlcnkiLCJoZWFkIiwib2JqIiwiS2V5IiwicmVzdWx0T2JqIiwiT2JqZWN0IiwiYXNzaWduIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBRWpCQyxNLEdBQVM7QUFDUEMsb0NBQXdCO0FBRGpCLFMsUUFJVEMsVSxHQUFhLEUsUUFHZEMsSSxHQUFPO0FBQ0pDLHNCQUFVLEVBRE47QUFFSkMsd0JBQVcsRUFGUDtBQUdKQyx1QkFBVSxFQUhOO0FBSUpDLHNCQUFVLEVBSk47QUFLSkMsdUJBQVUsRUFMTjtBQU1KQyxtQkFBTyxFQU5IO0FBT0pDLG9CQUFRLEVBUEo7QUFRSkMsb0JBQVEsRUFSSjtBQVNKQyxvQkFBUSxFQVRKO0FBVUpDLG9CQUFRLEVBVko7QUFXSkMsb0JBQVEsRUFYSjtBQVlKQyxtQkFBTyxFQVpIO0FBYUpDLHVCQUFXLEVBYlA7QUFjSkMscUJBQVEsRUFkSjtBQWVKQyxrQkFBTSxFQWZGO0FBZ0JKQyxpQkFBSyxFQWhCRDtBQWlCSkMsc0JBQVMsRUFqQkw7QUFrQkpDLHFCQUFTLEVBbEJMO0FBbUJKO0FBQ0FDLHNCQUFTLEVBcEJMO0FBcUJKQyw0QkFBZSxJQXJCWDtBQXNCSkMseUJBQVksRUF0QlI7QUF1QkpDLDZCQUFnQixJQXZCWjtBQXdCSkMseUJBQVksRUF4QlI7QUF5QkpDLDZCQUFnQixJQXpCWjtBQTBCSkMsc0JBQVMsRUExQkw7QUEyQkpDLDRCQUFlLElBM0JYO0FBNEJKQyx1QkFBVSxFQTVCTjtBQTZCSkMsMkJBQWMsSUE3QlY7QUE4QkpDLG1CQUFNLEVBOUJGO0FB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Rix5REFBYSxPQURYO0FBRUYsb0RBQVE7QUFGTix5Q0FEUDtBQUtDdkYsOENBQU0wRjtBQUxQO0FBRDhCLGlDQUFsQixDOzs7QUFBYm5CLG9DO2tFQVNDQSxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBN1N5QixlQUFLc0IsSTs7a0JBQXRCakcsUSIsImZpbGUiOiJiYXNlX2luZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbiAgaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlSW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gICAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WfuuacrOS/oeaBrycsXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgZGF0YSA9IHtcclxuICAgICAgICB1c2VybmFtZTogJycsXHJcbiAgICAgICAgcmVzdW1lbmFtZTonJyxcclxuICAgICAgICB3b3JreWVhcnM6W10sXHJcbiAgICAgICAgYm9ybmRhdGU6ICcnLFxyXG4gICAgICAgIHRlbGVwaG9uZTonJyxcclxuICAgICAgICBpbmRleDogJycsXHJcbiAgICAgICAgaW5kZXgyOiAnJyxcclxuICAgICAgICBpbmRleDM6ICcnLFxyXG4gICAgICAgIGluZGV4NDogJycsXHJcbiAgICAgICAgaW5kZXg1OiAnJyxcclxuICAgICAgICBpbmRleDY6ICcnLFxyXG4gICAgICAgIGVtYWlsOiBcIlwiLFxyXG4gICAgICAgIGpvYnN0YXR1czogW10sXHJcbiAgICAgICAgbWFyaXRhbDpbXSxcclxuICAgICAgICBjaXR5OiBbXSxcclxuICAgICAgICBzZXg6IFtdLFxyXG4gICAgICAgIGJhc2VJbmZvOnt9LFxyXG4gICAgICAgIGFkZHJlc3M6ICcnLFxyXG4gICAgICAgIC8vID09PT09PT09PT09PVxyXG4gICAgICAgIHdvcmtjaXR5OicnLFxyXG4gICAgICAgIHdvcmtjaXR5c3RhdHVzOnRydWUsXHJcbiAgICAgICAgYV93b3JreWVhcnM6JycsXHJcbiAgICAgICAgd29ya3llYXJzc3RhdHVzOnRydWUsXHJcbiAgICAgICAgYV9qb2JzdGF0dXM6JycsXHJcbiAgICAgICAgam9ic3RhdHVzc3RhdHVzOnRydWUsXHJcbiAgICAgICAgbGl2ZWNpdHk6JycsXHJcbiAgICAgICAgbGl2ZWNpdHlzdGF0dXM6dHJ1ZSxcclxuICAgICAgICBhX21hcml0YWw6JycsXHJcbiAgICAgICAgbWFyaXRhbHN0YXR1czp0cnVlLFxyXG4gICAgICAgIGFfc2V4OicnLFxyXG4gICAgICAgIHNleHN0YXR1czp0cnVlLFxyXG4gICAgICAgIHRva2VuOicnLFxyXG4gICAgICAgIHRva2VuS2V5OicnLFxyXG4gICAgICAgIHJlc3VtZWlkOiAnJ1xyXG4gICAgfVxyXG5cclxuICAgICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLnJlc3VtZWlkID0gb3B0aW9ucy5yZXN1bWVpZDtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIC8vIOiOt+WPlueZu+W9leS/oeaBr1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHd4LmdldFN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICBrZXk6ICdsb2dpbkRhdGEnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQudG9rZW4gPSByZXMuZGF0YS50b2tlbjtcclxuICAgICAgICAgICAgICAgIHRoYXQudG9rZW5LZXkgPSByZXMuZGF0YS50b2tlbktleTtcclxuICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMucmVzdW1laWQ9PScnKXtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+iOt+WPlueugOWOhuWfuuacrOS/oeaBr1xyXG4gICAgICAgICAgICAgICAgdGhhdC5nZXRSZXN1bWVJbmZvKG9wdGlvbnMucmVzdW1laWQscmVzLmRhdGEudG9rZW4scmVzLmRhdGEudG9rZW5LZXkpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiYXNlSW5mbyA9IEpTT04ucGFyc2UoanNvbi5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJhc2VJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBiYXNlSW5mby51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzdW1lbmFtZVwiOiBiYXNlSW5mby5uZXdyZXN1bWVuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJib3JuZGF0ZVwiOiBiYXNlSW5mby5ib3JuZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiBiYXNlSW5mby5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3b3JreWVhcnNcIjogYmFzZUluZm8ud29ya3llYXJzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqb2JzdGF0dXNcIjogYmFzZUluZm8uam9ic3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaXZlY2l0eWlkXCI6IGJhc2VJbmZvLmxpdmVjaXR5aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1hcml0YWxcIjogYmFzZUluZm8ubWFyaXRhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGVsZXBob25lXCI6IGJhc2VJbmZvLnRlbGVwaG9uZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW1haWxcIjogYmFzZUluZm8uZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInNleFwiOiBiYXNlSW5mby5zZXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVzZXJuYW1lID0gYmFzZUluZm8udXNlcm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVzdW1lbmFtZSA9IGJhc2VJbmZvLm5ld3Jlc3VtZW5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYm9ybmRhdGUgPSBiYXNlSW5mby5ib3JuZGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hZGRyZXNzID0gYmFzZUluZm8uYWRkcmVzcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hX3dvcmt5ZWFycyA9IGJhc2VJbmZvLndvcmt5ZWFycztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hX2pvYnN0YXR1cyA9IGJhc2VJbmZvLmpvYnN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5saXZlY2l0eSA9IGJhc2VJbmZvLmxpdmVjaXR5aWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYV9tYXJpdGFsID0gYmFzZUluZm8ubWFyaXRhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hX3NleCA9IGJhc2VJbmZvLnNleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50ZWxlcGhvbmUgPSBiYXNlSW5mby50ZWxlcGhvbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW1haWwgPSBiYXNlSW5mby5lbWFpbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAvLyDojrflj5bmlbDmja7lrZflhbhcclxuICAgICAgICAgICAgY29uc3QgYXJyID0gW1wiRElDVF9DT01QX0NJVFlcIixcIkRJQ1RfUkVTVU1FX1dPUktZRUFSXCIsXCJESUNUX1JFU1VNRV9KT0JTVEFUVVwiLFwiRElDVF9SRVNVTUVfV0VERElOR1wiLFwiRElDVF9CQVNFX1NFWFwiXVxyXG4gICAgICAgICAgICBhcnIuZm9yRWFjaCgoaXRlbSxpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBcIkRJQ1RfQ09NUF9DSVRZXCI6Ly8g5Z+O5biCXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpY3QoaXRlbSkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIGpzb24uZGF0YS5kYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNpdHkgPSBhcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLmVycm9yKGpzb24ucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRJQ1RfUkVTVU1FX1dPUktZRUFSXCI6Ly8g5bel5L2c5bm06ZmQXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpY3QoaXRlbSkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIGpzb24uZGF0YS5kYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lndvcmt5ZWFycyA9IGFycjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRElDVF9SRVNVTUVfSk9CU1RBVFVcIjovLyDlt6XkvZznirblhrVcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGljdChpdGVtKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAganNvbi5kYXRhLmRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuam9ic3RhdHVzID0gYXJyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLnJldHVybk1zZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJESUNUX1JFU1VNRV9XRURESU5HXCI6Ly8g5ama5ae754q25Ya1XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpY3QoaXRlbSkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnIgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgIGpzb24uZGF0YS5kYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1hcml0YWwgPSBhcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLmVycm9yKGpzb24ucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRJQ1RfQkFTRV9TRVhcIjovLyDmgKfliKtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGljdChpdGVtKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAganNvbi5kYXRhLmRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2V4ID0gYXJyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLnJldHVybk1zZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIC8vIOaPkOS6pOihqOWNlS0t5Z+65pys5L+h5oGv57yW6L6R5paw5aKeXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB2YXIgb2JqMiA9IHtcclxuICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhpcy50b2tlbixcclxuICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhpcy50b2tlbktleSxcclxuICAgICAgICAgICAgICAgIFwicmVzdW1laWRcIjogdGhpcy5yZXN1bWVpZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCFvYmoyLnJlc3VtZWlkKXtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmoyWydyZXN1bWVpZCddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlQmFzZUluZm8oZS5kZXRhaWwudmFsdWUsb2JqMikudGhlbihkYXRhPT57XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdXJsOiBgcmVzdW1lP3Jlc3VtZWlkPSR7ZGF0YS5kYXRhLnJlc3VtZWlkIHx8dGhhdC5yZXN1bWVpZH1gXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5L+d5a2YJyxkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZGF0YS5yZXN1bWVpZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZQYWdlLnVwZGF0ZSgwLGRhdGEuZGF0YS5yZXN1bWVpZClcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlBhZ2UudXBkYXRlKDApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmREYXRlQ2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYm9ybmRhdGUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRQaWNrZXJDaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhpcy53b3JreWVhcnNzdGF0dXMgPSBmYWxzZSA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRQaWNrZXJDaGFuZ2UyOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuam9ic3RhdHVzc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXgyID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGlja2VyQ2hhbmdlMzogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcml0YWxzdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbmRleDMgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRQaWNrZXJDaGFuZ2U0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29ya2NpdHlzdGF0dXMgPSBmYWxzZSA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXg0ID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGlja2VyQ2hhbmdlNTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLmxpdmVjaXR5c3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXg1ID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUGlja2VyQ2hhbmdlNjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNleHN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4NiA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8v6I635Y+W5pWw5o2u5a2X5YW4XHJcbiAgICBhc3luYyBnZXREaWN0KGNvZGUpIHtcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldERpY3REYXRhKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiREMwMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJncm91cGNvZGVcIjogY29kZSxcclxuICAgICAgICAgICAgICAgICAgICBcInNlbEFsbFwiOiBcInRydWVcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlueugOWOhuWfuuacrOS/oeaBr1xyXG4gICAgYXN5bmMgZ2V0UmVzdW1lSW5mbyhyZXN1bWVpZCwgdG9rZW4sIHRva2VuS2V5KSB7XHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMDNcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbixcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVzdW1laWRcIjogcmVzdW1laWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9XHJcbiAgICAvL+S/ruaUueihqOWNleaVsOaNrlxyXG4gICAgYXN5bmMgY2hhbmdlQmFzZUluZm8ob2JqLCBvYmoyKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBvYmoyXHJcbiAgICAgICAgZm9yICh2YXIgS2V5IGluIG9iail7XHJcbiAgICAgICAgICAgIGlmKCFvYmpbS2V5XSl7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqW0tleV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzdWx0T2JqID0gT2JqZWN0LmFzc2lnbihkYXRhLCB0aGlzLmJhc2VJbmZvLCBvYmopO1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0UmVzdW1lSW5mbyh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDEzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcmVzdWx0T2JqXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG5cclxuICB9XHJcbiJdfQ==