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
        // if(!form.headimg){
        //   tip.error('简历头像不为空');
        //   return false
        // }

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

      if (!that.base64) delete obj.headimg;
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
              url: '/pages/personal/resume?resumeid=' + res.data.resumeid + '&edit=true'
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2VfaW5mby5qcyJdLCJuYW1lcyI6WyJCYXNlSW5mbyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwiZGF0YSIsInR5cGUiLCJzY3JlZW4iLCJsaXN0IiwiaW5kZXgiLCJ0b2tlbiIsInRva2VuS2V5IiwicmVzdW1laWQiLCJmb3JtIiwiaGVhZGltZyIsInJlc3VtZW5hbWUiLCJ0ZWxlcGhvbmUiLCJ1c2VybmFtZSIsInNleCIsIm1hcml0YWwiLCJlbWFpbCIsImFkZHJlc3MiLCJsaXZlY2l0eWlkIiwiYm9ybmRhdGUiLCJlZHVjYXRpb25iZyIsIndvcmt5ZWFycyIsImpvYnN0YXR1cyIsInN0YXJ0IiwiZW5kIiwiYmFzZTY0IiwibWV0aG9kcyIsImNoYW5nZVBvcnRyYWl0IiwidGhhdCIsImNob29zZVBvcnRyYWl0IiwiZm9ybVN1Ym1pdCIsImUiLCJlcnJvciIsImNoYW5nZURhdGEiLCJpbnB1dENoYW5nZSIsIm5hbWUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwicGlja2VyQ2hhbmdlIiwiY3VycmVudCIsImRhdGVDaGFuZ2UiLCJvcHRpb25zIiwiZGF0ZSIsIkRhdGUiLCJzdWJ0cmFjdCIsImZvcm1hdCIsImxvZ2luIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImdldERhdGEiLCJhcnIiLCJpIiwibGVuZ3RoIiwiZ2V0RGljdCIsImV2ZW50IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJ0ZW1wRmlsZXMiLCJzaXplIiwiZ2V0RmlsZVN5c3RlbU1hbmFnZXIiLCJyZWFkRmlsZVN5bmMiLCJ0ZW1wRmlsZVBhdGhzIiwiZmFpbCIsImNvbnNvbGUiLCJsb2ciLCJjb2RlIiwiZ2V0RGljdERhdGEiLCJxdWVyeSIsImhlYWQiLCJ0aGVuIiwicmV0dXJuQ29kZSIsImZvckVhY2giLCJpdGVtIiwicHVzaCIsImxhYmVsIiwic2hpZnQiLCJyZXR1cm5Nc2ciLCJjYXRjaCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJnZXRSZXN1bWVJbmZvIiwiaGlkZUxvYWRpbmciLCJiYXNlSW5mbyIsIkpTT04iLCJwYXJzZSIsIm5ld3Jlc3VtZW5hbWUiLCJvYmoiLCJPYmplY3QiLCJhc3NpZ24iLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwicmVkaXJlY3RUbyIsInVybCIsInVwZGF0ZSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBRWpCQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLG9DQUE4QjtBQUZ2QixLLFFBS1ZDLEksR0FBTztBQUNOQyxZQUFLLENBREM7QUFFTkMsY0FBTyxDQUNMO0FBQ0VDLGNBQUssRUFEUDtBQUVFQyxlQUFNO0FBRlIsT0FESyxFQUtMO0FBQ0VELGNBQUssRUFEUDtBQUVFQyxlQUFNO0FBRlIsT0FMSyxFQVNMO0FBQ0VELGNBQUssRUFEUDtBQUVFQyxlQUFNO0FBRlIsT0FUSyxFQWFMO0FBQ0VELGNBQUssRUFEUDtBQUVFQyxlQUFNO0FBRlIsT0FiSyxFQWlCTDtBQUNFRCxjQUFLLEVBRFA7QUFFRUMsZUFBTTtBQUZSLE9BakJLLENBRkQ7QUF3Qk5DLGFBQU0sRUF4QkE7QUF5Qk5DLGdCQUFTLEVBekJIO0FBMEJOQyxnQkFBVSxFQTFCSjtBQTJCTkMsWUFBSztBQUNIQyxpQkFBUSxFQURMO0FBRUhDLG9CQUFXLEVBRlI7QUFHSEMsbUJBQVUsRUFIUDtBQUlIQyxrQkFBUyxFQUpOO0FBS0hDLGFBQUksRUFMRDtBQU1IQyxpQkFBUSxFQU5MO0FBT0hDLGVBQU0sRUFQSDtBQVFIQyxpQkFBUSxFQVJMO0FBU0hDLG9CQUFXLEVBVFI7QUFVSEMsa0JBQVMs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QUgsQ0FBYztBQUNaQyxtQkFBSyxxQ0FBbUNyQyxJQUFJOUQsSUFBSixDQUFTTyxRQUE1QyxHQUFxRDtBQUQ5QyxhQUFkO0FBR0gsV0FKRCxNQUlLO0FBQ0QwRixxQkFBU0csTUFBVCxDQUFnQixDQUFoQjtBQUNBbkQsZUFBR29ELFlBQUgsQ0FBZ0I7QUFDZkMscUJBQU87QUFEUSxhQUFoQjtBQUdIO0FBRUosU0FkRCxNQWNLO0FBQ0RqQyxrQkFBUUMsR0FBUixDQUFZdEUsSUFBWjtBQUNIO0FBRUYsT0E3QkgsRUE2QkttRixLQTdCTCxDQTZCVyxlQUFLLENBRWIsQ0EvQkg7QUFnQ0Q7Ozs7RUF4U21DLGVBQUtvQixJOztrQkFBdEIzRyxRIiwiZmlsZSI6ImJhc2VfaW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuICBpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcbiAgaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUluZm8gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG5cclxuICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfln7rmnKzkv6Hmga8nLFxyXG4gICAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiI2ZhZmFmYVwiLFxyXG4gICAgICB9XHJcblxyXG4gICAgIGRhdGEgPSB7XHJcbiAgICAgIHR5cGU6MSxcclxuICAgICAgc2NyZWVuOltcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICB0b2tlbjonJyxcclxuICAgICAgdG9rZW5LZXk6JycsXHJcbiAgICAgIHJlc3VtZWlkOiAnJyxcclxuICAgICAgZm9ybTp7XHJcbiAgICAgICAgaGVhZGltZzonJyxcclxuICAgICAgICByZXN1bWVuYW1lOicnLFxyXG4gICAgICAgIHRlbGVwaG9uZTonJyxcclxuICAgICAgICB1c2VybmFtZTonJyxcclxuICAgICAgICBzZXg6JycsXHJcbiAgICAgICAgbWFyaXRhbDonJyxcclxuICAgICAgICBlbWFpbDonJyxcclxuICAgICAgICBhZGRyZXNzOicnLFxyXG4gICAgICAgIGxpdmVjaXR5aWQ6JycsXHJcbiAgICAgICAgYm9ybmRhdGU6JycsXHJcbiAgICAgICAgZWR1Y2F0aW9uYmc6JycsXHJcbiAgICAgICAgd29ya3llYXJzOicnLFxyXG4gICAgICAgIGpvYnN0YXR1czonJyxcclxuICAgICAgfSxcclxuICAgICAgc3RhcnQ6JycsXHJcbiAgICAgIGVuZDonJyxcclxuICAgICAgYmFzZTY0OmZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoYXQuZW5kID0gbW9tZW50KCkuc3VidHJhY3QoMTgsIFwieWVhcnNcIikuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKVxyXG4gICAgICAgIHRoYXQuc3RhcnQgPSBtb21lbnQoKS5zdWJ0cmFjdCg1MCwgXCJ5ZWFyc1wiKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpXHJcbiAgICAgICAgbGV0IGxvZ2luID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2xvZ2luJylcclxuICAgICAgICB0aGF0LnJlc3VtZWlkID0gb3B0aW9ucy5yZXN1bWVpZCB8fCAnJztcclxuICAgICAgICB0aGF0LnR5cGUgPSBvcHRpb25zLnR5cGU7XHJcbiAgICAgICAgdGhhdC50b2tlbiA9IGxvZ2luLnRva2VuXHJcbiAgICAgICAgdGhhdC50b2tlbktleSA9IGxvZ2luLnRva2VuS2V5XHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuXHJcbiAgICAgICAgaWYodGhhdC5yZXN1bWVpZCkgdGhhdC5nZXREYXRhKClcclxuICAgICAgICBjb25zdCBhcnIgPSBbXCJESUNUX0JBU0VfU0VYXCIsXCJESUNUX1JFU1VNRV9XT1JLWUVBUlwiLFwiRElDVF9SRVNVTUVfV0VERElOR1wiLFwiRElDVF9SRVNVTUVfSk9CU1RBVFVcIixcIkRJQ1RfSk9CX0VEVVwiXVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdGhhdC5nZXREaWN0KGFycltpXSxpKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBtZXRob2RzID0ge1xyXG4gICAgICAgIGNoYW5nZVBvcnRyYWl0KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmNob29zZVBvcnRyYWl0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDmj5DkuqTooajljZUtLeWfuuacrOS/oeaBr+e8lui+keaWsOWinlxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICBjb25zdCB7Zm9ybX0gPSB0aGlzXHJcbiAgICAgICAgICAvLyBpZighZm9ybS5oZWFkaW1nKXtcclxuICAgICAgICAgIC8vICAgdGlwLmVycm9yKCfnroDljoblpLTlg4/kuI3kuLrnqbonKTtcclxuICAgICAgICAgIC8vICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICBpZighZm9ybS5yZXN1bWVuYW1lKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfnroDljoblkI3np7DkuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighZm9ybS51c2VybmFtZSl7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcign5aeT5ZCN5LiN5Li656m6Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoIWZvcm0uc2V4KXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nmgKfliKsnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighZm9ybS5ib3JuZGF0ZSl7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcign6K+36YCJ5oup5Ye655Sf5bm05pyIJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoIWZvcm0ud29ya3llYXJzKXtcclxuICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nlt6XkvZzlubTpmZAnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZighZm9ybS50ZWxlcGhvbmUpe1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoJ+aJi+acuuWPt+eggeS4jeS4uuepuicpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmKCFmb3JtLmpvYnN0YXR1cyl7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcign6K+36YCJ5oup5bel5L2c54q25oCBJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoIWZvcm0ubGl2ZWNpdHlpZCl7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcign5omA5Zyo5Z+O5biC5LiN5Li656m6Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhhdC5jaGFuZ2VEYXRhKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlucHV0Q2hhbmdlKGUpe1xyXG4gICAgICAgICAgY29uc3QgeyBmb3JtIH09dGhpc1xyXG4gICAgICAgICAgY29uc3QgbmFtZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICAgIGZvcm1bbmFtZV0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwaWNrZXJDaGFuZ2UoZSl7XHJcbiAgICAgICAgICBjb25zdCB7IGZvcm0gfT10aGlzXHJcbiAgICAgICAgICBjb25zdCBuYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICAgICAgY29uc3QgY3VycmVudCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnRcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgIGZvcm1bbmFtZV0gPSB0aGlzLnNjcmVlbltjdXJyZW50XS5saXN0W2luZGV4XVxyXG4gICAgICAgICAgdGhpcy5zY3JlZW5bY3VycmVudF0uaW5kZXggPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRlQ2hhbmdlKGUpIHtcclxuICAgICAgICAgIHRoaXMuZm9ybS5ib3JuZGF0ZSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNob29zZVBvcnRyYWl0KGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICBjb3VudDogMSxcclxuICAgICAgICAgIHNpemVUeXBlOiBbJ2NvbXByZXNzZWQnXSwgICAgIC8vIOWPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSwgICAgICAgIC8vIOWPr+S7peaMh+Wumuadpea6kOaYr+ebuOWGjOi/mOaYr+ebuOacuu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgaWYocmVzLnRlbXBGaWxlc1swXS5zaXplPjEwMDAwMDApe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKFwi5Zu+54mH5aSn5bCP6LaF5Ye66ZmQ5Yi2XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGxldCBiYXNlNjQgPSByZXMudGVtcEZpbGVQYXRoc1swXVxyXG4gICAgICAgICAgICBsZXQgYmFzZTY0ID0gd3guZ2V0RmlsZVN5c3RlbU1hbmFnZXIoKS5yZWFkRmlsZVN5bmMocmVzLnRlbXBGaWxlUGF0aHNbMF0sICdiYXNlNjQnKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiYXNlNjQpXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybS5oZWFkaW1nID1iYXNlNjQ7XHJcbiAgICAgICAgICAgIHRoYXQuYmFzZTY0ID10cnVlXHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCkgICAgIC8vIOi/lOWbnumAieWumueFp+eJh+eahOacrOWcsOaWh+S7tui3r+W+hOWIl+ihqFxyXG4gICAgICAgICAgICAvLyB0aGF0LnVwbG9hZEltZ0ZpbGUodGhhdCwgYmFzZTY0KVxyXG5cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBmYWlsKCl7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coYOiOt+WPluWbvueJh+Wksei0pWApXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5pWw5o2u5a2X5YW4XHJcbiAgICBnZXREaWN0KGNvZGUsaSkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICBhcGkuZ2V0RGljdERhdGEoe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiREMwMDFcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBcImdyb3VwY29kZVwiOiBjb2RlLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxBbGxcIjogXCJmYWxzZVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IFtdXHJcbiAgICAgICAgICAgIHJlcy5kYXRhLmRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmKGNvZGU9PSdESUNUX0pPQl9FRFUnfHxjb2RlPT0nRElDVF9SRVNVTUVfV09SS1lFQVInKXtcclxuICAgICAgICAgICAgICBhcnIuc2hpZnQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuc2NyZWVuW2ldLmxpc3QgPSBhcnI7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGlwLmVycm9yKHJlcy5yZXR1cm5Nc2cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pLmNhdGNoKGVycj0+e1xyXG5cclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlueugOWOhuWfuuacrOS/oeaBr1xyXG4gICAgZ2V0RGF0YSgpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICB9KVxyXG4gICAgICBhcGkuZ2V0UmVzdW1lSW5mbyh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAwM1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhhdC50b2tlbktleSxcclxuICAgICAgICAgICAgICAgIFwicmVzdW1laWRcIjogdGhhdC5yZXN1bWVpZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICAgIGlmIChyZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgICAgIHZhciBiYXNlSW5mbyA9IEpTT04ucGFyc2UocmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgdGhhdC5mb3JtID0ge1xyXG4gICAgICAgICAgICAgICAgICBoZWFkaW1nOmJhc2VJbmZvLmhlYWRpbWcsXHJcbiAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBiYXNlSW5mby51c2VybmFtZSxcclxuICAgICAgICAgICAgICAgICAgcmVzdW1lbmFtZTogYmFzZUluZm8ubmV3cmVzdW1lbmFtZSxcclxuICAgICAgICAgICAgICAgICAgYm9ybmRhdGU6IGJhc2VJbmZvLmJvcm5kYXRlLFxyXG4gICAgICAgICAgICAgICAgICBhZGRyZXNzOiBiYXNlSW5mby5hZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgICB3b3JreWVhcnM6IGJhc2VJbmZvLndvcmt5ZWFycyxcclxuICAgICAgICAgICAgICAgICAgam9ic3RhdHVzOiBiYXNlSW5mby5qb2JzdGF0dXMsXHJcbiAgICAgICAgICAgICAgICAgIGxpdmVjaXR5aWQ6IGJhc2VJbmZvLmxpdmVjaXR5aWQsXHJcbiAgICAgICAgICAgICAgICAgIG1hcml0YWw6IGJhc2VJbmZvLm1hcml0YWwsXHJcbiAgICAgICAgICAgICAgICAgIHRlbGVwaG9uZTogYmFzZUluZm8udGVsZXBob25lLFxyXG4gICAgICAgICAgICAgICAgICBlbWFpbDogYmFzZUluZm8uZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgIHNleDogYmFzZUluZm8uc2V4LFxyXG4gICAgICAgICAgICAgICAgICBlZHVjYXRpb25iZzpiYXNlSW5mby5lZHVjYXRpb25iZ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGlwLmVycm9yKHJlcy5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG4gICAgLy/kv67mlLnooajljZXmlbDmja5cclxuICAgIGNoYW5nZURhdGEoKSB7XHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgfSlcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgY29uc3Qge2Zvcm19ID0gdGhpc1xyXG4gICAgICBsZXQgb2JqID0gT2JqZWN0LmFzc2lnbihmb3JtLHtcclxuICAgICAgICB0b2tlbjp0aGF0LnRva2VuLFxyXG4gICAgICAgIHRva2VuS2V5OnRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgcmVzdW1laWQ6dGhhdC5yZXN1bWVpZFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmKCF0aGF0LnJlc3VtZWlkKXtcclxuICAgICAgICBkZWxldGUgb2JqLnJlc3VtZWlkXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKCF0aGF0LmJhc2U2NCkgZGVsZXRlIG9iai5oZWFkaW1nXHJcbiAgICAgIGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAxM1wiLFxyXG4gICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGRhdGE6IG9ialxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMsJ+i/lOWbnue7k+aenCcpXHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICBpZihyZXMuZGF0YSAmJiByZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgICAgICAgbGV0IHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgaWYocmVzLmRhdGEucmVzdW1laWQpe1xyXG4gICAgICAgICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvcGFnZXMvcGVyc29uYWwvcmVzdW1lP3Jlc3VtZWlkPScrcmVzLmRhdGEucmVzdW1laWQrJyZlZGl0PXRydWUnXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgIHByZXZQYWdlLnVwZGF0ZSgwKVxyXG4gICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KS5jYXRjaChlcnI9PntcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgfVxyXG4iXX0=