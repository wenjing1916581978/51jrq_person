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

var monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var WorkExper = function (_wepy$page) {
  _inherits(WorkExper, _wepy$page);

  function WorkExper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WorkExper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WorkExper.__proto__ || Object.getPrototypeOf(WorkExper)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '工作经历',
      navigationBarBackgroundColor: "#fafafa"
    }, _this.data = {
      corpname: '',
      postcode: '',
      starttime: '',
      endtime: '',
      workremark: '',
      workid: '',
      resumeid: '',
      token: '',
      tokenKey: '',
      length: 0,
      endtimeArray: [['至今'], ['至今']],
      endtimeIndex: [0, 0],
      starttimeArray: [['至今'], []],
      starttimeIndex: [0, 0],
      startinit: false,
      endtinit: false
    }, _this.methods = {
      endtimeChange: function endtimeChange(e) {
        var endtimeArray = this.endtimeArray;

        this.endinit = true;
        var v = e.detail.value;
        if (v[0] == 0 || v[0] == 32) {
          this.endtime = endtimeArray[0][v[0]];
        } else {
          var month = parseInt(v[1]) + 1;
          var r = month < 10 ? '0' + month : month;
          this.endtime = endtimeArray[0][v[0]] + '/' + r;
        }
        this.multiIndex = e.detail.value;
        this.$apply();
      },
      endtimeColumnChange: function endtimeColumnChange(e) {
        var data = {
          endtimeArray: this.endtimeArray,
          endtimeIndex: this.endtimeIndex
        };
        data.endtimeIndex[e.detail.column] = e.detail.value;
        if (e.detail.column == 0) {
          if (data.endtimeIndex[0] == 0) {
            data.endtimeArray[1] = ['至今'];
            data.endtimeIndex[1] = 0;
          } else if (data.endtimeIndex[0] == 32) {
            var arr = data.endtimeArray[0];
            data.endtimeArray[1] = [arr[arr.length - 1]];
            data.endtimeIndex[1] = 0;
          } else {
            data.endtimeArray[1] = monthArr;
          }
        }
        this.$apply();
      },
      starttimeChange: function starttimeChange(e) {
        var starttimeArray = this.starttimeArray;

        this.startinit = true;
        var v = e.detail.value;
        if (v[0] == 31) {
          this.starttime = starttimeArray[0][v[0]];
        } else {
          var month = parseInt(v[1]) + 1;
          var r = month < 10 ? '0' + month : month;
          this.starttime = starttimeArray[0][v[0]] + '/' + r;
        }
        this.multiIndex = e.detail.value;
        this.$apply();
      },
      starttimeColumnChange: function starttimeColumnChange(e) {
        var data = {
          starttimeArray: this.starttimeArray,
          starttimeIndex: this.starttimeIndex
        };
        data.starttimeIndex[e.detail.column] = e.detail.value;
        if (data.starttimeIndex[0] == 31) {
          var arr = data.starttimeArray[0];
          data.starttimeArray[1] = [arr[arr.length - 1]];
          data.starttimeIndex[1] = 0;
        } else {
          data.starttimeArray[1] = monthArr;
        }
        this.$apply();
      },

      del: function del() {
        this.delExperience();
      },

      formSubmit: function formSubmit(e) {
        var that = this;

        if (!that.corpname) {
          _tip2.default.error('公司名称不为空');
          return false;
        }
        if (!that.postcode) {
          _tip2.default.error('职位名称不为空');
          return false;
        }
        if (!that.starttime) {
          _tip2.default.error('请选择开始时间');
          return false;
        }
        if (!that.endtime) {
          _tip2.default.error('请选择结束时间');
          return false;
        }
        if (!that.workremark) {
          _tip2.default.error('工作内容不为空');
          return false;
        }

        var startTime = that.starttime;
        var endTime = that.endtime;

        if (startTime.indexOf('/') != -1) startTime = startTime.replace(/\//g, "-");

        if ((0, _moment2.default)((0, _moment2.default)().format('YYYY-MM')).diff((0, _moment2.default)(startTime), 'months') < 0) {
          _tip2.default.error('起始时间不能大于当前时间');
          return false;
        }

        if (that.endtime.indexOf('以前') != -1 && that.starttime.indexOf('以前') == -1) {
          _tip2.default.error('起始时间不能大于结束时间');
          return false;
        }

        if (that.starttime.indexOf('以前') == -1 && that.endtime != '至今' && that.endtime.indexOf('以前') == -1) {

          if (endTime.indexOf('/') != -1) endTime = endTime.replace(/\//g, "-");
          if (startTime.indexOf('/') != -1) startTime = startTime.replace(/\//g, "-");
          var diff = (0, _moment2.default)(endTime).diff((0, _moment2.default)(startTime), 'months');
          if (diff < 0) {
            _tip2.default.error('起始时间不能大于结束时间');
            return false;
          }
        }

        this.changeData();
      },
      inputChange: function inputChange(e) {
        var name = e.currentTarget.dataset.name;
        this[name] = e.detail.value;
        this.$apply();
      },

      dateChange: function dateChange(e) {
        var name = e.currentTarget.dataset.name;
        this[name] = e.detail.value.replace(/-/g, "/");
        this.$apply();
      }

      //获取工作经历
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WorkExper, [{
    key: 'onLoad',
    value: function onLoad(options) {

      var that = this;
      var login = wx.getStorageSync('login');
      that.resumeid = options.resumeid || '21080211';
      that.workid = options.workid;
      that.token = login.token;
      that.tokenKey = login.tokenKey;
      that.$apply();

      if (that.workid) that.getData();

      var one = [];
      var now = new Date();
      var currentY = now.getFullYear();
      var currentM = now.getMonth() + 1;

      for (var i = 0; i < 31; i++) {
        var v = currentY - i;
        one.push(v + '');
        if (i == 30) one.push(v + '以前');
      }

      this.starttimeArray[0] = one;
      this.starttimeArray[1] = monthArr;
      var a = ['至今'];
      var newA = [].concat(a, one);
      this.endtimeArray[0] = newA;
      this.$apply();
    }
  }, {
    key: 'getData',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var that;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = this;

                wx.showLoading({
                  title: '加载中'
                });
                _api2.default.getResumeInfo({
                  query: {
                    head: {
                      "transcode": "M0005",
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
                    var resultArr = jobExper.find(function (item) {
                      return item.workid == that.workid;
                    });
                    that.corpname = resultArr.corpname;
                    that.postcode = resultArr.postcode;
                    that.length = jobExper.length;
                    that.starttime = resultArr.starttime;
                    that.endtime = resultArr.endtime;
                    that.workremark = resultArr.workremark;
                    that.$apply();
                  } else {
                    _tip2.default.error(res.returnMsg);
                  }
                });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getData() {
        return _ref2.apply(this, arguments);
      }

      return getData;
    }()

    // 删除经历

  }, {
    key: 'delExperience',
    value: function delExperience() {
      var that = this;
      _api2.default.delExperience({
        query: {
          head: {
            "transcode": "M0028",
            "type": "h"
          },
          data: {
            token: that.token,
            tokenKey: that.tokenKey,
            resumeid: that.resumeid,
            workid: that.workid
          }
        }
      }).then(function (res) {
        if (res.data && res.data.returnCode == "AAAAAAA") {
          _tip2.default.success('删除成功');
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.update(2);
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
    value: function changeData() {
      var that = this;
      // str.
      var obj = {
        token: that.token,
        tokenKey: that.tokenKey,
        resumeid: that.resumeid,
        corpname: that.corpname,
        postcode: that.postcode,
        starttime: that.starttime,
        endtime: that.endtime,
        workremark: that.workremark,
        workid: that.workid
      };

      _api2.default.getResumeInfo({
        query: {
          head: {
            "transcode": "M0015",
            "type": "h"
          },
          data: obj
        }
      }).then(function (res) {
        if (res.data && res.data.returnCode == "AAAAAAA") {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.update(2);
          wx.navigateBack({
            delta: 1
          });
        } else {
          console.log(data);
        }
        wx.hideLoading();
      });
    }
  }]);

  return WorkExper;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(WorkExper , 'pages/personal/work_exper'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtfZXhwZXIuanMiXSwibmFtZXMiOlsibW9udGhBcnIiLCJXb3JrRXhwZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsImRhdGEiLCJjb3JwbmFtZSIsInBvc3Rjb2RlIiwic3RhcnR0aW1lIiwiZW5kdGltZSIsIndvcmtyZW1hcmsiLCJ3b3JraWQiLCJyZXN1bWVpZCIsInRva2VuIiwidG9rZW5LZXkiLCJsZW5ndGgiLCJlbmR0aW1lQXJyYXkiLCJlbmR0aW1lSW5kZXgiLCJzdGFydHRpbWVBcnJheSIsInN0YXJ0dGltZUluZGV4Iiwic3RhcnRpbml0IiwiZW5kdGluaXQiLCJtZXRob2RzIiwiZW5kdGltZUNoYW5nZSIsImUiLCJlbmRpbml0IiwidiIsImRldGFpbCIsInZhbHVlIiwibW9udGgiLCJwYXJzZUludCIsInIiLCJtdWx0aUluZGV4IiwiJGFwcGx5IiwiZW5kdGltZUNvbHVtbkNoYW5nZSIsImNvbHVtbiIsImFyciIsInN0YXJ0dGltZUNoYW5nZSIsInN0YXJ0dGltZUNvbHVtbkNoYW5nZSIsImRlbCIsImRlbEV4cGVyaWVuY2UiLCJmb3JtU3VibWl0IiwidGhhdCIsImVycm9yIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImluZGV4T2YiLCJyZXBsYWNlIiwiZm9ybWF0IiwiZGlmZiIsImNoYW5nZURhdGEiLCJpbnB1dENoYW5nZSIsIm5hbWUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImRhdGVDaGFuZ2UiLCJvcHRpb25zIiwibG9naW4iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0RGF0YSIsIm9uZSIsIm5vdyIsIkRhdGUiLCJjdXJyZW50WSIsImdldEZ1bGxZZWFyIiwiY3VycmVudE0iLCJnZXRNb250aCIsImkiLCJwdXNoIiwiYSIsIm5ld0EiLCJzaG93TG9hZGluZyIsInRpdGxlIiwiZ2V0UmVzdW1lSW5mbyIsInF1ZXJ5IiwiaGVhZCIsInRoZW4iLCJyZXMiLCJyZXR1cm5Db2RlIiwiaGlkZUxvYWRpbmciLCJqb2JFeHBlciIsIkpTT04iLCJwYXJzZSIsInJlc3VsdEFyciIsImZpbmQiLCJpdGVtIiwicmV0dXJuTXNnIiwic3VjY2VzcyIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwicHJldlBhZ2UiLCJ1cGRhdGUiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsImNhdGNoIiwib2JqIiwiY29uc29sZSIsImxvZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztBQURBLElBQUlBLFdBQVUsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixFQUFuQixFQUFzQixFQUF0QixFQUF5QixFQUF6QixDQUFkOztJQUVxQkMsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLG9DQUE4QjtBQUZ2QixLLFFBSVRDLEksR0FBTztBQUNMQyxnQkFBUyxFQURKO0FBRUxDLGdCQUFTLEVBRko7QUFHTEMsaUJBQVUsRUFITDtBQUlMQyxlQUFRLEVBSkg7QUFLTEMsa0JBQVcsRUFMTjtBQU1MQyxjQUFPLEVBTkY7QUFPTEMsZ0JBQVUsRUFQTDtBQVFMQyxhQUFPLEVBUkY7QUFTTEMsZ0JBQVUsRUFUTDtBQVVMQyxjQUFPLENBVkY7QUFXTEMsb0JBQWMsQ0FBQyxDQUFDLElBQUQsQ0FBRCxFQUFTLENBQUMsSUFBRCxDQUFULENBWFQ7QUFZTEMsb0JBQWMsQ0FBQyxDQUFELEVBQUksQ0FBSixDQVpUO0FBYUxDLHNCQUFnQixDQUFDLENBQUMsSUFBRCxDQUFELEVBQVMsRUFBVCxDQWJYO0FBY0xDLHNCQUFnQixDQUFDLENBQUQsRUFBSSxDQUFKLENBZFg7QUFlTEMsaUJBQVUsS0FmTDtBQWdCTEMsZ0JBQVM7QUFoQkos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ZjtBQUNBNEUsbUJBQVNDLE1BQVQsQ0FBZ0IsQ0FBaEI7QUFDQWxDLGFBQUdtQyxZQUFILENBQWdCO0FBQ2ZDLG1CQUFPO0FBRFEsV0FBaEI7QUFHSCxTQVBELE1BT0s7QUFDREcsa0JBQVFDLEdBQVIsQ0FBWTdGLElBQVo7QUFDSDtBQUNEcUQsV0FBR3NCLFdBQUg7QUFDRCxPQXBCRDtBQXFCRDs7OztFQXhTb0MsZUFBS21CLEk7O2tCQUF2QmxHLFMiLCJmaWxlIjoid29ya19leHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuICBpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcbiAgbGV0IG1vbnRoQXJyID1bMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTJdXHJcbiAgaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29ya0V4cGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+W3peS9nOe7j+WOhicsXHJcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiI2ZhZmFmYVwiLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgY29ycG5hbWU6JycsXHJcbiAgICAgIHBvc3Rjb2RlOicnLFxyXG4gICAgICBzdGFydHRpbWU6JycsXHJcbiAgICAgIGVuZHRpbWU6JycsXHJcbiAgICAgIHdvcmtyZW1hcms6JycsXHJcbiAgICAgIHdvcmtpZDonJyxcclxuICAgICAgcmVzdW1laWQ6ICcnLFxyXG4gICAgICB0b2tlbjogJycsXHJcbiAgICAgIHRva2VuS2V5OiAnJyxcclxuICAgICAgbGVuZ3RoOjAsXHJcbiAgICAgIGVuZHRpbWVBcnJheTogW1sn6Iez5LuKJ10sIFsn6Iez5LuKJ11dLFxyXG4gICAgICBlbmR0aW1lSW5kZXg6IFswLCAwXSxcclxuICAgICAgc3RhcnR0aW1lQXJyYXk6IFtbJ+iHs+S7iiddLCBbXV0sXHJcbiAgICAgIHN0YXJ0dGltZUluZGV4OiBbMCwgMF0sXHJcbiAgICAgIHN0YXJ0aW5pdDpmYWxzZSxcclxuICAgICAgZW5kdGluaXQ6ZmFsc2UsXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuXHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBsZXQgbG9naW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW4nKVxyXG4gICAgICB0aGF0LnJlc3VtZWlkID0gb3B0aW9ucy5yZXN1bWVpZCB8fCAnMjEwODAyMTEnO1xyXG4gICAgICB0aGF0LndvcmtpZCA9IG9wdGlvbnMud29ya2lkO1xyXG4gICAgICB0aGF0LnRva2VuID0gbG9naW4udG9rZW5cclxuICAgICAgdGhhdC50b2tlbktleSA9IGxvZ2luLnRva2VuS2V5XHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcblxyXG4gICAgICBpZih0aGF0LndvcmtpZCkgdGhhdC5nZXREYXRhKClcclxuXHJcbiAgICAgIGxldCBvbmUgPSBbXVxyXG4gICAgICBsZXQgbm93ID0gbmV3IERhdGUoKVxyXG4gICAgICBsZXQgY3VycmVudFkgPSBub3cuZ2V0RnVsbFllYXIoKVxyXG4gICAgICBsZXQgY3VycmVudE0gPSBub3cuZ2V0TW9udGgoKSsxXHJcblxyXG4gICAgICBmb3IodmFyIGk9MDtpPDMxO2krKyl7XHJcbiAgICAgICAgbGV0IHYgPSBjdXJyZW50WS1pXHJcbiAgICAgICAgb25lLnB1c2godisnJylcclxuICAgICAgICBpZihpPT0zMCkgb25lLnB1c2godisn5Lul5YmNJylcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHRoaXMuc3RhcnR0aW1lQXJyYXlbMF0gPSBvbmVcclxuICAgICAgdGhpcy5zdGFydHRpbWVBcnJheVsxXSA9IG1vbnRoQXJyXHJcbiAgICAgIGxldCBhPVsn6Iez5LuKJ11cclxuICAgICAgdmFyIG5ld0EgPSBbLi4uYSwuLi5vbmVdXHJcbiAgICAgIHRoaXMuZW5kdGltZUFycmF5WzBdID0gbmV3QVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBlbmR0aW1lQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgY29uc3Qge2VuZHRpbWVBcnJheX0gPSB0aGlzXHJcbiAgICAgICAgICB0aGlzLmVuZGluaXQgPSB0cnVlXHJcbiAgICAgICAgICBsZXQgdiA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICBpZih2WzBdPT0wIHx8IHZbMF09PTMyKXtcclxuICAgICAgICAgICAgdGhpcy5lbmR0aW1lID0gZW5kdGltZUFycmF5WzBdW3ZbMF1dXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IG1vbnRoID0gcGFyc2VJbnQodlsxXSkrMVxyXG4gICAgICAgICAgICBsZXQgciA9IG1vbnRoPDEwPycwJyttb250aDptb250aFxyXG4gICAgICAgICAgICB0aGlzLmVuZHRpbWUgPWVuZHRpbWVBcnJheVswXVt2WzBdXSsnLycrIHJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMubXVsdGlJbmRleD0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVuZHRpbWVDb2x1bW5DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgZW5kdGltZUFycmF5OiB0aGlzLmVuZHRpbWVBcnJheSxcclxuICAgICAgICAgICAgZW5kdGltZUluZGV4OiB0aGlzLmVuZHRpbWVJbmRleFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGRhdGEuZW5kdGltZUluZGV4W2UuZGV0YWlsLmNvbHVtbl0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgIGlmKGUuZGV0YWlsLmNvbHVtbj09MCl7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuZW5kdGltZUluZGV4WzBdPT0wKXtcclxuICAgICAgICAgICAgICBkYXRhLmVuZHRpbWVBcnJheVsxXSA9IFsn6Iez5LuKJ107XHJcbiAgICAgICAgICAgICAgZGF0YS5lbmR0aW1lSW5kZXhbMV0gPSAwXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGRhdGEuZW5kdGltZUluZGV4WzBdPT0zMil7XHJcbiAgICAgICAgICAgICAgbGV0IGFycj0gZGF0YS5lbmR0aW1lQXJyYXlbMF1cclxuICAgICAgICAgICAgICBkYXRhLmVuZHRpbWVBcnJheVsxXSA9IFthcnJbYXJyLmxlbmd0aC0xXV1cclxuICAgICAgICAgICAgICBkYXRhLmVuZHRpbWVJbmRleFsxXSA9IDBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgZGF0YS5lbmR0aW1lQXJyYXlbMV0gPSBtb250aEFyclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdGFydHRpbWVDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICBjb25zdCB7c3RhcnR0aW1lQXJyYXl9ID0gdGhpc1xyXG4gICAgICAgICAgdGhpcy5zdGFydGluaXQgPSB0cnVlXHJcbiAgICAgICAgICBsZXQgdiA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICBpZih2WzBdPT0zMSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnR0aW1lID0gc3RhcnR0aW1lQXJyYXlbMF1bdlswXV1cclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgbW9udGggPSBwYXJzZUludCh2WzFdKSsxXHJcbiAgICAgICAgICAgIGxldCByID0gbW9udGg8MTA/JzAnK21vbnRoOm1vbnRoXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnR0aW1lID1zdGFydHRpbWVBcnJheVswXVt2WzBdXSsnLycrIHJcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMubXVsdGlJbmRleD0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXJ0dGltZUNvbHVtbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICBzdGFydHRpbWVBcnJheTogdGhpcy5zdGFydHRpbWVBcnJheSxcclxuICAgICAgICAgICAgc3RhcnR0aW1lSW5kZXg6IHRoaXMuc3RhcnR0aW1lSW5kZXhcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBkYXRhLnN0YXJ0dGltZUluZGV4W2UuZGV0YWlsLmNvbHVtbl0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgaWYoZGF0YS5zdGFydHRpbWVJbmRleFswXT09MzEpe1xyXG4gICAgICAgICAgICAgIGxldCBhcnI9IGRhdGEuc3RhcnR0aW1lQXJyYXlbMF1cclxuICAgICAgICAgICAgICBkYXRhLnN0YXJ0dGltZUFycmF5WzFdID0gW2FyclthcnIubGVuZ3RoLTFdXVxyXG4gICAgICAgICAgICAgIGRhdGEuc3RhcnR0aW1lSW5kZXhbMV0gPSAwXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGRhdGEuc3RhcnR0aW1lQXJyYXlbMV0gPSBtb250aEFyclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVsKCl7XHJcbiAgICAgICAgICB0aGlzLmRlbEV4cGVyaWVuY2UoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuXHJcblxyXG5cclxuICAgICAgICAgIGlmKCF0aGF0LmNvcnBuYW1lKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCflhazlj7jlkI3np7DkuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighdGhhdC5wb3N0Y29kZSl7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcign6IGM5L2N5ZCN56ew5LiN5Li656m6Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoIXRoYXQuc3RhcnR0aW1lKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nlvIDlp4vml7bpl7QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighdGhhdC5lbmR0aW1lKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nnu5PmnZ/ml7bpl7QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighdGhhdC53b3JrcmVtYXJrKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCflt6XkvZzlhoXlrrnkuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgbGV0IHN0YXJ0VGltZT10aGF0LnN0YXJ0dGltZVxyXG4gICAgICAgICAgbGV0IGVuZFRpbWU9dGhhdC5lbmR0aW1lXHJcblxyXG4gICAgICAgICAgaWYoc3RhcnRUaW1lLmluZGV4T2YoJy8nKSE9LTEpIHN0YXJ0VGltZSA9IHN0YXJ0VGltZS5yZXBsYWNlKC9cXC8vZyxcIi1cIilcclxuXHJcbiAgICAgICAgICBpZihtb21lbnQobW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NJykpLmRpZmYobW9tZW50KHN0YXJ0VGltZSksICdtb250aHMnKTwwKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfotbflp4vml7bpl7TkuI3og73lpKfkuo7lvZPliY3ml7bpl7QnKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZih0aGF0LmVuZHRpbWUuaW5kZXhPZign5Lul5YmNJykhPS0xJiZ0aGF0LnN0YXJ0dGltZS5pbmRleE9mKCfku6XliY0nKT09LTEpe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+i1t+Wni+aXtumXtOS4jeiDveWkp+S6jue7k+adn+aXtumXtCcpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKHRoYXQuc3RhcnR0aW1lLmluZGV4T2YoJ+S7peWJjScpPT0tMSYmKHRoYXQuZW5kdGltZSE9J+iHs+S7iicmJnRoYXQuZW5kdGltZS5pbmRleE9mKCfku6XliY0nKT09LTEpKXtcclxuXHJcbiAgICAgICAgICAgIGlmKGVuZFRpbWUuaW5kZXhPZignLycpIT0tMSkgZW5kVGltZSA9IGVuZFRpbWUucmVwbGFjZSgvXFwvL2csXCItXCIpXHJcbiAgICAgICAgICAgIGlmKHN0YXJ0VGltZS5pbmRleE9mKCcvJykhPS0xKSBzdGFydFRpbWUgPSBzdGFydFRpbWUucmVwbGFjZSgvXFwvL2csXCItXCIpXHJcbiAgICAgICAgICAgIGxldCBkaWZmID0gbW9tZW50KGVuZFRpbWUpLmRpZmYobW9tZW50KHN0YXJ0VGltZSksICdtb250aHMnKVxyXG4gICAgICAgICAgICBpZihkaWZmPDApe1xyXG4gICAgICAgICAgICAgIHRpcC5lcnJvcign6LW35aeL5pe26Ze05LiN6IO95aSn5LqO57uT5p2f5pe26Ze0JylcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLmNoYW5nZURhdGEoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5wdXRDaGFuZ2UoZSl7XHJcbiAgICAgICAgICBjb25zdCBuYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICAgICAgdGhpc1tuYW1lXSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGVDaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGNvbnN0IG5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICAgICB0aGlzW25hbWVdID0gZS5kZXRhaWwudmFsdWUucmVwbGFjZSgvLS9nLFwiL1wiKTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5bel5L2c57uP5Y6GXHJcbiAgICBhc3luYyBnZXREYXRhKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgIH0pXHJcbiAgICAgIGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDA1XCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bWVpZFwiOiB0aGF0LnJlc3VtZWlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgdmFyIGpvYkV4cGVyID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdEFyciA9IGpvYkV4cGVyLmZpbmQoaXRlbSA9PiBpdGVtLndvcmtpZCA9PSB0aGF0LndvcmtpZClcclxuICAgICAgICAgICAgdGhhdC5jb3JwbmFtZSA9IHJlc3VsdEFyci5jb3JwbmFtZTtcclxuICAgICAgICAgICAgdGhhdC5wb3N0Y29kZSA9IHJlc3VsdEFyci5wb3N0Y29kZTtcclxuICAgICAgICAgICAgdGhhdC5sZW5ndGggPSBqb2JFeHBlci5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoYXQuc3RhcnR0aW1lID0gcmVzdWx0QXJyLnN0YXJ0dGltZTtcclxuICAgICAgICAgICAgdGhhdC5lbmR0aW1lID0gcmVzdWx0QXJyLmVuZHRpbWU7XHJcbiAgICAgICAgICAgIHRoYXQud29ya3JlbWFyayA9IHJlc3VsdEFyci53b3JrcmVtYXJrO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihyZXMucmV0dXJuTXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yig6Zmk57uP5Y6GXHJcbiAgICBkZWxFeHBlcmllbmNlKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICBhcGkuZGVsRXhwZXJpZW5jZSh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAyOFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICB0b2tlbjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgICB0b2tlbktleTogdGhhdC50b2tlbktleSxcclxuICAgICAgICAgICAgICByZXN1bWVpZDp0aGF0LnJlc3VtZWlkLFxyXG4gICAgICAgICAgICAgIHdvcmtpZDp0aGF0LndvcmtpZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgIGlmIChyZXMuZGF0YSAmJiByZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICB0aXAuc3VjY2Vzcygn5Yig6Zmk5oiQ5YqfJyk7XHJcbiAgICAgICAgICBsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgICAgICAgIGxldCBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgcHJldlBhZ2UudXBkYXRlKDIpXHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGlwLmVycm9yKHJlcy5yZXR1cm5Nc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyPT57XHJcblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/kv67mlLnooajljZXmlbDmja5cclxuICAgIGNoYW5nZURhdGEoKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgIC8vIHN0ci5cclxuICAgICAgbGV0IG9iaiA9IHtcclxuICAgICAgICB0b2tlbjp0aGF0LnRva2VuLFxyXG4gICAgICAgIHRva2VuS2V5OnRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgcmVzdW1laWQ6dGhhdC5yZXN1bWVpZCxcclxuICAgICAgICBjb3JwbmFtZTp0aGF0LmNvcnBuYW1lLFxyXG4gICAgICAgIHBvc3Rjb2RlOnRoYXQucG9zdGNvZGUsXHJcbiAgICAgICAgc3RhcnR0aW1lOnRoYXQuc3RhcnR0aW1lLFxyXG4gICAgICAgIGVuZHRpbWU6dGhhdC5lbmR0aW1lLFxyXG4gICAgICAgIHdvcmtyZW1hcms6dGhhdC53b3JrcmVtYXJrLFxyXG4gICAgICAgIHdvcmtpZDp0aGF0LndvcmtpZCxcclxuICAgICAgfVxyXG5cclxuICAgICAgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAxNVwiLFxyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRhdGE6IG9ialxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICBpZihyZXMuZGF0YSAmJiByZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgcHJldlBhZ2UudXBkYXRlKDIpXHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==