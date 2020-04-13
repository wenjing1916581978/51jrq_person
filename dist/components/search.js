"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _regions = require('./../utils/regions.js');

var _regions2 = _interopRequireDefault(_regions);

var _constants = require('./../utils/constants.js');

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_wepy$component) {
    _inherits(Search, _wepy$component);

    function Search() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Search);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Search.__proto__ || Object.getPrototypeOf(Search)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            isShowCity: false,
            city: '全国',
            cities: [],
            search_input_value: ''
        }, _this.props = {
            isShowCityName: {
                type: Boolean,
                default: true
            }
        }, _this.methods = {
            trShowCityFn: function trShowCityFn(event) {
                var that = this;
                that.isShowCity = true;
                that.$emit('trShowCityFn', that.isShowCity);
            },
            onSearchInputFn: function onSearchInputFn(event) {
                this.search_input_value = event.detail.value;
                this.$emit('searchFn', this.search_input_value);
            },
            delTextFn: function delTextFn(event) {
                //清空搜索
                this.search_input_value = '';
                this.$emit('trUnderSearchFn', false);
            },
            goBackFn: function goBackFn(event) {
                _wepy2.default.navigateBack({
                    delta: 1
                });
            },
            searchFn: function searchFn(event) {
                //完成“搜索”
                var that = this;
                this.$emit('searchFn', that.search_input_value);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Search, [{
        key: "onLoad",
        value: function onLoad(options) {
            var that = this;
            // this.getLocation();
            var userSpecialInfo = wx.getStorageSync(_constants.USER_OPERATE_INFO) || {};
            if (userSpecialInfo.city) {
                this.city = userSpecialInfo.city;
            }
        }
    }, {
        key: "getLocation",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var that;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                that = this;
                                _context.next = 3;
                                return wx.getLocation({
                                    type: 'wgs84',
                                    success: function success(res) {
                                        that.getCityName(res.latitude, res.longitude);
                                    }
                                });

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getLocation() {
                return _ref2.apply(this, arguments);
            }

            return getLocation;
        }()
    }, {
        key: "getCityName",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(latitude, longitude) {
                var that, json, city;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                //逆地址解析
                                that = this;
                                _context2.next = 3;
                                return _api2.default.getCityName({
                                    query: {
                                        location: latitude + ',' + longitude,
                                        key: _constants.TECENT_MAP_KEY
                                    }
                                });

                            case 3:
                                json = _context2.sent;

                                if (json.data.message = "query ok") {
                                    city = json.data.result.address_component.city;

                                    if (city.length > 3) {
                                        city = city.substring(0, 3) + "...";
                                    }
                                    that.city = city;
                                    that.$apply();
                                } else {
                                    tip.error(json.data.message);
                                }

                            case 5:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getCityName(_x, _x2) {
                return _ref3.apply(this, arguments);
            }

            return getCityName;
        }()
    }, {
        key: "setCityFn",
        value: function setCityFn(params) {
            //设置城市名称
            this.city = params;
            var userSpecialInfo = wx.getStorageSync(_constants.USER_OPERATE_INFO) || {};
            userSpecialInfo.city = params;
            wx.setStorageSync(_constants.USER_OPERATE_INFO, userSpecialInfo);
            this.$apply();
        }
    }, {
        key: "setSearchInputFn",
        value: function setSearchInputFn(params) {
            //设置输入值
            this.search_input_value = params;
            this.$apply();
        }
    }]);

    return Search;
}(_wepy2.default.component);

