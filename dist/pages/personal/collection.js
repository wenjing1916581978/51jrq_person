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
            warningWord: "",
            list: [],
            token: '',
            tokenKey: '',
            page: 1,
            noMoreData: false,
            isLoading: false
        }, _this.$repeat = { "list": { "com": "commposi", "props": "syncPosidata.sync" } }, _this.$props = { "commposi": { "xmlns:v-bind": { "value": "", "for": "list", "item": "item", "index": "index", "key": "index" }, "v-bind:syncPosidata.sync": { "value": "item", "type": "item", "for": "list", "item": "item", "index": "index", "key": "index" } } }, _this.$events = {}, _this.components = {
            commposi: _commposi2.default
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(CollectionPage, [{
        key: 'onLoad',
        value: function onLoad() {
            // 获取登录信息
            var that = this;
            var login = wx.getStorageSync('login');
            that.token = login.token;
            that.tokenKey = login.tokenKey;
            that.$apply();
            this.getList();
        }
    }, {
        key: 'onReachBottom',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var that;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                that = this;

                                console.log('onReachBottom', '上拉触底');

                                if (!(that.noMoreData || that.isLoading)) {
                                    _context.next = 4;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 4:
                                that.isLoading = true;
                                that.page = that.page + 1;
                                that.$apply();
                                _context.next = 9;
                                return that.getList();

                            case 9:
                                that.isLoading = false;
                                that.$apply();

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function onReachBottom() {
                return _ref2.apply(this, arguments);
            }

            return onReachBottom;
        }()
    }, {
        key: 'getList',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
                                            "transcode": "P0003",
                                            "type": "h"
                                        },
                                        data: {
                                            "token": that.token,
                                            "tokenKey": that.tokenKey,
                                            "pageNo": that.page || "1"
                                        }
                                    }
                                }).then(function (res) {
                                    wx.hideLoading();
                                    if (res.data.returnCode == "AAAAAAA") {

                                        if (that.page >= Math.ceil(res.data.datanum / 10)) {
                                            that.noMoreData = true;
                                        }
                                        var list = JSON.parse(res.data.data);
                                        list = list.map(function (obj) {
                                            obj.refreshdate = _utils2.default.date('Y-m-d', obj.refreshdate / 1000);
                                            return obj;
                                        });
                                        console.log('列表数据', list);
                                        that.list = that.page == 1 ? list : that.list.concat(list);
                                        that.$apply();
                                    } else {
                                        that.warningWord = res.data.returnMsg;
                                        that.$apply();
                                    }
                                });

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getList() {
                return _ref3.apply(this, arguments);
            }

            return getList;
        }()
    }]);

    return CollectionPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(CollectionPage , 'pages/personal/collection'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbGxlY3Rpb24uanMiXSwibmFtZXMiOlsiQ29sbGVjdGlvblBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIndhcm5pbmdXb3JkIiwibGlzdCIsInRva2VuIiwidG9rZW5LZXkiLCJwYWdlIiwibm9Nb3JlRGF0YSIsImlzTG9hZGluZyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbW1wb3NpIiwidGhhdCIsImxvZ2luIiwid3giLCJnZXRTdG9yYWdlU3luYyIsIiRhcHBseSIsImdldExpc3QiLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImdldENvbGxlY3RKb2IiLCJxdWVyeSIsImhlYWQiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJyZXMiLCJyZXR1cm5Db2RlIiwiTWF0aCIsImNlaWwiLCJkYXRhbnVtIiwiSlNPTiIsInBhcnNlIiwibWFwIiwib2JqIiwicmVmcmVzaGRhdGUiLCJkYXRlIiwiY29uY2F0IiwicmV0dXJuTXNnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Ozs7Ozs7ME1BQ2pCQyxNLEdBQVM7QUFDTEMsb0NBQXdCO0FBRG5CLFMsUUFHVEMsSSxHQUFPO0FBQ0xDLHlCQUFhLEVBRFI7QUFFTEMsa0JBQU0sRUFGRDtBQUdMQyxtQkFBTSxFQUhEO0FBSUxDLHNCQUFTLEVBSko7QUFLTEMsa0JBQUssQ0FMQTtBQU1MQyx3QkFBWSxLQU5QO0FBT0xDLHVCQUFXO0FBUE4sUyxRQVVSQyxPLEdBQVUsRUFBQyxRQUFPLEVBQUMsT0FBTSxVQUFQLEVBQWtCLFNBQVEsbUJBQTFCLEVBQVIsRSxRQUNiQyxNLEdBQVMsRUFBQyxZQUFXLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLE1BQWxCLEVBQXlCLFFBQU8sTUFBaEMsRUFBdUMsU0FBUSxPQUEvQyxFQUF1RCxPQUFNLE9BQTdELEVBQWhCLEVBQXNGLDRCQUEyQixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sTUFBcEMsRUFBMkMsUUFBTyxNQUFsRCxFQUF5RCxTQUFRLE9BQWpFLEVBQXlFLE9BQU0sT0FBL0UsRUFBakgsRUFBWixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNOQztBQURNLFM7Ozs7O2lDQUdEO0FBQ0w7QUFDQSxnQkFBTUMsT0FBTyxJQUFiO0FBQ0EsZ0JBQUlDLFFBQVFDLEdBQUdDLGNBQUgsQ0FBa0IsT0FBbEIsQ0FBWjtBQUNBSCxpQkFBS1YsS0FBTCxHQUFhVyxNQUFNWCxLQUFuQjtBQUNBVSxpQkFBS1QsUUFBTCxHQUFnQlUsTUFBTVYsUUFBdEI7QUFDQVMsaUJBQUtJLE1BQUw7QUFDQSxpQkFBS0MsT0FBTDtBQUNIOzs7Ozs7Ozs7O0FBR09MLG9DLEdBQU8sSTs7QUFDYk0sd0NBQVFDLEdBQVIsQ0FBWSxlQUFaLEVBQTRCLE1BQTVCOztzQ0FDSVAsS0FBS1AsVUFBTCxJQUFtQk8sS0FBS04sUzs7Ozs7Ozs7QUFHNUJNLHFDQUFLTixTQUFMLEdBQWlCLElBQWpCO0FBQ0FNLHFDQUFLUixJQUFMLEdBQVlRLEtBQUtSLElBQUwsR0FBWSxDQUF4QjtBQUNBUSxxQ0FBS0ksTUFBTDs7dUNBQ01KLEtBQUtLLE9BQUwsRTs7O0FBQ05MLHFDQUFLTixTQUFMLEdBQWlCLEtBQWpCO0FBQ0FNLHFDQUFLSSxNQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0VGLG1DQUFHTSxXQUFILENBQWU7QUFDWEMsMkNBQU87QUFESSxpQ0FBZjtBQUdNVCxvQyxHQUFPLEk7O0FBQ2IsOENBQUlVLGFBQUosQ0FBa0I7QUFDZEMsMkNBQU87QUFDSEMsOENBQU07QUFDRix5REFBYSxPQURYO0FBRUYsb0RBQVE7QUFGTix5Q0FESDtBQUtIekIsOENBQU07QUFDRixxREFBU2EsS0FBS1YsS0FEWjtBQUVGLHdEQUFZVSxLQUFLVCxRQUZmO0FBR0Ysc0RBQVVTLEtBQUtSLElBQUwsSUFBYTtBQUhyQjtBQUxIO0FBRE8saUNBQWxCLEVBWUdxQixJQVpILENBWVEsZUFBSztBQUNYWCx1Q0FBR1ksV0FBSDtBQUNBLHdDQUFJQyxJQUFJNUIsSUFBSixDQUFTNkIsVUFBVCxJQUF1QixTQUEzQixFQUFzQzs7QUFFcEMsNENBQUdoQixLQUFLUixJQUFMLElBQVd5QixLQUFLQyxJQUFMLENBQVVILElBQUk1QixJQUFKLENBQVNnQyxPQUFULEdBQWlCLEVBQTNCLENBQWQsRUFBNkM7QUFDM0NuQixpREFBS1AsVUFBTCxHQUFrQixJQUFsQjtBQUNEO0FBQ0QsNENBQUlKLE9BQU8rQixLQUFLQyxLQUFMLENBQVdOLElBQUk1QixJQUFKLENBQVNBLElBQXBCLENBQVg7QUFDQUUsK0NBQU9BLEtBQUtpQyxHQUFMLENBQVMsZUFBSztBQUNuQkMsZ0RBQUlDLFdBQUosR0FBa0IsZ0JBQU1DLElBQU4sQ0FBVyxPQUFYLEVBQW9CRixJQUFJQyxXQUFMLEdBQWtCLElBQXJDLENBQWxCO0FBQ0EsbURBQU9ELEdBQVA7QUFDRCx5Q0FITSxDQUFQO0FBSUFqQixnREFBUUMsR0FBUixDQUFZLE1BQVosRUFBbUJsQixJQUFuQjtBQUNBVyw2Q0FBS1gsSUFBTCxHQUFZVyxLQUFLUixJQUFMLElBQVcsQ0FBWCxHQUFhSCxJQUFiLEdBQWtCVyxLQUFLWCxJQUFMLENBQVVxQyxNQUFWLENBQWlCckMsSUFBakIsQ0FBOUI7QUFDQVcsNkNBQUtJLE1BQUw7QUFDRCxxQ0FiRCxNQWFPO0FBQ0hKLDZDQUFLWixXQUFMLEdBQW1CMkIsSUFBSTVCLElBQUosQ0FBU3dDLFNBQTVCO0FBQ0EzQiw2Q0FBS0ksTUFBTDtBQUNIO0FBQ0YsaUNBL0JEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbERvQyxlQUFLWixJOztrQkFBNUJSLGMiLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbmltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuaW1wb3J0IHV0aWxzIGZyb20nLi4vLi4vdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgQ29tbVBvc2kgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tcG9zaSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uUGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOaUtuiXjycsXHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICB3YXJuaW5nV29yZDogXCJcIixcclxuICAgICAgbGlzdDogW10sXHJcbiAgICAgIHRva2VuOicnLFxyXG4gICAgICB0b2tlbktleTonJyxcclxuICAgICAgcGFnZToxLFxyXG4gICAgICBub01vcmVEYXRhOiBmYWxzZSxcclxuICAgICAgaXNMb2FkaW5nOiBmYWxzZSAsXHJcbiAgICB9XHJcblxyXG4gICAkcmVwZWF0ID0ge1wibGlzdFwiOntcImNvbVwiOlwiY29tbXBvc2lcIixcInByb3BzXCI6XCJzeW5jUG9zaWRhdGEuc3luY1wifX07XHJcbiRwcm9wcyA9IHtcImNvbW1wb3NpXCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn0sXCJ2LWJpbmQ6c3luY1Bvc2lkYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgICBjb21tcG9zaTogQ29tbVBvc2lcclxuICAgIH07XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8g6I635Y+W55m75b2V5L+h5oGvXHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGxvZ2luID0gd3guZ2V0U3RvcmFnZVN5bmMoJ2xvZ2luJylcclxuICAgICAgICB0aGF0LnRva2VuID0gbG9naW4udG9rZW5cclxuICAgICAgICB0aGF0LnRva2VuS2V5ID0gbG9naW4udG9rZW5LZXlcclxuICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgdGhpcy5nZXRMaXN0KClcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBvblJlYWNoQm90dG9tICgpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgY29uc29sZS5sb2coJ29uUmVhY2hCb3R0b20nLCfkuIrmi4nop6blupUnKVxyXG4gICAgICBpZiAodGhhdC5ub01vcmVEYXRhIHx8IHRoYXQuaXNMb2FkaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICAgIH1cclxuICAgICAgdGhhdC5pc0xvYWRpbmcgPSB0cnVlXHJcbiAgICAgIHRoYXQucGFnZSA9IHRoYXQucGFnZSArIDFcclxuICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICBhd2FpdCB0aGF0LmdldExpc3QoKVxyXG4gICAgICB0aGF0LmlzTG9hZGluZyA9IGZhbHNlXHJcbiAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgIH1cclxuXHJcblxyXG4gICAgYXN5bmMgZ2V0TGlzdCgpIHtcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGFwaS5nZXRDb2xsZWN0Sm9iKHtcclxuICAgICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIlAwMDAzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwYWdlTm9cIjogdGhhdC5wYWdlIHx8IFwiMVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgaWYgKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoYXQucGFnZT49TWF0aC5jZWlsKHJlcy5kYXRhLmRhdGFudW0vMTApKXtcclxuICAgICAgICAgICAgICB0aGF0Lm5vTW9yZURhdGEgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGxpc3QgPSBKU09OLnBhcnNlKHJlcy5kYXRhLmRhdGEpO1xyXG4gICAgICAgICAgICBsaXN0ID0gbGlzdC5tYXAob2JqPT57XHJcbiAgICAgICAgICAgICAgb2JqLnJlZnJlc2hkYXRlID0gdXRpbHMuZGF0ZSgnWS1tLWQnLChvYmoucmVmcmVzaGRhdGUpLzEwMDApXHJcbiAgICAgICAgICAgICAgcmV0dXJuIG9ialxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5YiX6KGo5pWw5o2uJyxsaXN0KVxyXG4gICAgICAgICAgICB0aGF0Lmxpc3QgPSB0aGF0LnBhZ2U9PTE/bGlzdDp0aGF0Lmxpc3QuY29uY2F0KGxpc3QpXHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhhdC53YXJuaW5nV29yZCA9IHJlcy5kYXRhLnJldHVybk1zZztcclxuICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIl19