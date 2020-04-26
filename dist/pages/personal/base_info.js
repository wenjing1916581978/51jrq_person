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
      navigationBarTitleText: '基本信息',
      navigationBarBackgroundColor: "#fafafa"
    }, _this.data = {
      type: 1,
      screen: [{
        list: [],
        index: []
      }, {
        list: [],
        index: []
      }, {
        list: [],
        index: []
      }, {
        list: [],
        index: []
      }, {
        list: [],
        index: []
      }],
      token: '',
      tokenKey: '',
      resumeid: '',
      form: {
        headimg: '',
        resumename: '',
        telephone: '',
        username: '',
        sex: '',
        marital: '',
        email: '',
        address: '',
        livecityid: '',
        borndate: '',
        educationbg: '',
        workyears: '',
        jobstatus: ''
      },
      start: '',
      end: '',
      base64: false
    }, _this.methods = {
      changePortrait: function changePortrait() {
        var that = this;
        that.choosePortrait();
      },

      // 提交表单--基本信息编辑新增
      formSubmit: function formSubmit(e) {
        var that = this;
        var form = this.form;

        if (!form.headimg) {
          _tip2.default.error('简历头像不为空');
          return false;
        }
        if (!form.resumename) {
          _tip2.default.error('简历名称不为空');
          return false;
        }
        if (!form.username) {
          _tip2.default.error('姓名不为空');
          return false;
        }
        if (!form.sex) {
          _tip2.default.error('请选择性别');
          return false;
        }
        if (!form.borndate) {
          _tip2.default.error('请选择出生年月');
          return false;
        }
        if (!form.workyears) {
          _tip2.default.error('请选择工作年限');
          return false;
        }
        if (!form.telephone) {
          _tip2.default.error('手机号码不为空');
          return false;
        }
        if (!form.jobstatus) {
          _tip2.default.error('请选择工作状态');
          return false;
        }
        if (!form.livecityid) {
          _tip2.default.error('所在城市不为空');
          return false;
        }
        that.changeData();
      },
      inputChange: function inputChange(e) {
        var form = this.form;

        var name = e.currentTarget.dataset.name;
        form[name] = e.detail.value;
        this.$apply();
      },
      pickerChange: function pickerChange(e) {
        var form = this.form;

        var name = e.currentTarget.dataset.name;
        var current = e.currentTarget.dataset.current;
        var index = e.detail.value;
        form[name] = this.screen[current].list[index];
        this.screen[current].index = e.detail.value;
        this.$apply();
      },
      dateChange: function dateChange(e) {
        this.form.borndate = e.detail.value;
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BaseInfo, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var date = new Date();
      var that = this;
      that.end = (0, _moment2.default)().subtract(18, "years").format("YYYY-MM-DD");
      that.start = (0, _moment2.default)().subtract(50, "years").format("YYYY-MM-DD");
      var login = wx.getStorageSync('login');
      that.resumeid = options.resumeid || '';
      that.type = options.type;
      that.token = login.token;
      that.tokenKey = login.tokenKey;
      that.$apply();

      if (that.resumeid) that.getData();
      var arr = ["DICT_BASE_SEX", "DICT_RESUME_WORKYEAR", "DICT_RESUME_WEDDING", "DICT_RESUME_JOBSTATU", "DICT_JOB_EDU"];

      for (var i = 0; i < arr.length; i++) {
        that.getDict(arr[i], i);
      }
    }
  }, {
    key: 'choosePortrait',
    value: function choosePortrait(event) {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function success(res) {
          if (res.tempFiles[0].size > 1000000) {
            _tip2.default.error("图片大小超出限制");
            return;
          }
          // let base64 = res.tempFilePaths[0]
          var base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64');
          // console.log(base64)
          that.form.headimg = base64;
          that.base64 = true;
          that.$apply(); // 返回选定照片的本地文件路径列表
          // that.uploadImgFile(that, base64)
        },
        fail: function fail() {
          console.log('\u83B7\u53D6\u56FE\u7247\u5931\u8D25');
        }
      });
    }

    //获取数据字典

  }, {
    key: 'getDict',
    value: function getDict(code, i) {
      var that = this;
      _api2.default.getDictData({
        query: {
          head: {
            "transcode": "DC001",
            "type": "h"
          },
          data: {
            "groupcode": code,
            "selAll": "false"
          }
        }
      }).then(function (res) {
        if (res.data.returnCode == "AAAAAAA") {
          var arr = [];
          res.data.data.forEach(function (item, index) {
            arr.push(item.label);
          });
          if (code == 'DICT_JOB_EDU' || code == 'DICT_RESUME_WORKYEAR') {
            arr.shift();
          }
          that.screen[i].list = arr;
          that.$apply();
        } else {
          _tip2.default.error(res.returnMsg);
        }
      }).catch(function (err) {});
    }

    //获取简历基本信息

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
            "transcode": "M0003",
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
          var baseInfo = JSON.parse(res.data.data);
          that.form = {
            headimg: baseInfo.headimg,
            username: baseInfo.username,
            resumename: baseInfo.newresumename,
            borndate: baseInfo.borndate,
            address: baseInfo.address,
            workyears: baseInfo.workyears,
            jobstatus: baseInfo.jobstatus,
            livecityid: baseInfo.livecityid,
            marital: baseInfo.marital,
            telephone: baseInfo.telephone,
            email: baseInfo.email,
            sex: baseInfo.sex,
            educationbg: baseInfo.educationbg
          };
          that.$apply();
        } else {
          _tip2.default.error(res.returnMsg);
        }
      });
    }
    //修改表单数据

  }, {
    key: 'changeData',
    value: function changeData() {
      wx.showLoading({
        title: '加载中'
      });
      var that = this;
      var form = this.form;

      var obj = Object.assign(form, {
        token: that.token,
        tokenKey: that.tokenKey,
        resumeid: that.resumeid
      });

      if (!that.resumeid) {
        delete obj.resumeid;
      }
      _api2.default.getResumeInfo({
        query: {
          head: {
            "transcode": "M0013",
            "type": "h"
          },
          data: obj
        }
      }).then(function (res) {
        console.log(res, '返回结果');
        wx.hideLoading();
        if (res.data && res.data.returnCode == "AAAAAAA") {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          if (res.data.resumeid) {
            wx.redirectTo({
              url: '/pages/personal/resume?resumeid=' + res.data.resumeid
            });
          } else {
            prevPage.update(0);
            wx.navigateBack({
              delta: 1
            });
          }
        } else {
          console.log(data);
        }
      }).catch(function (err) {});
    }
  }]);

  return BaseInfo;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseInfo , 'pages/personal/base_info'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2VfaW5mby5qcyJdLCJuYW1lcyI6WyJCYXNlSW5mbyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiZGF0YSIsInR5cGUiLCJzY3JlZW4iLCJsaXN0IiwiaW5kZXgiLCJ0b2tlbiIsInRva2VuS2V5IiwicmVzdW1laWQiLCJmb3JtIiwiaGVhZGltZyIsInJlc3VtZW5hbWUiLCJ0ZWxlcGhvbmUiLCJ1c2VybmFtZSIsInNleCIsIm1hcml0YWwiLCJlbWFpbCIsImFkZHJlc3MiLCJsaXZlY2l0eWlkIiwiYm9ybmRhdGUiLCJlZHVjYXRpb25iZyIsIndvcmt5ZWFycyIsImpvYnN0YXR1cyIsInN0YXJ0IiwiZW5kIiwiYmFzZTY0IiwibWV0aG9kcyIsImNoYW5nZVBvcnRyYWl0IiwidGhhdCIsImNob29zZVBvcnRyYWl0IiwiZm9ybVN1Ym1pdCIsImUiLCJlcnJvciIsImNoYW5nZURhdGEiLCJpbnB1dENoYW5nZSIsIm5hbWUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwicGlja2VyQ2hhbmdlIiwiY3VycmVudCIsImRhdGVDaGFuZ2UiLCJvcHRpb25zIiwiZGF0ZSIsIkRhdGUiLCJzdWJ0cmFjdCIsImZvcm1hdCIsImxvZ2luIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImdldERhdGEiLCJhcnIiLCJpIiwibGVuZ3RoIiwiZ2V0RGljdCIsImV2ZW50IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJ0ZW1wRmlsZXMiLCJzaXplIiwiZ2V0RmlsZVN5c3RlbU1hbmFnZXIiLCJyZWFkRmlsZVN5bmMiLCJ0ZW1wRmlsZVBhdGhzIiwiZmFpbCIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwiZ2V0RGljdERhdGEiLCJxdWVyeSIsImhlYWQiLCJ0aGVuIiwicmV0dXJuQ29kZSIsImZvckVhY2giLCJpdGVtIiwicHVzaCIsImxhYmVsIiwic2hpZnQiLCJyZXR1cm5Nc2ciLCJjYXRjaCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJnZXRSZXN1bWVJbmZvIiwiaGlkZUxvYWRpbmciLCJiYXNlSW5mbyIsIkpTT04iLCJwYXJzZSIsIm5ld3Jlc3VtZW5hbWUiLCJvYmoiLCJPYmplY3QiLCJhc3NpZ24iLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwicmVkaXJlY3RUbyIsInVybCIsInVwZGF0ZSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBRWpCQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLG9DQUE4QjtBQUZ2QixLLFFBS1ZDLEksR0FBTztBQUNOQyxZQUFLLENBREM7QUFFTkMsY0FBTyxDQUNMO0FBQ0VDLGNBQUssRUFEUDtBQUVFQyxlQUFNO0FBRlIsT0FESyxFQUtMO0FBQ0VELGNBQUssRUFEUDtBQUVFQyxlQUFNO0FBRlIsT0FMSyxFQVNMO0FBQ0VELGNBQUssRUFEUDtBQUVFQyxlQUFNO0FBRlIsT0FUSyxFQWFMO0FBQ0VELGNBQUssRUFEUDtBQUVFQyxlQUFNO0FBRlIsT0FiSyxFQWlCTDtBQUNFRCxjQUFLLEVBRFA7QUFFRUMsZUFBTTtBQUZSLE9BakJLLENBRkQ7QUF3Qk5DLGFBQU0sRUF4QkE7QUF5Qk5DLGdCQUFTLEVBekJIO0FBMEJOQyxnQkFBVSxFQTFCSjtBQTJCTkMsWUFBSztBQUNIQyxpQkFBUSxFQURMO0FBRUhDLG9CQUFXLEVBRlI7QUFHSEMsbUJBQVUsRUFIUDtBQUlIQyxrQkFBUyxFQUpOO0FBS0hDLGFBQUksRUFMRDtBQU1IQyxpQkFBUSxFQU5MO0FBT0hDLGVBQU0sRUFQSDtBQVFIQyxpQkFBUSxFQVJMO0FBU0hDLG9CQUFXLEVBVFI7QUFVSEMsa0JBQVMs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QUFHaUQsVUFBSCxDQUFjO0FBQ1pDLG1CQUFLLHFDQUFtQ3JDLElBQUk5RCxJQUFKLENBQVNPO0FBRHJDLGFBQWQ7QUFHSCxXQUpELE1BSUs7QUFDRDBGLHFCQUFTRyxNQUFULENBQWdCLENBQWhCO0FBQ0FuRCxlQUFHb0QsWUFBSCxDQUFnQjtBQUNmQyxxQkFBTztBQURRLGFBQWhCO0FBR0g7QUFFSixTQWRELE1BY0s7QUFDRGpDLGtCQUFRQyxHQUFSLENBQVl0RSxJQUFaO0FBQ0g7QUFFRixPQTdCSCxFQTZCS21GLEtBN0JMLENBNkJXLGVBQUssQ0FFYixDQS9CSDtBQWdDRDs7OztFQXRTbUMsZUFBS29CLEk7O2tCQUF0QjNHLFEiLCJmaWxlIjoiYmFzZV9pbmZvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG4gIGltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuICBpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCdcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlSW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gICAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WfuuacrOS/oeaBrycsXHJcbiAgICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjZmFmYWZhXCIsXHJcbiAgICAgIH1cclxuXHJcbiAgICAgZGF0YSA9IHtcclxuICAgICAgdHlwZToxLFxyXG4gICAgICBzY3JlZW46W1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpc3Q6W10sXHJcbiAgICAgICAgICBpbmRleDpbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpc3Q6W10sXHJcbiAgICAgICAgICBpbmRleDpbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpc3Q6W10sXHJcbiAgICAgICAgICBpbmRleDpbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpc3Q6W10sXHJcbiAgICAgICAgICBpbmRleDpbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpc3Q6W10sXHJcbiAgICAgICAgICBpbmRleDpbXSxcclxuICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHRva2VuOicnLFxyXG4gICAgICB0b2tlbktleTonJyxcclxuICAgICAgcmVzdW1laWQ6ICcnLFxyXG4gICAgICBmb3JtOntcclxuICAgICAgICBoZWFkaW1nOicnLFxyXG4gICAgICAgIHJlc3VtZW5hbWU6JycsXHJcbiAgICAgICAgdGVsZXBob25lOicnLFxyXG4gICAgICAgIHVzZXJuYW1lOicnLFxyXG4gICAgICAgIHNleDonJyxcclxuICAgICAgICBtYXJpdGFsOicnLFxyXG4gICAgICAgIGVtYWlsOicnLFxyXG4gICAgICAgIGFkZHJlc3M6JycsXHJcbiAgICAgICAgbGl2ZWNpdHlpZDonJyxcclxuICAgICAgICBib3JuZGF0ZTonJyxcclxuICAgICAgICBlZHVjYXRpb25iZzonJyxcclxuICAgICAgICB3b3JreWVhcnM6JycsXHJcbiAgICAgICAgam9ic3RhdHVzOicnLFxyXG4gICAgICB9LFxyXG4gICAgICBzdGFydDonJyxcclxuICAgICAgZW5kOicnLFxyXG4gICAgICBiYXNlNjQ6ZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC5lbmQgPSBtb21lbnQoKS5zdWJ0cmFjdCgxOCwgXCJ5ZWFyc1wiKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpXHJcbiAgICAgICAgdGhhdC5zdGFydCA9IG1vbWVudCgpLnN1YnRyYWN0KDUwLCBcInllYXJzXCIpLmZvcm1hdChcIllZWVktTU0tRERcIilcclxuICAgICAgICBsZXQgbG9naW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW4nKVxyXG4gICAgICAgIHRoYXQucmVzdW1laWQgPSBvcHRpb25zLnJlc3VtZWlkIHx8ICcnO1xyXG4gICAgICAgIHRoYXQudHlwZSA9IG9wdGlvbnMudHlwZTtcclxuICAgICAgICB0aGF0LnRva2VuID0gbG9naW4udG9rZW5cclxuICAgICAgICB0aGF0LnRva2VuS2V5ID0gbG9naW4udG9rZW5LZXlcclxuICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG5cclxuICAgICAgICBpZih0aGF0LnJlc3VtZWlkKSB0aGF0LmdldERhdGEoKVxyXG4gICAgICAgIGNvbnN0IGFyciA9IFtcIkRJQ1RfQkFTRV9TRVhcIixcIkRJQ1RfUkVTVU1FX1dPUktZRUFSXCIsXCJESUNUX1JFU1VNRV9XRURESU5HXCIsXCJESUNUX1JFU1VNRV9KT0JTVEFUVVwiLFwiRElDVF9KT0JfRURVXCJdXHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB0aGF0LmdldERpY3QoYXJyW2ldLGkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgY2hhbmdlUG9ydHJhaXQoKXtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuY2hvb3NlUG9ydHJhaXQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOaPkOS6pOihqOWNlS0t5Z+65pys5L+h5oGv57yW6L6R5paw5aKeXHJcbiAgICAgICAgZm9ybVN1Ym1pdDogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgICAgIGNvbnN0IHtmb3JtfSA9IHRoaXNcclxuICAgICAgICAgIGlmKCFmb3JtLmhlYWRpbWcpe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+eugOWOhuWktOWDj+S4jeS4uuepuicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKCFmb3JtLnJlc3VtZW5hbWUpe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+eugOWOhuWQjeensOS4jeS4uuepuicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKCFmb3JtLnVzZXJuYW1lKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCflp5PlkI3kuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighZm9ybS5zZXgpe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+ivt+mAieaLqeaAp+WIqycpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKCFmb3JtLmJvcm5kYXRlKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nlh7rnlJ/lubTmnIgnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighZm9ybS53b3JreWVhcnMpe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+ivt+mAieaLqeW3peS9nOW5tOmZkCcpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKCFmb3JtLnRlbGVwaG9uZSl7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcign5omL5py65Y+356CB5LiN5Li656m6Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoIWZvcm0uam9ic3RhdHVzKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nlt6XkvZznirbmgIEnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighZm9ybS5saXZlY2l0eWlkKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfmiYDlnKjln47luILkuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGF0LmNoYW5nZURhdGEoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5wdXRDaGFuZ2UoZSl7XHJcbiAgICAgICAgICBjb25zdCB7IGZvcm0gfT10aGlzXHJcbiAgICAgICAgICBjb25zdCBuYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICAgICAgZm9ybVtuYW1lXSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBpY2tlckNoYW5nZShlKXtcclxuICAgICAgICAgIGNvbnN0IHsgZm9ybSB9PXRoaXNcclxuICAgICAgICAgIGNvbnN0IG5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudFxyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgZm9ybVtuYW1lXSA9IHRoaXMuc2NyZWVuW2N1cnJlbnRdLmxpc3RbaW5kZXhdXHJcbiAgICAgICAgICB0aGlzLnNjcmVlbltjdXJyZW50XS5pbmRleCA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGVDaGFuZ2UoZSkge1xyXG4gICAgICAgICAgdGhpcy5mb3JtLmJvcm5kYXRlID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY2hvb3NlUG9ydHJhaXQoZXZlbnQpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHd4LmNob29zZUltYWdlKHtcclxuICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgc2l6ZVR5cGU6IFsnY29tcHJlc3NlZCddLCAgICAgLy8g5Y+v5Lul5oyH5a6a5piv5Y6f5Zu+6L+Y5piv5Y6L57yp5Zu+77yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLCAgICAgICAgLy8g5Y+v5Lul5oyH5a6a5p2l5rqQ5piv55u45YaM6L+Y5piv55u45py677yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICBpZihyZXMudGVtcEZpbGVzWzBdLnNpemU+MTAwMDAwMCl7XHJcbiAgICAgICAgICAgICAgICB0aXAuZXJyb3IoXCLlm77niYflpKflsI/otoXlh7rpmZDliLZcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gbGV0IGJhc2U2NCA9IHJlcy50ZW1wRmlsZVBhdGhzWzBdXHJcbiAgICAgICAgICAgIGxldCBiYXNlNjQgPSB3eC5nZXRGaWxlU3lzdGVtTWFuYWdlcigpLnJlYWRGaWxlU3luYyhyZXMudGVtcEZpbGVQYXRoc1swXSwgJ2Jhc2U2NCcpXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJhc2U2NClcclxuICAgICAgICAgICAgdGhhdC5mb3JtLmhlYWRpbWcgPWJhc2U2NDtcclxuICAgICAgICAgICAgdGhhdC5iYXNlNjQgPXRydWVcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKSAgICAgLy8g6L+U5Zue6YCJ5a6a54Wn54mH55qE5pys5Zyw5paH5Lu26Lev5b6E5YiX6KGoXHJcbiAgICAgICAgICAgIC8vIHRoYXQudXBsb2FkSW1nRmlsZSh0aGF0LCBiYXNlNjQpXHJcblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWwoKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhg6I635Y+W5Zu+54mH5aSx6LSlYClcclxuICAgICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlbDmja7lrZflhbhcclxuICAgIGdldERpY3QoY29kZSxpKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgIGFwaS5nZXREaWN0RGF0YSh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJEQzAwMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIFwiZ3JvdXBjb2RlXCI6IGNvZGUsXHJcbiAgICAgICAgICAgICAgICBcInNlbEFsbFwiOiBcImZhbHNlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICBpZiAocmVzLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICB2YXIgYXJyID0gW11cclxuICAgICAgICAgICAgcmVzLmRhdGEuZGF0YS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYoY29kZT09J0RJQ1RfSk9CX0VEVSd8fGNvZGU9PSdESUNUX1JFU1VNRV9XT1JLWUVBUicpe1xyXG4gICAgICAgICAgICAgIGFyci5zaGlmdCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5zY3JlZW5baV0ubGlzdCA9IGFycjtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IocmVzLnJldHVybk1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSkuY2F0Y2goZXJyPT57XHJcblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W566A5Y6G5Z+65pys5L+h5oGvXHJcbiAgICBnZXREYXRhKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgIH0pXHJcbiAgICAgIGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDAzXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bWVpZFwiOiB0aGF0LnJlc3VtZWlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgdmFyIGJhc2VJbmZvID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICB0aGF0LmZvcm0gPSB7XHJcbiAgICAgICAgICAgICAgICAgIGhlYWRpbWc6YmFzZUluZm8uaGVhZGltZyxcclxuICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IGJhc2VJbmZvLnVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgICByZXN1bWVuYW1lOiBiYXNlSW5mby5uZXdyZXN1bWVuYW1lLFxyXG4gICAgICAgICAgICAgICAgICBib3JuZGF0ZTogYmFzZUluZm8uYm9ybmRhdGUsXHJcbiAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGJhc2VJbmZvLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICAgIHdvcmt5ZWFyczogYmFzZUluZm8ud29ya3llYXJzLFxyXG4gICAgICAgICAgICAgICAgICBqb2JzdGF0dXM6IGJhc2VJbmZvLmpvYnN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgbGl2ZWNpdHlpZDogYmFzZUluZm8ubGl2ZWNpdHlpZCxcclxuICAgICAgICAgICAgICAgICAgbWFyaXRhbDogYmFzZUluZm8ubWFyaXRhbCxcclxuICAgICAgICAgICAgICAgICAgdGVsZXBob25lOiBiYXNlSW5mby50ZWxlcGhvbmUsXHJcbiAgICAgICAgICAgICAgICAgIGVtYWlsOiBiYXNlSW5mby5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgc2V4OiBiYXNlSW5mby5zZXgsXHJcbiAgICAgICAgICAgICAgICAgIGVkdWNhdGlvbmJnOmJhc2VJbmZvLmVkdWNhdGlvbmJnXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IocmVzLnJldHVybk1zZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbiAgICAvL+S/ruaUueihqOWNleaVsOaNrlxyXG4gICAgY2hhbmdlRGF0YSgpIHtcclxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICB9KVxyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICBjb25zdCB7Zm9ybX0gPSB0aGlzXHJcbiAgICAgIGxldCBvYmogPSBPYmplY3QuYXNzaWduKGZvcm0se1xyXG4gICAgICAgIHRva2VuOnRoYXQudG9rZW4sXHJcbiAgICAgICAgdG9rZW5LZXk6dGhhdC50b2tlbktleSxcclxuICAgICAgICByZXN1bWVpZDp0aGF0LnJlc3VtZWlkXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYoIXRoYXQucmVzdW1laWQpe1xyXG4gICAgICAgIGRlbGV0ZSBvYmoucmVzdW1laWRcclxuICAgICAgfVxyXG4gICAgICBhcGkuZ2V0UmVzdW1lSW5mbyh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMTNcIixcclxuICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBkYXRhOiBvYmpcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzLCfov5Tlm57nu5PmnpwnKVxyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgaWYocmVzLmRhdGEgJiYgcmVzLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgICAgICAgIGxldCBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgICAgIGlmKHJlcy5kYXRhLnJlc3VtZWlkKXtcclxuICAgICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL3BlcnNvbmFsL3Jlc3VtZT9yZXN1bWVpZD0nK3Jlcy5kYXRhLnJlc3VtZWlkXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgIHByZXZQYWdlLnVwZGF0ZSgwKVxyXG4gICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KS5jYXRjaChlcnI9PntcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgfVxyXG4iXX0=