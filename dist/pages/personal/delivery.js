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

var _utils = require('./../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _commposi = require('./../../components/commposi.js');

var _commposi2 = _interopRequireDefault(_commposi);

var _bottomloadmore = require('./../../components/bottomloadmore.js');

var _bottomloadmore2 = _interopRequireDefault(_bottomloadmore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeliveryPage = function (_wepy$page) {
    _inherits(DeliveryPage, _wepy$page);

    function DeliveryPage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DeliveryPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DeliveryPage.__proto__ || Object.getPrototypeOf(DeliveryPage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '投递状态'
        }, _this.data = {
            _num: "1",
            collectData: [],
            warningWord: "",
            collectStatus: false,
            showLoading: false,
            totalPage: 0, //总数
            currentPage: 1,
            token: '',
            tokenKey: ''
        }, _this.$repeat = { "collectData": { "com": "commposi", "props": "syncPosidata.sync" } }, _this.$props = { "commposi": { "xmlns:v-bind": { "value": "", "for": "collectData", "item": "item", "index": "index", "key": "index" }, "v-bind:syncPosidata.sync": { "value": "item", "type": "item", "for": "collectData", "item": "item", "index": "index", "key": "index" } }, "bottomloadmore": { "v-bind:syncShow.sync": "showLoading", "message": "正在加载" } }, _this.$events = {}, _this.components = {
            commposi: _commposi2.default,
            bottomloadmore: _bottomloadmore2.default
        }, _this.methods = {
            // 点击切换投递状态
            menuClick: function menuClick(e) {
                this._num = e.target.dataset.num;
                this.getData(this._num);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DeliveryPage, [{
        key: 'onLoad',
        value: function onLoad() {
            // 获取登录信息
            var that = this;
            var login = wx.getStorageSync('login');
            that.token = login.token;
            that.tokenKey = login.tokenKey;
            that.$apply();
            that.getData();
        }
    }, {
        key: 'getData',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(status, currentPage) {
                var that;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                wx.showLoading({
                                    title: '加载中'
                                });
                                that = this;

                                _api2.default.getCollectJob({
                                    query: {
                                        head: {
                                            "transcode": "P0004",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": that.token,
                                            "tokenKey": that.tokenKey,
                                            "type": status || "1",
                                            "pageNo": currentPage || "1"
                                        }
                                    }
                                }).then(function (json) {
                                    wx.hideLoading();
                                    if (json.data.returnCode == "AAAAAAA") {
                                        that.collectStatus = true;
                                        that.collectData = JSON.parse(json.data.data);
                                        that.collectData.forEach(function (element) {
                                            element.createdate = _utils2.default.date('Y-m-d', element.createdate / 1000);
                                        });
                                        that.totalPage = parseInt(json.data.datanum / 10);
                                        if (that.collectData.length == 0) {
                                            that.collectStatus = false;
                                            that.warningWord = "暂未查到更多信息";
                                        }
                                    } else {
                                        that.collectStatus = false;
                                        that.warningWord = json.data.returnMsg;
                                    }

                                    that.$apply();
                                });

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getData(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return getData;
        }()
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
                that.getData(that._num, that.currentPage);
                that.preventRepeatReuqest = false;
            } else {
                that.showLoading = false;
            }
        }
    }]);

    return DeliveryPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(DeliveryPage , 'pages/personal/delivery'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbGl2ZXJ5LmpzIl0sIm5hbWVzIjpbIkRlbGl2ZXJ5UGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiX251bSIsImNvbGxlY3REYXRhIiwid2FybmluZ1dvcmQiLCJjb2xsZWN0U3RhdHVzIiwic2hvd0xvYWRpbmciLCJ0b3RhbFBhZ2UiLCJjdXJyZW50UGFnZSIsInRva2VuIiwidG9rZW5LZXkiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb21tcG9zaSIsImJvdHRvbWxvYWRtb3JlIiwibWV0aG9kcyIsIm1lbnVDbGljayIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwibnVtIiwiZ2V0RGF0YSIsInRoYXQiLCJsb2dpbiIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCIkYXBwbHkiLCJzdGF0dXMiLCJ0aXRsZSIsImdldENvbGxlY3RKb2IiLCJxdWVyeSIsImhlYWQiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJqc29uIiwicmV0dXJuQ29kZSIsIkpTT04iLCJwYXJzZSIsImZvckVhY2giLCJlbGVtZW50IiwiY3JlYXRlZGF0ZSIsImRhdGUiLCJwYXJzZUludCIsImRhdGFudW0iLCJsZW5ndGgiLCJyZXR1cm5Nc2ciLCJldmVudCIsInByZXZlbnRSZXBlYXRSZXVxZXN0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLGtCQUFNLEdBREg7QUFFSEMseUJBQWEsRUFGVjtBQUdIQyx5QkFBWSxFQUhUO0FBSUhDLDJCQUFlLEtBSlo7QUFLSEMseUJBQWEsS0FMVjtBQU1IQyx1QkFBVyxDQU5SLEVBTWM7QUFDakJDLHlCQUFhLENBUFY7QUFRSEMsbUJB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QUFtQ0o7Ozs7OztzQ0FHY29CLEssRUFBTztBQUNqQixnQkFBSXhCLE9BQU8sSUFBWDtBQUNBQSxpQkFBS2xCLFdBQUwsR0FBbUIsSUFBbkI7QUFDQTtBQUNBLGdCQUFLa0IsS0FBS2pCLFNBQU4sR0FBbUJpQixLQUFLaEIsV0FBNUIsRUFBeUM7QUFDckM7QUFDQSxvQkFBSWdCLEtBQUt5QixvQkFBVCxFQUErQjtBQUMvQiwyQkFBTyxJQUFQO0FBQ0M7QUFDRHpCLHFCQUFLeUIsb0JBQUwsR0FBNEIsSUFBNUI7QUFDQXpCLHFCQUFLaEIsV0FBTDtBQUNBZ0IscUJBQUtELE9BQUwsQ0FBYUMsS0FBS3RCLElBQWxCLEVBQXVCc0IsS0FBS2hCLFdBQTVCO0FBQ0FnQixxQkFBS3lCLG9CQUFMLEdBQTRCLEtBQTVCO0FBQ0gsYUFURCxNQVNPO0FBQ0h6QixxQkFBS2xCLFdBQUwsR0FBbUIsS0FBbkI7QUFDSDtBQUNKOzs7O0VBcEdxQyxlQUFLNEMsSTs7a0JBQTFCcEQsWSIsImZpbGUiOiJkZWxpdmVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbmltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuaW1wb3J0IHV0aWxzIGZyb20nLi4vLi4vdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgQ29tbVBvc2kgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tcG9zaSc7XHJcbmltcG9ydCBCb3R0b21Mb2FkTW9yZSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9ib3R0b21sb2FkbW9yZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVsaXZlcnlQYWdlIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oqV6YCS54q25oCBJyxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgX251bTogXCIxXCIsXHJcbiAgICAgICAgY29sbGVjdERhdGE6IFtdLFxyXG4gICAgICAgIHdhcm5pbmdXb3JkOlwiXCIsXHJcbiAgICAgICAgY29sbGVjdFN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgc2hvd0xvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIHRvdGFsUGFnZTogMCwgICAgLy/mgLvmlbBcclxuICAgICAgICBjdXJyZW50UGFnZTogMSxcclxuICAgICAgICB0b2tlbjonJyxcclxuICAgICAgICB0b2tlbktleTonJ1xyXG4gICAgfVxyXG5cclxuICAgJHJlcGVhdCA9IHtcImNvbGxlY3REYXRhXCI6e1wiY29tXCI6XCJjb21tcG9zaVwiLFwicHJvcHNcIjpcInN5bmNQb3NpZGF0YS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wiY29tbXBvc2lcIjp7XCJ4bWxuczp2LWJpbmRcIjp7XCJ2YWx1ZVwiOlwiXCIsXCJmb3JcIjpcImNvbGxlY3REYXRhXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c3luY1Bvc2lkYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJjb2xsZWN0RGF0YVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcImJvdHRvbWxvYWRtb3JlXCI6e1widi1iaW5kOnN5bmNTaG93LnN5bmNcIjpcInNob3dMb2FkaW5nXCIsXCJtZXNzYWdlXCI6XCLmraPlnKjliqDovb1cIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIGNvbW1wb3NpOiBDb21tUG9zaSxcclxuICAgICAgICBib3R0b21sb2FkbW9yZTogQm90dG9tTG9hZE1vcmVcclxuICAgIH07XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIC8vIOiOt+WPlueZu+W9leS/oeaBr1xyXG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgbGV0IGxvZ2luID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2xvZ2luJylcclxuICAgICAgdGhhdC50b2tlbiA9IGxvZ2luLnRva2VuXHJcbiAgICAgIHRoYXQudG9rZW5LZXkgPSBsb2dpbi50b2tlbktleVxyXG4gICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgIHRoYXQuZ2V0RGF0YSgpXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgIC8vIOeCueWHu+WIh+aNouaKlemAkueKtuaAgVxyXG4gICAgICAgIG1lbnVDbGljayAoZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9udW0gPSBlLnRhcmdldC5kYXRhc2V0Lm51bTtcclxuICAgICAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMuX251bSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBhc3luYyBnZXREYXRhKCBzdGF0dXMsIGN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBhcGkuZ2V0Q29sbGVjdEpvYih7XHJcbiAgICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJQMDAwNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuXCI6IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBzdGF0dXMgfHwgXCIxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlTm9cIjogY3VycmVudFBhZ2UgfHwgXCIxXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oanNvbj0+e1xyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgdGhhdC5jb2xsZWN0U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB0aGF0LmNvbGxlY3REYXRhID0gSlNPTi5wYXJzZShqc29uLmRhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgdGhhdC5jb2xsZWN0RGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBlbGVtZW50LmNyZWF0ZWRhdGUgPSB1dGlscy5kYXRlKCdZLW0tZCcsKGVsZW1lbnQuY3JlYXRlZGF0ZSkvMTAwMClcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGF0LnRvdGFsUGFnZSA9cGFyc2VJbnQoanNvbi5kYXRhLmRhdGFudW0vIDEwKTtcclxuICAgICAgICAgICAgICBpZih0aGF0LmNvbGxlY3REYXRhLmxlbmd0aD09MCl7XHJcbiAgICAgICAgICAgICAgICAgIHRoYXQuY29sbGVjdFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB0aGF0Lndhcm5pbmdXb3JkID0gXCLmmoLmnKrmn6XliLDmm7TlpJrkv6Hmga9cIjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoYXQuY29sbGVjdFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoYXQud2FybmluZ1dvcmQgPSBqc29uLmRhdGEucmV0dXJuTXNnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxyXG4gICAgICovXHJcbiAgICBvblJlYWNoQm90dG9tKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoYXQuc2hvd0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIC8v5Yik5pat5oC76aG15pWw5piv5ZCm5aSn5LqO57+76aG15pWwXHJcbiAgICAgICAgaWYgKCh0aGF0LnRvdGFsUGFnZSkgPiB0aGF0LmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XHJcbiAgICAgICAgICAgIGlmICh0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnRQYWdlKys7XHJcbiAgICAgICAgICAgIHRoYXQuZ2V0RGF0YSh0aGF0Ll9udW0sdGhhdC5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==