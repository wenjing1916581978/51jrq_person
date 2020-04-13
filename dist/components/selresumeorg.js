'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _constants = require('./../utils/constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelResumeOrg = function (_wepy$component) {
    _inherits(SelResumeOrg, _wepy$component);

    function SelResumeOrg() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SelResumeOrg);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SelResumeOrg.__proto__ || Object.getPrototypeOf(SelResumeOrg)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
            isShowSelContainer: {
                type: Boolean,
                default: false,
                twoWay: true
            },
            jobId: {
                type: String,
                default: ''
            },
            isDelivery: {
                type: Boolean,
                default: false,
                twoWay: true
            },
            haveResume: {
                type: Boolean,
                // default: true,
                twoWay: true
            }
        }, _this.data = {
            isShowSelContainer: false,
            selIndex: 0,
            resumeList: [],
            resumeid: '',
            percent: '',
            isDelivery: false,
            isShowLogin: false
        }, _this.methods = {
            chooseResume: function chooseResume(selIndex, resumeid, percent) {
                // 切换简历
                this.selIndex = selIndex;
                this.resumeid = resumeid;
                this.percent = percent;
                this.$apply();
            },
            cancelFn: function cancelFn() {
                //取消
                this.isShowSelContainer = false;
                this.$apply();
            },
            confirmFn: function confirmFn(event) {
                //确认
                this.deliverJob(this.jobId, this.resumeid, this.percent);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SelResumeOrg, [{
        key: 'onLoad',
        value: function onLoad() {
            this.loginInfo = wx.getStorageSync(_constants.LOGIN_INFO) || {};
            // 获取简历列表
            this.getResumeList();
            // this.viewCompanyjob();
        }
    }, {
        key: 'getResumeList',


        //获取简历列表
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var that, json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                that = this;
                                // wx.showLoading({
                                //     title: '加载中',
                                // })

                                _context.next = 3;
                                return _api2.default.getCollectJob({
                                    query: {
                                        head: {
                                            "transcode": "P0001",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": that.loginInfo.token,
                                            "tokenKey": that.loginInfo.tokenKey
                                        }
                                    }
                                });

                            case 3:
                                json = _context.sent;

                                if (json.data.returnCode == "AAAAAAA") {
                                    if (json.data.data.length > 0) {
                                        that.resumeList = json.data.data;
                                        that.resumeid = json.data.data[0].resumeid;
                                        that.$apply();
                                    } else {
                                        that.haveResume = false;
                                        that.$apply();
                                    }
                                } else {
                                    that.haveResume = false;
                                    that.$apply();
                                }
                                // wx.hideLoading()

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getResumeList() {
                return _ref2.apply(this, arguments);
            }

            return getResumeList;
        }()

        //企业职位申请

    }, {
        key: 'deliverJob',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(jobid, resumeid, percent) {
                var that, json;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                that = this;

                                this.isShowSelContainer = false;
                                _context2.next = 4;
                                return _api2.default.getCompanyjob({
                                    query: {
                                        head: {
                                            "transcode": "Q0003",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": that.loginInfo.token,
                                            "tokenKey": that.loginInfo.tokenKey,
                                            "jobid": jobid,
                                            "resumeid": resumeid
                                        }
                                    }
                                });

                            case 4:
                                json = _context2.sent;

                                if (json.data.returnCode == "AAAAAAA") {
                                    console.log(percent);
                                    if (percent < 70) {
                                        _tip2.default.error("请完善您的简历");
                                    } else {
                                        that.isDelivery = !that.isDelivery;
                                        _tip2.default.success("投递成功");
                                        that.$apply();
                                    }
                                } else {
                                    _tip2.default.error(json.data.returnMsg);
                                }
                                that.$apply();

                            case 7:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function deliverJob(_x, _x2, _x3) {
                return _ref3.apply(this, arguments);
            }

            return deliverJob;
        }()
    }]);

    return SelResumeOrg;
}(_wepy2.default.component);

