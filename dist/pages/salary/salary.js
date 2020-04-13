'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Url = function (_wepy$page) {
  _inherits(Url, _wepy$page);

  function Url() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Url);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Url.__proto__ || Object.getPrototypeOf(Url)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '薪税计算器'
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Url, [{
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
  }]);

  return Url;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Url , 'pages/salary/salary'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNhbGFyeS5qcyJdLCJuYW1lcyI6WyJVcmwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwicGFnZXMiLCJnZXRDdXJyZW50UGFnZXMiLCJjdXJyZW50UGFnZSIsImxlbmd0aCIsInVybCIsInJvdXRlIiwidGl0bGUiLCJkZXNjIiwicGF0aCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLEc7Ozs7Ozs7Ozs7Ozs7O2dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLOzs7Ozt3Q0FHVztBQUNoQixVQUFJQyxRQUFRQyxpQkFBWixDQURnQixDQUNpQjtBQUNqQyxVQUFJQyxjQUFjRixNQUFNQSxNQUFNRyxNQUFOLEdBQWEsQ0FBbkIsQ0FBbEIsQ0FGZ0IsQ0FFMkI7QUFDM0MsVUFBSUMsTUFBTUYsWUFBWUcsS0FBdEIsQ0FIZ0IsQ0FHZTtBQUMvQixhQUFPO0FBQ1BDLGVBQU8sZUFEQTtBQUVQQyxjQUFNLGdCQUZDO0FBR1BDLG9CQUFVSjtBQUhILE9BQVA7QUFLSDs7OztFQWI4QixlQUFLSyxJOztrQkFBakJaLEciLCJmaWxlIjoic2FsYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXJsIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iWqueojuiuoeeul+WZqCcsXHJcbiAgICB9XHJcbiAgICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcclxuICAgICAgICB2YXIgcGFnZXMgPSBnZXRDdXJyZW50UGFnZXMoKSAgICAvL+iOt+WPluWKoOi9veeahOmhtemdolxyXG4gICAgICAgIHZhciBjdXJyZW50UGFnZSA9IHBhZ2VzW3BhZ2VzLmxlbmd0aC0xXSAgICAvL+iOt+WPluW9k+WJjemhtemdoueahOWvueixoVxyXG4gICAgICAgIHZhciB1cmwgPSBjdXJyZW50UGFnZS5yb3V0ZSAgICAvL+W9k+WJjemhtemdonVybFxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGl0bGU6ICfph5Hono3ogYzkuJrmnLrkvJrlsL3lnKg1MemHkeiejeWciCcsXHJcbiAgICAgICAgZGVzYzogJzUx6YeR6J6N5ZyI5Lio6YeR6J6N5Lq65omN5rGC6IGM5oub6IGYJyxcclxuICAgICAgICBwYXRoOiBgLyR7dXJsfWBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=