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
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var that, obj;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                that = this;

                                wx.showLoading({
                                    title: '加载中'
                                });
                                obj = Object.assign(that.form, {
                                    tokenKey: that.tokenKey,
                                    token: that.token,
                                    imgtype: "png"
                                });


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
                                        wx.navigateBack({
                                            delta: 1
                                        });
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

                            case 4:
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
                var that;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2VfZWRpdC5qcyJdLCJuYW1lcyI6WyJCYXNlRWRpdCIsImRhdGEiLCJzY3JlZW4iLCJsaXN0IiwiaW5kZXgiLCJmb3JtIiwiaW1nc3JjIiwidXNlcm5hbWUiLCJzZXgiLCJwb3N0aWRzIiwiam9ibmFtZSIsInNpdGVjaXR5IiwidG9rZW4iLCJ0b2tlbktleSIsInBlcmZlY3QiLCJiYXNlNjQiLCJtZXRob2RzIiwic2tpcCIsInd4Iiwic3dpdGNoVGFiIiwidXJsIiwiY2hhbmdlUG9ydHJhaXQiLCJ0aGF0IiwiY2hvb3NlUG9ydHJhaXQiLCJpbnB1dENoYW5nZSIsImUiLCJuYW1lIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsInBpY2tlckNoYW5nZSIsImN1cnJlbnQiLCJmb3JtU3VibWl0IiwiZXJyb3IiLCJlZGl0UGVyc29uYWxJbmZvIiwib3B0aW9ucyIsImxvZ2luIiwiZ2V0U3RvcmFnZVN5bmMiLCJnZXRQaW1nIiwiYXJyIiwiaSIsImxlbmd0aCIsImdldERpY3QiLCJldmVudCIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInNvdXJjZVR5cGUiLCJzdWNjZXNzIiwicmVzIiwidGVtcEZpbGVzIiwic2l6ZSIsImdldEZpbGVTeXN0ZW1NYW5hZ2VyIiwicmVhZEZpbGVTeW5jIiwidGVtcEZpbGVQYXRocyIsImZhaWwiLCJjb25zb2xlIiwibG9nIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm9iaiIsIk9iamVjdCIsImFzc2lnbiIsImltZ3R5cGUiLCJjaGFuZ2VIZWFkSW1nIiwicXVlcnkiLCJoZWFkIiwidHlwZSIsInRyYW5zY29kZSIsInRoZW4iLCJyZXR1cm5Db2RlIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJzdGF0dXNDb2RlIiwicmV0dXJuTXNnIiwiaGlkZUxvYWRpbmciLCJjYXRjaCIsImVyciIsImhlYWRpbWciLCJjb2RlIiwiZ2V0RGljdERhdGEiLCJmb3JFYWNoIiwi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O0FBQ0EsMEJBQUk0RCxXQUFKLENBQWdCO0FBQ2RmLHVCQUFPO0FBQ0hDLDBCQUFNO0FBQ0YscUNBQWEsT0FEWDtBQUVGLGdDQUFRO0FBRk4scUJBREg7QUFLSG5FLDBCQUFNO0FBQ0YscUNBQWFnRixJQURYO0FBRUYsa0NBQVU7QUFGUjtBQUxIO0FBRE8sYUFBaEIsRUFXR1YsSUFYSCxDQVdRLGVBQUs7QUFDWCxvQkFBSXBCLElBQUlsRCxJQUFKLENBQVN1RSxVQUFULElBQXVCLFNBQTNCLEVBQXNDO0FBQ2xDLHdCQUFJL0IsTUFBTSxFQUFWO0FBQ0FVLHdCQUFJbEQsSUFBSixDQUFTQSxJQUFULENBQWNrRixPQUFkLENBQXNCLFVBQUNDLElBQUQsRUFBTWhGLEtBQU4sRUFBYztBQUNoQ3FDLDRCQUFJNEMsSUFBSixDQUFTRCxLQUFLRSxLQUFkO0FBQ0gscUJBRkQ7QUFHQWhFLHlCQUFLcEIsTUFBTCxDQUFZd0MsQ0FBWixFQUFldkMsSUFBZixHQUFzQnNDLEdBQXRCO0FBQ0FuQix5QkFBS1MsTUFBTDtBQUNILGlCQVBELE1BT087QUFDSCxrQ0FBSUksS0FBSixDQUFVZ0IsSUFBSXlCLFNBQWQ7QUFDSDtBQUVGLGFBdkJELEVBdUJHRSxLQXZCSCxDQXVCUyxlQUFLLENBRWIsQ0F6QkQ7QUEwQkQ7Ozs7RUFwT2lDLGVBQUtTLEk7O2tCQUF0QnZGLFEiLCJmaWxlIjoiYmFzZV9lZGl0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS9hcGknO1xyXG5pbXBvcnQgdGlwIGZyb20gJy4uLy4uL3V0aWxzL3RpcCc7XHJcbmltcG9ydCB7TE9HSU5fSU5GT30gZnJvbSAnLi4vLi4vdXRpbHMvY29uc3RhbnRzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VFZGl0IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuXHJcbiAgIGRhdGEgPSB7XHJcbiAgICAgIHNjcmVlbjpbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbGlzdDpbXSxcclxuICAgICAgICAgIGluZGV4OltdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbGlzdDpbXSxcclxuICAgICAgICAgIGluZGV4OltdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbGlzdDpbXSxcclxuICAgICAgICAgIGluZGV4OltdLFxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgZm9ybTp7XHJcbiAgICAgICAgaW1nc3JjOicnLFxyXG4gICAgICAgIHVzZXJuYW1lOicnLFxyXG4gICAgICAgIHNleDonJyxcclxuICAgICAgICBwb3N0aWRzOicnLFxyXG4gICAgICAgIGpvYm5hbWU6JycsXHJcbiAgICAgICAgc2l0ZWNpdHk6JycsXHJcbiAgICAgIH0sXHJcbiAgICAgIHRva2VuOicnLFxyXG4gICAgICB0b2tlbktleTonJyxcclxuICAgICAgcGVyZmVjdDpmYWxzZSxcclxuICAgICAgYmFzZTY0OmZhbHNlXHJcbiAgIH1cclxuXHJcbiAgIG9uTG9hZChvcHRpb25zKXtcclxuICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICBsZXQgbG9naW4gPSB3eC5nZXRTdG9yYWdlU3luYygnbG9naW4nKVxyXG4gICAgICB0aGF0LnRva2VuID0gbG9naW4udG9rZW5cclxuICAgICAgdGhhdC50b2tlbktleSA9IGxvZ2luLnRva2VuS2V5XHJcbiAgICAgIHRoYXQuJGFwcGx5KClcclxuICAgICAgaWYob3B0aW9ucy5wZXJmZWN0KXtcclxuICAgICAgICB0aGF0LnBlcmZlY3QgPSB0cnVlXHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKVxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICB0aGlzLmdldFBpbWcoKTtcclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgICBsZXQgYXJyID0gW1wiRElDVF9CQVNFX1NFWFwiLCBcIkRJQ1RfQ09NUF9JTkRVU1RSWVwiXVxyXG4gICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgdGhhdC5nZXREaWN0KGFycltpXSxpKVxyXG4gICAgICAgfVxyXG4gICB9XHJcblxyXG4gICBtZXRob2RzID0ge1xyXG4gICAgIHNraXAoKXtcclxuICAgICAgIHd4LnN3aXRjaFRhYih7XHJcbiAgICAgICAgdXJsOiAnL3BhZ2VzL3BlcnNvbmFsL3BlcnNvbmFsJyxcclxuICAgICAgfSlcclxuICAgICB9LFxyXG4gICAgIGNoYW5nZVBvcnRyYWl0KCl7XHJcbiAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICB0aGF0LmNob29zZVBvcnRyYWl0KCk7XHJcbiAgICAgfSxcclxuICAgICBpbnB1dENoYW5nZShlKXtcclxuICAgICAgIGNvbnN0IHsgZm9ybSB9PXRoaXNcclxuICAgICAgIGNvbnN0IG5hbWUgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lXHJcbiAgICAgICBmb3JtW25hbWVdID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgIH0sXHJcbiAgICAgcGlja2VyQ2hhbmdlKGUpe1xyXG4gICAgICAgY29uc3QgeyBmb3JtIH09dGhpc1xyXG4gICAgICAgY29uc3QgbmFtZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWVcclxuICAgICAgIGNvbnN0IGN1cnJlbnQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jdXJyZW50XHJcbiAgICAgICBjb25zdCBpbmRleCA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICBmb3JtW25hbWVdID0gdGhpcy5zY3JlZW5bY3VycmVudF0ubGlzdFtpbmRleF1cclxuICAgICAgIHRoaXMuc2NyZWVuW2N1cnJlbnRdLmluZGV4ID0gZS5kZXRhaWwudmFsdWU7XHJcbiAgICAgICB0aGlzLiRhcHBseSgpO1xyXG4gICAgIH0sXHJcbiAgICAgZm9ybVN1Ym1pdChlKXtcclxuICAgICAgY29uc3Qge2Zvcm19ID0gdGhpc1xyXG4gICAgICBpZighZm9ybS5pbWdzcmMpe1xyXG4gICAgICAgIHRpcC5lcnJvcign5aS05YOP5LiN5Li656m6Jyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIWZvcm0udXNlcm5hbWUpe1xyXG4gICAgICAgIHRpcC5lcnJvcign5aeT5ZCN5LiN5Li656m6Jyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgaWYoIWZvcm0uc2V4KXtcclxuICAgICAgICB0aXAuZXJyb3IoJ+ivt+mAieaLqeaAp+WIqycpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKCFmb3JtLnNpdGVjaXR5KXtcclxuICAgICAgICB0aXAuZXJyb3IoJ+acn+acm+WfjuW4guS4jeS4uuepuicpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICB9XHJcbiAgICAgIGlmKCFmb3JtLnBvc3RpZHMpe1xyXG4gICAgICAgIHRpcC5lcnJvcign6K+36YCJ5oup5pyf5pyb6KGM5LiaJyk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lZGl0UGVyc29uYWxJbmZvKClcclxuICAgIH1cclxuICAgfVxyXG5cclxuICAgIGNob29zZVBvcnRyYWl0KGV2ZW50KSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgICAgICBjb3VudDogMSxcclxuICAgICAgICAgIHNpemVUeXBlOiBbJ2NvbXByZXNzZWQnXSwgICAgIC8vIOWPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgICAgc291cmNlVHlwZTogWydhbGJ1bScsICdjYW1lcmEnXSwgICAgICAgIC8vIOWPr+S7peaMh+Wumuadpea6kOaYr+ebuOWGjOi/mOaYr+ebuOacuu+8jOm7mOiupOS6jOiAhemDveaciVxyXG4gICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgaWYocmVzLnRlbXBGaWxlc1swXS5zaXplPjEwMDAwMDApe1xyXG4gICAgICAgICAgICAgICAgdGlwLmVycm9yKFwi5Zu+54mH5aSn5bCP6LaF5Ye66ZmQ5Yi2XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGxldCBiYXNlNjQgPSByZXMudGVtcEZpbGVQYXRoc1swXVxyXG4gICAgICAgICAgICBsZXQgYmFzZTY0ID0gd3guZ2V0RmlsZVN5c3RlbU1hbmFnZXIoKS5yZWFkRmlsZVN5bmMocmVzLnRlbXBGaWxlUGF0aHNbMF0sICdiYXNlNjQnKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiYXNlNjQpXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybS5pbWdzcmMgPWJhc2U2NDtcclxuICAgICAgICAgICAgdGhhdC5iYXNlNjQgPXRydWVcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKSAgICAgLy8g6L+U5Zue6YCJ5a6a54Wn54mH55qE5pys5Zyw5paH5Lu26Lev5b6E5YiX6KGoXHJcbiAgICAgICAgICAgIC8vIHRoYXQudXBsb2FkSW1nRmlsZSh0aGF0LCBiYXNlNjQpXHJcblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWwoKXtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhg6I635Y+W5Zu+54mH5aSx6LSlYClcclxuICAgICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAvL+S/ruaUueS4quS6uuS/oeaBr1xyXG4gICAgYXN5bmMgZWRpdFBlcnNvbmFsSW5mbygpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxldCBvYmogPU9iamVjdC5hc3NpZ24odGhhdC5mb3JtLHtcclxuICAgICAgICAgIHRva2VuS2V5OiB0aGF0LnRva2VuS2V5LFxyXG4gICAgICAgICAgdG9rZW46IHRoYXQudG9rZW4sXHJcbiAgICAgICAgICBpbWd0eXBlOiBcInBuZ1wiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgYXBpLmNoYW5nZUhlYWRJbWcoe1xyXG4gICAgICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICAgICAgaGVhZDp7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNjb2RlOiBcIlAwMDM4XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhOm9ialxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICAgIGlmKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gJ0FBQUFBQUEnKSB7XHJcbiAgICAgICAgICAgICAgIHRpcC5zdWNjZXNzKFwi5pON5L2c5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xyXG4gICAgICAgICAgICAgICAgZGVsdGE6IDFcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgIH1lbHNlIGlmKHJlcy5zdGF0dXNDb2RlID09IDQxMyl7XHJcbiAgICAgICAgICAgICAgIHRpcC5lcnJvcihcIuWbvueJh+aWh+S7tui/h+Wkp1wiKTtcclxuICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgdGlwLmVycm9yKHJlcy5kYXRhLnJldHVybk1zZyk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcclxuICAgICAgICB9KS5jYXRjaChlcnI9PntcclxuICAgICAgICAgICAgdGlwLmVycm9yKGVyci5kYXRhLnJldHVybk1zZyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyByZXR1cm4ganNvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluS4quS6uuS/oeaBr1xyXG4gICAgYXN5bmMgZ2V0UGltZygpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBhcGkuZ2V0UGltZyh7XHJcbiAgICAgICAgICAgIHF1ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIlAwMDQwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcImhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRva2VuS2V5XCI6IHRoYXQudG9rZW5LZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdGhhdC50b2tlbixcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICAgIGlmKHJlcy5kYXRhLnJldHVybkNvZGUgPT0gJ0FBQUFBQUEnKXtcclxuICAgICAgICAgICAgdGhhdC5mb3JtLmltZ3NyYyA9IHJlcy5kYXRhLmRhdGEuaGVhZGltZ1xyXG4gICAgICAgICAgICB0aGF0LmZvcm0udXNlcm5hbWUgPSByZXMuZGF0YS5kYXRhLnVzZXJuYW1lXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybS5zZXggPSByZXMuZGF0YS5kYXRhLnNleFxyXG4gICAgICAgICAgICB0aGF0LmZvcm0uc2l0ZWNpdHkgPSByZXMuZGF0YS5kYXRhLnNpdGVjaXR5XHJcbiAgICAgICAgICAgIHRoYXQuZm9ybS5wb3N0aWRzID0gcmVzLmRhdGEuZGF0YS5wb3N0aWRzXHJcbiAgICAgICAgICAgIHRoYXQuZm9ybS5qb2JuYW1lID0gcmVzLmRhdGEuZGF0YS5qb2JuYW1lXHJcblxyXG4gICAgICAgICAgICB0aGF0LiRhcHBseSgpXHJcbiAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICB0aXAuZXJyb3IocmVzLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluaVsOaNruWtl+WFuFxyXG4gICAgLy/ojrflj5bmlbDmja7lrZflhbhcclxuICAgIGdldERpY3QoY29kZSxpKSB7XHJcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgIGFwaS5nZXREaWN0RGF0YSh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJEQzAwMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIFwiZ3JvdXBjb2RlXCI6IGNvZGUsXHJcbiAgICAgICAgICAgICAgICBcInNlbEFsbFwiOiBcImZhbHNlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihyZXM9PntcclxuICAgICAgICBpZiAocmVzLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICB2YXIgYXJyID0gW11cclxuICAgICAgICAgICAgcmVzLmRhdGEuZGF0YS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhhdC5zY3JlZW5baV0ubGlzdCA9IGFycjtcclxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IocmVzLnJldHVybk1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSkuY2F0Y2goZXJyPT57XHJcblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19