exports.default = SelResumeOrg;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbHJlc3VtZW9yZy5qcyJdLCJuYW1lcyI6WyJTZWxSZXN1bWVPcmciLCJwcm9wcyIsImlzU2hvd1NlbENvbnRhaW5lciIsInR5cGUiLCJCb29sZWFuIiwiZGVmYXVsdCIsInR3b1dheSIsImpvYklkIiwiU3RyaW5nIiwiaXNEZWxpdmVyeSIsImhhdmVSZXN1bWUiLCJkYXRhIiwic2VsSW5kZXgiLCJyZXN1bWVMaXN0IiwicmVzdW1laWQiLCJwZXJjZW50IiwiaXNTaG93TG9naW4iLCJtZXRob2RzIiwiY2hvb3NlUmVzdW1lIiwiJGFwcGx5IiwiY2FuY2VsRm4iLCJjb25maXJtRm4iLCJldmVudCIsImRlbGl2ZXJKb2IiLCJsb2dpbkluZm8iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0UmVzdW1lTGlzdCIsInRoYXQiLCJnZXRDb2xsZWN0Sm9iIiwicXVlcnkiLCJoZWFkIiwidG9rZW4iLCJ0b2tlbktleSIsImpzb24iLCJyZXR1cm5Db2RlIiwibGVuZ3RoIiwiam9iaWQiLCJnZXRDb21wYW55am9iIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic3VjY2VzcyIsInJldHVybk1zZyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUlxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxLLEdBQVE7QUFDSkMsZ0NBQW9CO0FBQ2hCQyxzQkFBTUMsT0FEVTtBQUVoQkMseUJBQVMsS0FGTztBQUdoQkMsd0JBQVE7QUFIUSxhQURoQjtBQU1KQyxtQkFBTztBQUNISixzQkFBTUssTUFESDtBQUVISCx5QkFBUztBQUZOLGFBTkg7QUFVSkksd0JBQVk7QUFDUk4sc0JBQU1DLE9BREU7QUFFUkMseUJBQVMsS0FGRDtBQUdSQyx3QkFBUTtBQUhBLGFBVlI7QUFlSkksd0JBQVk7QUFDUlAsc0JBQU1DLE9BREU7QUFFUjtBQUNBRSx3QkFBUTtBQUhBO0FBZlIsUyxRQXNCUkssSSxH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Q0FBQ21CLEtBQUtuQixVQUF4QjtBQUNBLHNEQUFJaUMsT0FBSixDQUFZLE1BQVo7QUFDQWQsNkNBQUtULE1BQUw7QUFDSDtBQUNKLGlDQVRELE1BU087QUFDSCxrREFBSXNCLEtBQUosQ0FBVVAsS0FBS3ZCLElBQUwsQ0FBVWdDLFNBQXBCO0FBQ0g7QUFDRGYscUNBQUtULE1BQUw7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF4SGtDLGVBQUt5QixTOztrQkFBMUI1QyxZIiwiZmlsZSI6InNlbHJlc3VtZW9yZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gICAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbiAgICBpbXBvcnQgYXBpIGZyb20gJy4uL2FwaS9hcGknO1xyXG4gICAgaW1wb3J0IHRpcCBmcm9tICcuLi8uL3V0aWxzL3RpcCc7XHJcbiAgICBpbXBvcnQge1xyXG4gICAgICBMT0dJTl9JTkZPXHJcbiAgICB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XHJcblxyXG4gICAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsUmVzdW1lT3JnIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgICAgIHByb3BzID0ge1xyXG4gICAgICAgICAgICBpc1Nob3dTZWxDb250YWluZXI6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHR3b1dheTogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBqb2JJZDoge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogJydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNEZWxpdmVyeToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdHdvV2F5OiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGhhdmVSZXN1bWU6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdHdvV2F5OiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIGlzU2hvd1NlbENvbnRhaW5lcjogZmFsc2UsXHJcbiAgICAgICAgICAgIHNlbEluZGV4OiAwLFxyXG4gICAgICAgICAgICByZXN1bWVMaXN0OiBbXSxcclxuICAgICAgICAgICAgcmVzdW1laWQ6ICcnLFxyXG4gICAgICAgICAgICBwZXJjZW50OiAnJyxcclxuICAgICAgICAgICAgaXNEZWxpdmVyeTogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzU2hvd0xvZ2luOiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Mb2FkKCl7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW5JbmZvID0gIHd4LmdldFN0b3JhZ2VTeW5jKExPR0lOX0lORk8pIHx8IHt9O1xyXG4gICAgICAgICAgICAvLyDojrflj5bnroDljobliJfooahcclxuICAgICAgICAgICAgdGhpcy5nZXRSZXN1bWVMaXN0KCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMudmlld0NvbXBhbnlqb2IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICAgIGNob29zZVJlc3VtZShzZWxJbmRleCwgcmVzdW1laWQsIHBlcmNlbnQpIHsvLyDliIfmjaLnroDljoZcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsSW5kZXggPSBzZWxJbmRleDtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdW1laWQgPSByZXN1bWVpZDtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyY2VudCA9IHBlcmNlbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjYW5jZWxGbigpey8v5Y+W5raIXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2hvd1NlbENvbnRhaW5lciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29uZmlybUZuKGV2ZW50KXsvL+ehruiupFxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxpdmVySm9iKHRoaXMuam9iSWQsIHRoaXMucmVzdW1laWQsIHRoaXMucGVyY2VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6I635Y+W566A5Y6G5YiX6KGoXHJcbiAgICAgICAgYXN5bmMgZ2V0UmVzdW1lTGlzdCgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgLy8gICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRDb2xsZWN0Sm9iKHtcclxuICAgICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiUDAwMDFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhhdC5sb2dpbkluZm8udG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhhdC5sb2dpbkluZm8udG9rZW5LZXlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbi5kYXRhLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVzdW1lTGlzdCA9IGpzb24uZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVzdW1laWQgPSBqc29uLmRhdGEuZGF0YVswXS5yZXN1bWVpZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5oYXZlUmVzdW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmhhdmVSZXN1bWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kvIHkuJrogYzkvY3nlLPor7dcclxuICAgICAgICBhc3luYyBkZWxpdmVySm9iKGpvYmlkLCByZXN1bWVpZCwgcGVyY2VudCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5pc1Nob3dTZWxDb250YWluZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRDb21wYW55am9iKHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIlEwMDAzXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LmxvZ2luSW5mby50b2tlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LmxvZ2luSW5mby50b2tlbktleSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiam9iaWRcIjogam9iaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzdW1laWRcIjogcmVzdW1laWRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGVyY2VudClcclxuICAgICAgICAgICAgICAgIGlmKHBlcmNlbnQgPCA3MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihcIuivt+WujOWWhOaCqOeahOeugOWOhlwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pc0RlbGl2ZXJ5ID0gIXRoYXQuaXNEZWxpdmVyeTtcclxuICAgICAgICAgICAgICAgICAgICB0aXAuc3VjY2VzcyhcIuaKlemAkuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4iXX0=