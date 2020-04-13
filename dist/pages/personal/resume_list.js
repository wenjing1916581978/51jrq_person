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

var _utils = require('./../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CorpPage = function (_wepy$page) {
    _inherits(CorpPage, _wepy$page);

    function CorpPage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CorpPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CorpPage.__proto__ || Object.getPrototypeOf(CorpPage)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            resumelist: [],
            showbox: false,
            no_resume: false,
            warnword: '暂无简历',
            resumeid: ''
        }, _this.methods = {
            deleteResume: function deleteResume(resumeid) {
                // 删除我的简历
                this.showbox = true;
                this.resumeid = resumeid;
                this.$apply();
            },
            editResume: function editResume(resumeid) {
                // 编辑我的简历
                wx.navigateTo({
                    url: 'resume?resumeid=' + resumeid
                });
            },
            addResume: function addResume() {
                // 添加简历
                wx.navigateTo({
                    url: 'resume'
                });
            },
            cancel: function cancel() {
                //取消删除
                this.showbox = false;
                this.$apply();
            },
            yes: function yes() {
                var _this2 = this;

                // 确认删除
                wx.showLoading({
                    title: '加载中'
                });
                this.deleteMyResume(this.resumeid).then(function (data) {
                    _this2.showbox = false;
                    var that = _this2;
                    // 获取简历列表
                    _this2.getResumeList().then(function (data) {
                        if (data.data.returnCode == "AAAAAAA") {
                            var resumeArr = data.data.data;
                            if (resumeArr.length > 0) {
                                that.no_resume = false;
                                resumeArr.forEach(function (element) {
                                    element.updatedate = _utils2.default.date('Y-m-d', element.updatedate);
                                });
                                that.resumelist = resumeArr;
                                that.$apply();
                            } else {
                                that.no_resume = true;
                                that.$apply();
                            }
                        } else {
                            that.no_resume = true;
                            that.$apply();
                        }
                        wx.hideLoading();
                    });
                }).catch(function (err) {
                    _tip2.default.error(json.data.returnMsg);
                });
            },
            goLook: function goLook(resumeid) {
                // 预览简历
                wx.navigateTo({
                    url: 'resume?resumeid=' + resumeid + '&look=just'
                });
            },
            importResume: function importResume() {
                // 导入简历
                wx.navigateTo({
                    url: 'import_resume'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CorpPage, [{
        key: 'onShow',
        value: function onShow(options) {
            // 获取登录信息
            var that = this;
            wx.getStorage({
                key: 'loginData',
                success: function success(res) {
                    that.loginStatus = true;
                    that.token = res.data.token;
                    that.tokenKey = res.data.tokenKey;
                    that.username = res.data.data.username;
                    that.headimg = res.data.data.headimg;
                    that.jobname = res.data.data.jobname;
                    if (!res.data.data.companyname || !res.data.data.jobname) {
                        that.have = false;
                    }
                    if (res.data.data.headimg) {
                        that.headimgStatus = true;
                    }
                    that.$apply();
                    // 获取简历列表
                    that.getResumeList().then(function (data) {
                        if (data.data.returnCode == "AAAAAAA") {
                            var resumeArr = data.data.data;
                            if (resumeArr.length > 0) {
                                that.no_resume = false;
                                resumeArr.forEach(function (element) {
                                    element.updatedate = _utils2.default.date('Y-m-d', element.createdate / 1000);
                                });
                                console.log(resumeArr);
                                that.resumelist = resumeArr;
                                that.$apply();
                            } else {
                                that.warnword = '暂无简历';
                                that.no_resume = true;
                                that.$apply();
                            }
                        } else {
                            that.warnword = data.data.returnMsg;
                            that.no_resume = true;
                            that.$apply();
                        }
                        wx.hideLoading();
                    });
                },
                fail: function fail(res) {
                    that.warnword = res.data.returnMsg;
                    that.no_resume = true;
                    that.$apply();
                }
            });
        }
    }, {
        key: 'getResumeList',


        //获取简历列表
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                wx.showLoading({
                                    title: '加载中'
                                });
                                _context.next = 3;
                                return _api2.default.getCollectJob({
                                    query: {
                                        head: {
                                            "transcode": "P0001",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": this.token,
                                            "tokenKey": this.tokenKey
                                        }
                                    }
                                });

                            case 3:
                                json = _context.sent;
                                return _context.abrupt('return', json);

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

        //删除简历

    }, {
        key: 'deleteMyResume',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resumeid) {
                var json;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _api2.default.getResumeInfo({
                                    query: {
                                        head: {
                                            "transcode": "M0023",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": this.token,
                                            "tokenKey": this.tokenKey,
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

            function deleteMyResume(_x) {
                return _ref3.apply(this, arguments);
            }

            return deleteMyResume;
        }()
    }]);

    return CorpPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(CorpPage , 'pages/personal/resume_list'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZV9saXN0LmpzIl0sIm5hbWVzIjpbIkNvcnBQYWdlIiwiZGF0YSIsInJlc3VtZWxpc3QiLCJzaG93Ym94Iiwibm9fcmVzdW1lIiwid2FybndvcmQiLCJyZXN1bWVpZCIsIm1ldGhvZHMiLCJkZWxldGVSZXN1bWUiLCIkYXBwbHkiLCJlZGl0UmVzdW1lIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiYWRkUmVzdW1lIiwiY2FuY2VsIiwieWVzIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImRlbGV0ZU15UmVzdW1lIiwidGhlbiIsInRoYXQiLCJnZXRSZXN1bWVMaXN0IiwicmV0dXJuQ29kZSIsInJlc3VtZUFyciIsImxlbmd0aCIsImZvckVhY2giLCJlbGVtZW50IiwidXBkYXRlZGF0ZSIsImRhdGUiLCJoaWRlTG9hZGluZyIsImNhdGNoIiwiZXJyb3IiLCJqc29uIiwicmV0dXJuTXNnIiwiZ29Mb29rIiwiaW1wb3J0UmVzdW1lIiwib3B0aW9ucyIsImdldFN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwicmVzIiwibG9naW5TdGF0dXMiLCJ0b2tlbiIsInRva2VuS2V5IiwidXNlcm5hbWUiLCJoZWFkaW1nIiwiam9ibmFtZSIsImNvbXBhbnluYW1lIiwiaGF2ZSIsImhlYWRpbWdTdGF0dXMiLCJjcmVhdGVkYXRlIiwiY29uc29sZSIsImxvZyIsImZhaWwiLCJnZXRDb2xsZWN0Sm9iIiwicXVlcnkiLCJoZWFkIiwiZ2V0UmVzdW1lSW5mbyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBRW5CQyxJLEdBQU87QUFDTEMsd0JBQVksRUFEUDtBQUVMQyxxQkFBUyxLQUZKO0FBR0xDLHVCQUFXLEtBSE47QUFJTEMsc0JBQVUsTUFKTDtBQUtMQyxzQkFBUztBQUxKLFMsUUE0RFBDLE8sR0FBVTtBQUNOQyx3QkFETSx3QkFDUUYsUUFE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QjtBQUNBaUIsaUNBQUtaLE1BQUw7QUFDSDtBQUNERSwyQkFBR21CLFdBQUg7QUFDSCxxQkF0QkQ7QUF1QkgsaUJBeENTO0FBeUNWd0Isc0JBQU0sY0FBU2IsR0FBVCxFQUFjO0FBQ2hCcEIseUJBQUtoQixRQUFMLEdBQWdCb0MsSUFBSXhDLElBQUosQ0FBU2lDLFNBQXpCO0FBQ0FiLHlCQUFLakIsU0FBTCxHQUFpQixJQUFqQjtBQUNBaUIseUJBQUtaLE1BQUw7QUFDSDtBQTdDUyxhQUFkO0FBK0NIOzs7OztBQWtFRDs7Ozs7Ozs7QUFFRUUsbUNBQUdNLFdBQUgsQ0FBZTtBQUNYQywyQ0FBTztBQURJLGlDQUFmOzt1Q0FHbUIsY0FBSXFDLGFBQUosQ0FBa0I7QUFDckNDLDJDQUFPO0FBQ0NDLDhDQUFNO0FBQ0YseURBQWEsT0FEWDtBQUVGLG9EQUFRO0FBRk4seUNBRFA7QUFLQ3hELDhDQUFNO0FBQ0YscURBQVMsS0FBSzBDLEtBRFo7QUFFRix3REFBWSxLQUFLQztBQUZmO0FBTFA7QUFEOEIsaUNBQWxCLEM7OztBQUFiWCxvQztpRUFZQ0EsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHVDs7Ozs7a0dBQ3FCM0IsUTs7Ozs7Ozt1Q0FDQSxjQUFJb0QsYUFBSixDQUFrQjtBQUNyQ0YsMkNBQU87QUFDQ0MsOENBQU07QUFDRix5REFBYSxPQURYO0FBRUYsb0RBQVE7QUFGTix5Q0FEUDtBQUtDeEQsOENBQU07QUFDRixxREFBUyxLQUFLMEMsS0FEWjtBQUVGLHdEQUFZLEtBQUtDLFFBRmY7QUFHRix3REFBWXRDO0FBSFY7QUFMUDtBQUQ4QixpQ0FBbEIsQzs7O0FBQWIyQixvQztrRUFhQ0EsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWpLMkIsZUFBSzBCLEk7O2tCQUF0QjNELFEiLCJmaWxlIjoicmVzdW1lX2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbmltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuaW1wb3J0IHV0aWxzIGZyb20nLi4vLi4vdXRpbHMvdXRpbHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29ycFBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG5cclxuICBkYXRhID0ge1xyXG4gICAgcmVzdW1lbGlzdDogW10sXHJcbiAgICBzaG93Ym94OiBmYWxzZSxcclxuICAgIG5vX3Jlc3VtZTogZmFsc2UsXHJcbiAgICB3YXJud29yZDogJ+aaguaXoOeugOWOhicsXHJcbiAgICByZXN1bWVpZDonJ1xyXG4gIH1cclxuXHJcbiAgb25TaG93IChvcHRpb25zKSB7XHJcbiAgICAvLyDojrflj5bnmbvlvZXkv6Hmga9cclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHd4LmdldFN0b3JhZ2Uoe1xyXG4gICAgICAgICAga2V5OiAnbG9naW5EYXRhJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgIHRoYXQubG9naW5TdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHRoYXQudG9rZW4gPSByZXMuZGF0YS50b2tlbjtcclxuICAgICAgICAgICAgICB0aGF0LnRva2VuS2V5ID0gcmVzLmRhdGEudG9rZW5LZXk7XHJcbiAgICAgICAgICAgICAgdGhhdC51c2VybmFtZSA9IHJlcy5kYXRhLmRhdGEudXNlcm5hbWU7XHJcbiAgICAgICAgICAgICAgdGhhdC5oZWFkaW1nID0gcmVzLmRhdGEuZGF0YS5oZWFkaW1nO1xyXG4gICAgICAgICAgICAgIHRoYXQuam9ibmFtZSA9IHJlcy5kYXRhLmRhdGEuam9ibmFtZTtcclxuICAgICAgICAgICAgICBpZighcmVzLmRhdGEuZGF0YS5jb21wYW55bmFtZSB8fCAhcmVzLmRhdGEuZGF0YS5qb2JuYW1lKXtcclxuICAgICAgICAgICAgICAgICAgdGhhdC5oYXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmKHJlcy5kYXRhLmRhdGEuaGVhZGltZyl7XHJcbiAgICAgICAgICAgICAgICAgIHRoYXQuaGVhZGltZ1N0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgLy8g6I635Y+W566A5Y6G5YiX6KGoXHJcbiAgICAgICAgICAgICAgdGhhdC5nZXRSZXN1bWVMaXN0KCkudGhlbihkYXRhPT57XHJcbiAgICAgICAgICAgICAgICAgIGlmKGRhdGEuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdW1lQXJyID0gZGF0YS5kYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bWVBcnIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5vX3Jlc3VtZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bWVBcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnVwZGF0ZWRhdGUgPSB1dGlscy5kYXRlKCdZLW0tZCcsKGVsZW1lbnQuY3JlYXRlZGF0ZSkvMTAwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VtZUFycilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZXN1bWVsaXN0ID0gcmVzdW1lQXJyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQud2FybndvcmQgPSAn5pqC5peg566A5Y6GJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ub19yZXN1bWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoYXQud2FybndvcmQgPSBkYXRhLmRhdGEucmV0dXJuTXNnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhhdC5ub19yZXN1bWUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICB0aGF0Lndhcm53b3JkID0gcmVzLmRhdGEucmV0dXJuTXNnO1xyXG4gICAgICAgICAgICAgIHRoYXQubm9fcmVzdW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gIH1cclxuXHJcbiAgbWV0aG9kcyA9IHtcclxuICAgICAgZGVsZXRlUmVzdW1lIChyZXN1bWVpZCkgey8vIOWIoOmZpOaIkeeahOeugOWOhlxyXG4gICAgICAgIHRoaXMuc2hvd2JveCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXN1bWVpZCA9IHJlc3VtZWlkO1xyXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGVkaXRSZXN1bWUgKHJlc3VtZWlkKSB7Ly8g57yW6L6R5oiR55qE566A5Y6GXHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICB1cmw6IGByZXN1bWU/cmVzdW1laWQ9JHtyZXN1bWVpZH1gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBhZGRSZXN1bWUoKSB7Ly8g5re75Yqg566A5Y6GXHJcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYHJlc3VtZWBcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBjYW5jZWwoKSB7Ly/lj5bmtojliKDpmaRcclxuICAgICAgICAgIHRoaXMuc2hvd2JveCA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSxcclxuICAgICAgeWVzKCkgey8vIOehruiupOWIoOmZpFxyXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5kZWxldGVNeVJlc3VtZSh0aGlzLnJlc3VtZWlkKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zaG93Ym94ID0gZmFsc2U7XHJcbiAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgIC8vIOiOt+WPlueugOWOhuWIl+ihqFxyXG4gICAgICAgICAgdGhpcy5nZXRSZXN1bWVMaXN0KCkudGhlbihkYXRhPT57XHJcbiAgICAgICAgICAgICAgaWYoZGF0YS5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIHJlc3VtZUFyciA9IGRhdGEuZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICBpZihyZXN1bWVBcnIubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubm9fcmVzdW1lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdW1lQXJyLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnVwZGF0ZWRhdGUgPSB1dGlscy5kYXRlKCdZLW0tZCcsZWxlbWVudC51cGRhdGVkYXRlKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVzdW1lbGlzdCA9IHJlc3VtZUFyclxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubm9fcmVzdW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgIHRoYXQubm9fcmVzdW1lID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5yZXR1cm5Nc2cpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIGdvTG9vayAocmVzdW1laWQpIHsvLyDpooTop4jnroDljoZcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgIHVybDogYHJlc3VtZT9yZXN1bWVpZD0ke3Jlc3VtZWlkfSZsb29rPWp1c3RgXHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICBpbXBvcnRSZXN1bWUoKSB7Ly8g5a+85YWl566A5Y6GXHJcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYGltcG9ydF9yZXN1bWVgXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgLy/ojrflj5bnroDljobliJfooahcclxuICBhc3luYyBnZXRSZXN1bWVMaXN0KCkge1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgIH0pXHJcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldENvbGxlY3RKb2Ioe1xyXG4gICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJQMDAwMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhpcy50b2tlbixcclxuICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhpcy50b2tlbktleVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBqc29uO1xyXG4gIH1cclxuXHJcbiAgLy/liKDpmaTnroDljoZcclxuICBhc3luYyBkZWxldGVNeVJlc3VtZShyZXN1bWVpZCkge1xyXG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMjNcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBcInRva2VuXCI6IHRoaXMudG9rZW4sXHJcbiAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRoaXMudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICBcInJlc3VtZWlkXCI6IHJlc3VtZWlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=