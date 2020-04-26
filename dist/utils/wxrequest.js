'use strict';

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _tip = require('./tip.js');

var _tip2 = _interopRequireDefault(_tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wxRequest = function wxRequest() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var url = arguments[1];

  return new Promise(function (resolve, reject) {
    var data = params.query || {};
    _wepy2.default.request({
      url: url,
      method: params.method || 'POST',
      data: data,
      header: { 'Content-Type': 'application/json' },
      success: function success(res) {
        console.log('回调', res);
        if (res.data.returnCode && res.data.returnCode == "1000009") {
          wx.removeStorage({
            key: 'loginData',
            success: function success(res) {
              wx.navigateTo({
                url: '/pages/login/login'
              });
            }
          });
          wx.removeStorageSync('login');
        } else {
          resolve(res);
        }
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
};

module.exports = {
  wxRequest: wxRequest
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4cmVxdWVzdC5qcyJdLCJuYW1lcyI6WyJ3eFJlcXVlc3QiLCJwYXJhbXMiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJxdWVyeSIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJzdWNjZXNzIiwicmVzIiwiY29uc29sZSIsImxvZyIsInJldHVybkNvZGUiLCJ3eCIsInJlbW92ZVN0b3JhZ2UiLCJrZXkiLCJuYXZpZ2F0ZVRvIiwicmVtb3ZlU3RvcmFnZVN5bmMiLCJmYWlsIiwiZXJyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxZQUFZLFNBQVpBLFNBQVksR0FBc0I7QUFBQSxNQUFyQkMsTUFBcUIsdUVBQVosRUFBWTtBQUFBLE1BQVJDLEdBQVE7O0FBQ3BDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDLFFBQUlDLE9BQU9MLE9BQU9NLEtBQVAsSUFBZ0IsRUFBM0I7QUFDQSxtQkFBS0MsT0FBTCxDQUFhO0FBQ1ROLFdBQUtBLEdBREk7QUFFVE8sY0FBUVIsT0FBT1EsTUFBUCxJQUFpQixNQUZoQjtBQUdUSCxZQUFNQSxJQUhHO0FBSVRJLGNBQVEsRUFBRSxnQkFBZ0Isa0JBQWxCLEVBSkM7QUFLVEMsZUFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCQyxnQkFBUUMsR0FBUixDQUFZLElBQVosRUFBaUJGLEdBQWpCO0FBQ0EsWUFBR0EsSUFBSU4sSUFBSixDQUFTUyxVQUFULElBQXFCSCxJQUFJTixJQUFKLENBQVNTLFVBQVQsSUFBcUIsU0FBN0MsRUFBdUQ7QUFDckRDLGFBQUdDLGFBQUgsQ0FBaUI7QUFDZkMsaUJBQUssV0FEVTtBQUVmUCxtQkFGZSxtQkFFTkMsR0FGTSxFQUVEO0FBQ1pJLGlCQUFHRyxVQUFILENBQWM7QUFDWmpCLHFCQUFLO0FBRE8sZUFBZDtBQUdEO0FBTmMsV0FBakI7QUFRQWMsYUFBR0ksaUJBQUgsQ0FBcUIsT0FBckI7QUFDRCxTQVZELE1BVUs7QUFDSGhCLGtCQUFRUSxHQUFSO0FBQ0Q7QUFFRixPQXJCUTtBQXNCVFMsWUFBTSxjQUFTQyxHQUFULEVBQWE7QUFDZmpCLGVBQU9pQixHQUFQO0FBQ0g7QUF4QlEsS0FBYjtBQTBCSCxHQTVCTSxDQUFQO0FBNkJILENBOUJEOztBQWdDQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNieEI7QUFEYSxDQUFqQiIsImZpbGUiOiJ3eHJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcclxuaW1wb3J0IHRpcCBmcm9tICcuL3RpcCdcclxuXHJcbmNvbnN0IHd4UmVxdWVzdCA9IChwYXJhbXMgPSB7fSwgdXJsKSA9PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gcGFyYW1zLnF1ZXJ5IHx8IHt9O1xyXG4gICAgICAgIHdlcHkucmVxdWVzdCh7XHJcbiAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICBtZXRob2Q6IHBhcmFtcy5tZXRob2QgfHwgJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICBoZWFkZXI6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5Zue6LCDJyxyZXMpXHJcbiAgICAgICAgICAgICAgaWYocmVzLmRhdGEucmV0dXJuQ29kZSYmcmVzLmRhdGEucmV0dXJuQ29kZT09XCIxMDAwMDA5XCIpe1xyXG4gICAgICAgICAgICAgICAgd3gucmVtb3ZlU3RvcmFnZSh7XHJcbiAgICAgICAgICAgICAgICAgIGtleTogJ2xvZ2luRGF0YScsXHJcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2xvZ2luL2xvZ2luJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB3eC5yZW1vdmVTdG9yYWdlU3luYygnbG9naW4nKVxyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24oZXJyKXtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHd4UmVxdWVzdFxyXG59XHJcbiJdfQ==