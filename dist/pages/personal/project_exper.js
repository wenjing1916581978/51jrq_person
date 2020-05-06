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
      navigationBarBackgroundColor: "#fafafa",
      usingComponents: {
        "i-modal": "../../iview/modal/index"
      }
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
      starttimeIndex: [0, 0],
      visible: false
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RfZXhwZXIuanMiXSwibmFtZXMiOlsibW9udGhBcnIiLCJCYXNlSW5mbyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwidXNpbmdDb21wb25lbnRzIiwiZGF0YSIsInByb2plY3RuYW1lIiwiY29tcGFueW5hbWUiLCJzdGFydHRpbWUiLCJlbmR0aW1lIiwicHJvamVjdHJlbWFyayIsInByb2plY3RpZCIsInRva2VuIiwidG9rZW5LZXkiLCJyZXN1bWVpZCIsImxlbmd0aCIsImVuZHRpbWVBcnJheSIsImVuZHRpbWVJbmRleCIsInN0YXJ0dGltZUFycmF5Iiwic3RhcnR0aW1lSW5kZXgiLCJ2aXNpYmxlIiwibWV0aG9kcyIsImVuZHRpbWVDaGFuZ2UiLCJlIiwidiIsImRldGFpbCIsInZhbHVlIiwibW9udGgiLCJwYXJzZUludCIsInIiLCJtdWx0aUluZGV4IiwiJGFwcGx5IiwiZW5kdGltZUNvbHVtbkNoYW5nZSIsImNvbHVtbiIsImFyciIsInN0YXJ0dGltZUNoYW5nZSIsInN0YXJ0dGltZUNvbHVtbkNoYW5nZSIsImhhbmRsZU9rIiwiZGVsRXhwZXJpZW5jZSIsInRvZ2dsZU0iLCJjb25zb2xlIiwibG9nIiwiZm9ybVN1Ym1pdCIsInRoYXQiLCJlcnJvciIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJpbmRleE9mIiwicmVwbGFjZSIsImZvcm1hdCIsImRpZmYiLCJjaGFuZ2VEYXRhIiwiaW5wdXRDaGFuZ2UiLCJmb3JtIiwibmFtZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiZGF0ZUNoYW5nZSIsIm9wdGlvbnMiLCJsb2dpbiIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXREYXRhIiwib25lIiwibm93IiwiRGF0ZSIsImN1cnJlbnRZIiwiZ2V0RnVsbFllYXIiLCJjdXJyZW50TSIsImdldE1vbnRoIiwiaSIsInB1c2giLCJhIiwibmV3QSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJnZXRSZXN1bWVJbmZvIiwicXVlcnkiLCJoZWFkIiwidGhlbiIsInJlcyIsInJldHVybkNvZGUiLCJoaWRlTG9hZGluZyIsImpvYkV4cGVyIiwiSlNPTiIsInBhcnNlIiwicmVzdWx0QXJyIiwiZmluZCIsIml0ZW0iLCJyZXR1cm5Nc2ciLCJjYXRjaCIsInN1Y2Nlc3MiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwidXBkYXRlIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJvYmoiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBREEsSUFBSUEsV0FBVSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLEVBQW5CLEVBQXNCLEVBQXRCLEVBQXlCLEVBQXpCLENBQWQ7O0lBR3FCQyxROzs7Ozs7Ozs7Ozs7OzswTEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsb0NBQThCLFNBRnZCO0FBR1BDLHVCQUFpQjtBQUNmLG1CQUFXO0FBREk7QUFIVixLLFFBUVRDLEksR0FBTztBQUNMQyxtQkFBWSxFQURQO0FBRUxDLG1CQUFZLEVBRlA7QUFHTEMsaUJBQVUsRUFITDtBQUlMQyxlQUFRLEVBSkg7QUFLTEMscUJBQWMsRUFMVDtBQU1MQyxpQkFBVSxFQU5MO0FBT0xDLGFBQU8sRUFQRjtBQVFMQyxnQkFBVSxFQVJMO0FBU0xDLGdCQUFTLEVBVEo7QUFVTEMsY0FBTyxDQVZGO0FBV0xDLG9CQUFjLENBQUMsQ0FBQyxJQUFELENBQUQsRUFBUyxDQUFDLElBQUQsQ0FBVCxDQVhUO0FBWUxDLG9CQUFjLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FaVDtBQWFMQyxzQkFBZ0IsQ0FBQyxDQUFDLElBQUQsQ0FBRCxFQUFTLEVBQVQsQ0FiWDtBQWNMQyxzQkFB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NkIsS0FBSzdCO0FBVFAsT0FBVDtBQVdBLG9CQUFJOEQsYUFBSixDQUFrQjtBQUNkQyxlQUFPO0FBQ0xDLGdCQUFNO0FBQ0oseUJBQWEsT0FEVDtBQUVKLG9CQUFRO0FBRkosV0FERDtBQUtMekUsZ0JBQU02RjtBQUxEO0FBRE8sT0FBbEIsRUFRR25CLElBUkgsQ0FRUSxlQUFLO0FBQ1huQixXQUFHc0IsV0FBSDtBQUNBLFlBQUdGLElBQUkzRSxJQUFKLElBQVkyRSxJQUFJM0UsSUFBSixDQUFTNEUsVUFBVCxJQUF1QixTQUF0QyxFQUFpRDtBQUM3QyxjQUFJVyxRQUFRQyxpQkFBWjtBQUNBLGNBQUlDLFdBQVdGLE1BQU1BLE1BQU03RSxNQUFOLEdBQWUsQ0FBckIsQ0FBZjtBQUNBK0UsbUJBQVNDLE1BQVQsQ0FBZ0IsQ0FBaEI7QUFDQW5DLGFBQUdvQyxZQUFILENBQWdCO0FBQ2ZDLG1CQUFPO0FBRFEsV0FBaEI7QUFHSCxTQVBELE1BT0s7QUFDRHpELGtCQUFRQyxHQUFSLENBQVlwQyxJQUFaO0FBQ0g7QUFFRixPQXJCRDtBQXNCRDs7OztFQXRUbUMsZUFBSzhGLEk7O2tCQUF0Qm5HLFEiLCJmaWxlIjoicHJvamVjdF9leHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuICBpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcbiAgbGV0IG1vbnRoQXJyID1bMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTJdXHJcbiAgaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VJbmZvIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuXHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpobnnm67nu4/pqownLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNmYWZhZmFcIixcclxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XHJcbiAgICAgICAgXCJpLW1vZGFsXCI6IFwiLi4vLi4vaXZpZXcvbW9kYWwvaW5kZXhcIlxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgcHJvamVjdG5hbWU6JycsXHJcbiAgICAgIGNvbXBhbnluYW1lOicnLFxyXG4gICAgICBzdGFydHRpbWU6JycsXHJcbiAgICAgIGVuZHRpbWU6JycsXHJcbiAgICAgIHByb2plY3RyZW1hcms6JycsXHJcbiAgICAgIHByb2plY3RpZDonJyxcclxuICAgICAgdG9rZW46ICcnLFxyXG4gICAgICB0b2tlbktleTogJycsXHJcbiAgICAgIHJlc3VtZWlkOicnLFxyXG4gICAgICBsZW5ndGg6MCxcclxuICAgICAgZW5kdGltZUFycmF5OiBbWyfoh7Pku4onXSwgWyfoh7Pku4onXV0sXHJcbiAgICAgIGVuZHRpbWVJbmRleDogWzAsIDBdLFxyXG4gICAgICBzdGFydHRpbWVBcnJheTogW1sn6Iez5LuKJ10sIFtdXSxcclxuICAgICAgc3RhcnR0aW1lSW5kZXg6IFswLCAwXSxcclxuICAgICAgdmlzaWJsZTpmYWxzZSxcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgbGV0IGxvZ2luID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2xvZ2luJylcclxuICAgICAgdGhhdC5yZXN1bWVpZCA9IG9wdGlvbnMucmVzdW1laWQgfHwgJzIxMDgwMjExJztcclxuICAgICAgdGhhdC5wcm9qZWN0aWQgPSBvcHRpb25zLnByb2plY3RpZCB8fCAnJztcclxuICAgICAgdGhhdC50b2tlbiA9IGxvZ2luLnRva2VuXHJcbiAgICAgIHRoYXQudG9rZW5LZXkgPSBsb2dpbi50b2tlbktleVxyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICBpZih0aGF0LnByb2plY3RpZCkgdGhhdC5nZXREYXRhKClcclxuXHJcblxyXG4gICAgICBsZXQgb25lID0gW11cclxuICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKClcclxuICAgICAgbGV0IGN1cnJlbnRZID0gbm93LmdldEZ1bGxZZWFyKClcclxuICAgICAgbGV0IGN1cnJlbnRNID0gbm93LmdldE1vbnRoKCkrMVxyXG5cclxuICAgICAgZm9yKHZhciBpPTA7aTwzMTtpKyspe1xyXG4gICAgICAgIGxldCB2ID0gY3VycmVudFktaVxyXG4gICAgICAgIG9uZS5wdXNoKHYrJycpXHJcbiAgICAgICAgaWYoaT09MzApIG9uZS5wdXNoKHYrJ+S7peWJjScpXHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICB0aGlzLnN0YXJ0dGltZUFycmF5WzBdID0gb25lXHJcbiAgICAgIHRoaXMuc3RhcnR0aW1lQXJyYXlbMV0gPSBtb250aEFyclxyXG4gICAgICBsZXQgYT1bJ+iHs+S7iiddXHJcbiAgICAgIHZhciBuZXdBID0gWy4uLmEsLi4ub25lXVxyXG4gICAgICB0aGlzLmVuZHRpbWVBcnJheVswXSA9IG5ld0FcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBlbmR0aW1lQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGNvbnN0IHtlbmR0aW1lQXJyYXl9ID0gdGhpc1xyXG4gICAgICAgIGxldCB2ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICBpZih2WzBdPT0wIHx8IHZbMF09PTMyKXtcclxuICAgICAgICAgIHRoaXMuZW5kdGltZSA9IGVuZHRpbWVBcnJheVswXVt2WzBdXVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgbGV0IG1vbnRoID0gcGFyc2VJbnQodlsxXSkrMVxyXG4gICAgICAgICAgbGV0IHIgPSBtb250aDwxMD8nMCcrbW9udGg6bW9udGhcclxuICAgICAgICAgIHRoaXMuZW5kdGltZSA9ZW5kdGltZUFycmF5WzBdW3ZbMF1dKycvJysgclxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11bHRpSW5kZXg9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9LFxyXG4gICAgICBlbmR0aW1lQ29sdW1uQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgZW5kdGltZUFycmF5OiB0aGlzLmVuZHRpbWVBcnJheSxcclxuICAgICAgICAgIGVuZHRpbWVJbmRleDogdGhpcy5lbmR0aW1lSW5kZXhcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRhdGEuZW5kdGltZUluZGV4W2UuZGV0YWlsLmNvbHVtbl0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICBpZihlLmRldGFpbC5jb2x1bW49PTApe1xyXG4gICAgICAgICAgaWYoZGF0YS5lbmR0aW1lSW5kZXhbMF09PTApe1xyXG4gICAgICAgICAgICBkYXRhLmVuZHRpbWVBcnJheVsxXSA9IFsn6Iez5LuKJ107XHJcbiAgICAgICAgICAgIGRhdGEuZW5kdGltZUluZGV4WzFdID0gMFxyXG4gICAgICAgICAgfWVsc2UgaWYoZGF0YS5lbmR0aW1lSW5kZXhbMF09PTMyKXtcclxuICAgICAgICAgICAgbGV0IGFycj0gZGF0YS5lbmR0aW1lQXJyYXlbMF1cclxuICAgICAgICAgICAgZGF0YS5lbmR0aW1lQXJyYXlbMV0gPSBbYXJyW2Fyci5sZW5ndGgtMV1dXHJcbiAgICAgICAgICAgIGRhdGEuZW5kdGltZUluZGV4WzFdID0gMFxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGRhdGEuZW5kdGltZUFycmF5WzFdID0gbW9udGhBcnJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9LFxyXG4gICAgICBzdGFydHRpbWVDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgY29uc3Qge3N0YXJ0dGltZUFycmF5fSA9IHRoaXNcclxuICAgICAgICBsZXQgdiA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgaWYodlswXT09MzEpe1xyXG4gICAgICAgICAgdGhpcy5zdGFydHRpbWUgPSBzdGFydHRpbWVBcnJheVswXVt2WzBdXVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgbGV0IG1vbnRoID0gcGFyc2VJbnQodlsxXSkrMVxyXG4gICAgICAgICAgbGV0IHIgPSBtb250aDwxMD8nMCcrbW9udGg6bW9udGhcclxuICAgICAgICAgIHRoaXMuc3RhcnR0aW1lID1zdGFydHRpbWVBcnJheVswXVt2WzBdXSsnLycrIHJcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tdWx0aUluZGV4PSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfSxcclxuICAgICAgc3RhcnR0aW1lQ29sdW1uQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgc3RhcnR0aW1lQXJyYXk6IHRoaXMuc3RhcnR0aW1lQXJyYXksXHJcbiAgICAgICAgICBzdGFydHRpbWVJbmRleDogdGhpcy5zdGFydHRpbWVJbmRleFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGF0YS5zdGFydHRpbWVJbmRleFtlLmRldGFpbC5jb2x1bW5dID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICBpZihkYXRhLnN0YXJ0dGltZUluZGV4WzBdPT0zMSl7XHJcbiAgICAgICAgICAgIGxldCBhcnI9IGRhdGEuc3RhcnR0aW1lQXJyYXlbMF1cclxuICAgICAgICAgICAgZGF0YS5zdGFydHRpbWVBcnJheVsxXSA9IFthcnJbYXJyLmxlbmd0aC0xXV1cclxuICAgICAgICAgICAgZGF0YS5zdGFydHRpbWVJbmRleFsxXSA9IDBcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0dGltZUFycmF5WzFdID0gbW9udGhBcnJcclxuICAgICAgICAgIH1cclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBoYW5kbGVPaygpe1xyXG4gICAgICAgIHRoaXMuZGVsRXhwZXJpZW5jZSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIHRvZ2dsZU0oKXtcclxuICAgICAgICBjb25zb2xlLmxvZygn5YiH5o2i54q25oCBJylcclxuICAgICAgICB0aGlzLnZpc2libGUgPSAhdGhpcy52aXNpYmxlXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9LFxyXG4gICAgICAvLyDmj5DkuqTooajljZUtLeWfuuacrOS/oeaBr+e8lui+keaWsOWinlxyXG4gICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgICBpZighdGhhdC5wcm9qZWN0bmFtZSl7XHJcbiAgICAgICAgICB0aXAuZXJyb3IoJ+mhueebruWQjeensOS4jeS4uuepuicpO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGF0LmNvbXBhbnluYW1lKXtcclxuICAgICAgICAgIHRpcC5lcnJvcign5YWs5Y+45ZCN56ew5LiN5Li656m6Jyk7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoYXQuc3RhcnR0aW1lKXtcclxuICAgICAgICAgIHRpcC5lcnJvcign6K+36YCJ5oup5byA5aeL5pe26Ze0Jyk7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoYXQuZW5kdGltZSl7XHJcbiAgICAgICAgICB0aXAuZXJyb3IoJ+ivt+mAieaLqee7k+adn+aXtumXtCcpO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGF0LnByb2plY3RyZW1hcmspe1xyXG4gICAgICAgICAgdGlwLmVycm9yKCfpobnnm67mj4/ov7DkuI3kuLrnqbonKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGxldCBzdGFydFRpbWU9dGhhdC5zdGFydHRpbWVcclxuICAgICAgICBsZXQgZW5kVGltZT10aGF0LmVuZHRpbWVcclxuXHJcbiAgICAgICAgaWYoc3RhcnRUaW1lLmluZGV4T2YoJy8nKSE9LTEpIHN0YXJ0VGltZSA9IHN0YXJ0VGltZS5yZXBsYWNlKC9cXC8vZyxcIi1cIilcclxuXHJcbiAgICAgICAgaWYobW9tZW50KG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTScpKS5kaWZmKG1vbWVudChzdGFydFRpbWUpLCAnbW9udGhzJyk8MCl7XHJcbiAgICAgICAgICB0aXAuZXJyb3IoJ+i1t+Wni+aXtumXtOS4jeiDveWkp+S6juW9k+WJjeaXtumXtCcpXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoYXQuZW5kdGltZS5pbmRleE9mKCfku6XliY0nKSE9LTEmJnRoYXQuc3RhcnR0aW1lLmluZGV4T2YoJ+S7peWJjScpPT0tMSl7XHJcbiAgICAgICAgICB0aXAuZXJyb3IoJ+i1t+Wni+aXtumXtOS4jeiDveWkp+S6jue7k+adn+aXtumXtCcpXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoYXQuc3RhcnR0aW1lLmluZGV4T2YoJ+S7peWJjScpPT0tMSYmKHRoYXQuZW5kdGltZSE9J+iHs+S7iicmJnRoYXQuZW5kdGltZS5pbmRleE9mKCfku6XliY0nKT09LTEpKXtcclxuXHJcbiAgICAgICAgICBpZihlbmRUaW1lLmluZGV4T2YoJy8nKSE9LTEpIGVuZFRpbWUgPSBlbmRUaW1lLnJlcGxhY2UoL1xcLy9nLFwiLVwiKVxyXG4gICAgICAgICAgaWYoc3RhcnRUaW1lLmluZGV4T2YoJy8nKSE9LTEpIHN0YXJ0VGltZSA9IHN0YXJ0VGltZS5yZXBsYWNlKC9cXC8vZyxcIi1cIilcclxuICAgICAgICAgIGxldCBkaWZmID0gbW9tZW50KGVuZFRpbWUpLmRpZmYobW9tZW50KHN0YXJ0VGltZSksICdtb250aHMnKVxyXG4gICAgICAgICAgaWYoZGlmZjwwKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfotbflp4vml7bpl7TkuI3og73lpKfkuo7nu5PmnZ/ml7bpl7QnKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZURhdGEoKVxyXG4gICAgICB9LFxyXG4gICAgICBpbnB1dENoYW5nZShlKXtcclxuICAgICAgICBjb25zdCB7IGZvcm0gfT10aGlzXHJcbiAgICAgICAgY29uc3QgbmFtZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICB0aGlzW25hbWVdID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfSxcclxuICAgICAgZGF0ZUNoYW5nZTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICAgdGhpc1tuYW1lXSA9IGUuZGV0YWlsLnZhbHVlLnJlcGxhY2UoLy0vZyxcIi9cIik7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIC8v6I635Y+W566A5Y6G5Z+65pys5L+h5oGvXHJcbiAgICBnZXREYXRhKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgIH0pXHJcbiAgICAgIGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMDhcIixcclxuICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LnRva2VuLFxyXG4gICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhhdC50b2tlbktleSxcclxuICAgICAgICAgICAgICBcInJlc3VtZWlkXCI6IHRoYXQucmVzdW1laWRcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLCfojrflj5bln7rmnKzkv6Hmga8nKVxyXG4gICAgICAgIGlmIChyZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICB2YXIgam9iRXhwZXIgPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+mhueebrue7j+WOhicsam9iRXhwZXIpXHJcblxyXG4gICAgICAgICAgbGV0IHJlc3VsdEFyciA9IGpvYkV4cGVyLmZpbmQoaXRlbSA9PiBpdGVtLnByb2plY3RpZCA9PSB0aGF0LnByb2plY3RpZClcclxuICAgICAgICAgIHRoYXQucHJvamVjdG5hbWUgPSByZXN1bHRBcnIucHJvamVjdG5hbWU7XHJcbiAgICAgICAgICB0aGF0Lmxlbmd0aCA9IGpvYkV4cGVyLmxlbmd0aFxyXG4gICAgICAgICAgdGhhdC5jb21wYW55bmFtZSA9IHJlc3VsdEFyci5jb21wYW55bmFtZTtcclxuICAgICAgICAgIHRoYXQuc3RhcnR0aW1lID0gcmVzdWx0QXJyLnN0YXJ0dGltZTtcclxuICAgICAgICAgIHRoYXQuZW5kdGltZSA9IHJlc3VsdEFyci5lbmR0aW1lO1xyXG4gICAgICAgICAgdGhhdC5wcm9qZWN0cmVtYXJrID0gcmVzdWx0QXJyLnByb2plY3RyZW1hcms7XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aXAuZXJyb3IocmVzLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycj0+e1xyXG5cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8vIOWIoOmZpOe7j+WOhlxyXG4gICAgZGVsRXhwZXJpZW5jZSgpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgYXBpLmRlbEV4cGVyaWVuY2Uoe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMzBcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgdG9rZW46IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICAgICAgdG9rZW5LZXk6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgcmVzdW1laWQ6dGhhdC5yZXN1bWVpZCxcclxuICAgICAgICAgICAgICBwcm9qZWN0aWQ6dGhhdC5wcm9qZWN0aWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgdGlwLnN1Y2Nlc3MoJ+WIoOmZpOaIkOWKnycpO1xyXG4gICAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgIHByZXZQYWdlLnVwZGF0ZSg0KVxyXG4gICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IocmVzLnJldHVybk1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnI9PntcclxuXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/kv67mlLnooajljZXmlbDmja5cclxuICAgIGNoYW5nZURhdGEoKSB7XHJcbiAgICAgIGNvbnN0ICB0aGF0ICA9IHRoaXNcclxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICB9KVxyXG4gICAgICBsZXQgb2JqPSB7XHJcbiAgICAgICAgcHJvamVjdG5hbWU6dGhhdC5wcm9qZWN0bmFtZSAsXHJcbiAgICAgICAgY29tcGFueW5hbWU6dGhhdC5jb21wYW55bmFtZSAsXHJcbiAgICAgICAgc3RhcnR0aW1lOnRoYXQuc3RhcnR0aW1lICxcclxuICAgICAgICBlbmR0aW1lOnRoYXQuZW5kdGltZSAsXHJcbiAgICAgICAgcHJvamVjdHJlbWFyazp0aGF0LnByb2plY3RyZW1hcmsgLFxyXG4gICAgICAgIHByb2plY3RpZDp0aGF0LnByb2plY3RpZCAsXHJcbiAgICAgICAgdG9rZW46IHRoYXQudG9rZW4sXHJcbiAgICAgICAgdG9rZW5LZXk6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgcmVzdW1laWQ6dGhhdC5yZXN1bWVpZFxyXG4gICAgICB9XHJcbiAgICAgIGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDE4XCIsXHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IG9ialxyXG4gICAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICBpZihyZXMuZGF0YSAmJiByZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgcHJldlBhZ2UudXBkYXRlKDQpXHJcbiAgICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgIH0pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==