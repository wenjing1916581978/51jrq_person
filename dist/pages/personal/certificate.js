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
      navigationBarBackgroundColor: "#fafafa"
    }, _this.data = {
      certname: '',
      gaintime: '',
      certid: '',
      token: "",
      tokenKey: "",
      resumeid: '',
      length: 0,
      start: '',
      end: ''
    }, _this.methods = {
      del: function del() {
        this.delExperience();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNlcnRpZmljYXRlLmpzIl0sIm5hbWVzIjpbIkJhc2VJbmZvIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwiY2VydG5hbWUiLCJnYWludGltZSIsImNlcnRpZCIsInRva2VuIiwidG9rZW5LZXkiLCJyZXN1bWVpZCIsImxlbmd0aCIsInN0YXJ0IiwiZW5kIiwibWV0aG9kcyIsImRlbCIsImRlbEV4cGVyaWVuY2UiLCJmb3JtU3VibWl0IiwiZSIsInRoYXQiLCJlcnJvciIsImluZGV4T2YiLCJyZXBsYWNlIiwiZm9ybWF0IiwiZGlmZiIsImNoYW5nZURhdGEiLCJpbnB1dENoYW5nZSIsIm5hbWUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwiYmluZERhdGVDaGFuZ2UxIiwic3RhcnR0aW1lIiwiYmluZERhdGVDaGFuZ2UyIiwib3B0aW9ucyIsImxvZ2luIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInN1YnRyYWN0IiwiZ2V0RGF0YSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJnZXRSZXN1bWVJbmZvIiwicXVlcnkiLCJoZWFkIiwidGhlbiIsInJlcyIsInJldHVybkNvZGUiLCJoaWRlTG9hZGluZyIsImpvYkV4cGVyIiwiSlNPTiIsInBhcnNlIiwicmVzdWx0QXJyIiwiZmluZCIsIml0ZW0iLCJyZXR1cm5Nc2ciLCJzdWNjZXNzIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsInVwZGF0ZSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiY2F0Y2giLCJvYmoiLCJjb25zb2xlIiwibG9nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7OzswTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0Is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Q0FBZ0I7QUFDZkMsNkJBQU87QUFEUSxxQkFBaEI7QUFHSCxtQkFQRCxNQU9LO0FBQ0RHLDRCQUFRQyxHQUFSLENBQVloRSxJQUFaO0FBQ0g7QUFDRGtDLHFCQUFHWSxXQUFIO0FBQ0QsaUJBcEJIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBN0prQyxlQUFLbUIsSTs7a0JBQXRCckUsUSIsImZpbGUiOiJjZXJ0aWZpY2F0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuICBpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcbiAgaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VJbmZvIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ivgeS5picsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiI2ZhZmFmYVwiLFxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIGNlcnRuYW1lOicnLFxyXG4gICAgICBnYWludGltZTonJyxcclxuICAgICAgY2VydGlkOicnLFxyXG4gICAgICB0b2tlbjogXCJcIixcclxuICAgICAgdG9rZW5LZXk6IFwiXCIsXHJcbiAgICAgIHJlc3VtZWlkOicnLFxyXG4gICAgICBsZW5ndGg6MCxcclxuICAgICAgc3RhcnQ6JycsXHJcbiAgICAgIGVuZDonJyxcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgbGV0IGxvZ2luID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2xvZ2luJylcclxuICAgICAgdGhhdC5jZXJ0aWQgPSBvcHRpb25zLmNlcnRpZCB8fCAnJztcclxuICAgICAgdGhhdC5yZXN1bWVpZCA9IG9wdGlvbnMucmVzdW1laWQ7XHJcbiAgICAgIHRoYXQudG9rZW4gPSBsb2dpbi50b2tlblxyXG4gICAgICB0aGF0LnRva2VuS2V5ID0gbG9naW4udG9rZW5LZXlcclxuXHJcbiAgICAgIHRoYXQuZW5kID0gbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTVwiKVxyXG4gICAgICB0aGF0LnN0YXJ0ID0gbW9tZW50KCkuc3VidHJhY3QoMzAsIFwieWVhcnNcIikuZm9ybWF0KFwiWVlZWS1NTVwiKVxyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG5cclxuICAgICAgaWYodGhhdC5jZXJ0aWQpIHRoYXQuZ2V0RGF0YSgpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgZGVsKCl7XHJcbiAgICAgICAgICB0aGlzLmRlbEV4cGVyaWVuY2UoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g5o+Q5Lqk6KGo5Y2VLS3ln7rmnKzkv6Hmga/nvJbovpHmlrDlop5cclxuICAgICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgaWYoIXRoYXQuY2VydG5hbWUpe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+ivgeS5puWQjeensOS4jeS4uuepuicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKCF0aGF0LmdhaW50aW1lKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfojrflj5bml7bpl7TkuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgbGV0IGdhaW50aW1lPXRoYXQuZ2FpbnRpbWVcclxuXHJcbiAgICAgICAgICBpZihnYWludGltZS5pbmRleE9mKCcvJykhPS0xKSBnYWludGltZSA9IGdhaW50aW1lLnJlcGxhY2UoL1xcLy9nLFwiLVwiKVxyXG5cclxuICAgICAgICAgIGlmKG1vbWVudChtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0nKSkuZGlmZihtb21lbnQoZ2FpbnRpbWUpLCAnbW9udGhzJyk8MCl7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcign6I635b6X6K+B5Lmm5pe26Ze05LiN6IO95aSn5LqO5b2T5YmN5pe26Ze0Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuY2hhbmdlRGF0YSgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnB1dENoYW5nZShlKXtcclxuICAgICAgICAgIGNvbnN0IG5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICAgICB0aGlzW25hbWVdID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZERhdGVDaGFuZ2UxOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnR0aW1lID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kRGF0ZUNoYW5nZTI6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5nYWludGltZSA9IGUuZGV0YWlsLnZhbHVlLnJlcGxhY2UoLy0vZyxcIi9cIik7XHJcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluivgeS5plxyXG4gICAgZ2V0RGF0YSgpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICB9KVxyXG4gICAgICBhcGkuZ2V0UmVzdW1lSW5mbyh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAxMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhhdC50b2tlbktleSxcclxuICAgICAgICAgICAgICAgIFwicmVzdW1laWRcIjogdGhhdC5yZXN1bWVpZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgIHZhciBqb2JFeHBlciA9IEpTT04ucGFyc2UocmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgdGhhdC5sZW5ndGggPSBqb2JFeHBlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgbGV0IHJlc3VsdEFyciA9IGpvYkV4cGVyLmZpbmQoaXRlbSA9PiBpdGVtLmNlcnRpZCA9PSB0aGF0LmNlcnRpZClcclxuICAgICAgICAgICAgICB0aGF0LmNlcnRuYW1lID0gcmVzdWx0QXJyLmNlcnRuYW1lO1xyXG4gICAgICAgICAgICAgIHRoYXQuZ2FpbnRpbWUgPSByZXN1bHRBcnIuZ2FpbnRpbWU7XHJcbiAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGlwLmVycm9yKHJlcy5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIoOmZpOe7j+WOhlxyXG4gICAgZGVsRXhwZXJpZW5jZSgpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgYXBpLmRlbEV4cGVyaWVuY2Uoe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAzMVwiLFxyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdG9rZW46IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICAgIHRva2VuS2V5OiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgICByZXN1bWVpZDp0aGF0LnJlc3VtZWlkLFxyXG4gICAgICAgICAgICBjZXJ0aWQ6dGhhdC5jZXJ0aWRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgIHRpcC5zdWNjZXNzKCfliKDpmaTmiJDlip8nKTtcclxuICAgICAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgICAgbGV0IHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICBwcmV2UGFnZS51cGRhdGUoNSlcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGlwLmVycm9yKHJlcy5yZXR1cm5Nc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyPT57XHJcblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5L+u5pS56KGo5Y2V5pWw5o2uXHJcbiAgICBhc3luYyBjaGFuZ2VEYXRhKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICB9KVxyXG4gICAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgIHRva2VuOiB0aGF0LnRva2VuLFxyXG4gICAgICAgIHRva2VuS2V5OiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgIHJlc3VtZWlkOiB0aGF0LnJlc3VtZWlkLFxyXG4gICAgICAgIGdhaW50aW1lOnRoYXQuZ2FpbnRpbWUsXHJcbiAgICAgICAgY2VydG5hbWU6dGhhdC5jZXJ0bmFtZSxcclxuICAgICAgICBjZXJ0aWQ6dGhhdC5jZXJ0aWRcclxuICAgICAgfVxyXG4gICAgICBhcGkuZ2V0UmVzdW1lSW5mbyh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogb2JqXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgICAgaWYocmVzLmRhdGEgJiYgcmVzLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgICAgICAgbGV0IHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgcHJldlBhZ2UudXBkYXRlKDUpXHJcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=