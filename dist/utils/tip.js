"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 提示与加载工具类
 */
var Tips = function () {
  function Tips() {
    _classCallCheck(this, Tips);

    this.isLoading = false;
  }
  /**
   * 弹出提示框
   */

  _createClass(Tips, null, [{
    key: "success",
    value: function success() {
      var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "成功";
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

      setTimeout(function () {
        wx.showToast({
          title: title,
          icon: "success",
          mask: true,
          duration: duration
        });
      }, 300);
      if (duration > 0) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve();
          }, duration);
        });
      }
    }

    /**
     * 弹出确认窗口
     */

  }, {
    key: "confirm",
    value: function confirm(text) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "提示";

      return new Promise(function (resolve, reject) {
        wx.showModal({
          title: title,
          content: text,
          showCancel: true,
          success: function success(res) {
            if (res.confirm) {
              resolve(payload);
            } else if (res.cancel) {
              reject(payload);
            }
          },
          fail: function fail(res) {
            reject(payload);
          }
        });
      });
    }
  }, {
    key: "toast",
    value: function toast() {
      var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "加载";
      var onHide = arguments[1];
      var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "success";

      setTimeout(function () {
        wx.showToast({
          title: title,
          icon: icon,
          mask: true,
          duration: 500
        });
      }, 300);

      // 隐藏结束回调
      if (onHide) {
        setTimeout(function () {
          onHide();
        }, 500);
      }
    }

    /**
     * 警告框
     */

  }, {
    key: "alert",
    value: function alert() {
      var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "警告";

      wx.showToast({
        title: title,
        image: "/images/icons/alert.png",
        mask: true,
        duration: 1500
      });
    }

    /**
     * 错误框
     */

  }, {
    key: "error",
    value: function error() {
      var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "错误";
      var onHide = arguments[1];

      wx.showToast({
        title: title,
        icon: "none",
        mask: true,
        duration: 1500
      });
      // 隐藏结束回调
      if (onHide) {
        setTimeout(function () {
          onHide();
        }, 1500);
      }
    }

    /**
     * 弹出加载提示
     */

  }, {
    key: "loading",
    value: function loading() {
      var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "加载中";

      if (Tips.isLoading) {
        return;
      }
      Tips.isLoading = true;
      wx.showLoading({
        title: title,
        mask: true
      });
    }

    /**
     * 加载完毕
     */

  }, {
    key: "loaded",
    value: function loaded() {
      if (Tips.isLoading) {
        Tips.isLoading = false;
        wx.hideLoading();
      }
    }
  }, {
    key: "share",
    value: function share(title, url, desc) {
      return {
        title: title,
        path: url,
        desc: desc,
        success: function success(res) {
          Tips.toast("分享成功");
        }
      };
    }
  }]);

  return Tips;
}();

/**
 * 静态变量，是否加载中
 */


