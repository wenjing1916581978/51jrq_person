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

var _bannersearch = require('./../../components/bannersearch.js');

var _bannersearch2 = _interopRequireDefault(_bannersearch);

var _corplist = require('./../../components/corplist.js');

var _corplist2 = _interopRequireDefault(_corplist);

var _navigationload = require('./../../components/navigationload.js');

var _navigationload2 = _interopRequireDefault(_navigationload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CorpPage = function (_wepy$page) {
  _inherits(CorpPage, _wepy$page);

  function CorpPage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CorpPage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CorpPage.__proto__ || Object.getPrototypeOf(CorpPage)).call.apply(_ref, [this].concat(args))), _this), _this.$repeat = { "corplist": { "com": "corplist", "props": "syncCorpdata.sync" } }, _this.$props = { "corplist": { "xmlns:v-bind": { "value": "", "for": "corplist", "item": "item", "index": "index", "key": "index" }, "v-bind:syncCorpdata.sync": { "value": "item", "type": "item", "for": "corplist", "item": "item", "index": "index", "key": "index" } } }, _this.$events = {}, _this.components = {
      bannersearch: _bannersearch2.default,
      corplist: _corplist2.default,
      navigationload: _navigationload2.default
    }, _this.data = {
      corplist: [],
      showLoading: false,
      isEmpty: false,
      currentPage: 1, //当前页面
      totalPage: 0, //总数
      showPageLoading: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CorpPage, [{
    key: 'onLoad',
    value: function onLoad(options) {
      //获取公司列表数据
      this.getCorpList();
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
      // console.log(that.totalPage + "===" + that.currentPage);
      //判断总页数是否大于翻页数
      if (that.totalPage > that.currentPage) {
        //防止重复加载
        if (that.preventRepeatReuqest) {
          return true;
        }
        that.preventRepeatReuqest = true;
        that.currentPage++;
        that.getCorpList(that.currentPage);
        that.preventRepeatReuqest = false;
      } else {
        that.showLoading = false;
      }
    }

    // 下拉刷新

  }, {
    key: 'onPullDownRefresh',
    value: function onPullDownRefresh() {
      wx.showNavigationBarLoading();
      this.onLoad();
    }
  }, {
    key: 'getCorpList',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(currentPage) {
        var that, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // wx.showLoading({
                //     title: '加载中',
                // })
                that = this;

                that.showPageLoading = true;
                _context.next = 4;
                return _api2.default.getCompanyList({
                  query: {
                    head: {
                      "transcode": "CP001",
                      "type": "h"
                    },
                    data: {
                      "p": currentPage || 1
                    }
                  }
                });

              case 4:
                json = _context.sent;

                if (json.data.returnCode == "AAAAAAA") {
                  that.corplist = [].concat(_toConsumableArray(that.corplist), _toConsumableArray(json.data.data.list));
                  that.totalPage = parseInt(json.data.data.num / 10);
                  if (json.data.data.num == 0) {
                    that.isEmpty = true; //暂无数据
                  }
                } else {
                  _tip2.default.error(json.returnMsg);
                }
                that.showPageLoading = false;
                // wx.hideLoading() //隐藏loading效果
                wx.hideNavigationBarLoading(); //完成停止加载
                wx.stopPullDownRefresh(); //停止下拉刷新
                that.$apply();
                that.showLoading = false;

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCorpList(_x) {
        return _ref2.apply(this, arguments);
      }

      return getCorpList;
    }()
  }]);

  return CorpPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(CorpPage , 'pages/corporation/corporation'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcnBvcmF0aW9uLmpzIl0sIm5hbWVzIjpbIkNvcnBQYWdlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiYmFubmVyc2VhcmNoIiwiY29ycGxpc3QiLCJuYXZpZ2F0aW9ubG9hZCIsImRhdGEiLCJzaG93TG9hZGluZyIsImlzRW1wdHkiLCJjdXJyZW50UGFnZSIsInRvdGFsUGFnZSIsInNob3dQYWdlTG9hZGluZyIsIm9wdGlvbnMiLCJnZXRDb3JwTGlzdCIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwibGVuZ3RoIiwidXJsIiwicm91dGUiLCJ0aXRsZSIsImRlc2MiLCJwYXRoIiwiZXZlbnQiLCJ0aGF0IiwicHJldmVudFJlcGVhdFJldXFlc3QiLCJ3eCIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsIm9uTG9hZCIsImdldENvbXBhbnlMaXN0IiwicXVlcnkiLCJoZWFkIiwianNvbiIsInJldHVybkNvZGUiLCJsaXN0IiwicGFyc2VJbnQiLCJudW0iLCJlcnJvciIsInJldHVybk1zZyIsImhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInN0b3BQdWxsRG93blJlZnJlc2giLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNwQkMsTyxHQUFVLEVBQUMsWUFBVyxFQUFDLE9BQU0sVUFBUCxFQUFrQixTQUFRLG1CQUExQixFQUFaLEUsUUFDWEMsTSxHQUFTLEVBQUMsWUFBVyxFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxVQUFsQixFQUE2QixRQUFPLE1BQXBDLEVBQTJDLFNBQVEsT0FBbkQsRUFBMkQsT0FBTSxPQUFqRSxFQUFoQixFQUEwRiw0QkFBMkIsRUFBQyxTQUFRLE1BQVQsRUFBZ0IsUUFBTyxNQUF2QixFQUE4QixP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anMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbmltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuaW1wb3J0IEJhbm5lclNlYXJjaCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2Jhbm5lcnNlYXJjaCc7XHJcbmltcG9ydCBDb3JwTGlzdCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvcnBsaXN0JztcclxuaW1wb3J0IE5hdmlnYXRpb25Mb2FkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbmF2aWdhdGlvbmxvYWQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29ycFBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gJHJlcGVhdCA9IHtcImNvcnBsaXN0XCI6e1wiY29tXCI6XCJjb3JwbGlzdFwiLFwicHJvcHNcIjpcInN5bmNDb3JwZGF0YS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wiY29ycGxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImNvcnBsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c3luY0NvcnBkYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJjb3JwbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICBiYW5uZXJzZWFyY2g6IEJhbm5lclNlYXJjaCxcclxuICAgIGNvcnBsaXN0OiBDb3JwTGlzdCxcclxuICAgIG5hdmlnYXRpb25sb2FkOiBOYXZpZ2F0aW9uTG9hZFxyXG4gIH1cclxuXHJcbiAgZGF0YSA9IHtcclxuICAgIGNvcnBsaXN0OiBbXSxcclxuICAgIHNob3dMb2FkaW5nOiBmYWxzZSxcclxuICAgIGlzRW1wdHk6IGZhbHNlLFxyXG4gICAgY3VycmVudFBhZ2U6IDEsICAgLy/lvZPliY3pobXpnaJcclxuICAgIHRvdGFsUGFnZTogMCwgICAgLy/mgLvmlbBcclxuICAgIHNob3dQYWdlTG9hZGluZzogdHJ1ZSxcclxuICB9XHJcblxyXG4gIG9uTG9hZCAob3B0aW9ucykge1xyXG4gICAgLy/ojrflj5blhazlj7jliJfooajmlbDmja5cclxuICAgIHRoaXMuZ2V0Q29ycExpc3QoKVxyXG4gIH1cclxuXHJcbiAgLy8g6L2s5Y+R5YiG5LqrXHJcbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XHJcbiAgICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKSAgICAvL+iOt+WPluWKoOi9veeahOmhtemdolxyXG4gICAgdmFyIGN1cnJlbnRQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoLTFdICAgIC8v6I635Y+W5b2T5YmN6aG16Z2i55qE5a+56LGhXHJcbiAgICB2YXIgdXJsID0gY3VycmVudFBhZ2Uucm91dGUgICAgLy/lvZPliY3pobXpnaJ1cmxcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiAn6YeR6J6N6IGM5Lia5py65Lya5bC95ZyoNTHph5Hono3lnIgnLFxyXG4gICAgICBkZXNjOiAnNTHph5Hono3lnIjkuKjph5Hono3kurrmiY3msYLogYzmi5vogZgnLFxyXG4gICAgICBwYXRoOiBgLyR7dXJsfWBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gKiDpobXpnaLkuIrmi4nop6blupXkuovku7bnmoTlpITnkIblh73mlbBcclxuICovXHJcbiAgb25SZWFjaEJvdHRvbShldmVudCkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgdGhhdC5zaG93TG9hZGluZyA9IHRydWU7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGF0LnRvdGFsUGFnZSArIFwiPT09XCIgKyB0aGF0LmN1cnJlbnRQYWdlKTtcclxuICAgICAgLy/liKTmlq3mgLvpobXmlbDmmK/lkKblpKfkuo7nv7vpobXmlbBcclxuICAgICAgaWYgKCh0aGF0LnRvdGFsUGFnZSkgPiB0aGF0LmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgLy/pmLLmraLph43lpI3liqDovb1cclxuICAgICAgICBpZiAodGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSB0cnVlO1xyXG4gICAgICAgIHRoYXQuY3VycmVudFBhZ2UrKztcclxuICAgICAgICB0aGF0LmdldENvcnBMaXN0KHRoYXQuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIC8vIOS4i+aLieWIt+aWsFxyXG4gIG9uUHVsbERvd25SZWZyZXNoKCl7XHJcbiAgICB3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxyXG4gICAgdGhpcy5vbkxvYWQoKVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0Q29ycExpc3QoY3VycmVudFBhZ2UpIHtcclxuICAgIC8vIHd4LnNob3dMb2FkaW5nKHtcclxuICAgIC8vICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAvLyB9KVxyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICB0aGF0LnNob3dQYWdlTG9hZGluZyA9IHRydWU7XHJcbiAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldENvbXBhbnlMaXN0KHtcclxuICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIkNQMDAxXCIsXHJcbiAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgIFwicFwiOiBjdXJyZW50UGFnZSB8fCAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICBpZiAoanNvbi5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgdGhhdC5jb3JwbGlzdCA9IFsuLi50aGF0LmNvcnBsaXN0LCAuLi5qc29uLmRhdGEuZGF0YS5saXN0XTtcclxuICAgICAgdGhhdC50b3RhbFBhZ2UgPXBhcnNlSW50KGpzb24uZGF0YS5kYXRhLm51bSAvIDEwKTtcclxuICAgICAgaWYoanNvbi5kYXRhLmRhdGEubnVtID09IDApIHtcclxuICAgICAgICB0aGF0LmlzRW1wdHkgPSB0cnVlOyAgLy/mmoLml6DmlbDmja5cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGlwLmVycm9yKGpzb24ucmV0dXJuTXNnKTtcclxuICAgIH1cclxuICAgIHRoYXQuc2hvd1BhZ2VMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAvLyB3eC5oaWRlTG9hZGluZygpIC8v6ZqQ6JePbG9hZGluZ+aViOaenFxyXG4gICAgd3guaGlkZU5hdmlnYXRpb25CYXJMb2FkaW5nKCkgLy/lrozmiJDlgZzmraLliqDovb1cclxuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKSAvL+WBnOatouS4i+aLieWIt+aWsFxyXG4gICAgdGhhdC4kYXBwbHkoKTtcclxuICAgIHRoYXQuc2hvd0xvYWRpbmcgPSBmYWxzZVxyXG4gIH1cclxufVxyXG4iXX0=