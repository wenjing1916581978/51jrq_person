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

var IndexPage = function (_wepy$page) {
  _inherits(IndexPage, _wepy$page);

  function IndexPage() {
    _classCallCheck(this, IndexPage);

    return _possibleConstructorReturn(this, (IndexPage.__proto__ || Object.getPrototypeOf(IndexPage)).apply(this, arguments));
  }

  _createClass(IndexPage, [{
    key: 'onLoad',
    value: function onLoad(options) {
      console.log(options);
      // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
      var sceneArgs = decodeURIComponent(options.scene);
      if (sceneArgs != 'undefined') {
        //hv*cid=42&jid=1180015
        console.log('进入判断', sceneArgs);
        var args_arr = [],
            params_arr = [];
        args_arr = sceneArgs.split('*');
        var _type = args_arr[0];
        params_arr = args_arr[1].split('&');
        var paramObj = new Object();
        if (_type == 'hv') {
          for (var i = 0; i < params_arr.length; i++) {
            paramObj[params_arr[i].split('=')[0]] = params_arr[i].split('=')[1];
          }
          var param = 'corpid=' + paramObj["cid"] + '&jobid=' + paramObj["jid"];
          wx.redirectTo({ url: '../home/homeview?' + param });
        }if (_type == 'cv') {
          for (var _i = 0; _i < params_arr.length; _i++) {
            paramObj[params_arr[_i].split('=')[0]] = params_arr[_i].split('=')[1];
          }
          var _param = 'companyid=' + paramObj["cpid"];
          wx.redirectTo({ url: '../corporation/corpview?' + _param });
        }
      } else {
        console.log('进入首页');
        wx.switchTab({
          url: '../home/home'
        });
      }
    }
  }]);

  return IndexPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(IndexPage , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4UGFnZSIsIm9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwic2NlbmVBcmdzIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2NlbmUiLCJhcmdzX2FyciIsInBhcmFtc19hcnIiLCJzcGxpdCIsIl90eXBlIiwicGFyYW1PYmoiLCJPYmplY3QiLCJpIiwibGVuZ3RoIiwicGFyYW0iLCJ3eCIsInJlZGlyZWN0VG8iLCJ1cmwiLCJzd2l0Y2hUYWIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7OzsyQkFDWkMsTyxFQUFTO0FBQ1pDLGNBQVFDLEdBQVIsQ0FBWUYsT0FBWjtBQUNBO0FBQ0YsVUFBSUcsWUFBWUMsbUJBQW1CSixRQUFRSyxLQUEzQixDQUFoQjtBQUNBLFVBQUlGLGFBQWEsV0FBakIsRUFBOEI7QUFBRztBQUMvQkYsZ0JBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW1CQyxTQUFuQjtBQUNBLFlBQUlHLFdBQVcsRUFBZjtBQUFBLFlBQW1CQyxhQUFhLEVBQWhDO0FBQ0FELG1CQUFXSCxVQUFVSyxLQUFWLENBQWdCLEdBQWhCLENBQVg7QUFDQSxZQUFJQyxRQUFRSCxTQUFTLENBQVQsQ0FBWjtBQUNBQyxxQkFBYUQsU0FBUyxDQUFULEVBQVlFLEtBQVosQ0FBa0IsR0FBbEIsQ0FBYjtBQUNBLFlBQUlFLFdBQVcsSUFBSUMsTUFBSixFQUFmO0FBQ0EsWUFBSUYsU0FBUyxJQUFiLEVBQW1CO0FBQ2pCLGVBQUssSUFBSUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJTCxXQUFXTSxNQUEvQixFQUF1Q0QsR0FBdkMsRUFBNEM7QUFDMUNGLHFCQUFTSCxXQUFXSyxDQUFYLEVBQWNKLEtBQWQsQ0FBb0IsR0FBcEIsRUFBeUIsQ0FBekIsQ0FBVCxJQUF3Q0QsV0FBV0ssQ0FBWCxFQUFjSixLQUFkLENBQW9CLEdBQXBCLEVBQXlCLENBQXpCLENBQXhDO0FBQ0Q7QUFDRCxjQUFJTSxvQkFBa0JKLFNBQVMsS0FBVCxDQUFsQixlQUEyQ0EsU0FBUyxLQUFULENBQS9DO0FBQ0FLLGFBQUdDLFVBQUgsQ0FBYyxFQUFFQywyQkFBeUJILEtBQTNCLEVBQWQ7QUFDRCxTQUFDLElBQUlMLFNBQVMsSUFBYixFQUFtQjtBQUNuQixlQUFLLElBQUlHLEtBQUksQ0FBYixFQUFnQkEsS0FBSUwsV0FBV00sTUFBL0IsRUFBdUNELElBQXZDLEVBQTRDO0FBQzFDRixxQkFBU0gsV0FBV0ssRUFBWCxFQUFjSixLQUFkLENBQW9CLEdBQXBCLEVBQXlCLENBQXpCLENBQVQsSUFBd0NELFdBQVdLLEVBQVgsRUFBY0osS0FBZCxDQUFvQixHQUFwQixFQUF5QixDQUF6QixDQUF4QztBQUNEO0FBQ0QsY0FBSU0sd0JBQXFCSixTQUFTLE1BQVQsQ0FBekI7QUFDQUssYUFBR0MsVUFBSCxDQUFjLEVBQUVDLGtDQUFnQ0gsTUFBbEMsRUFBZDtBQUNEO0FBQ0YsT0FwQkQsTUFvQks7QUFDSGIsZ0JBQVFDLEdBQVIsQ0FBWSxNQUFaO0FBQ0FhLFdBQUdHLFNBQUgsQ0FBYTtBQUNYRCxlQUFLO0FBRE0sU0FBYjtBQUdEO0FBQ0Y7Ozs7RUEvQm9DLGVBQUtFLEk7O2tCQUF2QnBCLFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4UGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgb25Mb2FkKG9wdGlvbnMpIHtcclxuICAgICAgY29uc29sZS5sb2cob3B0aW9ucylcclxuICAgICAgLy8gb3B0aW9ucyDkuK3nmoQgc2NlbmUg6ZyA6KaB5L2/55SoIGRlY29kZVVSSUNvbXBvbmVudCDmiY3og73ojrflj5bliLDnlJ/miJDkuoznu7TnoIHml7bkvKDlhaXnmoQgc2NlbmVcclxuICAgIGxldCBzY2VuZUFyZ3MgPSBkZWNvZGVVUklDb21wb25lbnQob3B0aW9ucy5zY2VuZSk7XHJcbiAgICBpZiAoc2NlbmVBcmdzICE9ICd1bmRlZmluZWQnKSB7ICAvL2h2KmNpZD00MiZqaWQ9MTE4MDAxNVxyXG4gICAgICBjb25zb2xlLmxvZygn6L+b5YWl5Yik5patJyxzY2VuZUFyZ3MpICAgIFxyXG4gICAgICBsZXQgYXJnc19hcnIgPSBbXSwgcGFyYW1zX2FyciA9IFtdO1xyXG4gICAgICBhcmdzX2FyciA9IHNjZW5lQXJncy5zcGxpdCgnKicpO1xyXG4gICAgICBsZXQgX3R5cGUgPSBhcmdzX2FyclswXTtcclxuICAgICAgcGFyYW1zX2FyciA9IGFyZ3NfYXJyWzFdLnNwbGl0KCcmJyk7XHJcbiAgICAgIGxldCBwYXJhbU9iaiA9IG5ldyBPYmplY3QoKTtcclxuICAgICAgaWYgKF90eXBlID09ICdodicpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmFtc19hcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHBhcmFtT2JqW3BhcmFtc19hcnJbaV0uc3BsaXQoJz0nKVswXV0gPSBwYXJhbXNfYXJyW2ldLnNwbGl0KCc9JylbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYXJhbSA9IGBjb3JwaWQ9JHtwYXJhbU9ialtcImNpZFwiXX0mam9iaWQ9JHtwYXJhbU9ialtcImppZFwiXX1gO1xyXG4gICAgICAgIHd4LnJlZGlyZWN0VG8oeyB1cmw6IGAuLi9ob21lL2hvbWV2aWV3PyR7cGFyYW19YH0pO1xyXG4gICAgICB9IGlmIChfdHlwZSA9PSAnY3YnKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhbXNfYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBwYXJhbU9ialtwYXJhbXNfYXJyW2ldLnNwbGl0KCc9JylbMF1dID0gcGFyYW1zX2FycltpXS5zcGxpdCgnPScpWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFyYW0gPSBgY29tcGFueWlkPSR7cGFyYW1PYmpbXCJjcGlkXCJdfWA7XHJcbiAgICAgICAgd3gucmVkaXJlY3RUbyh7IHVybDogYC4uL2NvcnBvcmF0aW9uL2NvcnB2aWV3PyR7cGFyYW19YH0pOyAgXHJcbiAgICAgIH1cclxuICAgIH1lbHNle1xyXG4gICAgICBjb25zb2xlLmxvZygn6L+b5YWl6aaW6aG1JylcclxuICAgICAgd3guc3dpdGNoVGFiKHsgIFxyXG4gICAgICAgIHVybDogJy4uL2hvbWUvaG9tZScsXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==