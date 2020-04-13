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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var resumePage = function (_wepy$page) {
  _inherits(resumePage, _wepy$page);

  function resumePage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, resumePage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = resumePage.__proto__ || Object.getPrototypeOf(resumePage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '我的简历'
    }, _this.data = {
      baseInfo: {}, // 基本信息
      jobApply: {}, // 求职意向
      workExper: {}, // 工作经历
      eduExper: {}, // 教育经历
      projectExper: {}, // 项目经验
      certificate: {}, // 证书
      sex: true,
      token: '',
      tokenKey: '',
      headimg: '',
      resumeid: '',
      operateShow: false,
      sexStatus: false,
      tempPortraitFilePath: '',
      headimgStatus: false
    }, _this.methods = {
      noidtips: function noidtips() {
        _tip2.default.error('请先完成基本信息编辑');
      },

      // 基本信息编辑新增
      goBaseInfo: function goBaseInfo(resumeid) {
        wx.navigateTo({
          url: 'base_info?resumeid=' + resumeid
        });
      },

      // 求职意向
      goJobWant: function goJobWant(resumeid) {
        wx.navigateTo({
          url: 'job_want?resumeid=' + resumeid
        });
      },

      // 工作经历
      goWorkExper: function goWorkExper(workid, resumeid) {
        wx.navigateTo({
          url: 'work_exper?workid=' + workid + '&resumeid=' + resumeid
        });
      },

      // 教育经历
      goEduExper: function goEduExper(educationid, resumeid) {
        wx.navigateTo({
          url: 'edu_exper?educationid=' + educationid + '&resumeid=' + resumeid
        });
      },

      // 项目经验
      goProjectExper: function goProjectExper(projectid, resumeid) {
        wx.navigateTo({
          url: 'project_exper?projectid=' + projectid + '&resumeid=' + resumeid
        });
      },

      // 证书
      goCert: function goCert(certid, resumeid) {
        wx.navigateTo({
          url: 'certificate?certid=' + certid + '&resumeid=' + resumeid
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(resumePage, [{
    key: 'onLoad',
    value: function onLoad(options) {
      this.resumeid = options.resumeid;
      // console.log(this.resumeid)
      if (options.look == "just") {
        this.operateShow = true;
      } else {
        this.operateShow = false;
      }
      this.$apply();
      var that = this;
      // 获取登录信息
      wx.getStorage({
        key: 'loginData',
        success: function success(res) {
          that.token = res.data.token;
          that.tokenKey = res.data.tokenKey;
          that.headimg = res.data.data.headimg;
          that.getPimg();
          that.$apply();
          // 获取简历信息
          if (options.resumeid === undefined) {
            return false;
          }
          for (var i = 0; i < 6; i++) {
            that.getJobInfo(i);
          }
        },
        fail: function fail(json) {
          _tip2.default.error(json.data.returnMsg);
        }
      });
    }

    // 更新

  }, {
    key: 'update',
    value: function update(index, id) {
      // console.log('更新了')
      if (id) {
        this.resumeid = id;
        this.$apply();
      }
      this.getJobInfo(index);
    }
  }, {
    key: 'getJobInfo',


    //获取公司详情数据
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(index) {
        var arr, code, that, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                arr = ["M0003", "M0004", "M0005", "M0006", "M0008", "M0010"];
                code = arr[index];
                that = this;
                _context.next = 5;
                return _api2.default.getResumeInfo({
                  query: {
                    head: {
                      "transcode": code,
                      "type": "h"
                    },
                    data: {
                      "token": that.token,
                      "tokenKey": that.tokenKey,
                      "resumeid": that.resumeid
                    }
                  }
                });

              case 5:
                json = _context.sent;
                _context.t0 = code;
                _context.next = _context.t0 === "M0003" ? 9 : _context.t0 === "M0004" ? 11 : _context.t0 === "M0005" ? 13 : _context.t0 === "M0006" ? 15 : _context.t0 === "M0008" ? 17 : _context.t0 === "M0010" ? 19 : 21;
                break;

              case 9:
                // 基本信息
                if (json.data.returnCode == "AAAAAAA") {
                  that.baseInfo = JSON.parse(json.data.data);
                  that.sex = that.baseInfo.sex == "男";
                  if (!that.baseInfo.sex) {
                    that.sexStatus = true;
                  } else {
                    that.sexStatus = false;
                  }
                  that.$apply();
                } else {
                  that.sexStatus = true;
                  that.$apply();
                  _tip2.default.error(json.returnMsg);
                }
                return _context.abrupt('break', 21);

              case 11:
                // 求职意向
                if (json.data.returnCode == "AAAAAAA") {
                  that.jobApply = JSON.parse(json.data.data);
                  that.$apply();
                } else {
                  _tip2.default.error(json.returnMsg);
                }
                return _context.abrupt('break', 21);

              case 13:
                // 工作经历
                if (json.data.returnCode == "AAAAAAA") {
                  that.workExper = JSON.parse(json.data.data);
                  that.$apply();
                } else {
                  _tip2.default.error(json.returnMsg);
                }
                return _context.abrupt('break', 21);

              case 15:
                // 教育经历
                if (json.data.returnCode == "AAAAAAA") {
                  that.eduExper = JSON.parse(json.data.data);
                  that.$apply();
                } else {
                  _tip2.default.error(json.returnMsg);
                }
                return _context.abrupt('break', 21);

              case 17:
                // 项目经验
                if (json.data.returnCode == "AAAAAAA") {
                  that.projectExper = JSON.parse(json.data.data);
                  that.$apply();
                } else {
                  _tip2.default.error(json.returnMsg);
                }
                return _context.abrupt('break', 21);

              case 19:
                // 证书
                if (json.data.returnCode == "AAAAAAA") {
                  that.certificate = JSON.parse(json.data.data);
                  that.$apply();
                } else {
                  _tip2.default.error(json.returnMsg);
                }
                return _context.abrupt('break', 21);

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getJobInfo(_x) {
        return _ref2.apply(this, arguments);
      }

      return getJobInfo;
    }()

    //修改头像

  }, {
    key: 'changPic',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token, tokenKey, imgsrc) {
        var json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _api2.default.getResumeInfo({
                  query: {
                    head: {
                      "type": "i",
                      "transcode": "P0038"
                    },
                    data: {
                      "imgsrc": imgsrc,
                      "imgtype": "png",
                      "tokenKey": tokenKey,
                      "token": token
                    }
                  }
                });

              case 2:
                json = _context2.sent;
                return _context2.abrupt('return', json);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function changPic(_x2, _x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return changPic;
    }()
    //获取个人信息

  }, {
    key: 'getPimg',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var that, json;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                that = this;
                _context3.next = 3;
                return _api2.default.getPimg({
                  query: {
                    head: {
                      "transcode": "P0040",
                      "type": "h"
                    },
                    data: {
                      "tokenKey": that.tokenKey,
                      "token": that.token
                    }
                  }
                });

              case 3:
                json = _context3.sent;

                if (json.data.returnCode == 'AAAAAAA') {
                  if (json.data.data.headimg) {
                    that.headimgStatus = true;
                  } else {
                    that.headimgStatus = false;
                  }
                  that.tempPortraitFilePath = json.data.data.headimg;
                  that.$apply();
                } else {
                  _tip2.default.error(json.data.returnMsg);
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPimg() {
        return _ref4.apply(this, arguments);
      }

      return getPimg;
    }()
  }]);

  return resumePage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(resumePage , 'pages/personal/resume'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS5qcyJdLCJuYW1lcyI6WyJyZXN1bWVQYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJiYXNlSW5mbyIsImpvYkFwcGx5Iiwid29ya0V4cGVyIiwiZWR1RXhwZXIiLCJwcm9qZWN0RXhwZXIiLCJjZXJ0aWZpY2F0ZSIsInNleCIsInRva2VuIiwidG9rZW5LZXkiLCJoZWFkaW1nIiwicmVzdW1laWQiLCJvcGVyYXRlU2hvdyIsInNleFN0YXR1cyIsInRlbXBQb3J0cmFpdEZpbGVQYXRoIiwiaGVhZGltZ1N0YXR1cyIsIm1ldGhvZHMiLCJub2lkdGlwcyIsImVycm9yIiwiZ29CYXNlSW5mbyIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsImdvSm9iV2FudCIsImdvV29ya0V4cGVyIiwid29ya2lkIiwiZ29FZHVFeHBlciIsImVkdWNhdGlvbmlkIiwiZ29Qcm9qZWN0RXhwZXIiLCJwcm9qZWN0aWQiLCJnb0NlcnQiLCJjZXJ0aWQiLCJvcHRpb25zIiwibG9vayIsIiRhcHBseSIsInRoYXQiLCJnZXRTdG9yYWdlIiwia2V5Iiwic3VjY2VzcyIsInJlcyIsImdldFBpbWciLCJ1bmRlZmluZWQiLCJpIiwiZ2V0Sm9iSW5mbyIsImZhaWwiLCJqc29uIiwicmV0dXJuTXNnIiwiaW5kZXgiLCJpZCIsImFyciIsImNvZGUiLCJnZXRSZXN1bWVJbmZvIiwicXVlcnkiLCJoZWFkIiwicmV0dXJuQ29kZSIsIkpTT04iLCJwYXJzZSIsImltZ3NyYyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUVuQkMsTSxHQUFTO0FBQ0xDLDhCQUF3QjtBQURuQixLLFFBSVRDLEksR0FBTztBQUNMQyxnQkFBVSxFQURMLEVBQ2M7QUFDbkJDLGdCQUFVLEVBRkwsRUFFYztBQUNuQkMsaUJBQVcsRUFITixFQUdjO0FBQ25CQyxnQkFB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QUVLO0FBQ0RvQix5QkFBS3BCLGFBQUwsR0FBcUIsS0FBckI7QUFDSDtBQUNEb0IsdUJBQUtyQixvQkFBTCxHQUE0QitCLEtBQUs3QyxJQUFMLENBQVVBLElBQVYsQ0FBZVUsT0FBM0M7QUFDQXlCLHVCQUFLRCxNQUFMO0FBQ0gsaUJBUkQsTUFRSztBQUNELGdDQUFJaEIsS0FBSixDQUFVMkIsS0FBSzdDLElBQUwsQ0FBVThDLFNBQXBCO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF0T2lDLGVBQUtZLEk7O2tCQUF4QjdELFUiLCJmaWxlIjoicmVzdW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG5pbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyByZXN1bWVQYWdlIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuXHJcbiAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE566A5Y6GJyxcclxuICB9XHJcblxyXG4gIGRhdGEgPSB7XHJcbiAgICBiYXNlSW5mbzoge30sICAgICAgLy8g5Z+65pys5L+h5oGvXHJcbiAgICBqb2JBcHBseToge30sICAgICAgLy8g5rGC6IGM5oSP5ZCRXHJcbiAgICB3b3JrRXhwZXI6IHt9LCAgICAgLy8g5bel5L2c57uP5Y6GXHJcbiAgICBlZHVFeHBlcjoge30sICAgICAgLy8g5pWZ6IKy57uP5Y6GXHJcbiAgICBwcm9qZWN0RXhwZXI6IHt9LCAgLy8g6aG555uu57uP6aqMXHJcbiAgICBjZXJ0aWZpY2F0ZToge30sICAgIC8vIOivgeS5plxyXG4gICAgc2V4OiB0cnVlLFxyXG4gICAgdG9rZW46ICcnLFxyXG4gICAgdG9rZW5LZXk6ICcnLFxyXG4gICAgaGVhZGltZzogJycsXHJcbiAgICByZXN1bWVpZDogJycsXHJcbiAgICBvcGVyYXRlU2hvdzogZmFsc2UsXHJcbiAgICBzZXhTdGF0dXM6IGZhbHNlLFxyXG4gICAgdGVtcFBvcnRyYWl0RmlsZVBhdGg6ICcnLFxyXG4gICAgaGVhZGltZ1N0YXR1czpmYWxzZSxcclxuICB9XHJcblxyXG4gIG9uTG9hZChvcHRpb25zKSB7XHJcbiAgICB0aGlzLnJlc3VtZWlkID0gb3B0aW9ucy5yZXN1bWVpZDtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucmVzdW1laWQpXHJcbiAgICBpZihvcHRpb25zLmxvb2s9PVwianVzdFwiKXtcclxuICAgICAgdGhpcy5vcGVyYXRlU2hvdyA9IHRydWU7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgdGhpcy5vcGVyYXRlU2hvdyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgLy8g6I635Y+W55m75b2V5L+h5oGvXHJcbiAgICB3eC5nZXRTdG9yYWdlKHtcclxuICAgICAgICBrZXk6ICdsb2dpbkRhdGEnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgdGhhdC50b2tlbiA9IHJlcy5kYXRhLnRva2VuO1xyXG4gICAgICAgICAgdGhhdC50b2tlbktleSA9IHJlcy5kYXRhLnRva2VuS2V5O1xyXG4gICAgICAgICAgdGhhdC5oZWFkaW1nID0gcmVzLmRhdGEuZGF0YS5oZWFkaW1nO1xyXG4gICAgICAgICAgdGhhdC5nZXRQaW1nKCk7XHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgLy8g6I635Y+W566A5Y6G5L+h5oGvXHJcbiAgICAgICAgICBpZihvcHRpb25zLnJlc3VtZWlkPT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykgeyBcclxuICAgICAgICAgICAgdGhhdC5nZXRKb2JJbmZvKGkpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsOmZ1bmN0aW9uKGpzb24pe1xyXG4gICAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5yZXR1cm5Nc2cpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvLyDmm7TmlrBcclxuICB1cGRhdGUoaW5kZXgsaWQpe1xyXG4gICAgLy8gY29uc29sZS5sb2coJ+abtOaWsOS6hicpXHJcbiAgICBpZihpZCl7XHJcbiAgICAgIHRoaXMucmVzdW1laWQgPSBpZFxyXG4gICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcbiAgICB0aGlzLmdldEpvYkluZm8oaW5kZXgpXHJcbiAgfVxyXG5cclxuICBtZXRob2RzID0ge1xyXG4gICAgbm9pZHRpcHMoKXtcclxuICAgICAgdGlwLmVycm9yKCfor7flhYjlrozmiJDln7rmnKzkv6Hmga/nvJbovpEnKTtcclxuICAgIH0sXHJcbiAgICAvLyDln7rmnKzkv6Hmga/nvJbovpHmlrDlop5cclxuICAgIGdvQmFzZUluZm8gKHJlc3VtZWlkKSB7XHJcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYGJhc2VfaW5mbz9yZXN1bWVpZD0ke3Jlc3VtZWlkfWBcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8vIOaxguiBjOaEj+WQkVxyXG4gICAgZ29Kb2JXYW50IChyZXN1bWVpZCkge1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGBqb2Jfd2FudD9yZXN1bWVpZD0ke3Jlc3VtZWlkfWBcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8vIOW3peS9nOe7j+WOhlxyXG4gICAgZ29Xb3JrRXhwZXIgKHdvcmtpZCwgcmVzdW1laWQpIHtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgd29ya19leHBlcj93b3JraWQ9JHt3b3JraWR9JnJlc3VtZWlkPSR7cmVzdW1laWR9YFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy8g5pWZ6IKy57uP5Y6GXHJcbiAgICBnb0VkdUV4cGVyIChlZHVjYXRpb25pZCwgcmVzdW1laWQpIHtcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgZWR1X2V4cGVyP2VkdWNhdGlvbmlkPSR7ZWR1Y2F0aW9uaWR9JnJlc3VtZWlkPSR7cmVzdW1laWR9YFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy8g6aG555uu57uP6aqMXHJcbiAgICBnb1Byb2plY3RFeHBlciAocHJvamVjdGlkLCByZXN1bWVpZCkge1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGBwcm9qZWN0X2V4cGVyP3Byb2plY3RpZD0ke3Byb2plY3RpZH0mcmVzdW1laWQ9JHtyZXN1bWVpZH1gXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvLyDor4HkuaZcclxuICAgIGdvQ2VydCAoY2VydGlkLCByZXN1bWVpZCkge1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICB1cmw6IGBjZXJ0aWZpY2F0ZT9jZXJ0aWQ9JHtjZXJ0aWR9JnJlc3VtZWlkPSR7cmVzdW1laWR9YFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy/ojrflj5blhazlj7jor6bmg4XmlbDmja5cclxuICBhc3luYyBnZXRKb2JJbmZvKGluZGV4KSB7XHJcbiAgICBsZXQgYXJyID0gW1wiTTAwMDNcIixcIk0wMDA0XCIsXCJNMDAwNVwiLFwiTTAwMDZcIixcIk0wMDA4XCIsXCJNMDAxMFwiXVxyXG4gICAgbGV0IGNvZGUgPSBhcnJbaW5kZXhdXHJcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgcXVlcnk6IHtcclxuICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICBcInRyYW5zY29kZVwiOiBjb2RlLFxyXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBcInRva2VuXCI6IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICBcInRva2VuS2V5XCI6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgICBcInJlc3VtZWlkXCI6IHRoYXQucmVzdW1laWRcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBzd2l0Y2ggKGNvZGUpe1xyXG4gICAgICBjYXNlIFwiTTAwMDNcIjovLyDln7rmnKzkv6Hmga9cclxuICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICB0aGF0LmJhc2VJbmZvID0gSlNPTi5wYXJzZShqc29uLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoYXQuc2V4ID0gKHRoYXQuYmFzZUluZm8uc2V4ID09IFwi55S3XCIpO1xyXG4gICAgICAgICAgICBpZighdGhhdC5iYXNlSW5mby5zZXgpe1xyXG4gICAgICAgICAgICAgIHRoYXQuc2V4U3RhdHVzID0gdHJ1ZVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB0aGF0LnNleFN0YXR1cyA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoYXQuc2V4U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgdGlwLmVycm9yKGpzb24ucmV0dXJuTXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIk0wMDA0XCI6Ly8g5rGC6IGM5oSP5ZCRXHJcbiAgICAgICAgICBpZiAoanNvbi5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgdGhhdC5qb2JBcHBseSA9IEpTT04ucGFyc2UoanNvbi5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGlwLmVycm9yKGpzb24ucmV0dXJuTXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIk0wMDA1XCI6Ly8g5bel5L2c57uP5Y6GXHJcbiAgICAgICAgICBpZiAoanNvbi5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgdGhhdC53b3JrRXhwZXIgPSBKU09OLnBhcnNlKGpzb24uZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLnJldHVybk1zZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJNMDAwNlwiOi8vIOaVmeiCsue7j+WOhlxyXG4gICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZWR1RXhwZXIgPSBKU09OLnBhcnNlKGpzb24uZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLnJldHVybk1zZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJNMDAwOFwiOi8vIOmhueebrue7j+mqjFxyXG4gICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgIHRoYXQucHJvamVjdEV4cGVyID0gSlNPTi5wYXJzZShqc29uLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiTTAwMTBcIjovLyDor4HkuaZcclxuICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICB0aGF0LmNlcnRpZmljYXRlID0gSlNPTi5wYXJzZShqc29uLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICAvL+S/ruaUueWktOWDj1xyXG4gIGFzeW5jIGNoYW5nUGljKHRva2VuLHRva2VuS2V5LGltZ3NyYykge1xyXG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgcXVlcnk6IHtcclxuICAgICAgICBoZWFkOntcclxuICAgICAgICAgIFwidHlwZVwiOlwiaVwiLFxyXG4gICAgICAgICAgXCJ0cmFuc2NvZGVcIjpcIlAwMDM4XCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgZGF0YTp7XHJcbiAgICAgICAgICBcImltZ3NyY1wiOiBpbWdzcmMsXHJcbiAgICAgICAgICBcImltZ3R5cGVcIjpcInBuZ1wiLFxyXG4gICAgICAgICAgXCJ0b2tlbktleVwiOnRva2VuS2V5LFxyXG4gICAgICAgICAgXCJ0b2tlblwiOnRva2VuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGpzb247XHJcbiAgfVxyXG4gIC8v6I635Y+W5Liq5Lq65L+h5oGvXHJcbiAgYXN5bmMgZ2V0UGltZygpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0UGltZyh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIlAwMDQwXCIsXHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhhdC50b2tlbktleSxcclxuICAgICAgICAgICAgICBcInRva2VuXCI6IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICBpZihqc29uLmRhdGEucmV0dXJuQ29kZSA9PSAnQUFBQUFBQScpIHtcclxuICAgICAgICAgIGlmKGpzb24uZGF0YS5kYXRhLmhlYWRpbWcpe1xyXG4gICAgICAgICAgICAgIHRoYXQuaGVhZGltZ1N0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB0aGF0LmhlYWRpbWdTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoYXQudGVtcFBvcnRyYWl0RmlsZVBhdGggPSBqc29uLmRhdGEuZGF0YS5oZWFkaW1nO1xyXG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLnJldHVybk1zZyk7XHJcbiAgICAgIH1cclxuICB9XHJcbn1cclxuIl19