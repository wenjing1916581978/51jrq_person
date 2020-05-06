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
      navigationBarBackgroundColor: "#fafafa",
      usingComponents: {
        "i-modal": "../../iview/modal/index"
      }
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
      endtinit: false,
      visible: false
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

      handleOk: function handleOk() {
        this.delExperience();
      },
      toggleM: function toggleM() {
        console.log('切换状态');
        this.visible = !this.visible;
        this.$apply();
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmtfZXhwZXIuanMiXSwibmFtZXMiOlsibW9udGhBcnIiLCJXb3JrRXhwZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsInVzaW5nQ29tcG9uZW50cyIsImRhdGEiLCJjb3JwbmFtZSIsInBvc3Rjb2RlIiwic3RhcnR0aW1lIiwiZW5kdGltZSIsIndvcmtyZW1hcmsiLCJ3b3JraWQiLCJyZXN1bWVpZCIsInRva2VuIiwidG9rZW5LZXkiLCJsZW5ndGgiLCJlbmR0aW1lQXJyYXkiLCJlbmR0aW1lSW5kZXgiLCJzdGFydHRpbWVBcnJheSIsInN0YXJ0dGltZUluZGV4Iiwic3RhcnRpbml0IiwiZW5kdGluaXQiLCJ2aXNpYmxlIiwibWV0aG9kcyIsImVuZHRpbWVDaGFuZ2UiLCJlIiwiZW5kaW5pdCIsInYiLCJkZXRhaWwiLCJ2YWx1ZSIsIm1vbnRoIiwicGFyc2VJbnQiLCJyIiwibXVsdGlJbmRleCIsIiRhcHBseSIsImVuZHRpbWVDb2x1bW5DaGFuZ2UiLCJjb2x1bW4iLCJhcnIiLCJzdGFydHRpbWVDaGFuZ2UiLCJzdGFydHRpbWVDb2x1bW5DaGFuZ2UiLCJoYW5kbGVPayIsImRlbEV4cGVyaWVuY2UiLCJ0b2dnbGVNIiwiY29uc29sZSIsImxvZyIsImZvcm1TdWJtaXQiLCJ0aGF0IiwiZXJyb3IiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJmb3JtYXQiLCJkaWZmIiwiY2hhbmdlRGF0YSIsImlucHV0Q2hhbmdlIiwibmFtZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiZGF0ZUNoYW5nZSIsIm9wdGlvbnMiLCJsb2dpbiIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXREYXRhIiwib25lIiwibm93IiwiRGF0ZSIsImN1cnJlbnRZIiwiZ2V0RnVsbFllYXIiLCJjdXJyZW50TSIsImdldE1vbnRoIiwiaSIsInB1c2giLCJhIiwibmV3QSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJnZXRSZXN1bWVJbmZvIiwicXVlcnkiLCJoZWFkIiwidGhlbiIsInJlcyIsInJldHVybkNvZGUiLCJoaWRlTG9hZGluZyIsImpvYkV4cGVyIiwiSlNPTiIsInBhcnNlIiwicmVzdWx0QXJyIiwiZmluZCIsIml0ZW0iLCJyZXR1cm5Nc2ciLCJzdWNjZXNzIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsInVwZGF0ZSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiY2F0Y2giLCJvYmoiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxXQUFVLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsRUFBbkIsRUFBc0IsRUFBdEIsRUFBeUIsRUFBekIsQ0FBZDs7SUFFcUJDLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyxvQ0FBOEIsU0FGdkI7QUFHUEMsdUJBQWlCO0FBQ2YsbUJBQVc7QUFESTtBQUhWLEssUUFPVEMsSSxHQUFPO0FBQ0xDLGdCQUFTLEVBREo7QUFFTEMsZ0JBQVMsRUFGSjtBQUdMQyxpQkFBVSxFQUhMO0FBSUxDLGVBQVEsRUFKSDtBQUtMQyxrQkFBVyxFQUxOO0FBTUxDLGNBQU8sRUFORjtBQU9MQyxnQkFBVSxFQVBMO0FBUUxDLGFBQU8sRUFSRjtBQVNMQyxnQkFBVSxFQVRMO0FBVUxDLGNBQU8sQ0FWRjtBQVdMQyxvQkFBYyxDQUFDLENBQUMsSUFBRCxDQUFELEVBQVMsQ0FBQyxJQUFELENBQVQsQ0FYVDtBQVlMQyxvQkFBYyxDQUFDLENBQUQsRUFBSSxDQUFKLENBWlQ7QUFhTEMsc0JBQWdCLENBQUMsQ0FBQyxJQUFELENBQUQsRUFBUyxFQUFULENB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UTtBQUZOLFdBREQ7QUFLTDNFLGdCQUFNK0Y7QUFMRDtBQURTLE9BQWxCLEVBUUduQixJQVJILENBUVEsZUFBSztBQUNYLFlBQUdDLElBQUk3RSxJQUFKLElBQVk2RSxJQUFJN0UsSUFBSixDQUFTOEUsVUFBVCxJQUF1QixTQUF0QyxFQUFpRDtBQUM3QyxjQUFJVSxRQUFRQyxpQkFBWjtBQUNBLGNBQUlDLFdBQVdGLE1BQU1BLE1BQU05RSxNQUFOLEdBQWUsQ0FBckIsQ0FBZjtBQUNBZ0YsbUJBQVNDLE1BQVQsQ0FBZ0IsQ0FBaEI7QUFDQWxDLGFBQUdtQyxZQUFILENBQWdCO0FBQ2ZDLG1CQUFPO0FBRFEsV0FBaEI7QUFHSCxTQVBELE1BT0s7QUFDRHZELGtCQUFRQyxHQUFSLENBQVl2QyxJQUFaO0FBQ0g7QUFDRHlELFdBQUdzQixXQUFIO0FBQ0QsT0FwQkQ7QUFxQkQ7Ozs7RUFqVG9DLGVBQUtpQixJOztrQkFBdkJyRyxTIiwiZmlsZSI6IndvcmtfZXhwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbiAgaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG4gIGxldCBtb250aEFyciA9WzEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyXVxyXG4gIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmtFeHBlciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICflt6XkvZznu4/ljoYnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNmYWZhZmFcIixcclxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICAgXCJpLW1vZGFsXCI6IFwiLi4vLi4vaXZpZXcvbW9kYWwvaW5kZXhcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBjb3JwbmFtZTonJyxcclxuICAgICAgcG9zdGNvZGU6JycsXHJcbiAgICAgIHN0YXJ0dGltZTonJyxcclxuICAgICAgZW5kdGltZTonJyxcclxuICAgICAgd29ya3JlbWFyazonJyxcclxuICAgICAgd29ya2lkOicnLFxyXG4gICAgICByZXN1bWVpZDogJycsXHJcbiAgICAgIHRva2VuOiAnJyxcclxuICAgICAgdG9rZW5LZXk6ICcnLFxyXG4gICAgICBsZW5ndGg6MCxcclxuICAgICAgZW5kdGltZUFycmF5OiBbWyfoh7Pku4onXSwgWyfoh7Pku4onXV0sXHJcbiAgICAgIGVuZHRpbWVJbmRleDogWzAsIDBdLFxyXG4gICAgICBzdGFydHRpbWVBcnJheTogW1sn6Iez5LuKJ10sIFtdXSxcclxuICAgICAgc3RhcnR0aW1lSW5kZXg6IFswLCAwXSxcclxuICAgICAgc3RhcnRpbml0OmZhbHNlLFxyXG4gICAgICBlbmR0aW5pdDpmYWxzZSxcclxuICAgICAgdmlzaWJsZTpmYWxzZSxcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG5cclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGxldCBsb2dpbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dpbicpXHJcbiAgICAgIHRoYXQucmVzdW1laWQgPSBvcHRpb25zLnJlc3VtZWlkIHx8ICcyMTA4MDIxMSc7XHJcbiAgICAgIHRoYXQud29ya2lkID0gb3B0aW9ucy53b3JraWQ7XHJcbiAgICAgIHRoYXQudG9rZW4gPSBsb2dpbi50b2tlblxyXG4gICAgICB0aGF0LnRva2VuS2V5ID0gbG9naW4udG9rZW5LZXlcclxuICAgICAgdGhhdC4kYXBwbHkoKTtcclxuXHJcbiAgICAgIGlmKHRoYXQud29ya2lkKSB0aGF0LmdldERhdGEoKVxyXG5cclxuICAgICAgbGV0IG9uZSA9IFtdXHJcbiAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpXHJcbiAgICAgIGxldCBjdXJyZW50WSA9IG5vdy5nZXRGdWxsWWVhcigpXHJcbiAgICAgIGxldCBjdXJyZW50TSA9IG5vdy5nZXRNb250aCgpKzFcclxuXHJcbiAgICAgIGZvcih2YXIgaT0wO2k8MzE7aSsrKXtcclxuICAgICAgICBsZXQgdiA9IGN1cnJlbnRZLWlcclxuICAgICAgICBvbmUucHVzaCh2KycnKVxyXG4gICAgICAgIGlmKGk9PTMwKSBvbmUucHVzaCh2Kyfku6XliY0nKVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgdGhpcy5zdGFydHRpbWVBcnJheVswXSA9IG9uZVxyXG4gICAgICB0aGlzLnN0YXJ0dGltZUFycmF5WzFdID0gbW9udGhBcnJcclxuICAgICAgbGV0IGE9Wyfoh7Pku4onXVxyXG4gICAgICB2YXIgbmV3QSA9IFsuLi5hLC4uLm9uZV1cclxuICAgICAgdGhpcy5lbmR0aW1lQXJyYXlbMF0gPSBuZXdBXHJcbiAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGVuZHRpbWVDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICBjb25zdCB7ZW5kdGltZUFycmF5fSA9IHRoaXNcclxuICAgICAgICAgIHRoaXMuZW5kaW5pdCA9IHRydWVcclxuICAgICAgICAgIGxldCB2ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgIGlmKHZbMF09PTAgfHwgdlswXT09MzIpe1xyXG4gICAgICAgICAgICB0aGlzLmVuZHRpbWUgPSBlbmR0aW1lQXJyYXlbMF1bdlswXV1cclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgbW9udGggPSBwYXJzZUludCh2WzFdKSsxXHJcbiAgICAgICAgICAgIGxldCByID0gbW9udGg8MTA/JzAnK21vbnRoOm1vbnRoXHJcbiAgICAgICAgICAgIHRoaXMuZW5kdGltZSA9ZW5kdGltZUFycmF5WzBdW3ZbMF1dKycvJysgclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5tdWx0aUluZGV4PSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW5kdGltZUNvbHVtbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICBlbmR0aW1lQXJyYXk6IHRoaXMuZW5kdGltZUFycmF5LFxyXG4gICAgICAgICAgICBlbmR0aW1lSW5kZXg6IHRoaXMuZW5kdGltZUluZGV4XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgZGF0YS5lbmR0aW1lSW5kZXhbZS5kZXRhaWwuY29sdW1uXSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgaWYoZS5kZXRhaWwuY29sdW1uPT0wKXtcclxuICAgICAgICAgICAgaWYoZGF0YS5lbmR0aW1lSW5kZXhbMF09PTApe1xyXG4gICAgICAgICAgICAgIGRhdGEuZW5kdGltZUFycmF5WzFdID0gWyfoh7Pku4onXTtcclxuICAgICAgICAgICAgICBkYXRhLmVuZHRpbWVJbmRleFsxXSA9IDBcclxuICAgICAgICAgICAgfWVsc2UgaWYoZGF0YS5lbmR0aW1lSW5kZXhbMF09PTMyKXtcclxuICAgICAgICAgICAgICBsZXQgYXJyPSBkYXRhLmVuZHRpbWVBcnJheVswXVxyXG4gICAgICAgICAgICAgIGRhdGEuZW5kdGltZUFycmF5WzFdID0gW2FyclthcnIubGVuZ3RoLTFdXVxyXG4gICAgICAgICAgICAgIGRhdGEuZW5kdGltZUluZGV4WzFdID0gMFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBkYXRhLmVuZHRpbWVBcnJheVsxXSA9IG1vbnRoQXJyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0YXJ0dGltZUNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgIGNvbnN0IHtzdGFydHRpbWVBcnJheX0gPSB0aGlzXHJcbiAgICAgICAgICB0aGlzLnN0YXJ0aW5pdCA9IHRydWVcclxuICAgICAgICAgIGxldCB2ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgIGlmKHZbMF09PTMxKXtcclxuICAgICAgICAgICAgdGhpcy5zdGFydHRpbWUgPSBzdGFydHRpbWVBcnJheVswXVt2WzBdXVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBtb250aCA9IHBhcnNlSW50KHZbMV0pKzFcclxuICAgICAgICAgICAgbGV0IHIgPSBtb250aDwxMD8nMCcrbW9udGg6bW9udGhcclxuICAgICAgICAgICAgdGhpcy5zdGFydHRpbWUgPXN0YXJ0dGltZUFycmF5WzBdW3ZbMF1dKycvJysgclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5tdWx0aUluZGV4PSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RhcnR0aW1lQ29sdW1uQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0dGltZUFycmF5OiB0aGlzLnN0YXJ0dGltZUFycmF5LFxyXG4gICAgICAgICAgICBzdGFydHRpbWVJbmRleDogdGhpcy5zdGFydHRpbWVJbmRleFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGRhdGEuc3RhcnR0aW1lSW5kZXhbZS5kZXRhaWwuY29sdW1uXSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICBpZihkYXRhLnN0YXJ0dGltZUluZGV4WzBdPT0zMSl7XHJcbiAgICAgICAgICAgICAgbGV0IGFycj0gZGF0YS5zdGFydHRpbWVBcnJheVswXVxyXG4gICAgICAgICAgICAgIGRhdGEuc3RhcnR0aW1lQXJyYXlbMV0gPSBbYXJyW2Fyci5sZW5ndGgtMV1dXHJcbiAgICAgICAgICAgICAgZGF0YS5zdGFydHRpbWVJbmRleFsxXSA9IDBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgZGF0YS5zdGFydHRpbWVBcnJheVsxXSA9IG1vbnRoQXJyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBoYW5kbGVPaygpe1xyXG4gICAgICAgICAgdGhpcy5kZWxFeHBlcmllbmNlKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvZ2dsZU0oKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCfliIfmjaLnirbmgIEnKVxyXG4gICAgICAgICAgdGhpcy52aXNpYmxlID0gIXRoaXMudmlzaWJsZVxyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuXHJcblxyXG5cclxuICAgICAgICAgIGlmKCF0aGF0LmNvcnBuYW1lKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCflhazlj7jlkI3np7DkuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighdGhhdC5wb3N0Y29kZSl7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcign6IGM5L2N5ZCN56ew5LiN5Li656m6Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoIXRoYXQuc3RhcnR0aW1lKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nlvIDlp4vml7bpl7QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighdGhhdC5lbmR0aW1lKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nnu5PmnZ/ml7bpl7QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighdGhhdC53b3JrcmVtYXJrKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCflt6XkvZzlhoXlrrnkuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgbGV0IHN0YXJ0VGltZT10aGF0LnN0YXJ0dGltZVxyXG4gICAgICAgICAgbGV0IGVuZFRpbWU9dGhhdC5lbmR0aW1lXHJcblxyXG4gICAgICAgICAgaWYoc3RhcnRUaW1lLmluZGV4T2YoJy8nKSE9LTEpIHN0YXJ0VGltZSA9IHN0YXJ0VGltZS5yZXBsYWNlKC9cXC8vZyxcIi1cIilcclxuXHJcbiAgICAgICAgICBpZihtb21lbnQobW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NJykpLmRpZmYobW9tZW50KHN0YXJ0VGltZSksICdtb250aHMnKTwwKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfotbflp4vml7bpl7TkuI3og73lpKfkuo7lvZPliY3ml7bpl7QnKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZih0aGF0LmVuZHRpbWUuaW5kZXhPZign5Lul5YmNJykhPS0xJiZ0aGF0LnN0YXJ0dGltZS5pbmRleE9mKCfku6XliY0nKT09LTEpe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+i1t+Wni+aXtumXtOS4jeiDveWkp+S6jue7k+adn+aXtumXtCcpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKHRoYXQuc3RhcnR0aW1lLmluZGV4T2YoJ+S7peWJjScpPT0tMSYmKHRoYXQuZW5kdGltZSE9J+iHs+S7iicmJnRoYXQuZW5kdGltZS5pbmRleE9mKCfku6XliY0nKT09LTEpKXtcclxuXHJcbiAgICAgICAgICAgIGlmKGVuZFRpbWUuaW5kZXhPZignLycpIT0tMSkgZW5kVGltZSA9IGVuZFRpbWUucmVwbGFjZSgvXFwvL2csXCItXCIpXHJcbiAgICAgICAgICAgIGlmKHN0YXJ0VGltZS5pbmRleE9mKCcvJykhPS0xKSBzdGFydFRpbWUgPSBzdGFydFRpbWUucmVwbGFjZSgvXFwvL2csXCItXCIpXHJcbiAgICAgICAgICAgIGxldCBkaWZmID0gbW9tZW50KGVuZFRpbWUpLmRpZmYobW9tZW50KHN0YXJ0VGltZSksICdtb250aHMnKVxyXG4gICAgICAgICAgICBpZihkaWZmPDApe1xyXG4gICAgICAgICAgICAgIHRpcC5lcnJvcign6LW35aeL5pe26Ze05LiN6IO95aSn5LqO57uT5p2f5pe26Ze0JylcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGlzLmNoYW5nZURhdGEoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5wdXRDaGFuZ2UoZSl7XHJcbiAgICAgICAgICBjb25zdCBuYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICAgICAgdGhpc1tuYW1lXSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGVDaGFuZ2U6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGNvbnN0IG5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICAgICB0aGlzW25hbWVdID0gZS5kZXRhaWwudmFsdWUucmVwbGFjZSgvLS9nLFwiL1wiKTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5bel5L2c57uP5Y6GXHJcbiAgICBhc3luYyBnZXREYXRhKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgIH0pXHJcbiAgICAgIGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDA1XCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bWVpZFwiOiB0aGF0LnJlc3VtZWlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgdmFyIGpvYkV4cGVyID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdEFyciA9IGpvYkV4cGVyLmZpbmQoaXRlbSA9PiBpdGVtLndvcmtpZCA9PSB0aGF0LndvcmtpZClcclxuICAgICAgICAgICAgdGhhdC5jb3JwbmFtZSA9IHJlc3VsdEFyci5jb3JwbmFtZTtcclxuICAgICAgICAgICAgdGhhdC5wb3N0Y29kZSA9IHJlc3VsdEFyci5wb3N0Y29kZTtcclxuICAgICAgICAgICAgdGhhdC5sZW5ndGggPSBqb2JFeHBlci5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoYXQuc3RhcnR0aW1lID0gcmVzdWx0QXJyLnN0YXJ0dGltZTtcclxuICAgICAgICAgICAgdGhhdC5lbmR0aW1lID0gcmVzdWx0QXJyLmVuZHRpbWU7XHJcbiAgICAgICAgICAgIHRoYXQud29ya3JlbWFyayA9IHJlc3VsdEFyci53b3JrcmVtYXJrO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihyZXMucmV0dXJuTXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yig6Zmk57uP5Y6GXHJcbiAgICBkZWxFeHBlcmllbmNlKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICBhcGkuZGVsRXhwZXJpZW5jZSh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAyOFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICB0b2tlbjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgICB0b2tlbktleTogdGhhdC50b2tlbktleSxcclxuICAgICAgICAgICAgICByZXN1bWVpZDp0aGF0LnJlc3VtZWlkLFxyXG4gICAgICAgICAgICAgIHdvcmtpZDp0aGF0LndvcmtpZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgIGlmIChyZXMuZGF0YSAmJiByZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICB0aXAuc3VjY2Vzcygn5Yig6Zmk5oiQ5YqfJyk7XHJcbiAgICAgICAgICBsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgICAgICAgIGxldCBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgcHJldlBhZ2UudXBkYXRlKDIpXHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGlwLmVycm9yKHJlcy5yZXR1cm5Nc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyPT57XHJcblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/kv67mlLnooajljZXmlbDmja5cclxuICAgIGNoYW5nZURhdGEoKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgIC8vIHN0ci5cclxuICAgICAgbGV0IG9iaiA9IHtcclxuICAgICAgICB0b2tlbjp0aGF0LnRva2VuLFxyXG4gICAgICAgIHRva2VuS2V5OnRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgcmVzdW1laWQ6dGhhdC5yZXN1bWVpZCxcclxuICAgICAgICBjb3JwbmFtZTp0aGF0LmNvcnBuYW1lLFxyXG4gICAgICAgIHBvc3Rjb2RlOnRoYXQucG9zdGNvZGUsXHJcbiAgICAgICAgc3RhcnR0aW1lOnRoYXQuc3RhcnR0aW1lLFxyXG4gICAgICAgIGVuZHRpbWU6dGhhdC5lbmR0aW1lLFxyXG4gICAgICAgIHdvcmtyZW1hcms6dGhhdC53b3JrcmVtYXJrLFxyXG4gICAgICAgIHdvcmtpZDp0aGF0LndvcmtpZCxcclxuICAgICAgfVxyXG5cclxuICAgICAgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAxNVwiLFxyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRhdGE6IG9ialxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICBpZihyZXMuZGF0YSAmJiByZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgcHJldlBhZ2UudXBkYXRlKDIpXHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==