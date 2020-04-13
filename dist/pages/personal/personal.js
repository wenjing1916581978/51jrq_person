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

var _constants = require('./../../utils/constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var utils = require('./../../utils/utils.js');

var PersPage = function (_wepy$page) {
    _inherits(PersPage, _wepy$page);

    function PersPage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, PersPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PersPage.__proto__ || Object.getPrototypeOf(PersPage)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            // 简历完成百分比
            percentage: '0%',
            username: '暂无',
            headimg: '',
            headimgStatus: false,
            jobname: '',
            token: '',
            tokenKey: '',
            have: true,
            resumeid: '',
            showbox: false,
            loginStatus: false,
            tempPortraitFilePath: ''
        }, _this.methods = {
            switchapplet: function switchapplet() {
                wx.navigateToMiniProgram({
                    appId: 'wxd7928bf1898a30cd',
                    path: 'pages/joblist/joblist',
                    extraData: {},
                    envVersion: 'trail',
                    success: function success(res) {
                        // 打开成功
                    },
                    fail: function fail() {}
                });
            },
            goResumeList: function goResumeList() {
                // 跳转我的简历
                // 未登录跳转登录页
                var that = this;
                utils.goLogin().catch(function () {
                    if (that.loginStatus) {
                        wx.navigateTo({
                            url: 'resume_list'
                        });
                    }
                });
            },


            // 跳转投递状态
            goDeliveryPage: function goDeliveryPage() {
                // 未登录跳转登录页
                var that = this;
                utils.goLogin().catch(function () {
                    if (that.loginStatus) {
                        wx.navigateTo({
                            url: 'delivery'
                        });
                    }
                });
            },
            goCollectionPage: function goCollectionPage() {
                // 跳转我的收藏
                // 未登录跳转登录页
                var that = this;
                utils.goLogin().catch(function () {
                    if (that.loginStatus) {
                        wx.navigateTo({
                            url: 'collection'
                        });
                    }
                });
            },
            logout: function logout() {
                // 退出登录
                this.showbox = true;
            },
            cancel: function cancel() {
                // 取消
                this.showbox = false;
            },
            yes: function yes() {
                // 确定
                // 清空本地信息
                wx.clearStorage();
                // 跳转登录页
                wx.navigateTo({
                    url: '/pages/login/login'
                });
            },
            goLoginPage: function goLoginPage() {
                // 跳转登录页
                wx.navigateTo({
                    url: '/pages/login/login'
                });
            },
            goBaseEdit: function goBaseEdit() {
                //跳转个人信息编辑
                // 未登录跳转登录页
                utils.goLogin();
                wx.navigateTo({
                    url: 'base_edit'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PersPage, [{
        key: 'onLoad',
        value: function onLoad() {}
        // 转发分享

    }, {
        key: 'onShareAppMessage',
        value: function onShareAppMessage() {
            var pages = getCurrentPages(); //获取加载的页面
            var currentPage = pages[pages.length - 1]; //获取当前页面的对象
            var url = currentPage.route; //当前页面url
            return {
                title: '金融职业机会尽在51金融圈',
                desc: '51金融圈丨金融人才求职招聘',
                path: '/' + url
            };
        }
    }, {
        key: 'onShow',
        value: function onShow() {
            // 获取登录信息
            var that = this;
            wx.getStorage({
                key: 'loginData',
                success: function success(res) {
                    that.loginStatus = true;
                    that.token = res.data.token;
                    that.tokenKey = res.data.tokenKey;
                    that.getPimg();
                    if (!res.data.data.companyname || !res.data.data.jobname) {
                        that.have = false;
                    }
                    that.$apply();
                },
                fail: function fail(res) {
                    // 清空本地信息
                    wx.clearStorage();
                    that.have = false;
                    that.loginStatus = false;
                    that.$apply();
                }
            });
        }
    }, {
        key: 'onHide',
        value: function onHide() {
            this.showbox = false;
            this.headimgStatus = false;
        }

        //完整度查询

    }, {
        key: 'getIntegrity',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resumeid) {
                var json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _api2.default.getResumeInfo({
                                    query: {
                                        head: {
                                            "transcode": "M0002",
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
                                json = _context.sent;
                                return _context.abrupt('return', json);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getIntegrity(_x) {
                return _ref2.apply(this, arguments);
            }

            return getIntegrity;
        }()

        //获取个人信息

    }, {
        key: 'getPimg',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var that, json;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                that = this;
                                _context2.next = 3;
                                return _api2.default.getPimg({
                                    query: {
                                        head: {
                                            "transcode": "P0040",
                                            "type": "h"
                                        },
                                        data: {
                                            "tokenKey": that.tokenKey,
                                            "token": that.token
                                        }
                                    }
                                });

                            case 3:
                                json = _context2.sent;

                                if (json.data.returnCode == 'AAAAAAA') {
                                    if (json.data.data.headimg) {
                                        that.headimgStatus = true;
                                    } else {
                                        that.headimgStatus = false;
                                    }
                                    that.tempPortraitFilePath = json.data.data.headimg;
                                    that.username = json.data.data.username;
                                    that.jobname = json.data.data.jobname;
                                    that.$apply();
                                } else {
                                    _tip2.default.error(json.data.returnMsg);
                                }

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getPimg() {
                return _ref3.apply(this, arguments);
            }

            return getPimg;
        }()
    }]);

    return PersPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(PersPage , 'pages/personal/personal'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNvbmFsLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVxdWlyZSIsIlBlcnNQYWdlIiwiZGF0YSIsInBlcmNlbnRhZ2UiLCJ1c2VybmFtZSIsImhlYWRpbWciLCJoZWFkaW1nU3RhdHVzIiwiam9ibmFtZSIsInRva2VuIiwidG9rZW5LZXkiLCJoYXZlIiwicmVzdW1laWQiLCJzaG93Ym94IiwibG9naW5TdGF0dXMiLCJ0ZW1wUG9ydHJhaXRGaWxlUGF0aCIsIm1ldGhvZHMiLCJzd2l0Y2hhcHBsZXQiLCJ3eCIsIm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSIsImFwcElkIiwicGF0aCIsImV4dHJhRGF0YSIsImVudlZlcnNpb24iLCJzdWNjZXNzIiwicmVzIiwiZmFpbCIsImdvUmVzdW1lTGlzdCIsInRoYXQiLCJnb0xvZ2luIiwiY2F0Y2giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29EZWxpdmVyeVBhZ2UiLCJnb0NvbGxlY3Rpb25QYWdlIiwibG9nb3V0IiwiY2FuY2VsIiwieWVzIiwiY2xlYXJTdG9yYWdlIiwiZ29Mb2dpblBhZ2UiLCJnb0Jhc2VFZGl0IiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJjdXJyZW50UGFnZSIsImxlbmd0aCIsInJvdXRlIiwidGl0bGUiLCJkZXNjIiwiZ2V0U3RvcmFnZSIsImtleSIsImdldFBpbWciLCJjb21wYW55bmFtZSIsIiRhcHBseSIsImdldFJlc3VtZUluZm8iLCJxdWVyeSIsImhlYWQiLCJqc29uIiwicmV0dXJuQ29kZSIsImVycm9yIiwicmV0dXJuTXNnIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUdBLElBQU1BLFFBQVFDLFFBQVEsbUJBQVIsQ0FBZDs7SUFHcUJDLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsSSxHQUFPO0FBQ0g7QUFDQUMsd0JBQVksSUFGVDtBQUdIQyxzQkFBUyxJQUhOO0FBSUhDLHFCQUFRLEVBSkw7QUFL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LHFEQUFTa0IsS0FBS25CO0FBRlo7QUFMUDtBQURvQixpQ0FBWixDOzs7QUFBYitDLG9DOztBQVlOLG9DQUFHQSxLQUFLckQsSUFBTCxDQUFVc0QsVUFBVixJQUF3QixTQUEzQixFQUFzQztBQUNsQyx3Q0FBR0QsS0FBS3JELElBQUwsQ0FBVUEsSUFBVixDQUFlRyxPQUFsQixFQUEwQjtBQUN0QnNCLDZDQUFLckIsYUFBTCxHQUFxQixJQUFyQjtBQUNILHFDQUZELE1BRUs7QUFDRHFCLDZDQUFLckIsYUFBTCxHQUFxQixLQUFyQjtBQUNIO0FBQ0RxQix5Q0FBS2Isb0JBQUwsR0FBNEJ5QyxLQUFLckQsSUFBTCxDQUFVQSxJQUFWLENBQWVHLE9BQTNDO0FBQ0FzQix5Q0FBS3ZCLFFBQUwsR0FBZ0JtRCxLQUFLckQsSUFBTCxDQUFVQSxJQUFWLENBQWVFLFFBQS9CO0FBQ0F1Qix5Q0FBS3BCLE9BQUwsR0FBZWdELEtBQUtyRCxJQUFMLENBQVVBLElBQVYsQ0FBZUssT0FBOUI7QUFDQW9CLHlDQUFLd0IsTUFBTDtBQUNILGlDQVZELE1BVUs7QUFDRCxrREFBSU0sS0FBSixDQUFVRixLQUFLckQsSUFBTCxDQUFVd0QsU0FBcEI7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTFMNkIsZUFBS0MsSTs7a0JBQXRCMUQsUSIsImZpbGUiOiJwZXJzb25hbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG5pbXBvcnQge1xyXG4gICAgTE9HSU5fSU5GT1xyXG59IGZyb20gJy4uLy4uL3V0aWxzL2NvbnN0YW50cyc7XHJcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvdXRpbHMnKTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQZXJzUGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIC8vIOeugOWOhuWujOaIkOeZvuWIhuavlFxyXG4gICAgICAgIHBlcmNlbnRhZ2U6ICcwJScsXHJcbiAgICAgICAgdXNlcm5hbWU6J+aaguaXoCcsXHJcbiAgICAgICAgaGVhZGltZzonJyxcclxuICAgICAgICBoZWFkaW1nU3RhdHVzOmZhbHNlLFxyXG4gICAgICAgIGpvYm5hbWU6JycsXHJcbiAgICAgICAgdG9rZW46JycsXHJcbiAgICAgICAgdG9rZW5LZXk6JycsXHJcbiAgICAgICAgaGF2ZTogdHJ1ZSxcclxuICAgICAgICByZXN1bWVpZDogJycsXHJcbiAgICAgICAgc2hvd2JveDogZmFsc2UsXHJcbiAgICAgICAgbG9naW5TdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgIHRlbXBQb3J0cmFpdEZpbGVQYXRoOiAnJ1xyXG4gICAgfVxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgIH1cclxuICAgIC8vIOi9rOWPkeWIhuS6q1xyXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgdmFyIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCkgICAgLy/ojrflj5bliqDovb3nmoTpobXpnaJcclxuICAgICAgICB2YXIgY3VycmVudFBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGgtMV0gICAgLy/ojrflj5blvZPliY3pobXpnaLnmoTlr7nosaFcclxuICAgICAgICB2YXIgdXJsID0gY3VycmVudFBhZ2Uucm91dGUgICAgLy/lvZPliY3pobXpnaJ1cmxcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRpdGxlOiAn6YeR6J6N6IGM5Lia5py65Lya5bC95ZyoNTHph5Hono3lnIgnLFxyXG4gICAgICAgIGRlc2M6ICc1MemHkeiejeWciOS4qOmHkeiejeS6uuaJjeaxguiBjOaLm+iBmCcsXHJcbiAgICAgICAgcGF0aDogYC8ke3VybH1gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uU2hvdygpe1xyXG4gICAgICAgIC8vIOiOt+WPlueZu+W9leS/oeaBr1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHd4LmdldFN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICBrZXk6ICdsb2dpbkRhdGEnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubG9naW5TdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC50b2tlbiA9IHJlcy5kYXRhLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgdGhhdC50b2tlbktleSA9IHJlcy5kYXRhLnRva2VuS2V5O1xyXG4gICAgICAgICAgICAgICAgdGhhdC5nZXRQaW1nKCk7XHJcbiAgICAgICAgICAgICAgICBpZighcmVzLmRhdGEuZGF0YS5jb21wYW55bmFtZSB8fCAhcmVzLmRhdGEuZGF0YS5qb2JuYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmhhdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgLy8g5riF56m65pys5Zyw5L+h5oGvXHJcbiAgICAgICAgICAgICAgICB3eC5jbGVhclN0b3JhZ2UoKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5oYXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmxvZ2luU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBzd2l0Y2hhcHBsZXQoKXtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvTWluaVByb2dyYW0oe1xyXG4gICAgICAgICAgICBhcHBJZDogJ3d4ZDc5MjhiZjE4OThhMzBjZCcsXHJcbiAgICAgICAgICAgIHBhdGg6ICdwYWdlcy9qb2JsaXN0L2pvYmxpc3QnLFxyXG4gICAgICAgICAgICBleHRyYURhdGE6IHt9LFxyXG4gICAgICAgICAgICBlbnZWZXJzaW9uOiAndHJhaWwnLFxyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIC8vIOaJk+W8gOaIkOWKn1xyXG4gICAgICAgICAgICB9LGZhaWwoKXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICAgIGdvUmVzdW1lTGlzdCAoKSB7Ly8g6Lez6L2s5oiR55qE566A5Y6GXHJcbiAgICAgICAgICAgIC8vIOacqueZu+W9lei3s+i9rOeZu+W9lemhtVxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdXRpbHMuZ29Mb2dpbigpLmNhdGNoKCgpPT57XHJcbiAgICAgICAgICAgICAgICBpZih0aGF0LmxvZ2luU3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgcmVzdW1lX2xpc3RgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g6Lez6L2s5oqV6YCS54q25oCBXHJcbiAgICAgICAgZ29EZWxpdmVyeVBhZ2UgKCkge1xyXG4gICAgICAgICAgICAvLyDmnKrnmbvlvZXot7PovaznmbvlvZXpobVcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHV0aWxzLmdvTG9naW4oKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGF0LmxvZ2luU3RhdHVzKXtcclxuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBgZGVsaXZlcnlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnb0NvbGxlY3Rpb25QYWdlICgpIHsvLyDot7PovazmiJHnmoTmlLbol49cclxuICAgICAgICAgICAgLy8g5pyq55m75b2V6Lez6L2s55m75b2V6aG1XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB1dGlscy5nb0xvZ2luKCkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5sb2dpblN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYGNvbGxlY3Rpb25gXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2dvdXQgKCkgey8vIOmAgOWHuueZu+W9lVxyXG4gICAgICAgICAgICB0aGlzLnNob3dib3ggPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FuY2VsICgpIHsvLyDlj5bmtohcclxuICAgICAgICAgICAgdGhpcy5zaG93Ym94ID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB5ZXMgKCkgey8vIOehruWumlxyXG4gICAgICAgICAgICAvLyDmuIXnqbrmnKzlnLDkv6Hmga9cclxuICAgICAgICAgICAgd3guY2xlYXJTdG9yYWdlKClcclxuICAgICAgICAgICAgLy8g6Lez6L2s55m75b2V6aG1XHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2xvZ2luL2xvZ2luYFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ29Mb2dpblBhZ2UgKCkgey8vIOi3s+i9rOeZu+W9lemhtVxyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYC9wYWdlcy9sb2dpbi9sb2dpbmBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvQmFzZUVkaXQoKSB7IC8v6Lez6L2s5Liq5Lq65L+h5oGv57yW6L6RXHJcbiAgICAgICAgICAgIC8vIOacqueZu+W9lei3s+i9rOeZu+W9lemhtVxyXG4gICAgICAgICAgICB1dGlscy5nb0xvZ2luKClcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGBiYXNlX2VkaXRgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICBvbkhpZGUoKXtcclxuICAgICAgICB0aGlzLnNob3dib3ggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhlYWRpbWdTdGF0dXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WujOaVtOW6puafpeivolxyXG4gICAgYXN5bmMgZ2V0SW50ZWdyaXR5KHJlc3VtZWlkKSB7XHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMDJcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGlzLnRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhpcy50b2tlbktleSxcclxuICAgICAgICAgICAgICAgICAgICBcInJlc3VtZWlkXCI6IHJlc3VtZWlkXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5Liq5Lq65L+h5oGvXHJcbiAgICBhc3luYyBnZXRQaW1nKCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0UGltZyh7XHJcbiAgICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIlAwMDQwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZihqc29uLmRhdGEucmV0dXJuQ29kZSA9PSAnQUFBQUFBQScpIHtcclxuICAgICAgICAgICAgaWYoanNvbi5kYXRhLmRhdGEuaGVhZGltZyl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmhlYWRpbWdTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoYXQuaGVhZGltZ1N0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQudGVtcFBvcnRyYWl0RmlsZVBhdGggPSBqc29uLmRhdGEuZGF0YS5oZWFkaW1nO1xyXG4gICAgICAgICAgICB0aGF0LnVzZXJuYW1lID0ganNvbi5kYXRhLmRhdGEudXNlcm5hbWU7XHJcbiAgICAgICAgICAgIHRoYXQuam9ibmFtZSA9IGpzb24uZGF0YS5kYXRhLmpvYm5hbWU7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19