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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CollectionPage = function (_wepy$page) {
    _inherits(CollectionPage, _wepy$page);

    function CollectionPage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, CollectionPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CollectionPage.__proto__ || Object.getPrototypeOf(CollectionPage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '我的收藏'
        }, _this.data = {
            collectStatus: false,
            warningWord: "",
            collectData: [],
            token: '',
            tokenKey: ''
        }, _this.$repeat = { "collectData": { "com": "commposi", "props": "syncPosidata.sync" } }, _this.$props = { "commposi": { "xmlns:v-bind": { "value": "", "for": "collectData", "item": "item", "index": "index", "key": "index" }, "v-bind:syncPosidata.sync": { "value": "item", "type": "item", "for": "collectData", "item": "item", "index": "index", "key": "index" } } }, _this.$events = {}, _this.components = {
            commposi: _commposi2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CollectionPage, [{
        key: 'onLoad',
        value: function onLoad() {

            // 获取收藏职位
            this.getCollectJob();

            // 获取登录信息
            var that = this;
            wx.getStorage({
                key: 'loginData',
                success: function success(res) {
                    that.token = res.data.token;
                    that.tokenKey = res.data.tokenKey;
                    that.$apply();
                    that.getCollectJob(res.data.token, res.data.tokenKey);
                }
            });
        }
    }, {
        key: 'getCollectJob',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, tokenKey, currentPage) {
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
                                            "transcode": "P0003",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": token,
                                            "tokenKey": tokenKey,
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
                                    if (that.collectData.length == 0) {
                                        that.collectStatus = false;
                                        that.warningWord = "还没有收藏过职位哦";
                                    }
                                    that.$apply();
                                } else {
                                    that.collectStatus = false;
                                    that.warningWord = json.data.returnMsg;
                                    that.$apply();
                                }
                                wx.hideLoading();

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getCollectJob(_x, _x2, _x3) {
                return _ref2.apply(this, arguments);
            }

            return getCollectJob;
        }()
    }]);

    return CollectionPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(CollectionPage , 'pages/personal/collection'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3Rpb24uanMiXSwibmFtZXMiOlsiQ29sbGVjdGlvblBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImNvbGxlY3RTdGF0dXMiLCJ3YXJuaW5nV29yZCIsImNvbGxlY3REYXRhIiwidG9rZW4iLCJ0b2tlbktleSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbW1wb3NpIiwiZ2V0Q29sbGVjdEpvYiIsInRoYXQiLCJ3eCIsImdldFN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwicmVzIiwiJGFwcGx5IiwiY3VycmVudFBhZ2UiLCJzaG93TG9hZGluZyIsInRpdGxlIiwicXVlcnkiLCJoZWFkIiwianNvbiIsInJldHVybkNvZGUiLCJKU09OIiwicGFyc2UiLCJmb3JFYWNoIiwiZWxlbWVudCIsImNyZWF0ZWRhdGUiLCJkYXRlIiwibGVuZ3RoIiwicmV0dXJuTXNnIiwiaGlkZUxvYWRpbmciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Ozs7Ozs7ME1BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0hDLDJCQUFlLEtBRFo7QUFFSEMseUJBQWEsRUFGVjtBQUdIQyx5QkFBYSxFQUhWO0FBSUhDLG1CQUFNLEVBSkg7QUFLSEMsc0JBQVM7QUFMTixTLFFBUVJDLE8sR0FBVSxFQUFDLGVBQWMsRUFBQyxPQUFNLFVBQVAsRUFBa0IsU0FBUSxtQkFBMUIsRUFBZixFLFFBQ2JDLE0sR0FBUyxFQUFDLFlBQVcsRUFBQyxnQkFBZSxFQUFDLFNBQVEsRUFBVCxFQUFZLE9BQU0sYUFBbEIsRUFBZ0MsUUFBTyxNQUF2QyxFQUE4QyxTQUFRLE9BQXRELEVBQThELE9BQU0sT0FBcEUsRUFBaEIsRUFBNkYsNEJBQTJCLEVBQUMsU0FBUSxNQUFULEVBQWdCLFFBQU8sTUFBdkIsRUFBOEIsT0FBTSxhQUFwQyxFQUFrRCxRQUFPLE1BQXpELEVBQWdFLFNBQVEsT0FBeEUsRUFBZ0YsT0FBTSxPQUF0RixFQUF4SCxFQUFaLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ05DO0FBRE0sUzs7Ozs7aUNBR0Q7O0FBRUw7QUFDQSxpQkFBS0MsYUFBTDs7QUFFQTtBQUNBLGdCQUFNQyxPQUFPLElBQWI7QUFDQUMsZUFBR0MsVUFBSCxDQUFjO0FBQ1ZDLHFCQUFLLFdBREs7QUFFVkMseUJBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQkwseUJBQUtSLEtBQUwsR0FBYWEsSUFBSWpCLElBQUosQ0FBU0ksS0FBdEI7QUFDQVEseUJBQUtQLFFBQUwsR0FBZ0JZLElBQUlqQixJQUFKLENBQVNLLFFBQXpCO0FBQ0FPLHlCQUFLTSxNQUFMO0FBQ0FOLHlCQUFLRCxhQUFMLENBQW1CTSxJQUFJakIsSUFBSixDQUFTSSxLQUE1QixFQUFrQ2EsSUFBSWpCLElBQUosQ0FBU0ssUUFBM0M7QUFDSDtBQVBTLGFBQWQ7QUFTSDs7OztpR0FFbUJELEssRUFBTUMsUSxFQUFTYyxXOzs7Ozs7QUFDL0JOLG1DQUFHTyxXQUFILENBQWU7QUFDWEMsMkNBQU87QUFESSxpQ0FBZjtBQUdNVCxvQyxHQUFPLEk7O3VDQUNNLGNBQUlELGFBQUosQ0FBa0I7QUFDakNXLDJDQUFPO0FBQ0hDLDhDQUFNO0FBQ0YseURBQWEsT0FEWDtBQUVGLG9EQUFRO0FBRk4seUNBREg7QUFLSHZCLDhDQUFNO0FBQ0YscURBQVNJLEtBRFA7QUFFRix3REFBWUMsUUFGVjtBQUdGLHNEQUFVYyxlQUFlO0FBSHZCO0FBTEg7QUFEMEIsaUNBQWxCLEM7OztBQUFiSyxvQzs7QUFhTixvQ0FBSUEsS0FBS3hCLElBQUwsQ0FBVXlCLFVBQVYsSUFBd0IsU0FBNUIsRUFBdUM7QUFDbkNiLHlDQUFLWCxhQUFMLEdBQXFCLElBQXJCO0FBQ0FXLHlDQUFLVCxXQUFMLEdBQW1CdUIsS0FBS0MsS0FBTCxDQUFXSCxLQUFLeEIsSUFBTCxDQUFVQSxJQUFyQixDQUFuQjtBQUNBWSx5Q0FBS1QsV0FBTCxDQUFpQnlCLE9BQWpCLENBQXlCLG1CQUFXO0FBQ2hDQyxnREFBUUMsVUFBUixHQUFxQixnQkFBTUMsSUFBTixDQUFXLE9BQVgsRUFBb0JGLFFBQVFDLFVBQVQsR0FBcUIsSUFBeEMsQ0FBckI7QUFDSCxxQ0FGRDtBQUdBLHdDQUFHbEIsS0FBS1QsV0FBTCxDQUFpQjZCLE1BQWpCLElBQXlCLENBQTVCLEVBQThCO0FBQzFCcEIsNkNBQUtYLGFBQUwsR0FBcUIsS0FBckI7QUFDQVcsNkNBQUtWLFdBQUwsR0FBbUIsV0FBbkI7QUFDSDtBQUNEVSx5Q0FBS00sTUFBTDtBQUNILGlDQVhELE1BV087QUFDSE4seUNBQUtYLGFBQUwsR0FBcUIsS0FBckI7QUFDQVcseUNBQUtWLFdBQUwsR0FBbUJzQixLQUFLeEIsSUFBTCxDQUFVaUMsU0FBN0I7QUFDQXJCLHlDQUFLTSxNQUFMO0FBQ0g7QUFDREwsbUNBQUdxQixXQUFIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBdEVvQyxlQUFLQyxJOztrQkFBNUJ0QyxjIiwiZmlsZSI6ImNvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG5pbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcbmltcG9ydCB1dGlscyBmcm9tJy4uLy4uL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IENvbW1Qb3NpIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbXBvc2kyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3Rpb25QYWdlIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE5pS26JePJyxcclxuICAgIH1cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgICAgY29sbGVjdFN0YXR1czogZmFsc2UsXHJcbiAgICAgICAgd2FybmluZ1dvcmQ6IFwiXCIsXHJcbiAgICAgICAgY29sbGVjdERhdGE6IFtdLFxyXG4gICAgICAgIHRva2VuOicnLFxyXG4gICAgICAgIHRva2VuS2V5OicnXHJcbiAgICB9XHJcblxyXG4gICAkcmVwZWF0ID0ge1wiY29sbGVjdERhdGFcIjp7XCJjb21cIjpcImNvbW1wb3NpXCIsXCJwcm9wc1wiOlwic3luY1Bvc2lkYXRhLnN5bmNcIn19O1xyXG4kcHJvcHMgPSB7XCJjb21tcG9zaVwiOntcInhtbG5zOnYtYmluZFwiOntcInZhbHVlXCI6XCJcIixcImZvclwiOlwiY29sbGVjdERhdGFcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJpbmRleFwifSxcInYtYmluZDpzeW5jUG9zaWRhdGEuc3luY1wiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImNvbGxlY3REYXRhXCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICBjb21tcG9zaTogQ29tbVBvc2kgXHJcbiAgICB9O1xyXG4gICAgb25Mb2FkKCkgeyBcclxuXHJcbiAgICAgICAgLy8g6I635Y+W5pS26JeP6IGM5L2NXHJcbiAgICAgICAgdGhpcy5nZXRDb2xsZWN0Sm9iKClcclxuXHJcbiAgICAgICAgLy8g6I635Y+W55m75b2V5L+h5oGvXHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgd3guZ2V0U3RvcmFnZSh7XHJcbiAgICAgICAgICAgIGtleTogJ2xvZ2luRGF0YScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC50b2tlbiA9IHJlcy5kYXRhLnRva2VuO1xyXG4gICAgICAgICAgICAgICAgdGhhdC50b2tlbktleSA9IHJlcy5kYXRhLnRva2VuS2V5O1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ2V0Q29sbGVjdEpvYihyZXMuZGF0YS50b2tlbixyZXMuZGF0YS50b2tlbktleSlcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGdldENvbGxlY3RKb2IodG9rZW4sdG9rZW5LZXksY3VycmVudFBhZ2UpIHtcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0Q29sbGVjdEpvYih7XHJcbiAgICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJQMDAwM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuXCI6IHRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlTm9cIjogY3VycmVudFBhZ2UgfHwgXCIxXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgIHRoYXQuY29sbGVjdFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoYXQuY29sbGVjdERhdGEgPSBKU09OLnBhcnNlKGpzb24uZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgdGhhdC5jb2xsZWN0RGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5jcmVhdGVkYXRlID0gdXRpbHMuZGF0ZSgnWS1tLWQnLChlbGVtZW50LmNyZWF0ZWRhdGUpLzEwMDApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZih0aGF0LmNvbGxlY3REYXRhLmxlbmd0aD09MCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvbGxlY3RTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoYXQud2FybmluZ1dvcmQgPSBcIui/mOayoeacieaUtuiXj+i/h+iBjOS9jeWTplwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhhdC5jb2xsZWN0U3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoYXQud2FybmluZ1dvcmQgPSBqc29uLmRhdGEucmV0dXJuTXNnO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3eC5oaWRlTG9hZGluZygpIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==