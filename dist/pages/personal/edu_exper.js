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
      navigationBarBackgroundColor: "#fafafa"
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkdV9leHBlci5qcyJdLCJuYW1lcyI6WyJtb250aEFyciIsIkJhc2VJbmZvIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwic2NyZWVuIiwibGlzdCIsImluZGV4Iiwic2Nob29sIiwic3BlY2lhbHR5aWQiLCJzdGFydHRpbWUiLCJlbmR0aW1lIiwiZWR1Y2F0aW9uYmciLCJlZHVjYXRpb25pZCIsInRva2VuIiwidG9rZW5LZXkiLCJyZXN1bWVpZCIsImxlbmd0aCIsImVuZHRpbWVBcnJheSIsImVuZHRpbWVJbmRleCIsInN0YXJ0dGltZUFycmF5Iiwic3RhcnR0aW1lSW5kZXgiLCJtZXRob2RzIiwiZW5kdGltZUNoYW5nZSIsImUiLCJ2IiwiZGV0YWlsIiwidmFsdWUiLCJtb250aCIsInBhcnNlSW50IiwiciIsIm11bHRpSW5kZXgiLCIkYXBwbHkiLCJlbmR0aW1lQ29sdW1uQ2hhbmdlIiwiY29sdW1uIiwiYXJyIiwic3RhcnR0aW1lQ2hhbmdlIiwic3RhcnR0aW1lQ29sdW1uQ2hhbmdlIiwiZGVsIiwiZGVsRXhwZXJpZW5jZSIsImZvcm1TdWJtaXQiLCJ0aGF0IiwiZXJyb3IiLCJhX2VkdWNhdGlvbmJnIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImluZGV4T2YiLCJyZXBsYWNlIiwiZm9ybWF0IiwiZGlmZiIsImNoYW5nZURhdGEiLCJpbnB1dENoYW5nZSIsIm5hbWUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsInBpY2tlckNoYW5nZSIsImN1cnJlbnQiLCJ0aW1lQ2hhbmdlIiwib3B0aW9ucyIsImxvZ2luIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImdldERhdGEiLCJpIiwiZ2V0RGljdCIsIm9uZSIsIm5vdyIsIkRhdGUiLCJjdXJyZW50WSIsImdldEZ1bGxZZWFyIiwiY3VycmVudE0iLCJnZXRNb250aCIsInB1c2giLCJhIiwibmV3QSIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJnZXRSZXN1bWVJbmZvIiwicXVlcnkiLCJoZWFkIiwidGhlbiIsInJlcyIsInJldHVybkNvZGUiLCJoaWRlTG9hZGluZyIsImpvYkV4cGVyIiwiSlNPTiIsInBhcnNlIiwicmVzdWx0QXJyIiwiZmluZCIsIml0ZW0iLCJyZXR1cm5Nc2ciLCJjb2RlIiwiZ2V0RGljdERhdGEiLCJmb3JFYWNoIiwibGFiZWwiLCJzaGlmdCIsImNhdGNoIiwic3VjY2VzcyIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwicHJldlBhZ2UiLCJ1cGRhdGUiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsIm9iaiIsImNvbnNvbGUiLCJsb2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFEQSxJQUFJQSxXQUFVLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsRUFBbkIsRUFBc0IsRUFBdEIsRUFBeUIsRUFBekIsQ0FBZDs7SUFHcUJDLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUVuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyxvQ0FBOEI7QUFGdkIsSyxRQUtUQyxJLEdBQU87QUFDTEMsY0FBTyxDQUNMO0FBQ0VDLGNBQUssRUFEUDtBQUVFQyxlQUFNO0FBRlIsT0FESyxDQURGO0FBT0xDLGNBQU8sRUFQRjtBQVFMQyxtQkFBWSxFQVJQO0FBU0xDLGlCQUFVLEVBVEw7QUFVTEMsZUFBUSxFQVZIO0FBV0xDLG1CQUFZLEVBWFA7QUFZTEMsbUJBQVksRUFaUDtBQWFMQyxhQUFPLEVBYkY7QUFjTEMsZ0JBQVUsRUFkTDtBQWVMQyxnQkFBUyxFQWZKO0FBZ0JMQyxjQUFPLENBaEJGO0FBaUJMQyxvQkFBYyxDQUFDLENBQUMsSUFBRCxDQUFELEVBQVMsQ0FBQyxJQUFELENBQVQsQ0FqQlQ7QUFr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QywyQkFBUThCLEtBQUs5QixPQVBOO0FBUVBDLCtCQUFZNkIsS0FBSzdCLFdBUlY7QUFTUEMsK0JBQVk0QixLQUFLNUI7QUFUVixpQjs7QUFXVCtDLG1CQUFHZSxXQUFILENBQWU7QUFDYkMseUJBQU87QUFETSxpQkFBZjtBQUdBLDhCQUFJQyxhQUFKLENBQWtCO0FBQ2hCQyx5QkFBTztBQUNIQywwQkFBTTtBQUNGLG1DQUFhLE9BRFg7QUFFRiw4QkFBUTtBQUZOLHFCQURIO0FBS0gzRSwwQkFBTW9HO0FBTEg7QUFEUyxpQkFBbEIsRUFRR3hCLElBUkgsQ0FRUSxlQUFLO0FBQ1hwQixxQkFBR3VCLFdBQUg7QUFDQSxzQkFBR0YsSUFBSTdFLElBQUosSUFBWTZFLElBQUk3RSxJQUFKLENBQVM4RSxVQUFULElBQXVCLFNBQXRDLEVBQWlEO0FBQzdDLHdCQUFJZ0IsUUFBUUMsaUJBQVo7QUFDQSx3QkFBSUMsV0FBV0YsTUFBTUEsTUFBTWpGLE1BQU4sR0FBZSxDQUFyQixDQUFmO0FBQ0FtRiw2QkFBU0MsTUFBVCxDQUFnQixDQUFoQjtBQUNBekMsdUJBQUcwQyxZQUFILENBQWdCO0FBQ2ZDLDZCQUFPO0FBRFEscUJBQWhCO0FBR0gsbUJBUEQsTUFPSztBQUNERSw0QkFBUUMsR0FBUixDQUFZdEcsSUFBWjtBQUNIO0FBRUYsaUJBckJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBdFVrQyxlQUFLdUcsSTs7a0JBQXRCM0csUSIsImZpbGUiOiJlZHVfZXhwZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbiAgaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG4gIGxldCBtb250aEFyciA9WzEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyXVxyXG4gIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlSW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5pWZ6IKy57uP5Y6GJyxcclxuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjZmFmYWZhXCIsXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgc2NyZWVuOltcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICBzY2hvb2w6JycsXHJcbiAgICAgIHNwZWNpYWx0eWlkOicnLFxyXG4gICAgICBzdGFydHRpbWU6JycsXHJcbiAgICAgIGVuZHRpbWU6JycsXHJcbiAgICAgIGVkdWNhdGlvbmJnOicnLFxyXG4gICAgICBlZHVjYXRpb25pZDonJyxcclxuICAgICAgdG9rZW46IFwiXCIsXHJcbiAgICAgIHRva2VuS2V5OiBcIlwiLFxyXG4gICAgICByZXN1bWVpZDonJyxcclxuICAgICAgbGVuZ3RoOjAsXHJcbiAgICAgIGVuZHRpbWVBcnJheTogW1sn6Iez5LuKJ10sIFsn6Iez5LuKJ11dLFxyXG4gICAgICBlbmR0aW1lSW5kZXg6IFswLCAwXSxcclxuICAgICAgc3RhcnR0aW1lQXJyYXk6IFtbJ+iHs+S7iiddLCBbXV0sXHJcbiAgICAgIHN0YXJ0dGltZUluZGV4OiBbMCwgMF0sXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGxldCBsb2dpbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dpbicpXHJcbiAgICAgIHRoYXQucmVzdW1laWQgPSBvcHRpb25zLnJlc3VtZWlkO1xyXG4gICAgICB0aGlzLmVkdWNhdGlvbmlkID0gb3B0aW9ucy5lZHVjYXRpb25pZCB8fCAnJztcclxuICAgICAgdGhhdC50b2tlbiA9IGxvZ2luLnRva2VuXHJcbiAgICAgIHRoYXQudG9rZW5LZXkgPSBsb2dpbi50b2tlbktleVxyXG4gICAgICB0aGF0LiRhcHBseSgpO1xyXG5cclxuICAgICAgaWYob3B0aW9ucy5lZHVjYXRpb25pZCkgdGhhdC5nZXREYXRhKClcclxuXHJcbiAgICAgIGNvbnN0IGFyciA9IFsnRElDVF9KT0JfRURVJ11cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGF0LmdldERpY3QoYXJyW2ldLGkpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBvbmUgPSBbXVxyXG4gICAgICBsZXQgbm93ID0gbmV3IERhdGUoKVxyXG4gICAgICBsZXQgY3VycmVudFkgPSBub3cuZ2V0RnVsbFllYXIoKVxyXG4gICAgICBsZXQgY3VycmVudE0gPSBub3cuZ2V0TW9udGgoKSsxXHJcblxyXG4gICAgICBmb3IodmFyIGk9MDtpPDMxO2krKyl7XHJcbiAgICAgICAgbGV0IHYgPSBjdXJyZW50WS1pXHJcbiAgICAgICAgb25lLnB1c2godisnJylcclxuICAgICAgICBpZihpPT0zMCkgb25lLnB1c2godisn5Lul5YmNJylcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHRoaXMuc3RhcnR0aW1lQXJyYXlbMF0gPSBvbmVcclxuICAgICAgdGhpcy5zdGFydHRpbWVBcnJheVsxXSA9IG1vbnRoQXJyXHJcbiAgICAgIGxldCBhPVsn6Iez5LuKJ11cclxuICAgICAgdmFyIG5ld0EgPSBbLi4uYSwuLi5vbmVdXHJcbiAgICAgIHRoaXMuZW5kdGltZUFycmF5WzBdID0gbmV3QVxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgZW5kdGltZUNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBjb25zdCB7ZW5kdGltZUFycmF5fSA9IHRoaXNcclxuICAgICAgICBsZXQgdiA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgaWYodlswXT09MCB8fCB2WzBdPT0zMil7XHJcbiAgICAgICAgICB0aGlzLmVuZHRpbWUgPSBlbmR0aW1lQXJyYXlbMF1bdlswXV1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGxldCBtb250aCA9IHBhcnNlSW50KHZbMV0pKzFcclxuICAgICAgICAgIGxldCByID0gbW9udGg8MTA/JzAnK21vbnRoOm1vbnRoXHJcbiAgICAgICAgICB0aGlzLmVuZHRpbWUgPWVuZHRpbWVBcnJheVswXVt2WzBdXSsnLycrIHJcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tdWx0aUluZGV4PSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfSxcclxuICAgICAgZW5kdGltZUNvbHVtbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgIGVuZHRpbWVBcnJheTogdGhpcy5lbmR0aW1lQXJyYXksXHJcbiAgICAgICAgICBlbmR0aW1lSW5kZXg6IHRoaXMuZW5kdGltZUluZGV4XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkYXRhLmVuZHRpbWVJbmRleFtlLmRldGFpbC5jb2x1bW5dID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgaWYoZS5kZXRhaWwuY29sdW1uPT0wKXtcclxuICAgICAgICAgIGlmKGRhdGEuZW5kdGltZUluZGV4WzBdPT0wKXtcclxuICAgICAgICAgICAgZGF0YS5lbmR0aW1lQXJyYXlbMV0gPSBbJ+iHs+S7iiddO1xyXG4gICAgICAgICAgICBkYXRhLmVuZHRpbWVJbmRleFsxXSA9IDBcclxuICAgICAgICAgIH1lbHNlIGlmKGRhdGEuZW5kdGltZUluZGV4WzBdPT0zMil7XHJcbiAgICAgICAgICAgIGxldCBhcnI9IGRhdGEuZW5kdGltZUFycmF5WzBdXHJcbiAgICAgICAgICAgIGRhdGEuZW5kdGltZUFycmF5WzFdID0gW2FyclthcnIubGVuZ3RoLTFdXVxyXG4gICAgICAgICAgICBkYXRhLmVuZHRpbWVJbmRleFsxXSA9IDBcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBkYXRhLmVuZHRpbWVBcnJheVsxXSA9IG1vbnRoQXJyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfSxcclxuICAgICAgc3RhcnR0aW1lQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGNvbnN0IHtzdGFydHRpbWVBcnJheX0gPSB0aGlzXHJcbiAgICAgICAgbGV0IHYgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIGlmKHZbMF09PTMxKXtcclxuICAgICAgICAgIHRoaXMuc3RhcnR0aW1lID0gc3RhcnR0aW1lQXJyYXlbMF1bdlswXV1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGxldCBtb250aCA9IHBhcnNlSW50KHZbMV0pKzFcclxuICAgICAgICAgIGxldCByID0gbW9udGg8MTA/JzAnK21vbnRoOm1vbnRoXHJcbiAgICAgICAgICB0aGlzLnN0YXJ0dGltZSA9c3RhcnR0aW1lQXJyYXlbMF1bdlswXV0rJy8nKyByXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXVsdGlJbmRleD0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH0sXHJcbiAgICAgIHN0YXJ0dGltZUNvbHVtbkNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgIHN0YXJ0dGltZUFycmF5OiB0aGlzLnN0YXJ0dGltZUFycmF5LFxyXG4gICAgICAgICAgc3RhcnR0aW1lSW5kZXg6IHRoaXMuc3RhcnR0aW1lSW5kZXhcclxuICAgICAgICB9O1xyXG4gICAgICAgIGRhdGEuc3RhcnR0aW1lSW5kZXhbZS5kZXRhaWwuY29sdW1uXSA9IGUuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgaWYoZGF0YS5zdGFydHRpbWVJbmRleFswXT09MzEpe1xyXG4gICAgICAgICAgICBsZXQgYXJyPSBkYXRhLnN0YXJ0dGltZUFycmF5WzBdXHJcbiAgICAgICAgICAgIGRhdGEuc3RhcnR0aW1lQXJyYXlbMV0gPSBbYXJyW2Fyci5sZW5ndGgtMV1dXHJcbiAgICAgICAgICAgIGRhdGEuc3RhcnR0aW1lSW5kZXhbMV0gPSAwXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZGF0YS5zdGFydHRpbWVBcnJheVsxXSA9IG1vbnRoQXJyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgICBkZWwoKXtcclxuICAgICAgICAgIHRoaXMuZGVsRXhwZXJpZW5jZSgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDmj5DkuqTooajljZUtLeWfuuacrOS/oeaBr+e8lui+keaWsOWinlxyXG4gICAgICAgIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICAgIGlmKCF0aGF0LnNjaG9vbCl7XHJcbiAgICAgICAgICAgICAgdGlwLmVycm9yKCflrabmoKHlkI3np7DkuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighdGhhdC5zcGVjaWFsdHlpZCl7XHJcbiAgICAgICAgICAgICAgdGlwLmVycm9yKCfkuJPkuJrkuI3kuLrnqbonKTtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZigoIXRoYXQuYV9lZHVjYXRpb25iZykmJnRoYXQuaW5kZXg9PScnKXtcclxuICAgICAgICAgICAgICB0aXAuZXJyb3IoJ+ivt+mAieaLqeaVmeiCsuiDjOaZrycpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCF0aGF0LnN0YXJ0dGltZSl7XHJcbiAgICAgICAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nlvIDlp4vml7bpl7QnKTtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighdGhhdC5lbmR0aW1lKXtcclxuICAgICAgICAgICAgICB0aXAuZXJyb3IoJ+ivt+mAieaLqee7k+adn+aXtumXtCcpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IHN0YXJ0VGltZT10aGF0LnN0YXJ0dGltZVxyXG4gICAgICAgICAgICBsZXQgZW5kVGltZT10aGF0LmVuZHRpbWVcclxuXHJcbiAgICAgICAgICAgIGlmKHN0YXJ0VGltZS5pbmRleE9mKCcvJykhPS0xKSBzdGFydFRpbWUgPSBzdGFydFRpbWUucmVwbGFjZSgvXFwvL2csXCItXCIpXHJcblxyXG4gICAgICAgICAgICBpZihtb21lbnQobW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NJykpLmRpZmYobW9tZW50KHN0YXJ0VGltZSksICdtb250aHMnKTwwKXtcclxuICAgICAgICAgICAgICB0aXAuZXJyb3IoJ+i1t+Wni+aXtumXtOS4jeiDveWkp+S6juW9k+WJjeaXtumXtCcpXHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHRoYXQuZW5kdGltZS5pbmRleE9mKCfku6XliY0nKSE9LTEmJnRoYXQuc3RhcnR0aW1lLmluZGV4T2YoJ+S7peWJjScpPT0tMSl7XHJcbiAgICAgICAgICAgICAgdGlwLmVycm9yKCfotbflp4vml7bpl7TkuI3og73lpKfkuo7nu5PmnZ/ml7bpl7QnKVxyXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGF0LnN0YXJ0dGltZS5pbmRleE9mKCfku6XliY0nKT09LTEmJih0aGF0LmVuZHRpbWUhPSfoh7Pku4onJiZ0aGF0LmVuZHRpbWUuaW5kZXhPZign5Lul5YmNJyk9PS0xKSl7XHJcblxyXG4gICAgICAgICAgICAgIGlmKGVuZFRpbWUuaW5kZXhPZignLycpIT0tMSkgZW5kVGltZSA9IGVuZFRpbWUucmVwbGFjZSgvXFwvL2csXCItXCIpXHJcbiAgICAgICAgICAgICAgaWYoc3RhcnRUaW1lLmluZGV4T2YoJy8nKSE9LTEpIHN0YXJ0VGltZSA9IHN0YXJ0VGltZS5yZXBsYWNlKC9cXC8vZyxcIi1cIilcclxuICAgICAgICAgICAgICBsZXQgZGlmZiA9IG1vbWVudChlbmRUaW1lKS5kaWZmKG1vbWVudChzdGFydFRpbWUpLCAnbW9udGhzJylcclxuICAgICAgICAgICAgICBpZihkaWZmPDApe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKCfotbflp4vml7bpl7TkuI3og73lpKfkuo7nu5PmnZ/ml7bpl7QnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRhKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlucHV0Q2hhbmdlKGUpe1xyXG4gICAgICAgICAgY29uc3QgbmFtZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgICAgIHRoaXNbbmFtZV0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwaWNrZXJDaGFuZ2UoZSl7XHJcbiAgICAgICAgICBjb25zdCBuYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICAgICAgY29uc3QgY3VycmVudCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnRcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICAgIHRoaXNbbmFtZV0gPSB0aGlzLnNjcmVlbltjdXJyZW50XS5saXN0W2luZGV4XVxyXG4gICAgICAgICAgdGhpcy5zY3JlZW5bY3VycmVudF0uaW5kZXggPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aW1lQ2hhbmdlOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBjb25zdCBuYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICAgICAgdGhpc1tuYW1lXSA9IGUuZGV0YWlsLnZhbHVlLnJlcGxhY2UoLy0vZyxcIi9cIik7XHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluaVmeiCsue7j+WOhlxyXG4gICAgYXN5bmMgZ2V0RGF0YSgpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0nLFxyXG4gICAgICB9KVxyXG4gICAgICBhcGkuZ2V0UmVzdW1lSW5mbyh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIk0wMDA2XCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhhdC50b2tlbktleSxcclxuICAgICAgICAgICAgICAgIFwicmVzdW1laWRcIjogdGhhdC5yZXN1bWVpZFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgICBpZiAocmVzLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICAgICB2YXIgam9iRXhwZXIgPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICAgIGxldCByZXN1bHRBcnIgPSBqb2JFeHBlci5maW5kKGl0ZW0gPT4gaXRlbS5lZHVjYXRpb25pZCA9PSB0aGF0LmVkdWNhdGlvbmlkKVxyXG4gICAgICAgICAgICAgIHRoYXQuc2Nob29sID0gcmVzdWx0QXJyLnNjaG9vbDtcclxuICAgICAgICAgICAgICB0aGF0Lmxlbmd0aCA9IGpvYkV4cGVyLmxlbmd0aDtcclxuICAgICAgICAgICAgICB0aGF0LnNwZWNpYWx0eWlkID0gcmVzdWx0QXJyLnNwZWNpYWx0eWlkO1xyXG4gICAgICAgICAgICAgIHRoYXQuc3RhcnR0aW1lID0gcmVzdWx0QXJyLnN0YXJ0dGltZTtcclxuICAgICAgICAgICAgICB0aGF0LmVuZHRpbWUgPSByZXN1bHRBcnIuZW5kdGltZTtcclxuICAgICAgICAgICAgICB0aGF0LmVkdWNhdGlvbmJnID0gcmVzdWx0QXJyLmVkdWNhdGlvbmJnO1xyXG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRpcC5lcnJvcihyZXMucmV0dXJuTXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluaVsOaNruWtl+WFuFxyXG4gICAgZ2V0RGljdChjb2RlLGkpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgYXBpLmdldERpY3REYXRhKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIkRDMDAxXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJncm91cGNvZGVcIjogY29kZSxcclxuICAgICAgICAgICAgICAgIFwic2VsQWxsXCI6IFwiZmFsc2VcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBbXVxyXG4gICAgICAgICAgICByZXMuZGF0YS5kYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtLmxhYmVsKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBhcnIuc2hpZnQoKVxyXG4gICAgICAgICAgICB0aGF0LnNjcmVlbltpXS5saXN0ID0gYXJyO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihyZXMucmV0dXJuTXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KS5jYXRjaChlcnI9PntcclxuXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yig6Zmk57uP5Y6GXHJcbiAgICBkZWxFeHBlcmllbmNlKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICBhcGkuZGVsRXhwZXJpZW5jZSh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJNMDAyOVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICB0b2tlbjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgICB0b2tlbktleTogdGhhdC50b2tlbktleSxcclxuICAgICAgICAgICAgICByZXN1bWVpZDp0aGF0LnJlc3VtZWlkLFxyXG4gICAgICAgICAgICAgIGVkdWNhdGlvbmlkOnRoYXQuZWR1Y2F0aW9uaWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgdGlwLnN1Y2Nlc3MoJ+WIoOmZpOaIkOWKnycpO1xyXG4gICAgICAgICAgbGV0IHBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKCk7XHJcbiAgICAgICAgICBsZXQgcHJldlBhZ2UgPSBwYWdlc1twYWdlcy5sZW5ndGggLSAyXTtcclxuICAgICAgICAgIHByZXZQYWdlLnVwZGF0ZSgzKVxyXG4gICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihyZXMucmV0dXJuTXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLmNhdGNoKGVycj0+e1xyXG5cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIC8v5L+u5pS56KGo5Y2V5pWw5o2uXHJcbiAgICBhc3luYyBjaGFuZ2VEYXRhKCkge1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgIC8vIGxldCBkYXRhID0gb2JqMlxyXG4gICAgICAgIC8vIGxldCByZXN1bHRPYmogPSBPYmplY3QuYXNzaWduKGRhdGEsIG9iaik7XHJcbiAgICAgIGxldCBvYmo9IHtcclxuICAgICAgICB0b2tlbjogdGhpcy50b2tlbixcclxuICAgICAgICB0b2tlbktleTogdGhpcy50b2tlbktleSxcclxuICAgICAgICByZXN1bWVpZDogdGhpcy5yZXN1bWVpZCxcclxuICAgICAgICBzY2hvb2w6dGhhdC5zY2hvb2wsXHJcbiAgICAgICAgc3BlY2lhbHR5aWQ6dGhhdC5zcGVjaWFsdHlpZCxcclxuICAgICAgICBzdGFydHRpbWU6dGhhdC5zdGFydHRpbWUsXHJcbiAgICAgICAgZW5kdGltZTp0aGF0LmVuZHRpbWUsXHJcbiAgICAgICAgZWR1Y2F0aW9uYmc6dGhhdC5lZHVjYXRpb25iZyxcclxuICAgICAgICBlZHVjYXRpb25pZDp0aGF0LmVkdWNhdGlvbmlkXHJcbiAgICAgIH1cclxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgfSlcclxuICAgICAgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiTTAwMTZcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiBvYmpcclxuICAgICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgaWYocmVzLmRhdGEgJiYgcmVzLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICBsZXQgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKTtcclxuICAgICAgICAgICAgbGV0IHByZXZQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMl07XHJcbiAgICAgICAgICAgIHByZXZQYWdlLnVwZGF0ZSgzKVxyXG4gICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICB9KVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=