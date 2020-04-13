'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../api/api.js');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BannerSearch = function (_wepy$component) {
    _inherits(BannerSearch, _wepy$component);

    function BannerSearch() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, BannerSearch);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BannerSearch.__proto__ || Object.getPrototypeOf(BannerSearch)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            bannerlist: {},
            devicewidth: 375
        }, _this.methods = {
            jumpto: function jumpto(url) {
                var arr = url.split('company/');
                if (arr.length !== 1) {
                    // `/pages/corporation/corpview?companyid=${item.hyperlinks.substr(idx+8)}`;
                    wx.navigateTo({
                        url: '/pages/corporation/corpview?companyid=' + arr[1]
                    });
                } else {
                    wx.navigateTo({
                        url: 'url?url=' + url
                    });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BannerSearch, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var that = this;
            wx.getSystemInfo({
                success: function success(res) {
                    console.log(res.windowWidth);
                    that.devicewidth = res.windowWidth;
                    that.$apply();
                }
            });
            that.getMobileHomeBanner();
        }

        //事件处理函数(集中保存在methods对象中)

    }, {
        key: 'getMobileHomeBanner',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(startIndex, pageNum) {
                var that, json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                //获取轮播广告图
                                that = this;
                                _context.next = 3;
                                return _api2.default.getMobileHomeBanner({
                                    query: {
                                        "head": {
                                            "transcode": "F00008",
                                            "type": "h"
                                        },
                                        "data": {
                                            "startIndex": startIndex || "0",
                                            "pageNum": pageNum || "4"
                                        }
                                    }
                                });

                            case 3:
                                json = _context.sent;

                                if (json.data.returnCode == "AAAAAAA") {
                                    that.bannerlist = json.data.data.map(function (item, index) {
                                        var imglist = {};
                                        imglist.src = item.carousel_logo_url;
                                        var idx = item.hyperlinks.indexOf('company');
                                        imglist.link = item.hyperlinks;
                                        return imglist;
                                    });
                                    that.$apply();
                                } else {
                                    tip.error(json.data.returnMsg);
                                }

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getMobileHomeBanner(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return getMobileHomeBanner;
        }()
    }, {
        key: 'find',
        value: function find(str, char, num) {
            var idx = str.indexOf(char);
            for (var i = 0; i < num; i++) {
                idx = str.indexOf(char, idx + 1);
            }
            return idx;
        }
    }]);

    return BannerSearch;
}(_wepy2.default.component);

