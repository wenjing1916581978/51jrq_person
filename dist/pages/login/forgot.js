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
            navigationBarTitleText: '忘记密码',
            enablePullDownRefresh: false
        }, _this.methods = {
            // 提交表单
            formSubmit: function formSubmit(e) {
                wx.showLoading({
                    title: '修改中'
                });
                var that = this;
                var data = {
                    "phone": e.detail.value.phone,
                    "verifycode": e.detail.value.verifycode,
                    "password": code.hex_md5(e.detail.value.password)
                };
                this.getCode(data, "A0002").then(function (data) {
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
                this.getCode({ "phone": this.phone }, "A0001").then(function (data) {
                    that.warnword = '';
                    if (data.data.returnCode != "AAAAAAA") {
                        that.warnword = data.data.returnMsg;
                    } else {
                        console.log(data);
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

        //新用户获取验证码及重置密码

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
                                return _api2.default.resetPassword({
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(RegistPage , 'pages/login/forgot'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcmdvdC5qcyJdLCJuYW1lcyI6WyJjb2RlIiwicmVxdWlyZSIsIlJlZ2lzdFBhZ2UiLCJkYXRhIiwicGhvbmUiLCJ3YXJud29yZCIsIm5pY2tuYW1lIiwiaGVhZGltZyIsImNvZGVPYmoiLCJzdGF0dXMiLCJ2YWx1ZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJtZXRob2RzIiwiZm9ybVN1Ym1pdCIsImUiLCJ3eCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJ0aGF0IiwiZGV0YWlsIiwidmVyaWZ5Y29kZSIsImhleF9tZDUiLCJwYXNzd29yZCIsImdldENvZGUiLCJ0aGVuIiwicmV0dXJuQ29kZSIsInN1Y2Nlc3MiLCJuYXZpZ2F0ZVRvIiwidXJsIiwicmV0dXJuTXNnIiwiJGFwcGx5IiwiaGlkZUxvYWRpbmciLCJzZXRQYXNzd29yZCIsInNlbmRDb2RlIiwiY29uc29sZSIsImxvZyIsImNvdW50dGltZSIsInVzZXJOYW1lSW5wdXQiLCJnZXRVc2VySW5mbyIsInJlcyIsInVzZXJJbmZvIiwibmlja05hbWUiLCJhdmF0YXJVcmwiLCJyZXNldFBhc3N3b3JkIiwicXVlcnkiLCJqc29uIiwiY291bnRkb3duIiwic2V0dGltZSIsInNldFRpbWVvdXQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxJQUFNQSxPQUFPQyxRQUFRLG9CQUFSLENBQWI7O0lBRXFCQyxVOzs7Ozs7Ozs7Ozs7OztrTUFDakJDLEksR0FBTztBQUNIQyxtQkFBTyxFQURKO0FBRUhDLHNCQUFVLEVBRlA7QUFHSEMsc0JBQVMsRUFITjtBQUlIQyxxQkFBUSxFQUpMO0FBS0hDLHFCQUFTO0FBQ0xDLHdCQUFRLElBREg7QUFFTEMsdUJBQU07QUFGRDtBQUxOLFMsUUFVUEMsTSxHQUFTO0FBQ0xDLG9DQUF3QixNQURuQjtBQUVMQyxtQ0FBdUI7QUFGbEIsUyxRQUlUQyxPLEdBQVU7QUFDTjtBQUNBQyxzQkFGTSxzQkFFTUMsQ0FGTixFQUVTO0FBQ1hDLG1CQUFHQyxXQUFILENBQWU7QUFDWEMsMkJBQU87QUFESSxpQkFBZjtBQUdBLG9CQUFNQyxPQUFPLElBQWI7QUFDQSxvQkFBSWpCLE9BQU87QUFDUCw2QkFBU2EsRUFBRUssTUFBRixDQUFTWCxLQUFULENBQWVOLEtBRGpCO0FBRVAsa0NBQWNZLEVBQUVLLE1BQUYsQ0FBU1gsS0FBVCxDQUFlWSxVQUZ0QjtBQUdQLGdDQUFZdEIsS0FBS3VCLE9BQUwsQ0FBYVAsRUFBRUssTUFBRixDQUFTWCxLQUFULENBQWVjLFFBQTVCO0FBSEwsaUJBQVg7QUFLQSxxQkFBS0MsT0FBTCxDQUFhdEIsSUFBYixFQUFrQixPQUFsQixFQUEyQnVCLElBQTNCLENBQWdDLGdCQUFNO0FBQ2xDLHdCQUFHdkIsS0FBS0EsSUFBTCxDQUFVd0IsVUFBVixJQUF3QixTQUEzQixFQUFzQztBQUNsQyxzQ0FBSUMsT0FBSixDQUFZLE1BQVo7QUFDQTtBQUNBWCwyQkFBR1ksVUFBSCxDQUFjO0FBQ1ZDLGlDQUFLO0FBREsseUJBQWQ7QUFHSCxxQkFORCxNQU1LO0FBQ0RWLDZCQUFLZixRQUFMLEdBQWdCRixLQUFLQSxJQUFMLENBQVU0QixTQUExQjtBQUNBWCw2QkFBS1ksTUFBTDtBQUNIO0FBQ0RmLHVCQUFHZ0IsV0FBSDtBQUNILGlCQVpEO0FBYUgsYUF6Qks7O0FBMEJOO0FBQ0FDLHVCQTNCTSx5QkEyQlM7QUFDWGpCLG1CQUFHWSxVQUFILENBQWM7QUFDVkM7QUFEVSxpQkFBZDtBQUdILGFBL0JLOztBQWdDTjtBQUNBSyxvQkFqQ00sc0JBaUNNO0FBQ1Isb0JBQU1mLE9BQU8sSUFBYjtBQUNBLHFCQUFLSyxPQUFMLENBQWEsRUFBQyxTQUFRLEtBQUtyQixLQUFkLEVBQWIsRUFBa0MsT0FBbEMsRUFBMkNzQixJQUEzQyxDQUFnRCxnQkFBTTtBQUNsRE4seUJBQUtmLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSx3QkFBR0YsS0FBS0EsSUFBTCxDQUFVd0IsVUFBVixJQUF3QixTQUEzQixFQUFzQztBQUNsQ1AsNkJBQUtmLFFBQUwsR0FBZ0JGLEtBQUtBLElBQUwsQ0FBVTRCLFNBQTFCO0FBQ0gscUJBRkQsTUFFSztBQUNESyxnQ0FBUUMsR0FBUixDQUFZbEMsSUFBWjtBQUNBaUIsNkJBQUtrQixTQUFMO0FBQ0g7QUFDRGxCLHlCQUFLWSxNQUFMO0FBQ0gsaUJBVEQ7QUFVSCxhQTdDSzs7QUE4Q047QUFDQU8seUJBL0NNLHlCQStDU3ZCLENBL0NULEVBK0NZO0FBQ2QscUJBQUtaLEtBQUwsR0FBYVksRUFBRUssTUFBRixDQUFTWCxLQUF0QjtBQUNIO0FBakRLLFM7Ozs7O2lDQW1EQTtBQUNOLGdCQUFNVSxPQUFPLElBQWI7QUFDQUgsZUFBR3VCLFdBQUgsQ0FBZTtBQUNYWix5QkFBUyxpQkFBU2EsR0FBVCxFQUFjO0FBQ25CckIseUJBQUtkLFFBQUwsR0FBZ0JtQyxJQUFJQyxRQUFKLENBQWFDLFFBQTdCO0FBQ0F2Qix5QkFBS2IsT0FBTCxHQUFla0MsSUFBSUMsUUFBSixDQUFhRSxTQUE1QjtBQUNBeEIseUJBQUtZLE1BQUw7QUFDSDtBQUxVLGFBQWY7QUFPSDs7QUFFRDs7Ozs7aUdBQ2M3QixJLEVBQUtILEk7Ozs7Ozs7dUNBQ0ksY0FBSTZDLGFBQUosQ0FBa0I7QUFDckNDLDJDQUFPO0FBQ0MsZ0RBQVE7QUFDSix5REFBYTlDLElBRFQ7QUFFSixvREFBUTtBQUZKLHlDQURUO0FBS0MsZ0RBQVFHO0FBTFQ7QUFEOEIsaUNBQWxCLEM7OztBQUFiNEMsb0M7aUVBU0NBLEk7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0FFQTtBQUNQLGdCQUFNM0IsT0FBTyxJQUFiO0FBQ0EsZ0JBQUk0QixZQUFZLEVBQWhCO0FBQ0EsYUFBQyxTQUFTQyxPQUFULEdBQW1CO0FBQ2hCLG9CQUFJRCxhQUFhLENBQWpCLEVBQW9CO0FBQ2hCNUIseUJBQUtaLE9BQUwsQ0FBYUUsS0FBYixHQUFxQixPQUFyQjtBQUNBVSx5QkFBS1osT0FBTCxDQUFhQyxNQUFiLEdBQXNCLElBQXRCO0FBQ0F1QyxnQ0FBWSxFQUFaO0FBQ0E1Qix5QkFBS1ksTUFBTDtBQUNBO0FBQ0gsaUJBTkQsTUFNTztBQUNIWix5QkFBS1osT0FBTCxDQUFhQyxNQUFiLEdBQXNCLEtBQXRCO0FBQ0FXLHlCQUFLWixPQUFMLENBQWFFLEtBQWIsR0FBbUIsUUFBUXNDLFNBQVIsR0FBb0IsR0FBdkM7QUFDQUE7QUFDQTVCLHlCQUFLWSxNQUFMO0FBQ0g7QUFDRGtCLDJCQUFXLFlBQVc7QUFDbEJEO0FBQ0gsaUJBRkQsRUFFRSxJQUZGO0FBR0gsYUFoQkQ7QUFpQkg7Ozs7RUE5R21DLGVBQUtFLEk7O2tCQUF4QmpELFUiLCJmaWxlIjoiZm9yZ290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG5pbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcblxyXG4vLyBtZDXliqDlr4ZcclxuY29uc3QgY29kZSA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL21kNS5qcycpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVnaXN0UGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIHBob25lOiAnJyxcclxuICAgICAgICB3YXJud29yZDogJycsXHJcbiAgICAgICAgbmlja25hbWU6JycsXHJcbiAgICAgICAgaGVhZGltZzonJyxcclxuICAgICAgICBjb2RlT2JqOiB7XHJcbiAgICAgICAgICAgIHN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgdmFsdWU6J+WPkemAgemqjOivgeeggSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W/mOiusOWvhueggScsXHJcbiAgICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZVxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAvLyDmj5DkuqTooajljZVcclxuICAgICAgICBmb3JtU3VibWl0IChlKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+u5pS55LitJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgXCJwaG9uZVwiOiBlLmRldGFpbC52YWx1ZS5waG9uZSxcclxuICAgICAgICAgICAgICAgIFwidmVyaWZ5Y29kZVwiOiBlLmRldGFpbC52YWx1ZS52ZXJpZnljb2RlLFxyXG4gICAgICAgICAgICAgICAgXCJwYXNzd29yZFwiOiBjb2RlLmhleF9tZDUoZS5kZXRhaWwudmFsdWUucGFzc3dvcmQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5nZXRDb2RlKGRhdGEsXCJBMDAwMlwiKS50aGVuKGRhdGE9PntcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLmk43kvZzmiJDlip9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g6Lez6L2s5Yiw55m75b2V6aG1XHJcbiAgICAgICAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJ2xvZ2luJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC53YXJud29yZCA9IGRhdGEuZGF0YS5yZXR1cm5Nc2c7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOiuvue9ruWvhueggVxyXG4gICAgICAgIHNldFBhc3N3b3JkICgpIHtcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGBzZXRfcGFzc3dvcmRgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDlj5HpgIHpqozor4HnoIFcclxuICAgICAgICBzZW5kQ29kZSAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmdldENvZGUoe1wicGhvbmVcIjp0aGlzLnBob25lfSxcIkEwMDAxXCIpLnRoZW4oZGF0YT0+e1xyXG4gICAgICAgICAgICAgICAgdGhhdC53YXJud29yZCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5kYXRhLnJldHVybkNvZGUgIT0gXCJBQUFBQUFBXCIgKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lndhcm53b3JkID0gZGF0YS5kYXRhLnJldHVybk1zZztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jb3VudHRpbWUoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOiOt+WPlui+k+WFpeahhuaJi+acuuWPt1xyXG4gICAgICAgIHVzZXJOYW1lSW5wdXQgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5waG9uZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5uaWNrbmFtZSA9IHJlcy51c2VySW5mby5uaWNrTmFtZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaGVhZGltZyA9IHJlcy51c2VySW5mby5hdmF0YXJVcmw7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+aWsOeUqOaIt+iOt+WPlumqjOivgeeggeWPiumHjee9ruWvhueggVxyXG4gICAgYXN5bmMgZ2V0Q29kZShkYXRhLGNvZGUpIHtcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLnJlc2V0UGFzc3dvcmQoe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBcImhlYWRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IGNvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IGRhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9XHJcbiAgICBjb3VudHRpbWUoKXtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgIHZhciBjb3VudGRvd24gPSA2MDtcclxuICAgICAgICAoZnVuY3Rpb24gc2V0dGltZSgpIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvZGVPYmoudmFsdWUgPSBcIuWPkemAgemqjOivgeeggVwiO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jb2RlT2JqLnN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb3VudGRvd24gPSA2MDtcclxuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvZGVPYmouc3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvZGVPYmoudmFsdWU9XCLph43lj5EoXCIgKyBjb3VudGRvd24gKyBcIilcIjtcclxuICAgICAgICAgICAgICAgIGNvdW50ZG93bi0tO1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc2V0dGltZSgpXHJcbiAgICAgICAgICAgIH0sMTAwMClcclxuICAgICAgICB9KSgpXHJcbiAgICB9XHJcbn1cclxuIl19