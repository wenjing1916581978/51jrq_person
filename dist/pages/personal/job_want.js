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
      that.form.jobintentcode = options.code;
      that.$apply();

      if (options.functions) that.getData();
      if (options.type == 1) {
        var arr = ['DICT_JOB_JOBTYPE', 'DICT_COMP_INDUSTRY', 'DICT_RESUME_JOBSTATU', 'DICT_RESUME_ESC', 'DICT_RESUME_POSTTIME'];
        for (var i = 0; i < arr.length; i++) {
          that.getDict(arr[i], i);
        }
      } else {
        wx.setNavigationBarTitle({
          title: '自我评价'
        });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvYl93YW50LmpzIl0sIm5hbWVzIjpbIkJhc2VJbmZvIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwic2NyZWVuIiwibGlzdCIsImluZGV4IiwidG9rZW4iLCJ0b2tlbktleSIsInJlc3VtZWlkIiwidHlwZSIsImZvcm0iLCJqb2JpbnRlbnRjb2RlIiwiam9ibmF0dXJlIiwicG9zdGlkcyIsInNpdGVjaXR5IiwiZnVuY3Rpb25zIiwiZXhwZWN0c2FsYXJ5Y29kZSIsInBvc3RzdGltZSIsInNlbGZyZW1hcmsiLCJtZXRob2RzIiwiZm9ybVN1Ym1pdCIsImUiLCJ0aGF0IiwiZXJyb3IiLCJjaGFuZ2VEYXRhIiwiaW5wdXRDaGFuZ2UiLCJuYW1lIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInBpY2tlckNoYW5nZSIsImN1cnJlbnQiLCJvcHRpb25zIiwibG9naW4iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiY29kZSIsImdldERhdGEiLCJhcnIiLCJpIiwibGVuZ3RoIiwiZ2V0RGljdCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInRpdGxlIiwic2hvd0xvYWRpbmciLCJnZXRSZXN1bWVJbmZvIiwicXVlcnkiLCJoZWFkIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJyZXMiLCJyZXR1cm5Db2RlIiwiaGlkZUxvYWRpbmciLCJqb2IiLCJKU09OIiwicGFyc2UiLCJyZXR1cm5Nc2ciLCJjYXRjaCIsImdldERpY3REYXRhIiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwibGFiZWwiLCJvYmoiLCJPYmplY3QiLCJhc3NpZ24iLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsInByZXZQYWdlIiwidXBkYXRlIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7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bkQsSUFBSixJQUFZbUQsSUFBSW5ELElBQUosQ0FBU29ELFVBQVQsSUFBdUIsU0FBdEMsRUFBaUQ7QUFDN0MsY0FBSWUsUUFBUUMsaUJBQVo7QUFDQSxjQUFJQyxXQUFXRixNQUFNQSxNQUFNM0IsTUFBTixHQUFlLENBQXJCLENBQWY7QUFDQTZCLG1CQUFTQyxNQUFULENBQWdCLENBQWhCO0FBQ0FwQyxhQUFHcUMsWUFBSCxDQUFnQjtBQUNmQyxtQkFBTztBQURRLFdBQWhCO0FBR0gsU0FQRCxNQU9LO0FBQ0Qsd0JBQUluRCxLQUFKLENBQVU4QixJQUFJbkQsSUFBSixDQUFTeUQsU0FBbkI7QUFDSDtBQUVGLE9BckJIO0FBc0JEOzs7O0VBOU9tQyxlQUFLZ0IsSTs7a0JBQXRCN0UsUSIsImZpbGUiOiJqb2Jfd2FudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuICBpbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VJbmZvIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuXHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmsYLogYzmhI/lkJEnLFxyXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNmYWZhZmFcIixcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzY3JlZW46W1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpc3Q6W10sXHJcbiAgICAgICAgICBpbmRleDpbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpc3Q6W10sXHJcbiAgICAgICAgICBpbmRleDpbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpc3Q6W10sXHJcbiAgICAgICAgICBpbmRleDpbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpc3Q6W10sXHJcbiAgICAgICAgICBpbmRleDpbXSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGxpc3Q6W10sXHJcbiAgICAgICAgICBpbmRleDpbXSxcclxuICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHRva2VuOiBcIlwiLFxyXG4gICAgICB0b2tlbktleTogXCJcIixcclxuICAgICAgcmVzdW1laWQ6JycsXHJcbiAgICAgIHR5cGU6MSxcclxuICAgICAgZm9ybTp7XHJcbiAgICAgICAgam9iaW50ZW50Y29kZTonJyxcclxuICAgICAgICBqb2JuYXR1cmU6JycsXHJcbiAgICAgICAgcG9zdGlkczonJyxcclxuICAgICAgICBzaXRlY2l0eTonJyxcclxuICAgICAgICBmdW5jdGlvbnM6JycsXHJcbiAgICAgICAgZXhwZWN0c2FsYXJ5Y29kZTonJyxcclxuICAgICAgICBwb3N0c3RpbWU6JycsXHJcbiAgICAgICAgc2VsZnJlbWFyazonJyxcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBsZXQgbG9naW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW4nKVxyXG4gICAgICB0aGF0LnJlc3VtZWlkID0gb3B0aW9ucy5yZXN1bWVpZDtcclxuICAgICAgdGhhdC50eXBlID0gb3B0aW9ucy50eXBlO1xyXG4gICAgICB0aGF0LnRva2VuID0gbG9naW4udG9rZW5cclxuICAgICAgdGhhdC50b2tlbktleSA9IGxvZ2luLnRva2VuS2V5XHJcbiAgICAgIHRoYXQuZm9ybS5qb2JpbnRlbnRjb2RlID0gb3B0aW9ucy5jb2RlXHJcbiAgICAgIHRoYXQuJGFwcGx5KCk7XHJcblxyXG4gICAgICBpZihvcHRpb25zLmZ1bmN0aW9ucykgdGhhdC5nZXREYXRhKClcclxuICAgICAgaWYob3B0aW9ucy50eXBlPT0xKXtcclxuICAgICAgICBjb25zdCBhcnIgPSBbJ0RJQ1RfSk9CX0pPQlRZUEUnLCdESUNUX0NPTVBfSU5EVVNUUlknLCdESUNUX1JFU1VNRV9KT0JTVEFUVScsJ0RJQ1RfUkVTVU1FX0VTQycsJ0RJQ1RfUkVTVU1FX1BPU1RUSU1FJ11cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdGhhdC5nZXREaWN0KGFycltpXSxpKVxyXG4gICAgICAgIH1cclxuICAgICAgfWVsc2Uge1xyXG4gICAgICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XHJcbiAgICAgICAgICAgICAgdGl0bGU6ICfoh6rmiJHor4Tku7cnXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgICAvLyDmj5DkuqTooajljZUtLeWfuuacrOS/oeaBr+e8lui+keaWsOWinlxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgICAgICAgY29uc3Qge2Zvcm0sdHlwZX0gPSB0aGlzXHJcbiAgICAgICAgICAgIGlmKHR5cGU9PTEpe1xyXG4gICAgICAgICAgICAgIGlmKCFmb3JtLmpvYm5hdHVyZSl7XHJcbiAgICAgICAgICAgICAgICB0aXAuZXJyb3IoJ+ivt+mAieaLqeW3peS9nOexu+WeiycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmKCFmb3JtLnBvc3RpZHMpe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nmnJ/mnJvooYzkuJonKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZighZm9ybS5mdW5jdGlvbnMpe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKCfmnJ/mnJvogYzkvY3kuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZighZm9ybS5zaXRlY2l0eSl7XHJcbiAgICAgICAgICAgICAgICB0aXAuZXJyb3IoJ+acn+acm+WfjuW4guS4jeS4uuepuicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBpZighZm9ybS5leHBlY3RzYWxhcnljb2RlKXtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcign6K+36YCJ5oup5pyf5pyb5pyI6JaqJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYoIWZvcm0ucG9zdHN0aW1lKXtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcign6K+36YCJ5oup5Yiw5bKX5pe26Ze0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIGlmKCFmb3JtLnNlbGZyZW1hcmspe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKCfoh6rmiJHor4Tku7fkuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQuY2hhbmdlRGF0YSgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnB1dENoYW5nZShlKXtcclxuICAgICAgICAgIGNvbnN0IHsgZm9ybSB9PXRoaXNcclxuICAgICAgICAgIGNvbnN0IG5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICAgICBmb3JtW25hbWVdID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGlja2VyQ2hhbmdlKGUpe1xyXG4gICAgICAgICAgY29uc3QgeyBmb3JtIH09dGhpc1xyXG4gICAgICAgICAgY29uc3QgbmFtZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50XHJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICBmb3JtW25hbWVdID0gdGhpcy5zY3JlZW5bY3VycmVudF0ubGlzdFtpbmRleF1cclxuICAgICAgICAgIHRoaXMuc2NyZWVuW2N1cnJlbnRdLmluZGV4ID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlueugOWOhuWfuuacrOS/oeaBr1xyXG4gICAgZ2V0RGF0YSgpIHtcclxuICAgICAgY29uc3QgIHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgfSlcclxuICAgICAgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMDRcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBcInRva2VuXCI6IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICBcInJlc3VtZWlkXCI6IHRoYXQucmVzdW1laWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXMsJ+iOt+WPluWfuuacrOS/oeaBrycpXHJcbiAgICAgICAgaWYgKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgdmFyIGpvYiA9IEpTT04ucGFyc2UocmVzLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoYXQuZm9ybSA9IHtcclxuICAgICAgICAgICAgICBqb2JpbnRlbnRjb2RlOmpvYi5qb2JpbnRlbnRjb2RlICxcclxuICAgICAgICAgICAgICBqb2JuYXR1cmU6am9iLmpvYm5hdHVyZSAsXHJcbiAgICAgICAgICAgICAgcG9zdGlkczpqb2IucG9zdGlkcyAsXHJcbiAgICAgICAgICAgICAgc2l0ZWNpdHk6am9iLnNpdGVjaXR5ICxcclxuICAgICAgICAgICAgICBmdW5jdGlvbnM6am9iLmZ1bmN0aW9ucyAsXHJcbiAgICAgICAgICAgICAgZXhwZWN0c2FsYXJ5Y29kZTpqb2IuZXhwZWN0c2FsYXJ5Y29kZSAsXHJcbiAgICAgICAgICAgICAgcG9zdHN0aW1lOmpvYi5wb3N0c3RpbWUgLFxyXG4gICAgICAgICAgICAgIHNlbGZyZW1hcms6am9iLnNlbGZyZW1hcmtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgdGlwLmVycm9yKHJlcy5yZXR1cm5Nc2cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pLmNhdGNoKGVycj0+e1xyXG5cclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluaVsOaNruWtl+WFuFxyXG4gICAgZ2V0RGljdChjb2RlLGkpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgYXBpLmdldERpY3REYXRhKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIkRDMDAxXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJncm91cGNvZGVcIjogY29kZSxcclxuICAgICAgICAgICAgICAgIFwic2VsQWxsXCI6IFwiZmFsc2VcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcz0+e1xyXG5cclxuICAgICAgICBpZiAocmVzLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICB2YXIgYXJyID0gW11cclxuICAgICAgICAgICAgcmVzLmRhdGEuZGF0YS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhhdC5zY3JlZW5baV0ubGlzdCA9IGFycjtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IocmVzLnJldHVybk1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgIH0pLmNhdGNoKGVycj0+e1xyXG5cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8v5L+u5pS56KGo5Y2V5pWw5o2uXHJcbiAgICBjaGFuZ2VEYXRhKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICBjb25zdCB7Zm9ybX0gPSB0aGlzXHJcbiAgICAgIGxldCBvYmogPSBPYmplY3QuYXNzaWduKGZvcm0se1xyXG4gICAgICAgIHRva2VuOnRoYXQudG9rZW4sXHJcbiAgICAgICAgdG9rZW5LZXk6dGhhdC50b2tlbktleSxcclxuICAgICAgICByZXN1bWVpZDp0aGF0LnJlc3VtZWlkXHJcbiAgICAgIH0pO1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICB9KVxyXG4gICAgICBhcGkuZ2V0UmVzdW1lSW5mbyh7XHJcbiAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDE0XCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YTogb2JqXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgIGlmKHJlcy5kYXRhICYmIHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgICBsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgICAgICAgICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgICAgICBwcmV2UGFnZS51cGRhdGUoMSlcclxuICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHRpcC5lcnJvcihyZXMuZGF0YS5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuIl19