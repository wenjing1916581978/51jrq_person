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
      navigationBarTitleText: '求职意向',
      navigationBarBackgroundColor: "#fafafa"
    }, _this.data = {
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
      }],
      token: "",
      tokenKey: "",
      resumeid: '',
      type: 1,
      form: {
        jobintentcode: '',
        jobnature: '',
        postids: '',
        sitecity: '',
        functions: '',
        expectsalarycode: '',
        poststime: '',
        selfremark: ''
      }
    }, _this.methods = {
      // 提交表单--基本信息编辑新增
      formSubmit: function formSubmit(e) {
        var that = this;
        var form = this.form,
            type = this.type;

        if (type == 1) {
          if (!form.jobnature) {
            _tip2.default.error('请选择工作类型');
            return false;
          }
          if (!form.postids) {
            _tip2.default.error('请选择期望行业');
            return false;
          }
          if (!form.functions) {
            _tip2.default.error('期望职位不为空');
            return false;
          }
          if (!form.sitecity) {
            _tip2.default.error('期望城市不为空');
            return false;
          }

          if (!form.expectsalarycode) {
            _tip2.default.error('请选择期望月薪');
            return false;
          }
          if (!form.poststime) {
            _tip2.default.error('请选择到岗时间');
            return false;
          }
        } else {
          if (!form.selfremark) {
            _tip2.default.error('自我评价不为空');
            return false;
          }
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
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BaseInfo, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var that = this;
      var login = wx.getStorageSync('login');
      that.resumeid = options.resumeid;
      that.type = options.type;
      that.token = login.token;
      that.tokenKey = login.tokenKey;
      that.$apply();

      if (options.functions) that.getData();
      if (options.type == 1) {
        var arr = ['DICT_JOB_JOBTYPE', 'DICT_COMP_INDUSTRY', 'DICT_RESUME_JOBSTATU', 'DICT_RESUME_ESC', 'DICT_RESUME_POSTTIME'];
        for (var i = 0; i < arr.length; i++) {
          that.getDict(arr[i], i);
        }
      }
    }
  }, {
    key: 'getData',


    //获取简历基本信息
    value: function getData() {
      var that = this;
      wx.showLoading({
        title: '加载中'
      });
      _api2.default.getResumeInfo({
        query: {
          head: {
            "transcode": "M0004",
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
          var job = JSON.parse(res.data.data);
          that.form = {
            jobintentcode: job.jobintentcode,
            jobnature: job.jobnature,
            postids: job.postids,
            sitecity: job.sitecity,
            functions: job.functions,
            expectsalarycode: job.expectsalarycode,
            poststime: job.poststime,
            selfremark: job.selfremark
          };
          that.$apply();
        } else {
          _tip2.default.error(res.returnMsg);
        }
      }).catch(function (err) {});
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
          that.screen[i].list = arr;
          that.$apply();
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
      var form = this.form;

      var obj = Object.assign(form, {
        token: that.token,
        tokenKey: that.tokenKey,
        resumeid: that.resumeid
      });
      wx.showLoading({
        title: '加载中'
      });
      _api2.default.getResumeInfo({
        query: {
          head: {
            "transcode": "M0014",
            "type": "h"
          },
          data: obj
        }
      }).then(function (res) {
        wx.hideLoading();
        if (res.data && res.data.returnCode == "AAAAAAA") {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.update(1);
          wx.navigateBack({
            delta: 1
          });
        } else {
          _tip2.default.error(res.data.returnMsg);
        }
      });
    }
  }]);

  return BaseInfo;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseInfo , 'pages/personal/job_want'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYl93YW50LmpzIl0sIm5hbWVzIjpbIkJhc2VJbmZvIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwic2NyZWVuIiwibGlzdCIsImluZGV4IiwidG9rZW4iLCJ0b2tlbktleSIsInJlc3VtZWlkIiwidHlwZSIsImZvcm0iLCJqb2JpbnRlbnRjb2RlIiwiam9ibmF0dXJlIiwicG9zdGlkcyIsInNpdGVjaXR5IiwiZnVuY3Rpb25zIiwiZXhwZWN0c2FsYXJ5Y29kZSIsInBvc3RzdGltZSIsInNlbGZyZW1hcmsiLCJtZXRob2RzIiwiZm9ybVN1Ym1pdCIsImUiLCJ0aGF0IiwiZXJyb3IiLCJjaGFuZ2VEYXRhIiwiaW5wdXRDaGFuZ2UiLCJuYW1lIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInBpY2tlckNoYW5nZSIsImN1cnJlbnQiLCJvcHRpb25zIiwibG9naW4iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0RGF0YSIsImFyciIsImkiLCJsZW5ndGgiLCJnZXREaWN0Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImdldFJlc3VtZUluZm8iLCJxdWVyeSIsImhlYWQiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInJlcyIsInJldHVybkNvZGUiLCJoaWRlTG9hZGluZyIsImpvYiIsIkpTT04iLCJwYXJzZSIsInJldHVybk1zZyIsImNhdGNoIiwiY29kZSIsImdldERpY3REYXRhIiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwibGFiZWwiLCJvYmoiLCJPYmplY3QiLCJhc3NpZ24iLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwidXBkYXRlIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEs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QUgsQ0FBZ0I7QUFDZkMsbUJBQU87QUFEUSxXQUFoQjtBQUdILFNBUEQsTUFPSztBQUNELHdCQUFJbEQsS0FBSixDQUFVNEIsSUFBSWpELElBQUosQ0FBU3VELFNBQW5CO0FBQ0g7QUFFRixPQXJCSDtBQXNCRDs7OztFQXJPbUMsZUFBS2lCLEk7O2tCQUF0QjVFLFEiLCJmaWxlIjoiam9iX3dhbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbiAgaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlSW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5rGC6IGM5oSP5ZCRJyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjZmFmYWZhXCIsXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgc2NyZWVuOltcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICB0b2tlbjogXCJcIixcclxuICAgICAgdG9rZW5LZXk6IFwiXCIsXHJcbiAgICAgIHJlc3VtZWlkOicnLFxyXG4gICAgICB0eXBlOjEsXHJcbiAgICAgIGZvcm06e1xyXG4gICAgICAgIGpvYmludGVudGNvZGU6JycsXHJcbiAgICAgICAgam9ibmF0dXJlOicnLFxyXG4gICAgICAgIHBvc3RpZHM6JycsXHJcbiAgICAgICAgc2l0ZWNpdHk6JycsXHJcbiAgICAgICAgZnVuY3Rpb25zOicnLFxyXG4gICAgICAgIGV4cGVjdHNhbGFyeWNvZGU6JycsXHJcbiAgICAgICAgcG9zdHN0aW1lOicnLFxyXG4gICAgICAgIHNlbGZyZW1hcms6JycsXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgbGV0IGxvZ2luID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2xvZ2luJylcclxuICAgICAgdGhhdC5yZXN1bWVpZCA9IG9wdGlvbnMucmVzdW1laWQ7XHJcbiAgICAgIHRoYXQudHlwZSA9IG9wdGlvbnMudHlwZTtcclxuICAgICAgdGhhdC50b2tlbiA9IGxvZ2luLnRva2VuXHJcbiAgICAgIHRoYXQudG9rZW5LZXkgPSBsb2dpbi50b2tlbktleVxyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG5cclxuICAgICAgaWYob3B0aW9ucy5mdW5jdGlvbnMpIHRoYXQuZ2V0RGF0YSgpXHJcbiAgICAgIGlmKG9wdGlvbnMudHlwZT09MSl7XHJcbiAgICAgICAgY29uc3QgYXJyID0gWydESUNUX0pPQl9KT0JUWVBFJywnRElDVF9DT01QX0lORFVTVFJZJywnRElDVF9SRVNVTUVfSk9CU1RBVFUnLCdESUNUX1JFU1VNRV9FU0MnLCdESUNUX1JFU1VNRV9QT1NUVElNRSddXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHRoYXQuZ2V0RGljdChhcnJbaV0saSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgLy8g5o+Q5Lqk6KGo5Y2VLS3ln7rmnKzkv6Hmga/nvJbovpHmlrDlop5cclxuICAgICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICAgIGNvbnN0IHtmb3JtLHR5cGV9ID0gdGhpc1xyXG4gICAgICAgICAgICBpZih0eXBlPT0xKXtcclxuICAgICAgICAgICAgICBpZighZm9ybS5qb2JuYXR1cmUpe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nlt6XkvZznsbvlnosnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZighZm9ybS5wb3N0aWRzKXtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcign6K+36YCJ5oup5pyf5pyb6KGM5LiaJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYoIWZvcm0uZnVuY3Rpb25zKXtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcign5pyf5pyb6IGM5L2N5LiN5Li656m6Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYoIWZvcm0uc2l0ZWNpdHkpe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKCfmnJ/mnJvln47luILkuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYoIWZvcm0uZXhwZWN0c2FsYXJ5Y29kZSl7XHJcbiAgICAgICAgICAgICAgICB0aXAuZXJyb3IoJ+ivt+mAieaLqeacn+acm+aciOiWqicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmKCFmb3JtLnBvc3RzdGltZSl7XHJcbiAgICAgICAgICAgICAgICB0aXAuZXJyb3IoJ+ivt+mAieaLqeWIsOWyl+aXtumXtCcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICBpZighZm9ybS5zZWxmcmVtYXJrKXtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcign6Ieq5oiR6K+E5Lu35LiN5Li656m6Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LmNoYW5nZURhdGEoKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5wdXRDaGFuZ2UoZSl7XHJcbiAgICAgICAgICBjb25zdCB7IGZvcm0gfT10aGlzXHJcbiAgICAgICAgICBjb25zdCBuYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICAgICAgZm9ybVtuYW1lXSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBpY2tlckNoYW5nZShlKXtcclxuICAgICAgICAgIGNvbnN0IHsgZm9ybSB9PXRoaXNcclxuICAgICAgICAgIGNvbnN0IG5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY3VycmVudFxyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgZm9ybVtuYW1lXSA9IHRoaXMuc2NyZWVuW2N1cnJlbnRdLmxpc3RbaW5kZXhdXHJcbiAgICAgICAgICB0aGlzLnNjcmVlbltjdXJyZW50XS5pbmRleCA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bnroDljobln7rmnKzkv6Hmga9cclxuICAgIGdldERhdGEoKSB7XHJcbiAgICAgIGNvbnN0ICB0aGF0ID0gdGhpc1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgIH0pXHJcbiAgICAgIGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDA0XCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LnRva2VuLFxyXG4gICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bWVpZFwiOiB0aGF0LnJlc3VtZWlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzLCfojrflj5bln7rmnKzkv6Hmga8nKVxyXG4gICAgICAgIGlmIChyZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgIHZhciBqb2IgPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGF0LmZvcm0gPSB7XHJcbiAgICAgICAgICAgICAgam9iaW50ZW50Y29kZTpqb2Iuam9iaW50ZW50Y29kZSAsXHJcbiAgICAgICAgICAgICAgam9ibmF0dXJlOmpvYi5qb2JuYXR1cmUgLFxyXG4gICAgICAgICAgICAgIHBvc3RpZHM6am9iLnBvc3RpZHMgLFxyXG4gICAgICAgICAgICAgIHNpdGVjaXR5OmpvYi5zaXRlY2l0eSAsXHJcbiAgICAgICAgICAgICAgZnVuY3Rpb25zOmpvYi5mdW5jdGlvbnMgLFxyXG4gICAgICAgICAgICAgIGV4cGVjdHNhbGFyeWNvZGU6am9iLmV4cGVjdHNhbGFyeWNvZGUgLFxyXG4gICAgICAgICAgICAgIHBvc3RzdGltZTpqb2IucG9zdHN0aW1lICxcclxuICAgICAgICAgICAgICBzZWxmcmVtYXJrOmpvYi5zZWxmcmVtYXJrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgIHRpcC5lcnJvcihyZXMucmV0dXJuTXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KS5jYXRjaChlcnI9PntcclxuXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlbDmja7lrZflhbhcclxuICAgIGdldERpY3QoY29kZSxpKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgIGFwaS5nZXREaWN0RGF0YSh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJEQzAwMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIFwiZ3JvdXBjb2RlXCI6IGNvZGUsXHJcbiAgICAgICAgICAgICAgICBcInNlbEFsbFwiOiBcImZhbHNlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuXHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IFtdXHJcbiAgICAgICAgICAgIHJlcy5kYXRhLmRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoYXQuc2NyZWVuW2ldLmxpc3QgPSBhcnI7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGlwLmVycm9yKHJlcy5yZXR1cm5Nc2cpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICB9KS5jYXRjaChlcnI9PntcclxuXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvL+S/ruaUueihqOWNleaVsOaNrlxyXG4gICAgY2hhbmdlRGF0YSgpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgY29uc3Qge2Zvcm19ID0gdGhpc1xyXG4gICAgICBsZXQgb2JqID0gT2JqZWN0LmFzc2lnbihmb3JtLHtcclxuICAgICAgICB0b2tlbjp0aGF0LnRva2VuLFxyXG4gICAgICAgIHRva2VuS2V5OnRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgcmVzdW1laWQ6dGhhdC5yZXN1bWVpZFxyXG4gICAgICB9KTtcclxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgfSlcclxuICAgICAgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAxNFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IG9ialxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICBpZihyZXMuZGF0YSAmJiByZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgICAgICAgbGV0IHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgICAgcHJldlBhZ2UudXBkYXRlKDEpXHJcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB0aXAuZXJyb3IocmVzLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==