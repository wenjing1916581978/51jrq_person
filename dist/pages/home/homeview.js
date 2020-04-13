'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _constants = require('./../../utils/constants.js');

var _posinameduty = require('./../../components/posinameduty.js');

var _posinameduty2 = _interopRequireDefault(_posinameduty);

var _relatedjob = require('./../../components/relatedjob.js');

var _relatedjob2 = _interopRequireDefault(_relatedjob);

var _shareminipro = require('./../../components/shareminipro.js');

var _shareminipro2 = _interopRequireDefault(_shareminipro);

var _selresumeorg = require('./../../components/selresumeorg.js');

var _selresumeorg2 = _interopRequireDefault(_selresumeorg);

var _navigationload = require('./../../components/navigationload.js');

var _navigationload2 = _interopRequireDefault(_navigationload);

var _utils = require('./../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomeView = function (_wepy$page) {
  _inherits(HomeView, _wepy$page);

  function HomeView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HomeView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HomeView.__proto__ || Object.getPrototypeOf(HomeView)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '职位详情'
    }, _this.$repeat = { "relatedJobs": { "com": "relatedjob", "props": "syncRelatedJob" } }, _this.$props = { "relatedjob": { "xmlns:v-bind": { "value": "", "for": "relatedJobs", "item": "item", "index": "index", "key": "key" }, "v-bind:syncRelatedJob.once": { "value": "item", "type": "item", "for": "relatedJobs", "item": "item", "index": "index", "key": "key" } }, "shareminipro": { "v-bind:urlWithArgs.sync": "urlWithArgs", "v-bind:currentUrl.sync": "currentUrl", "v-bind:jobInfo.sync": "jobInfo", "v-bind:corpInfo.sync": "corpInfo", "v-bind:dataOrg.once": "dataOrg" }, "selresumeorg": { "v-bind:isShowSelContainer.sync": "isShowSelContainer", "v-bind:jobId.sync": "jobId", "v-bind:isDelivery.sync": "isDelivery", "v-bind:haveResume.sync": "haveResume" } }, _this.$events = {}, _this.components = {
      posinameduty: _posinameduty2.default,
      relatedjob: _relatedjob2.default,
      shareminipro: _shareminipro2.default,
      selresumeorg: _selresumeorg2.default,
      navigationload: _navigationload2.default
    }, _this.data = {
      jobId: '',
      corpId: '',
      corpInfo: {},
      jobInfo: {},
      relatedJobs: [],
      isFav: false, //未收藏
      isDelivery: false, //未投递
      loginInfo: {},
      urlWithArgs: "",
      currentUrl: "",
      showShareBtn: false,
      dataOrg: "homeview",
      isShowSelContainer: false,
      haveResume: true,
      isFold: true,
      jobdescriptionBrief: '',
      showPageLoading: true,
      descFoldShow: true,
      isIpx: false,
      tolist: false,
      ani: {},
      windowHeight: 0
    }, _this.methods = {
      tolist: function tolist() {
        wx.navigateTo({
          url: '/pages/search/search?jobname=' + this.jobInfo.jobname
        });
      },
      onCollectionFn: function onCollectionFn() {
        // 未登录跳转登录页
        var that = this;
        _utils2.default.goLogin().catch(function () {
          that.collectJob(that.jobId);
        });
      },
      onDeliverFn: function onDeliverFn() {
        // 未登录跳转登录页
        var that = this;
        _utils2.default.goLogin().then(function () {
          console.log('不做操作');
        }).catch(function () {
          if (that.haveResume) {
            that.isShowSelContainer = true;
          } else {
            wx.redirectTo({
              url: '../personal/resume_list'
            });
          }
          that.$apply();
        });
      },

      // 跳转公司详情页
      goCorpView: function goCorpView(companyid) {
        wx.navigateTo({
          url: '/pages/corporation/corpview?companyid=' + companyid
        });
      },

      // 查看地图
      goMap: function goMap(address) {
        this.getAddress(address).then(function (data) {
          if (data.data.status == 0) {
            var addr = data.data.result.location;
            wx.openLocation({
              latitude: addr.lat,
              longitude: addr.lng,
              scale: 18,
              address: address
            });
          } else {
            wx.showToast({
              title: '\u5730\u5740\u4FE1\u606F\u4E0D\u5168',
              icon: 'none'
            });
            console.log(data.data.message);
          }
        });
      },
      foldFn: function foldFn() {
        //切换展开
        this.isFold = !this.isFold;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HomeView, [{
    key: 'onPageScroll',
    value: function onPageScroll() {
      var pages = getCurrentPages(); // 当前页面
      if (pages.length == 1 && this.tolist) {
        var animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
          delay: 100
        });
        animation.opacity(1).translate(0, 0).step();
        this.ani = animation.export();
        this.$apply();
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      var that = this;
      wx.getSystemInfo({
        success: function success(res) {
          that.windowHeight = res.windowHeight;
          that.$apply();
        }
      });
      var pages = getCurrentPages(); // 当前页面
      if (pages.length == 1) {
        this.tolist = true;
        this.$apply();
      }

      this.jobId = options.jobid;
      this.corpId = options.corpid;
      this.loginInfo = wx.getStorageSync(_constants.LOGIN_INFO) || {};
      this.urlWithArgs = _utils2.default.getCurrentPageUrlWithArgs();
      this.currentUrl = _utils2.default.getCurrentPageUrl();
      this.isIpx = this.$parent.globalData.isIpx;
      this.$apply();
      this.viewCompanyjob();
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onReady',
    value: function onReady() {
      this.showShareBtn = true;
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      this.isShowSelContainer = false;
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage(res) {
      var that = this;
      var corpname = that.corpInfo.corpname,
          jobname = that.jobInfo.jobname;
      var title = corpname + '\u6B63\u5728\u62DB\u8058 ' + jobname;
      if (res.from === 'button') {
        // 来自页面内转发按钮
      }
      return {
        title: title.length > 30 ? title.slice(0, 29) + '...' : title,
        path: '/' + that.currentUrl + '?corpid=' + that.corpId + '&jobid=' + that.jobId,
        success: function success(res) {
          // 转发成功
          res.shareTickets; // 单聊是没有的，注意必须要在分享前调用wx.showShareMenu方法，否则是不会带分享票据
        },
        fail: function fail(res) {
          // 转发失败
        }
      };
    }
  }, {
    key: 'viewCompanyjob',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //查看企业职位详细
                that = this;

                that.showPageLoading = true;
                _context.next = 4;
                return _api2.default.getCompanyjob({
                  query: {
                    "head": {
                      "transcode": "Q0002",
                      "type": "h"
                    },
                    "data": {
                      "token": that.loginInfo.token,
                      "tokenKey": that.loginInfo.tokenKey,
                      "corpid": this.corpId,
                      "jobid": this.jobId
                    }
                  }
                });

              case 4:
                json = _context.sent;

                if (json.data.returnCode == "AAAAAAA") {
                  that.corpInfo = _extends({}, that.corpInfo, json.data.data.corpInfo);
                  that.jobInfo = _extends({}, that.jobInfo, json.data.data.jobInfo);
                  if (that.jobInfo.jobdescription.length > 100) {
                    that.jobdescriptionBrief = that.jobInfo.jobdescription.substring(0, 100) + '......';
                    that.descFoldShow = true;
                  } else {
                    that.jobdescriptionBrief = that.jobInfo.jobdescription;
                    that.descFoldShow = false;
                  }
                  that.relatedJobs = json.data.data.relatedJobs;
                  that.isFav = json.data.data.isFav;
                  that.isDelivery = json.data.data.isDelivery;
                  that.showPageLoading = false;
                  that.$apply();
                } else {
                  _tip2.default.error(json.data.returnMsg);
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function viewCompanyjob() {
        return _ref2.apply(this, arguments);
      }

      return viewCompanyjob;
    }()
  }, {
    key: 'collectJob',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(jobid) {
        var that, json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //企业职位收藏
                that = this;
                _context2.next = 3;
                return _api2.default.getCompanyjob({
                  query: {
                    head: {
                      "transcode": "Q0004",
                      "type": "h"
                    },
                    data: {
                      "token": that.loginInfo.token,
                      "tokenKey": that.loginInfo.tokenKey,
                      "jobid": jobid
                    }
                  }
                });

              case 3:
                json = _context2.sent;

                if (json.data.returnCode == "AAAAAAA") {
                  _tip2.default.success("职位收藏成功");
                  that.isFav = !that.isFav;
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

      function collectJob(_x) {
        return _ref3.apply(this, arguments);
      }

      return collectJob;
    }()

    // 打开地图

  }, {
    key: 'getAddress',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(address) {
        var json;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _api2.default.getCityName({
                  method: "GET",
                  address: address
                });

              case 2:
                json = _context3.sent;
                return _context3.abrupt('return', json);

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAddress(_x2) {
        return _ref4.apply(this, arguments);
      }

      return getAddress;
    }()
  }]);

  return HomeView;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(HomeView , 'pages/home/homeview'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWV2aWV3LmpzIl0sIm5hbWVzIjpbIkhvbWVWaWV3IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBvc2luYW1lZHV0eSIsInJlbGF0ZWRqb2IiLCJzaGFyZW1pbmlwcm8iLCJzZWxyZXN1bWVvcmciLCJuYXZpZ2F0aW9ubG9hZCIsImRhdGEiLCJqb2JJZCIsImNvcnBJZCIsImNvcnBJbmZvIiwiam9iSW5mbyIsInJlbGF0ZWRKb2JzIiwiaXNGYXYiLCJpc0RlbGl2ZXJ5IiwibG9naW5JbmZvIiwidXJsV2l0aEFyZ3MiLCJjdXJyZW50VXJsIiwic2hvd1NoYXJlQnRuIiwiZGF0YU9yZyIsImlzU2hvd1NlbENvbnRhaW5lciIsImhhdmVSZXN1bWUiLCJpc0ZvbGQiLCJqb2JkZXNjcmlwdGlvbkJyaWVmIiwic2hvd1BhZ2VMb2FkaW5nIiwiZGVzY0ZvbGRTaG93IiwiaXNJcHgiLCJ0b2xpc3QiLCJhbmkiLCJ3aW5kb3dIZWlnaHQiLCJtZXRob2RzIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiam9ibmFtZSIsIm9uQ29sbGVjdGlvbkZuIiwidGhhdCIsImdvTG9naW4iLCJjYXRjaCIsImNvbGxlY3RKb2IiLCJvbkRlbGl2ZXJGbiIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVkaXJlY3RUbyIsIiRhcHBseSIsImdvQ29ycFZpZXciLCJjb21wYW55aWQiLCJnb01hcCIsImFkZHJlc3MiLCJnZXRBZGRyZXNzIiwic3RhdHVzIiwiYWRkciIsInJlc3VsdCIsImxvY2F0aW9uIiwib3BlbkxvY2F0aW9uIiwibGF0aXR1ZGUiLCJsYXQiLCJsb25naXR1ZGUiLCJsbmciLCJzY2FsZSIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm1lc3NhZ2UiLCJmb2xkRm4iLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImxlbmd0aCIsImFuaW1hdGlvbiIsImNyZWF0ZUFuaW1hdGlvbiIsImR1cmF0aW9uIiwidGltaW5nRnVuY3Rpb24iLCJkZWxheSIsIm9wYWNpdHkiLCJ0cmFuc2xhdGUiLCJzdGVwIiwiZXhwb3J0Iiwib3B0aW9ucyIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzIiwiam9iaWQiLCJjb3JwaWQiLCJnZXRTdG9yYWdlU3luYyIsImdldEN1cnJlbnRQYWdlVXJsV2l0aEFyZ3MiLCJnZXRDdXJyZW50UGFnZVVybCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwidmlld0NvbXBhbnlqb2IiLCJjb3JwbmFtZSIsImZyb20iLCJzbGljZSIsInBhdGgiLCJzaGFyZVRpY2tldHMiLCJmYWlsIiwiZ2V0Q29tcGFueWpvYiIsInF1ZXJ5IiwidG9rZW4iLCJ0b2tlbktleSIsImpzb24iLCJyZXR1cm5Db2RlIiwiam9iZGVzY3JpcHRpb24iLCJzdWJzdHJpbmciLCJlcnJvciIsInJldHVybk1zZyIsImhlYWQiLCJnZXRDaXR5TmFtZSIsIm1ldGhvZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0k7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFJVkMsTyxHQUFVLEVBQUMsZUFBYyxFQUFDLE9BQU0sWUFBUCxFQUFvQixTQUFRLGdCQUE1QixFQUFmLEUsUUFDZkMsTSxHQUFTLEVBQUMsY0FBYSxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxhQUFsQixFQUFnQyxRQUFPLE1BQXZDLEVBQThDLFNBQVEsT0FBdEQsRUFBOEQsT0FBTSxLQUFwRSxFQUFoQixFQUEyRiw4QkFBNkIsRUFBQyxTQUFRLE1BQVQsRUFBZ0IsUUFBTyxNQUF2QixFQUE4QixPQUFNLGFBQXBDLEVBQWtELFFBQU8sTUFBekQsRUFBZ0UsU0FBUSxPQUF4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IGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG4gICAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuICAgIGltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuICAgIGltcG9ydCB7XHJcbiAgICAgIExPR0lOX0lORk9cclxuICAgIH0gZnJvbSAnLi4vLi4vdXRpbHMvY29uc3RhbnRzJztcclxuICAgIGltcG9ydCBQb3NpTmFtZUR1dHkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9wb3NpbmFtZWR1dHknO1xyXG4gICAgaW1wb3J0IFJlbGF0ZWRKb2IgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9yZWxhdGVkam9iJztcclxuICAgIGltcG9ydCBTaGFyZU1pbmlQcm8gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zaGFyZW1pbmlwcm8nO1xyXG4gICAgaW1wb3J0IFNlbFJlc3VtZU9yZyBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NlbHJlc3VtZW9yZyc7XHJcbiAgICBpbXBvcnQgTmF2aWdhdGlvbkxvYWQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZpZ2F0aW9ubG9hZCc7XHJcbiAgICBpbXBvcnQgdXRpbHMgZnJvbSAnLi4vLi4vdXRpbHMvdXRpbHMnO1xyXG5cclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvbWVWaWV3IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfogYzkvY3or6bmg4UnXHJcbiAgICAgIH1cclxuXHJcbiAgICAgJHJlcGVhdCA9IHtcInJlbGF0ZWRKb2JzXCI6e1wiY29tXCI6XCJyZWxhdGVkam9iXCIsXCJwcm9wc1wiOlwic3luY1JlbGF0ZWRKb2JcIn19O1xyXG4kcHJvcHMgPSB7XCJyZWxhdGVkam9iXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJyZWxhdGVkSm9ic1wiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifSxcInYtYmluZDpzeW5jUmVsYXRlZEpvYi5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicmVsYXRlZEpvYnNcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwic2hhcmVtaW5pcHJvXCI6e1widi1iaW5kOnVybFdpdGhBcmdzLnN5bmNcIjpcInVybFdpdGhBcmdzXCIsXCJ2LWJpbmQ6Y3VycmVudFVybC5zeW5jXCI6XCJjdXJyZW50VXJsXCIsXCJ2LWJpbmQ6am9iSW5mby5zeW5jXCI6XCJqb2JJbmZvXCIsXCJ2LWJpbmQ6Y29ycEluZm8uc3luY1wiOlwiY29ycEluZm9cIixcInYtYmluZDpkYXRhT3JnLm9uY2VcIjpcImRhdGFPcmdcIn0sXCJzZWxyZXN1bWVvcmdcIjp7XCJ2LWJpbmQ6aXNTaG93U2VsQ29udGFpbmVyLnN5bmNcIjpcImlzU2hvd1NlbENvbnRhaW5lclwiLFwidi1iaW5kOmpvYklkLnN5bmNcIjpcImpvYklkXCIsXCJ2LWJpbmQ6aXNEZWxpdmVyeS5zeW5jXCI6XCJpc0RlbGl2ZXJ5XCIsXCJ2LWJpbmQ6aGF2ZVJlc3VtZS5zeW5jXCI6XCJoYXZlUmVzdW1lXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICBwb3NpbmFtZWR1dHk6IFBvc2lOYW1lRHV0eSxcclxuICAgICAgICByZWxhdGVkam9iOiBSZWxhdGVkSm9iLFxyXG4gICAgICAgIHNoYXJlbWluaXBybzogU2hhcmVNaW5pUHJvLFxyXG4gICAgICAgIHNlbHJlc3VtZW9yZzogU2VsUmVzdW1lT3JnLFxyXG4gICAgICAgIG5hdmlnYXRpb25sb2FkOiBOYXZpZ2F0aW9uTG9hZFxyXG4gICAgICB9XHJcblxyXG4gICAgICBkYXRhID0ge1xyXG4gICAgICAgIGpvYklkOiAnJyxcclxuICAgICAgICBjb3JwSWQ6ICcnLFxyXG4gICAgICAgIGNvcnBJbmZvOiB7fSxcclxuICAgICAgICBqb2JJbmZvOiB7fSxcclxuICAgICAgICByZWxhdGVkSm9iczogW10sXHJcbiAgICAgICAgaXNGYXY6IGZhbHNlLCAgIC8v5pyq5pS26JePXHJcbiAgICAgICAgaXNEZWxpdmVyeTogZmFsc2UsICAgIC8v5pyq5oqV6YCSXHJcbiAgICAgICAgbG9naW5JbmZvOiB7fSxcclxuICAgICAgICB1cmxXaXRoQXJnczogXCJcIixcclxuICAgICAgICBjdXJyZW50VXJsOiBcIlwiLFxyXG4gICAgICAgIHNob3dTaGFyZUJ0bjogZmFsc2UsXHJcbiAgICAgICAgZGF0YU9yZzogXCJob21ldmlld1wiLFxyXG4gICAgICAgIGlzU2hvd1NlbENvbnRhaW5lcjogZmFsc2UsXHJcbiAgICAgICAgaGF2ZVJlc3VtZTogdHJ1ZSxcclxuICAgICAgICBpc0ZvbGQ6IHRydWUsXHJcbiAgICAgICAgam9iZGVzY3JpcHRpb25CcmllZjogJycsXHJcbiAgICAgICAgc2hvd1BhZ2VMb2FkaW5nOiB0cnVlLFxyXG4gICAgICAgIGRlc2NGb2xkU2hvdzogdHJ1ZSxcclxuICAgICAgICBpc0lweDogZmFsc2UsXHJcbiAgICAgICAgdG9saXN0OmZhbHNlLFxyXG4gICAgICAgIGFuaTp7fSxcclxuICAgICAgICB3aW5kb3dIZWlnaHQ6MCxcclxuICAgICAgfVxyXG4gICAgICBvblBhZ2VTY3JvbGwoKXtcclxuICAgICAgICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTsgLy8g5b2T5YmN6aG16Z2iXHJcbiAgICAgICAgaWYocGFnZXMubGVuZ3RoPT0xICYmIHRoaXMudG9saXN0KXtcclxuICAgICAgICAgIHZhciBhbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xyXG4gICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICAgICAgIHRpbWluZ0Z1bmN0aW9uOiAnZWFzZScsXHJcbiAgICAgICAgICAgZGVsYXk6IDEwMFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBhbmltYXRpb24ub3BhY2l0eSgxKS50cmFuc2xhdGUoMCwgMCkuc3RlcCgpXHJcbiAgICAgICAgICB0aGlzLmFuaT1hbmltYXRpb24uZXhwb3J0KClcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgb25Mb2FkKG9wdGlvbnMpe1xyXG4gICAgICAgIHZhciB0aGF0PXRoaXNcclxuICAgICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcclxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XHJcbiAgICAgICAgICAgIHRoYXQud2luZG93SGVpZ2h0PXJlcy53aW5kb3dIZWlnaHRcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdmFyIHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7IC8vIOW9k+WJjemhtemdolxyXG4gICAgICAgIGlmKHBhZ2VzLmxlbmd0aD09MSl7XHJcbiAgICAgICAgICB0aGlzLnRvbGlzdD10cnVlXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmpvYklkID0gb3B0aW9ucy5qb2JpZDtcclxuICAgICAgICB0aGlzLmNvcnBJZCA9IG9wdGlvbnMuY29ycGlkO1xyXG4gICAgICAgIHRoaXMubG9naW5JbmZvID0gIHd4LmdldFN0b3JhZ2VTeW5jKExPR0lOX0lORk8pIHx8IHt9O1xyXG4gICAgICAgIHRoaXMudXJsV2l0aEFyZ3MgPSB1dGlscy5nZXRDdXJyZW50UGFnZVVybFdpdGhBcmdzKCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VXJsID0gdXRpbHMuZ2V0Q3VycmVudFBhZ2VVcmwoKTtcclxuICAgICAgICB0aGlzLmlzSXB4ID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuaXNJcHg7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB0aGlzLnZpZXdDb21wYW55am9iKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG9uU2hvdygpe1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvblJlYWR5KCl7XHJcbiAgICAgICAgdGhpcy5zaG93U2hhcmVCdG4gPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvbkhpZGUoKXtcclxuICAgICAgICB0aGlzLmlzU2hvd1NlbENvbnRhaW5lciA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvblNoYXJlQXBwTWVzc2FnZSAocmVzKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc3QgY29ycG5hbWUgPSB0aGF0LmNvcnBJbmZvLmNvcnBuYW1lLFxyXG4gICAgICAgICAgam9ibmFtZSA9IHRoYXQuam9iSW5mby5qb2JuYW1lO1xyXG4gICAgICAgIGxldCB0aXRsZSA9IGAke2NvcnBuYW1lfeato+WcqOaLm+iBmCAke2pvYm5hbWV9YDtcclxuICAgICAgICBpZiAocmVzLmZyb20gPT09ICdidXR0b24nKSB7XHJcbiAgICAgICAgICAvLyDmnaXoh6rpobXpnaLlhoXovazlj5HmjInpkq5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRpdGxlOiB0aXRsZS5sZW5ndGggPiAzMCA/IHRpdGxlLnNsaWNlKDAsIDI5KSsnLi4uJyA6IHRpdGxlLFxyXG4gICAgICAgICAgcGF0aDogYC8ke3RoYXQuY3VycmVudFVybH0/Y29ycGlkPSR7dGhhdC5jb3JwSWR9JmpvYmlkPSR7dGhhdC5qb2JJZH1gLFxyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgIC8vIOi9rOWPkeaIkOWKn1xyXG4gICAgICAgICAgICByZXMuc2hhcmVUaWNrZXRzIC8vIOWNleiBiuaYr+ayoeacieeahO+8jOazqOaEj+W/hemhu+imgeWcqOWIhuS6q+WJjeiwg+eUqHd4LnNob3dTaGFyZU1lbnXmlrnms5XvvIzlkKbliJnmmK/kuI3kvJrluKbliIbkuqvnpajmja5cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgLy8g6L2s5Y+R5aSx6LSlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBtZXRob2RzPXtcclxuICAgICAgICB0b2xpc3QoKXtcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6Jy9wYWdlcy9zZWFyY2gvc2VhcmNoP2pvYm5hbWU9Jyt0aGlzLmpvYkluZm8uam9ibmFtZVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uQ29sbGVjdGlvbkZuKCl7XHJcbiAgICAgICAgICAvLyDmnKrnmbvlvZXot7PovaznmbvlvZXpobVcclxuICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgdXRpbHMuZ29Mb2dpbigpLmNhdGNoKCgpPT57dGhhdC5jb2xsZWN0Sm9iKHRoYXQuam9iSWQpfSlcclxuICAgICAgICAgIDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRGVsaXZlckZuKCl7XHJcbiAgICAgICAgICAvLyDmnKrnmbvlvZXot7PovaznmbvlvZXpobVcclxuICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgdXRpbHMuZ29Mb2dpbigpLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+S4jeWBmuaTjeS9nCcpXHJcbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZih0aGF0LmhhdmVSZXN1bWUpe1xyXG4gICAgICAgICAgICAgIHRoYXQuaXNTaG93U2VsQ29udGFpbmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgICAgIHVybDogYC4uL3BlcnNvbmFsL3Jlc3VtZV9saXN0YFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g6Lez6L2s5YWs5Y+46K+m5oOF6aG1XHJcbiAgICAgICAgZ29Db3JwVmlldyhjb21wYW55aWQpe1xyXG4gICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYC9wYWdlcy9jb3Jwb3JhdGlvbi9jb3Jwdmlldz9jb21wYW55aWQ9JHtjb21wYW55aWR9YFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOafpeeci+WcsOWbvlxyXG4gICAgICAgIGdvTWFwKGFkZHJlc3Mpe1xyXG4gICAgICAgICAgICB0aGlzLmdldEFkZHJlc3MoYWRkcmVzcykudGhlbihkYXRhPT57XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLmRhdGEuc3RhdHVzPT0wKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWRkciA9IGRhdGEuZGF0YS5yZXN1bHQubG9jYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgd3gub3BlbkxvY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0aXR1ZGU6IGFkZHIubGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGFkZHIubG5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogMTgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBg5Zyw5Z2A5L+h5oGv5LiN5YWoYCxcclxuICAgICAgICAgICAgICAgICAgICAgIGljb246ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5kYXRhLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9sZEZuKCl7Ly/liIfmjaLlsZXlvIBcclxuICAgICAgICAgIHRoaXMuaXNGb2xkID0gIXRoaXMuaXNGb2xkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgYXN5bmMgdmlld0NvbXBhbnlqb2IoKXsvL+afpeeci+S8geS4muiBjOS9jeivpue7hlxyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoYXQuc2hvd1BhZ2VMb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldENvbXBhbnlqb2Ioe1xyXG4gICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgXCJoZWFkXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiUTAwMDJcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRhdGFcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LmxvZ2luSW5mby50b2tlbixcclxuICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhhdC5sb2dpbkluZm8udG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICBcImNvcnBpZFwiOiB0aGlzLmNvcnBJZCxcclxuICAgICAgICAgICAgICAgIFwiam9iaWRcIjogdGhpcy5qb2JJZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICB0aGF0LmNvcnBJbmZvID0geyAuLi50aGF0LmNvcnBJbmZvLCAuLi5qc29uLmRhdGEuZGF0YS5jb3JwSW5mbyB9O1xyXG4gICAgICAgICAgdGhhdC5qb2JJbmZvID0geyAuLi50aGF0LmpvYkluZm8sIC4uLmpzb24uZGF0YS5kYXRhLmpvYkluZm8gfTtcclxuICAgICAgICAgIGlmICh0aGF0LmpvYkluZm8uam9iZGVzY3JpcHRpb24ubGVuZ3RoID4gMTAwKSB7XHJcbiAgICAgICAgICAgIHRoYXQuam9iZGVzY3JpcHRpb25CcmllZiA9IHRoYXQuam9iSW5mby5qb2JkZXNjcmlwdGlvbi5zdWJzdHJpbmcoMCwgMTAwKSArICcuLi4uLi4nXHJcbiAgICAgICAgICAgIHRoYXQuZGVzY0ZvbGRTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoYXQuam9iZGVzY3JpcHRpb25CcmllZiA9IHRoYXQuam9iSW5mby5qb2JkZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgdGhhdC5kZXNjRm9sZFNob3cgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoYXQucmVsYXRlZEpvYnMgPSBqc29uLmRhdGEuZGF0YS5yZWxhdGVkSm9icztcclxuICAgICAgICAgIHRoYXQuaXNGYXYgPSBqc29uLmRhdGEuZGF0YS5pc0ZhdjtcclxuICAgICAgICAgIHRoYXQuaXNEZWxpdmVyeSA9IGpzb24uZGF0YS5kYXRhLmlzRGVsaXZlcnk7XHJcbiAgICAgICAgICB0aGF0LnNob3dQYWdlTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5yZXR1cm5Nc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIGFzeW5jIGNvbGxlY3RKb2Ioam9iaWQpIHsvL+S8geS4muiBjOS9jeaUtuiXj1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0Q29tcGFueWpvYih7XHJcbiAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIlEwMDA0XCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LmxvZ2luSW5mby50b2tlbixcclxuICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhhdC5sb2dpbkluZm8udG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICBcImpvYmlkXCI6IGpvYmlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgdGlwLnN1Y2Nlc3MoXCLogYzkvY3mlLbol4/miJDlip9cIik7XHJcbiAgICAgICAgICB0aGF0LmlzRmF2ID0gIXRoYXQuaXNGYXY7XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLnJldHVybk1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgLy8g5omT5byA5Zyw5Zu+XHJcbiAgICBhc3luYyBnZXRBZGRyZXNzKGFkZHJlc3MpIHtcclxuICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRDaXR5TmFtZSh7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzXHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiJdfQ==