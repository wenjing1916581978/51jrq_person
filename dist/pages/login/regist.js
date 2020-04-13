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
                var data = {
                    "phone": e.detail.value.phone,
                    "verifycode": e.detail.value.verifycode,
                    "password": code.hex_md5(e.detail.value.password)
                };
                this.getCode(data, "R0001").then(function (data) {
                    if (data.data.returnCode == "AAAAAAA") {
                        _tip2.default.success("操作成功");
                        // 跳转到登录页
                        wx.navigateTo({
                            url: 'login'
                        });
                    } else {
                        that.warnword = data.data.returnMsg;
                        that.$apply();
                    }
                    wx.hideLoading();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdC5qcyJdLCJuYW1lcyI6WyJjb2RlIiwicmVxdWlyZSIsIlJlZ2lzdFBhZ2UiLCJkYXRhIiwicGhvbmUiLCJ3YXJud29yZCIsIm5pY2tuYW1lIiwiaGVhZGltZyIsImNvZGVPYmoiLCJzdGF0dXMiLCJ2YWx1ZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJtZXRob2RzIiwiZm9ybVN1Ym1pdCIsImUiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJ0aGF0IiwiZGV0YWlsIiwidmVyaWZ5Y29kZSIsImhleF9tZDUiLCJwYXNzd29yZCIsImdldENvZGUiLCJ0aGVuIiwicmV0dXJuQ29kZSIsInN1Y2Nlc3MiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmV0dXJuTXNnIiwiJGFwcGx5IiwiaGlkZUxvYWRpbmciLCJzZXRQYXNzd29yZCIsInNlbmRDb2RlIiwiY291bnR0aW1lIiwidXNlck5hbWVJbnB1dCIsImdldFVzZXJJbmZvIiwicmVzIiwidXNlckluZm8iLCJuaWNrTmFtZSIsImF2YXRhclVybCIsImdldFZlcmlmeUNvZGUiLCJxdWVyeSIsImpzb24iLCJjb3VudGRvd24iLCJzZXR0aW1lIiwic2V0VGltZW91dCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLE9BQU9DLFFBQVEsb0JBQVIsQ0FBYjs7SUFFcUJDLFU7Ozs7Ozs7Ozs7Ozs7O2tNQUNqQkMsSSxHQUFPO0FBQ0hDLG1CQUFPLEVBREo7QUFFSEMsc0JBQVUsRUFGUDtBQUdIQyxzQkFBUyxFQUhOO0FBSUhDLHFCQUFRLEVBSkw7QUFLSEMscUJBQVM7QUFDTEMsd0JBQVEsSUFESDtBQUVMQyx1QkFBTTtBQUZEO0FBTE4sUyxRQVdQQyxNLEdBQVM7QUFDTEMsb0NBQXdCLElBRG5CO0FBRUxDLG1DQUF1QjtBQUZsQixTLFFBS1RDLE8s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QUFDQTtBQUNILGlCQU5ELE1BTU87QUFDSFoseUJBQUtaLE9BQUwsQ0FBYUMsTUFBYixHQUFzQixLQUF0QjtBQUNBVyx5QkFBS1osT0FBTCxDQUFhRSxLQUFiLEdBQW1CLFFBQVFvQyxTQUFSLEdBQW9CLEdBQXZDO0FBQ0FBO0FBQ0ExQix5QkFBS1ksTUFBTDtBQUNIO0FBQ0RnQiwyQkFBVyxZQUFXO0FBQ2xCRDtBQUNILGlCQUZELEVBRUUsSUFGRjtBQUdILGFBaEJEO0FBaUJIOzs7O0VBL0dtQyxlQUFLRSxJOztrQkFBeEIvQyxVIiwiZmlsZSI6InJlZ2lzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG5cclxuLy8gbWQ15Yqg5a+GXHJcbmNvbnN0IGNvZGUgPSByZXF1aXJlKCcuLi8uLi91dGlscy9tZDUuanMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZ2lzdFBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBwaG9uZTogJycsXHJcbiAgICAgICAgd2FybndvcmQ6ICcnLFxyXG4gICAgICAgIG5pY2tuYW1lOicnLFxyXG4gICAgICAgIGhlYWRpbWc6JycsXHJcbiAgICAgICAgY29kZU9iajoge1xyXG4gICAgICAgICAgICBzdGF0dXM6IHRydWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiflj5HpgIHpqozor4HnoIEnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5rOo5YaMJyxcclxuICAgICAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAvLyDmj5DkuqTooajljZVcclxuICAgICAgICBmb3JtU3VibWl0IChlKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5rOo5YaM5LitJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJwaG9uZVwiOiBlLmRldGFpbC52YWx1ZS5waG9uZSxcclxuICAgICAgICAgICAgICAgIFwidmVyaWZ5Y29kZVwiOiBlLmRldGFpbC52YWx1ZS52ZXJpZnljb2RlLFxyXG4gICAgICAgICAgICAgICAgXCJwYXNzd29yZFwiOiBjb2RlLmhleF9tZDUoZS5kZXRhaWwudmFsdWUucGFzc3dvcmQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5nZXRDb2RlKGRhdGEsXCJSMDAwMVwiKS50aGVuKGRhdGE9PntcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLmk43kvZzmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6Lez6L2s5Yiw55m75b2V6aG1XHJcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2xvZ2luJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC53YXJud29yZCA9IGRhdGEuZGF0YS5yZXR1cm5Nc2c7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOiuvue9ruWvhueggVxyXG4gICAgICAgIHNldFBhc3N3b3JkICgpIHtcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGBzZXRfcGFzc3dvcmRgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDlj5HpgIHpqozor4HnoIFcclxuICAgICAgICBzZW5kQ29kZSAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmdldENvZGUoe1wicGhvbmVcIjp0aGlzLnBob25lfSxcIlIwMDAyXCIpLnRoZW4oZGF0YT0+e1xyXG4gICAgICAgICAgICAgICAgdGhhdC53YXJud29yZCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5kYXRhLnJldHVybkNvZGUgIT0gXCJBQUFBQUFBXCIgKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lndhcm53b3JkID0gZGF0YS5kYXRhLnJldHVybk1zZztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY291bnR0aW1lKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDojrflj5bovpPlhaXmoYbmiYvmnLrlj7dcclxuICAgICAgICB1c2VyTmFtZUlucHV0IChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgd3guZ2V0VXNlckluZm8oe1xyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubmlja25hbWUgPSByZXMudXNlckluZm8ubmlja05hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmhlYWRpbWcgPSByZXMudXNlckluZm8uYXZhdGFyVXJsO1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/mlrDnlKjmiLfojrflj5bpqozor4HnoIHlj4rms6jlhoxcclxuICAgIGFzeW5jIGdldENvZGUoZGF0YSxjb2RlKSB7XHJcbiAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRWZXJpZnlDb2RlKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgXCJoZWFkXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBjb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBkYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG4gICAgY291bnR0aW1lKCl7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgICB2YXIgY291bnRkb3duID0gNjA7XHJcbiAgICAgICAgKGZ1bmN0aW9uIHNldHRpbWUoKSB7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGRvd24gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jb2RlT2JqLnZhbHVlID0gXCLlj5HpgIHpqozor4HnoIFcIjtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29kZU9iai5zdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY291bnRkb3duID0gNjA7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jb2RlT2JqLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jb2RlT2JqLnZhbHVlPVwi6YeN5Y+RKFwiICsgY291bnRkb3duICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICBjb3VudGRvd24tLTtcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNldHRpbWUoKVxyXG4gICAgICAgICAgICB9LDEwMDApXHJcbiAgICAgICAgfSkoKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==