exports.default = Search;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJTZWFyY2giLCJkYXRhIiwiaXNTaG93Q2l0eSIsImNpdHkiLCJjaXRpZXMiLCJzZWFyY2hfaW5wdXRfdmFsdWUiLCJwcm9wcyIsImlzU2hvd0NpdHlOYW1lIiwidHlwZSIsIkJvb2xlYW4iLCJkZWZhdWx0IiwibWV0aG9kcyIsInRyU2hvd0NpdHlGbiIsImV2ZW50IiwidGhhdCIsIiRlbWl0Iiwib25TZWFyY2hJbnB1dEZuIiwiZGV0YWlsIiwidmFsdWUiLCJkZWxUZXh0Rm4iLCJnb0JhY2tGbiIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwic2VhcmNoRm4iLCJvcHRpb25zIiwidXNlclNwZWNpYWxJbmZvIiwid3giLCJnZXRTdG9yYWdlU3luYyIsImdldExvY2F0aW9uIiwic3VjY2VzcyIsInJlcyIsImdldENpdHlOYW1lIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJxdWVyeSIsImxvY2F0aW9uIiwia2V5IiwianNvbiIsIm1lc3NhZ2UiLCJyZXN1bHQiLCJhZGRyZXNzX2NvbXBvbmVudCIsImxlbmd0aCIsInN1YnN0cmluZyIsIiRhcHBseSIsInRpcCIsImVycm9yIiwicGFyYW1zIiwic2V0U3RvcmFnZVN5bmMiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFHcUJBLE07Ozs7Ozs7Ozs7Ozs7OzBMQUNqQkMsSSxHQUFLO0FBQ0RDLHdCQUFZLEtBRFg7QUFFREMsa0JBQU0sSUFGTDtBQUdEQyxvQkFBUSxFQUhQO0FBSURDLGdDQUFvQjtBQUpuQixTLFFBT0xDLEssR0FBTTtBQUNGQyw0QkFBZ0I7QUFDWkMsc0JBQU1DLE9BRE07QUFFWkMseUJBQVM7QUFGRztBQURkLFMsUUFnQk5DLE8sR0FBUTtBQUNKQywwQkFBYyxzQkFBU0MsS0FBVCxFQUFlO0FBQ3pCLG9CQUFNQyxPQUFPLElBQWI7QUFDQUEscUJBQUtaLFVBQUwsR0FBa0IsSUFBbEI7QUFDQVkscUJBQUtDLEtBQUwsQ0FBVyxjQUFYLEVBQTJCRCxLQUFLWixVQUFoQztBQUNILGFBTEc7QUFNSmMsNkJBQWlCLHlCQUFVSCxLQUFWLEVBQWlCO0FBQzlCLHFCQUFLUixrQkFBTCxHQUEwQlEsTUFBTUksTUFBTixDQUFhQyxLQUF2QztBQUNBLHFCQUFLSCxLQUFMLENBQVcsVUFBWCxFQUF1QixLQUFLVixrQkFBNUI7QUFDSCxhQVRHO0FBVUpjLHVCQUFXLG1CQUFVTixLQUFWLEVBQWlCO0FBQUM7QUFDekIscUJBQUtSLGtCQUFMLEdBQTBCLEVBQTFCO0FBQ0EscUJBQUtVLEtBQUwsQ0FBVyxpQkFBWCxFQUE4QixLQUE5QjtBQUNILGFBYkc7QUFjSkssc0JBQVUsa0JBQVVQLEtBQVYsRUFBaUI7QUFDdkIsK0JBQUtRLFlBQUwsQ0FBa0I7QUFDaEJDLDJCQUFPO0FBRFMsaUJBQWxCO0FBR0gsYUFsQkc7QUFtQkpDLHNCQUFVLGtCQUFVVixLQUFWLEVBQWlCO0FBQUU7QUFDekIsb0JBQU1DLE9BQU8sSUFBYjtBQUNBLHFCQUFLQyxLQUFMLENBQVcsVUFBWCxFQUF1QkQsS0FBS1Qsa0JBQTVCO0FBQ0g7QUF0QkcsUzs7Ozs7K0JBVERtQixPLEVBQVM7QUFDWixnQkFBTVYsT0FBTyxJQUFiO0FBQ0E7QUFDQSxnQkFBSVcsa0JBQWtCQyxHQUFHQyxjQUFILGtDQUF3QyxFQUE5RDtBQUNBLGdCQUFJRixnQkFBZ0J0QixJQUFwQixFQUF5QjtBQUNyQixxQkFBS0EsSUFBTCxHQUFZc0IsZ0JBQWdCdEIsSUFBNUI7QUFDSDtBQUNKOzs7Ozs7Ozs7O0FBNEJTVyxvQyxHQUFPLEk7O3VDQUNQWSxHQUFHRSxXQUFILENBQWU7QUFDakJwQiwwQ0FBTSxPQURXO0FBRWpCcUIsNkNBQVMsaUJBQVNDLEdBQVQsRUFBYztBQUNuQmhCLDZDQUFLaUIsV0FBTCxDQUFpQkQsSUFBSUUsUUFBckIsRUFBK0JGLElBQUlHLFNBQW5DO0FBQ0g7QUFKZ0IsaUNBQWYsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrR0FRUUQsUSxFQUFVQyxTOzs7Ozs7QUFBVztBQUM3Qm5CLG9DLEdBQU8sSTs7dUNBQ0ksY0FBSWlCLFdBQUosQ0FBZ0I7QUFDN0JHLDJDQUFPO0FBQ0hDLGtEQUFVSCxXQUFXLEdBQVgsR0FBaUJDLFNBRHhCO0FBRUhHO0FBRkc7QUFEc0IsaUNBQWhCLEM7OztBQUFiQyxvQzs7QUFNSixvQ0FBR0EsS0FBS3BDLElBQUwsQ0FBVXFDLE9BQVYsR0FBb0IsVUFBdkIsRUFBbUM7QUFDM0JuQyx3Q0FEMkIsR0FDcEJrQyxLQUFLcEMsSUFBTCxDQUFVc0MsTUFBVixDQUFpQkMsaUJBQWpCLENBQW1DckMsSUFEZjs7QUFFL0Isd0NBQUdBLEtBQUtzQyxNQUFMLEdBQWMsQ0FBakIsRUFBb0I7QUFDaEJ0QywrQ0FBT0EsS0FBS3VDLFNBQUwsQ0FBZSxDQUFmLEVBQWtCLENBQWxCLElBQXVCLEtBQTlCO0FBQ0g7QUFDRDVCLHlDQUFLWCxJQUFMLEdBQVlBLElBQVo7QUFDQVcseUNBQUs2QixNQUFMO0FBQ0gsaUNBUEQsTUFPTztBQUNIQyx3Q0FBSUMsS0FBSixDQUFVUixLQUFLcEMsSUFBTCxDQUFVcUMsT0FBcEI7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUdLUSxNLEVBQVE7QUFBQztBQUNmLGlCQUFLM0MsSUFBTCxHQUFZMkMsTUFBWjtBQUNBLGdCQUFJckIsa0JBQWtCQyxHQUFHQyxjQUFILGtDQUF3QyxFQUE5RDtBQUNBRiw0QkFBZ0J0QixJQUFoQixHQUF1QjJDLE1BQXZCO0FBQ0FwQixlQUFHcUIsY0FBSCwrQkFBcUN0QixlQUFyQztBQUNBLGlCQUFLa0IsTUFBTDtBQUNIOzs7eUNBRWdCRyxNLEVBQVE7QUFBQztBQUN0QixpQkFBS3pDLGtCQUFMLEdBQTBCeUMsTUFBMUI7QUFDQSxpQkFBS0gsTUFBTDtBQUNIOzs7O0VBMUYrQixlQUFLSyxTOztrQkFBcEJoRCxNIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHJlZ2lvbnMgZnJvbSBcIi4uL3V0aWxzL3JlZ2lvbnNcIjtcclxuaW1wb3J0IHtVU0VSX09QRVJBVEVfSU5GTywgVEVDRU5UX01BUF9LRVl9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHNcIjtcclxuaW1wb3J0IGFwaSBmcm9tIFwiLi4vYXBpL2FwaVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIGRhdGE9e1xyXG4gICAgICAgIGlzU2hvd0NpdHk6IGZhbHNlLFxyXG4gICAgICAgIGNpdHk6ICflhajlm70nLFxyXG4gICAgICAgIGNpdGllczogW10sXHJcbiAgICAgICAgc2VhcmNoX2lucHV0X3ZhbHVlOiAnJ1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm9wcz17XHJcbiAgICAgICAgaXNTaG93Q2l0eU5hbWU6IHtcclxuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcclxuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vIHRoaXMuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoVVNFUl9PUEVSQVRFX0lORk8pIHx8IHt9O1xyXG4gICAgICAgIGlmICh1c2VyU3BlY2lhbEluZm8uY2l0eSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2l0eSA9IHVzZXJTcGVjaWFsSW5mby5jaXR5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzPXtcclxuICAgICAgICB0clNob3dDaXR5Rm46IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuaXNTaG93Q2l0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoYXQuJGVtaXQoJ3RyU2hvd0NpdHlGbicsIHRoYXQuaXNTaG93Q2l0eSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblNlYXJjaElucHV0Rm46IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlYXJjaF9pbnB1dF92YWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy4kZW1pdCgnc2VhcmNoRm4nLCB0aGlzLnNlYXJjaF9pbnB1dF92YWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxUZXh0Rm46IGZ1bmN0aW9uIChldmVudCkgey8v5riF56m65pCc57SiXHJcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoX2lucHV0X3ZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3RyVW5kZXJTZWFyY2hGbicsIGZhbHNlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdvQmFja0ZuOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgIGRlbHRhOiAxXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZWFyY2hGbjogZnVuY3Rpb24gKGV2ZW50KSB7IC8v5a6M5oiQ4oCc5pCc57Si4oCdXHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdzZWFyY2hGbicsIHRoYXQuc2VhcmNoX2lucHV0X3ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0TG9jYXRpb24oKXtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBhd2FpdCB3eC5nZXRMb2NhdGlvbih7XHJcbiAgICAgICAgICAgIHR5cGU6ICd3Z3M4NCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5nZXRDaXR5TmFtZShyZXMubGF0aXR1ZGUsIHJlcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZ2V0Q2l0eU5hbWUobGF0aXR1ZGUsIGxvbmdpdHVkZSl7Ly/pgIblnLDlnYDop6PmnpBcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQganNvbiA9IGF3YWl0IGFwaS5nZXRDaXR5TmFtZSh7XHJcbiAgICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogbGF0aXR1ZGUgKyAnLCcgKyBsb25naXR1ZGUsXHJcbiAgICAgICAgICAgICAgICBrZXk6IFRFQ0VOVF9NQVBfS0VZXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmKGpzb24uZGF0YS5tZXNzYWdlID0gXCJxdWVyeSBva1wiKSB7XHJcbiAgICAgICAgICAgIGxldCBjaXR5ID0ganNvbi5kYXRhLnJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5jaXR5O1xyXG4gICAgICAgICAgICBpZihjaXR5Lmxlbmd0aCA+IDMpIHtcclxuICAgICAgICAgICAgICAgIGNpdHkgPSBjaXR5LnN1YnN0cmluZygwLCAzKSArIFwiLi4uXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5jaXR5ID0gY2l0eTtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRDaXR5Rm4ocGFyYW1zKSB7Ly/orr7nva7ln47luILlkI3np7BcclxuICAgICAgICB0aGlzLmNpdHkgPSBwYXJhbXM7XHJcbiAgICAgICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKFVTRVJfT1BFUkFURV9JTkZPKSB8fCB7fTtcclxuICAgICAgICB1c2VyU3BlY2lhbEluZm8uY2l0eSA9IHBhcmFtcztcclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhVU0VSX09QRVJBVEVfSU5GTywgdXNlclNwZWNpYWxJbmZvKTtcclxuICAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNlYXJjaElucHV0Rm4ocGFyYW1zKSB7Ly/orr7nva7ovpPlhaXlgLxcclxuICAgICAgICB0aGlzLnNlYXJjaF9pbnB1dF92YWx1ZSA9IHBhcmFtcztcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuIl19