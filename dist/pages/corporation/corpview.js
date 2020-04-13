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

var _shareminipro = require('./../../components/shareminipro.js');

var _shareminipro2 = _interopRequireDefault(_shareminipro);

var _navigationload = require('./../../components/navigationload.js');

var _navigationload2 = _interopRequireDefault(_navigationload);

var _utils = require('./../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CorpDatailsView = function (_wepy$page) {
  _inherits(CorpDatailsView, _wepy$page);

  function CorpDatailsView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CorpDatailsView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CorpDatailsView.__proto__ || Object.getPrototypeOf(CorpDatailsView)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '公司详情'
    }, _this.data = {
      corpInfo: {},
      companyJobs: [],
      companyid: '',
      urlWithArgs: "",
      currentUrl: "",
      showShareBtn: false,
      dataOrg: "corpview",
      isFold: true,
      descFoldShow: true,
      corpInfoBrief: '',
      showPageLoading: true
    }, _this.$repeat = {}, _this.$props = { "shareminipro": { "xmlns:v-bind": "", "v-bind:urlWithArgs.sync": "urlWithArgs", "v-bind:currentUrl.sync": "currentUrl", "v-bind:corpInfo.sync": "corpInfo", "v-bind:dataOrg.once": "dataOrg" } }, _this.$events = {}, _this.components = {
      shareminipro: _shareminipro2.default,
      navigationload: _navigationload2.default

      // 转发分享
    }, _this.methods = {
      goJobView: function goJobView(corpid, jobid) {
        _wepy2.default.navigateTo({
          url: '/pages/home/homeview?corpid=' + corpid + '&jobid=' + jobid
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

  _createClass(CorpDatailsView, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.urlWithArgs = _utils2.default.getCurrentPageUrlWithArgs();
      this.currentUrl = _utils2.default.getCurrentPageUrl();
      // 获取公司详情数据
      this.getCorpView(options.companyid);
      this.companyid = options.companyid;
      this.$apply();
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      this.showShareBtn = true;
    }
  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      var pages = getCurrentPages(); //获取加载的页面
      var currentPage = pages[pages.length - 1]; //获取当前页面的对象
      var url = currentPage.route; //当前页面url
      var id = this.companyid;
      return {
        title: '金融职业机会尽在51金融圈',
        desc: '51金融圈丨金融人才求职招聘',
        path: '/' + url + '?companyid=' + id
      };
    }
  }, {
    key: 'getCorpView',


    //获取公司详情数据
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(companyid) {
        var that, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // wx.showLoading({
                //     title: '加载中',
                // })
                that = this;

                that.showPageLoading = true;
                _context.next = 4;
                return _api2.default.getCompanyList({
                  query: {
                    head: {
                      "transcode": "CP002",
                      "type": "h"
                    },
                    data: {
                      "companyid": companyid,
                      "p": "0"
                    }
                  }
                });

              case 4:
                json = _context.sent;

                if (json.data.returnCode == "AAAAAAA") {
                  that.corpInfo = json.data.data.corpinfo;
                  if (that.corpInfo.description.length > 100) {
                    that.descFoldShow = true;
                    that.corpInfoBrief = that.corpInfo.description.substring(0, 100) + '......';
                  } else {
                    that.descFoldShow = false;
                    that.corpInfoBrief = that.corpInfo.description;
                  }
                  that.companyJobs = json.data.data.companyJobs;
                  that.companyJobs.forEach(function (element) {
                    element.createdate = _utils2.default.date('Y-m-d', element.createdate / 1000);
                  });
                  that.showPageLoading = false;
                  that.$apply();
                } else {
                  _tip2.default.error(json.returnMsg);
                }
                // wx.hideLoading() //隐藏loading效果

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCorpView(_x) {
        return _ref2.apply(this, arguments);
      }

      return getCorpView;
    }()

    // 打开地图

  }, {
    key: 'getAddress',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(address) {
        var json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _api2.default.getCityName({
                  method: "GET",
                  address: address
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

      function getAddress(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getAddress;
    }()
  }]);

  return CorpDatailsView;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(CorpDatailsView , 'pages/corporation/corpview'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcnB2aWV3LmpzIl0sIm5hbWVzIjpbIkNvcnBEYXRhaWxzVmlldyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiY29ycEluZm8iLCJjb21wYW55Sm9icyIsImNvbXBhbnlpZCIsInVybFdpdGhBcmdzIiwiY3VycmVudFVybCIsInNob3dTaGFyZUJ0biIsImRhdGFPcmciLCJpc0ZvbGQiLCJkZXNjRm9sZFNob3ciLCJjb3JwSW5mb0JyaWVmIiwic2hvd1BhZ2VMb2FkaW5nIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwic2hhcmVtaW5pcHJvIiwibmF2aWdhdGlvbmxvYWQiLCJtZXRob2RzIiwiZ29Kb2JWaWV3IiwiY29ycGlkIiwiam9iaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29NYXAiLCJhZGRyZXNzIiwiZ2V0QWRkcmVzcyIsInRoZW4iLCJzdGF0dXMiLCJhZGRyIiwicmVzdWx0IiwibG9jYXRpb24iLCJ3eCIsIm9wZW5Mb2NhdGlvbiIsImxhdGl0dWRlIiwibGF0IiwibG9uZ2l0dWRlIiwibG5nIiwic2NhbGUiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsImZvbGRGbiIsIm9wdGlvbnMiLCJnZXRDdXJyZW50UGFnZVVybFdpdGhBcmdzIiwiZ2V0Q3VycmVudFBhZ2VVcmwiLCJnZXRDb3JwVmlldyIsIiRhcHBseSIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwiY3VycmVudFBhZ2UiLCJsZW5ndGgiLCJyb3V0ZSIsImlkIiwiZGVzYyIsInBhdGgiLCJ0aGF0IiwiZ2V0Q29tcGFueUxpc3QiLCJxdWVyeSIsImhlYWQiLCJqc29uIiwicmV0dXJuQ29kZSIsImNvcnBpbmZvIiwiZGVzY3JpcHRpb24iLCJzdWJzdHJpbmciLCJmb3JFYWNoIiwiZWxlbWVudCIsImNyZWF0ZWRhdGUiLCJkYXRlIiwiZXJyb3IiLCJyZXR1cm5Nc2ciLCJn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QUNMLGdDQUFJc0IsS0FBSixDQUFVVCxLQUFLVSxTQUFmO0FBQ0Q7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRjs7Ozs7NEZBQ21CaEQsTzs7Ozs7Ozt1QkFDTSxjQUFJaUQsV0FBSixDQUFnQjtBQUMvQkMsMEJBQVEsS0FEdUI7QUFFL0JsRCwyQkFBU0E7QUFGc0IsaUJBQWhCLEM7OztBQUFic0Msb0I7a0RBSUNBLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFsSThCLGVBQUthLEk7O2tCQUE3Qi9FLGUiLCJmaWxlIjoiY29ycHZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG5pbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcbmltcG9ydCBTaGFyZU1pbmlQcm8gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zaGFyZW1pbmlwcm8nO1xyXG5pbXBvcnQgTmF2aWdhdGlvbkxvYWQgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZpZ2F0aW9ubG9hZCc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuLi8uLi91dGlscy91dGlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3JwRGF0YWlsc1ZpZXcgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WFrOWPuOivpuaDhScsXHJcbiAgfVxyXG5cclxuICBkYXRhID0ge1xyXG4gICAgY29ycEluZm86IHt9LFxyXG4gICAgY29tcGFueUpvYnM6IFtdLFxyXG4gICAgY29tcGFueWlkOicnLFxyXG4gICAgdXJsV2l0aEFyZ3M6IFwiXCIsXHJcbiAgICBjdXJyZW50VXJsOiBcIlwiLFxyXG4gICAgc2hvd1NoYXJlQnRuOiBmYWxzZSxcclxuICAgIGRhdGFPcmc6IFwiY29ycHZpZXdcIixcclxuICAgIGlzRm9sZDogdHJ1ZSxcclxuICAgIGRlc2NGb2xkU2hvdzogdHJ1ZSxcclxuICAgIGNvcnBJbmZvQnJpZWY6ICcnLFxyXG4gICAgc2hvd1BhZ2VMb2FkaW5nOiB0cnVlXHJcbiAgfVxyXG5cclxuICBvbkxvYWQob3B0aW9ucyl7XHJcbiAgICB0aGlzLnVybFdpdGhBcmdzID0gdXRpbHMuZ2V0Q3VycmVudFBhZ2VVcmxXaXRoQXJncygpO1xyXG4gICAgdGhpcy5jdXJyZW50VXJsID0gdXRpbHMuZ2V0Q3VycmVudFBhZ2VVcmwoKTtcclxuICAgIC8vIOiOt+WPluWFrOWPuOivpuaDheaVsOaNrlxyXG4gICAgdGhpcy5nZXRDb3JwVmlldyhvcHRpb25zLmNvbXBhbnlpZCk7XHJcbiAgICB0aGlzLmNvbXBhbnlpZCA9IG9wdGlvbnMuY29tcGFueWlkO1xyXG4gICAgdGhpcy4kYXBwbHkoKTtcclxuICB9XHJcblxyXG4gIG9uUmVhZHkoKXtcclxuICAgIHRoaXMuc2hvd1NoYXJlQnRuID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJzaGFyZW1pbmlwcm9cIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnVybFdpdGhBcmdzLnN5bmNcIjpcInVybFdpdGhBcmdzXCIsXCJ2LWJpbmQ6Y3VycmVudFVybC5zeW5jXCI6XCJjdXJyZW50VXJsXCIsXCJ2LWJpbmQ6Y29ycEluZm8uc3luY1wiOlwiY29ycEluZm9cIixcInYtYmluZDpkYXRhT3JnLm9uY2VcIjpcImRhdGFPcmdcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgc2hhcmVtaW5pcHJvOiBTaGFyZU1pbmlQcm8sXHJcbiAgICBuYXZpZ2F0aW9ubG9hZDogTmF2aWdhdGlvbkxvYWRcclxuICB9XHJcblxyXG4gIC8vIOi9rOWPkeWIhuS6q1xyXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xyXG4gICAgICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKSAgICAvL+iOt+WPluWKoOi9veeahOmhtemdolxyXG4gICAgICB2YXIgY3VycmVudFBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGgtMV0gICAgLy/ojrflj5blvZPliY3pobXpnaLnmoTlr7nosaFcclxuICAgICAgdmFyIHVybCA9IGN1cnJlbnRQYWdlLnJvdXRlICAgIC8v5b2T5YmN6aG16Z2idXJsXHJcbiAgICAgIHZhciBpZCA9IHRoaXMuY29tcGFueWlkXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGl0bGU6ICfph5Hono3ogYzkuJrmnLrkvJrlsL3lnKg1MemHkeiejeWciCcsXHJcbiAgICAgICAgZGVzYzogJzUx6YeR6J6N5ZyI5Lio6YeR6J6N5Lq65omN5rGC6IGM5oub6IGYJyxcclxuICAgICAgICBwYXRoOiBgLyR7dXJsfT9jb21wYW55aWQ9JHtpZH1gXHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgZ29Kb2JWaWV3KGNvcnBpZCwgam9iaWQpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgICAgIHVybDogYC9wYWdlcy9ob21lL2hvbWV2aWV3P2NvcnBpZD0ke2NvcnBpZH0mam9iaWQ9JHtqb2JpZH1gXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDmn6XnnIvlnLDlm75cclxuICAgICAgICBnb01hcChhZGRyZXNzKXtcclxuICAgICAgICAgICAgdGhpcy5nZXRBZGRyZXNzKGFkZHJlc3MpLnRoZW4oZGF0YT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5kYXRhLnN0YXR1cz09MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkZHIgPSBkYXRhLmRhdGEucmVzdWx0LmxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHd4Lm9wZW5Mb2NhdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBhZGRyLmxhdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBhZGRyLmxuZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IDE4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogYOWcsOWdgOS/oeaBr+S4jeWFqGAsXHJcbiAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZSdcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuZGF0YS5tZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvbGRGbigpey8v5YiH5o2i5bGV5byAXHJcbiAgICAgICAgICB0aGlzLmlzRm9sZCA9ICF0aGlzLmlzRm9sZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4vL+iOt+WPluWFrOWPuOivpuaDheaVsOaNrlxyXG4gIGFzeW5jIGdldENvcnBWaWV3KGNvbXBhbnlpZCkge1xyXG4gICAgLy8gd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgLy8gICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgIC8vIH0pXHJcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgIHRoYXQuc2hvd1BhZ2VMb2FkaW5nID0gdHJ1ZTtcclxuICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0Q29tcGFueUxpc3Qoe1xyXG4gICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIkNQMDAyXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJjb21wYW55aWRcIjogY29tcGFueWlkLFxyXG4gICAgICAgICAgICAgICAgXCJwXCI6XCIwXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZiAoanNvbi5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgdGhhdC5jb3JwSW5mbyA9IGpzb24uZGF0YS5kYXRhLmNvcnBpbmZvO1xyXG4gICAgICBpZih0aGF0LmNvcnBJbmZvLmRlc2NyaXB0aW9uLmxlbmd0aCA+IDEwMCkge1xyXG4gICAgICAgIHRoYXQuZGVzY0ZvbGRTaG93ID0gdHJ1ZTtcclxuICAgICAgICB0aGF0LmNvcnBJbmZvQnJpZWYgPSB0aGF0LmNvcnBJbmZvLmRlc2NyaXB0aW9uLnN1YnN0cmluZygwLCAxMDApICsgJy4uLi4uLic7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhhdC5kZXNjRm9sZFNob3cgPSBmYWxzZTtcclxuICAgICAgICB0aGF0LmNvcnBJbmZvQnJpZWYgPSB0aGF0LmNvcnBJbmZvLmRlc2NyaXB0aW9uO1xyXG4gICAgICB9XHJcbiAgICAgIHRoYXQuY29tcGFueUpvYnMgPSBqc29uLmRhdGEuZGF0YS5jb21wYW55Sm9icztcclxuICAgICAgdGhhdC5jb21wYW55Sm9icy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgIGVsZW1lbnQuY3JlYXRlZGF0ZSA9IHV0aWxzLmRhdGUoJ1ktbS1kJywoZWxlbWVudC5jcmVhdGVkYXRlKS8xMDAwKVxyXG4gICAgICB9KTtcclxuICAgICAgdGhhdC5zaG93UGFnZUxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRpcC5lcnJvcihqc29uLnJldHVybk1zZyk7XHJcbiAgICB9XHJcbiAgICAvLyB3eC5oaWRlTG9hZGluZygpIC8v6ZqQ6JePbG9hZGluZ+aViOaenFxyXG4gIH1cclxuXHJcbiAgLy8g5omT5byA5Zyw5Zu+XHJcbiAgICBhc3luYyBnZXRBZGRyZXNzKGFkZHJlc3MpIHtcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldENpdHlOYW1lKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBhZGRyZXNzXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH1cclxufVxyXG5cclxuIl19