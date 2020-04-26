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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
      navigationBarTitleText: '项目经验',
      navigationBarBackgroundColor: "#fafafa"
    }, _this.data = {
      projectname: '',
      companyname: '',
      starttime: '',
      endtime: '',
      projectremark: '',
      projectid: '',
      token: '',
      tokenKey: '',
      resumeid: '',
      length: 0,
      endtimeArray: [['至今'], ['至今']],
      endtimeIndex: [0, 0],
      starttimeArray: [['至今'], []],
      starttimeIndex: [0, 0]
    }, _this.methods = {
      endtimeChange: function endtimeChange(e) {
        var endtimeArray = this.endtimeArray;

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

      // 提交表单--基本信息编辑新增
      formSubmit: function formSubmit(e) {
        var that = this;
        if (!that.projectname) {
          _tip2.default.error('项目名称不为空');
          return false;
        }
        if (!that.companyname) {
          _tip2.default.error('公司名称不为空');
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
        if (!that.projectremark) {
          _tip2.default.error('项目描述不为空');
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
        var form = this.form;

        var name = e.currentTarget.dataset.name;
        this[name] = e.detail.value;
        this.$apply();
      },

      dateChange: function dateChange(e) {
        var name = e.currentTarget.dataset.name;
        this[name] = e.detail.value.replace(/-/g, "/");
        this.$apply();
      }

      // //获取简历基本信息
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BaseInfo, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var that = this;
      var login = wx.getStorageSync('login');
      that.resumeid = options.resumeid || '21080211';
      that.projectid = options.projectid || '';
      that.token = login.token;
      that.tokenKey = login.tokenKey;
      that.$apply();
      if (that.projectid) that.getData();

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
    value: function getData() {
      var that = this;
      wx.showLoading({
        title: '加载中'
      });
      _api2.default.getResumeInfo({
        query: {
          head: {
            "transcode": "M0008",
            "type": "h"
          },
          data: {
            "token": that.token,
            "tokenKey": that.tokenKey,
            "resumeid": that.resumeid
          }
        }
      }).then(function (res) {
        console.log(res, '获取基本信息');
        if (res.data.returnCode == "AAAAAAA") {
          wx.hideLoading();
          var jobExper = JSON.parse(res.data.data);
          console.log('项目经历', jobExper);

          var resultArr = jobExper.find(function (item) {
            return item.projectid == that.projectid;
          });
          that.projectname = resultArr.projectname;
          that.length = jobExper.length;
          that.companyname = resultArr.companyname;
          that.starttime = resultArr.starttime;
          that.endtime = resultArr.endtime;
          that.projectremark = resultArr.projectremark;
          that.$apply();
        } else {
          _tip2.default.error(res.data.returnMsg);
        }
      }).catch(function (err) {});
    }
    // 删除经历

  }, {
    key: 'delExperience',
    value: function delExperience() {
      var that = this;
      _api2.default.delExperience({
        query: {
          head: {
            "transcode": "M0030",
            "type": "h"
          },
          data: {
            token: that.token,
            tokenKey: that.tokenKey,
            resumeid: that.resumeid,
            projectid: that.projectid
          }
        }
      }).then(function (res) {
        if (res.data && res.data.returnCode == "AAAAAAA") {
          _tip2.default.success('删除成功');
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.update(4);
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
      wx.showLoading({
        title: '加载中'
      });
      var obj = {
        projectname: that.projectname,
        companyname: that.companyname,
        starttime: that.starttime,
        endtime: that.endtime,
        projectremark: that.projectremark,
        projectid: that.projectid,
        token: that.token,
        tokenKey: that.tokenKey,
        resumeid: that.resumeid
      };
      _api2.default.getResumeInfo({
        query: {
          head: {
            "transcode": "M0018",
            "type": "h"
          },
          data: obj
        }
      }).then(function (res) {
        wx.hideLoading();
        if (res.data && res.data.returnCode == "AAAAAAA") {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.update(4);
          wx.navigateBack({
            delta: 1
          });
        } else {
          console.log(data);
        }
      });
    }
  }]);

  return BaseInfo;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseInfo , 'pages/personal/project_exper'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RfZXhwZXIuanMiXSwibmFtZXMiOlsibW9udGhBcnIiLCJCYXNlSW5mbyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiZGF0YSIsInByb2plY3RuYW1lIiwiY29tcGFueW5hbWUiLCJzdGFydHRpbWUiLCJlbmR0aW1lIiwicHJvamVjdHJlbWFyayIsInByb2plY3RpZCIsInRva2VuIiwidG9rZW5LZXkiLCJyZXN1bWVpZCIsImxlbmd0aCIsImVuZHRpbWVBcnJheSIsImVuZHRpbWVJbmRleCIsInN0YXJ0dGltZUFycmF5Iiwic3RhcnR0aW1lSW5kZXgiLCJtZXRob2RzIiwiZW5kdGltZUNoYW5nZSIsImUiLCJ2IiwiZGV0YWlsIiwidmFsdWUiLCJtb250aCIsInBhcnNlSW50IiwiciIsIm11bHRpSW5kZXgiLCIkYXBwbHkiLCJlbmR0aW1lQ29sdW1uQ2hhbmdlIiwiY29sdW1uIiwiYXJyIiwic3RhcnR0aW1lQ2hhbmdlIiwic3RhcnR0aW1lQ29sdW1uQ2hhbmdlIiwiZGVsIiwiZGVsRXhwZXJpZW5jZSIsImZvcm1TdWJtaXQiLCJ0aGF0IiwiZXJyb3IiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJmb3JtYXQiLCJkaWZmIiwiY2hhbmdlRGF0YSIsImlucHV0Q2hhbmdlIiwiZm9ybSIsIm5hbWUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImRhdGVDaGFuZ2UiLCJvcHRpb25zIiwibG9naW4iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0RGF0YSIsIm9uZSIsIm5vdyIsIkRhdGUiLCJjdXJyZW50WSIsImdldEZ1bGxZZWFyIiwiY3VycmVudE0iLCJnZXRNb250aCIsImkiLCJwdXNoIiwiYSIsIm5ld0EiLCJzaG93TG9hZGluZyIsInRpdGxlIiwiZ2V0UmVzdW1lSW5mbyIsInF1ZXJ5IiwiaGVhZCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwicmVzIiwicmV0dXJuQ29kZSIsImhpZGVMb2FkaW5nIiwiam9iRXhwZXIiLCJKU09OIiwicGFyc2UiLCJyZXN1bHRBcnIiLCJmaW5kIiwiaXRlbSIsInJldHVybk1zZyIsImNhdGNoIiwic3VjY2VzcyIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwicHJldlBhZ2UiLCJ1cGRhdGUiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsIm9iaiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxXQUFVLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsRUFBbkIsRUFBc0IsRUFBdEIsRUFBeUIsRUFBekIsQ0FBZDs7SUFHcUJDLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUVuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyxvQ0FBOEI7QUFGdkIsSyxRQUtUQyxJLEdBQU87QUFDTEMsbUJBQVksRUFEUDtBQUVMQyxtQkFBWSxFQUZQO0FBR0xDLGlCQUFVLEVBSEw7QUFJTEMsZUFBUSxFQUpIO0FBS0xDLHFCQUFjLEVBTFQ7QUFNTEMsaUJBQVUsRUFOTDtBQU9MQyxhQUFPLEVBUEY7QUFRTEMsZ0JBQVUsRUFSTDtBQVNMQyxnQkFBUyxFQVRKO0FBVUxDLGNBQU8sQ0FWRjtBQVdMQyxvQkFBYyxDQUFDLENBQUMsSUFBRCxDQUFELEVBQVMsQ0FBQyxJQUFELENBQVQsQ0FYVDtBQVlMQyxvQkFBYyxDQUFDLENBQUQsRUFBSSxDQUFKLENBWlQ7QUFhTEMsc0JBQWdCLENBQUMsQ0FBQyxJQUFELENBQUQsRUFBUyxFQUFULENBYlg7QUFjTEMsc0JBQWdCLENBQUMsQ0FBRCxFQUFJLENBQUo7QUFkWCxLLFFBaURQQyxPLEdBQVU7QUFDUkMscUJBQWUsdUJBQVVDLENBQVYsRUFBYTtBQUFB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SUFBSixDQUFTMEUsVUFBVCxJQUF1QixTQUF0QyxFQUFpRDtBQUM3QyxjQUFJVyxRQUFRQyxpQkFBWjtBQUNBLGNBQUlDLFdBQVdGLE1BQU1BLE1BQU0zRSxNQUFOLEdBQWUsQ0FBckIsQ0FBZjtBQUNBNkUsbUJBQVNDLE1BQVQsQ0FBZ0IsQ0FBaEI7QUFDQXJDLGFBQUdzQyxZQUFILENBQWdCO0FBQ2ZDLG1CQUFPO0FBRFEsV0FBaEI7QUFHSCxTQVBELE1BT0s7QUFDRG5CLGtCQUFRQyxHQUFSLENBQVl4RSxJQUFaO0FBQ0g7QUFFRixPQXJCRDtBQXNCRDs7OztFQTdTbUMsZUFBSzRGLEk7O2tCQUF0QmhHLFEiLCJmaWxlIjoicHJvamVjdF9leHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuICBpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcbiAgbGV0IG1vbnRoQXJyID1bMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTJdXHJcbiAgaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VJbmZvIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuXHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpobnnm67nu4/pqownLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNmYWZhZmFcIixcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBwcm9qZWN0bmFtZTonJyxcclxuICAgICAgY29tcGFueW5hbWU6JycsXHJcbiAgICAgIHN0YXJ0dGltZTonJyxcclxuICAgICAgZW5kdGltZTonJyxcclxuICAgICAgcHJvamVjdHJlbWFyazonJyxcclxuICAgICAgcHJvamVjdGlkOicnLFxyXG4gICAgICB0b2tlbjogJycsXHJcbiAgICAgIHRva2VuS2V5OiAnJyxcclxuICAgICAgcmVzdW1laWQ6JycsXHJcbiAgICAgIGxlbmd0aDowLFxyXG4gICAgICBlbmR0aW1lQXJyYXk6IFtbJ+iHs+S7iiddLCBbJ+iHs+S7iiddXSxcclxuICAgICAgZW5kdGltZUluZGV4OiBbMCwgMF0sXHJcbiAgICAgIHN0YXJ0dGltZUFycmF5OiBbWyfoh7Pku4onXSwgW11dLFxyXG4gICAgICBzdGFydHRpbWVJbmRleDogWzAsIDBdLFxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBsZXQgbG9naW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW4nKVxyXG4gICAgICB0aGF0LnJlc3VtZWlkID0gb3B0aW9ucy5yZXN1bWVpZCB8fCAnMjEwODAyMTEnO1xyXG4gICAgICB0aGF0LnByb2plY3RpZCA9IG9wdGlvbnMucHJvamVjdGlkIHx8ICcnO1xyXG4gICAgICB0aGF0LnRva2VuID0gbG9naW4udG9rZW5cclxuICAgICAgdGhhdC50b2tlbktleSA9IGxvZ2luLnRva2VuS2V5XHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgIGlmKHRoYXQucHJvamVjdGlkKSB0aGF0LmdldERhdGEoKVxyXG5cclxuXHJcbiAgICAgIGxldCBvbmUgPSBbXVxyXG4gICAgICBsZXQgbm93ID0gbmV3IERhdGUoKVxyXG4gICAgICBsZXQgY3VycmVudFkgPSBub3cuZ2V0RnVsbFllYXIoKVxyXG4gICAgICBsZXQgY3VycmVudE0gPSBub3cuZ2V0TW9udGgoKSsxXHJcblxyXG4gICAgICBmb3IodmFyIGk9MDtpPDMxO2krKyl7XHJcbiAgICAgICAgbGV0IHYgPSBjdXJyZW50WS1pXHJcbiAgICAgICAgb25lLnB1c2godisnJylcclxuICAgICAgICBpZihpPT0zMCkgb25lLnB1c2godisn5Lul5YmNJylcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHRoaXMuc3RhcnR0aW1lQXJyYXlbMF0gPSBvbmVcclxuICAgICAgdGhpcy5zdGFydHRpbWVBcnJheVsxXSA9IG1vbnRoQXJyXHJcbiAgICAgIGxldCBhPVsn6Iez5LuKJ11cclxuICAgICAgdmFyIG5ld0EgPSBbLi4uYSwuLi5vbmVdXHJcbiAgICAgIHRoaXMuZW5kdGltZUFycmF5WzBdID0gbmV3QVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGVuZHRpbWVDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgY29uc3Qge2VuZHRpbWVBcnJheX0gPSB0aGlzXHJcbiAgICAgICAgbGV0IHYgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIGlmKHZbMF09PTAgfHwgdlswXT09MzIpe1xyXG4gICAgICAgICAgdGhpcy5lbmR0aW1lID0gZW5kdGltZUFycmF5WzBdW3ZbMF1dXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBsZXQgbW9udGggPSBwYXJzZUludCh2WzFdKSsxXHJcbiAgICAgICAgICBsZXQgciA9IG1vbnRoPDEwPycwJyttb250aDptb250aFxyXG4gICAgICAgICAgdGhpcy5lbmR0aW1lID1lbmR0aW1lQXJyYXlbMF1bdlswXV0rJy8nKyByXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXVsdGlJbmRleD0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZHRpbWVDb2x1bW5DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICBlbmR0aW1lQXJyYXk6IHRoaXMuZW5kdGltZUFycmF5LFxyXG4gICAgICAgICAgZW5kdGltZUluZGV4OiB0aGlzLmVuZHRpbWVJbmRleFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGF0YS5lbmR0aW1lSW5kZXhbZS5kZXRhaWwuY29sdW1uXSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgIGlmKGUuZGV0YWlsLmNvbHVtbj09MCl7XHJcbiAgICAgICAgICBpZihkYXRhLmVuZHRpbWVJbmRleFswXT09MCl7XHJcbiAgICAgICAgICAgIGRhdGEuZW5kdGltZUFycmF5WzFdID0gWyfoh7Pku4onXTtcclxuICAgICAgICAgICAgZGF0YS5lbmR0aW1lSW5kZXhbMV0gPSAwXHJcbiAgICAgICAgICB9ZWxzZSBpZihkYXRhLmVuZHRpbWVJbmRleFswXT09MzIpe1xyXG4gICAgICAgICAgICBsZXQgYXJyPSBkYXRhLmVuZHRpbWVBcnJheVswXVxyXG4gICAgICAgICAgICBkYXRhLmVuZHRpbWVBcnJheVsxXSA9IFthcnJbYXJyLmxlbmd0aC0xXV1cclxuICAgICAgICAgICAgZGF0YS5lbmR0aW1lSW5kZXhbMV0gPSAwXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZGF0YS5lbmR0aW1lQXJyYXlbMV0gPSBtb250aEFyclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0YXJ0dGltZUNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBjb25zdCB7c3RhcnR0aW1lQXJyYXl9ID0gdGhpc1xyXG4gICAgICAgIGxldCB2ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICBpZih2WzBdPT0zMSl7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0dGltZSA9IHN0YXJ0dGltZUFycmF5WzBdW3ZbMF1dXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBsZXQgbW9udGggPSBwYXJzZUludCh2WzFdKSsxXHJcbiAgICAgICAgICBsZXQgciA9IG1vbnRoPDEwPycwJyttb250aDptb250aFxyXG4gICAgICAgICAgdGhpcy5zdGFydHRpbWUgPXN0YXJ0dGltZUFycmF5WzBdW3ZbMF1dKycvJysgclxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11bHRpSW5kZXg9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9LFxyXG4gICAgICBzdGFydHRpbWVDb2x1bW5DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICBzdGFydHRpbWVBcnJheTogdGhpcy5zdGFydHRpbWVBcnJheSxcclxuICAgICAgICAgIHN0YXJ0dGltZUluZGV4OiB0aGlzLnN0YXJ0dGltZUluZGV4XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkYXRhLnN0YXJ0dGltZUluZGV4W2UuZGV0YWlsLmNvbHVtbl0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgIGlmKGRhdGEuc3RhcnR0aW1lSW5kZXhbMF09PTMxKXtcclxuICAgICAgICAgICAgbGV0IGFycj0gZGF0YS5zdGFydHRpbWVBcnJheVswXVxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0dGltZUFycmF5WzFdID0gW2FyclthcnIubGVuZ3RoLTFdXVxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0dGltZUluZGV4WzFdID0gMFxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGRhdGEuc3RhcnR0aW1lQXJyYXlbMV0gPSBtb250aEFyclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGRlbCgpe1xyXG4gICAgICAgIHRoaXMuZGVsRXhwZXJpZW5jZSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIOaPkOS6pOihqOWNlS0t5Z+65pys5L+h5oGv57yW6L6R5paw5aKeXHJcbiAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgIGlmKCF0aGF0LnByb2plY3RuYW1lKXtcclxuICAgICAgICAgIHRpcC5lcnJvcign6aG555uu5ZCN56ew5LiN5Li656m6Jyk7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoYXQuY29tcGFueW5hbWUpe1xyXG4gICAgICAgICAgdGlwLmVycm9yKCflhazlj7jlkI3np7DkuI3kuLrnqbonKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhhdC5zdGFydHRpbWUpe1xyXG4gICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nlvIDlp4vml7bpl7QnKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighdGhhdC5lbmR0aW1lKXtcclxuICAgICAgICAgIHRpcC5lcnJvcign6K+36YCJ5oup57uT5p2f5pe26Ze0Jyk7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoYXQucHJvamVjdHJlbWFyayl7XHJcbiAgICAgICAgICB0aXAuZXJyb3IoJ+mhueebruaPj+i/sOS4jeS4uuepuicpO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IHN0YXJ0VGltZT10aGF0LnN0YXJ0dGltZVxyXG4gICAgICAgIGxldCBlbmRUaW1lPXRoYXQuZW5kdGltZVxyXG5cclxuICAgICAgICBpZihzdGFydFRpbWUuaW5kZXhPZignLycpIT0tMSkgc3RhcnRUaW1lID0gc3RhcnRUaW1lLnJlcGxhY2UoL1xcLy9nLFwiLVwiKVxyXG5cclxuICAgICAgICBpZihtb21lbnQobW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NJykpLmRpZmYobW9tZW50KHN0YXJ0VGltZSksICdtb250aHMnKTwwKXtcclxuICAgICAgICAgIHRpcC5lcnJvcign6LW35aeL5pe26Ze05LiN6IO95aSn5LqO5b2T5YmN5pe26Ze0JylcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhhdC5lbmR0aW1lLmluZGV4T2YoJ+S7peWJjScpIT0tMSYmdGhhdC5zdGFydHRpbWUuaW5kZXhPZign5Lul5YmNJyk9PS0xKXtcclxuICAgICAgICAgIHRpcC5lcnJvcign6LW35aeL5pe26Ze05LiN6IO95aSn5LqO57uT5p2f5pe26Ze0JylcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhhdC5zdGFydHRpbWUuaW5kZXhPZign5Lul5YmNJyk9PS0xJiYodGhhdC5lbmR0aW1lIT0n6Iez5LuKJyYmdGhhdC5lbmR0aW1lLmluZGV4T2YoJ+S7peWJjScpPT0tMSkpe1xyXG5cclxuICAgICAgICAgIGlmKGVuZFRpbWUuaW5kZXhPZignLycpIT0tMSkgZW5kVGltZSA9IGVuZFRpbWUucmVwbGFjZSgvXFwvL2csXCItXCIpXHJcbiAgICAgICAgICBpZihzdGFydFRpbWUuaW5kZXhPZignLycpIT0tMSkgc3RhcnRUaW1lID0gc3RhcnRUaW1lLnJlcGxhY2UoL1xcLy9nLFwiLVwiKVxyXG4gICAgICAgICAgbGV0IGRpZmYgPSBtb21lbnQoZW5kVGltZSkuZGlmZihtb21lbnQoc3RhcnRUaW1lKSwgJ21vbnRocycpXHJcbiAgICAgICAgICBpZihkaWZmPDApe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+i1t+Wni+aXtumXtOS4jeiDveWkp+S6jue7k+adn+aXtumXtCcpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlRGF0YSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIGlucHV0Q2hhbmdlKGUpe1xyXG4gICAgICAgIGNvbnN0IHsgZm9ybSB9PXRoaXNcclxuICAgICAgICBjb25zdCBuYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICAgIHRoaXNbbmFtZV0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9LFxyXG4gICAgICBkYXRlQ2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICB0aGlzW25hbWVdID0gZS5kZXRhaWwudmFsdWUucmVwbGFjZSgvLS9nLFwiL1wiKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLy/ojrflj5bnroDljobln7rmnKzkv6Hmga9cclxuICAgIGdldERhdGEoKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgfSlcclxuICAgICAgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAwOFwiLFxyXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBcInRva2VuXCI6IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgIFwicmVzdW1laWRcIjogdGhhdC5yZXN1bWVpZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMsJ+iOt+WPluWfuuacrOS/oeaBrycpXHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgIHZhciBqb2JFeHBlciA9IEpTT04ucGFyc2UocmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygn6aG555uu57uP5Y6GJyxqb2JFeHBlcilcclxuXHJcbiAgICAgICAgICBsZXQgcmVzdWx0QXJyID0gam9iRXhwZXIuZmluZChpdGVtID0+IGl0ZW0ucHJvamVjdGlkID09IHRoYXQucHJvamVjdGlkKVxyXG4gICAgICAgICAgdGhhdC5wcm9qZWN0bmFtZSA9IHJlc3VsdEFyci5wcm9qZWN0bmFtZTtcclxuICAgICAgICAgIHRoYXQubGVuZ3RoID0gam9iRXhwZXIubGVuZ3RoXHJcbiAgICAgICAgICB0aGF0LmNvbXBhbnluYW1lID0gcmVzdWx0QXJyLmNvbXBhbnluYW1lO1xyXG4gICAgICAgICAgdGhhdC5zdGFydHRpbWUgPSByZXN1bHRBcnIuc3RhcnR0aW1lO1xyXG4gICAgICAgICAgdGhhdC5lbmR0aW1lID0gcmVzdWx0QXJyLmVuZHRpbWU7XHJcbiAgICAgICAgICB0aGF0LnByb2plY3RyZW1hcmsgPSByZXN1bHRBcnIucHJvamVjdHJlbWFyaztcclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRpcC5lcnJvcihyZXMuZGF0YS5yZXR1cm5Nc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkuY2F0Y2goZXJyPT57XHJcblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8g5Yig6Zmk57uP5Y6GXHJcbiAgICBkZWxFeHBlcmllbmNlKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICBhcGkuZGVsRXhwZXJpZW5jZSh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAzMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICB0b2tlbjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgICB0b2tlbktleTogdGhhdC50b2tlbktleSxcclxuICAgICAgICAgICAgICByZXN1bWVpZDp0aGF0LnJlc3VtZWlkLFxyXG4gICAgICAgICAgICAgIHByb2plY3RpZDp0aGF0LnByb2plY3RpZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgIGlmIChyZXMuZGF0YSAmJiByZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICB0aXAuc3VjY2Vzcygn5Yig6Zmk5oiQ5YqfJyk7XHJcbiAgICAgICAgICBsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgICAgICAgIGxldCBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgcHJldlBhZ2UudXBkYXRlKDQpXHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihyZXMucmV0dXJuTXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycj0+e1xyXG5cclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+S/ruaUueihqOWNleaVsOaNrlxyXG4gICAgY2hhbmdlRGF0YSgpIHtcclxuICAgICAgY29uc3QgIHRoYXQgID0gdGhpc1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgIH0pXHJcbiAgICAgIGxldCBvYmo9IHtcclxuICAgICAgICBwcm9qZWN0bmFtZTp0aGF0LnByb2plY3RuYW1lICxcclxuICAgICAgICBjb21wYW55bmFtZTp0aGF0LmNvbXBhbnluYW1lICxcclxuICAgICAgICBzdGFydHRpbWU6dGhhdC5zdGFydHRpbWUgLFxyXG4gICAgICAgIGVuZHRpbWU6dGhhdC5lbmR0aW1lICxcclxuICAgICAgICBwcm9qZWN0cmVtYXJrOnRoYXQucHJvamVjdHJlbWFyayAsXHJcbiAgICAgICAgcHJvamVjdGlkOnRoYXQucHJvamVjdGlkICxcclxuICAgICAgICB0b2tlbjogdGhhdC50b2tlbixcclxuICAgICAgICB0b2tlbktleTogdGhhdC50b2tlbktleSxcclxuICAgICAgICByZXN1bWVpZDp0aGF0LnJlc3VtZWlkXHJcbiAgICAgIH1cclxuICAgICAgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMThcIixcclxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YTogb2JqXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIGlmKHJlcy5kYXRhICYmIHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgICAgIGxldCBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgICBwcmV2UGFnZS51cGRhdGUoNClcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuIl19