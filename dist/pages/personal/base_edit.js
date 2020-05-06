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
            screen: [{
                list: [],
                index: []
            }, {
                list: [],
                index: []
            }, {
                list: [],
                index: []
            }],
            form: {
                imgsrc: '',
                username: '',
                sex: '',
                postids: '',
                jobname: '',
                sitecity: ''
            },
            token: '',
            tokenKey: '',
            perfect: false,
            base64: false
        }, _this.methods = {
            skip: function skip() {
                wx.switchTab({
                    url: '/pages/personal/personal'
                });
            },
            changePortrait: function changePortrait() {
                var that = this;
                that.choosePortrait();
            },
            inputChange: function inputChange(e) {
                var form = this.form;

                var name = e.currentTarget.dataset.name;
                form[name] = e.detail.value;
                this.$apply();
            },
            pickerChange: function pickerChange(e) {
                var form = this.form;

                var name = e.currentTarget.dataset.name;
                var current = e.currentTarget.dataset.current;
                var index = e.detail.value;
                form[name] = this.screen[current].list[index];
                this.screen[current].index = e.detail.value;
                this.$apply();
            },
            formSubmit: function formSubmit(e) {
                var form = this.form;

                if (!form.imgsrc) {
                    _tip2.default.error('头像不为空');
                    return false;
                }
                if (!form.username) {
                    _tip2.default.error('姓名不为空');
                    return false;
                }
                if (!form.sex) {
                    _tip2.default.error('请选择性别');
                    return false;
                }
                if (!form.sitecity) {
                    _tip2.default.error('期望城市不为空');
                    return false;
                }
                if (!form.postids) {
                    _tip2.default.error('请选择期望行业');
                    return false;
                }
                this.editPersonalInfo();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BaseEdit, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var that = this;
            var login = wx.getStorageSync('login');
            that.token = login.token;
            that.tokenKey = login.tokenKey;
            that.$apply();
            if (options.perfect) {
                that.perfect = true;
                that.$apply();
            } else {
                this.getPimg();
            }

            var arr = ["DICT_BASE_SEX", "DICT_COMP_INDUSTRY"];
            for (var i = 0; i < arr.length; i++) {
                that.getDict(arr[i], i);
            }
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
                    // let base64 = res.tempFilePaths[0]
                    var base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64');
                    // console.log(base64)
                    that.form.imgsrc = base64;
                    that.base64 = true;
                    that.$apply(); // 返回选定照片的本地文件路径列表
                    // that.uploadImgFile(that, base64)
                },
                fail: function fail() {
                    console.log('\u83B7\u53D6\u56FE\u7247\u5931\u8D25');
                }
            });
        }

        //修改个人信息

    }, {
        key: 'editPersonalInfo',
        value: function editPersonalInfo() {
            var that = this;
            wx.showLoading({
                title: '加载中'
            });
            var obj = Object.assign(that.form, {
                tokenKey: that.tokenKey,
                token: that.token,
                imgtype: "png"
            });

            if (!that.base64) delete obj.imgsrc;
            _api2.default.changeHeadImg({
                query: {
                    head: {
                        type: "h",
                        transcode: "P0038"
                    },
                    data: obj
                }
            }).then(function (res) {
                if (res.data.returnCode == 'AAAAAAA') {
                    _tip2.default.success("操作成功");
                    if (!that.perfect) {
                        wx.navigateBack({
                            delta: 1
                        });
                    } else {
                        wx.switchTab({
                            url: '/pages/personal/personal'
                        });
                    }
                } else if (res.statusCode == 413) {
                    _tip2.default.error("图片文件过大");
                } else {
                    _tip2.default.error(res.data.returnMsg);
                }
                wx.hideLoading();
            }).catch(function (err) {
                _tip2.default.error(err.data.returnMsg);
            });
            // return json;
        }

        //获取个人信息

    }, {
        key: 'getPimg',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var that;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                that = this;

                                _api2.default.getPimg({
                                    query: {
                                        head: {
                                            "transcode": "P0040",
                                            "type": "h"
                                        },
                                        data: {
                                            "tokenKey": that.tokenKey,
                                            "token": that.token
                                        }
                                    }
                                }).then(function (res) {
                                    if (res.data.returnCode == 'AAAAAAA') {
                                        that.form.imgsrc = res.data.data.headimg;
                                        that.form.username = res.data.data.username;
                                        that.form.sex = res.data.data.sex;
                                        that.form.sitecity = res.data.data.sitecity;
                                        that.form.postids = res.data.data.postids;
                                        that.form.jobname = res.data.data.jobname;

                                        that.$apply();
                                    } else {
                                        _tip2.default.error(res.data.returnMsg);
                                    }
                                });

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getPimg() {
                return _ref2.apply(this, arguments);
            }

            return getPimg;
        }()

        //获取数据字典
        //获取数据字典

    }, {
        key: 'getDict',
        value: function getDict(code, i) {
            var that = this;
            _api2.default.getDictData({
                query: {
                    head: {
                        "transcode": "DC001",
                        "type": "h"
                    },
                    data: {
                        "groupcode": code,
                        "selAll": "false"
                    }
                }
            }).then(function (res) {
                if (res.data.returnCode == "AAAAAAA") {
                    var arr = [];
                    res.data.data.forEach(function (item, index) {
                        arr.push(item.label);
                    });
                    that.screen[i].list = arr;
                    that.$apply();
                } else {
                    _tip2.default.error(res.returnMsg);
                }
            }).catch(function (err) {});
        }
    }]);

    return BaseEdit;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(BaseEdit , 'pages/personal/base_edit'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2VfZWRpdC5qcyJdLCJuYW1lcyI6WyJCYXNlRWRpdCIsImRhdGEiLCJzY3JlZW4iLCJsaXN0IiwiaW5kZXgiLCJmb3JtIiwiaW1nc3JjIiwidXNlcm5hbWUiLCJzZXgiLCJwb3N0aWRzIiwiam9ibmFtZSIsInNpdGVjaXR5IiwidG9rZW4iLCJ0b2tlbktleSIsInBlcmZlY3QiLCJiYXNlNjQiLCJtZXRob2RzIiwic2tpcCIsInd4Iiwic3dpdGNoVGFiIiwidXJsIiwiY2hhbmdlUG9ydHJhaXQiLCJ0aGF0IiwiY2hvb3NlUG9ydHJhaXQiLCJpbnB1dENoYW5nZSIsImUiLCJuYW1lIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInBpY2tlckNoYW5nZSIsImN1cnJlbnQiLCJmb3JtU3VibWl0IiwiZXJyb3IiLCJlZGl0UGVyc29uYWxJbmZvIiwib3B0aW9ucyIsImxvZ2luIiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRQaW1nIiwiYXJyIiwiaSIsImxlbmd0aCIsImdldERpY3QiLCJldmVudCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVzIiwic2l6ZSIsImdldEZpbGVTeXN0ZW1NYW5hZ2VyIiwicmVhZEZpbGVTeW5jIiwidGVtcEZpbGVQYXRocyIsImZhaWwiLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm9iaiIsIk9iamVjdCIsImFzc2lnbiIsImltZ3R5cGUiLCJjaGFuZ2VIZWFkSW1nIiwicXVlcnkiLCJoZWFkIiwidHlwZSIsInRyYW5zY29kZSIsInRoZW4iLCJyZXR1cm5Db2RlIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJzdGF0dXNDb2RlIiwicmV0dXJuTXNnIiwiaGlkZUxvYWRpbmciLCJjYXRjaCIsImVyciIsImhlYWRpbWciLCJjb2RlIiwiZ2V0RGljdERhdGEiLCJmb3JFYWNoIiwi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cUNBVEQsTUFTSztBQUNELHNEQUFJSSxLQUFKLENBQVVnQixJQUFJbEQsSUFBSixDQUFTMkUsU0FBbkI7QUFDSDtBQUNGLGlDQXhCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0Qko7QUFDQTs7OztnQ0FDUUssSSxFQUFLdkMsQyxFQUFHO0FBQ2QsZ0JBQU1wQixPQUFPLElBQWI7QUFDQSwwQkFBSTRELFdBQUosQ0FBZ0I7QUFDZGYsdUJBQU87QUFDSEMsMEJBQU07QUFDRixxQ0FBYSxPQURYO0FBRUYsZ0NBQVE7QUFGTixxQkFESDtBQUtIbkUsMEJBQU07QUFDRixxQ0FBYWdGLElBRFg7QUFFRixrQ0FBVTtBQUZSO0FBTEg7QUFETyxhQUFoQixFQVdHVixJQVhILENBV1EsZUFBSztBQUNYLG9CQUFJcEIsSUFBSWxELElBQUosQ0FBU3VFLFVBQVQsSUFBdUIsU0FBM0IsRUFBc0M7QUFDbEMsd0JBQUkvQixNQUFNLEVBQVY7QUFDQVUsd0JBQUlsRCxJQUFKLENBQVNBLElBQVQsQ0FBY2tGLE9BQWQsQ0FBc0IsVUFBQ0MsSUFBRCxFQUFNaEYsS0FBTixFQUFjO0FBQ2hDcUMsNEJBQUk0QyxJQUFKLENBQVNELEtBQUtFLEtBQWQ7QUFDSCxxQkFGRDtBQUdBaEUseUJBQUtwQixNQUFMLENBQVl3QyxDQUFaLEVBQWV2QyxJQUFmLEdBQXNCc0MsR0FBdEI7QUFDQW5CLHlCQUFLUyxNQUFMO0FBQ0gsaUJBUEQsTUFPTztBQUNILGtDQUFJSSxLQUFKLENBQVVnQixJQUFJeUIsU0FBZDtBQUNIO0FBRUYsYUF2QkQsRUF1QkdFLEtBdkJILENBdUJTLGVBQUssQ0FFYixDQXpCRDtBQTBCRDs7OztFQTVPaUMsZUFBS1MsSTs7a0JBQXRCdkYsUSIsImZpbGUiOiJiYXNlX2VkaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbmltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuaW1wb3J0IHtMT0dJTl9JTkZPfSBmcm9tICcuLi8uLi91dGlscy9jb25zdGFudHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUVkaXQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG5cclxuICAgZGF0YSA9IHtcclxuICAgICAgc2NyZWVuOltcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaXN0OltdLFxyXG4gICAgICAgICAgaW5kZXg6W10sXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICBmb3JtOntcclxuICAgICAgICBpbWdzcmM6JycsXHJcbiAgICAgICAgdXNlcm5hbWU6JycsXHJcbiAgICAgICAgc2V4OicnLFxyXG4gICAgICAgIHBvc3RpZHM6JycsXHJcbiAgICAgICAgam9ibmFtZTonJyxcclxuICAgICAgICBzaXRlY2l0eTonJyxcclxuICAgICAgfSxcclxuICAgICAgdG9rZW46JycsXHJcbiAgICAgIHRva2VuS2V5OicnLFxyXG4gICAgICBwZXJmZWN0OmZhbHNlLFxyXG4gICAgICBiYXNlNjQ6ZmFsc2VcclxuICAgfVxyXG5cclxuICAgb25Mb2FkKG9wdGlvbnMpe1xyXG4gICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgIGxldCBsb2dpbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dpbicpXHJcbiAgICAgIHRoYXQudG9rZW4gPSBsb2dpbi50b2tlblxyXG4gICAgICB0aGF0LnRva2VuS2V5ID0gbG9naW4udG9rZW5LZXlcclxuICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICBpZihvcHRpb25zLnBlcmZlY3Qpe1xyXG4gICAgICAgIHRoYXQucGVyZmVjdCA9IHRydWVcclxuICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgIHRoaXMuZ2V0UGltZygpO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgIGxldCBhcnIgPSBbXCJESUNUX0JBU0VfU0VYXCIsIFwiRElDVF9DT01QX0lORFVTVFJZXCJdXHJcbiAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICB0aGF0LmdldERpY3QoYXJyW2ldLGkpXHJcbiAgICAgICB9XHJcbiAgIH1cclxuXHJcbiAgIG1ldGhvZHMgPSB7XHJcbiAgICAgc2tpcCgpe1xyXG4gICAgICAgd3guc3dpdGNoVGFiKHtcclxuICAgICAgICB1cmw6ICcvcGFnZXMvcGVyc29uYWwvcGVyc29uYWwnLFxyXG4gICAgICB9KVxyXG4gICAgIH0sXHJcbiAgICAgY2hhbmdlUG9ydHJhaXQoKXtcclxuICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgIHRoYXQuY2hvb3NlUG9ydHJhaXQoKTtcclxuICAgICB9LFxyXG4gICAgIGlucHV0Q2hhbmdlKGUpe1xyXG4gICAgICAgY29uc3QgeyBmb3JtIH09dGhpc1xyXG4gICAgICAgY29uc3QgbmFtZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgIGZvcm1bbmFtZV0gPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgfSxcclxuICAgICBwaWNrZXJDaGFuZ2UoZSl7XHJcbiAgICAgICBjb25zdCB7IGZvcm0gfT10aGlzXHJcbiAgICAgICBjb25zdCBuYW1lID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZVxyXG4gICAgICAgY29uc3QgY3VycmVudCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmN1cnJlbnRcclxuICAgICAgIGNvbnN0IGluZGV4ID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgIGZvcm1bbmFtZV0gPSB0aGlzLnNjcmVlbltjdXJyZW50XS5saXN0W2luZGV4XVxyXG4gICAgICAgdGhpcy5zY3JlZW5bY3VycmVudF0uaW5kZXggPSBlLmRldGFpbC52YWx1ZTtcclxuICAgICAgIHRoaXMuJGFwcGx5KCk7XHJcbiAgICAgfSxcclxuICAgICBmb3JtU3VibWl0KGUpe1xyXG4gICAgICBjb25zdCB7Zm9ybX0gPSB0aGlzXHJcbiAgICAgIGlmKCFmb3JtLmltZ3NyYyl7XHJcbiAgICAgICAgdGlwLmVycm9yKCflpLTlg4/kuI3kuLrnqbonKTtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighZm9ybS51c2VybmFtZSl7XHJcbiAgICAgICAgdGlwLmVycm9yKCflp5PlkI3kuI3kuLrnqbonKTtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICBpZighZm9ybS5zZXgpe1xyXG4gICAgICAgIHRpcC5lcnJvcign6K+36YCJ5oup5oCn5YirJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIWZvcm0uc2l0ZWNpdHkpe1xyXG4gICAgICAgIHRpcC5lcnJvcign5pyf5pyb5Z+O5biC5LiN5Li656m6Jyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIWZvcm0ucG9zdGlkcyl7XHJcbiAgICAgICAgdGlwLmVycm9yKCfor7fpgInmi6nmnJ/mnJvooYzkuJonKTtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmVkaXRQZXJzb25hbEluZm8oKVxyXG4gICAgfVxyXG4gICB9XHJcblxyXG4gICAgY2hvb3NlUG9ydHJhaXQoZXZlbnQpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgIHd4LmNob29zZUltYWdlKHtcclxuICAgICAgICAgIGNvdW50OiAxLFxyXG4gICAgICAgICAgc2l6ZVR5cGU6IFsnY29tcHJlc3NlZCddLCAgICAgLy8g5Y+v5Lul5oyH5a6a5piv5Y6f5Zu+6L+Y5piv5Y6L57yp5Zu+77yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLCAgICAgICAgLy8g5Y+v5Lul5oyH5a6a5p2l5rqQ5piv55u45YaM6L+Y5piv55u45py677yM6buY6K6k5LqM6ICF6YO95pyJXHJcbiAgICAgICAgICBzdWNjZXNzKHJlcykge1xyXG4gICAgICAgICAgICBpZihyZXMudGVtcEZpbGVzWzBdLnNpemU+MTAwMDAwMCl7XHJcbiAgICAgICAgICAgICAgICB0aXAuZXJyb3IoXCLlm77niYflpKflsI/otoXlh7rpmZDliLZcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gbGV0IGJhc2U2NCA9IHJlcy50ZW1wRmlsZVBhdGhzWzBdXHJcbiAgICAgICAgICAgIGxldCBiYXNlNjQgPSB3eC5nZXRGaWxlU3lzdGVtTWFuYWdlcigpLnJlYWRGaWxlU3luYyhyZXMudGVtcEZpbGVQYXRoc1swXSwgJ2Jhc2U2NCcpXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJhc2U2NClcclxuICAgICAgICAgICAgdGhhdC5mb3JtLmltZ3NyYyA9YmFzZTY0O1xyXG4gICAgICAgICAgICB0aGF0LmJhc2U2NCA9dHJ1ZVxyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpICAgICAvLyDov5Tlm57pgInlrprnhafniYfnmoTmnKzlnLDmlofku7bot6/lvoTliJfooahcclxuICAgICAgICAgICAgLy8gdGhhdC51cGxvYWRJbWdGaWxlKHRoYXQsIGJhc2U2NClcclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZmFpbCgpe1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGDojrflj5blm77niYflpLHotKVgKVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgIC8v5L+u5pS55Liq5Lq65L+h5oGvXHJcbiAgZWRpdFBlcnNvbmFsSW5mbygpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxldCBvYmogPU9iamVjdC5hc3NpZ24odGhhdC5mb3JtLHtcclxuICAgICAgICAgIHRva2VuS2V5OiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgdG9rZW46IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICBpbWd0eXBlOiBcInBuZ1wiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYoIXRoYXQuYmFzZTY0KSBkZWxldGUgb2JqLmltZ3NyY1xyXG4gICAgICAgIGFwaS5jaGFuZ2VIZWFkSW1nKHtcclxuICAgICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgIGhlYWQ6e1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zY29kZTogXCJQMDAzOFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTpvYmpcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzPT57XHJcbiAgICAgICAgICBpZihyZXMuZGF0YS5yZXR1cm5Db2RlID09ICdBQUFBQUFBJykge1xyXG4gICAgICAgICAgICAgIHRpcC5zdWNjZXNzKFwi5pON5L2c5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgIGlmKCF0aGF0LnBlcmZlY3Qpe1xyXG4gICAgICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcclxuICAgICAgICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9wYWdlcy9wZXJzb25hbC9wZXJzb25hbCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgfWVsc2UgaWYocmVzLnN0YXR1c0NvZGUgPT0gNDEzKXtcclxuICAgICAgICAgICAgICAgdGlwLmVycm9yKFwi5Zu+54mH5paH5Lu26L+H5aSnXCIpO1xyXG4gICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICB0aXAuZXJyb3IocmVzLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgIH0pLmNhdGNoKGVycj0+e1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoZXJyLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5Liq5Lq65L+h5oGvXHJcbiAgICBhc3luYyBnZXRQaW1nKCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGFwaS5nZXRQaW1nKHtcclxuICAgICAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNjb2RlXCI6IFwiUDAwNDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9rZW5LZXlcIjogdGhhdC50b2tlbktleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0aGF0LnRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgICAgaWYocmVzLmRhdGEucmV0dXJuQ29kZSA9PSAnQUFBQUFBQScpe1xyXG4gICAgICAgICAgICB0aGF0LmZvcm0uaW1nc3JjID0gcmVzLmRhdGEuZGF0YS5oZWFkaW1nXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybS51c2VybmFtZSA9IHJlcy5kYXRhLmRhdGEudXNlcm5hbWVcclxuICAgICAgICAgICAgdGhhdC5mb3JtLnNleCA9IHJlcy5kYXRhLmRhdGEuc2V4XHJcbiAgICAgICAgICAgIHRoYXQuZm9ybS5zaXRlY2l0eSA9IHJlcy5kYXRhLmRhdGEuc2l0ZWNpdHlcclxuICAgICAgICAgICAgdGhhdC5mb3JtLnBvc3RpZHMgPSByZXMuZGF0YS5kYXRhLnBvc3RpZHNcclxuICAgICAgICAgICAgdGhhdC5mb3JtLmpvYm5hbWUgPSByZXMuZGF0YS5kYXRhLmpvYm5hbWVcclxuXHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgIHRpcC5lcnJvcihyZXMuZGF0YS5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5pWw5o2u5a2X5YW4XHJcbiAgICAvL+iOt+WPluaVsOaNruWtl+WFuFxyXG4gICAgZ2V0RGljdChjb2RlLGkpIHtcclxuICAgICAgY29uc3QgdGhhdCA9IHRoaXNcclxuICAgICAgYXBpLmdldERpY3REYXRhKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIkRDMDAxXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJncm91cGNvZGVcIjogY29kZSxcclxuICAgICAgICAgICAgICAgIFwic2VsQWxsXCI6IFwiZmFsc2VcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKHJlcz0+e1xyXG4gICAgICAgIGlmIChyZXMuZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBbXVxyXG4gICAgICAgICAgICByZXMuZGF0YS5kYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtLmxhYmVsKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGF0LnNjcmVlbltpXS5saXN0ID0gYXJyO1xyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpcC5lcnJvcihyZXMucmV0dXJuTXNnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9KS5jYXRjaChlcnI9PntcclxuXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iXX0=