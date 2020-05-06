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

var _moment = require('./../../npm/moment/moment.js');

var _moment2 = _interopRequireDefault(_moment);

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
            list: [],
            warningWord: "",
            listStatus: false,
            showLoading: false,
            totalPage: 0, //总数
            currentPage: 1,
            token: '',
            tokenKey: '',
            current: '',
            status: []
        }, _this.$repeat = { "list": { "com": "commposi", "props": "syncPosidata.sync" } }, _this.$props = { "commposi": { "xmlns:v-bind": { "value": "", "for": "list", "item": "item", "index": "index", "key": "index" }, "v-bind:syncPosidata.sync": { "value": "item", "type": "item", "for": "list", "item": "item", "index": "index", "key": "index" } }, "bottomloadmore": { "v-bind:syncShow.sync": "showLoading", "message": "正在加载" } }, _this.$events = {}, _this.components = {
            commposi: _commposi2.default,
            bottomloadmore: _bottomloadmore2.default
        }, _this.methods = {
            // 点击切换投递状态
            menuClick: function menuClick(e) {
                this._num = e.target.dataset.num;
                this.getData(this._num);
            },
            getDynamic: function getDynamic(id, index) {
                console.log('点击', id);

                if (this.current !== index) {
                    this.getState(id, index);
                }
                this.current = this.current === index ? '' : index;
                this.$apply();
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
        key: 'getState',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, index) {
                var that;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                wx.showLoading({
                                    title: '加载中'
                                });
                                that = this;

                                _api2.default.getProcessView({
                                    query: {
                                        head: {
                                            "transcode": "P00026",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": that.token,
                                            "tokenKey": that.tokenKey,
                                            "applyid": id + ''
                                        }
                                    }
                                }).then(function (json) {
                                    wx.hideLoading();
                                    if (json.data.returnCode == "AAAAAAA") {
                                        // console.log(json.data.list,'')
                                        that.status = json.data.list.map(function (obj) {
                                            obj.data = (0, _moment2.default)(obj.data).format("YYYY/MM/DD hh:mm:ss");
                                            return obj;
                                        });
                                        console.log(that.status, '投递动态');
                                    } else {
                                        that.listStatus = false;
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

            function getState(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return getState;
        }()
    }, {
        key: 'getData',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(status, currentPage) {
                var that;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
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
                                        that.listStatus = true;
                                        that.list = JSON.parse(json.data.data);
                                        that.list.forEach(function (element) {
                                            element.createdate = _utils2.default.date('Y-m-d', element.createdate / 1000);
                                        });
                                        that.totalPage = parseInt(json.data.datanum / 10);
                                        if (that.list.length == 0) {
                                            that.listStatus = false;
                                            that.warningWord = "暂未查到更多信息";
                                        }
                                    } else {
                                        that.listStatus = false;
                                        that.warningWord = json.data.returnMsg;
                                    }

                                    that.$apply();
                                });

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getData(_x3, _x4) {
                return _ref3.apply(this, arguments);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbGl2ZXJ5LmpzIl0sIm5hbWVzIjpbIkRlbGl2ZXJ5UGFnZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkYXRhIiwiX251bSIsImxpc3QiLCJ3YXJuaW5nV29yZCIsImxpc3RTdGF0dXMiLCJzaG93TG9hZGluZyIsInRvdGFsUGFnZSIsImN1cnJlbnRQYWdlIiwidG9rZW4iLCJ0b2tlbktleSIsImN1cnJlbnQiLCJzdGF0dXMiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb21tcG9zaSIsImJvdHRvbWxvYWRtb3JlIiwibWV0aG9kcyIsIm1lbnVDbGljayIsImUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwibnVtIiwiZ2V0RGF0YSIsImdldER5bmFtaWMiLCJpZCIsImluZGV4IiwiY29uc29sZSIsImxvZyIsImdldFN0YXRlIiwiJGFwcGx5IiwidGhhdCIsImxvZ2luIiwid3giLCJnZXRTdG9yYWdlU3luYyIsInRpdGxlIiwiZ2V0UHJvY2Vzc1ZpZXciLCJxdWVyeSIsImhlYWQiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJqc29uIiwicmV0dXJuQ29kZSIsIm1hcCIsIm9iaiIsImZvcm1hdCIsInJldHVybk1zZyIsImdldENvbGxlY3RKb2IiLCJKU09OIiwicGFyc2UiLCJmb3JFYWNoIiwiZWxlbWVudCIsImNyZWF0ZWRhdGUiLCJkYXRlIiwicGFyc2VJbnQiLCJkYXRhbnVtIiwibGVuZ3RoIiwiZXZlbnQiLCJwcmV2ZW50UmVwZWF0UmV1cWVzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLGtCQUFNLEdBREg7QUFFSEMsa0JBQU0sRUFGSDtB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R3hCLEtBQUs5QixJQUFMLENBQVV1RCxNQUFWLElBQWtCLENBQXJCLEVBQXVCO0FBQ25CekIsaURBQUs1QixVQUFMLEdBQWtCLEtBQWxCO0FBQ0E0QixpREFBSzdCLFdBQUwsR0FBbUIsVUFBbkI7QUFDSDtBQUNKLHFDQVhELE1BV087QUFDSDZCLDZDQUFLNUIsVUFBTCxHQUFrQixLQUFsQjtBQUNBNEIsNkNBQUs3QixXQUFMLEdBQW1CdUMsS0FBSzFDLElBQUwsQ0FBVStDLFNBQTdCO0FBQ0g7O0FBRURmLHlDQUFLRCxNQUFMO0FBQ0QsaUNBaENEOzs7Ozs7Ozs7Ozs7Ozs7O0FBbUNKOzs7Ozs7c0NBR2MyQixLLEVBQU87QUFDakIsZ0JBQUkxQixPQUFPLElBQVg7QUFDQUEsaUJBQUszQixXQUFMLEdBQW1CLElBQW5CO0FBQ0E7QUFDQSxnQkFBSzJCLEtBQUsxQixTQUFOLEdBQW1CMEIsS0FBS3pCLFdBQTVCLEVBQXlDO0FBQ3JDO0FBQ0Esb0JBQUl5QixLQUFLMkIsb0JBQVQsRUFBK0I7QUFDL0IsMkJBQU8sSUFBUDtBQUNDO0FBQ0QzQixxQkFBSzJCLG9CQUFMLEdBQTRCLElBQTVCO0FBQ0EzQixxQkFBS3pCLFdBQUw7QUFDQXlCLHFCQUFLUixPQUFMLENBQWFRLEtBQUsvQixJQUFsQixFQUF1QitCLEtBQUt6QixXQUE1QjtBQUNBeUIscUJBQUsyQixvQkFBTCxHQUE0QixLQUE1QjtBQUNILGFBVEQsTUFTTztBQUNIM0IscUJBQUszQixXQUFMLEdBQW1CLEtBQW5CO0FBQ0g7QUFDSjs7OztFQXBKcUMsZUFBS3VELEk7O2tCQUExQi9ELFkiLCJmaWxlIjoiZGVsaXZlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG5pbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcbmltcG9ydCB1dGlscyBmcm9tJy4uLy4uL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IENvbW1Qb3NpIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbXBvc2knO1xyXG5pbXBvcnQgQm90dG9tTG9hZE1vcmUgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvYm90dG9tbG9hZG1vcmVcIjtcclxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWxpdmVyeVBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmipXpgJLnirbmgIEnLFxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgICBfbnVtOiBcIjFcIixcclxuICAgICAgICBsaXN0OiBbXSxcclxuICAgICAgICB3YXJuaW5nV29yZDpcIlwiLFxyXG4gICAgICAgIGxpc3RTdGF0dXM6IGZhbHNlLFxyXG4gICAgICAgIHNob3dMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICB0b3RhbFBhZ2U6IDAsICAgIC8v5oC75pWwXHJcbiAgICAgICAgY3VycmVudFBhZ2U6IDEsXHJcbiAgICAgICAgdG9rZW46JycsXHJcbiAgICAgICAgdG9rZW5LZXk6JycsXHJcbiAgICAgICAgY3VycmVudDonJyxcclxuICAgICAgICBzdGF0dXM6W10sXHJcbiAgICB9XHJcblxyXG4gICAkcmVwZWF0ID0ge1wibGlzdFwiOntcImNvbVwiOlwiY29tbXBvc2lcIixcInByb3BzXCI6XCJzeW5jUG9zaWRhdGEuc3luY1wifX07XHJcbiRwcm9wcyA9IHtcImNvbW1wb3NpXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c3luY1Bvc2lkYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwiYm90dG9tbG9hZG1vcmVcIjp7XCJ2LWJpbmQ6c3luY1Nob3cuc3luY1wiOlwic2hvd0xvYWRpbmdcIixcIm1lc3NhZ2VcIjpcIuato+WcqOWKoOi9vVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgICAgY29tbXBvc2k6IENvbW1Qb3NpLFxyXG4gICAgICAgIGJvdHRvbWxvYWRtb3JlOiBCb3R0b21Mb2FkTW9yZVxyXG4gICAgfTtcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgLy8g6I635Y+W55m75b2V5L+h5oGvXHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICBsZXQgbG9naW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW4nKVxyXG4gICAgICB0aGF0LnRva2VuID0gbG9naW4udG9rZW5cclxuICAgICAgdGhhdC50b2tlbktleSA9IGxvZ2luLnRva2VuS2V5XHJcbiAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgdGhhdC5nZXREYXRhKClcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICAgLy8g54K55Ye75YiH5o2i5oqV6YCS54q25oCBXHJcbiAgICAgICAgbWVudUNsaWNrIChlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX251bSA9IGUudGFyZ2V0LmRhdGFzZXQubnVtO1xyXG4gICAgICAgICAgICB0aGlzLmdldERhdGEodGhpcy5fbnVtKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldER5bmFtaWMoaWQsaW5kZXgpe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+eCueWHuycsaWQpXHJcblxyXG4gICAgICAgICAgaWYodGhpcy5jdXJyZW50IT09aW5kZXgpe1xyXG4gICAgICAgICAgICB0aGlzLmdldFN0YXRlKGlkLGluZGV4KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50PT09aW5kZXg/Jyc6aW5kZXhcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGFzeW5jIGdldFN0YXRlKGlkLGluZGV4KSB7XHJcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBhcGkuZ2V0UHJvY2Vzc1ZpZXcoe1xyXG4gICAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiUDAwMDI2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhcHBseWlkXCI6IGlkKycnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKGpzb249PntcclxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhqc29uLmRhdGEubGlzdCwnJylcclxuICAgICAgICAgICAgdGhhdC5zdGF0dXMgPSBqc29uLmRhdGEubGlzdC5tYXAob2JqPT57XHJcbiAgICAgICAgICAgICAgb2JqLmRhdGEgPSBtb21lbnQob2JqLmRhdGEpLmZvcm1hdChcIllZWVkvTU0vREQgaGg6bW06c3NcIilcclxuICAgICAgICAgICAgICByZXR1cm4gb2JqXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQuc3RhdHVzLCfmipXpgJLliqjmgIEnKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGF0Lmxpc3RTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGF0Lndhcm5pbmdXb3JkID0ganNvbi5kYXRhLnJldHVybk1zZztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBhc3luYyBnZXREYXRhKCBzdGF0dXMsIGN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBhcGkuZ2V0Q29sbGVjdEpvYih7XHJcbiAgICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJQMDAwNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuXCI6IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBzdGF0dXMgfHwgXCIxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlTm9cIjogY3VycmVudFBhZ2UgfHwgXCIxXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oanNvbj0+e1xyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgdGhhdC5saXN0U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB0aGF0Lmxpc3QgPSBKU09OLnBhcnNlKGpzb24uZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICB0aGF0Lmxpc3QuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgZWxlbWVudC5jcmVhdGVkYXRlID0gdXRpbHMuZGF0ZSgnWS1tLWQnLChlbGVtZW50LmNyZWF0ZWRhdGUpLzEwMDApXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgdGhhdC50b3RhbFBhZ2UgPXBhcnNlSW50KGpzb24uZGF0YS5kYXRhbnVtLyAxMCk7XHJcbiAgICAgICAgICAgICAgaWYodGhhdC5saXN0Lmxlbmd0aD09MCl7XHJcbiAgICAgICAgICAgICAgICAgIHRoYXQubGlzdFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICB0aGF0Lndhcm5pbmdXb3JkID0gXCLmmoLmnKrmn6XliLDmm7TlpJrkv6Hmga9cIjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoYXQubGlzdFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoYXQud2FybmluZ1dvcmQgPSBqc29uLmRhdGEucmV0dXJuTXNnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouS4iuaLieinpuW6leS6i+S7tueahOWkhOeQhuWHveaVsFxyXG4gICAgICovXHJcbiAgICBvblJlYWNoQm90dG9tKGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRoYXQuc2hvd0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIC8v5Yik5pat5oC76aG15pWw5piv5ZCm5aSn5LqO57+76aG15pWwXHJcbiAgICAgICAgaWYgKCh0aGF0LnRvdGFsUGFnZSkgPiB0aGF0LmN1cnJlbnRQYWdlKSB7XHJcbiAgICAgICAgICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XHJcbiAgICAgICAgICAgIGlmICh0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGF0LmN1cnJlbnRQYWdlKys7XHJcbiAgICAgICAgICAgIHRoYXQuZ2V0RGF0YSh0aGF0Ll9udW0sdGhhdC5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgICAgIHRoYXQucHJldmVudFJlcGVhdFJldXFlc3QgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==