exports.default = Tips;
Tips.isLoading = false;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpcC5qcyJdLCJuYW1lcyI6WyJUaXBzIiwiaXNMb2FkaW5nIiwidGl0bGUiLCJkdXJhdGlvbiIsInNldFRpbWVvdXQiLCJ3eCIsInNob3dUb2FzdCIsImljb24iLCJtYXNrIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0ZXh0IiwicGF5bG9hZCIsInNob3dNb2RhbCIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJjYW5jZWwiLCJmYWlsIiwib25IaWRlIiwiaW1hZ2UiLCJzaG93TG9hZGluZyIsImhpZGVMb2FkaW5nIiwidXJsIiwiZGVzYyIsInBhdGgiLCJ0b2FzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7SUFHcUJBLEk7QUFDakIsa0JBQWM7QUFBQTs7QUFDWixTQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0Q7QUFDRDs7Ozs7OzhCQUkyQztBQUFBLFVBQTVCQyxLQUE0Qix1RUFBdEIsSUFBc0I7QUFBQSxVQUFoQkMsUUFBZ0IsdUVBQUwsR0FBSzs7QUFDekNDLGlCQUFXLFlBQU07QUFDZkMsV0FBR0MsU0FBSCxDQUFhO0FBQ1hKLGlCQUFPQSxLQURJO0FBRVhLLGdCQUFNLFNBRks7QUFHWEMsZ0JBQU0sSUFISztBQUlYTCxvQkFBVUE7QUFKQyxTQUFiO0FBTUQsT0FQRCxFQU9HLEdBUEg7QUFRQSxVQUFJQSxXQUFXLENBQWYsRUFBa0I7QUFDaEIsZUFBTyxJQUFJTSxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDUCxxQkFBVyxZQUFNO0FBQ2ZNO0FBQ0QsV0FGRCxFQUVHUCxRQUZIO0FBR0QsU0FKTSxDQUFQO0FBS0Q7QUFDRjs7QUFFRDs7Ozs7OzRCQUdlUyxJLEVBQWtDO0FBQUEsVUFBNUJDLE9BQTRCLHVFQUFsQixFQUFrQjtBQUFBLFVBQWRYLEtBQWMsdUVBQU4sSUFBTTs7QUFDL0MsYUFBTyxJQUFJTyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDTixXQUFHUyxTQUFILENBQWE7QUFDWFosaUJBQU9BLEtBREk7QUFFWGEsbUJBQVNILElBRkU7QUFHWEksc0JBQVksSUFIRDtBQUlYQyxtQkFBUyxzQkFBTztBQUNkLGdCQUFJQyxJQUFJQyxPQUFSLEVBQWlCO0FBQ2ZULHNCQUFRRyxPQUFSO0FBQ0QsYUFGRCxNQUVPLElBQUlLLElBQUlFLE1BQVIsRUFBZ0I7QUFDckJULHFCQUFPRSxPQUFQO0FBQ0Q7QUFDRixXQVZVO0FBV1hRLGdCQUFNLG1CQUFPO0FBQ1hWLG1CQUFPRSxPQUFQO0FBQ0Q7QUFiVSxTQUFiO0FBZUQsT0FoQk0sQ0FBUDtBQWlCRDs7OzRCQUVrRDtBQUFBLFVBQXRDWCxLQUFzQyx1RUFBaEMsSUFBZ0M7QUFBQSxVQUExQm9CLE1BQTBCO0FBQUEsVUFBbEJmLElBQWtCLHVFQUFYLFNBQVc7O0FBQ2pESCxpQkFBVyxZQUFNO0FBQ2ZDLFdBQUdDLFNBQUgsQ0FBYTtBQUNYSixpQkFBT0EsS0FESTtBQUVYSyxnQkFBTUEsSUFGSztBQUdYQyxnQkFBTSxJQUhLO0FBSVhMLG9CQUFVO0FBSkMsU0FBYjtBQU1ELE9BUEQsRUFPRyxHQVBIOztBQVNBO0FBQ0EsVUFBSW1CLE1BQUosRUFBWTtBQUNWbEIsbUJBQVcsWUFBTTtBQUNma0I7QUFDRCxTQUZELEVBRUcsR0FGSDtBQUdEO0FBQ0Y7O0FBRUQ7Ozs7Ozs0QkFHeUI7QUFBQSxVQUFacEIsS0FBWSx1RUFBTixJQUFNOztBQUN2QkcsU0FBR0MsU0FBSCxDQUFhO0FBQ1hKLGVBQU9BLEtBREk7QUFFWHFCLGVBQU8seUJBRkk7QUFHWGYsY0FBTSxJQUhLO0FBSVhMLGtCQUFVO0FBSkMsT0FBYjtBQU1EOztBQUVEOzs7Ozs7NEJBSWlDO0FBQUEsVUFBcEJELEtBQW9CLHVFQUFkLElBQWM7QUFBQSxVQUFSb0IsTUFBUTs7QUFDL0JqQixTQUFHQyxTQUFILENBQWE7QUFDWEosZUFBT0EsS0FESTtBQUVYSyxjQUFNLE1BRks7QUFHWEMsY0FBTSxJQUhLO0FBSVhMLGtCQUFVO0FBSkMsT0FBYjtBQU1BO0FBQ0EsVUFBSW1CLE1BQUosRUFBWTtBQUNWbEIsbUJBQVcsWUFBTTtBQUNma0I7QUFDRCxTQUZELEVBRUcsSUFGSDtBQUdEO0FBQ0Y7O0FBRUQ7Ozs7Ozs4QkFHOEI7QUFBQSxVQUFmcEIsS0FBZSx1RUFBUCxLQUFPOztBQUM1QixVQUFJRixLQUFLQyxTQUFULEVBQW9CO0FBQ2xCO0FBQ0Q7QUFDREQsV0FBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBSSxTQUFHbUIsV0FBSCxDQUFlO0FBQ2J0QixlQUFPQSxLQURNO0FBRWJNLGNBQU07QUFGTyxPQUFmO0FBSUQ7O0FBRUQ7Ozs7Ozs2QkFHZ0I7QUFDZCxVQUFJUixLQUFLQyxTQUFULEVBQW9CO0FBQ2xCRCxhQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0FJLFdBQUdvQixXQUFIO0FBQ0Q7QUFDRjs7OzBCQUVZdkIsSyxFQUFPd0IsRyxFQUFLQyxJLEVBQU07QUFDN0IsYUFBTztBQUNMekIsZUFBT0EsS0FERjtBQUVMMEIsY0FBTUYsR0FGRDtBQUdMQyxjQUFNQSxJQUhEO0FBSUxWLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckJsQixlQUFLNkIsS0FBTCxDQUFXLE1BQVg7QUFDRDtBQU5JLE9BQVA7QUFRRDs7Ozs7O0FBR0g7Ozs7O2tCQXRJbUI3QixJO0FBeUluQkEsS0FBS0MsU0FBTCxHQUFpQixLQUFqQiIsImZpbGUiOiJ0aXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5o+Q56S65LiO5Yqg6L295bel5YW357G7XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaXBzIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlvLnlh7rmj5DnpLrmoYZcclxuICAgICAqL1xyXG4gIFxyXG4gICAgc3RhdGljIHN1Y2Nlc3ModGl0bGU9XCLmiJDlip9cIiwgZHVyYXRpb24gPSA1MDApIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiB0aXRsZSwgXHJcbiAgICAgICAgICBpY29uOiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgIG1hc2s6IHRydWUsXHJcbiAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cclxuICAgICAgICB9KTtcclxuICAgICAgfSwgMzAwKTtcclxuICAgICAgaWYgKGR1cmF0aW9uID4gMCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIOW8ueWHuuehruiupOeql+WPo1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY29uZmlybSh0ZXh0LCBwYXlsb2FkID0ge30sIHRpdGxlID0gXCLmj5DnpLpcIikge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICBjb250ZW50OiB0ZXh0LFxyXG4gICAgICAgICAgc2hvd0NhbmNlbDogdHJ1ZSxcclxuICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUocGF5bG9hZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLmNhbmNlbCkge1xyXG4gICAgICAgICAgICAgIHJlamVjdChwYXlsb2FkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWw6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChwYXlsb2FkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBzdGF0aWMgdG9hc3QodGl0bGU9XCLliqDovb1cIiwgb25IaWRlLCBpY29uID0gXCJzdWNjZXNzXCIpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICAgIGljb246IGljb24sXHJcbiAgICAgICAgICBtYXNrOiB0cnVlLFxyXG4gICAgICAgICAgZHVyYXRpb246IDUwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCAzMDApO1xyXG4gIFxyXG4gICAgICAvLyDpmpDol4/nu5PmnZ/lm57osINcclxuICAgICAgaWYgKG9uSGlkZSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgb25IaWRlKCk7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiDorablkYrmoYZcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFsZXJ0KHRpdGxlPVwi6K2m5ZGKXCIpIHtcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgaW1hZ2U6IFwiL2ltYWdlcy9pY29ucy9hbGVydC5wbmdcIixcclxuICAgICAgICBtYXNrOiB0cnVlLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAwXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgLyoqXHJcbiAgICAgKiDplJnor6/moYZcclxuICAgICAqL1xyXG4gIFxyXG4gICAgc3RhdGljIGVycm9yKHRpdGxlPVwi6ZSZ6K+vXCIsIG9uSGlkZSkge1xyXG4gICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICBpY29uOiBcIm5vbmVcIixcclxuICAgICAgICBtYXNrOiB0cnVlLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAwXHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyDpmpDol4/nu5PmnZ/lm57osINcclxuICAgICAgaWYgKG9uSGlkZSkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgb25IaWRlKCk7XHJcbiAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIC8qKlxyXG4gICAgICog5by55Ye65Yqg6L295o+Q56S6XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkaW5nKHRpdGxlID0gXCLliqDovb3kuK1cIikge1xyXG4gICAgICBpZiAoVGlwcy5pc0xvYWRpbmcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgVGlwcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIG1hc2s6IHRydWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9veWujOavlVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbG9hZGVkKCkge1xyXG4gICAgICBpZiAoVGlwcy5pc0xvYWRpbmcpIHtcclxuICAgICAgICBUaXBzLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIHN0YXRpYyBzaGFyZSh0aXRsZSwgdXJsLCBkZXNjKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIHBhdGg6IHVybCxcclxuICAgICAgICBkZXNjOiBkZXNjLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgVGlwcy50b2FzdChcIuWIhuS6q+aIkOWKn1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC8qKlxyXG4gICAqIOmdmeaAgeWPmOmHj++8jOaYr+WQpuWKoOi9veS4rVxyXG4gICAqL1xyXG4gIFRpcHMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgIl19