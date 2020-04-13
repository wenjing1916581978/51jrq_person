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

// md5加密
var code = require('./../../utils/md5.js');

var LoginPage = function (_wepy$page) {
    _inherits(LoginPage, _wepy$page);

    function LoginPage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, LoginPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            // nickname:'',
            // headimg:'',
            warnword: '',
            username: '',
            phone: '',
            loginType: '1',
            vcode: '',
            deviceToken: '',
            buttonvalue: '发送验证码',
            disabled: false,
            wait: 60
        }, _this.config = {
            navigationBarTitleText: '',
            enablePullDownRefresh: false
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
            inputChange: function inputChange(e) {
                this[e.currentTarget.dataset.name] = e.detail.value;
                this.$apply();
            },
            toggle: function toggle(e) {
                var index = e.currentTarget.dataset.index;
                this.loginType = index;
                this.$apply();
            },


            // 发送验证码
            sendCode: function sendCode() {
                var that = this;
                var phone = that.phone.replace(/\s/g, ""); //去除空格
                //校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~171、176~178。14号段为上网卡专属号段
                var regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
                if (phone.length == '') {
                    _tip2.default.error('手机号不为空');
                    return false;
                } else if (!regs.test(phone)) {
                    _tip2.default.error('手机号格式不正确');
                    return false;
                }
                that.getLoginCode({ "phone": that.phone }, "D0002").then(function (data) {
                    if (data.data.returnCode != "AAAAAAA") {
                        _tip2.default.error(data.data.returnMsg);
                    } else {
                        that.countdown();
                    }
                    that.$apply();
                });
            },

            // 提交表单
            formSubmit: function formSubmit(e) {

                var that = this;

                var phone = e.detail.value.username.replace(/\s/g, ""); //去除空格
                var data = {
                    "username": e.detail.value.username,
                    "passwd": that.loginType == 1 ? code.hex_md5(e.detail.value.passwd) : '',
                    "loginType": that.loginType,
                    "vcode": that.loginType == 1 ? '' : that.vcode,
                    "deviceToken": ''
                };
                var regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
                if (that.loginType == 2) {

                    if (phone.length == '') {
                        _tip2.default.error('手机号不为空');
                        return false;
                    } else if (!regs.test(phone)) {
                        _tip2.default.error('手机号格式不正确');
                        return false;
                    } else if (e.detail.value.vcode == '') {
                        _tip2.default.error('验证码不能为空');
                        return false;
                    }
                } else {
                    if (phone.length == '') {
                        _tip2.default.error('手机号不为空');
                        return false;
                    } else if (!regs.test(phone)) {
                        _tip2.default.error('手机号格式不正确');
                        return false;
                    } else if (e.detail.value.passwd == '') {
                        _tip2.default.error('请输入密码');
                        return false;
                    }
                }

                wx.showLoading({
                    title: '登录中'
                });

                this.login(data).then(function (data) {
                    if (data.data.returnCode == "AAAAAAA") {
                        // 存储信息到本地
                        var loginInfo = wx.getStorageSync(_constants.LOGIN_INFO) || {};
                        loginInfo.tokenKey = data.data.tokenKey;
                        loginInfo.token = data.data.token;
                        loginInfo.headimg = data.data.data.headimg;
                        wx.setStorageSync(_constants.LOGIN_INFO, loginInfo);

                        wx.setStorage({
                            key: 'loginData',
                            data: data.data
                        });
                        // 跳转到home页
                        wx.switchTab({
                            url: '../personal/personal'
                        });
                    } else {
                        _tip2.default.error(data.data.returnMsg);
                        that.$apply();
                    }
                    wx.hideLoading();
                });
            },

            // 忘记密码页面
            goForgotPage: function goForgotPage() {
                wx.navigateTo({
                    url: 'forgot'
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(LoginPage, [{
        key: 'onLoad',
        value: function onLoad() {
            var that = this;
            // 获取登录信息
            wx.getStorage({
                key: 'loginData',
                success: function success(res) {
                    if (res.data.returnCode == "AAAAAAA") {
                        // 跳转到home页
                        wx.switchTab({
                            url: '../home/home'
                        });
                    }
                }
            });
        }
    }, {
        key: 'countdown',
        value: function countdown() {
            var that = this;
            if (that.wait == 0) {
                that.disabled = false;
                that.buttonvalue = '重新发送';
                this.wait = 60;
                that.$apply();
            } else {
                that.disabled = true;
                that.wait--;
                that.buttonvalue = "已发送(" + that.wait + ")";
                that.$apply();
                setTimeout(function () {
                    that.countdown();
                }, 1000);
            }
        }
    }, {
        key: 'getLoginCode',

        //获取登录验证码
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, code) {
                var json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _api2.default.getLoginCode({
                                    query: {
                                        "head": {
                                            "transcode": code,
                                            "type": "h"
                                        },
                                        "data": data
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

            function getLoginCode(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return getLoginCode;
        }()
        //用户登录

    }, {
        key: 'login',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
                var json;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return _api2.default.loginIn({
                                    query: {
                                        head: {
                                            "transcode": "D0001",
                                            "type": "h"
                                        },
                                        data: data
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

            function login(_x3) {
                return _ref3.apply(this, arguments);
            }

            return login;
        }()
    }, {
        key: 'counttime',
        value: function counttime() {
            var that = this;
            var countdown = 60;
            (function settime() {
                if (countdown == 0) {
                    that.codeObj.value = "发送验证码";
                    that.codeObj.status = true;
                    countdown = 60;
                    that.$apply();
                    return;
                } else {
                    that.codeObj.status = false;
                    that.codeObj.value = "重发(" + countdown + ")";
                    countdown--;
                    that.$apply();
                }
                setTimeout(function () {
                    settime();
                }, 1000);
            })();
        }
    }]);

    return LoginPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(LoginPage , 'pages/login/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvZGUiLCJyZXF1aXJlIiwiTG9naW5QYWdlIiwiZGF0YSIsIndhcm53b3JkIiwidXNlcm5hbWUiLCJwaG9uZSIsImxvZ2luVHlwZSIsInZjb2RlIiwiZGV2aWNlVG9rZW4iLCJidXR0b252YWx1ZSIsImRpc2FibGVkIiwid2FpdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJtZXRob2RzIiwic3dpdGNoYXBwbGV0Iiwid3giLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsInBhdGgiLCJleHRyYURhdGEiLCJlbnZWZXJzaW9uIiwic3VjY2VzcyIsInJlcyIsImZhaWwiLCJpbnB1dENoYW5nZSIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm5hbWUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInRvZ2dsZSIsImluZGV4Iiwic2VuZENvZGUiLCJ0aGF0IiwicmVwbGFjZSIsInJlZ3MiLCJsZW5ndGgiLCJlcnJvciIsInRlc3QiLCJnZXRMb2dpbkNvZGUiLCJ0aGVuIiwicmV0dXJuQ29kZSIsInJldHVybk1zZyIsImNvdW50ZG93biIsImZvcm1TdWJtaXQiLCJoZXhfbWQ1IiwicGFzc3dkIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImxvZ2luIiwibG9naW5JbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0b2tlbktleSIsInRva2VuIiwiaGVhZGltZyIsInNldFN0b3JhZ2VTeW5jIiwic2V0U3RvcmFnZSIsImtleSIsInN3aXRjaFRhYiIsInVybCIsImhpZGVMb2FkaW5nIiwiZ29Gb3Jnb3RQYWdlIiwibmF2aWdhdGVUbyIsImdldFN0b3JhZ2UiLCJzZXRUaW1lb3V0IiwicXVlcnkiLCJqc29uIiwibG9naW5JbiIsImhlYWQiLCJzZXR0aW1lIiwiY29kZU9iaiIsInN0YXR1cyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVB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QUFtQjtBQUNoQixvQkFBSTFCLGFBQWEsQ0FBakIsRUFBb0I7QUFDaEJWLHlCQUFLcUMsT0FBTCxDQUFhMUMsS0FBYixHQUFxQixPQUFyQjtBQUNBSyx5QkFBS3FDLE9BQUwsQ0FBYUMsTUFBYixHQUFzQixJQUF0QjtBQUNBNUIsZ0NBQVksRUFBWjtBQUNBVix5QkFBS0osTUFBTDtBQUNBO0FBQ0gsaUJBTkQsTUFNTztBQUNISSx5QkFBS3FDLE9BQUwsQ0FBYUMsTUFBYixHQUFzQixLQUF0QjtBQUNBdEMseUJBQUtxQyxPQUFMLENBQWExQyxLQUFiLEdBQW1CLFFBQVFlLFNBQVIsR0FBb0IsR0FBdkM7QUFDQUE7QUFDQVYseUJBQUtKLE1BQUw7QUFDSDtBQUNEbUMsMkJBQVcsWUFBVztBQUNsQks7QUFDSCxpQkFGRCxFQUVFLElBRkY7QUFHSCxhQWhCRDtBQWlCSDs7OztFQS9Oa0MsZUFBS0csSTs7a0JBQXZCM0UsUyIsImZpbGUiOiJsb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbmltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuaW1wb3J0IHtcclxuICAgIExPR0lOX0lORk9cclxufSBmcm9tICcuLi8uLi91dGlscy9jb25zdGFudHMnO1xyXG5cclxuLy8gbWQ15Yqg5a+GXHJcbmNvbnN0IGNvZGUgPSByZXF1aXJlKCcuLi8uLi91dGlscy9tZDUuanMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luUGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICAvLyBuaWNrbmFtZTonJyxcclxuICAgICAgICAvLyBoZWFkaW1nOicnLFxyXG4gICAgICAgIHdhcm53b3JkOicnLFxyXG4gICAgICAgIHVzZXJuYW1lOicnLFxyXG4gICAgICAgIHBob25lOicnLFxyXG4gICAgICAgIGxvZ2luVHlwZTonMScsXHJcbiAgICAgICAgdmNvZGU6JycsXHJcbiAgICAgICAgZGV2aWNlVG9rZW46JycsXHJcbiAgICAgICAgYnV0dG9udmFsdWU6J+WPkemAgemqjOivgeeggScsXHJcbiAgICAgICAgZGlzYWJsZWQ6ZmFsc2UsXHJcbiAgICAgICAgd2FpdDo2MCxcclxuICAgIH1cclxuXHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJycsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyDojrflj5bnmbvlvZXkv6Hmga9cclxuICAgICAgICB3eC5nZXRTdG9yYWdlKHtcclxuICAgICAgICAgICAga2V5OiAnbG9naW5EYXRhJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZihyZXMuZGF0YS5yZXR1cm5Db2RlPT1cIkFBQUFBQUFcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6Lez6L2s5YiwaG9tZemhtVxyXG4gICAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4uL2hvbWUvaG9tZSdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBjb3VudGRvd24oKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgICAgaWYgKHRoYXQud2FpdCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZGlzYWJsZWQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoYXQuYnV0dG9udmFsdWU9J+mHjeaWsOWPkemAgSc7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdD02MDtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhhdC5kaXNhYmxlZD10cnVlO1xyXG4gICAgICAgICAgdGhhdC53YWl0LS1cclxuICAgICAgICAgIHRoYXQuYnV0dG9udmFsdWU9XCLlt7Llj5HpgIEoXCIgKyB0aGF0LndhaXQgKyBcIilcIjtcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jb3VudGRvd24oKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMDApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgc3dpdGNoYXBwbGV0KCl7XHJcbiAgICAgICAgd3gubmF2aWdhdGVUb01pbmlQcm9ncmFtKHtcclxuICAgICAgICAgICAgYXBwSWQ6ICd3eGQ3OTI4YmYxODk4YTMwY2QnLFxyXG4gICAgICAgICAgICBwYXRoOiAncGFnZXMvam9ibGlzdC9qb2JsaXN0JyxcclxuICAgICAgICAgICAgZXh0cmFEYXRhOiB7fSxcclxuICAgICAgICAgICAgZW52VmVyc2lvbjogJ3RyYWlsJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAvLyDmiZPlvIDmiJDlip9cclxuICAgICAgICAgICAgfSxmYWlsKCl7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgaW5wdXRDaGFuZ2UoZSl7XHJcbiAgICAgICAgICB0aGlzW2UuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVdPWUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIHRvZ2dsZShlKXtcclxuICAgICAgICB2YXIgaW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICAgIHRoaXMubG9naW5UeXBlPWluZGV4XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgLy8g5Y+R6YCB6aqM6K+B56CBXHJcbiAgICAgIHNlbmRDb2RlICgpIHtcclxuICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgdmFyIHBob25lPXRoYXQucGhvbmUucmVwbGFjZSgvXFxzL2csIFwiXCIpOy8v5Y676Zmk56m65qC8XHJcbiAgICAgICAgICAvL+agoemqjOaJi+acuuWPt++8jOWPt+auteS4u+imgeaciSjkuI3ljIXmi6zkuIrnvZHljaEp77yaMTMwfjEzOeOAgTE1MH4xNTPvvIwxNTV+MTU577yMMTgwfjE4OeOAgTE3MH4xNzHjgIExNzZ+MTc444CCMTTlj7fmrrXkuLrkuIrnvZHljaHkuJPlsZ7lj7fmrrVcclxuICAgICAgICAgIGxldCByZWdzID0gL14oKDEzWzAtOV0pfCgxN1swLTEsNi04XSl8KDE1W140LFxcXFxEXSl8KDE4WzAtOV0pKVxcZHs4fSQvO1xyXG4gICAgICAgICAgaWYocGhvbmUubGVuZ3RoPT0nJyl7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcign5omL5py65Y+35LiN5Li656m6JylcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9ZWxzZSBpZighcmVncy50ZXN0KHBob25lKSl7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcign5omL5py65Y+35qC85byP5LiN5q2j56GuJylcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGF0LmdldExvZ2luQ29kZSh7XCJwaG9uZVwiOnRoYXQucGhvbmV9LFwiRDAwMDJcIikudGhlbihkYXRhPT57XHJcbiAgICAgICAgICAgICAgaWYoZGF0YS5kYXRhLnJldHVybkNvZGUgIT0gXCJBQUFBQUFBXCIgKXtcclxuICAgICAgICAgICAgICAgICAgdGlwLmVycm9yKGRhdGEuZGF0YS5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICB0aGF0LmNvdW50ZG93bigpXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICB9LFxyXG4gICAgICAgIC8vIOaPkOS6pOihqOWNlVxyXG4gICAgICAgIGZvcm1TdWJtaXQgKGUpIHtcclxuXHJcblxyXG4gICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGhvbmU9ZS5kZXRhaWwudmFsdWUudXNlcm5hbWUucmVwbGFjZSgvXFxzL2csIFwiXCIpOy8v5Y676Zmk56m65qC8XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBlLmRldGFpbC52YWx1ZS51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgIFwicGFzc3dkXCI6dGhhdC5sb2dpblR5cGU9PTE/IGNvZGUuaGV4X21kNShlLmRldGFpbC52YWx1ZS5wYXNzd2QpOicnLFxyXG4gICAgICAgICAgICAgICAgXCJsb2dpblR5cGVcIjp0aGF0LmxvZ2luVHlwZSxcclxuICAgICAgICAgICAgICAgIFwidmNvZGVcIjp0aGF0LmxvZ2luVHlwZT09MT8nJzp0aGF0LnZjb2RlLFxyXG4gICAgICAgICAgICAgICAgXCJkZXZpY2VUb2tlblwiOicnLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZWdzID0gL14oKDEzWzAtOV0pfCgxN1swLTEsNi04XSl8KDE1W140LFxcXFxEXSl8KDE4WzAtOV0pKVxcZHs4fSQvO1xyXG4gICAgICAgICAgICBpZih0aGF0LmxvZ2luVHlwZT09Mil7XHJcblxyXG4gICAgICAgICAgICAgIGlmKHBob25lLmxlbmd0aD09Jycpe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKCfmiYvmnLrlj7fkuI3kuLrnqbonKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgfWVsc2UgaWYoIXJlZ3MudGVzdChwaG9uZSkpe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKCfmiYvmnLrlj7fmoLzlvI/kuI3mraPnoa4nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgfWVsc2UgaWYoZS5kZXRhaWwudmFsdWUudmNvZGU9PScnKXtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcign6aqM6K+B56CB5LiN6IO95Li656m6JylcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgaWYocGhvbmUubGVuZ3RoPT0nJyl7XHJcbiAgICAgICAgICAgICAgICB0aXAuZXJyb3IoJ+aJi+acuuWPt+S4jeS4uuepuicpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICB9ZWxzZSBpZighcmVncy50ZXN0KHBob25lKSl7XHJcbiAgICAgICAgICAgICAgICB0aXAuZXJyb3IoJ+aJi+acuuWPt+agvOW8j+S4jeato+ehricpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICB9ZWxzZSBpZihlLmRldGFpbC52YWx1ZS5wYXNzd2Q9PScnKXtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcign6K+36L6T5YWl5a+G56CBJylcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn55m75b2V5LitJyxcclxuICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZ2luKGRhdGEpLnRoZW4oZGF0YT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlrZjlgqjkv6Hmga/liLDmnKzlnLBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbG9naW5JbmZvID0gIHd4LmdldFN0b3JhZ2VTeW5jKExPR0lOX0lORk8pIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2luSW5mby50b2tlbktleSA9IGRhdGEuZGF0YS50b2tlbktleTtcclxuICAgICAgICAgICAgICAgICAgICBsb2dpbkluZm8udG9rZW4gPSBkYXRhLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgbG9naW5JbmZvLmhlYWRpbWcgPSBkYXRhLmRhdGEuZGF0YS5oZWFkaW1nO1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKExPR0lOX0lORk8sIGxvZ2luSW5mbyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6J2xvZ2luRGF0YScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ZGF0YS5kYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6Lez6L2s5YiwaG9tZemhtVxyXG4gICAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJy4uL3BlcnNvbmFsL3BlcnNvbmFsJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihkYXRhLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g5b+Y6K6w5a+G56CB6aG16Z2iXHJcbiAgICAgICAgZ29Gb3Jnb3RQYWdlKCl7XHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnZm9yZ290J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+iOt+WPlueZu+W9lemqjOivgeeggVxyXG4gICAgYXN5bmMgZ2V0TG9naW5Db2RlKGRhdGEsY29kZSkge1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0TG9naW5Db2RlKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgXCJoZWFkXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBjb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBkYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG4gICAgLy/nlKjmiLfnmbvlvZVcclxuICAgIGFzeW5jIGxvZ2luKGRhdGEpIHtcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmxvZ2luSW4oe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJEMDAwMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9XHJcbiAgICBjb3VudHRpbWUoKXtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgIHZhciBjb3VudGRvd24gPSA2MDtcclxuICAgICAgICAoZnVuY3Rpb24gc2V0dGltZSgpIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvZGVPYmoudmFsdWUgPSBcIuWPkemAgemqjOivgeeggVwiO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jb2RlT2JqLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb3VudGRvd24gPSA2MDtcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvZGVPYmouc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvZGVPYmoudmFsdWU9XCLph43lj5EoXCIgKyBjb3VudGRvd24gKyBcIilcIjtcclxuICAgICAgICAgICAgICAgIGNvdW50ZG93bi0tO1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0dGltZSgpXHJcbiAgICAgICAgICAgIH0sMTAwMClcclxuICAgICAgICB9KSgpXHJcbiAgICB9XHJcbn1cclxuIl19