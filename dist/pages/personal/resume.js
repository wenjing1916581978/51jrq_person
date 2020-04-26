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
      navigationBarTitleText: '我的简历',
      navigationBarBackgroundColor: "#fafafa"
    }, _this.data = {
      edit: false,
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
      sexStatus: false
    }, _this.methods = {
      edititem: function edititem(e) {
        var url = e.currentTarget.dataset.url;
        console.log('url', url);
        if (!this.edit) {
          return false;
        }
        wx.navigateTo({ url: url });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(resumePage, [{
    key: 'onLoad',
    value: function onLoad(options) {
      var that = this;
      var login = wx.getStorageSync('login');
      that.token = login.token;
      that.tokenKey = login.tokenKey;
      that.edit = options.edit == 'true';
      this.resumeid = options.resumeid;
      if (options.resumeid) {
        for (var i = 0; i < 6; i++) {
          that.getJobInfo(i);
        }
      }
      this.$apply();
    }

    // 更新

  }, {
    key: 'update',
    value: function update(index) {
      this.getJobInfo(index);
    }
  }, {
    key: 'getJobInfo',


    //获取公司详情数据
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(index) {
        var arr, code, that, json, data;
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
                  data = JSON.parse(json.data.data);

                  that.baseInfo = data;
                  that.baseInfo.age = that.ages(data.borndate);
                  // console.log(that.age(data.borndate),'年龄')
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
  }, {
    key: 'ages',
    value: function ages(str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
      if (r == null) return false;
      var d = new Date(r[1], r[3] - 1, r[4]);
      if (d.getFullYear() == r[1] && d.getMonth() + 1 == r[3] && d.getDate() == r[4]) {
        var Y = new Date().getFullYear();
        return Y - r[1] + '岁';
      }
      return "";
    }

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
  }]);

  return resumePage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(resumePage , 'pages/personal/resume'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VtZS5qcyJdLCJuYW1lcyI6WyJyZXN1bWVQYWdlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwiZWRpdCIsImJhc2VJbmZvIiwiam9iQXBwbHkiLCJ3b3JrRXhwZXIiLCJlZHVFeHBlciIsInByb2plY3RFeHBlciIsImNlcnRpZmljYXRlIiwic2V4IiwidG9rZW4iLCJ0b2tlbktleSIsImhlYWRpbWciLCJyZXN1bWVpZCIsInNleFN0YXR1cyIsIm1ldGhvZHMiLCJlZGl0aXRlbSIsImUiLCJ1cmwiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNvbnNvbGUiLCJsb2ciLCJ3eCIsIm5hdmlnYXRlVG8iLCJvcHRpb25zIiwidGhhdCIsImxvZ2luIiwiZ2V0U3RvcmFnZVN5bmMiLCJpIiwiZ2V0Sm9iSW5mbyIsIiRhcHBseSIsImluZGV4IiwiYXJyIiwiY29kZSIsImdldFJlc3VtZUluZm8iLCJxdWVyeSIsImhlYWQiLCJqc29uIiwicmV0dXJuQ29kZSIsIkpTT04iLCJwYXJzZSIsImFnZSIsImFnZXMiLCJib3JuZGF0ZSIsImVycm9yIiwicmV0dXJuTXNnIiwic3RyIiwiciIsIm1hdGNoIiwiZCIsIkRhdGUiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsIlkiLCJpbWdzcmMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFFbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsb0NBQThCO0FBRnZCLEssUUFLVEMsSSxHQUFPO0FBQ0xDLFlBQUssS0FEQTtBQUVMQyxnQkFBVSxFQUZMLEVBRWM7QUFDbkJDLGdCQUFVLEVBSEwsRUFHYztBQUNuQkMsaUJBQVcsRUFKTixFQUljO0FBQ25CQyxnQkFBVSxFQUxMLEVBS2M7QUFD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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFsSzZCLGVBQUttQixJOztrQkFBeEI1RCxVIiwiZmlsZSI6InJlc3VtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcclxuaW1wb3J0IHRpcCBmcm9tICcuLi8uLi91dGlscy90aXAnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcmVzdW1lUGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcblxyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTnroDljoYnLFxyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjZmFmYWZhXCIsXHJcbiAgfVxyXG5cclxuICBkYXRhID0ge1xyXG4gICAgZWRpdDpmYWxzZSxcclxuICAgIGJhc2VJbmZvOiB7fSwgICAgICAvLyDln7rmnKzkv6Hmga9cclxuICAgIGpvYkFwcGx5OiB7fSwgICAgICAvLyDmsYLogYzmhI/lkJFcclxuICAgIHdvcmtFeHBlcjoge30sICAgICAvLyDlt6XkvZznu4/ljoZcclxuICAgIGVkdUV4cGVyOiB7fSwgICAgICAvLyDmlZnogrLnu4/ljoZcclxuICAgIHByb2plY3RFeHBlcjoge30sICAvLyDpobnnm67nu4/pqoxcclxuICAgIGNlcnRpZmljYXRlOiB7fSwgICAgLy8g6K+B5LmmXHJcbiAgICBzZXg6IHRydWUsXHJcbiAgICB0b2tlbjogJycsXHJcbiAgICB0b2tlbktleTogJycsXHJcbiAgICBoZWFkaW1nOiAnJyxcclxuICAgIHJlc3VtZWlkOiAnJyxcclxuICAgIHNleFN0YXR1czogZmFsc2UsXHJcbiAgfVxyXG5cclxuICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICBsZXQgbG9naW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW4nKVxyXG4gICAgdGhhdC50b2tlbiA9IGxvZ2luLnRva2VuXHJcbiAgICB0aGF0LnRva2VuS2V5ID0gbG9naW4udG9rZW5LZXlcclxuICAgIHRoYXQuZWRpdCA9IG9wdGlvbnMuZWRpdD09J3RydWUnXHJcbiAgICB0aGlzLnJlc3VtZWlkID0gb3B0aW9ucy5yZXN1bWVpZDtcclxuICAgIGlmKG9wdGlvbnMucmVzdW1laWQpe1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIHRoYXQuZ2V0Sm9iSW5mbyhpKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLiRhcHBseSgpO1xyXG4gIH1cclxuXHJcbiAgLy8g5pu05pawXHJcbiAgdXBkYXRlKGluZGV4KXtcclxuICAgIHRoaXMuZ2V0Sm9iSW5mbyhpbmRleClcclxuICB9XHJcblxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBlZGl0aXRlbShlKXtcclxuICAgICAgbGV0IHVybCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnVybFxyXG4gICAgICBjb25zb2xlLmxvZygndXJsJyx1cmwpXHJcbiAgICAgIGlmKCF0aGlzLmVkaXQpe1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe3VybH0pXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy/ojrflj5blhazlj7jor6bmg4XmlbDmja5cclxuICBhc3luYyBnZXRKb2JJbmZvKGluZGV4KSB7XHJcbiAgICBsZXQgYXJyID0gW1wiTTAwMDNcIixcIk0wMDA0XCIsXCJNMDAwNVwiLFwiTTAwMDZcIixcIk0wMDA4XCIsXCJNMDAxMFwiXVxyXG4gICAgbGV0IGNvZGUgPSBhcnJbaW5kZXhdXHJcbiAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRSZXN1bWVJbmZvKHtcclxuICAgICAgcXVlcnk6IHtcclxuICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICBcInRyYW5zY29kZVwiOiBjb2RlLFxyXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBcInRva2VuXCI6IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICBcInRva2VuS2V5XCI6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgICBcInJlc3VtZWlkXCI6IHRoYXQucmVzdW1laWRcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBzd2l0Y2ggKGNvZGUpe1xyXG4gICAgICBjYXNlIFwiTTAwMDNcIjovLyDln7rmnKzkv6Hmga9cclxuICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoanNvbi5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGF0LmJhc2VJbmZvID0gZGF0YVxyXG4gICAgICAgICAgICB0aGF0LmJhc2VJbmZvLmFnZSA9IHRoYXQuYWdlcyhkYXRhLmJvcm5kYXRlKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGF0LmFnZShkYXRhLmJvcm5kYXRlKSwn5bm06b6EJylcclxuICAgICAgICAgICAgdGhhdC5zZXggPSAodGhhdC5iYXNlSW5mby5zZXggPT0gXCLnlLdcIik7XHJcbiAgICAgICAgICAgIGlmKCF0aGF0LmJhc2VJbmZvLnNleCl7XHJcbiAgICAgICAgICAgICAgdGhhdC5zZXhTdGF0dXMgPSB0cnVlXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHRoYXQuc2V4U3RhdHVzID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhhdC5zZXhTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiTTAwMDRcIjovLyDmsYLogYzmhI/lkJFcclxuICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICB0aGF0LmpvYkFwcGx5ID0gSlNPTi5wYXJzZShqc29uLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiTTAwMDVcIjovLyDlt6XkvZznu4/ljoZcclxuICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICB0aGF0LndvcmtFeHBlciA9IEpTT04ucGFyc2UoanNvbi5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGlwLmVycm9yKGpzb24ucmV0dXJuTXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIk0wMDA2XCI6Ly8g5pWZ6IKy57uP5Y6GXHJcbiAgICAgICAgICBpZiAoanNvbi5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgdGhhdC5lZHVFeHBlciA9IEpTT04ucGFyc2UoanNvbi5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGlwLmVycm9yKGpzb24ucmV0dXJuTXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIk0wMDA4XCI6Ly8g6aG555uu57uP6aqMXHJcbiAgICAgICAgICBpZiAoanNvbi5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgdGhhdC5wcm9qZWN0RXhwZXIgPSBKU09OLnBhcnNlKGpzb24uZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLnJldHVybk1zZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJNMDAxMFwiOi8vIOivgeS5plxyXG4gICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgIHRoYXQuY2VydGlmaWNhdGUgPSBKU09OLnBhcnNlKGpzb24uZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLnJldHVybk1zZyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGFnZXMoc3RyKXtcclxuICAgIHZhciByID0gc3RyLm1hdGNoKC9eKFxcZHsxLDR9KSgtfFxcLykoXFxkezEsMn0pXFwyKFxcZHsxLDJ9KSQvKTtcclxuICAgIGlmKHI9PW51bGwpcmV0dXJuICAgZmFsc2U7XHJcbiAgICB2YXIgZCA9IG5ldyBEYXRlKHJbMV0sclszXS0xLHJbNF0pO1xyXG4gICAgaWYoZC5nZXRGdWxsWWVhcigpPT1yWzFdJiYoZC5nZXRNb250aCgpKzEpPT1yWzNdJiZkLmdldERhdGUoKT09cls0XSl7XHJcbiAgICAgIHZhciBZID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICByZXR1cm4gKFktclsxXSkrJ+WygSdcclxuICAgIH1cclxuICAgIHJldHVybihcIlwiKTtcclxuICB9XHJcblxyXG4gIC8v5L+u5pS55aS05YOPXHJcbiAgYXN5bmMgY2hhbmdQaWModG9rZW4sdG9rZW5LZXksaW1nc3JjKSB7XHJcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldFJlc3VtZUluZm8oe1xyXG4gICAgICBxdWVyeToge1xyXG4gICAgICAgIGhlYWQ6e1xyXG4gICAgICAgICAgXCJ0eXBlXCI6XCJpXCIsXHJcbiAgICAgICAgICBcInRyYW5zY29kZVwiOlwiUDAwMzhcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBkYXRhOntcclxuICAgICAgICAgIFwiaW1nc3JjXCI6IGltZ3NyYyxcclxuICAgICAgICAgIFwiaW1ndHlwZVwiOlwicG5nXCIsXHJcbiAgICAgICAgICBcInRva2VuS2V5XCI6dG9rZW5LZXksXHJcbiAgICAgICAgICBcInRva2VuXCI6dG9rZW5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4ganNvbjtcclxuICB9XHJcbn1cclxuIl19