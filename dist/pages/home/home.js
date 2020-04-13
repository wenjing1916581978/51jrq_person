'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _tip = require('./../../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _utils = require('./../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _bannersearch = require('./../../components/bannersearch.js');

var _bannersearch2 = _interopRequireDefault(_bannersearch);

var _commposi = require('./../../components/commposi.js');

var _commposi2 = _interopRequireDefault(_commposi);

var _bottomloadmore = require('./../../components/bottomloadmore.js');

var _bottomloadmore2 = _interopRequireDefault(_bottomloadmore);

var _placeholder = require('./../../components/placeholder.js');

var _placeholder2 = _interopRequireDefault(_placeholder);

var _navigationload = require('./../../components/navigationload.js');

var _navigationload2 = _interopRequireDefault(_navigationload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HomePage = function (_wepy$page) {
  _inherits(HomePage, _wepy$page);

  function HomePage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HomePage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HomePage.__proto__ || Object.getPrototypeOf(HomePage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.$repeat = { "hunterjobList": { "com": "commposi", "props": "syncPosidata.sync" } }, _this.$props = { "commposi": { "xmlns:v-bind": { "value": "", "for": "hunterjobList", "item": "item", "index": "index", "key": "index" }, "v-bind:syncPosidata.sync": { "value": "item", "type": "item", "for": "hunterjobList", "item": "item", "index": "index", "key": "index" } }, "bottomloadmore": { "v-bind:syncShow.sync": "showLoading", "message": "正在加载" }, "placeholder": { "v-bind:syncShow.sync": "isEmpty", "message": "暂无发现数据" } }, _this.$events = {}, _this.components = {
      bannersearch: _bannersearch2.default,
      commposi: _commposi2.default,
      bottomloadmore: _bottomloadmore2.default,
      placeholder: _placeholder2.default,
      navigationload: _navigationload2.default
    }, _this.data = {
      posiList: [],
      hunterjobList: {},
      showLoading: false,
      isEmpty: false,
      currentPage: 1, //当前页面
      totalPage: 0, //总数
      showPageLoading: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HomePage, [{
    key: 'onLoad',
    value: function onLoad(options) {
      // tip.confirm()
      this.getCompanyjob(this.currentPage);
    }

    // 下拉刷新

  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      wx.showNavigationBarLoading();
      this.onLoad();
    }
    // 转发分享

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      var pages = getCurrentPages(); //获取加载的页面
      var currentPage = pages[pages.length - 1]; //获取当前页面的对象
      var url = currentPage.route; //当前页面url
      return {
        title: '金融职业机会尽在51金融圈',
        desc: '51金融圈丨金融人才求职招聘',
        path: '/' + url
      };
    }

    /**
    * 页面上拉触底事件的处理函数
    */

  }, {
    key: 'onReachBottom',
    value: function onReachBottom(event) {
      var that = this;
      that.showLoading = true;
      //判断总页数是否大于翻页数
      if (that.totalPage > that.currentPage) {
        //防止重复加载
        if (that.preventRepeatReuqest) {
          return true;
        }
        that.preventRepeatReuqest = true;
        that.currentPage++;
        that.getCompanyjob(that.currentPage);
        that.preventRepeatReuqest = false;
      } else {
        that.showLoading = false;
      }
    }
  }, {
    key: 'getCompanyjob',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(currentPage) {
        var that, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // 开启loading效果
                that = this;

                that.showPageLoading = false;
                that.$apply();
                _context.next = 5;
                return _api2.default.getCompanyjob({
                  query: {
                    head: {
                      "transcode": "Q0001",
                      "type": "h"
                    },
                    data: {
                      pageNo: currentPage
                    }
                  }
                });

              case 5:
                json = _context.sent;

                console.log(_typeof(json.data));
                if (json.data.returnCode == "AAAAAAA") {
                  that.hunterjobList = [].concat(_toConsumableArray(that.hunterjobList), _toConsumableArray(json.data.data.list));
                  that.hunterjobList.forEach(function (element) {
                    element.updatedate = _utils2.default.date('Y/m/d', element.updatedate / 1000);
                  });
                  that.totalPage = parseInt(json.data.data.num / 10);
                  if (json.data.data.num == 0) {
                    that.isEmpty = true; //暂无数据
                  }
                  that.showPageLoading = false;
                  that.$apply();
                } else {
                  _tip2.default.error(json);
                }

                wx.hideNavigationBarLoading(); //完成停止加载
                wx.stopPullDownRefresh(); //停止下拉刷新
                that.$apply();
                that.showLoading = false;

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCompanyjob(_x) {
        return _ref2.apply(this, arguments);
      }

      return getCompanyjob;
    }()
  }]);

  return HomePage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(HomePage , 'pages/home/home'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuanMiXSwibmFtZXMiOlsiSG9tZVBhZ2UiLCJjb25maWciLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJiYW5uZXJzZWFyY2giLCJjb21tcG9zaSIsImJvdHRvbWxvYWRtb3JlIiwicGxhY2Vob2xkZXIiLCJuYXZpZ2F0aW9ubG9hZCIsImRhdGEiLCJwb3NpTGlzdCIsImh1bnRlcmpvYkxpc3QiLCJzaG93TG9hZGluZyIsImlzRW1wdHkiLCJjdXJyZW50UGFnZSIsInRvdGFsUGFnZSIsInNob3dQYWdlTG9hZGluZyIsIm9wdGlvbnMiLCJnZXRDb21wYW55am9iIiwid3giLCJzaG93TmF2aWdhdGlvbkJhckxvYWRpbmciLCJvbkxvYWQiLCJwYWdlcyIsImdldEN1cnJlbnRQYWdlcyIsImxlbmd0aCIsInVybCIsInJvdXRlIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsImV2ZW50IiwidGhhdCIsInByZXZlbnRSZXBlYXRSZXVxZXN0IiwiJGFwcGx5IiwicXVlcnkiLCJoZWFkIiwicGFnZU5vIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJyZXR1cm5Db2RlIiwibGlzdCIsImZvckVhY2giLCJlbGVtZW50IiwidXBkYXRlZGF0ZSIsImRhdGUiLCJwYXJzZUludCIsIm51bSIsImVycm9yIiwiaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7Ozs7OzswTEFFbkJDLE0sR0FBUyxFLFFBSVZDLE8sR0FBVSxFQUFDLGlCQUFnQixFQUFDLE9BQU0sVUFBUCxFQUFrQixTQUFRLG1CQUExQixFQUFqQixFLFFBQ1hDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyxnQkFB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LEdBQXFCLElBQXhDLENBQXJCO0FBQ0gsbUJBRkQ7QUFHQWIsdUJBQUtoQixTQUFMLEdBQWdCK0IsU0FBU1QsS0FBSzVCLElBQUwsQ0FBVUEsSUFBVixDQUFlc0MsR0FBZixHQUFxQixFQUE5QixDQUFoQjtBQUNBLHNCQUFHVixLQUFLNUIsSUFBTCxDQUFVQSxJQUFWLENBQWVzQyxHQUFmLElBQXNCLENBQXpCLEVBQTRCO0FBQzFCaEIseUJBQUtsQixPQUFMLEdBQWUsSUFBZixDQUQwQixDQUNKO0FBQ3ZCO0FBQ0RrQix1QkFBS2YsZUFBTCxHQUF1QixLQUF2QjtBQUNBZSx1QkFBS0UsTUFBTDtBQUNELGlCQVhELE1BV087QUFDTCxnQ0FBSWUsS0FBSixDQUFVWCxJQUFWO0FBQ0Q7O0FBR0RsQixtQkFBRzhCLHdCQUFILEcsQ0FBOEI7QUFDOUI5QixtQkFBRytCLG1CQUFILEcsQ0FBeUI7QUFDekJuQixxQkFBS0UsTUFBTDtBQUNBRixxQkFBS25CLFdBQUwsR0FBbUIsS0FBbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUExR2tDLGVBQUt1QyxJOztrQkFBdEJyRCxRIiwiZmlsZSI6ImhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcbmltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcbmltcG9ydCB1dGlscyBmcm9tJy4uLy4uL3V0aWxzL3V0aWxzJztcbmltcG9ydCBCYW5uZXJTZWFyY2ggZnJvbSAnLi4vLi4vY29tcG9uZW50cy9iYW5uZXJzZWFyY2gnO1xuaW1wb3J0IENvbW1Qb3NpIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbXBvc2knO1xuaW1wb3J0IEJvdHRvbUxvYWRNb3JlIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2JvdHRvbWxvYWRtb3JlXCI7XG5pbXBvcnQgUGxhY2VIb2xkZXIgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvcGxhY2Vob2xkZXJcIjtcbmltcG9ydCBOYXZpZ2F0aW9uTG9hZCBmcm9tICcuLi8uLi9jb21wb25lbnRzL25hdmlnYXRpb25sb2FkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG9tZVBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXG4gIGNvbmZpZyA9IHtcblxuICB9XG5cbiAkcmVwZWF0ID0ge1wiaHVudGVyam9iTGlzdFwiOntcImNvbVwiOlwiY29tbXBvc2lcIixcInByb3BzXCI6XCJzeW5jUG9zaWRhdGEuc3luY1wifX07XHJcbiRwcm9wcyA9IHtcImNvbW1wb3NpXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJodW50ZXJqb2JMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c3luY1Bvc2lkYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJodW50ZXJqb2JMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwiYm90dG9tbG9hZG1vcmVcIjp7XCJ2LWJpbmQ6c3luY1Nob3cuc3luY1wiOlwic2hvd0xvYWRpbmdcIixcIm1lc3NhZ2VcIjpcIuato+WcqOWKoOi9vVwifSxcInBsYWNlaG9sZGVyXCI6e1widi1iaW5kOnN5bmNTaG93LnN5bmNcIjpcImlzRW1wdHlcIixcIm1lc3NhZ2VcIjpcIuaaguaXoOWPkeeOsOaVsOaNrlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgYmFubmVyc2VhcmNoOiBCYW5uZXJTZWFyY2gsXG4gICAgY29tbXBvc2k6IENvbW1Qb3NpLFxuICAgIGJvdHRvbWxvYWRtb3JlOiBCb3R0b21Mb2FkTW9yZSxcbiAgICBwbGFjZWhvbGRlcjogUGxhY2VIb2xkZXIsXG4gICAgbmF2aWdhdGlvbmxvYWQ6IE5hdmlnYXRpb25Mb2FkXG4gIH1cblxuICBkYXRhID17XG4gICAgcG9zaUxpc3Q6IFtdLFxuICAgIGh1bnRlcmpvYkxpc3Q6IHt9LFxuICAgIHNob3dMb2FkaW5nOiBmYWxzZSxcbiAgICBpc0VtcHR5OiBmYWxzZSxcbiAgICBjdXJyZW50UGFnZTogMSwgICAvL+W9k+WJjemhtemdolxuICAgIHRvdGFsUGFnZTogMCwgICAgLy/mgLvmlbBcbiAgICBzaG93UGFnZUxvYWRpbmc6IHRydWUsXG4gIH1cblxuICBvbkxvYWQgKG9wdGlvbnMpIHtcbiAgICAvLyB0aXAuY29uZmlybSgpXG4gICAgdGhpcy5nZXRDb21wYW55am9iKHRoaXMuY3VycmVudFBhZ2UpXG4gIH1cblxuICAvLyDkuIvmi4nliLfmlrBcbiAgb25QdWxsRG93blJlZnJlc2goKXtcbiAgICB3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgIHRoaXMub25Mb2FkKClcbiAgfVxuICAvLyDovazlj5HliIbkuqtcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKSAgICAvL+iOt+WPluWKoOi9veeahOmhtemdolxuICAgICAgdmFyIGN1cnJlbnRQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoLTFdICAgIC8v6I635Y+W5b2T5YmN6aG16Z2i55qE5a+56LGhXG4gICAgICB2YXIgdXJsID0gY3VycmVudFBhZ2Uucm91dGUgICAgLy/lvZPliY3pobXpnaJ1cmxcbiAgICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+mHkeiejeiBjOS4muacuuS8muWwveWcqDUx6YeR6J6N5ZyIJyxcbiAgICAgIGRlc2M6ICc1MemHkeiejeWciOS4qOmHkeiejeS6uuaJjeaxguiBjOaLm+iBmCcsXG4gICAgICBwYXRoOiBgLyR7dXJsfWBcbiAgICAgIH1cbiAgfVxuXG4gIC8qKlxuICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gKi9cbiAgb25SZWFjaEJvdHRvbShldmVudCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICB0aGF0LnNob3dMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIC8v5Yik5pat5oC76aG15pWw5piv5ZCm5aSn5LqO57+76aG15pWwXG4gICAgICBpZiAoKHRoYXQudG90YWxQYWdlKSA+IHRoYXQuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgLy/pmLLmraLph43lpI3liqDovb1cbiAgICAgICAgaWYgKHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0ID0gdHJ1ZTtcbiAgICAgICAgdGhhdC5jdXJyZW50UGFnZSsrO1xuICAgICAgICB0aGF0LmdldENvbXBhbnlqb2IodGhhdC5jdXJyZW50UGFnZSk7XG4gICAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuc2hvd0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldENvbXBhbnlqb2IoY3VycmVudFBhZ2UpIHtcbiAgICAvLyDlvIDlkK9sb2FkaW5n5pWI5p6cXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgdGhhdC5zaG93UGFnZUxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGF0LiRhcHBseSgpXG4gICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRDb21wYW55am9iKHtcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIGhlYWQ6IHtcbiAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiUTAwMDFcIixcbiAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBwYWdlTm86IGN1cnJlbnRQYWdlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIGNvbnNvbGUubG9nKHR5cGVvZiBqc29uLmRhdGEpXG4gICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XG4gICAgICB0aGF0Lmh1bnRlcmpvYkxpc3QgPSBbLi4udGhhdC5odW50ZXJqb2JMaXN0LCAuLi5qc29uLmRhdGEuZGF0YS5saXN0XTtcbiAgICAgIHRoYXQuaHVudGVyam9iTGlzdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgIGVsZW1lbnQudXBkYXRlZGF0ZSA9IHV0aWxzLmRhdGUoJ1kvbS9kJywoZWxlbWVudC51cGRhdGVkYXRlKS8xMDAwKVxuICAgICAgfSk7XG4gICAgICB0aGF0LnRvdGFsUGFnZSA9cGFyc2VJbnQoanNvbi5kYXRhLmRhdGEubnVtIC8gMTApO1xuICAgICAgaWYoanNvbi5kYXRhLmRhdGEubnVtID09IDApIHtcbiAgICAgICAgdGhhdC5pc0VtcHR5ID0gdHJ1ZTsgIC8v5pqC5peg5pWw5o2uXG4gICAgICB9XG4gICAgICB0aGF0LnNob3dQYWdlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhhdC4kYXBwbHkoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aXAuZXJyb3IoanNvbik7XG4gICAgfVxuXG5cbiAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKSAvL+WujOaIkOWBnOatouWKoOi9vVxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKSAvL+WBnOatouS4i+aLieWIt+aWsFxuICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgdGhhdC5zaG93TG9hZGluZyA9IGZhbHNlXG4gIH1cbn1cbiJdfQ==