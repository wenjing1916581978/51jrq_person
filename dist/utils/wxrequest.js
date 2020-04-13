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
                resolve(res);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4cmVxdWVzdC5qcyJdLCJuYW1lcyI6WyJ3eFJlcXVlc3QiLCJwYXJhbXMiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImRhdGEiLCJxdWVyeSIsInJlcXVlc3QiLCJtZXRob2QiLCJoZWFkZXIiLCJzdWNjZXNzIiwicmVzIiwiZmFpbCIsImVyciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWSxTQUFaQSxTQUFZLEdBQXNCO0FBQUEsUUFBckJDLE1BQXFCLHVFQUFaLEVBQVk7QUFBQSxRQUFSQyxHQUFROztBQUNwQyxXQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUMxQyxZQUFJQyxPQUFPTCxPQUFPTSxLQUFQLElBQWdCLEVBQTNCO0FBQ0EsdUJBQUtDLE9BQUwsQ0FBYTtBQUNUTixpQkFBS0EsR0FESTtBQUVUTyxvQkFBUVIsT0FBT1EsTUFBUCxJQUFpQixNQUZoQjtBQUdUSCxrQkFBTUEsSUFIRztBQUlUSSxvQkFBUSxFQUFFLGdCQUFnQixrQkFBbEIsRUFKQztBQUtUQyxxQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ25CUix3QkFBUVEsR0FBUjtBQUNILGFBUFE7QUFRVEMsa0JBQU0sY0FBU0MsR0FBVCxFQUFhO0FBQ2ZULHVCQUFPUyxHQUFQO0FBQ0g7QUFWUSxTQUFiO0FBWUgsS0FkTSxDQUFQO0FBZUgsQ0FoQkQ7O0FBa0JBQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JoQjtBQURhLENBQWpCIiwiZmlsZSI6Ind4cmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgdGlwIGZyb20gJy4vdGlwJ1xyXG5cclxuY29uc3Qgd3hSZXF1ZXN0ID0gKHBhcmFtcyA9IHt9LCB1cmwpID0+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBwYXJhbXMucXVlcnkgfHwge307XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIG1ldGhvZDogcGFyYW1zLm1ldGhvZCB8fCAnUE9TVCcsXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIGhlYWRlcjogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICB3eFJlcXVlc3RcclxufVxyXG4iXX0=