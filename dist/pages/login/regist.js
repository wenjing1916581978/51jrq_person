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

// md5加密
var code = require('./../../utils/md5.js');

var RegistPage = function (_wepy$page) {
    _inherits(RegistPage, _wepy$page);

    function RegistPage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, RegistPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RegistPage.__proto__ || Object.getPrototypeOf(RegistPage)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            phone: '',
            warnword: '',
            nickname: '',
            headimg: '',
            codeObj: {
                status: true,
                value: '发送验证码'
            }
        }, _this.config = {
            navigationBarTitleText: '注册',
            enablePullDownRefresh: false
        }, _this.methods = {
            // 提交表单
            formSubmit: function formSubmit(e) {
                wx.showLoading({
                    title: '注册中'
                });
                var that = this;
                var phone = e.detail.value.phone;
                var pass = code.hex_md5(e.detail.value.password);
                var data = {
                    "phone": phone,
                    "verifycode": e.detail.value.verifycode,
                    "password": pass
                };
                this.getCode(data, "R0001").then(function (data) {
                    if (data.data.returnCode == "AAAAAAA") {
                        _tip2.default.success("操作成功");
                        // 跳转到登录页
                        that.login(phone, pass);
                    } else {
                        wx.hideLoading();
                        that.warnword = data.data.returnMsg;
                        that.$apply();
                    }
                });
            },

            // 设置密码
            setPassword: function setPassword() {
                wx.navigateTo({
                    url: 'set_password'
                });
            },

            // 发送验证码
            sendCode: function sendCode() {
                var that = this;
                this.getCode({ "phone": this.phone }, "R0002").then(function (data) {
                    that.warnword = '';
                    if (data.data.returnCode != "AAAAAAA") {
                        that.warnword = data.data.returnMsg;
                    } else {
                        that.counttime();
                    }
                    that.$apply();
                });
            },

            // 获取输入框手机号
            userNameInput: function userNameInput(e) {
                this.phone = e.detail.value;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RegistPage, [{
        key: 'onLoad',
        value: function onLoad() {
            var that = this;
            wx.getUserInfo({
                success: function success(res) {
                    that.nickname = res.userInfo.nickName;
                    that.headimg = res.userInfo.avatarUrl;
                    that.$apply();
                }
            });
        }

        //新用户获取验证码及注册

    }, {
        key: 'getCode',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data, code) {
                var json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _api2.default.getVerifyCode({
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

            function getCode(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return getCode;
        }()

        // 登录

    }, {
        key: 'login',
        value: function login(phone, pass) {
            var that = this;
            console.log('进入到登录界面');
            _api2.default.loginIn({
                query: {
                    head: {
                        "transcode": "D0001",
                        "type": "h"
                    },
                    data: {
                        "username": phone,
                        "passwd": pass,
                        "loginType": '1',
                        "vcode": '',
                        "deviceToken": ''
                    }
                }
            }).then(function (res) {
                var json = res.data;
                wx.hideLoading();
                if (json.returnCode == "AAAAAAA") {
                    wx.setStorage({
                        key: 'loginData',
                        data: json
                    });
                    wx.setStorageSync('login', json);

                    if (json.data.userstatus == 1) {
                        wx.switchTab({
                            url: '/pages/personal/personal'
                        });
                    } else {
                        wx.navigateTo({
                            url: '/pages/personal/base_edit?perfect=true'
                        });
                    }
                } else {
                    _tip2.default.error(json.returnMsg);
                    that.$apply();
                }
            }).catch(function (err) {});
        }
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

    return RegistPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(RegistPage , 'pages/login/regist'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdC5qcyJdLCJuYW1lcyI6WyJjb2RlIiwicmVxdWlyZSIsIlJlZ2lzdFBhZ2UiLCJkYXRhIiwicGhvbmUiLCJ3YXJud29yZCIsIm5pY2tuYW1lIiwiaGVhZGltZyIsImNvZGVPYmoiLCJzdGF0dXMiLCJ2YWx1ZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJtZXRob2RzIiwiZm9ybVN1Ym1pdCIsImUiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJ0aGF0IiwiZGV0YWlsIiwicGFzcyIsImhleF9tZDUiLCJwYXNzd29yZCIsInZlcmlmeWNvZGUiLCJnZXRDb2RlIiwidGhlbiIsInJldHVybkNvZGUiLCJzdWNjZXNzIiwibG9naW4iLCJoaWRlTG9hZGluZyIsInJldHVybk1zZyIsIiRhcHBseSIsInNldFBhc3N3b3JkIiwibmF2aWdhdGVUbyIsInVybCIsInNlbmRDb2RlIiwiY291bnR0aW1lIiwidXNlck5hbWVJbnB1dCIsImdldFVzZXJJbmZvIiwicmVzIiwidXNlckluZm8iLCJuaWNrTmFtZSIsImF2YXRhclVybCIsImdldFZlcmlmeUNvZGUiLCJxdWVyeSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwibG9naW5JbiIsImhlYWQiLCJzZXRTdG9yYWdlIiwia2V5Iiwic2V0U3RvcmFnZVN5bmMiLCJ1c2Vyc3RhdHVzIiwic3dpdGNoVGFiIiwiZXJyb3IiLCJjYXRjaCIsImNvdW50ZG93biIsInNldHRpbWUiLCJzZXRUaW1lb3V0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0EsSUFBTUEsT0FBT0MsUUFBUSxvQkFBUixDQUFiOztJQUVxQkMsVTs7Ozs7Ozs7Ozs7Ozs7a01BQ2pCQyxJLEdBQU87QUFDSEMsbUJBQU8sRUFESjtBQUVIQyxzQkFBVSxFQUZQO0FBR0hDLHNCQUFTLEVBSE47QUFJSEMs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QjtBQUNBVSx5QkFBS1osT0FBTCxDQUFhQyxNQUFiLEdBQXNCLElBQXRCO0FBQ0FrRCxnQ0FBWSxFQUFaO0FBQ0F2Qyx5QkFBS2EsTUFBTDtBQUNBO0FBQ0gsaUJBTkQsTUFNTztBQUNIYix5QkFBS1osT0FBTCxDQUFhQyxNQUFiLEdBQXNCLEtBQXRCO0FBQ0FXLHlCQUFLWixPQUFMLENBQWFFLEtBQWIsR0FBbUIsUUFBUWlELFNBQVIsR0FBb0IsR0FBdkM7QUFDQUE7QUFDQXZDLHlCQUFLYSxNQUFMO0FBQ0g7QUFDRDRCLDJCQUFXLFlBQVc7QUFDbEJEO0FBQ0gsaUJBRkQsRUFFRSxJQUZGO0FBR0gsYUFoQkQ7QUFpQkg7Ozs7RUFqS21DLGVBQUtFLEk7O2tCQUF4QjVELFUiLCJmaWxlIjoicmVnaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG5pbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcblxyXG4vLyBtZDXliqDlr4ZcclxuY29uc3QgY29kZSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL21kNS5qcycpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVnaXN0UGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHBob25lOiAnJyxcclxuICAgICAgICB3YXJud29yZDogJycsXHJcbiAgICAgICAgbmlja25hbWU6JycsXHJcbiAgICAgICAgaGVhZGltZzonJyxcclxuICAgICAgICBjb2RlT2JqOiB7XHJcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgdmFsdWU6J+WPkemAgemqjOivgeeggSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfms6jlhownLFxyXG4gICAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIC8vIOaPkOS6pOihqOWNlVxyXG4gICAgICAgIGZvcm1TdWJtaXQgKGUpIHtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfms6jlhozkuK0nLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHBob25lID0gZS5kZXRhaWwudmFsdWUucGhvbmVcclxuICAgICAgICAgICAgbGV0IHBhc3MgPSBjb2RlLmhleF9tZDUoZS5kZXRhaWwudmFsdWUucGFzc3dvcmQpXHJcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJwaG9uZVwiOnBob25lLFxyXG4gICAgICAgICAgICAgICAgXCJ2ZXJpZnljb2RlXCI6IGUuZGV0YWlsLnZhbHVlLnZlcmlmeWNvZGUsXHJcbiAgICAgICAgICAgICAgICBcInBhc3N3b3JkXCI6IHBhc3NcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdldENvZGUoZGF0YSxcIlIwMDAxXCIpLnRoZW4oZGF0YT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXAuc3VjY2VzcyhcIuaTjeS9nOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyDot7PovazliLDnmbvlvZXpobVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvZ2luKHBob25lLHBhc3MpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC53YXJud29yZCA9IGRhdGEuZGF0YS5yZXR1cm5Nc2c7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDorr7nva7lr4bnoIFcclxuICAgICAgICBzZXRQYXNzd29yZCAoKSB7XHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBgc2V0X3Bhc3N3b3JkYFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g5Y+R6YCB6aqM6K+B56CBXHJcbiAgICAgICAgc2VuZENvZGUgKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5nZXRDb2RlKHtcInBob25lXCI6dGhpcy5waG9uZX0sXCJSMDAwMlwiKS50aGVuKGRhdGE9PntcclxuICAgICAgICAgICAgICAgIHRoYXQud2FybndvcmQgPSAnJztcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuZGF0YS5yZXR1cm5Db2RlICE9IFwiQUFBQUFBQVwiICl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC53YXJud29yZCA9IGRhdGEuZGF0YS5yZXR1cm5Nc2c7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNvdW50dGltZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g6I635Y+W6L6T5YWl5qGG5omL5py65Y+3XHJcbiAgICAgICAgdXNlck5hbWVJbnB1dCAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBob25lID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHd4LmdldFVzZXJJbmZvKHtcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5pY2tuYW1lID0gcmVzLnVzZXJJbmZvLm5pY2tOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5oZWFkaW1nID0gcmVzLnVzZXJJbmZvLmF2YXRhclVybDtcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5paw55So5oi36I635Y+W6aqM6K+B56CB5Y+K5rOo5YaMXHJcbiAgICBhc3luYyBnZXRDb2RlKGRhdGEsY29kZSkge1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0VmVyaWZ5Q29kZSh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgIFwiaGVhZFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogY29kZSxcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcImRhdGFcIjogZGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g55m75b2VXHJcbiAgICBsb2dpbihwaG9uZSxwYXNzKXtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgY29uc29sZS5sb2coJ+i/m+WFpeWIsOeZu+W9leeVjOmdoicpXHJcbiAgICAgIGFwaS5sb2dpbkluKHtcclxuICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiRDAwMDFcIixcclxuICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgXCJ1c2VybmFtZVwiOiBwaG9uZSxcclxuICAgICAgICAgICAgICAgICBcInBhc3N3ZFwiOnBhc3MsXHJcbiAgICAgICAgICAgICAgICAgXCJsb2dpblR5cGVcIjonMScsXHJcbiAgICAgICAgICAgICAgICAgXCJ2Y29kZVwiOicnLFxyXG4gICAgICAgICAgICAgICAgIFwiZGV2aWNlVG9rZW5cIjonJyxcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgIGxldCBqc29uID0gcmVzLmRhdGFcclxuICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgaWYoanNvbi5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgICAga2V5Oidsb2dpbkRhdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgZGF0YTpqc29uXHJcbiAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygnbG9naW4nLGpzb24pXHJcblxyXG4gICAgICAgICAgICAgICBpZihqc29uLmRhdGEudXNlcnN0YXR1cz09MSl7XHJcbiAgICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3BlcnNvbmFsL3BlcnNvbmFsJ1xyXG4gICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvcGVyc29uYWwvYmFzZV9lZGl0P3BlcmZlY3Q9dHJ1ZSdcclxuICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgIH0pLmNhdGNoKGVycj0+e1xyXG5cclxuICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvdW50dGltZSgpe1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgdmFyIGNvdW50ZG93biA9IDYwO1xyXG4gICAgICAgIChmdW5jdGlvbiBzZXR0aW1lKCkge1xyXG4gICAgICAgICAgICBpZiAoY291bnRkb3duID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29kZU9iai52YWx1ZSA9IFwi5Y+R6YCB6aqM6K+B56CBXCI7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvZGVPYmouc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvdW50ZG93biA9IDYwO1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29kZU9iai5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29kZU9iai52YWx1ZT1cIumHjeWPkShcIiArIGNvdW50ZG93biArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgY291bnRkb3duLS07XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzZXR0aW1lKClcclxuICAgICAgICAgICAgfSwxMDAwKVxyXG4gICAgICAgIH0pKClcclxuICAgIH1cclxufVxyXG4iXX0=