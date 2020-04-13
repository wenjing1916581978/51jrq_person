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

var _commposi = require('./../../components/commposi2.js');

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
                this.getCollectJob(this.token, this.tokenKey, this._num);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DeliveryPage, [{
        key: 'onLoad',
        value: function onLoad() {

            // 获取登录信息
            var that = this;
            wx.getStorage({
                key: 'loginData',
                success: function success(res) {
                    that.token = res.data.token;
                    that.tokenKey = res.data.tokenKey;
                    that.$apply();
                    // 获取已投递职位
                    that.getCollectJob(res.data.token, res.data.tokenKey);
                }
            });
        }
    }, {
        key: 'getCollectJob',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, tokenKey, status, currentPage) {
                var that, json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                wx.showLoading({
                                    title: '加载中'
                                });
                                that = this;
                                _context.next = 4;
                                return _api2.default.getCollectJob({
                                    query: {
                                        head: {
                                            "transcode": "P0004",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": token,
                                            "tokenKey": tokenKey,
                                            "type": status || "1",
                                            "pageNo": currentPage || "1"
                                        }
                                    }
                                });

                            case 4:
                                json = _context.sent;

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
                                wx.hideLoading();
                                that.$apply();

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getCollectJob(_x, _x2, _x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return getCollectJob;
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
                that.getCollectJob(that.token, that.tokenKey, that._num, that.currentPage);
                that.preventRepeatReuqest = false;
            } else {
                that.showLoading = false;
            }
        }
    }]);

    return DeliveryPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(DeliveryPage , 'pages/personal/delivery'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbGl2ZXJ5LmpzIl0sIm5hbWVzIjpbIkRlbGl2ZXJ5UGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiX251bSIsImNvbGxlY3REYXRhIiwid2FybmluZ1dvcmQiLCJjb2xsZWN0U3RhdHVzIiwic2hvd0xvYWRpbmciLCJ0b3RhbFBhZ2UiLCJjdXJyZW50UGFnZSIsInRva2VuIiwidG9rZW5LZXkiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb21tcG9zaSIsImJvdHRvbWxvYWRtb3JlIiwibWV0aG9kcyIsIm1lbnVDbGljayIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwibnVtIiwiZ2V0Q29sbGVjdEpvYiIsInRoYXQiLCJ3eCIsImdldFN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwicmVzIiwiJGFwcGx5Iiwic3RhdHVzIiwidGl0bGUiLCJxdWVyeSIsImhlYWQiLCJqc29uIiwicmV0dXJuQ29kZSIsIkpTT04iLCJwYXJzZSIsImZvckVhY2giLCJlbGVtZW50IiwiY3JlYXRlZGF0ZSIsImRhdGUiLCJwYXJzZUludCIsImRhdGFudW0iLCJsZW5ndGgiLCJyZXR1cm5Nc2ciLCJoaWRlTG9hZGluZyIsImV2ZW50IiwicHJldmVudFJlcGVhdFJldXFlc3QiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxZOzs7Ozs7Ozs7Ozs7OztzTUFDakJDLE0sR0FBUztBQUNMQyxvQ0FBd0I7QUFEbkIsUyxRQUdUQyxJLEdBQU87QUFDSEMsa0JBQU0sR0FESDtBQUVIQyx5QkFBYSxFQUZWO0FBR0hDLHlCQUFZLEVBSFQ7QUFJSEMsMkJBQWUsS0FKWjtBQUtIQyx5QkFBYSxLQUxWO0FBTUhDLHVCQUFXLENBTlIsRUFNYztBQUNqQkMseUJBQWEsQ0FQVjtBQVFIQyxtQkFBTSxFQVJI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RCxNQVdPO0FBQ0hvQix5Q0FBS25CLGFBQUwsR0FBcUIsS0FBckI7QUFDQW1CLHlDQUFLcEIsV0FBTCxHQUFtQitCLEtBQUtsQyxJQUFMLENBQVU2QyxTQUE3QjtBQUNIO0FBQ0RyQixtQ0FBR3NCLFdBQUg7QUFDQXZCLHFDQUFLTSxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUo7Ozs7OztzQ0FHY2tCLEssRUFBTztBQUNqQixnQkFBSXhCLE9BQU8sSUFBWDtBQUNBQSxpQkFBS2xCLFdBQUwsR0FBbUIsSUFBbkI7QUFDQTtBQUNBLGdCQUFLa0IsS0FBS2pCLFNBQU4sR0FBbUJpQixLQUFLaEIsV0FBNUIsRUFBeUM7QUFDckM7QUFDQSxvQkFBSWdCLEtBQUt5QixvQkFBVCxFQUErQjtBQUMvQiwyQkFBTyxJQUFQO0FBQ0M7QUFDRHpCLHFCQUFLeUIsb0JBQUwsR0FBNEIsSUFBNUI7QUFDQXpCLHFCQUFLaEIsV0FBTDtBQUNBZ0IscUJBQUtELGFBQUwsQ0FBbUJDLEtBQUtmLEtBQXhCLEVBQStCZSxLQUFLZCxRQUFwQyxFQUE4Q2MsS0FBS3RCLElBQW5ELEVBQXdEc0IsS0FBS2hCLFdBQTdEO0FBQ0FnQixxQkFBS3lCLG9CQUFMLEdBQTRCLEtBQTVCO0FBQ0gsYUFURCxNQVNPO0FBQ0h6QixxQkFBS2xCLFdBQUwsR0FBbUIsS0FBbkI7QUFDSDtBQUNKOzs7O0VBMUdxQyxlQUFLNEMsSTs7a0JBQTFCcEQsWSIsImZpbGUiOiJkZWxpdmVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbmltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuaW1wb3J0IHV0aWxzIGZyb20nLi4vLi4vdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgQ29tbVBvc2kgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tcG9zaTInO1xyXG5pbXBvcnQgQm90dG9tTG9hZE1vcmUgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvYm90dG9tbG9hZG1vcmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlbGl2ZXJ5UGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aKlemAkueKtuaAgScsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIF9udW06IFwiMVwiLFxyXG4gICAgICAgIGNvbGxlY3REYXRhOiBbXSxcclxuICAgICAgICB3YXJuaW5nV29yZDpcIlwiLFxyXG4gICAgICAgIGNvbGxlY3RTdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgIHNob3dMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICB0b3RhbFBhZ2U6IDAsICAgIC8v5oC75pWwXHJcbiAgICAgICAgY3VycmVudFBhZ2U6IDEsXHJcbiAgICAgICAgdG9rZW46JycsXHJcbiAgICAgICAgdG9rZW5LZXk6JydcclxuICAgIH1cclxuXHJcbiAgICRyZXBlYXQgPSB7XCJjb2xsZWN0RGF0YVwiOntcImNvbVwiOlwiY29tbXBvc2lcIixcInByb3BzXCI6XCJzeW5jUG9zaWRhdGEuc3luY1wifX07XHJcbiRwcm9wcyA9IHtcImNvbW1wb3NpXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJjb2xsZWN0RGF0YVwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9LFwidi1iaW5kOnN5bmNQb3NpZGF0YS5zeW5jXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiY29sbGVjdERhdGFcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifX0sXCJib3R0b21sb2FkbW9yZVwiOntcInYtYmluZDpzeW5jU2hvdy5zeW5jXCI6XCJzaG93TG9hZGluZ1wiLFwibWVzc2FnZVwiOlwi5q2j5Zyo5Yqg6L29XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICBjb21tcG9zaTogQ29tbVBvc2ksXHJcbiAgICAgICAgYm90dG9tbG9hZG1vcmU6IEJvdHRvbUxvYWRNb3JlXHJcbiAgICB9O1xyXG4gICAgb25Mb2FkKCkgeyBcclxuICAgICAgICBcclxuICAgICAgICAvLyDojrflj5bnmbvlvZXkv6Hmga9cclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5nZXRTdG9yYWdlKHtcclxuICAgICAgICAgICAga2V5OiAnbG9naW5EYXRhJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRva2VuID0gcmVzLmRhdGEudG9rZW47XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRva2VuS2V5ID0gcmVzLmRhdGEudG9rZW5LZXk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgLy8g6I635Y+W5bey5oqV6YCS6IGM5L2NXHJcbiAgICAgICAgICAgICAgICB0aGF0LmdldENvbGxlY3RKb2IocmVzLmRhdGEudG9rZW4scmVzLmRhdGEudG9rZW5LZXkpXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuXHJcbiAgICAgICAvLyDngrnlh7vliIfmjaLmipXpgJLnirbmgIFcclxuICAgICAgICBtZW51Q2xpY2sgKGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbnVtID0gZS50YXJnZXQuZGF0YXNldC5udW07XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q29sbGVjdEpvYih0aGlzLnRva2VuLCB0aGlzLnRva2VuS2V5LCB0aGlzLl9udW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGFzeW5jIGdldENvbGxlY3RKb2IodG9rZW4sIHRva2VuS2V5LCBzdGF0dXMsIGN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldENvbGxlY3RKb2Ioe1xyXG4gICAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiUDAwMDRcIixcclxuICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbixcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBzdGF0dXMgfHwgXCIxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlTm9cIjogY3VycmVudFBhZ2UgfHwgXCIxXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgIHRoYXQuY29sbGVjdFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoYXQuY29sbGVjdERhdGEgPSBKU09OLnBhcnNlKGpzb24uZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgdGhhdC5jb2xsZWN0RGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jcmVhdGVkYXRlID0gdXRpbHMuZGF0ZSgnWS1tLWQnLChlbGVtZW50LmNyZWF0ZWRhdGUpLzEwMDApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGF0LnRvdGFsUGFnZSA9cGFyc2VJbnQoanNvbi5kYXRhLmRhdGFudW0vIDEwKTtcclxuICAgICAgICAgICAgaWYodGhhdC5jb2xsZWN0RGF0YS5sZW5ndGg9PTApe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jb2xsZWN0U3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lndhcm5pbmdXb3JkID0gXCLmmoLmnKrmn6XliLDmm7TlpJrkv6Hmga9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoYXQuY29sbGVjdFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGF0Lndhcm5pbmdXb3JkID0ganNvbi5kYXRhLnJldHVybk1zZztcclxuICAgICAgICB9XHJcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxyXG4gICAgICovXHJcbiAgICBvblJlYWNoQm90dG9tKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoYXQuc2hvd0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIC8v5Yik5pat5oC76aG15pWw5piv5ZCm5aSn5LqO57+76aG15pWwXHJcbiAgICAgICAgaWYgKCh0aGF0LnRvdGFsUGFnZSkgPiB0aGF0LmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XHJcbiAgICAgICAgICAgIGlmICh0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnRQYWdlKys7XHJcbiAgICAgICAgICAgIHRoYXQuZ2V0Q29sbGVjdEpvYih0aGF0LnRva2VuLCB0aGF0LnRva2VuS2V5LCB0aGF0Ll9udW0sdGhhdC5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==