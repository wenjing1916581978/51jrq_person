'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CorpList = function (_wepy$component) {
  _inherits(CorpList, _wepy$component);

  function CorpList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CorpList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CorpList.__proto__ || Object.getPrototypeOf(CorpList)).call.apply(_ref, [this].concat(args))), _this), _this.methods = {
      // 跳转公司详情
      goCorpView: function goCorpView(companyid) {
        wx.navigateTo({
          url: '/pages/corporation/corpview?companyid=' + companyid
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return CorpList;
}(_wepy2.default.component);

exports.default = CorpList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcnBsaXN0LmpzIl0sIm5hbWVzIjpbIkNvcnBMaXN0IiwibWV0aG9kcyIsImdvQ29ycFZpZXciLCJjb21wYW55aWQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDSTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxROzs7Ozs7Ozs7Ozs7OzswTEFFbkJDLE8sR0FBVTtBQUNSO0FBQ0FDLGdCQUZRLHNCQUVJQyxTQUZKLEVBRWU7QUFDckJDLFdBQUdDLFVBQUgsQ0FBYztBQUNaQywwREFBOENIO0FBRGxDLFNBQWQ7QUFHRDtBQU5PLEs7Ozs7RUFGMEIsZUFBS0ksUzs7a0JBQXRCUCxRIiwiZmlsZSI6ImNvcnBsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuICAgIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENvcnBMaXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQgIHtcclxuXHJcbiAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgLy8g6Lez6L2s5YWs5Y+46K+m5oOFXHJcbiAgICAgICAgZ29Db3JwVmlldyAoY29tcGFueWlkKSB7XHJcbiAgICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBgL3BhZ2VzL2NvcnBvcmF0aW9uL2NvcnB2aWV3P2NvbXBhbnlpZD0ke2NvbXBhbnlpZH1gXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICB9XHJcbiJdfQ==