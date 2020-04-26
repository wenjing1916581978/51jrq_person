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
            loginStatus: false,
            info: {},
            init: false,
            token: '',
            tokenKey: '',
            showbox: false

            // 转发分享
        }, _this.methods = {
            jumpto: function jumpto(e) {
                var url = '/pages/personal/' + e.currentTarget.dataset.url;
                if (!this.token) url = '/pages/login/login';
                wx.navigateTo({
                    url: url
                });
            },
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
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(PersPage, [{
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
            var login = wx.getStorageSync('login');
            if (login) {
                that.token = login.token;
                that.tokenKey = login.tokenKey;
                that.$apply();
                that.getData();
            } else {
                that.token = '';
                that.$apply();
            }
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
        key: 'getData',
        value: function getData() {
            var that = this;
            _api2.default.getPimg({
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
            }).then(function (res) {
                if (res.data.returnCode == 'AAAAAAA') {
                    that.info = res.data.data;
                    that.$apply();
                } else {
                    _tip2.default.error(res.data.returnMsg);
                }
            });
        }
    }]);

    return PersPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(PersPage , 'pages/personal/personal'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBlcnNvbmFsLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVxdWlyZSIsIlBlcnNQYWdlIiwiZGF0YSIsImxvZ2luU3RhdHVzIiwiaW5mbyIsImluaXQiLCJ0b2tlbiIsInRva2VuS2V5Iiwic2hvd2JveCIsIm1ldGhvZHMiLCJqdW1wdG8iLCJlIiwidXJsIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJzd2l0Y2hhcHBsZXQiLCJuYXZpZ2F0ZVRvTWluaVByb2dyYW0iLCJhcHBJZCIsInBhdGgiLCJleHRyYURhdGEiLCJlbnZWZXJzaW9uIiwic3VjY2VzcyIsInJlcyIsImZhaWwiLCJsb2dvdXQiLCJjYW5jZWwiLCJ5ZXMiLCJjbGVhclN0b3JhZ2UiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImN1cnJlbnRQYWdlIiwibGVuZ3RoIiwicm91dGUiLCJ0aXRsZSIsImRlc2MiLCJ0aGF0IiwibG9naW4iLCJnZXRTdG9yYWdlU3luYyIsIiRhcHBseSIsImdldERhdGEiLCJoZWFkaW1nU3RhdHVzIiwicmVzdW1laWQiLCJnZXRSZXN1bWVJbmZvIiwicXVlcnkiLCJoZWFkIiwianNvbiIsImdldFBpbWciLCJ0aGVuIiwicmV0dXJuQ29kZSIsImVycm9yIiwicmV0dXJuTXNnIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFFBQVFDLFFBQVEsbUJBQVIsQ0FBZDs7SUFHcUJDLFE7Ozs7Ozs7Ozs7Ozs7OzhMQUNqQkMsSSxHQUFPO0FBQ0xDLHlCQUFhLEtBRFI7QUFFTEMsa0JBQUssRUFGQTtBQUdMQyxrQkFBSyxLQUhBO0FBSUxDLG1CQUFNLEVBSkQ7QUFLTEMsc0JBQVMsRUFMSjtBQU1MQyxxQkFBUTs7QUFHVjtBQVRPLFMsUUFvQ1BDLE8sR0FBVTtBQUNSQyxrQkFEUSxrQkFDREMsQ0FEQyxFQUNDO0FBQ1Asb0JBQUlDLE1BQU0scUJB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R0s7QUFDRCxrQ0FBSVcsS0FBSixDQUFVM0IsSUFBSXRCLElBQUosQ0FBU2tELFNBQW5CO0FBQ0g7QUFDRixhQWxCRDtBQW9CSDs7OztFQXhIaUMsZUFBS0MsSTs7a0JBQXRCcEQsUSIsImZpbGUiOiJwZXJzb25hbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3V0aWxzJyk7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyc1BhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgZGF0YSA9IHtcclxuICAgICAgbG9naW5TdGF0dXM6IGZhbHNlLFxyXG4gICAgICBpbmZvOnt9LFxyXG4gICAgICBpbml0OmZhbHNlLFxyXG4gICAgICB0b2tlbjonJyxcclxuICAgICAgdG9rZW5LZXk6JycsXHJcbiAgICAgIHNob3dib3g6ZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICAvLyDovazlj5HliIbkuqtcclxuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICAgIHZhciBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpICAgIC8v6I635Y+W5Yqg6L2955qE6aG16Z2iXHJcbiAgICAgICAgdmFyIGN1cnJlbnRQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoLTFdICAgIC8v6I635Y+W5b2T5YmN6aG16Z2i55qE5a+56LGhXHJcbiAgICAgICAgdmFyIHVybCA9IGN1cnJlbnRQYWdlLnJvdXRlICAgIC8v5b2T5YmN6aG16Z2idXJsXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0aXRsZTogJ+mHkeiejeiBjOS4muacuuS8muWwveWcqDUx6YeR6J6N5ZyIJyxcclxuICAgICAgICBkZXNjOiAnNTHph5Hono3lnIjkuKjph5Hono3kurrmiY3msYLogYzmi5vogZgnLFxyXG4gICAgICAgIHBhdGg6IGAvJHt1cmx9YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNob3coKXtcclxuICAgICAgICAvLyDojrflj5bnmbvlvZXkv6Hmga9cclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgbG9naW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW4nKVxyXG4gICAgICAgIGlmKGxvZ2luKXtcclxuICAgICAgICAgIHRoYXQudG9rZW4gPSBsb2dpbi50b2tlblxyXG4gICAgICAgICAgdGhhdC50b2tlbktleSA9IGxvZ2luLnRva2VuS2V5XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICB0aGF0LmdldERhdGEoKVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIHRoYXQudG9rZW4gPSAnJ1xyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBqdW1wdG8oZSl7XHJcbiAgICAgICAgbGV0IHVybCA9ICcvcGFnZXMvcGVyc29uYWwvJytlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC51cmxcclxuICAgICAgICBpZighdGhpcy50b2tlbikgdXJsPScvcGFnZXMvbG9naW4vbG9naW4nXHJcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICB1cmw6IHVybFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIHN3aXRjaGFwcGxldCgpe1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG9NaW5pUHJvZ3JhbSh7XHJcbiAgICAgICAgICAgIGFwcElkOiAnd3hkNzkyOGJmMTg5OGEzMGNkJyxcclxuICAgICAgICAgICAgcGF0aDogJ3BhZ2VzL2pvYmxpc3Qvam9ibGlzdCcsXHJcbiAgICAgICAgICAgIGV4dHJhRGF0YToge30sXHJcbiAgICAgICAgICAgIGVudlZlcnNpb246ICd0cmFpbCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgICAgLy8g5omT5byA5oiQ5YqfXHJcbiAgICAgICAgICAgIH0sZmFpbCgpe1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcbiAgICAgIGxvZ291dCAoKSB7Ly8g6YCA5Ye655m75b2VXHJcbiAgICAgICAgICB0aGlzLnNob3dib3ggPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgICBjYW5jZWwgKCkgey8vIOWPlua2iFxyXG4gICAgICAgICAgdGhpcy5zaG93Ym94ID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgIHllcyAoKSB7Ly8g56Gu5a6aXHJcbiAgICAgICAgICAvLyDmuIXnqbrmnKzlnLDkv6Hmga9cclxuICAgICAgICAgIHd4LmNsZWFyU3RvcmFnZSgpXHJcbiAgICAgICAgICAvLyDot7PovaznmbvlvZXpobVcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgIHVybDogYC9wYWdlcy9sb2dpbi9sb2dpbmBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgb25IaWRlKCl7XHJcbiAgICAgICAgdGhpcy5zaG93Ym94ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5oZWFkaW1nU3RhdHVzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lrozmlbTluqbmn6Xor6JcclxuICAgIGFzeW5jIGdldEludGVncml0eShyZXN1bWVpZCkge1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0UmVzdW1lSW5mbyh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDAyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhpcy50b2tlbixcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRoaXMudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZXN1bWVpZFwiOiByZXN1bWVpZFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluS4quS6uuS/oeaBr1xyXG4gICAgZ2V0RGF0YSgpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBhcGkuZ2V0UGltZyh7XHJcbiAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJQMDA0MFwiLFxyXG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgICBcInRva2VuXCI6IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgICBpZihyZXMuZGF0YS5yZXR1cm5Db2RlID09ICdBQUFBQUFBJykge1xyXG4gICAgICAgICAgICB0aGF0LmluZm8gPSByZXMuZGF0YS5kYXRhXHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB0aXAuZXJyb3IocmVzLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=