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
            _num: "1",
            type: "my51job",
            warnword: ''
        }, _this.methods = {

            // 提交表单
            formSubmit: function formSubmit(e) {
                var _this2 = this;

                if (!e.detail.value.username || !e.detail.value.password) {
                    this.warnword = "请先填写账号和密码！";
                    return;
                }
                this.importResume(this.type, e.detail.value.username, e.detail.value.password).then(function (data) {
                    if (data.data.returnCode == "AAAAAAA") {
                        _this2.warnword = '';
                        wx.navigateBack({
                            delta: 1
                        });
                        _this2.$apply();
                    } else {
                        _this2.warnword = data.data.returnMsg;
                        _this2.$apply();
                    }
                    wx.hideLoading();
                });
            },

            // 切换公司
            chooseCompany: function chooseCompany(num, type) {
                this._num = num;
                this.type = type;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(LoginPage, [{
        key: 'onLoad',
        value: function onLoad() {
            // 获取登录信息

            var that = this;
            wx.getStorage({
                key: 'loginData',
                success: function success(res) {
                    that.token = res.data.token;
                    that.tokenKey = res.data.tokenKey;
                },
                fail: function fail(json) {
                    _tip2.default.error(json.data.returnMsg);
                }
            });
        }
    }, {
        key: 'importResume',


        //导入简历
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type, username, password) {
                var json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                wx.showLoading({
                                    title: '加载中'
                                });
                                _context.next = 3;
                                return _api2.default.importResume({
                                    query: {
                                        head: {
                                            "transcode": "P0029",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": this.token,
                                            "tokenKey": this.tokenKey,
                                            "type": type,
                                            "userName": username,
                                            "password": password
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

            function importResume(_x, _x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return importResume;
        }()
    }]);

    return LoginPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(LoginPage , 'pages/personal/import_resume'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltcG9ydF9yZXN1bWUuanMiXSwibmFtZXMiOlsiTG9naW5QYWdlIiwiZGF0YSIsIl9udW0iLCJ0eXBlIiwid2FybndvcmQiLCJtZXRob2RzIiwiZm9ybVN1Ym1pdCIsImUiLCJkZXRhaWwiLCJ2YWx1ZSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJpbXBvcnRSZXN1bWUiLCJ0aGVuIiwicmV0dXJuQ29kZSIsInd4IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCIkYXBwbHkiLCJyZXR1cm5Nc2ciLCJoaWRlTG9hZGluZyIsImNob29zZUNvbXBhbnkiLCJudW0iLCJ0aGF0IiwiZ2V0U3RvcmFnZSIsImtleSIsInN1Y2Nlc3MiLCJyZXMiLCJ0b2tlbiIsInRva2VuS2V5IiwiZmFpbCIsImpzb24iLCJlcnJvciIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJxdWVyeSIsImhlYWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7OztnTUFFakJDLEksR0FBTztBQUNKQyxrQkFBTSxHQURGO0FBRUpDLGtCQUFNLFNBRkY7QUFHSkMsc0JBQVM7QUFITCxTLFFBdUJQQyxPLEdBQVU7O0FBRU47QUFDQUMsc0JBSE0sc0JBR01DLENBSE4sRUFHUztBQUFBOztBQUNYLG9CQUFHLENBQUNBLEVBQUVDLE1BQUYsQ0FBU0MsS0FBVCxDQUFlQyxRQUFoQixJQUE0QixDQUFDSCxFQUFFQyxNQUFGLENBQVNDLEtBQVQsQ0FBZUUsUUFBL0MsRUFBd0Q7QUFDcEQseUJBQUtQLFFBQUwsR0FBZ0IsWUFBaEI7QUFDQTtBQUNIO0FBQ0QscUJBQUtRLFlBQUwsQ0FBa0IsS0FBS1QsSUFBdkIsRUFBNEJJLEVBQUVDLE1BQUYsQ0FBU0MsS0FBVCxDQUFlQyxRQUEzQyxFQUFvREgsRUFBRUMsTUFBRixDQUFTQyxLQUFULENBQWVFLFFBQW5FLEVBQTZFRSxJQUE3RSxDQUFrRixnQkFBTTtBQUNwRix3QkFBR1osS0FBS0EsSUFBTCxDQUFVYSxVQUFWLElBQXdCLFNBQTNCLEVBQXNDO0FBQ2xDLCtCQUFLVixRQUFMLEdBQWdCLEVBQWhCO0FBQ0FXLDJCQUFHQyxZQUFILENBQWdCO0FBQ2ZDLG1DQUFPO0FBRFEseUJBQWhCO0FBR0EsK0JBQUtDLE1BQUw7QUFDSCxxQkFORCxNQU1LO0FBQ0QsK0JBQUtkLFFBQUwsR0FBZ0JILEtBQUtBLElBQUwsQ0FBVWtCLFNBQTFCO0FBQ0EsK0JBQUtELE1BQUw7QUFDSDtBQUNESCx1QkFBR0ssV0FBSDtBQUNILGlCQVpEO0FBYUgsYUFyQks7O0FBc0JOO0FBQ0FDLHlCQXZCTSx5QkF1QlFDLEdBdkJSLEVBdUJZbkIsSUF2QlosRUF1QmlCO0FBQ25CLHFCQUFLRCxJQUFMLEdBQVlvQixHQUFaO0FBQ0EscUJBQUtuQixJQUFMLEdBQVlBLElBQVo7QUFDSDtBQTFCSyxTOzs7OztpQ0FqQkE7QUFDTjs7QUFFRixnQkFBTW9CLE9BQU8sSUFBYjtBQUNBUixlQUFHUyxVQUFILENBQWM7QUFDVkMscUJBQUssV0FESztBQUVWQyx5QkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCSix5QkFBS0ssS0FBTCxHQUFhRCxJQUFJMUIsSUFBSixDQUFTMkIsS0FBdEI7QUFDQUwseUJBQUtNLFFBQUwsR0FBZ0JGLElBQUkxQixJQUFKLENBQVM0QixRQUF6QjtBQUVELGlCQU5TO0FBT1ZDLHNCQUFNLGNBQVNDLElBQVQsRUFBZTtBQUNqQixrQ0FBSUMsS0FBSixDQUFVRCxLQUFLOUIsSUFBTCxDQUFVa0IsU0FBcEI7QUFDSDtBQVRTLGFBQWQ7QUFXRDs7Ozs7QUErQkQ7O2lHQUNpQmhCLEksRUFBS08sUSxFQUFTQyxROzs7Ozs7QUFDL0JJLG1DQUFHa0IsV0FBSCxDQUFlO0FBQ1hDLDJDQUFPO0FBREksaUNBQWY7O3VDQUdtQixjQUFJdEIsWUFBSixDQUFpQjtBQUNwQ3VCLDJDQUFPO0FBQ0NDLDhDQUFNO0FBQ0YseURBQWEsT0FEWDtBQUVGLG9EQUFRO0FBRk4seUNBRFA7QUFLQ25DLDhDQUFNO0FBQ0YscURBQVMsS0FBSzJCLEtBRFo7QUFFRix3REFBWSxLQUFLQyxRQUZmO0FBR0Ysb0RBQVExQixJQUhOO0FBSUYsd0RBQVlPLFFBSlY7QUFLRix3REFBWUM7QUFMVjtBQUxQO0FBRDZCLGlDQUFqQixDOzs7QUFBYm9CLG9DO2lFQWVDQSxJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMUU0QixlQUFLTSxJOztrQkFBdkJyQyxTIiwiZmlsZSI6ImltcG9ydF9yZXN1bWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG5pbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpblBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICBfbnVtOiBcIjFcIixcclxuICAgICAgIHR5cGU6IFwibXk1MWpvYlwiLFxyXG4gICAgICAgd2FybndvcmQ6JydcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8vIOiOt+WPlueZu+W9leS/oeaBr1xyXG5cclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHd4LmdldFN0b3JhZ2Uoe1xyXG4gICAgICAgICAga2V5OiAnbG9naW5EYXRhJyxcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICB0aGF0LnRva2VuID0gcmVzLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgIHRoYXQudG9rZW5LZXkgPSByZXMuZGF0YS50b2tlbktleTtcclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbDogZnVuY3Rpb24oanNvbikge1xyXG4gICAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG5cclxuICAgICAgICAvLyDmj5DkuqTooajljZVcclxuICAgICAgICBmb3JtU3VibWl0IChlKSB7XHJcbiAgICAgICAgICAgIGlmKCFlLmRldGFpbC52YWx1ZS51c2VybmFtZSB8fCAhZS5kZXRhaWwudmFsdWUucGFzc3dvcmQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YXJud29yZCA9IFwi6K+35YWI5aGr5YaZ6LSm5Y+35ZKM5a+G56CB77yBXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbXBvcnRSZXN1bWUodGhpcy50eXBlLGUuZGV0YWlsLnZhbHVlLnVzZXJuYW1lLGUuZGV0YWlsLnZhbHVlLnBhc3N3b3JkKS50aGVuKGRhdGE9PntcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXJud29yZCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndhcm53b3JkID0gZGF0YS5kYXRhLnJldHVybk1zZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g5YiH5o2i5YWs5Y+4XHJcbiAgICAgICAgY2hvb3NlQ29tcGFueShudW0sdHlwZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX251bSA9IG51bTtcclxuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lr7zlhaXnroDljoZcclxuICBhc3luYyBpbXBvcnRSZXN1bWUodHlwZSx1c2VybmFtZSxwYXNzd29yZCkge1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgIH0pXHJcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmltcG9ydFJlc3VtZSh7XHJcbiAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIlAwMDI5XCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGlzLnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGlzLnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IHR5cGUsXHJcbiAgICAgICAgICAgICAgICBcInVzZXJOYW1lXCI6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgXCJwYXNzd29yZFwiOiBwYXNzd29yZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBqc29uO1xyXG4gIH1cclxuXHJcbn1cclxuIl19