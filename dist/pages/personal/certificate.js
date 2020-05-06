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

var _moment = require('./../../npm/moment/moment.js');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseInfo = function (_wepy$page) {
  _inherits(BaseInfo, _wepy$page);

  function BaseInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BaseInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BaseInfo.__proto__ || Object.getPrototypeOf(BaseInfo)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '证书',
      navigationBarBackgroundColor: "#fafafa",
      usingComponents: {
        "i-modal": "../../iview/modal/index"
      }
    }, _this.data = {
      certname: '',
      gaintime: '',
      certid: '',
      token: "",
      tokenKey: "",
      resumeid: '',
      length: 0,
      start: '',
      end: '',
      visible: false
    }, _this.methods = {
      handleOk: function handleOk() {
        this.delExperience();
      },
      toggleM: function toggleM() {
        console.log('切换状态');
        this.visible = !this.visible;
        this.$apply();
      },

      // 提交表单--基本信息编辑新增
      formSubmit: function formSubmit(e) {
        var that = this;
        if (!that.certname) {
          _tip2.default.error('证书名称不为空');
          return false;
        }
        if (!that.gaintime) {
          _tip2.default.error('获取时间不为空');
          return false;
        }

        var gaintime = that.gaintime;

        if (gaintime.indexOf('/') != -1) gaintime = gaintime.replace(/\//g, "-");

        if ((0, _moment2.default)((0, _moment2.default)().format('YYYY-MM')).diff((0, _moment2.default)(gaintime), 'months') < 0) {
          _tip2.default.error('获得证书时间不能大于当前时间');
          return false;
        }

        this.changeData();
      },
      inputChange: function inputChange(e) {
        var name = e.currentTarget.dataset.name;
        this[name] = e.detail.value;
        this.$apply();
      },

      bindDateChange1: function bindDateChange1(e) {
        this.starttime = e.detail.value;
        this.$apply();
      },
      bindDateChange2: function bindDateChange2(e) {
        this.gaintime = e.detail.value.replace(/-/g, "/");
        this.$apply();
      }

      //获取证书
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BaseInfo, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var that = this;
      var login = wx.getStorageSync('login');
      that.certid = options.certid || '';
      that.resumeid = options.resumeid;
      that.token = login.token;
      that.tokenKey = login.tokenKey;

      that.end = (0, _moment2.default)().format("YYYY-MM");
      that.start = (0, _moment2.default)().subtract(30, "years").format("YYYY-MM");
      that.$apply();

      if (that.certid) that.getData();
    }
  }, {
    key: 'getData',
    value: function getData() {
      var that = this;
      wx.showLoading({
        title: '加载中'
      });
      _api2.default.getResumeInfo({
        query: {
          head: {
            "transcode": "M0010",
            "type": "h"
          },
          data: {
            "token": that.token,
            "tokenKey": that.tokenKey,
            "resumeid": that.resumeid
          }
        }
      }).then(function (res) {
        if (res.data.returnCode == "AAAAAAA") {
          wx.hideLoading();
          var jobExper = JSON.parse(res.data.data);
          that.length = jobExper.length;
          var resultArr = jobExper.find(function (item) {
            return item.certid == that.certid;
          });
          that.certname = resultArr.certname;
          that.gaintime = resultArr.gaintime;
          that.$apply();
        } else {
          _tip2.default.error(res.returnMsg);
        }
      });
    }

    // 删除经历

  }, {
    key: 'delExperience',
    value: function delExperience() {
      var that = this;
      _api2.default.delExperience({
        query: {
          head: {
            "transcode": "M0031",
            "type": "h"
          },
          data: {
            token: that.token,
            tokenKey: that.tokenKey,
            resumeid: that.resumeid,
            certid: that.certid
          }
        }
      }).then(function (res) {
        if (res.data && res.data.returnCode == "AAAAAAA") {
          _tip2.default.success('删除成功');
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.update(5);
          wx.navigateBack({
            delta: 1
          });
        } else {
          _tip2.default.error(res.returnMsg);
        }
      }).catch(function (err) {});
    }

    //修改表单数据

  }, {
    key: 'changeData',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that, obj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;

                wx.showLoading({
                  title: '加载中'
                });
                obj = {
                  token: that.token,
                  tokenKey: that.tokenKey,
                  resumeid: that.resumeid,
                  gaintime: that.gaintime,
                  certname: that.certname,
                  certid: that.certid
                };

                _api2.default.getResumeInfo({
                  query: {
                    head: {
                      "transcode": "M0020",
                      "type": "h"
                    },
                    data: obj
                  }
                }).then(function (res) {
                  if (res.data && res.data.returnCode == "AAAAAAA") {
                    var pages = getCurrentPages();
                    var prevPage = pages[pages.length - 2];
                    prevPage.update(5);
                    wx.navigateBack({
                      delta: 1
                    });
                  } else {
                    console.log(data);
                  }
                  wx.hideLoading();
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function changeData() {
        return _ref2.apply(this, arguments);
      }

      return changeData;
    }()
  }]);

  return BaseInfo;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseInfo , 'pages/personal/certificate'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRlLmpzIl0sIm5hbWVzIjpbIkJhc2VJbmZvIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJ1c2luZ0NvbXBvbmVudHMiLCJkYXRhIiwiY2VydG5hbWUiLCJnYWludGltZSIsImNlcnRpZCIsInRva2VuIiwidG9rZW5LZXkiLCJyZXN1bWVpZCIsImxlbmd0aCIsInN0YXJ0IiwiZW5kIiwidmlzaWJsZSIsIm1ldGhvZHMiLCJoYW5kbGVPayIsImRlbEV4cGVyaWVuY2UiLCJ0b2dnbGVNIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsImZvcm1TdWJtaXQiLCJlIiwidGhhdCIsImVycm9yIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJmb3JtYXQiLCJkaWZmIiwiY2hhbmdlRGF0YSIsImlucHV0Q2hhbmdlIiwibmFtZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiZGV0YWlsIiwidmFsdWUiLCJiaW5kRGF0ZUNoYW5nZTEiLCJzdGFydHRpbWUiLCJiaW5kRGF0ZUNoYW5nZTIiLCJvcHRpb25zIiwibG9naW4iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwic3VidHJhY3QiLCJnZXREYXRhIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImdldFJlc3VtZUluZm8iLCJxdWVyeSIsImhlYWQiLCJ0aGVuIiwicmVzIiwicmV0dXJuQ29kZSIsImhpZGVMb2FkaW5nIiwiam9iRXhwZXIiLCJKU09OIiwicGFyc2UiLCJyZXN1bHRBcnIiLCJmaW5kIiwiaXRlbSIsInJldHVybk1zZyIsInN1Y2Nlc3MiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwidXBkYXRlIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjYXRjaCIsIm9iaiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEs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TWtFO0FBTFA7QUFEUyxpQkFBbEIsRUFRS25CLElBUkwsQ0FRVSxlQUFLO0FBQ1gsc0JBQUdDLElBQUloRCxJQUFKLElBQVlnRCxJQUFJaEQsSUFBSixDQUFTaUQsVUFBVCxJQUF1QixTQUF0QyxFQUFpRDtBQUM5Qyx3QkFBSVUsUUFBUUMsaUJBQVo7QUFDQyx3QkFBSUMsV0FBV0YsTUFBTUEsTUFBTXBELE1BQU4sR0FBZSxDQUFyQixDQUFmO0FBQ0FzRCw2QkFBU0MsTUFBVCxDQUFnQixDQUFoQjtBQUNBeEIsdUJBQUd5QixZQUFILENBQWdCO0FBQ2ZDLDZCQUFPO0FBRFEscUJBQWhCO0FBR0gsbUJBUEQsTUFPSztBQUNEakQsNEJBQVFDLEdBQVIsQ0FBWWhCLElBQVo7QUFDSDtBQUNEc0MscUJBQUdZLFdBQUg7QUFDRCxpQkFwQkg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF0S2tDLGVBQUtpQixJOztrQkFBdEJ4RSxRIiwiZmlsZSI6ImNlcnRpZmljYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG4gIGltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuICBpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUluZm8gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6K+B5LmmJyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjZmFmYWZhXCIsXHJcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgIFwiaS1tb2RhbFwiOiBcIi4uLy4uL2l2aWV3L21vZGFsL2luZGV4XCJcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGNlcnRuYW1lOicnLFxyXG4gICAgICBnYWludGltZTonJyxcclxuICAgICAgY2VydGlkOicnLFxyXG4gICAgICB0b2tlbjogXCJcIixcclxuICAgICAgdG9rZW5LZXk6IFwiXCIsXHJcbiAgICAgIHJlc3VtZWlkOicnLFxyXG4gICAgICBsZW5ndGg6MCxcclxuICAgICAgc3RhcnQ6JycsXHJcbiAgICAgIGVuZDonJyxcclxuICAgICAgdmlzaWJsZTpmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBsZXQgbG9naW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW4nKVxyXG4gICAgICB0aGF0LmNlcnRpZCA9IG9wdGlvbnMuY2VydGlkIHx8ICcnO1xyXG4gICAgICB0aGF0LnJlc3VtZWlkID0gb3B0aW9ucy5yZXN1bWVpZDtcclxuICAgICAgdGhhdC50b2tlbiA9IGxvZ2luLnRva2VuXHJcbiAgICAgIHRoYXQudG9rZW5LZXkgPSBsb2dpbi50b2tlbktleVxyXG5cclxuICAgICAgdGhhdC5lbmQgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NXCIpXHJcbiAgICAgIHRoYXQuc3RhcnQgPSBtb21lbnQoKS5zdWJ0cmFjdCgzMCwgXCJ5ZWFyc1wiKS5mb3JtYXQoXCJZWVlZLU1NXCIpXHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcblxyXG4gICAgICBpZih0aGF0LmNlcnRpZCkgdGhhdC5nZXREYXRhKClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgaGFuZGxlT2soKXtcclxuICAgICAgICB0aGlzLmRlbEV4cGVyaWVuY2UoKVxyXG4gICAgICB9LFxyXG4gICAgICB0b2dnbGVNKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIh+aNoueKtuaAgScpXHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gIXRoaXMudmlzaWJsZVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfSxcclxuICAgICAgICAvLyDmj5DkuqTooajljZUtLeWfuuacrOS/oeaBr+e8lui+keaWsOWinlxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICBpZighdGhhdC5jZXJ0bmFtZSl7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcign6K+B5Lmm5ZCN56ew5LiN5Li656m6Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoIXRoYXQuZ2FpbnRpbWUpe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+iOt+WPluaXtumXtOS4jeS4uuepuicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBsZXQgZ2FpbnRpbWU9dGhhdC5nYWludGltZVxyXG5cclxuICAgICAgICAgIGlmKGdhaW50aW1lLmluZGV4T2YoJy8nKSE9LTEpIGdhaW50aW1lID0gZ2FpbnRpbWUucmVwbGFjZSgvXFwvL2csXCItXCIpXHJcblxyXG4gICAgICAgICAgaWYobW9tZW50KG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTScpKS5kaWZmKG1vbWVudChnYWludGltZSksICdtb250aHMnKTwwKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfojrflvpfor4Hkuabml7bpl7TkuI3og73lpKfkuo7lvZPliY3ml7bpl7QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VEYXRhKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlucHV0Q2hhbmdlKGUpe1xyXG4gICAgICAgICAgY29uc3QgbmFtZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICAgIHRoaXNbbmFtZV0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRGF0ZUNoYW5nZTE6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydHRpbWUgPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmREYXRlQ2hhbmdlMjogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB0aGlzLmdhaW50aW1lID0gZS5kZXRhaWwudmFsdWUucmVwbGFjZSgvLS9nLFwiL1wiKTtcclxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W6K+B5LmmXHJcbiAgICBnZXREYXRhKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgIH0pXHJcbiAgICAgIGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDEwXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bWVpZFwiOiB0aGF0LnJlc3VtZWlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgdmFyIGpvYkV4cGVyID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICB0aGF0Lmxlbmd0aCA9IGpvYkV4cGVyLmxlbmd0aDtcclxuICAgICAgICAgICAgICBsZXQgcmVzdWx0QXJyID0gam9iRXhwZXIuZmluZChpdGVtID0+IGl0ZW0uY2VydGlkID09IHRoYXQuY2VydGlkKVxyXG4gICAgICAgICAgICAgIHRoYXQuY2VydG5hbWUgPSByZXN1bHRBcnIuY2VydG5hbWU7XHJcbiAgICAgICAgICAgICAgdGhhdC5nYWludGltZSA9IHJlc3VsdEFyci5nYWludGltZTtcclxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aXAuZXJyb3IocmVzLnJldHVybk1zZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yig6Zmk57uP5Y6GXHJcbiAgICBkZWxFeHBlcmllbmNlKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICBhcGkuZGVsRXhwZXJpZW5jZSh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDMxXCIsXHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB0b2tlbjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgdG9rZW5LZXk6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgICAgIHJlc3VtZWlkOnRoYXQucmVzdW1laWQsXHJcbiAgICAgICAgICAgIGNlcnRpZDp0aGF0LmNlcnRpZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgdGlwLnN1Y2Nlc3MoJ+WIoOmZpOaIkOWKnycpO1xyXG4gICAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgIHByZXZQYWdlLnVwZGF0ZSg1KVxyXG4gICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IocmVzLnJldHVybk1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnI9PntcclxuXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/kv67mlLnooajljZXmlbDmja5cclxuICAgIGFzeW5jIGNoYW5nZURhdGEoKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgIH0pXHJcbiAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgdG9rZW46IHRoYXQudG9rZW4sXHJcbiAgICAgICAgdG9rZW5LZXk6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgcmVzdW1laWQ6IHRoYXQucmVzdW1laWQsXHJcbiAgICAgICAgZ2FpbnRpbWU6dGhhdC5nYWludGltZSxcclxuICAgICAgICBjZXJ0bmFtZTp0aGF0LmNlcnRuYW1lLFxyXG4gICAgICAgIGNlcnRpZDp0aGF0LmNlcnRpZFxyXG4gICAgICB9XHJcbiAgICAgIGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMjBcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBvYmpcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgICBpZihyZXMuZGF0YSAmJiByZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICBsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgICAgICAgICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgICBwcmV2UGFnZS51cGRhdGUoNSlcclxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==