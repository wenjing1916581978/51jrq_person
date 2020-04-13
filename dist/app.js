'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _constants = require('./utils/constants.js');

var _api = require('./api/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      pages: ['pages/home/home', 'pages/home/url', 'pages/personal/delivery', 'pages/login/forgot', 'pages/personal/base_edit', 'pages/index/index', 'pages/personal/import_resume', 'pages/personal/resume_list', 'pages/login/login', 'pages/personal/personal', 'pages/login/regist', 'pages/personal/resume', 'pages/personal/certificate', 'pages/personal/edu_exper', 'pages/personal/project_exper', 'pages/personal/work_exper', 'pages/personal/job_want', 'pages/personal/base_info', 'pages/search/search', 'pages/personal/collection', 'pages/home/homeview', 'pages/corporation/corporation', 'pages/corporation/corpview', 'pages/salary/salary'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '51金融圈',
        navigationBarTextStyle: 'black',
        enablePullDownRefresh: true
      },
      tabBar: {
        "color": "#a0a0a0",
        "selectedColor": "#FFA315",
        "backgroundColor": "#ffffff",
        list: [{
          'pagePath': 'pages/home/home',
          'text': '主页',
          'iconPath': 'images/icons/home.png',
          'selectedIconPath': 'images/icons/home_hl.png'
        }, {
          'pagePath': 'pages/corporation/corporation',
          'text': '公司',
          'iconPath': 'images/icons/corp.png',
          'selectedIconPath': 'images/icons/corp_hl.png'
        }, {
          'pagePath': 'pages/salary/salary',
          'text': '薪税',
          'iconPath': 'images/icons/xinshui.png',
          'selectedIconPath': 'images/icons/xinshui_hl.png'
        }, {
          'pagePath': 'pages/personal/personal',
          'text': '我的',
          'iconPath': 'images/icons/pers.png',
          'selectedIconPath': 'images/icons/pers_hl.png'
        }]
      },
      "navigateToMiniProgramAppIdList": ["wxd7928bf1898a30cd"]
    };
    _this.globalData = {
      userInfo: null,
      appid: "wxd48d26a8a3f6938f",
      secret: 'ffd389347ef65447d93b82a332a59aad',
      access_token: '',
      systemInfo: '',
      isIpx: false
    };

    _this.use('requestfix');
    return _this;
  }

  //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）


  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch(options) {
      var loginInfo = wx.getStorageSync(_constants.LOGIN_INFO) || {};
      this.getAccessToken();
      this.globalData.systemInfo = wx.getSystemInfoSync();
      var model = wx.getSystemInfoSync().model;
      if (model.indexOf('iPhone X') > -1) {
        this.globalData.isIpx = true;
      }
    }

    // sleep (s) {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve('promise resolved')
    //     }, s * 1000)
    //   })
    // }

    // async testAsync () {
    //   const data = await this.sleep(3)
    // }

  }, {
    key: 'getAccessToken',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;
                _context.next = 3;
                return _api2.default.getAccessToken({
                  method: 'GET'
                });

              case 3:
                json = _context.sent;

                if (json.data.result) {
                  that.globalData.access_token = json.data.access_token;
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAccessToken() {
        return _ref.apply(this, arguments);
      }

      return getAccessToken;
    }()
  }, {
    key: 'getUserInfo',
    value: function getUserInfo(cb) {
      var that = this;
      if (this.globalData.userInfo) {
        return this.globalData.userInfo;
      }
      _wepy2.default.getUserInfo({
        success: function success(res) {
          that.globalData.userInfo = res.userInfo;
          cb && cb(res.userInfo);
        }
      });
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJ0YWJCYXIiLCJsaXN0IiwiZ2xvYmFsRGF0YSIsInVzZXJJbmZvIiwiYXBwaWQiLCJzZWNyZXQiLCJhY2Nlc3NfdG9rZW4iLCJzeXN0ZW1JbmZvIiwiaXNJcHgiLCJ1c2UiLCJvcHRpb25zIiwibG9naW5JbmZvIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImdldEFjY2Vzc1Rva2VuIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJtb2RlbCIsImluZGV4T2YiLCJ0aGF0IiwibWV0aG9kIiwianNvbiIsImRhdGEiLCJyZXN1bHQiLCJjYiIsImdldFVzZXJJbmZvIiwic3VjY2VzcyIsInJlcyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2RUUsc0JBQWU7QUFBQTs7QUFBQTs7QUFBQSxVQTFFZkEsTUEwRWUsR0ExRU47QUFDUEMsYUFBTyxDQUNMLGlCQURLLEVBRUwsZ0JBRkssRUFHTCx5QkFISyxFQUlMLG9CQUpLLEVBS0wsMEJBTEssRUFNTCxtQkFOSyxFQU9MLDhCQVBLLEVBUUwsNEJBUkssRUFTTCxtQkFUSyxFQVVMLHlCQVZLLEVBV0wsb0JBWEssRUFZTCx1QkFaSyxFQWFMLDRCQWJLLEVBY0wsMEJBZEssRUFlTCw4QkFmSyxFQWdCTCwyQkFoQkssRUFpQkwseUJBakJLLEVBa0JMLDBCQWxCSyxFQW1CTCxxQkFuQkssRUFvQkwsMkJBcEJLLEVBcUJMLHFCQXJCSyxFQXNCTCwrQkF0QkssRUF1QkwsNEJBdkJLLEVBd0JMLHFCQXhCSyxDQURBO0FBMkJQQyxjQUFRO0FBQ05DLDZCQUFxQixPQURmO0FBRU5DLHNDQUE4QixNQUZ4QjtBQUdOQyxnQ0FBd0IsT0FIbEI7QUFJTkMsZ0NBQXdCLE9BSmxCO0FBS05DLCtCQUF1QjtBQUxqQixPQTNCRDtBQWtDUEMsY0FBUTtBQUNOLGlCQUFTLFNBREg7QUFFTix5QkFBaUIsU0FGWDtBQUdOLDJCQUFtQixTQUhiO0FBSU5DLGNBQU0sQ0FBQztBQUNMLHNCQUFZLGlCQURQO0FBRUwsa0JBQVEsSUFGSDtBQUdMLHNCQUFZLHVCQUhQO0FBSUwsOEJBQW9CO0FBSmYsU0FBRCxFQUtIO0FBQ0Qsc0JBQVksK0JBRFg7QUFFRCxrQkFBUSxJQUZQO0FBR0Qsc0JBQVksdUJBSFg7QUFJRCw4QkFBb0I7QUFKbkIsU0FMRyxFQVVIO0FBQ0Qsc0JBQVkscUJBRFg7QUFFRCxrQkFBUSxJQUZQO0FBR0Qsc0JBQVksMEJBSFg7QUFJRCw4QkFBb0I7QUFKbkIsU0FWRyxFQWVIO0FBQ0Qsc0JBQVkseUJBRFg7QUFFRCxrQkFBUSxJQUZQO0FBR0Qsc0JBQVksdUJBSFg7QUFJRCw4QkFBb0I7QUFKbkIsU0FmRztBQUpBLE9BbENEO0FBNERQLHdDQUFrQyxDQUNoQyxvQkFEZ0M7QUE1RDNCLEtBMEVNO0FBQUEsVUFUZkMsVUFTZSxHQVRGO0FBQ1hDLGdCQUFVLElBREM7QUFFWEMsYUFBTyxvQkFGSTtBQUdYQyxjQUFRLGtDQUhHO0FBSVhDLG9CQUFjLEVBSkg7QUFLWEMsa0JBQVksRUFMRDtBQU1YQyxhQUFPO0FBTkksS0FTRTs7QUFFYixVQUFLQyxHQUFMLENBQVMsWUFBVDtBQUZhO0FBR2Q7O0FBRUQ7Ozs7OzZCQUNTQyxPLEVBQVM7QUFDaEIsVUFBSUMsWUFBYUMsR0FBR0MsY0FBSCwyQkFBaUMsRUFBbEQ7QUFDQSxXQUFLQyxjQUFMO0FBQ0EsV0FBS1osVUFBTCxDQUFnQkssVUFBaEIsR0FBNkJLLEdBQUdHLGlCQUFILEVBQTdCO0FBQ0EsVUFBSUMsUUFBUUosR0FBR0csaUJBQUgsR0FBdUJDLEtBQW5DO0FBQ0EsVUFBR0EsTUFBTUMsT0FBTixDQUFjLFVBQWQsSUFBNEIsQ0FBQyxDQUFoQyxFQUFtQztBQUNqQyxhQUFLZixVQUFMLENBQWdCTSxLQUFoQixHQUF3QixJQUF4QjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQUVRVSxvQixHQUFPLEk7O3VCQUNNLGNBQUlKLGNBQUosQ0FBbUI7QUFDcENLLDBCQUFRO0FBRDRCLGlCQUFuQixDOzs7QUFBYkMsb0I7O0FBR04sb0JBQUlBLEtBQUtDLElBQUwsQ0FBVUMsTUFBZCxFQUFzQjtBQUNwQkosdUJBQUtoQixVQUFMLENBQWdCSSxZQUFoQixHQUErQmMsS0FBS0MsSUFBTCxDQUFVZixZQUF6QztBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBR1NpQixFLEVBQUk7QUFDZCxVQUFNTCxPQUFPLElBQWI7QUFDQSxVQUFJLEtBQUtoQixVQUFMLENBQWdCQyxRQUFwQixFQUE4QjtBQUM1QixlQUFPLEtBQUtELFVBQUwsQ0FBZ0JDLFFBQXZCO0FBQ0Q7QUFDRCxxQkFBS3FCLFdBQUwsQ0FBaUI7QUFDZkMsZUFEZSxtQkFDTkMsR0FETSxFQUNEO0FBQ1pSLGVBQUtoQixVQUFMLENBQWdCQyxRQUFoQixHQUEyQnVCLElBQUl2QixRQUEvQjtBQUNBb0IsZ0JBQU1BLEdBQUdHLElBQUl2QixRQUFQLENBQU47QUFDRDtBQUpjLE9BQWpCO0FBTUQ7Ozs7RUEzSDBCLGVBQUt3QixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0ICd3ZXB5LWFzeW5jLWZ1bmN0aW9uJztcclxuaW1wb3J0IHtcclxuICAgICAgTE9HSU5fSU5GT1xyXG59IGZyb20gJy4vdXRpbHMvY29uc3RhbnRzJztcclxuaW1wb3J0IGFwaSBmcm9tICcuL2FwaS9hcGknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgcGFnZXM6IFtcclxuICAgICAgJ3BhZ2VzL2hvbWUvaG9tZScsXHJcbiAgICAgICdwYWdlcy9ob21lL3VybCcsXHJcbiAgICAgICdwYWdlcy9wZXJzb25hbC9kZWxpdmVyeScsXHJcbiAgICAgICdwYWdlcy9sb2dpbi9mb3Jnb3QnLFxyXG4gICAgICAncGFnZXMvcGVyc29uYWwvYmFzZV9lZGl0JyxcclxuICAgICAgJ3BhZ2VzL2luZGV4L2luZGV4JyxcclxuICAgICAgJ3BhZ2VzL3BlcnNvbmFsL2ltcG9ydF9yZXN1bWUnLFxyXG4gICAgICAncGFnZXMvcGVyc29uYWwvcmVzdW1lX2xpc3QnLFxyXG4gICAgICAncGFnZXMvbG9naW4vbG9naW4nLFxyXG4gICAgICAncGFnZXMvcGVyc29uYWwvcGVyc29uYWwnLFxyXG4gICAgICAncGFnZXMvbG9naW4vcmVnaXN0JyxcclxuICAgICAgJ3BhZ2VzL3BlcnNvbmFsL3Jlc3VtZScsXHJcbiAgICAgICdwYWdlcy9wZXJzb25hbC9jZXJ0aWZpY2F0ZScsXHJcbiAgICAgICdwYWdlcy9wZXJzb25hbC9lZHVfZXhwZXInLFxyXG4gICAgICAncGFnZXMvcGVyc29uYWwvcHJvamVjdF9leHBlcicsXHJcbiAgICAgICdwYWdlcy9wZXJzb25hbC93b3JrX2V4cGVyJyxcclxuICAgICAgJ3BhZ2VzL3BlcnNvbmFsL2pvYl93YW50JyxcclxuICAgICAgJ3BhZ2VzL3BlcnNvbmFsL2Jhc2VfaW5mbycsXHJcbiAgICAgICdwYWdlcy9zZWFyY2gvc2VhcmNoJyxcclxuICAgICAgJ3BhZ2VzL3BlcnNvbmFsL2NvbGxlY3Rpb24nLFxyXG4gICAgICAncGFnZXMvaG9tZS9ob21ldmlldycsXHJcbiAgICAgICdwYWdlcy9jb3Jwb3JhdGlvbi9jb3Jwb3JhdGlvbicsXHJcbiAgICAgICdwYWdlcy9jb3Jwb3JhdGlvbi9jb3JwdmlldycsXHJcbiAgICAgICdwYWdlcy9zYWxhcnkvc2FsYXJ5J1xyXG4gICAgXSxcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiAnbGlnaHQnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnI2ZmZicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICc1MemHkeiejeWciCcsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICdibGFjaycsXHJcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHRhYkJhcjoge1xyXG4gICAgICBcImNvbG9yXCI6IFwiI2EwYTBhMFwiLFxyXG4gICAgICBcInNlbGVjdGVkQ29sb3JcIjogXCIjRkZBMzE1XCIsXHJcbiAgICAgIFwiYmFja2dyb3VuZENvbG9yXCI6IFwiI2ZmZmZmZlwiLFxyXG4gICAgICBsaXN0OiBbe1xyXG4gICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9ob21lL2hvbWUnLFxyXG4gICAgICAgICd0ZXh0JzogJ+S4u+mhtScsXHJcbiAgICAgICAgJ2ljb25QYXRoJzogJ2ltYWdlcy9pY29ucy9ob21lLnBuZycsXHJcbiAgICAgICAgJ3NlbGVjdGVkSWNvblBhdGgnOiAnaW1hZ2VzL2ljb25zL2hvbWVfaGwucG5nJ1xyXG4gICAgICB9LCB7XHJcbiAgICAgICAgJ3BhZ2VQYXRoJzogJ3BhZ2VzL2NvcnBvcmF0aW9uL2NvcnBvcmF0aW9uJyxcclxuICAgICAgICAndGV4dCc6ICflhazlj7gnLFxyXG4gICAgICAgICdpY29uUGF0aCc6ICdpbWFnZXMvaWNvbnMvY29ycC5wbmcnLFxyXG4gICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ2ltYWdlcy9pY29ucy9jb3JwX2hsLnBuZydcclxuICAgICAgfSwge1xyXG4gICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9zYWxhcnkvc2FsYXJ5JyxcclxuICAgICAgICAndGV4dCc6ICfolqrnqI4nLFxyXG4gICAgICAgICdpY29uUGF0aCc6ICdpbWFnZXMvaWNvbnMveGluc2h1aS5wbmcnLFxyXG4gICAgICAgICdzZWxlY3RlZEljb25QYXRoJzogJ2ltYWdlcy9pY29ucy94aW5zaHVpX2hsLnBuZydcclxuICAgICAgfSwge1xyXG4gICAgICAgICdwYWdlUGF0aCc6ICdwYWdlcy9wZXJzb25hbC9wZXJzb25hbCcsXHJcbiAgICAgICAgJ3RleHQnOiAn5oiR55qEJyxcclxuICAgICAgICAnaWNvblBhdGgnOiAnaW1hZ2VzL2ljb25zL3BlcnMucG5nJyxcclxuICAgICAgICAnc2VsZWN0ZWRJY29uUGF0aCc6ICdpbWFnZXMvaWNvbnMvcGVyc19obC5wbmcnXHJcbiAgICAgIH1dXHJcbiAgICB9LFxyXG4gICAgXCJuYXZpZ2F0ZVRvTWluaVByb2dyYW1BcHBJZExpc3RcIjogW1xyXG4gICAgICBcInd4ZDc5MjhiZjE4OThhMzBjZFwiXHJcbiAgICBdXHJcbiAgfVxyXG5cclxuICBnbG9iYWxEYXRhID0ge1xyXG4gICAgdXNlckluZm86IG51bGwsXHJcbiAgICBhcHBpZDogXCJ3eGQ0OGQyNmE4YTNmNjkzOGZcIixcclxuICAgIHNlY3JldDogJ2ZmZDM4OTM0N2VmNjU0NDdkOTNiODJhMzMyYTU5YWFkJyxcclxuICAgIGFjY2Vzc190b2tlbjogJycsXHJcbiAgICBzeXN0ZW1JbmZvOiAnJyxcclxuICAgIGlzSXB4OiBmYWxzZVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxyXG4gIH1cclxuXHJcbiAgLy/lvZPlsI/nqIvluo/liJ3lp4vljJblrozmiJDml7bvvIzkvJrop6blj5Egb25MYXVuY2jvvIjlhajlsYDlj6rop6blj5HkuIDmrKHvvIlcclxuICBvbkxhdW5jaChvcHRpb25zKSB7XHJcbiAgICBsZXQgbG9naW5JbmZvID0gIHd4LmdldFN0b3JhZ2VTeW5jKExPR0lOX0lORk8pIHx8IHt9O1xyXG4gICAgdGhpcy5nZXRBY2Nlc3NUb2tlbigpO1xyXG4gICAgdGhpcy5nbG9iYWxEYXRhLnN5c3RlbUluZm8gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xyXG4gICAgbGV0IG1vZGVsID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS5tb2RlbDtcclxuICAgIGlmKG1vZGVsLmluZGV4T2YoJ2lQaG9uZSBYJykgPiAtMSkge1xyXG4gICAgICB0aGlzLmdsb2JhbERhdGEuaXNJcHggPSB0cnVlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBzbGVlcCAocykge1xyXG4gIC8vICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAvLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgLy8gICAgICAgcmVzb2x2ZSgncHJvbWlzZSByZXNvbHZlZCcpXHJcbiAgLy8gICAgIH0sIHMgKiAxMDAwKVxyXG4gIC8vICAgfSlcclxuICAvLyB9XHJcblxyXG4gIC8vIGFzeW5jIHRlc3RBc3luYyAoKSB7XHJcbiAgLy8gICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5zbGVlcCgzKVxyXG4gIC8vIH1cclxuICBhc3luYyBnZXRBY2Nlc3NUb2tlbigpIHtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRBY2Nlc3NUb2tlbih7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgIH0pO1xyXG4gICAgaWYgKGpzb24uZGF0YS5yZXN1bHQpIHtcclxuICAgICAgdGhhdC5nbG9iYWxEYXRhLmFjY2Vzc190b2tlbiA9IGpzb24uZGF0YS5hY2Nlc3NfdG9rZW47XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRVc2VySW5mbyhjYikge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgIGlmICh0aGlzLmdsb2JhbERhdGEudXNlckluZm8pIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mb1xyXG4gICAgfVxyXG4gICAgd2VweS5nZXRVc2VySW5mbyh7XHJcbiAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xyXG4gICAgICAgIGNiICYmIGNiKHJlcy51c2VySW5mbylcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG59XHJcbiJdfQ==