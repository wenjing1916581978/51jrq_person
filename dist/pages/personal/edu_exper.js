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
      navigationBarTitleText: '教育经历',
      navigationBarBackgroundColor: "#fafafa",
      usingComponents: {
        "i-modal": "../../iview/modal/index"
      }
    }, _this.data = {
      screen: [{
        list: [],
        index: []
      }],
      school: '',
      specialtyid: '',
      starttime: '',
      endtime: '',
      educationbg: '',
      educationid: '',
      token: "",
      tokenKey: "",
      resumeid: '',
      length: 0,
      endtimeArray: [['至今'], ['至今']],
      endtimeIndex: [0, 0],
      starttimeArray: [['至今'], []],
      starttimeIndex: [0, 0],
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

      // 提交表单--基本信息编辑新增
      formSubmit: function formSubmit(e) {
        var that = this;
        if (!that.school) {
          _tip2.default.error('学校名称不为空');
          return false;
        }
        if (!that.specialtyid) {
          _tip2.default.error('专业不为空');
          return false;
        }
        if (!that.a_educationbg && that.index == '') {
          _tip2.default.error('请选择教育背景');
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
      pickerChange: function pickerChange(e) {
        var name = e.currentTarget.dataset.name;
        var current = e.currentTarget.dataset.current;
        var index = e.detail.value;
        this[name] = this.screen[current].list[index];
        this.screen[current].index = e.detail.value;
        this.$apply();
      },

      timeChange: function timeChange(e) {
        var name = e.currentTarget.dataset.name;
        this[name] = e.detail.value.replace(/-/g, "/");
        this.$apply();
      }

      //获取教育经历
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BaseInfo, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var that = this;
      var login = wx.getStorageSync('login');
      that.resumeid = options.resumeid;
      this.educationid = options.educationid || '';
      that.token = login.token;
      that.tokenKey = login.tokenKey;
      that.$apply();

      if (options.educationid) that.getData();

      var arr = ['DICT_JOB_EDU'];
      for (var i = 0; i < arr.length; i++) {
        that.getDict(arr[i], i);
      }

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
                      "transcode": "M0006",
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
                      return item.educationid == that.educationid;
                    });
                    that.school = resultArr.school;
                    that.length = jobExper.length;
                    that.specialtyid = resultArr.specialtyid;
                    that.starttime = resultArr.starttime;
                    that.endtime = resultArr.endtime;
                    that.educationbg = resultArr.educationbg;
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
          arr.shift();
          that.screen[i].list = arr;
          that.$apply();
        } else {
          _tip2.default.error(res.returnMsg);
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
            "transcode": "M0029",
            "type": "h"
          },
          data: {
            token: that.token,
            tokenKey: that.tokenKey,
            resumeid: that.resumeid,
            educationid: that.educationid
          }
        }
      }).then(function (res) {
        if (res.data && res.data.returnCode == "AAAAAAA") {
          _tip2.default.success('删除成功');
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.update(3);
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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var that, obj;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = this;
                // let data = obj2
                // let resultObj = Object.assign(data, obj);

                obj = {
                  token: this.token,
                  tokenKey: this.tokenKey,
                  resumeid: this.resumeid,
                  school: that.school,
                  specialtyid: that.specialtyid,
                  starttime: that.starttime,
                  endtime: that.endtime,
                  educationbg: that.educationbg,
                  educationid: that.educationid
                };

                wx.showLoading({
                  title: '加载中'
                });
                _api2.default.getResumeInfo({
                  query: {
                    head: {
                      "transcode": "M0016",
                      "type": "h"
                    },
                    data: obj
                  }
                }).then(function (res) {
                  wx.hideLoading();
                  if (res.data && res.data.returnCode == "AAAAAAA") {
                    var pages = getCurrentPages();
                    var prevPage = pages[pages.length - 2];
                    prevPage.update(3);
                    wx.navigateBack({
                      delta: 1
                    });
                  } else {
                    console.log(data);
                  }
                });

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function changeData() {
        return _ref3.apply(this, arguments);
      }

      return changeData;
    }()
  }]);

  return BaseInfo;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseInfo , 'pages/personal/edu_exper'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkdV9leHBlci5qcyJdLCJuYW1lcyI6WyJtb250aEFyciIsIkJhc2VJbmZvIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJ1c2luZ0NvbXBvbmVudHMiLCJkYXRhIiwic2NyZWVuIiwibGlzdCIsImluZGV4Iiwic2Nob29sIiwic3BlY2lhbHR5aWQiLCJzdGFydHRpbWUiLCJlbmR0aW1lIiwiZWR1Y2F0aW9uYmciLCJlZHVjYXRpb25pZCIsInRva2VuIiwidG9rZW5LZXkiLCJyZXN1bWVpZCIsImxlbmd0aCIsImVuZHRpbWVBcnJheSIsImVuZHRpbWVJbmRleCIsInN0YXJ0dGltZUFycmF5Iiwic3RhcnR0aW1lSW5kZXgiLCJ2aXNpYmxlIiwibWV0aG9kcyIsImhhbmRsZU9rIiwiZGVsRXhwZXJpZW5jZSIsInRvZ2dsZU0iLCJjb25zb2xlIiwibG9nIiwiJGFwcGx5IiwiZW5kdGltZUNoYW5nZSIsImUiLCJ2IiwiZGV0YWlsIiwidmFsdWUiLCJtb250aCIsInBhcnNlSW50IiwiciIsIm11bHRpSW5kZXgiLCJlbmR0aW1lQ29sdW1uQ2hhbmdlIiwiY29sdW1uIiwiYXJyIiwic3RhcnR0aW1lQ2hhbmdlIiwic3RhcnR0aW1lQ29sdW1uQ2hhbmdlIiwiZm9ybVN1Ym1pdCIsInRoYXQiLCJlcnJvciIsImFfZWR1Y2F0aW9uYmciLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJmb3JtYXQiLCJkaWZmIiwiY2hhbmdlRGF0YSIsImlucHV0Q2hhbmdlIiwibmFtZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwicGlja2VyQ2hhbmdlIiwiY3VycmVudCIsInRpbWVDaGFuZ2UiLCJvcHRpb25zIiwibG9naW4iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0RGF0YSIsImkiLCJnZXREaWN0Iiwib25lIiwibm93IiwiRGF0ZSIsImN1cnJlbnRZIiwiZ2V0RnVsbFllYXIiLCJjdXJyZW50TSIsImdldE1vbnRoIiwicHVzaCIsImEiLCJuZXdBIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImdldFJlc3VtZUluZm8iLCJxdWVyeSIsImhlYWQiLCJ0aGVuIiwicmVzIiwicmV0dXJuQ29kZSIsImhpZGVMb2FkaW5nIiwiam9iRXhwZXIiLCJKU09OIiwicGFyc2UiLCJyZXN1bHRBcnIiLCJmaW5kIiwiaXRlbSIsInJldHVybk1zZyIsImNvZGUiLCJnZXREaWN0RGF0YSIsImZvckVhY2giLCJsYWJlbCIsInNoaWZ0IiwiY2F0Y2giLCJzdWNjZXNzIiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJwcmV2UGFnZSIsInVwZGF0ZSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwib2JqIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBREEsSUFBSUEsV0FBVSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLEVBQW5CLEVBQXNCLEVBQXRCLEVBQXlCLEVBQXpCLENBQWQ7O0lBR3FCQyxROzs7Ozs7Ozs7Ozs7OzswTEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsb0NBQThCLFNBRnZCO0FBR1BDLHVCQUFpQjtBQUNmLG1CQUFXO0FBREk7QUFIVixLLFFBUVRDLEksR0FBTztBQUNMQyxjQUFPLENBQ0w7QUFDRUMsY0FBSyxFQURQO0FBRUVDLGVBQU07QUFGUixPQURLLENBREY7QUFPTEMsY0FBTyxFQVBGO0FBUUxDLG1CQUFZLEVBUlA7QUFTTEMsaUJBQVUsRUFUTDtBQVVMQyxlQUFRLEVBVkg7QUFXTEMsbUJBQVksRUFYUDtBQVlMQyxtQkFBWSxFQVpQO0FBYUxDLGFBQU8sRUFiRjtBQWNMQyxnQkFBVSxFQWRMO0FBZUxDLGdCQUFTLEVBZko7QUFn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cm9tICd3ZXB5J1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbiAgaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG4gIGxldCBtb250aEFyciA9WzEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyXVxyXG4gIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlSW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pWZ6IKy57uP5Y6GJyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjZmFmYWZhXCIsXHJcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xyXG4gICAgICAgIFwiaS1tb2RhbFwiOiBcIi4uLy4uL2l2aWV3L21vZGFsL2luZGV4XCJcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIHNjcmVlbjpbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbGlzdDpbXSxcclxuICAgICAgICAgIGluZGV4OltdLFxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgc2Nob29sOicnLFxyXG4gICAgICBzcGVjaWFsdHlpZDonJyxcclxuICAgICAgc3RhcnR0aW1lOicnLFxyXG4gICAgICBlbmR0aW1lOicnLFxyXG4gICAgICBlZHVjYXRpb25iZzonJyxcclxuICAgICAgZWR1Y2F0aW9uaWQ6JycsXHJcbiAgICAgIHRva2VuOiBcIlwiLFxyXG4gICAgICB0b2tlbktleTogXCJcIixcclxuICAgICAgcmVzdW1laWQ6JycsXHJcbiAgICAgIGxlbmd0aDowLFxyXG4gICAgICBlbmR0aW1lQXJyYXk6IFtbJ+iHs+S7iiddLCBbJ+iHs+S7iiddXSxcclxuICAgICAgZW5kdGltZUluZGV4OiBbMCwgMF0sXHJcbiAgICAgIHN0YXJ0dGltZUFycmF5OiBbWyfoh7Pku4onXSwgW11dLFxyXG4gICAgICBzdGFydHRpbWVJbmRleDogWzAsIDBdLFxyXG4gICAgICB2aXNpYmxlOmZhbHNlLFxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBsZXQgbG9naW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW4nKVxyXG4gICAgICB0aGF0LnJlc3VtZWlkID0gb3B0aW9ucy5yZXN1bWVpZDtcclxuICAgICAgdGhpcy5lZHVjYXRpb25pZCA9IG9wdGlvbnMuZWR1Y2F0aW9uaWQgfHwgJyc7XHJcbiAgICAgIHRoYXQudG9rZW4gPSBsb2dpbi50b2tlblxyXG4gICAgICB0aGF0LnRva2VuS2V5ID0gbG9naW4udG9rZW5LZXlcclxuICAgICAgdGhhdC4kYXBwbHkoKTtcclxuXHJcbiAgICAgIGlmKG9wdGlvbnMuZWR1Y2F0aW9uaWQpIHRoYXQuZ2V0RGF0YSgpXHJcblxyXG4gICAgICBjb25zdCBhcnIgPSBbJ0RJQ1RfSk9CX0VEVSddXHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhhdC5nZXREaWN0KGFycltpXSxpKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgb25lID0gW11cclxuICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKClcclxuICAgICAgbGV0IGN1cnJlbnRZID0gbm93LmdldEZ1bGxZZWFyKClcclxuICAgICAgbGV0IGN1cnJlbnRNID0gbm93LmdldE1vbnRoKCkrMVxyXG5cclxuICAgICAgZm9yKHZhciBpPTA7aTwzMTtpKyspe1xyXG4gICAgICAgIGxldCB2ID0gY3VycmVudFktaVxyXG4gICAgICAgIG9uZS5wdXNoKHYrJycpXHJcbiAgICAgICAgaWYoaT09MzApIG9uZS5wdXNoKHYrJ+S7peWJjScpXHJcbiAgICAgIH1cclxuXHJcblxyXG4gICAgICB0aGlzLnN0YXJ0dGltZUFycmF5WzBdID0gb25lXHJcbiAgICAgIHRoaXMuc3RhcnR0aW1lQXJyYXlbMV0gPSBtb250aEFyclxyXG4gICAgICBsZXQgYT1bJ+iHs+S7iiddXHJcbiAgICAgIHZhciBuZXdBID0gWy4uLmEsLi4ub25lXVxyXG4gICAgICB0aGlzLmVuZHRpbWVBcnJheVswXSA9IG5ld0FcclxuICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGhhbmRsZU9rKCl7XHJcbiAgICAgICAgdGhpcy5kZWxFeHBlcmllbmNlKClcclxuICAgICAgfSxcclxuICAgICAgdG9nZ2xlTSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfliIfmjaLnirbmgIEnKVxyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9ICF0aGlzLnZpc2libGVcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZHRpbWVDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgY29uc3Qge2VuZHRpbWVBcnJheX0gPSB0aGlzXHJcbiAgICAgICAgbGV0IHYgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIGlmKHZbMF09PTAgfHwgdlswXT09MzIpe1xyXG4gICAgICAgICAgdGhpcy5lbmR0aW1lID0gZW5kdGltZUFycmF5WzBdW3ZbMF1dXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBsZXQgbW9udGggPSBwYXJzZUludCh2WzFdKSsxXHJcbiAgICAgICAgICBsZXQgciA9IG1vbnRoPDEwPycwJyttb250aDptb250aFxyXG4gICAgICAgICAgdGhpcy5lbmR0aW1lID1lbmR0aW1lQXJyYXlbMF1bdlswXV0rJy8nKyByXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXVsdGlJbmRleD0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZHRpbWVDb2x1bW5DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICBlbmR0aW1lQXJyYXk6IHRoaXMuZW5kdGltZUFycmF5LFxyXG4gICAgICAgICAgZW5kdGltZUluZGV4OiB0aGlzLmVuZHRpbWVJbmRleFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGF0YS5lbmR0aW1lSW5kZXhbZS5kZXRhaWwuY29sdW1uXSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgIGlmKGUuZGV0YWlsLmNvbHVtbj09MCl7XHJcbiAgICAgICAgICBpZihkYXRhLmVuZHRpbWVJbmRleFswXT09MCl7XHJcbiAgICAgICAgICAgIGRhdGEuZW5kdGltZUFycmF5WzFdID0gWyfoh7Pku4onXTtcclxuICAgICAgICAgICAgZGF0YS5lbmR0aW1lSW5kZXhbMV0gPSAwXHJcbiAgICAgICAgICB9ZWxzZSBpZihkYXRhLmVuZHRpbWVJbmRleFswXT09MzIpe1xyXG4gICAgICAgICAgICBsZXQgYXJyPSBkYXRhLmVuZHRpbWVBcnJheVswXVxyXG4gICAgICAgICAgICBkYXRhLmVuZHRpbWVBcnJheVsxXSA9IFthcnJbYXJyLmxlbmd0aC0xXV1cclxuICAgICAgICAgICAgZGF0YS5lbmR0aW1lSW5kZXhbMV0gPSAwXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZGF0YS5lbmR0aW1lQXJyYXlbMV0gPSBtb250aEFyclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0YXJ0dGltZUNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBjb25zdCB7c3RhcnR0aW1lQXJyYXl9ID0gdGhpc1xyXG4gICAgICAgIGxldCB2ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICBpZih2WzBdPT0zMSl7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0dGltZSA9IHN0YXJ0dGltZUFycmF5WzBdW3ZbMF1dXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBsZXQgbW9udGggPSBwYXJzZUludCh2WzFdKSsxXHJcbiAgICAgICAgICBsZXQgciA9IG1vbnRoPDEwPycwJyttb250aDptb250aFxyXG4gICAgICAgICAgdGhpcy5zdGFydHRpbWUgPXN0YXJ0dGltZUFycmF5WzBdW3ZbMF1dKycvJysgclxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11bHRpSW5kZXg9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9LFxyXG4gICAgICBzdGFydHRpbWVDb2x1bW5DaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSB7XHJcbiAgICAgICAgICBzdGFydHRpbWVBcnJheTogdGhpcy5zdGFydHRpbWVBcnJheSxcclxuICAgICAgICAgIHN0YXJ0dGltZUluZGV4OiB0aGlzLnN0YXJ0dGltZUluZGV4XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkYXRhLnN0YXJ0dGltZUluZGV4W2UuZGV0YWlsLmNvbHVtbl0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgIGlmKGRhdGEuc3RhcnR0aW1lSW5kZXhbMF09PTMxKXtcclxuICAgICAgICAgICAgbGV0IGFycj0gZGF0YS5zdGFydHRpbWVBcnJheVswXVxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0dGltZUFycmF5WzFdID0gW2FyclthcnIubGVuZ3RoLTFdXVxyXG4gICAgICAgICAgICBkYXRhLnN0YXJ0dGltZUluZGV4WzFdID0gMFxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGRhdGEuc3RhcnR0aW1lQXJyYXlbMV0gPSBtb250aEFyclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8g5o+Q5Lqk6KGo5Y2VLS3ln7rmnKzkv6Hmga/nvJbovpHmlrDlop5cclxuICAgICAgICBmb3JtU3VibWl0OiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgICAgICBpZighdGhhdC5zY2hvb2wpe1xyXG4gICAgICAgICAgICAgIHRpcC5lcnJvcign5a2m5qCh5ZCN56ew5LiN5Li656m6Jyk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXRoYXQuc3BlY2lhbHR5aWQpe1xyXG4gICAgICAgICAgICAgIHRpcC5lcnJvcign5LiT5Lia5LiN5Li656m6Jyk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoKCF0aGF0LmFfZWR1Y2F0aW9uYmcpJiZ0aGF0LmluZGV4PT0nJyl7XHJcbiAgICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nmlZnogrLog4zmma8nKTtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighdGhhdC5zdGFydHRpbWUpe1xyXG4gICAgICAgICAgICAgIHRpcC5lcnJvcign6K+36YCJ5oup5byA5aeL5pe26Ze0Jyk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXRoYXQuZW5kdGltZSl7XHJcbiAgICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nnu5PmnZ/ml7bpl7QnKTtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBzdGFydFRpbWU9dGhhdC5zdGFydHRpbWVcclxuICAgICAgICAgICAgbGV0IGVuZFRpbWU9dGhhdC5lbmR0aW1lXHJcblxyXG4gICAgICAgICAgICBpZihzdGFydFRpbWUuaW5kZXhPZignLycpIT0tMSkgc3RhcnRUaW1lID0gc3RhcnRUaW1lLnJlcGxhY2UoL1xcLy9nLFwiLVwiKVxyXG5cclxuICAgICAgICAgICAgaWYobW9tZW50KG1vbWVudCgpLmZvcm1hdCgnWVlZWS1NTScpKS5kaWZmKG1vbWVudChzdGFydFRpbWUpLCAnbW9udGhzJyk8MCl7XHJcbiAgICAgICAgICAgICAgdGlwLmVycm9yKCfotbflp4vml7bpl7TkuI3og73lpKfkuo7lvZPliY3ml7bpl7QnKVxyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGF0LmVuZHRpbWUuaW5kZXhPZign5Lul5YmNJykhPS0xJiZ0aGF0LnN0YXJ0dGltZS5pbmRleE9mKCfku6XliY0nKT09LTEpe1xyXG4gICAgICAgICAgICAgIHRpcC5lcnJvcign6LW35aeL5pe26Ze05LiN6IO95aSn5LqO57uT5p2f5pe26Ze0JylcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhhdC5zdGFydHRpbWUuaW5kZXhPZign5Lul5YmNJyk9PS0xJiYodGhhdC5lbmR0aW1lIT0n6Iez5LuKJyYmdGhhdC5lbmR0aW1lLmluZGV4T2YoJ+S7peWJjScpPT0tMSkpe1xyXG5cclxuICAgICAgICAgICAgICBpZihlbmRUaW1lLmluZGV4T2YoJy8nKSE9LTEpIGVuZFRpbWUgPSBlbmRUaW1lLnJlcGxhY2UoL1xcLy9nLFwiLVwiKVxyXG4gICAgICAgICAgICAgIGlmKHN0YXJ0VGltZS5pbmRleE9mKCcvJykhPS0xKSBzdGFydFRpbWUgPSBzdGFydFRpbWUucmVwbGFjZSgvXFwvL2csXCItXCIpXHJcbiAgICAgICAgICAgICAgbGV0IGRpZmYgPSBtb21lbnQoZW5kVGltZSkuZGlmZihtb21lbnQoc3RhcnRUaW1lKSwgJ21vbnRocycpXHJcbiAgICAgICAgICAgICAgaWYoZGlmZjwwKXtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcign6LW35aeL5pe26Ze05LiN6IO95aSn5LqO57uT5p2f5pe26Ze0JylcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0YSgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbnB1dENoYW5nZShlKXtcclxuICAgICAgICAgIGNvbnN0IG5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICAgICB0aGlzW25hbWVdID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGlja2VyQ2hhbmdlKGUpe1xyXG4gICAgICAgICAgY29uc3QgbmFtZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50XHJcbiAgICAgICAgICBjb25zdCBpbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgICB0aGlzW25hbWVdID0gdGhpcy5zY3JlZW5bY3VycmVudF0ubGlzdFtpbmRleF1cclxuICAgICAgICAgIHRoaXMuc2NyZWVuW2N1cnJlbnRdLmluZGV4ID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZUNoYW5nZTogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgY29uc3QgbmFtZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICAgIHRoaXNbbmFtZV0gPSBlLmRldGFpbC52YWx1ZS5yZXBsYWNlKC8tL2csXCIvXCIpO1xyXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlZnogrLnu4/ljoZcclxuICAgIGFzeW5jIGdldERhdGEoKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgfSlcclxuICAgICAgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAwNlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBcInRva2VuXCI6IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICBcInJlc3VtZWlkXCI6IHRoYXQucmVzdW1laWRcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICAgICAgdmFyIGpvYkV4cGVyID0gSlNPTi5wYXJzZShyZXMuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICBsZXQgcmVzdWx0QXJyID0gam9iRXhwZXIuZmluZChpdGVtID0+IGl0ZW0uZWR1Y2F0aW9uaWQgPT0gdGhhdC5lZHVjYXRpb25pZClcclxuICAgICAgICAgICAgICB0aGF0LnNjaG9vbCA9IHJlc3VsdEFyci5zY2hvb2w7XHJcbiAgICAgICAgICAgICAgdGhhdC5sZW5ndGggPSBqb2JFeHBlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgdGhhdC5zcGVjaWFsdHlpZCA9IHJlc3VsdEFyci5zcGVjaWFsdHlpZDtcclxuICAgICAgICAgICAgICB0aGF0LnN0YXJ0dGltZSA9IHJlc3VsdEFyci5zdGFydHRpbWU7XHJcbiAgICAgICAgICAgICAgdGhhdC5lbmR0aW1lID0gcmVzdWx0QXJyLmVuZHRpbWU7XHJcbiAgICAgICAgICAgICAgdGhhdC5lZHVjYXRpb25iZyA9IHJlc3VsdEFyci5lZHVjYXRpb25iZztcclxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aXAuZXJyb3IocmVzLnJldHVybk1zZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlbDmja7lrZflhbhcclxuICAgIGdldERpY3QoY29kZSxpKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgIGFwaS5nZXREaWN0RGF0YSh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJEQzAwMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIFwiZ3JvdXBjb2RlXCI6IGNvZGUsXHJcbiAgICAgICAgICAgICAgICBcInNlbEFsbFwiOiBcImZhbHNlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICBpZiAocmVzLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICB2YXIgYXJyID0gW11cclxuICAgICAgICAgICAgcmVzLmRhdGEuZGF0YS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgYXJyLnNoaWZ0KClcclxuICAgICAgICAgICAgdGhhdC5zY3JlZW5baV0ubGlzdCA9IGFycjtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IocmVzLnJldHVybk1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSkuY2F0Y2goZXJyPT57XHJcblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIoOmZpOe7j+WOhlxyXG4gICAgZGVsRXhwZXJpZW5jZSgpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgYXBpLmRlbEV4cGVyaWVuY2Uoe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMjlcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgdG9rZW46IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICAgICAgdG9rZW5LZXk6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgcmVzdW1laWQ6dGhhdC5yZXN1bWVpZCxcclxuICAgICAgICAgICAgICBlZHVjYXRpb25pZDp0aGF0LmVkdWNhdGlvbmlkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgIHRpcC5zdWNjZXNzKCfliKDpmaTmiJDlip8nKTtcclxuICAgICAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpO1xyXG4gICAgICAgICAgbGV0IHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICBwcmV2UGFnZS51cGRhdGUoMylcclxuICAgICAgICAgIHd4Lm5hdmlnYXRlQmFjayh7XHJcbiAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IocmVzLnJldHVybk1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaChlcnI9PntcclxuXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvL+S/ruaUueihqOWNleaVsOaNrlxyXG4gICAgYXN5bmMgY2hhbmdlRGF0YSgpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgICAvLyBsZXQgZGF0YSA9IG9iajJcclxuICAgICAgICAvLyBsZXQgcmVzdWx0T2JqID0gT2JqZWN0LmFzc2lnbihkYXRhLCBvYmopO1xyXG4gICAgICBsZXQgb2JqPSB7XHJcbiAgICAgICAgdG9rZW46IHRoaXMudG9rZW4sXHJcbiAgICAgICAgdG9rZW5LZXk6IHRoaXMudG9rZW5LZXksXHJcbiAgICAgICAgcmVzdW1laWQ6IHRoaXMucmVzdW1laWQsXHJcbiAgICAgICAgc2Nob29sOnRoYXQuc2Nob29sLFxyXG4gICAgICAgIHNwZWNpYWx0eWlkOnRoYXQuc3BlY2lhbHR5aWQsXHJcbiAgICAgICAgc3RhcnR0aW1lOnRoYXQuc3RhcnR0aW1lLFxyXG4gICAgICAgIGVuZHRpbWU6dGhhdC5lbmR0aW1lLFxyXG4gICAgICAgIGVkdWNhdGlvbmJnOnRoYXQuZWR1Y2F0aW9uYmcsXHJcbiAgICAgICAgZWR1Y2F0aW9uaWQ6dGhhdC5lZHVjYXRpb25pZFxyXG4gICAgICB9XHJcbiAgICAgIHd4LnNob3dMb2FkaW5nKHtcclxuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgIH0pXHJcbiAgICAgIGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDE2XCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YTogb2JqXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIGlmKHJlcy5kYXRhICYmIHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgICAgIGxldCBwcmV2UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDJdO1xyXG4gICAgICAgICAgICBwcmV2UGFnZS51cGRhdGUoMylcclxuICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgfSlcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuIl19