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

var _constants = require('./../../utils/constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseEdit = function (_wepy$page) {
    _inherits(BaseEdit, _wepy$page);

    function BaseEdit() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, BaseEdit);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BaseEdit.__proto__ || Object.getPrototypeOf(BaseEdit)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            dictionaryList: ["DICT_BASE_SEX", "DICT_COMP_CITY", "DICT_WORK_YEARS"],
            username: '',
            email: '',
            u_sex: '',
            u_city: '',
            u_workyears: '',
            sex: [],
            city: [],
            workyears: [],
            sexStatus: true,
            livecityStatus: true,
            workyearsStatus: true,
            showPortraitStatus: false,
            tempPortraitFilePath: '',
            indexSex: '',
            indexLiveCity: '',
            indexWorkYearsStatus: '',
            loginInfo: {}
        }, _this.methods = {
            changePortrait: function changePortrait() {
                var that = this;
                that.choosePortrait();
            },
            bindSexChange: function bindSexChange(event) {
                this.sexStatus = false;
                this.indexSex = event.detail.value;
            },
            bindLiveCityChange: function bindLiveCityChange(event) {
                this.livecityStatus = false;
                this.indexLiveCity = event.detail.value;
            },
            bindWorkYearsChange: function bindWorkYearsChange(event) {
                this.workyearsStatus = false;
                this.indexWorkYearsStatus = event.detail.value;
            },
            baseEditSubmit: function baseEditSubmit(e) {
                this.username = e.detail.value.username;
                this.email = e.detail.value.email;
                this.editPersonalInfo().then(function (json) {
                    if (json.data.returnCode == 'AAAAAAA') {
                        _tip2.default.success("操作成功");
                        wx.navigateBack({
                            delta: 1
                        });
                    } else if (json.statusCode == 413) {
                        _tip2.default.error("图片文件过大");
                    } else {
                        _tip2.default.error(json.data.returnMsg);
                    }
                    wx.hideLoading();
                }).catch(function (err) {
                    _tip2.default.error(err.data.returnMsg);
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BaseEdit, [{
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            this.loginInfo = wx.getStorageSync(_constants.LOGIN_INFO) || {};
            this.getPimg();
            // 获取数据字典
            var that = this;
            that.dictionaryList.forEach(function (item, index) {
                switch (item) {
                    case "DICT_COMP_CITY":
                        // 城市
                        _this2.getDictData(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.city = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.data.returnMsg);
                            }
                        });
                        break;
                    case "DICT_BASE_SEX":
                        // 城市
                        _this2.getDictData(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.sex = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.data.returnMsg);
                            }
                        });
                        break;
                    case "DICT_WORK_YEARS":
                        // 工作年限
                        _this2.getDictData(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.workyears = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.data.returnMsg);
                            }
                        });
                        break;
                }
            });
        }
    }, {
        key: 'choosePortrait',
        value: function choosePortrait(event) {
            var that = this;
            wx.chooseImage({
                count: 1,
                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function success(res) {
                    if (res.tempFiles[0].size > 1000000) {
                        _tip2.default.error("图片大小超出限制");
                        return;
                    }
                    that.showPortraitStatus = true;
                    that.tempPortraitFilePath = res.tempFilePaths[0];
                    that.$apply(); // 返回选定照片的本地文件路径列表
                    that.uploadImgFile(that, res.tempFilePaths[0]);
                },
                fail: function fail() {
                    console.log('\u83B7\u53D6\u56FE\u7247\u5931\u8D25');
                }
            });
        }
    }, {
        key: 'uploadImgFile',
        value: function uploadImgFile(that, paths) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            wx.uploadFile({
                url: _api2.default.apimall + '/img/index', //仅为示例，非真实的接口地址
                filePath: paths,
                name: 'face',
                success: function success(res) {
                    //do something
                    if (JSON.parse(res.data).result) {
                        that.base64Img = JSON.parse(res.data).msg;
                        that.$apply();
                    } else {
                        console.log(res.data);
                    }
                },
                fail: function fail(res) {
                    console.log(res);
                }
            });
        }

        //修改个人信息

    }, {
        key: 'editPersonalInfo',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
                                return _api2.default.changeHeadImg({
                                    query: {
                                        head: {
                                            type: "h",
                                            transcode: "P0038"
                                        },
                                        data: {
                                            tokenKey: that.loginInfo.tokenKey,
                                            token: that.loginInfo.token,
                                            sex: that.sex[that.indexSex] || that.u_sex,
                                            city: that.city[that.indexLiveCity] || that.u_city,
                                            workinglife: that.workyears[that.indexWorkYearsStatus] || that.u_workinglife,
                                            username: that.username,
                                            email: that.email,
                                            imgsrc: that.base64Img,
                                            imgtype: "png"
                                        }
                                    }
                                });

                            case 4:
                                json = _context.sent;
                                return _context.abrupt('return', json);

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function editPersonalInfo() {
                return _ref2.apply(this, arguments);
            }

            return editPersonalInfo;
        }()

        //获取个人信息

    }, {
        key: 'getPimg',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var that, json;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                that = this;
                                _context2.next = 3;
                                return _api2.default.getPimg({
                                    query: {
                                        head: {
                                            "transcode": "P0040",
                                            "type": "h"
                                        },
                                        data: {
                                            "tokenKey": that.loginInfo.tokenKey,
                                            "token": that.loginInfo.token
                                        }
                                    }
                                });

                            case 3:
                                json = _context2.sent;

                                if (json.data.returnCode == 'AAAAAAA') {
                                    if (json.data.data.headimg) {
                                        that.showPortraitStatus = true;
                                    } else {
                                        that.showPortraitStatus = false;
                                    }
                                    that.tempPortraitFilePath = json.data.data.headimg;
                                    that.username = json.data.data.username;
                                    that.u_sex = json.data.data.sex;
                                    that.email = json.data.data.email;
                                    that.u_city = json.data.data.city;
                                    that.u_workyears = json.data.data.workinglife;
                                    that.$apply();
                                } else {
                                    _tip2.default.error(json.data.returnMsg);
                                }

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getPimg() {
                return _ref3.apply(this, arguments);
            }

            return getPimg;
        }()

        //获取数据字典

    }, {
        key: 'getDictData',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(groupcode) {
                var json;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return _api2.default.getDictData({
                                    query: {
                                        head: {
                                            "transcode": "DC001",
                                            "type": "h"
                                        },
                                        data: {
                                            "groupcode": groupcode,
                                            "selAll": "true"
                                        }
                                    }
                                });

                            case 2:
                                json = _context3.sent;
                                return _context3.abrupt('return', json);

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getDictData(_x) {
                return _ref4.apply(this, arguments);
            }

            return getDictData;
        }()
    }]);

    return BaseEdit;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseEdit , 'pages/personal/base_edit'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2VfZWRpdC5qcyJdLCJuYW1lcyI6WyJCYXNlRWRpdCIsImRhdGEiLCJkaWN0aW9uYXJ5TGlzdCIsInVzZXJuYW1lIiwiZW1haWwiLCJ1X3NleCIsInVfY2l0eSIsInVfd29ya3llYXJzIiwic2V4IiwiY2l0eSIsIndvcmt5ZWFycyIsInNleFN0YXR1cyIsImxpdmVjaXR5U3RhdHVzIiwid29ya3llYXJzU3RhdHVzIiwic2hvd1BvcnRyYWl0U3RhdHVzIiwidGVtcFBvcnRyYWl0RmlsZVBhdGgiLCJpbmRleFNleCIsImluZGV4TGl2ZUNpdHkiLCJpbmRleFdvcmtZZWFyc1N0YXR1cyIsImxvZ2luSW5mbyIsIm1ldGhvZHMiLCJjaGFuZ2VQb3J0cmFpdCIsInRoYXQiLCJjaG9vc2VQb3J0cmFpdCIsImJpbmRTZXhDaGFuZ2UiLCJldmVudCIsImRldGFpbCIsInZhbHVlIiwiYmluZExpdmVDaXR5Q2hhbmdlIiwiYmluZFdvcmtZZWFyc0NoYW5nZSIsImJhc2VFZGl0U3VibWl0IiwiZSIsImVkaXRQZXJzb25hbEluZm8iLCJ0aGVuIiwianNvbiIsInJldHVybkNvZGUiLCJzdWNjZXNzIiwid3giLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInN0YXR1c0NvZGUiLCJlcnJvciIsInJldHVybk1zZyIsImhpZGVMb2FkaW5nIiwiY2F0Y2giLCJlcnIiLCJnZXRTdG9yYWdlU3luYyIsImdldFBpbWciLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4IiwiZ2V0RGljdERhdGEiLCJhcnIiLCJwdXNoIiwibGFiZWwiLCIkYXBwbHkiLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic2l6ZVR5cGUiLCJzb3VyY2VUeXBlIiwicmVzIiwidGVtcEZpbGVzIiwic2l6ZSIsInRlbXBGaWxlUGF0aHMiLCJ1cGxvYWRJbWdGaWxlIiwiZmFpbCIsImNvbnNvbGUiLCJsb2ciLCJwYXRocyIsInVwbG9hZEZpbGUiLCJ1cmwiLCJhcGltYWxsIiwiZmlsZVBhdGgiLCJuYW1lIiwiSlNPTiIsInBhcnNlIiwicmVzdWx0IiwiYmFzZTY0SW1nIiwibXNnIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImNoYW5nZUhlYWRJbWciLCJxdWVyeSIsImhlYWQiLCJ0eXBlIiwidHJhbnNjb2RlIiwidG9rZW5LZXkiLCJ0b2tlbiIsIndvcmtpbmdsaWZlIiwidV93b3JraW5nbGlmZSIsImltZ3NyYyIsImltZ3R5cGUiLCJoZWFkaW1nIiwiZ3JvdXBjb2RlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBRWxCQyxJLEdBQU87QUFDSkMsNEJBQWdCLENBQUMsZUFBRCxFQUFrQixnQkFBbEIsRUFBb0MsaUJBQXBDLENBRFo7QUFFSkMsc0JBQVUsRUFGTjtBQUdKQyxtQkFBTyxFQUhIO0FBSUpDLG1CQUFPLEVBSkg7QUFLSkMsb0JBQVEsRUFMSjtBQU1KQyx5QkFBYSxFQU5UO0FBT0pDLGlCQUFLLEVBUEQ7QUFRSkMsa0JBQU0sRUFSRjtBQVNKQyx1QkFBVyxFQVRQO0FBVUpDLHVCQUFXLElBVlA7QUFXSkMsNEJBQWdCLElBWFo7QUFZSkMsNkJBQWlCLElBWmI7QUFhSkMsZ0NBQW9CLEtBYmhCO0FBY0pDLGtDQUFzQixFQWRsQjtBQWVKQyxzQkFBVSxFQWZOO0FBZ0JKQywyQkFBZSxFQWhCWDtBQWlCSkMsa0NBQXNCLEVBakJsQjtBQWtCSkMsdUJBQVc7QUFsQlAsUyxRQTBFUEMsTyxHQUFVO0FBQ05DLDBCQURNLDRCQUNVO0FBQ1osb0JBQU1DLE9BQU8sSUFBYjtBQUNBQSxxQkFBS0MsY0FBTDtBQUNILGFBSks7QUFLTkMseUJBTE0seUJBS1NDLEtBTFQsRUFLZ0I7QUFDbEIscUJBQUtkLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxxQkFBS0ssUUFBTCxHQUFnQlMsTUFBTUMsTUFBTixDQUFhQyxLQUE3QjtBQUNILGFBUks7QUFTTkMsOEJBVE0sOEJBU2FILEtBVGIsRUFTb0I7QUFDdEIscUJBQUti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TyxHQUE1QjtBQUNBYyx5Q0FBS2xCLEtBQUwsR0FBYThCLEtBQUtqQyxJQUFMLENBQVVBLElBQVYsQ0FBZUcsS0FBNUI7QUFDQWtCLHlDQUFLaEIsTUFBTCxHQUFjNEIsS0FBS2pDLElBQUwsQ0FBVUEsSUFBVixDQUFlUSxJQUE3QjtBQUNBYSx5Q0FBS2YsV0FBTCxHQUFtQjJCLEtBQUtqQyxJQUFMLENBQVVBLElBQVYsQ0FBZXVGLFdBQWxDO0FBQ0FsRSx5Q0FBS2lDLE1BQUw7QUFDSCxpQ0FiRCxNQWFLO0FBQ0Qsa0RBQUlkLEtBQUosQ0FBVVAsS0FBS2pDLElBQUwsQ0FBVXlDLFNBQXBCO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0w7Ozs7O2tHQUNrQm1ELFM7Ozs7Ozs7dUNBQ0ssY0FBSTFDLFdBQUosQ0FBZ0I7QUFDbkMrQiwyQ0FBTztBQUNIQyw4Q0FBTTtBQUNGLHlEQUFhLE9BRFg7QUFFRixvREFBUTtBQUZOLHlDQURIO0FBS0hsRiw4Q0FBTTtBQUNGLHlEQUFhNEYsU0FEWDtBQUVGLHNEQUFVO0FBRlI7QUFMSDtBQUQ0QixpQ0FBaEIsQzs7O0FBQWIzRCxvQztrRUFZQ0EsSTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXpPdUIsZUFBSzRELEk7O2tCQUF0QjlGLFEiLCJmaWxlIjoiYmFzZV9lZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG5pbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcbmltcG9ydCB7TE9HSU5fSU5GT30gZnJvbSAnLi4vLi4vdXRpbHMvY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VFZGl0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuXHJcbiAgIGRhdGEgPSB7XHJcbiAgICAgIGRpY3Rpb25hcnlMaXN0OiBbXCJESUNUX0JBU0VfU0VYXCIsIFwiRElDVF9DT01QX0NJVFlcIiwgXCJESUNUX1dPUktfWUVBUlNcIl0sXHJcbiAgICAgIHVzZXJuYW1lOiAnJyxcclxuICAgICAgZW1haWw6ICcnLFxyXG4gICAgICB1X3NleDogJycsXHJcbiAgICAgIHVfY2l0eTogJycsXHJcbiAgICAgIHVfd29ya3llYXJzOiAnJyxcclxuICAgICAgc2V4OiBbXSxcclxuICAgICAgY2l0eTogW10sXHJcbiAgICAgIHdvcmt5ZWFyczogW10sXHJcbiAgICAgIHNleFN0YXR1czogdHJ1ZSxcclxuICAgICAgbGl2ZWNpdHlTdGF0dXM6IHRydWUsXHJcbiAgICAgIHdvcmt5ZWFyc1N0YXR1czogdHJ1ZSxcclxuICAgICAgc2hvd1BvcnRyYWl0U3RhdHVzOiBmYWxzZSxcclxuICAgICAgdGVtcFBvcnRyYWl0RmlsZVBhdGg6ICcnLFxyXG4gICAgICBpbmRleFNleDogJycsXHJcbiAgICAgIGluZGV4TGl2ZUNpdHk6ICcnLFxyXG4gICAgICBpbmRleFdvcmtZZWFyc1N0YXR1czogJycsXHJcbiAgICAgIGxvZ2luSW5mbzoge30sXHJcbiAgIH1cclxuXHJcbiAgIG9uTG9hZCgpe1xyXG4gICAgICAgdGhpcy5sb2dpbkluZm8gPSAgd3guZ2V0U3RvcmFnZVN5bmMoTE9HSU5fSU5GTykgfHwge307XHJcbiAgICAgICB0aGlzLmdldFBpbWcoKTtcclxuICAgICAgIC8vIOiOt+WPluaVsOaNruWtl+WFuFxyXG4gICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC5kaWN0aW9uYXJ5TGlzdC5mb3JFYWNoKChpdGVtLGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbSl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRElDVF9DT01QX0NJVFlcIjovLyDln47luIJcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldERpY3REYXRhKGl0ZW0pLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc29uLmRhdGEuZGF0YS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jaXR5ID0gYXJyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRElDVF9CQVNFX1NFWFwiOi8vIOWfjuW4glxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGljdERhdGEoaXRlbSkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzb24uZGF0YS5kYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNleCA9IGFycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLnJldHVybk1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkRJQ1RfV09SS19ZRUFSU1wiOi8vIOW3peS9nOW5tOmZkFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGljdERhdGEoaXRlbSkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzb24uZGF0YS5kYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lndvcmt5ZWFycyA9IGFycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLnJldHVybk1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgIH1cclxuXHJcbiAgIG1ldGhvZHMgPSB7XHJcbiAgICAgICBjaGFuZ2VQb3J0cmFpdCgpe1xyXG4gICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgIHRoYXQuY2hvb3NlUG9ydHJhaXQoKTtcclxuICAgICAgIH0sXHJcbiAgICAgICBiaW5kU2V4Q2hhbmdlIChldmVudCkge1xyXG4gICAgICAgICAgIHRoaXMuc2V4U3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgdGhpcy5pbmRleFNleCA9IGV2ZW50LmRldGFpbC52YWx1ZTtcclxuICAgICAgIH0sXHJcbiAgICAgICBiaW5kTGl2ZUNpdHlDaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAgICB0aGlzLmxpdmVjaXR5U3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgdGhpcy5pbmRleExpdmVDaXR5ID0gZXZlbnQuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgfSxcclxuICAgICAgIGJpbmRXb3JrWWVhcnNDaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICAgICB0aGlzLndvcmt5ZWFyc1N0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgIHRoaXMuaW5kZXhXb3JrWWVhcnNTdGF0dXMgPSBldmVudC5kZXRhaWwudmFsdWU7XHJcbiAgICAgICB9LFxyXG4gICAgICAgYmFzZUVkaXRTdWJtaXQoZSl7XHJcbiAgICAgICAgICAgdGhpcy51c2VybmFtZSA9IGUuZGV0YWlsLnZhbHVlLnVzZXJuYW1lO1xyXG4gICAgICAgICAgIHRoaXMuZW1haWwgPSBlLmRldGFpbC52YWx1ZS5lbWFpbDtcclxuICAgICAgICAgICB0aGlzLmVkaXRQZXJzb25hbEluZm8oKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICBpZihqc29uLmRhdGEucmV0dXJuQ29kZSA9PSAnQUFBQUFBQScpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aXAuc3VjY2VzcyhcIuaTjeS9nOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICBkZWx0YTogMVxyXG4gICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGpzb24uc3RhdHVzQ29kZSA9PSA0MTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihcIuWbvueJh+aWh+S7tui/h+Wkp1wiKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICAgICB9KS5jYXRjaChlcnI9PntcclxuICAgICAgICAgICAgICAgdGlwLmVycm9yKGVyci5kYXRhLnJldHVybk1zZyk7XHJcbiAgICAgICAgICAgfSlcclxuICAgICAgIH1cclxuICAgfVxyXG5cclxuICAgIGNob29zZVBvcnRyYWl0KGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgd3guY2hvb3NlSW1hZ2Uoe1xyXG4gICAgICAgICAgICBjb3VudDogMSxcclxuICAgICAgICAgICAgc2l6ZVR5cGU6IFsnY29tcHJlc3NlZCddLCAgICAgLy8g5Y+v5Lul5oyH5a6a5piv5Y6f5Zu+6L+Y5piv5Y6L57yp5Zu+77yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sICAgICAgICAvLyDlj6/ku6XmjIflrprmnaXmupDmmK/nm7jlhozov5jmmK/nm7jmnLrvvIzpu5jorqTkuozogIXpg73mnIlcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmKHJlcy50ZW1wRmlsZXNbMF0uc2l6ZT4xMDAwMDAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aXAuZXJyb3IoXCLlm77niYflpKflsI/otoXlh7rpmZDliLZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93UG9ydHJhaXRTdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC50ZW1wUG9ydHJhaXRGaWxlUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhzWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKSAgICAgLy8g6L+U5Zue6YCJ5a6a54Wn54mH55qE5pys5Zyw5paH5Lu26Lev5b6E5YiX6KGoXHJcbiAgICAgICAgICAgICAgICB0aGF0LnVwbG9hZEltZ0ZpbGUodGhhdCwgcmVzLnRlbXBGaWxlUGF0aHNbMF0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwoKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDojrflj5blm77niYflpLHotKVgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBsb2FkSW1nRmlsZSh0aGF0LCBwYXRocykge1xyXG4gICAgICAgIC8vIOi/lOWbnumAieWumueFp+eJh+eahOacrOWcsOaWh+S7tui3r+W+hOWIl+ihqO+8jHRlbXBGaWxlUGF0aOWPr+S7peS9nOS4umltZ+agh+etvueahHNyY+WxnuaAp+aYvuekuuWbvueJh1xyXG4gICAgICAgICB3eC51cGxvYWRGaWxlKHtcclxuICAgICAgICAgICAgdXJsOiBgJHthcGkuYXBpbWFsbH0vaW1nL2luZGV4YCwgLy/ku4XkuLrnpLrkvovvvIzpnZ7nnJ/lrp7nmoTmjqXlj6PlnLDlnYBcclxuICAgICAgICAgICAgZmlsZVBhdGg6IHBhdGhzLFxyXG4gICAgICAgICAgICBuYW1lOiAnZmFjZScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAvL2RvIHNvbWV0aGluZ1xyXG4gICAgICAgICAgICAgICAgaWYoSlNPTi5wYXJzZShyZXMuZGF0YSkucmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iYXNlNjRJbWcgPSBKU09OLnBhcnNlKHJlcy5kYXRhKS5tc2c7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgLy/kv67mlLnkuKrkurrkv6Hmga9cclxuICAgIGFzeW5jIGVkaXRQZXJzb25hbEluZm8oKSB7XHJcbiAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmNoYW5nZUhlYWRJbWcoe1xyXG4gICAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDp7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlOiBcIlAwMDM4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOntcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbktleTogdGhhdC5sb2dpbkluZm8udG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHRoYXQubG9naW5JbmZvLnRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgIHNleDogdGhhdC5zZXhbdGhhdC5pbmRleFNleF0gfHwgdGhhdC51X3NleCxcclxuICAgICAgICAgICAgICAgICAgICBjaXR5OiB0aGF0LmNpdHlbdGhhdC5pbmRleExpdmVDaXR5XSB8fCB0aGF0LnVfY2l0eSxcclxuICAgICAgICAgICAgICAgICAgICB3b3JraW5nbGlmZTogdGhhdC53b3JreWVhcnNbdGhhdC5pbmRleFdvcmtZZWFyc1N0YXR1c10gfHwgdGhhdC51X3dvcmtpbmdsaWZlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB0aGF0LnVzZXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB0aGF0LmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIGltZ3NyYzogdGhhdC5iYXNlNjRJbWcsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1ndHlwZTogXCJwbmdcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluS4quS6uuS/oeaBr1xyXG4gICAgYXN5bmMgZ2V0UGltZygpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldFBpbWcoe1xyXG4gICAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJQMDA0MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlbktleVwiOiB0aGF0LmxvZ2luSW5mby50b2tlbktleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LmxvZ2luSW5mby50b2tlbixcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZihqc29uLmRhdGEucmV0dXJuQ29kZSA9PSAnQUFBQUFBQScpIHtcclxuICAgICAgICAgICAgaWYoanNvbi5kYXRhLmRhdGEuaGVhZGltZyl7XHJcbiAgICAgICAgICAgICAgIHRoYXQuc2hvd1BvcnRyYWl0U3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dQb3J0cmFpdFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQudGVtcFBvcnRyYWl0RmlsZVBhdGggPSBqc29uLmRhdGEuZGF0YS5oZWFkaW1nO1xyXG4gICAgICAgICAgICB0aGF0LnVzZXJuYW1lID0ganNvbi5kYXRhLmRhdGEudXNlcm5hbWU7XHJcbiAgICAgICAgICAgIHRoYXQudV9zZXggPSBqc29uLmRhdGEuZGF0YS5zZXg7XHJcbiAgICAgICAgICAgIHRoYXQuZW1haWwgPSBqc29uLmRhdGEuZGF0YS5lbWFpbDtcclxuICAgICAgICAgICAgdGhhdC51X2NpdHkgPSBqc29uLmRhdGEuZGF0YS5jaXR5O1xyXG4gICAgICAgICAgICB0aGF0LnVfd29ya3llYXJzID0ganNvbi5kYXRhLmRhdGEud29ya2luZ2xpZmU7XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5bmlbDmja7lrZflhbhcclxuICAgIGFzeW5jIGdldERpY3REYXRhKGdyb3VwY29kZSkge1xyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0RGljdERhdGEoe1xyXG4gICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgIGhlYWQ6IHtcclxuICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiREMwMDFcIixcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBcImdyb3VwY29kZVwiOiBncm91cGNvZGUsXHJcbiAgICAgICAgICAgICAgICBcInNlbEFsbFwiOiBcInRydWVcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGpzb247XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=