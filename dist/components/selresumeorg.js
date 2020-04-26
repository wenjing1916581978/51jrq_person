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
                                    that.isDelivery = !that.isDelivery;
                                    _tip2.default.success("投递成功");
                                    that.$apply();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbHJlc3VtZW9yZy5qcyJdLCJuYW1lcyI6WyJTZWxSZXN1bWVPcmciLCJwcm9wcyIsImlzU2hvd1NlbENvbnRhaW5lciIsInR5cGUiLCJCb29sZWFuIiwiZGVmYXVsdCIsInR3b1dheSIsImpvYklkIiwiU3RyaW5nIiwiaXNEZWxpdmVyeSIsImhhdmVSZXN1bWUiLCJkYXRhIiwic2VsSW5kZXgiLCJyZXN1bWVMaXN0IiwicmVzdW1laWQiLCJwZXJjZW50IiwiaXNTaG93TG9naW4iLCJtZXRob2RzIiwiY2hvb3NlUmVzdW1lIiwiJGFwcGx5IiwiY2FuY2VsRm4iLCJjb25maXJtRm4iLCJldmVudCIsImRlbGl2ZXJKb2IiLCJsb2dpbkluZm8iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0UmVzdW1lTGlzdCIsInRoYXQiLCJnZXRDb2xsZWN0Sm9iIiwicXVlcnkiLCJoZWFkIiwidG9rZW4iLCJ0b2tlbktleSIsImpzb24iLCJyZXR1cm5Db2RlIiwibGVuZ3RoIiwiam9iaWQiLCJnZXRDb21wYW55am9iIiwiY29uc29sZSIsImxvZyIsInN1Y2Nlc3MiLCJlcnJvciIsInJldHVybk1zZyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUlxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxLLEdBQVE7QUFDSkMsZ0NBQW9CO0FBQ2hCQyxzQkFBTUMsT0FEVTtBQUVoQkMseUJBQVMsS0FGTztBQUdoQkMsd0JBQVE7QUFIUSxhQURoQjtBQU1KQyxtQkFBTztBQUNISixzQkFBTUssTUFESDtBQUVISCx5QkFBUztBQUZOLGFBTkg7QUFVSkksd0JBQVk7QUFDUk4sc0JBQU1DLE9BREU7QUFFUkMseUJBQVMsS0FGRDtBQUdSQyx3QkFBUTtBQUhBLGFBVlI7QUFlSkksd0JBQVk7QUFDUlAsc0JBQU1DLE9BREU7QUFFUjtBQUNBRSx3QkFBUTtBQUhBO0FBZlIsUyxRQXNCUkssSSxH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Q0FMRCxNQUtPO0FBQ0gsa0RBQUl1QixLQUFKLENBQVVSLEtBQUt2QixJQUFMLENBQVVnQyxTQUFwQjtBQUNIO0FBQ0RmLHFDQUFLVCxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBcEhrQyxlQUFLeUIsUzs7a0JBQTFCNUMsWSIsImZpbGUiOiJzZWxyZXN1bWVvcmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICAgIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG4gICAgaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJztcclxuICAgIGltcG9ydCB0aXAgZnJvbSAnLi4vLi91dGlscy90aXAnO1xyXG4gICAgaW1wb3J0IHtcclxuICAgICAgTE9HSU5fSU5GT1xyXG4gICAgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbFJlc3VtZU9yZyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgICAgICBwcm9wcyA9IHtcclxuICAgICAgICAgICAgaXNTaG93U2VsQ29udGFpbmVyOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB0d29XYXk6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgam9iSWQ6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlzRGVsaXZlcnk6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IEJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHR3b1dheTogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoYXZlUmVzdW1lOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxyXG4gICAgICAgICAgICAgICAgLy8gZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHR3b1dheTogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkYXRhID0ge1xyXG4gICAgICAgICAgICBpc1Nob3dTZWxDb250YWluZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBzZWxJbmRleDogMCxcclxuICAgICAgICAgICAgcmVzdW1lTGlzdDogW10sXHJcbiAgICAgICAgICAgIHJlc3VtZWlkOiAnJyxcclxuICAgICAgICAgICAgcGVyY2VudDogJycsXHJcbiAgICAgICAgICAgIGlzRGVsaXZlcnk6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc1Nob3dMb2dpbjogZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZCgpe1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luSW5mbyA9ICB3eC5nZXRTdG9yYWdlU3luYyhMT0dJTl9JTkZPKSB8fCB7fTtcclxuICAgICAgICAgICAgLy8g6I635Y+W566A5Y6G5YiX6KGoXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UmVzdW1lTGlzdCgpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnZpZXdDb21wYW55am9iKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgICAgICBjaG9vc2VSZXN1bWUoc2VsSW5kZXgsIHJlc3VtZWlkLCBwZXJjZW50KSB7Ly8g5YiH5o2i566A5Y6GXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbEluZGV4ID0gc2VsSW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VtZWlkID0gcmVzdW1laWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcmNlbnQgPSBwZXJjZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2FuY2VsRm4oKXsvL+WPlua2iFxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Nob3dTZWxDb250YWluZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbmZpcm1GbihldmVudCl7Ly/noa7orqRcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsaXZlckpvYih0aGlzLmpvYklkLCB0aGlzLnJlc3VtZWlkLCB0aGlzLnBlcmNlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iOt+WPlueugOWOhuWIl+ihqFxyXG4gICAgICAgIGFzeW5jIGdldFJlc3VtZUxpc3QoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgIC8vICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgIC8vIH0pXHJcbiAgICAgICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0Q29sbGVjdEpvYih7XHJcbiAgICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIlAwMDAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRva2VuXCI6IHRoYXQubG9naW5JbmZvLnRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRoYXQubG9naW5JbmZvLnRva2VuS2V5XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZihqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnJlc3VtZUxpc3QgPSBqc29uLmRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnJlc3VtZWlkID0ganNvbi5kYXRhLmRhdGFbMF0ucmVzdW1laWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaGF2ZVJlc3VtZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhhdC5oYXZlUmVzdW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5LyB5Lia6IGM5L2N55Sz6K+3XHJcbiAgICAgICAgYXN5bmMgZGVsaXZlckpvYihqb2JpZCwgcmVzdW1laWQsIHBlcmNlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTaG93U2VsQ29udGFpbmVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0Q29tcGFueWpvYih7XHJcbiAgICAgICAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJRMDAwM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LmxvZ2luSW5mby50b2tlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LmxvZ2luSW5mby50b2tlbktleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqb2JpZFwiOiBqb2JpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXN1bWVpZFwiOiByZXN1bWVpZFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwZXJjZW50KVxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc0RlbGl2ZXJ5ID0gIXRoYXQuaXNEZWxpdmVyeTtcclxuICAgICAgICAgICAgICAgIHRpcC5zdWNjZXNzKFwi5oqV6YCS5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIl19