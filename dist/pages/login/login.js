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

                this.login(data).then(function (res) {
                    var json = res.data;
                    if (json.returnCode == "AAAAAAA") {
                        wx.hideLoading();
                        // 存储信息到本地
                        var loginInfo = wx.getStorageSync(_constants.LOGIN_INFO) || {};
                        loginInfo.tokenKey = json.tokenKey;
                        loginInfo.token = json.token;
                        loginInfo.headimg = json.data.headimg;
                        wx.setStorageSync(_constants.LOGIN_INFO, loginInfo);

                        wx.setStorage({
                            key: 'loginData',
                            data: json
                        });
                        wx.setStorageSync('login', json);
                        wx.switchTab({
                            url: '/pages/personal/personal'
                        });
                        // if(json.data.userstatus==1){
                        //   wx.switchTab({
                        //       url: '/pages/personal/personal'
                        //   });
                        // }else{
                        //   wx.navigateTo({
                        //       url: '/pages/personal/base_edit?perfect=true'
                        //   });
                        //
                        // }

                    } else {
                        _tip2.default.error(json.returnMsg);
                        that.$apply();
                    }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImNvZGUiLCJyZXF1aXJlIiwiTG9naW5QYWdlIiwiZGF0YSIsIndhcm53b3JkIiwidXNlcm5hbWUiLCJwaG9uZSIsImxvZ2luVHlwZSIsInZjb2RlIiwiZGV2aWNlVG9rZW4iLCJidXR0b252YWx1ZSIsImRpc2FibGVkIiwid2FpdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJtZXRob2RzIiwic3dpdGNoYXBwbGV0Iiwid3giLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsInBhdGgiLCJleHRyYURhdGEiLCJlbnZWZXJzaW9uIiwic3VjY2VzcyIsInJlcyIsImZhaWwiLCJpbnB1dENoYW5nZSIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm5hbWUiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInRvZ2dsZSIsImluZGV4Iiwic2VuZENvZGUiLCJ0aGF0IiwicmVwbGFjZSIsInJlZ3MiLCJsZW5ndGgiLCJlcnJvciIsInRlc3QiLCJnZXRMb2dpbkNvZGUiLCJ0aGVuIiwicmV0dXJuQ29kZSIsInJldHVybk1zZyIsImNvdW50ZG93biIsImZvcm1TdWJtaXQiLCJoZXhfbWQ1IiwicGFzc3dkIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImxvZ2luIiwianNvbiIsImhpZGVMb2FkaW5nIiwibG9naW5JbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJ0b2tlbktleSIsInRva2VuIiwiaGVhZGltZyIsInNldFN0b3JhZ2VTeW5jIiwic2V0U3RvcmFnZSIsImtleSIsInN3aXRjaFRhYiIsInVybCIsImdvRm9yZ290UGFnZSIsIm5hdmlnYXRlVG8iLCJzZXRUaW1lb3V0IiwicXVlcnkiLCJsb2dpbkluIiwiaGVhZCIsInNldHRpbWUiLCJjb2RlT2JqIiwic3RhdHVzIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztB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QUNILGlCQU5ELE1BTU87QUFDSEkseUJBQUtvQyxPQUFMLENBQWFDLE1BQWIsR0FBc0IsS0FBdEI7QUFDQXJDLHlCQUFLb0MsT0FBTCxDQUFhekMsS0FBYixHQUFtQixRQUFRZSxTQUFSLEdBQW9CLEdBQXZDO0FBQ0FBO0FBQ0FWLHlCQUFLSixNQUFMO0FBQ0g7QUFDRG1DLDJCQUFXLFlBQVc7QUFDbEJJO0FBQ0gsaUJBRkQsRUFFRSxJQUZGO0FBR0gsYUFoQkQ7QUFpQkg7Ozs7RUFsT2tDLGVBQUtHLEk7O2tCQUF2QjFFLFMiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG5pbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcbmltcG9ydCB7XHJcbiAgICBMT0dJTl9JTkZPXHJcbn0gZnJvbSAnLi4vLi4vdXRpbHMvY29uc3RhbnRzJztcclxuXHJcbi8vIG1kNeWKoOWvhlxyXG5jb25zdCBjb2RlID0gcmVxdWlyZSgnLi4vLi4vdXRpbHMvbWQ1LmpzJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgLy8gbmlja25hbWU6JycsXHJcbiAgICAgICAgLy8gaGVhZGltZzonJyxcclxuICAgICAgICB3YXJud29yZDonJyxcclxuICAgICAgICB1c2VybmFtZTonJyxcclxuICAgICAgICBwaG9uZTonJyxcclxuICAgICAgICBsb2dpblR5cGU6JzEnLFxyXG4gICAgICAgIHZjb2RlOicnLFxyXG4gICAgICAgIGRldmljZVRva2VuOicnLFxyXG4gICAgICAgIGJ1dHRvbnZhbHVlOiflj5HpgIHpqozor4HnoIEnLFxyXG4gICAgICAgIGRpc2FibGVkOmZhbHNlLFxyXG4gICAgICAgIHdhaXQ6NjAsXHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICcnLFxyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2VcclxuICAgIH1cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgfVxyXG4gICAgY291bnRkb3duKCkge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgIGlmICh0aGF0LndhaXQgPT0gMCkge1xyXG4gICAgICAgICAgICB0aGF0LmRpc2FibGVkPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGF0LmJ1dHRvbnZhbHVlPSfph43mlrDlj5HpgIEnO1xyXG4gICAgICAgICAgICB0aGlzLndhaXQ9NjA7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoYXQuZGlzYWJsZWQ9dHJ1ZTtcclxuICAgICAgICAgIHRoYXQud2FpdC0tXHJcbiAgICAgICAgICB0aGF0LmJ1dHRvbnZhbHVlPVwi5bey5Y+R6YCBKFwiICsgdGhhdC53YWl0ICsgXCIpXCI7XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY291bnRkb3duKClcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHN3aXRjaGFwcGxldCgpe1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3hkNzkyOGJmMTg5OGEzMGNkJyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2pvYmxpc3Qvam9ibGlzdCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge30sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICd0cmFpbCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH0sZmFpbCgpe1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIGlucHV0Q2hhbmdlKGUpe1xyXG4gICAgICAgICAgdGhpc1tlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXT1lLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9LFxyXG4gICAgICB0b2dnbGUoZSl7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcclxuICAgICAgICB0aGlzLmxvZ2luVHlwZT1pbmRleFxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfSxcclxuXHJcbiAgICAgIC8vIOWPkemAgemqjOivgeeggVxyXG4gICAgICBzZW5kQ29kZSAoKSB7XHJcbiAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgIHZhciBwaG9uZT10aGF0LnBob25lLnJlcGxhY2UoL1xccy9nLCBcIlwiKTsvL+WOu+mZpOepuuagvFxyXG4gICAgICAgICAgLy/moKHpqozmiYvmnLrlj7fvvIzlj7fmrrXkuLvopoHmnIko5LiN5YyF5ous5LiK572R5Y2hKe+8mjEzMH4xMznjgIExNTB+MTUz77yMMTU1fjE1Oe+8jDE4MH4xODnjgIExNzB+MTcx44CBMTc2fjE3OOOAgjE05Y+35q615Li65LiK572R5Y2h5LiT5bGe5Y+35q61XHJcbiAgICAgICAgICBsZXQgcmVncyA9IC9eKCgxM1swLTldKXwoMTdbMC0xLDYtOF0pfCgxNVteNCxcXFxcRF0pfCgxOFswLTldKSlcXGR7OH0kLztcclxuICAgICAgICAgIGlmKHBob25lLmxlbmd0aD09Jycpe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+aJi+acuuWPt+S4jeS4uuepuicpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfWVsc2UgaWYoIXJlZ3MudGVzdChwaG9uZSkpe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+aJi+acuuWPt+agvOW8j+S4jeato+ehricpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhhdC5nZXRMb2dpbkNvZGUoe1wicGhvbmVcIjp0aGF0LnBob25lfSxcIkQwMDAyXCIpLnRoZW4oZGF0YT0+e1xyXG4gICAgICAgICAgICAgIGlmKGRhdGEuZGF0YS5yZXR1cm5Db2RlICE9IFwiQUFBQUFBQVwiICl7XHJcbiAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihkYXRhLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgdGhhdC5jb3VudGRvd24oKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgfSxcclxuICAgICAgICAvLyDmj5DkuqTooajljZVcclxuICAgICAgICBmb3JtU3VibWl0IChlKSB7XHJcblxyXG5cclxuICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBob25lPWUuZGV0YWlsLnZhbHVlLnVzZXJuYW1lLnJlcGxhY2UoL1xccy9nLCBcIlwiKTsvL+WOu+mZpOepuuagvFxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIFwidXNlcm5hbWVcIjogZS5kZXRhaWwudmFsdWUudXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgICBcInBhc3N3ZFwiOnRoYXQubG9naW5UeXBlPT0xPyBjb2RlLmhleF9tZDUoZS5kZXRhaWwudmFsdWUucGFzc3dkKTonJyxcclxuICAgICAgICAgICAgICAgIFwibG9naW5UeXBlXCI6dGhhdC5sb2dpblR5cGUsXHJcbiAgICAgICAgICAgICAgICBcInZjb2RlXCI6dGhhdC5sb2dpblR5cGU9PTE/Jyc6dGhhdC52Y29kZSxcclxuICAgICAgICAgICAgICAgIFwiZGV2aWNlVG9rZW5cIjonJyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmVncyA9IC9eKCgxM1swLTldKXwoMTdbMC0xLDYtOF0pfCgxNVteNCxcXFxcRF0pfCgxOFswLTldKSlcXGR7OH0kLztcclxuICAgICAgICAgICAgaWYodGhhdC5sb2dpblR5cGU9PTIpe1xyXG5cclxuICAgICAgICAgICAgICBpZihwaG9uZS5sZW5ndGg9PScnKXtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcign5omL5py65Y+35LiN5Li656m6JylcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1lbHNlIGlmKCFyZWdzLnRlc3QocGhvbmUpKXtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcign5omL5py65Y+35qC85byP5LiN5q2j56GuJylcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1lbHNlIGlmKGUuZGV0YWlsLnZhbHVlLnZjb2RlPT0nJyl7XHJcbiAgICAgICAgICAgICAgICB0aXAuZXJyb3IoJ+mqjOivgeeggeS4jeiDveS4uuepuicpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGlmKHBob25lLmxlbmd0aD09Jycpe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKCfmiYvmnLrlj7fkuI3kuLrnqbonKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgfWVsc2UgaWYoIXJlZ3MudGVzdChwaG9uZSkpe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKCfmiYvmnLrlj7fmoLzlvI/kuI3mraPnoa4nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgfWVsc2UgaWYoZS5kZXRhaWwudmFsdWUucGFzc3dkPT0nJyl7XHJcbiAgICAgICAgICAgICAgICB0aXAuZXJyb3IoJ+ivt+i+k+WFpeWvhueggScpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+eZu+W9leS4rScsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2dpbihkYXRhKS50aGVuKHJlcz0+e1xyXG4gICAgICAgICAgICAgIGxldCBqc29uID0gcmVzLmRhdGFcclxuICAgICAgICAgICAgICAgIGlmKGpzb24ucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5a2Y5YKo5L+h5oGv5Yiw5pys5ZywXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvZ2luSW5mbyA9ICB3eC5nZXRTdG9yYWdlU3luYyhMT0dJTl9JTkZPKSB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICBsb2dpbkluZm8udG9rZW5LZXkgPSBqc29uLnRva2VuS2V5O1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2luSW5mby50b2tlbiA9IGpzb24udG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgbG9naW5JbmZvLmhlYWRpbWcgPSBqc29uLmRhdGEuaGVhZGltZztcclxuICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhMT0dJTl9JTkZPLCBsb2dpbkluZm8pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5Oidsb2dpbkRhdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOmpzb25cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnbG9naW4nLGpzb24pXHJcbiAgICAgICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3BlcnNvbmFsL3BlcnNvbmFsJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKGpzb24uZGF0YS51c2Vyc3RhdHVzPT0xKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgdXJsOiAnL3BhZ2VzL3BlcnNvbmFsL3BlcnNvbmFsJ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICB1cmw6ICcvcGFnZXMvcGVyc29uYWwvYmFzZV9lZGl0P3BlcmZlY3Q9dHJ1ZSdcclxuICAgICAgICAgICAgICAgICAgICAvLyAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLnJldHVybk1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDlv5jorrDlr4bnoIHpobXpnaJcclxuICAgICAgICBnb0ZvcmdvdFBhZ2UoKXtcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICdmb3Jnb3QnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v6I635Y+W55m75b2V6aqM6K+B56CBXHJcbiAgICBhc3luYyBnZXRMb2dpbkNvZGUoZGF0YSxjb2RlKSB7XHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRMb2dpbkNvZGUoe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBcImhlYWRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IGNvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9XHJcbiAgICAvL+eUqOaIt+eZu+W9lVxyXG4gICAgYXN5bmMgbG9naW4oZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkubG9naW5Jbih7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIkQwMDAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH1cclxuICAgIGNvdW50dGltZSgpe1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgdmFyIGNvdW50ZG93biA9IDYwO1xyXG4gICAgICAgIChmdW5jdGlvbiBzZXR0aW1lKCkge1xyXG4gICAgICAgICAgICBpZiAoY291bnRkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29kZU9iai52YWx1ZSA9IFwi5Y+R6YCB6aqM6K+B56CBXCI7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvZGVPYmouc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvdW50ZG93biA9IDYwO1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29kZU9iai5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29kZU9iai52YWx1ZT1cIumHjeWPkShcIiArIGNvdW50ZG93biArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgY291bnRkb3duLS07XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW1lKClcclxuICAgICAgICAgICAgfSwxMDAwKVxyXG4gICAgICAgIH0pKClcclxuICAgIH1cclxufVxyXG4iXX0=