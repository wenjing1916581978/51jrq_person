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

var _tip = require('./../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _des = require('./../utils/des.js');

var _constants = require('./../utils/constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShareMiniPro = function (_wepy$component) {
    _inherits(ShareMiniPro, _wepy$component);

    function ShareMiniPro() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ShareMiniPro);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShareMiniPro.__proto__ || Object.getPrototypeOf(ShareMiniPro)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
            actionSheetHidden: true,
            isShowMyCanvasScreen: false,
            isShowPubCanvasScreen: false,
            canvasRpx: 0,
            ctxWidth: 0,
            ctxHeight: 0,
            opHint0: '长按或微信扫描小程序码',
            opHint1: '您可了解这个职位，并投递您的简历',
            opHint2: '长按或微信扫描小程序码',
            opHint3: '了解公司信息和在招职位',
            ctxPubWidth: 0,
            ctxPubHeight: 0,
            qrcodePath: '',
            mlogoPath: '',
            isIpx: false
        }, _this.props = {
            urlWithArgs: {
                type: String,
                default: ''
            },
            currentUrl: {
                type: String,
                default: ''
            },
            jobInfo: {
                type: Object,
                default: null
            },
            corpInfo: {
                type: Object,
                default: null
            },
            dataOrg: String
        }, _this.methods = {
            openActionSheet: function openActionSheet() {
                this.actionSheetHidden = false;
            },
            actionSheetbindchange: function actionSheetbindchange() {
                //调取 “取消”按钮
                this.actionSheetHidden = true;
            },
            bindMenu0: function bindMenu0() {
                //转发给好友或群聊
                this.actionSheetHidden = true;
            },
            bindMenu1: function bindMenu1() {
                //生成朋友圈分享图
                var that = this;
                that.actionSheetHidden = true;
                that.isShowMyCanvasScreen = true;
                that.isShowPubCanvasScreen = false;
                wx.showLoading({
                    title: '正在生成图片',
                    mask: true
                });
                that.loadResources().then(function (resources) {
                    that.generateShareImage(resources);
                    wx.hideLoading();
                }).catch(function (err) {
                    console.log(err);
                    // tip.error('图片获取失败');
                    that.isShowMyCanvasScreen = false;
                    that.$apply();
                    wx.hideLoading();
                });
            },
            bindMenu2: function bindMenu2() {
                //生成公众号文章分享图
                var that = this;
                that.actionSheetHidden = true;
                that.isShowMyCanvasScreen = false;
                that.isShowPubCanvasScreen = true;
                wx.showLoading({
                    title: '正在生成图片',
                    mask: true
                });
                that.loadResources().then(function (resources) {
                    that.generatePublicAccountImage(resources);
                    wx.hideLoading();
                }).catch(function (err) {
                    console.log(err);
                    // tip.error('图片获取失败');
                    that.isShowPubCanvasScreen = false;
                    that.$apply();
                    wx.hideLoading();
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ShareMiniPro, [{
        key: 'onLoad',
        value: function onLoad(option) {
            //获取屏幕宽度
            var screenWidth = this.$parent.$parent.globalData.systemInfo;
            this.canvasRpx = screenWidth.windowWidth / 750 * 2;
            this.isIpx = this.$parent.$parent.globalData.isIpx;
            this.$apply();
        }
    }, {
        key: 'previewMyCanvasImage',
        value: function previewMyCanvasImage(path) {
            var that = this;
            wx.previewImage({
                //current: that.myCanvasTempFilePath, // 当前显示图片的http链接
                urls: [path], // 需要预览的图片http链接列表
                success: function success(res) {
                    console.log(res);
                },
                fail: function fail(res) {
                    console.log(res);
                }
            });
        }
    }, {
        key: 'loadResources',
        value: function loadResources() {
            //将在线路径转为本地临时路径
            var mlogo = this.corpInfo.mlogo;

            if (mlogo == "") {
                mlogo = 'https://www.51jrq.com/topics/images/51jrq_logo_gray.png';
            } else {
                mlogo = mlogo.replace(/http/, 'https');
            }
            // 绑定数据记得去掉，这里做调试
            // let mlogo = `https://www.51jrq.com/topics/images/51jrq_logo_gray.png`;
            var _data = this.data,
                qrcodePath = _data.qrcodePath,
                mlogoPath = _data.mlogoPath;

            var len = (this.currentUrl + '?').length;
            var args = this.urlWithArgs.slice(len).split('&'); //corpid=990003&jobid=1040013 || companyid=1010527
            var objs = new Object();
            for (var i = 0; i < args.length; i++) {
                objs[args[i].split('=')[0]] = args[i].split('=')[1];
            }
            var sceneArgs = '';
            switch (this.dataOrg) {
                case "homeview":
                    sceneArgs = 'hv*cid=' + objs["corpid"] + '&jid=' + objs["jobid"];
                    break;
                case "corpview":
                    sceneArgs = 'cv*cpid=' + objs["companyid"];
                    break;
            }
            var params = JSON.stringify({ head: { transcode: "P00016", type: "h" }, data: { page: 'pages/index/index', width: 180, scene: '' + sceneArgs } });
            var wxacodeurl = _api2.default.apimall + '/wx/createwxaqrcode?params=' + (0, _des.strEnc)('' + params, _constants.DESKEY);
            console.log('小程序码', wxacodeurl);
            var getWxaCode = function getWxaCode(src) {
                return new Promise(function (resolve, reject) {
                    wx.getImageInfo({
                        src: src,
                        success: function success(_ref2) {
                            var width = _ref2.width,
                                height = _ref2.height,
                                path = _ref2.path;

                            resolve(path);
                        },
                        fail: function fail() {
                            reject('\u83B7\u53D6\u56FE\u7247\u5931\u8D25: ' + src);
                        }
                    });
                });
            };

            var promises = [getWxaCode(wxacodeurl), getWxaCode(mlogo)];
            return Promise.all(promises).then(function (values) {
                return {
                    qrcodePath: values[0],
                    mlogoPath: values[1]
                };
            });
        }
    }, {
        key: 'generateShareImage',
        value: function generateShareImage(resources) {
            //转发给好友或群聊
            var that = this;
            that.ctxWidth = that.canvasRpx * 375;
            that.ctxHeight = that.canvasRpx * 600;
            that.$apply();
            //创建 canvas 绘图上下文
            var ctx = wx.createCanvasContext('myCanvas');

            var _that$corpInfo = that.corpInfo,
                corpname = _that$corpInfo.corpname,
                scope = _that$corpInfo.scope,
                city = _that$corpInfo.city,
                industry = _that$corpInfo.industry;

            var CANVAS_W = that.ctxWidth;
            var CANVAS_H = that.ctxHeight;
            // draw background
            ctx.setFillStyle('#ffffff');
            ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
            // draw left-top-logo
            ctx.drawImage('/images/icons/left-top-logo.png', 0, 0, that.canvasRpx * 106 / 2, that.canvasRpx * 106 / 2);

            if (that.dataOrg == "homeview") {
                //  draw jobduty
                var _that$jobInfo = that.jobInfo,
                    jobname = _that$jobInfo.jobname,
                    jobcity = _that$jobInfo.jobcity,
                    workyears = _that$jobInfo.workyears,
                    ebid = _that$jobInfo.ebid,
                    salary = _that$jobInfo.salary;

                ctx.setTextAlign('center');
                ctx.setFontSize(that.canvasRpx * 20);
                ctx.setFillStyle('#353535');
                ctx.fillText(corpname, CANVAS_W / 2, that.canvasRpx * 60);

                ctx.fillText(jobname, CANVAS_W / 2, that.canvasRpx * (60 + 20 + 10));

                ctx.setFontSize(that.canvasRpx * 14);
                ctx.setFillStyle('#888888');
                ctx.fillText(jobcity + ' | ' + workyears + ' | ' + ebid, CANVAS_W / 2, that.canvasRpx * (60 + 20 + 10 + 20 + 10));

                ctx.setFontSize(that.canvasRpx * 20);
                ctx.setFillStyle('#ff9e00');
                ctx.fillText(salary, CANVAS_W / 2, that.canvasRpx * (60 + 20 + 10 + 20 + 10 + 14 + 10));

                //draw hint
                ctx.drawImage('/images/icons/finger.png', CANVAS_W / 2 - that.canvasRpx * 40 / 2 / 2, that.canvasRpx * 420, that.canvasRpx * 40 / 2, that.canvasRpx * 62 / 2);
                ctx.setTextAlign('center');
                ctx.setFontSize(that.canvasRpx * 14);
                ctx.setFillStyle('#888888');
                ctx.fillText(that.opHint0, CANVAS_W / 2, that.canvasRpx * (420 + 62 / 2 + 20));
                ctx.fillText(that.opHint1, CANVAS_W / 2, that.canvasRpx * (420 + 62 / 2 + 20) + that.canvasRpx * (14 + 5));
            } else if (that.dataOrg == "corpview") {
                //  draw corpinfo
                ctx.setTextAlign('center');
                ctx.setFontSize(that.canvasRpx * 20);
                ctx.setFillStyle('#353535');

                ctx.fillText(corpname, CANVAS_W / 2, that.canvasRpx * (60 + 20 + 10));

                ctx.setFontSize(that.canvasRpx * 14);
                ctx.setFillStyle('#888888');
                ctx.fillText(scope + ' | ' + industry + ' | ' + city, CANVAS_W / 2, that.canvasRpx * (60 + 20 + 10 + 20 + 10));

                //draw hint
                ctx.drawImage('/images/icons/finger.png', CANVAS_W / 2 - that.canvasRpx * 40 / 2 / 2, that.canvasRpx * 420, that.canvasRpx * 40 / 2, that.canvasRpx * 62 / 2);
                ctx.setTextAlign('center');
                ctx.setFontSize(that.canvasRpx * 14);
                ctx.setFillStyle('#888888');
                ctx.fillText(that.opHint2, CANVAS_W / 2, that.canvasRpx * (420 + 62 / 2 + 20));
                ctx.fillText(that.opHint3, CANVAS_W / 2, that.canvasRpx * (420 + 62 / 2 + 20) + that.canvasRpx * (14 + 5));
            }

            //draw footer;
            ctx.drawImage('/images/icons/foot-txt.png', CANVAS_W / 2 - that.canvasRpx * 428 / 2 / 2, that.canvasRpx * 564, that.canvasRpx * 428 / 2, that.canvasRpx * 26 / 2);
            //样式待调整
            // ctx.setFontSize(that.canvasRpx * 10);
            // ctx.setFillStyle('#b2b2b2');
            // ctx.fillText('51金融圈 | 中国领先的金融职业平台', that.canvasRpx * (132), that.canvasRpx * 564);

            //draw wxacode
            var WXACODE_X = that.canvasRpx * 98;
            var WXACODE_Y = that.canvasRpx * 180;
            var WXACODE_SIZE = that.canvasRpx * 180;
            var MLOGO_SIZE = that.canvasRpx * 78;
            var qrcodePath = resources.qrcodePath,
                mlogoPath = resources.mlogoPath;

            ctx.drawImage(qrcodePath, CANVAS_W / 2 - WXACODE_SIZE / 2, WXACODE_Y, WXACODE_SIZE, WXACODE_SIZE);
            ctx.setFillStyle('#ffffff');
            ctx.save();
            ctx.beginPath();
            ctx.arc(CANVAS_W / 2, WXACODE_Y + WXACODE_SIZE / 2, MLOGO_SIZE / 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.clip();
            console.log(mlogoPath);
            ctx.drawImage(mlogoPath, CANVAS_W / 2 - MLOGO_SIZE / 2, WXACODE_Y + (WXACODE_SIZE / 2 - MLOGO_SIZE / 2), MLOGO_SIZE, MLOGO_SIZE);
            ctx.restore();

            ctx.draw(true, function () {
                setTimeout(function () {
                    wx.canvasToTempFilePath({
                        canvasId: 'myCanvas',
                        success: function success(res) {
                            // console.log(res.tempFilePath);
                            that.previewMyCanvasImage(res.tempFilePath);
                            that.isShowMyCanvasScreen = false;
                            that.$apply();
                        },
                        fail: function fail(res) {
                            console.log(res);
                        }
                    }, that);
                }, 300);
            });
        }
    }, {
        key: 'generatePublicAccountImage',
        value: function generatePublicAccountImage(resources) {
            //生成公众号文章分享图
            var that = this;
            that.ctxPubWidth = that.canvasRpx * 375;
            that.ctxPubHeight = that.canvasRpx * 170;
            that.$apply();
            //创建 canvas 绘图上下文
            var ctx = wx.createCanvasContext('pubCanvas');

            var CANVAS_W = that.ctxPubWidth;
            var CANVAS_H = that.ctxPubHeight;
            // draw background
            ctx.setFillStyle('#ffffff');
            ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

            if (that.dataOrg == "homeview") {
                var _that$jobInfo2 = that.jobInfo,
                    jobname = _that$jobInfo2.jobname,
                    jobcity = _that$jobInfo2.jobcity,
                    workyears = _that$jobInfo2.workyears,
                    ebid = _that$jobInfo2.ebid,
                    salary = _that$jobInfo2.salary;
                //  draw jobduty

                ctx.setFontSize(that.canvasRpx * 18);
                ctx.setFillStyle('#353535');
                ctx.fillText(jobname, that.canvasRpx * 16, that.canvasRpx * 28);

                ctx.setFontSize(that.canvasRpx * 12);
                ctx.setFillStyle('#888888');
                ctx.fillText(jobcity + ' | ' + workyears + ' | ' + ebid, that.canvasRpx * 16, that.canvasRpx * (28 + 18 + 6));

                ctx.setFontSize(that.canvasRpx * 20);
                ctx.setFillStyle('#ff9e00');
                ctx.fillText(salary, CANVAS_W - that.canvasRpx * (16 + that.mesureText(salary)), that.canvasRpx * 28);

                //draw hint
                ctx.drawImage('/images/icons/finger.png', that.canvasRpx * 16, that.canvasRpx * 82, that.canvasRpx * 40 / 2, that.canvasRpx * 62 / 2);
                ctx.setFontSize(that.canvasRpx * 12);
                ctx.setFillStyle('#888888');
                ctx.fillText(that.opHint0, that.canvasRpx * (16 + 40 / 2 + 10), that.canvasRpx * 90);
                ctx.fillText(that.opHint1, that.canvasRpx * (16 + 40 / 2 + 10), that.canvasRpx * (90 + 12 + 10));
            } else if (that.dataOrg == "corpview") {
                var _that$corpInfo2 = that.corpInfo,
                    corpname = _that$corpInfo2.corpname,
                    scope = _that$corpInfo2.scope,
                    city = _that$corpInfo2.city,
                    industry = _that$corpInfo2.industry;
                //  draw corpinfo

                ctx.setFontSize(that.canvasRpx * 18);
                ctx.setFillStyle('#353535');
                ctx.fillText(corpname, that.canvasRpx * 16, that.canvasRpx * 28);

                ctx.setFontSize(that.canvasRpx * 12);
                ctx.setFillStyle('#888888');
                ctx.fillText(scope + ' | ' + industry + ' | ' + city, that.canvasRpx * 16, that.canvasRpx * (28 + 18 + 6));

                //draw hint
                ctx.drawImage('/images/icons/finger.png', that.canvasRpx * 16, that.canvasRpx * 82, that.canvasRpx * 40 / 2, that.canvasRpx * 62 / 2);
                ctx.setFontSize(that.canvasRpx * 12);
                ctx.setFillStyle('#888888');
                ctx.fillText(that.opHint2, that.canvasRpx * (16 + 40 / 2 + 10), that.canvasRpx * 90);
                ctx.fillText(that.opHint3, that.canvasRpx * (16 + 40 / 2 + 10), that.canvasRpx * (90 + 12 + 10));
            }

            //draw footer;
            ctx.drawImage('/images/icons/foot-txt.png', that.canvasRpx * 16, CANVAS_H - that.canvasRpx * (14 + 26 / 2), that.canvasRpx * 428 / 2, that.canvasRpx * 26 / 2);
            //样式待调整
            // ctx.setFontSize(that.canvasRpx * 10);
            // ctx.setFillStyle('#b2b2b2');
            // ctx.fillText('51金融圈 | 中国领先的金融职业平台', that.canvasRpx * (132), that.canvasRpx * 564);

            //draw wxacode
            var WXACODE_SIZE = that.canvasRpx * 100;
            var MLOGO_SIZE = that.canvasRpx * 42;
            var qrcodePath = resources.qrcodePath,
                mlogoPath = resources.mlogoPath;

            ctx.drawImage(qrcodePath, CANVAS_W - that.canvasRpx * 16 - WXACODE_SIZE, CANVAS_H - that.canvasRpx * 14 - WXACODE_SIZE, WXACODE_SIZE, WXACODE_SIZE);
            ctx.setStrokeStyle('#ffffff');
            ctx.save();
            ctx.beginPath();
            ctx.arc(CANVAS_W - that.canvasRpx * 16 - WXACODE_SIZE / 2, CANVAS_H - that.canvasRpx * 14 - WXACODE_SIZE / 2, MLOGO_SIZE / 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.clip();
            ctx.drawImage(mlogoPath, CANVAS_W - that.canvasRpx * 16 - WXACODE_SIZE + (WXACODE_SIZE / 2 - MLOGO_SIZE / 2), CANVAS_H - that.canvasRpx * 14 - WXACODE_SIZE + (WXACODE_SIZE / 2 - MLOGO_SIZE / 2), MLOGO_SIZE, MLOGO_SIZE);
            ctx.restore();

            ctx.draw(true, function () {
                setTimeout(function () {
                    wx.canvasToTempFilePath({
                        canvasId: 'pubCanvas',
                        success: function success(res) {
                            console.log(res.tempFilePath);
                            that.previewMyCanvasImage(res.tempFilePath);
                            that.isShowPubCanvasScreen = false;
                            that.$apply();
                        },
                        fail: function fail(res) {
                            console.log(res);
                        }
                    }, that);
                }, 300);
            });
        }

        //小程序中没提供获文本宽度的方法 判断各种字符宽度 返回字符串总宽度

    }, {
        key: 'mesureText',
        value: function mesureText(text) {
            text = text.split('');
            var width = 0;
            text.forEach(function (item) {
                if (/[a-zA-Z]/.test(item)) {
                    width += 14;
                } else if (/[0-9]/.test(item)) {
                    width += 11;
                } else if (/\./.test(item)) {
                    width += 5.4;
                } else if (/-/.test(item)) {
                    width += 6.5;
                } else if (/[\u4e00-\u9fa5]/.test(item)) {
                    width += 20;
                }
            });
            return width;
        }
    }]);

    return ShareMiniPro;
}(_wepy2.default.component);

exports.default = ShareMiniPro;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlbWluaXByby5qcyJdLCJuYW1lcyI6WyJTaGFyZU1pbmlQcm8iLCJkYXRhIiwiYWN0aW9uU2hlZXRIaWRkZW4iLCJpc1Nob3dNeUNhbnZhc1NjcmVlbiIsImlzU2hvd1B1YkNhbnZhc1NjcmVlbiIsImNhbnZhc1JweCIsImN0eFdpZHRoIiwiY3R4SGVpZ2h0Iiwib3BIaW50MCIsIm9wSGludDEiLCJvcEhpbnQyIiwib3BIaW50MyIsImN0eFB1YldpZHRoIiwiY3R4UHViSGVpZ2h0IiwicXJjb2RlUGF0aCIsIm1sb2dvUGF0aCIsImlzSXB4IiwicHJvcHMiLCJ1cmxXaXRoQXJncyIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0IiwiY3VycmVudFVybCIsImpvYkluZm8iLCJPYmplY3QiLCJjb3JwSW5mbyIsImRhdGFPcmciLCJtZXRob2RzIiwib3BlbkFjdGlvblNoZWV0IiwiYWN0aW9uU2hlZXRiaW5kY2hhbmdlIiwiYmluZE1lbnUwIiwiYmluZE1lbnUxIiwidGhhdCIsInd4Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsIm1hc2siLCJsb2FkUmVzb3VyY2VzIiwidGhlbiIsInJlc291cmNlcyIsImdlbmVyYXRlU2hhcmVJbWFnZSIsImhpZGVMb2FkaW5nIiwiY2F0Y2giLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiJGFwcGx5IiwiYmluZE1lbnUyIiwiZ2VuZXJhdGVQdWJsaWNBY2NvdW50SW1hZ2UiLCJvcHRpb24iLCJzY3JlZW5XaWR0aCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwic3lzdGVtSW5mbyIsIndpbmRvd1dpZHRoIiwicGF0aCIsInByZXZpZXdJbWFnZSIsInVybHMiLCJzdWNjZXNzIiwicmVzIiwiZmFpbCIsIm1sb2dvIiwicmVwbGFjZSIsImxlbiIsImxlbmd0aCIsImFyZ3MiLCJzbGljZSIsInNwbGl0Iiwib2JqcyIsImkiLCJzY2VuZUFyZ3MiLCJwYXJhbXMiLCJKU09OIiwic3RyaW5naWZ5IiwiaGVhZCIsInRyYW5zY29kZSIsInBhZ2UiLCJ3aWR0aCIsInNjZW5lIiwid3hhY29kZXVybCIsImFwaW1hbGwiLCJnZXRXeGFDb2RlIiwic3JjIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJnZXRJbWFnZUluZm8iLCJoZWlnaHQiLCJwcm9taXNlcyIsImFsbCIsInZhbHVlcyIsImN0eCIsImNyZWF0ZUNhbnZhc0NvbnRleHQiLCJjb3JwbmFtZSIsInNjb3BlIiwiY2l0eSIsImluZHVzdHJ5IiwiQ0FOVkFTX1ciLCJDQU5WQVNfSCIsInNldEZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZHJhd0ltYWdlIiwiam9ibmFtZSIsImpvYmNpdHkiLCJ3b3JreWVhcnMiLCJlYmlkIiwic2FsYXJ5Iiwic2V0VGV4dEFsaWduIiwic2V0Rm9udFNpemUiLCJmaWxsVGV4dCIsIldYQUNPREVfWCIsIldYQUNPREVfWSIsIldYQUNPREVfU0laRSIsIk1MT0dPX1NJWkUiLCJzYXZlIiwiYmVnaW5QYXRoIiwiYXJjIiwiTWF0aCIsIlBJIiwiY2xvc2VQYXRoIiwiZmlsbCIsImNsaXAiLCJyZXN0b3JlIiwiZHJhdyIsInNldFRpbWVvdXQiLCJjYW52YXNUb1RlbXBGaWxlUGF0aCIsImNhbnZhc0lkIiwicHJldmlld015Q2FudmFzSW1hZ2UiLCJ0ZW1wRmlsZVBhdGgiLCJtZXN1cmVUZXh0Iiwic2V0U3Ryb2tlU3R5bGUiLCJzdHJva2UiLCJ0ZXh0IiwiZm9yRWFjaCIsIml0ZW0iLCJ0ZXN0IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFHQTs7Ozs7Ozs7OztJQUlxQkEsWTs7Ozs7Ozs7Ozs7Ozs7c01BQ2pCQyxJLEdBQU87QUFDSEMsK0JBQW1CLElBRGhCO0FBRUhDLGtDQUFzQixLQUZuQjtBQUdIQyxtQ0FBdUIsS0FIcEI7QUFJSEMsdUJBQVcsQ0FKUjtBQUtIQyxzQkFBVSxDQUxQO0FBTUhDLHVCQUFXLENBTlI7QUFPSEMscUJBQVMsYUFQTjtBQVFIQyxxQkFBUyxrQkFSTjtB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U0QsSUFBVCxDQUFKLEVBQW9CO0FBQ3ZCekQsNkJBQVMsR0FBVDtBQUNILGlCQUZNLE1BRUEsSUFBSSxrQkFBa0IwRCxJQUFsQixDQUF1QkQsSUFBdkIsQ0FBSixFQUFrQztBQUNyQ3pELDZCQUFTLEVBQVQ7QUFDSDtBQUNKLGFBWkQ7QUFhQSxtQkFBT0EsS0FBUDtBQUNIOzs7O0VBdFpxQyxlQUFLMkQsUzs7a0JBQTFCeEksWSIsImZpbGUiOiJzaGFyZW1pbmlwcm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpL2FwaSc7XHJcbmltcG9ydCB0aXAgZnJvbSAnLi4vdXRpbHMvdGlwJztcclxuaW1wb3J0IHtcclxuICAgIHN0ckVuYywgc3RyRGVjXHJcbn0gZnJvbSAnLi4vdXRpbHMvZGVzJztcclxuaW1wb3J0IHtcclxuICAgIERFU0tFWVxyXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFyZU1pbmlQcm8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICAgIGFjdGlvblNoZWV0SGlkZGVuOiB0cnVlLFxyXG4gICAgICAgIGlzU2hvd015Q2FudmFzU2NyZWVuOiBmYWxzZSxcclxuICAgICAgICBpc1Nob3dQdWJDYW52YXNTY3JlZW46IGZhbHNlLFxyXG4gICAgICAgIGNhbnZhc1JweDogMCxcclxuICAgICAgICBjdHhXaWR0aDogMCxcclxuICAgICAgICBjdHhIZWlnaHQ6IDAsXHJcbiAgICAgICAgb3BIaW50MDogJ+mVv+aMieaIluW+ruS/oeaJq+aPj+Wwj+eoi+W6j+eggScsXHJcbiAgICAgICAgb3BIaW50MTogJ+aCqOWPr+S6huino+i/meS4quiBjOS9je+8jOW5tuaKlemAkuaCqOeahOeugOWOhicsXHJcbiAgICAgICAgb3BIaW50MjogJ+mVv+aMieaIluW+ruS/oeaJq+aPj+Wwj+eoi+W6j+eggScsXHJcbiAgICAgICAgb3BIaW50MzogJ+S6huino+WFrOWPuOS/oeaBr+WSjOWcqOaLm+iBjOS9jScsXHJcbiAgICAgICAgY3R4UHViV2lkdGg6IDAsXHJcbiAgICAgICAgY3R4UHViSGVpZ2h0OiAwLFxyXG4gICAgICAgIHFyY29kZVBhdGg6ICcnLFxyXG4gICAgICAgIG1sb2dvUGF0aDogJycsXHJcbiAgICAgICAgaXNJcHg6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcHJvcHM9e1xyXG4gICAgICAgIHVybFdpdGhBcmdzOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgZGVmYXVsdDogJydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGN1cnJlbnRVcmw6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgam9iSW5mbzoge1xyXG4gICAgICAgICAgICB0eXBlOiBPYmplY3QsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvcnBJbmZvOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YU9yZzogU3RyaW5nXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uTG9hZChvcHRpb24pe1xyXG4gICAgICAgIC8v6I635Y+W5bGP5bmV5a695bqmXHJcbiAgICAgICAgY29uc3Qgc2NyZWVuV2lkdGggPSB0aGlzLiRwYXJlbnQuJHBhcmVudC5nbG9iYWxEYXRhLnN5c3RlbUluZm87XHJcbiAgICAgICAgdGhpcy5jYW52YXNScHggPSBzY3JlZW5XaWR0aC53aW5kb3dXaWR0aCAvIDc1MCAqIDI7XHJcbiAgICAgICAgdGhpcy5pc0lweCA9IHRoaXMuJHBhcmVudC4kcGFyZW50Lmdsb2JhbERhdGEuaXNJcHg7XHJcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIG1ldGhvZHM9e1xyXG4gICAgICAgIG9wZW5BY3Rpb25TaGVldCgpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25TaGVldEhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWN0aW9uU2hlZXRiaW5kY2hhbmdlKCkgey8v6LCD5Y+WIOKAnOWPlua2iOKAneaMiemSrlxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvblNoZWV0SGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRNZW51MCgpey8v6L2s5Y+R57uZ5aW95Y+L5oiW576k6IGKXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uU2hlZXRIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZE1lbnUxKCl7Ly/nlJ/miJDmnIvlj4vlnIjliIbkuqvlm75cclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9uU2hlZXRIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGF0LmlzU2hvd015Q2FudmFzU2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhhdC5pc1Nob3dQdWJDYW52YXNTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmraPlnKjnlJ/miJDlm77niYcnLFxyXG4gICAgICAgICAgICAgICAgbWFzazogdHJ1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhhdC5sb2FkUmVzb3VyY2VzKCkudGhlbigocmVzb3VyY2VzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdlbmVyYXRlU2hhcmVJbWFnZShyZXNvdXJjZXMpO1xyXG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgICAgICAvLyB0aXAuZXJyb3IoJ+WbvueJh+iOt+WPluWksei0pScpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc1Nob3dNeUNhbnZhc1NjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZE1lbnUyKCl7Ly/nlJ/miJDlhazkvJflj7fmlofnq6DliIbkuqvlm75cclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9uU2hlZXRIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGF0LmlzU2hvd015Q2FudmFzU2NyZWVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoYXQuaXNTaG93UHViQ2FudmFzU2NyZWVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmraPlnKjnlJ/miJDlm77niYcnLFxyXG4gICAgICAgICAgICAgICAgbWFzazogdHJ1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhhdC5sb2FkUmVzb3VyY2VzKCkudGhlbigocmVzb3VyY2VzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdlbmVyYXRlUHVibGljQWNjb3VudEltYWdlKHJlc291cmNlcyk7XHJcbiAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgICAgIC8vIHRpcC5lcnJvcign5Zu+54mH6I635Y+W5aSx6LSlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzU2hvd1B1YkNhbnZhc1NjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBwcmV2aWV3TXlDYW52YXNJbWFnZShwYXRoKSB7IFxyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzOyBcclxuICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xyXG4gICAgICAgICAgICAvL2N1cnJlbnQ6IHRoYXQubXlDYW52YXNUZW1wRmlsZVBhdGgsIC8vIOW9k+WJjeaYvuekuuWbvueJh+eahGh0dHDpk77mjqVcclxuICAgICAgICAgICAgdXJsczogW3BhdGhdLCAvLyDpnIDopoHpooTop4jnmoTlm77niYdodHRw6ZO+5o6l5YiX6KGoXHJcbiAgICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbChyZXMpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0gIFxyXG5cclxuICAgIGxvYWRSZXNvdXJjZXMoKSB7IC8v5bCG5Zyo57q/6Lev5b6E6L2s5Li65pys5Zyw5Li05pe26Lev5b6EXHJcbiAgICAgICAgbGV0IHttbG9nb30gPSB0aGlzLmNvcnBJbmZvO1xyXG4gICAgICAgIGlmKG1sb2dvID09IFwiXCIpIHtcclxuICAgICAgICAgICAgbWxvZ28gPSBgaHR0cHM6Ly93d3cuNTFqcnEuY29tL3RvcGljcy9pbWFnZXMvNTFqcnFfbG9nb19ncmF5LnBuZ2A7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBtbG9nbyA9IG1sb2dvLnJlcGxhY2UoL2h0dHAvLCAnaHR0cHMnKTsgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOe7keWumuaVsOaNruiusOW+l+WOu+aOie+8jOi/memHjOWBmuiwg+ivlVxyXG4gICAgICAgIC8vIGxldCBtbG9nbyA9IGBodHRwczovL3d3dy41MWpycS5jb20vdG9waWNzL2ltYWdlcy81MWpycV9sb2dvX2dyYXkucG5nYDtcclxuICAgICAgICBjb25zdCB7cXJjb2RlUGF0aCwgbWxvZ29QYXRofSA9IHRoaXMuZGF0YTtcclxuICAgICAgICBsZXQgbGVuID0gKHRoaXMuY3VycmVudFVybCArICc/JykubGVuZ3RoO1xyXG4gICAgICAgIGxldCBhcmdzID0gdGhpcy51cmxXaXRoQXJncy5zbGljZShsZW4pLnNwbGl0KCcmJyk7ICAvL2NvcnBpZD05OTAwMDMmam9iaWQ9MTA0MDAxMyB8fCBjb21wYW55aWQ9MTAxMDUyN1xyXG4gICAgICAgIGxldCBvYmpzID0gbmV3IE9iamVjdCgpO1xyXG4gICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBvYmpzW2FyZ3NbaV0uc3BsaXQoJz0nKVswXV0gPSBhcmdzW2ldLnNwbGl0KCc9JylbMV07ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2NlbmVBcmdzID0gJyc7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmRhdGFPcmcpIHtcclxuICAgICAgICAgICAgY2FzZSBcImhvbWV2aWV3XCI6XHJcbiAgICAgICAgICAgICAgICBzY2VuZUFyZ3MgPSBgaHYqY2lkPSR7b2Jqc1tcImNvcnBpZFwiXX0mamlkPSR7b2Jqc1tcImpvYmlkXCJdfWA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNvcnB2aWV3XCI6XHJcbiAgICAgICAgICAgICAgICBzY2VuZUFyZ3MgPSBgY3YqY3BpZD0ke29ianNbXCJjb21wYW55aWRcIl19YDtcclxuICAgICAgICAgICAgICAgIGJyZWFrOyAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IEpTT04uc3RyaW5naWZ5KHtoZWFkOiB7dHJhbnNjb2RlOiBcIlAwMDAxNlwiLHR5cGU6IFwiaFwifSxkYXRhOiB7cGFnZTogYHBhZ2VzL2luZGV4L2luZGV4YCx3aWR0aDogMTgwLCBzY2VuZTpgJHtzY2VuZUFyZ3N9YH19KTtcclxuICAgICAgICBsZXQgd3hhY29kZXVybCA9IGFwaS5hcGltYWxsICsgJy93eC9jcmVhdGV3eGFxcmNvZGU/cGFyYW1zPScgKyBzdHJFbmMoYCR7cGFyYW1zfWAsIERFU0tFWSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+Wwj+eoi+W6j+eggScsIHd4YWNvZGV1cmwpXHJcbiAgICAgICAgY29uc3QgZ2V0V3hhQ29kZSA9IChzcmMpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgd3guZ2V0SW1hZ2VJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICBzcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2Vzcyh7d2lkdGgsaGVpZ2h0LHBhdGh9KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmYWlsKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChg6I635Y+W5Zu+54mH5aSx6LSlOiAke3NyY31gKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtnZXRXeGFDb2RlKHd4YWNvZGV1cmwpLCBnZXRXeGFDb2RlKG1sb2dvKV07XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKHZhbHVlcyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBxcmNvZGVQYXRoOiB2YWx1ZXNbMF0sXHJcbiAgICAgICAgICAgICAgICBtbG9nb1BhdGg6IHZhbHVlc1sxXSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgfVxyXG4gICAgXHJcblxyXG4gICAgZ2VuZXJhdGVTaGFyZUltYWdlKHJlc291cmNlcykgey8v6L2s5Y+R57uZ5aW95Y+L5oiW576k6IGKXHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC5jdHhXaWR0aCA9IHRoYXQuY2FudmFzUnB4ICogMzc1O1xyXG4gICAgICAgIHRoYXQuY3R4SGVpZ2h0ID0gdGhhdC5jYW52YXNScHggKiA2MDA7XHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAvL+WIm+W7uiBjYW52YXMg57uY5Zu+5LiK5LiL5paHXHJcbiAgICAgICAgY29uc3QgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgnbXlDYW52YXMnKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgIGNvcnBuYW1lLCBzY29wZSwgY2l0eSwgaW5kdXN0cnlcclxuICAgICAgICB9ID0gdGhhdC5jb3JwSW5mbztcclxuICAgICAgICBjb25zdCBDQU5WQVNfVyA9IHRoYXQuY3R4V2lkdGg7XHJcbiAgICAgICAgY29uc3QgQ0FOVkFTX0ggPSB0aGF0LmN0eEhlaWdodDtcclxuICAgICAgICAvLyBkcmF3IGJhY2tncm91bmRcclxuICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCcjZmZmZmZmJyk7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIENBTlZBU19XLCBDQU5WQVNfSCk7XHJcbiAgICAgICAgLy8gZHJhdyBsZWZ0LXRvcC1sb2dvXHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSgnL2ltYWdlcy9pY29ucy9sZWZ0LXRvcC1sb2dvLnBuZycsIDAsIDAsIHRoYXQuY2FudmFzUnB4ICogMTA2IC8gMiwgdGhhdC5jYW52YXNScHggKiAxMDYgLyAyKTtcclxuXHJcbiAgICAgICAgaWYgKHRoYXQuZGF0YU9yZyA9PSBcImhvbWV2aWV3XCIgKSB7XHJcbiAgICAgICAgICAgIC8vICBkcmF3IGpvYmR1dHlcclxuICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgam9ibmFtZSwgam9iY2l0eSwgd29ya3llYXJzLCBlYmlkLCBzYWxhcnlcclxuICAgICAgICAgICAgfSA9IHRoYXQuam9iSW5mbztcclxuICAgICAgICAgICAgY3R4LnNldFRleHRBbGlnbignY2VudGVyJyk7XHJcbiAgICAgICAgICAgIGN0eC5zZXRGb250U2l6ZSh0aGF0LmNhbnZhc1JweCAqIDIwKTtcclxuICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnIzM1MzUzNScpO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoY29ycG5hbWUsIENBTlZBU19XIC8gMiwgdGhhdC5jYW52YXNScHggKiA2MCk7XHJcblxyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoam9ibmFtZSwgQ0FOVkFTX1cgLyAyLCB0aGF0LmNhbnZhc1JweCAqICg2MCArIDIwICsgMTApKTtcclxuXHJcbiAgICAgICAgICAgIGN0eC5zZXRGb250U2l6ZSh0aGF0LmNhbnZhc1JweCAqIDE0KTtcclxuICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnIzg4ODg4OCcpO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoYCR7am9iY2l0eX0gfCAke3dvcmt5ZWFyc30gfCAke2ViaWR9YCwgQ0FOVkFTX1cgLyAyLCB0aGF0LmNhbnZhc1JweCAqICg2MCArIDIwICsgMTAgKyAyMCArIDEwKSk7XHJcblxyXG4gICAgICAgICAgICBjdHguc2V0Rm9udFNpemUodGhhdC5jYW52YXNScHggKiAyMCk7XHJcbiAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyNmZjllMDAnKTtcclxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHNhbGFyeSwgQ0FOVkFTX1cgLyAyLCB0aGF0LmNhbnZhc1JweCAqICg2MCArIDIwICsgMTAgKyAyMCArIDEwICsgMTQgKzEwKSk7XHJcblxyXG4gICAgICAgICAgICAvL2RyYXcgaGludFxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCcvaW1hZ2VzL2ljb25zL2Zpbmdlci5wbmcnLCBDQU5WQVNfVy8yLXRoYXQuY2FudmFzUnB4ICogNDAgLyAyIC8gMiwgdGhhdC5jYW52YXNScHggKiA0MjAsIHRoYXQuY2FudmFzUnB4ICogNDAgLyAyLCB0aGF0LmNhbnZhc1JweCAqIDYyIC8gMik7XHJcbiAgICAgICAgICAgIGN0eC5zZXRUZXh0QWxpZ24oJ2NlbnRlcicpO1xyXG4gICAgICAgICAgICBjdHguc2V0Rm9udFNpemUodGhhdC5jYW52YXNScHggKiAxNCk7XHJcbiAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyM4ODg4ODgnKTtcclxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoYXQub3BIaW50MCwgQ0FOVkFTX1cgLyAyLCB0aGF0LmNhbnZhc1JweCAqICg0MjAgKyA2MiAvIDIgKyAyMCkpO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGhhdC5vcEhpbnQxLCBDQU5WQVNfVyAvIDIsIHRoYXQuY2FudmFzUnB4ICogKDQyMCArIDYyIC8gMiArIDIwKSArIHRoYXQuY2FudmFzUnB4ICogKDE0ICsgNSkpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHRoYXQuZGF0YU9yZyA9PSBcImNvcnB2aWV3XCIpIHtcclxuICAgICAgICAgICAgLy8gIGRyYXcgY29ycGluZm9cclxuICAgICAgICAgICAgY3R4LnNldFRleHRBbGlnbignY2VudGVyJyk7XHJcbiAgICAgICAgICAgIGN0eC5zZXRGb250U2l6ZSh0aGF0LmNhbnZhc1JweCAqIDIwKTtcclxuICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnIzM1MzUzNScpO1xyXG5cclxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGNvcnBuYW1lLCBDQU5WQVNfVyAvIDIsIHRoYXQuY2FudmFzUnB4ICogKDYwKzIwKzEwKSk7XHJcblxyXG4gICAgICAgICAgICBjdHguc2V0Rm9udFNpemUodGhhdC5jYW52YXNScHggKiAxNCk7XHJcbiAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyM4ODg4ODgnKTtcclxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGAke3Njb3BlfSB8ICR7aW5kdXN0cnl9IHwgJHtjaXR5fWAsIENBTlZBU19XIC8gMiwgdGhhdC5jYW52YXNScHggKiAoNjAgKyAyMCArIDEwICsgMjAgKyAxMCkpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vZHJhdyBoaW50XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoJy9pbWFnZXMvaWNvbnMvZmluZ2VyLnBuZycsIENBTlZBU19XLzItdGhhdC5jYW52YXNScHggKiA0MCAvIDIgLyAyLCB0aGF0LmNhbnZhc1JweCAqIDQyMCwgdGhhdC5jYW52YXNScHggKiA0MCAvIDIsIHRoYXQuY2FudmFzUnB4ICogNjIgLyAyKTtcclxuICAgICAgICAgICAgY3R4LnNldFRleHRBbGlnbignY2VudGVyJyk7XHJcbiAgICAgICAgICAgIGN0eC5zZXRGb250U2l6ZSh0aGF0LmNhbnZhc1JweCAqIDE0KTtcclxuICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnIzg4ODg4OCcpO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGhhdC5vcEhpbnQyLCBDQU5WQVNfVyAvIDIsIHRoYXQuY2FudmFzUnB4ICogKDQyMCArIDYyIC8gMiArIDIwKSk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGF0Lm9wSGludDMsIENBTlZBU19XIC8gMiwgdGhhdC5jYW52YXNScHggKiAoNDIwICsgNjIgLyAyICsgMjApICsgdGhhdC5jYW52YXNScHggKiAoMTQgKyA1KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy9kcmF3IGZvb3RlcjtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKCcvaW1hZ2VzL2ljb25zL2Zvb3QtdHh0LnBuZycsIENBTlZBU19XIC8gMiAtIHRoYXQuY2FudmFzUnB4ICogNDI4IC8gMiAvIDIsIHRoYXQuY2FudmFzUnB4ICogNTY0LCB0aGF0LmNhbnZhc1JweCAqIDQyOCAvIDIsIHRoYXQuY2FudmFzUnB4ICogMjYgLyAyKTtcclxuICAgICAgICAvL+agt+W8j+W+heiwg+aVtFxyXG4gICAgICAgIC8vIGN0eC5zZXRGb250U2l6ZSh0aGF0LmNhbnZhc1JweCAqIDEwKTtcclxuICAgICAgICAvLyBjdHguc2V0RmlsbFN0eWxlKCcjYjJiMmIyJyk7XHJcbiAgICAgICAgLy8gY3R4LmZpbGxUZXh0KCc1MemHkeiejeWciCB8IOS4reWbvemihuWFiOeahOmHkeiejeiBjOS4muW5s+WPsCcsIHRoYXQuY2FudmFzUnB4ICogKDEzMiksIHRoYXQuY2FudmFzUnB4ICogNTY0KTtcclxuXHJcbiAgICAgICAgLy9kcmF3IHd4YWNvZGVcclxuICAgICAgICBjb25zdCBXWEFDT0RFX1ggPSB0aGF0LmNhbnZhc1JweCAqIDk4O1xyXG4gICAgICAgIGNvbnN0IFdYQUNPREVfWSA9IHRoYXQuY2FudmFzUnB4KiAxODA7XHJcbiAgICAgICAgY29uc3QgV1hBQ09ERV9TSVpFID0gdGhhdC5jYW52YXNScHggKiAxODA7XHJcbiAgICAgICAgY29uc3QgTUxPR09fU0laRSA9IHRoYXQuY2FudmFzUnB4ICogNzg7XHJcbiAgICAgICAgY29uc3Qge3FyY29kZVBhdGgsIG1sb2dvUGF0aH0gPSByZXNvdXJjZXM7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShxcmNvZGVQYXRoLCAoQ0FOVkFTX1cgLyAyKSAtIChXWEFDT0RFX1NJWkUvMiksIFdYQUNPREVfWSwgV1hBQ09ERV9TSVpFLCBXWEFDT0RFX1NJWkUpO1xyXG4gICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyNmZmZmZmYnKTtcclxuICAgICAgICBjdHguc2F2ZSgpXHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpXHJcbiAgICAgICAgY3R4LmFyYygoQ0FOVkFTX1cgLyAyKSwgV1hBQ09ERV9ZICsgV1hBQ09ERV9TSVpFIC8gMiwgTUxPR09fU0laRSAvIDIsIDAsIDIqTWF0aC5QSSkgO1xyXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKSBcclxuICAgICAgICBjdHguZmlsbCgpXHJcbiAgICAgICAgY3R4LmNsaXAoKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKG1sb2dvUGF0aClcclxuICAgICAgICBjdHguZHJhd0ltYWdlKG1sb2dvUGF0aCwgIChDQU5WQVNfVyAvIDIpIC0gKE1MT0dPX1NJWkUvMiksIFdYQUNPREVfWSArIChXWEFDT0RFX1NJWkUgLyAyIC0gTUxPR09fU0laRSAvMiApLCBNTE9HT19TSVpFLCBNTE9HT19TSVpFKTtcclxuICAgICAgICBjdHgucmVzdG9yZSgpXHJcblxyXG4gICAgICAgIGN0eC5kcmF3KHRydWUsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3guY2FudmFzVG9UZW1wRmlsZVBhdGgoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhc0lkOiAnbXlDYW52YXMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMudGVtcEZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3TXlDYW52YXNJbWFnZShyZXMudGVtcEZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc1Nob3dNeUNhbnZhc1NjcmVlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbChyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgdGhhdClcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZVB1YmxpY0FjY291bnRJbWFnZShyZXNvdXJjZXMpey8v55Sf5oiQ5YWs5LyX5Y+35paH56ug5YiG5Lqr5Zu+XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC5jdHhQdWJXaWR0aCA9IHRoYXQuY2FudmFzUnB4ICogMzc1O1xyXG4gICAgICAgIHRoYXQuY3R4UHViSGVpZ2h0ID0gdGhhdC5jYW52YXNScHggKiAxNzA7XHJcbiAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAvL+WIm+W7uiBjYW52YXMg57uY5Zu+5LiK5LiL5paHXHJcbiAgICAgICAgY29uc3QgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgncHViQ2FudmFzJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgQ0FOVkFTX1cgPSB0aGF0LmN0eFB1YldpZHRoO1xyXG4gICAgICAgIGNvbnN0IENBTlZBU19IID0gdGhhdC5jdHhQdWJIZWlnaHQ7XHJcbiAgICAgICAgLy8gZHJhdyBiYWNrZ3JvdW5kXHJcbiAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnI2ZmZmZmZicpO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBDQU5WQVNfVywgQ0FOVkFTX0gpO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKHRoYXQuZGF0YU9yZyA9PSBcImhvbWV2aWV3XCIgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgIGpvYm5hbWUsIGpvYmNpdHksIHdvcmt5ZWFycywgZWJpZCwgc2FsYXJ5XHJcbiAgICAgICAgICAgIH0gPSB0aGF0LmpvYkluZm87XHJcbiAgICAgICAgICAgIC8vICBkcmF3IGpvYmR1dHlcclxuICAgICAgICAgICAgY3R4LnNldEZvbnRTaXplKHRoYXQuY2FudmFzUnB4ICogMTgpO1xyXG4gICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCcjMzUzNTM1Jyk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChqb2JuYW1lLCB0aGF0LmNhbnZhc1JweCAqIDE2LCB0aGF0LmNhbnZhc1JweCAqIDI4KTtcclxuXHJcbiAgICAgICAgICAgIGN0eC5zZXRGb250U2l6ZSh0aGF0LmNhbnZhc1JweCAqIDEyKTtcclxuICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnIzg4ODg4OCcpO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoYCR7am9iY2l0eX0gfCAke3dvcmt5ZWFyc30gfCAke2ViaWR9YCwgdGhhdC5jYW52YXNScHggKiAxNiwgdGhhdC5jYW52YXNScHggKiAoMjggKyAxOCArIDYpKTtcclxuXHJcbiAgICAgICAgICAgIGN0eC5zZXRGb250U2l6ZSh0aGF0LmNhbnZhc1JweCAqIDIwKTtcclxuICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnI2ZmOWUwMCcpO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoc2FsYXJ5LCBDQU5WQVNfVyAtIHRoYXQuY2FudmFzUnB4ICogKDE2ICsgdGhhdC5tZXN1cmVUZXh0KHNhbGFyeSkpLCB0aGF0LmNhbnZhc1JweCAqIDI4KTtcclxuXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy9kcmF3IGhpbnRcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSgnL2ltYWdlcy9pY29ucy9maW5nZXIucG5nJywgdGhhdC5jYW52YXNScHggKiAxNiwgdGhhdC5jYW52YXNScHggKiA4MiwgdGhhdC5jYW52YXNScHggKiA0MCAvIDIsIHRoYXQuY2FudmFzUnB4ICogNjIgLyAyKTtcclxuICAgICAgICAgICAgY3R4LnNldEZvbnRTaXplKHRoYXQuY2FudmFzUnB4ICogMTIpO1xyXG4gICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCcjODg4ODg4Jyk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGF0Lm9wSGludDAsIHRoYXQuY2FudmFzUnB4ICogKDE2ICsgNDAgLyAyICsgMTApLCB0aGF0LmNhbnZhc1JweCAqICg5MCkpO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQodGhhdC5vcEhpbnQxLCB0aGF0LmNhbnZhc1JweCAqICgxNiArIDQwIC8gMiArIDEwKSwgdGhhdC5jYW52YXNScHggKiAoOTAgKyAxMiArIDEwKSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGF0LmRhdGFPcmcgPT0gXCJjb3Jwdmlld1wiICl7XHJcbiAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgIGNvcnBuYW1lLCBzY29wZSwgY2l0eSwgaW5kdXN0cnlcclxuICAgICAgICAgICAgfSA9IHRoYXQuY29ycEluZm87XHJcbiAgICAgICAgICAgIC8vICBkcmF3IGNvcnBpbmZvXHJcbiAgICAgICAgICAgIGN0eC5zZXRGb250U2l6ZSh0aGF0LmNhbnZhc1JweCAqIDE4KTtcclxuICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSgnIzM1MzUzNScpO1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoY29ycG5hbWUsIHRoYXQuY2FudmFzUnB4ICogMTYsIHRoYXQuY2FudmFzUnB4ICogMjgpO1xyXG5cclxuICAgICAgICAgICAgY3R4LnNldEZvbnRTaXplKHRoYXQuY2FudmFzUnB4ICogMTIpO1xyXG4gICAgICAgICAgICBjdHguc2V0RmlsbFN0eWxlKCcjODg4ODg4Jyk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChgJHtzY29wZX0gfCAke2luZHVzdHJ5fSB8ICR7Y2l0eX1gLCB0aGF0LmNhbnZhc1JweCAqIDE2LCB0aGF0LmNhbnZhc1JweCAqICgyOCArIDE4ICsgNikpO1xyXG5cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAvL2RyYXcgaGludFxyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCcvaW1hZ2VzL2ljb25zL2Zpbmdlci5wbmcnLCB0aGF0LmNhbnZhc1JweCAqIDE2LCB0aGF0LmNhbnZhc1JweCAqIDgyLCB0aGF0LmNhbnZhc1JweCAqIDQwIC8gMiwgdGhhdC5jYW52YXNScHggKiA2MiAvIDIpO1xyXG4gICAgICAgICAgICBjdHguc2V0Rm9udFNpemUodGhhdC5jYW52YXNScHggKiAxMik7XHJcbiAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyM4ODg4ODgnKTtcclxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRoYXQub3BIaW50MiwgdGhhdC5jYW52YXNScHggKiAoMTYgKyA0MCAvIDIgKyAxMCksIHRoYXQuY2FudmFzUnB4ICogKDkwKSk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0aGF0Lm9wSGludDMsIHRoYXQuY2FudmFzUnB4ICogKDE2ICsgNDAgLyAyICsgMTApLCB0aGF0LmNhbnZhc1JweCAqICg5MCArIDEyICsgMTApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vZHJhdyBmb290ZXI7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZSgnL2ltYWdlcy9pY29ucy9mb290LXR4dC5wbmcnLCB0aGF0LmNhbnZhc1JweCAqIDE2LCBDQU5WQVNfSCAtIHRoYXQuY2FudmFzUnB4ICogKDE0ICsgMjYgLyAyKSwgdGhhdC5jYW52YXNScHggKiA0MjggLyAyLCB0aGF0LmNhbnZhc1JweCAqIDI2IC8gMik7XHJcbiAgICAgICAgLy/moLflvI/lvoXosIPmlbRcclxuICAgICAgICAvLyBjdHguc2V0Rm9udFNpemUodGhhdC5jYW52YXNScHggKiAxMCk7XHJcbiAgICAgICAgLy8gY3R4LnNldEZpbGxTdHlsZSgnI2IyYjJiMicpO1xyXG4gICAgICAgIC8vIGN0eC5maWxsVGV4dCgnNTHph5Hono3lnIggfCDkuK3lm73pooblhYjnmoTph5Hono3ogYzkuJrlubPlj7AnLCB0aGF0LmNhbnZhc1JweCAqICgxMzIpLCB0aGF0LmNhbnZhc1JweCAqIDU2NCk7XHJcblxyXG4gICAgICAgIC8vZHJhdyB3eGFjb2RlXHJcbiAgICAgICAgY29uc3QgV1hBQ09ERV9TSVpFID0gdGhhdC5jYW52YXNScHggKiAxMDA7XHJcbiAgICAgICAgY29uc3QgTUxPR09fU0laRSA9IHRoYXQuY2FudmFzUnB4ICogNDI7XHJcbiAgICAgICAgY29uc3Qge3FyY29kZVBhdGgsIG1sb2dvUGF0aH0gPSByZXNvdXJjZXM7XHJcbiAgICAgICAgY3R4LmRyYXdJbWFnZShxcmNvZGVQYXRoLCBDQU5WQVNfVyAtIHRoYXQuY2FudmFzUnB4ICogMTYgLSBXWEFDT0RFX1NJWkUsIENBTlZBU19IIC0gdGhhdC5jYW52YXNScHggKiAxNCAtIFdYQUNPREVfU0laRSwgV1hBQ09ERV9TSVpFLCBXWEFDT0RFX1NJWkUpO1xyXG4gICAgICAgIGN0eC5zZXRTdHJva2VTdHlsZSgnI2ZmZmZmZicpO1xyXG4gICAgICAgIGN0eC5zYXZlKClcclxuICAgICAgICBjdHguYmVnaW5QYXRoKClcclxuICAgICAgICBjdHguYXJjKENBTlZBU19XIC0gdGhhdC5jYW52YXNScHggKiAxNiAtIFdYQUNPREVfU0laRS8yLCBDQU5WQVNfSCAtIHRoYXQuY2FudmFzUnB4ICogMTQgLSBXWEFDT0RFX1NJWkUvMiwgTUxPR09fU0laRSAvIDIsIDAsIDIqTWF0aC5QSSkgO1xyXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKVxyXG4gICAgICAgIGN0eC5zdHJva2UoKVxyXG4gICAgICAgIGN0eC5jbGlwKClcclxuICAgICAgICBjdHguZHJhd0ltYWdlKG1sb2dvUGF0aCwgIENBTlZBU19XIC0gdGhhdC5jYW52YXNScHggKiAxNiAtIFdYQUNPREVfU0laRSArIChXWEFDT0RFX1NJWkUgLyAyIC0gTUxPR09fU0laRSAvIDIpLCBDQU5WQVNfSCAtIHRoYXQuY2FudmFzUnB4ICogMTQgLSBXWEFDT0RFX1NJWkUgKyAoV1hBQ09ERV9TSVpFIC8gMiAtIE1MT0dPX1NJWkUgLyAyKSwgTUxPR09fU0laRSwgTUxPR09fU0laRSk7XHJcbiAgICAgICAgY3R4LnJlc3RvcmUoKVxyXG5cclxuICAgICAgICBjdHguZHJhdyh0cnVlLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3eC5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzSWQ6ICdwdWJDYW52YXMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMudGVtcEZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3TXlDYW52YXNJbWFnZShyZXMudGVtcEZpbGVQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc1Nob3dQdWJDYW52YXNTY3JlZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIHRoYXQpXHJcbiAgICAgICAgICAgIH0sIDMwMClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+Wwj+eoi+W6j+S4reayoeaPkOS+m+iOt+aWh+acrOWuveW6pueahOaWueazlSDliKTmlq3lkITnp43lrZfnrKblrr3luqYg6L+U5Zue5a2X56ym5Liy5oC75a695bqmXHJcbiAgICBtZXN1cmVUZXh0KHRleHQpIHtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5zcGxpdCgnJyk7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gMDtcclxuICAgICAgICB0ZXh0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKC9bYS16QS1aXS8udGVzdChpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgd2lkdGggKz0gMTQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoL1swLTldLy50ZXN0KGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCArPSAxMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgvXFwuLy50ZXN0KGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCArPSA1LjQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoLy0vLnRlc3QoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoICs9IDYuNTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgvW1xcdTRlMDAtXFx1OWZhNV0vLnRlc3QoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoICs9IDIwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==