exports.default = BannerSearch;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhbm5lcnNlYXJjaC5qcyJdLCJuYW1lcyI6WyJCYW5uZXJTZWFyY2giLCJkYXRhIiwiYmFubmVybGlzdCIsImRldmljZXdpZHRoIiwibWV0aG9kcyIsImp1bXB0byIsInVybCIsImFyciIsInNwbGl0IiwibGVuZ3RoIiwid3giLCJuYXZpZ2F0ZVRvIiwib3B0aW9ucyIsInRoYXQiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlcyIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3dXaWR0aCIsIiRhcHBseSIsImdldE1vYmlsZUhvbWVCYW5uZXIiLCJzdGFydEluZGV4IiwicGFnZU51bSIsInF1ZXJ5IiwianNvbiIsInJldHVybkNvZGUiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJpbWdsaXN0Iiwic3JjIiwiY2Fyb3VzZWxfbG9nb191cmwiLCJpZHgiLCJoeXBlcmxpbmtzIiwiaW5kZXhPZiIsImxpbmsiLCJ0aXAiLCJlcnJvciIsInJldHVybk1zZyIsInN0ciIsImNoYXIiLCJudW0iLCJpIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BRWZDLEksR0FBSztBQUNEQyx3QkFBWSxFQURYO0FBRURDLHlCQUFZO0FBRlgsUyxRQWtCTEMsTyxHQUFVO0FBQ1JDLGtCQURRLGtCQUNEQyxHQURDLEVBQ0c7QUFDVCxvQkFBSUMsTUFBTUQsSUFBSUUsS0FBSixDQUFVLFVBQVYsQ0FBVjtBQUNBLG9CQUFHRCxJQUFJRSxNQUFKLEtBQWEsQ0FBaEIsRUFBa0I7QUFDaEI7QUFDQUMsdUJBQUdDLFVBQUgsQ0FBYztBQUNWTCx3RUFBOENDLElBQUksQ0FBSjtBQURwQyxxQkFBZDtBQUdELGlCQUxELE1BS007QUFDSkcsdUJBQUdDLFVBQUgsQ0FBYztBQUNWTCwwQ0FBZ0JBO0FBRE4scUJBQWQ7QUFHRDtBQUVGO0FBZE8sUzs7Ozs7K0JBYkhNLE8sRUFBUTtBQUNiLGdCQUFJQyxPQUFLLElBQVQ7QUFDQUgsZUFBR0ksYUFBSCxDQUFpQjtBQUNmQyx1QkFEZSxtQkFDUEMsR0FETyxFQUNGO0FBQ1hDLDRCQUFRQyxHQUFSLENBQVlGLElBQUlHLFdBQWhCO0FBQ0FOLHlCQUFLVixXQUFMLEdBQWlCYSxJQUFJRyxXQUFyQjtBQUNBTix5QkFBS08sTUFBTDtBQUNEO0FBTGMsYUFBakI7QUFPRVAsaUJBQUtRLG1CQUFMO0FBQ0g7O0FBRUQ7Ozs7O2lHQWtCMEJDLFUsRUFBWUMsTzs7Ozs7O0FBQVM7QUFDckNWLG9DLEdBQU8sSTs7dUNBQ00sY0FBSVEsbUJBQUosQ0FBd0I7QUFDdkNHLDJDQUFPO0FBQ0MsZ0RBQVE7QUFDSix5REFBYSxRQURUO0FBRUosb0RBQVE7QUFGSix5Q0FEVDtBQUtDLGdEQUFRO0FBQ0osMERBQWNGLGNBQWMsR0FEeEI7QUFFSix1REFBV0MsV0FBVztBQUZsQjtBQUxUO0FBRGdDLGlDQUF4QixDOzs7QUFBYkUsb0M7O0FBWU4sb0NBQUdBLEtBQUt4QixJQUFMLENBQVV5QixVQUFWLElBQXdCLFNBQTNCLEVBQXFDO0FBQ2pDYix5Q0FBS1gsVUFBTCxHQUFrQnVCLEtBQUt4QixJQUFMLENBQVVBLElBQVYsQ0FBZTBCLEdBQWYsQ0FBbUIsVUFBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWlCO0FBQ2xELDRDQUFJQyxVQUFVLEVBQWQ7QUFDQUEsZ0RBQVFDLEdBQVIsR0FBYUgsS0FBS0ksaUJBQWxCO0FBQ0EsNENBQUlDLE1BQU1MLEtBQUtNLFVBQUwsQ0FBZ0JDLE9BQWhCLENBQXdCLFNBQXhCLENBQVY7QUFDQUwsZ0RBQVFNLElBQVIsR0FBZVIsS0FBS00sVUFBcEI7QUFDQSwrQ0FBT0osT0FBUDtBQUNILHFDQU5pQixDQUFsQjtBQU9BakIseUNBQUtPLE1BQUw7QUFDSCxpQ0FURCxNQVNPO0FBQ0hpQix3Q0FBSUMsS0FBSixDQUFVYixLQUFLeEIsSUFBTCxDQUFVc0MsU0FBcEI7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQUdBQyxHLEVBQUtDLEksRUFBTUMsRyxFQUFLO0FBQ2pCLGdCQUFJVCxNQUFNTyxJQUFJTCxPQUFKLENBQVlNLElBQVosQ0FBVjtBQUNBLGlCQUFLLElBQUlFLElBQUksQ0FBYixFQUFnQkEsSUFBSUQsR0FBcEIsRUFBeUJDLEdBQXpCLEVBQThCO0FBQzFCVixzQkFBTU8sSUFBSUwsT0FBSixDQUFZTSxJQUFaLEVBQWtCUixNQUFJLENBQXRCLENBQU47QUFDSDtBQUNELG1CQUFPQSxHQUFQO0FBQ0g7Ozs7RUF2RW1DLGVBQUtXLFM7O2tCQUExQjVDLFkiLCJmaWxlIjoiYmFubmVyc2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbiAgaW1wb3J0IGFwaSBmcm9tICcuLi9hcGkvYXBpJztcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFubmVyU2VhcmNoIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG5cclxuICAgICAgICBkYXRhPXtcclxuICAgICAgICAgICAgYmFubmVybGlzdDoge30sXHJcbiAgICAgICAgICAgIGRldmljZXdpZHRoOjM3NSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uTG9hZChvcHRpb25zKXtcclxuICAgICAgICAgIHZhciB0aGF0PXRoaXNcclxuICAgICAgICAgIHd4LmdldFN5c3RlbUluZm8oe1xyXG4gICAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy53aW5kb3dXaWR0aClcclxuICAgICAgICAgICAgICB0aGF0LmRldmljZXdpZHRoPXJlcy53aW5kb3dXaWR0aFxyXG4gICAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhhdC5nZXRNb2JpbGVIb21lQmFubmVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+S6i+S7tuWkhOeQhuWHveaVsCjpm4bkuK3kv53lrZjlnKhtZXRob2Rz5a+56LGh5LitKVxyXG4gICAgICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICAgICBqdW1wdG8odXJsKXtcclxuICAgICAgICAgICAgdmFyIGFyciA9IHVybC5zcGxpdCgnY29tcGFueS8nKVxyXG4gICAgICAgICAgICBpZihhcnIubGVuZ3RoIT09MSl7XHJcbiAgICAgICAgICAgICAgLy8gYC9wYWdlcy9jb3Jwb3JhdGlvbi9jb3Jwdmlldz9jb21wYW55aWQ9JHtpdGVtLmh5cGVybGlua3Muc3Vic3RyKGlkeCs4KX1gO1xyXG4gICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICB1cmw6IGAvcGFnZXMvY29ycG9yYXRpb24vY29ycHZpZXc/Y29tcGFueWlkPSR7YXJyWzFdfWBcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgICAgICAgIHVybDogYHVybD91cmw9JHt1cmx9YFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYXN5bmMgZ2V0TW9iaWxlSG9tZUJhbm5lcihzdGFydEluZGV4LCBwYWdlTnVtKXsvL+iOt+WPlui9ruaSreW5v+WRiuWbvlxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QganNvbiA9IGF3YWl0IGFwaS5nZXRNb2JpbGVIb21lQmFubmVyKHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVhZFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIkYwMDAwOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3RhcnRJbmRleFwiOiBzdGFydEluZGV4IHx8IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwYWdlTnVtXCI6IHBhZ2VOdW0gfHwgXCI0XCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKXtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmFubmVybGlzdCA9IGpzb24uZGF0YS5kYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nbGlzdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ2xpc3Quc3JjID1pdGVtLmNhcm91c2VsX2xvZ29fdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZHggPSBpdGVtLmh5cGVybGlua3MuaW5kZXhPZignY29tcGFueScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZ2xpc3QubGluayA9IGl0ZW0uaHlwZXJsaW5rcztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW1nbGlzdDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmluZChzdHIsIGNoYXIsIG51bSkge1xyXG4gICAgICAgICAgICBsZXQgaWR4ID0gc3RyLmluZGV4T2YoY2hhcik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlkeCA9IHN0ci5pbmRleE9mKGNoYXIsIGlkeCsxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaWR4O1xyXG4gICAgICAgIH1cclxuICB9XHJcbiJdfQ==