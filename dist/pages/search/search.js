'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _api = require('./../../api/api.js');

var _api2 = _interopRequireDefault(_api);

var _constants = require('./../../utils/constants.js');

var _tip = require('./../../utils/tip.js');

var _tip2 = _interopRequireDefault(_tip);

var _search = require('./../../components/search.js');

var _search2 = _interopRequireDefault(_search);

var _citylist = require('./../../components/citylist.js');

var _citylist2 = _interopRequireDefault(_citylist);

var _commposi = require('./../../components/commposi.js');

var _commposi2 = _interopRequireDefault(_commposi);

var _corplist = require('./../../components/corplist.js');

var _corplist2 = _interopRequireDefault(_corplist);

var _bottomloadmore = require('./../../components/bottomloadmore.js');

var _bottomloadmore2 = _interopRequireDefault(_bottomloadmore);

var _lodash = require('./../../npm/lodash/lodash.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var peoSearch = require('./../../data/peosearch-data.js');
var regions = require('./../../utils/regions.js');

var SearchPage = function (_wepy$page) {
    _inherits(SearchPage, _wepy$page);

    function SearchPage() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SearchPage);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchPage.__proto__ || Object.getPrototypeOf(SearchPage)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
            navigationBarTitleText: '搜索'
        }, _this.data = {
            isShowCity: false,
            isUnderSearch: false, //是否在搜索状态
            keyword: '', //输入字段
            hunterjobList: [], //服务器返回
            corplist: [],
            peoSearch: peoSearch,
            city: '',
            keywordhisList: [],
            isShowJobList: false,
            isShowCorpList: false,
            showLoading: false,
            isJobEmpty: false,
            isCorpEmpty: false,
            currentPage: 1, //当前页面
            totalJobPage: 0, //总数
            totalCorpPage: 0,
            regions: regions,
            dictionaryList: ["DICT_COMP_CITY", "DICT_COMP_INDUSTRY", "DICT_JOB_PUB_DATE", "DICT_COMP_NATURE"],
            areaid: [],
            industryid: [],
            publicdate: [],
            nature: [],
            indexRegion: "",
            indexIndustry: "",
            indexPublic: "",
            indexNature: "",
            areaidStatus: true,
            industryidStatus: true,
            publicdateStatus: true,
            natureStatus: true,
            isShowCityName: true,
            loginInfo: {},
            jobNum: 0,
            corpNum: 0
        }, _this.$repeat = { "hunterjobList": { "com": "commposi", "props": "syncPosidata.sync" }, "corplist": { "com": "corplist", "props": "syncCorpdata.sync" } }, _this.$props = { "commposi": { "v-bind:syncPosidata.sync": { "value": "item", "type": "item", "for": "hunterjobList", "item": "item", "index": "index", "key": "index" } }, "corplist": { "v-bind:syncCorpdata.sync": { "value": "item", "type": "item", "for": "corplist", "item": "item", "index": "index", "key": "index" } }, "search": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:isShowCityName.sync": "isShowCityName" }, "citylist": { "v-bind:citySelected.sync": "city" }, "bottomloadmore": { "v-bind:syncShow.sync": "showLoading", "message": "正在加载" } }, _this.$events = { "search": { "v-on:searchFn": "parentSearchFn", "v-on:trShowCityFn": "parentTrShowCityFn", "v-on:trUnderSearchFn": "parentUnderSearchFn" }, "citylist": { "v-on:cityNameFn": "parentCityNameFn" } }, _this.components = {
            search: _search2.default,
            citylist: _citylist2.default,
            commposi: _commposi2.default,
            corplist: _corplist2.default,
            bottomloadmore: _bottomloadmore2.default
        }, _this.methods = {
            empty: function empty() {
                //清空搜索历史记录
                var that = this;
                wx.removeStorage({
                    key: 'userSpecialInfo',
                    success: function success(res) {
                        that.keywordhisList = [];
                    }
                });
            },
            parentSearchFn: function parentSearchFn(val) {
                //搜索关键字
                this.isUnderSearch = true;
                this.keyword = val;
                this.doPosiSearch(val);
                this.doCorpSearch(val);
                this.hunterjobList = [];
                this.corplist = [];
                wx.showToast({
                    title: "加载中",
                    icon: "loading",
                    mask: true,
                    duration: 300
                });
                console.log(val);
            },
            parentTrShowCityFn: function parentTrShowCityFn(val) {
                this.isShowCity = val;
            },
            parentUnderSearchFn: function parentUnderSearchFn(val) {
                //清空搜索框内容后，不在搜索状态
                this.isUnderSearch = val;
                this.isShowJobList = val;
                this.isShowCorpList = val;
                this.isShowCityName = true;
            },
            parentCityNameFn: function parentCityNameFn(val) {
                if (val.length > 3) {
                    val = val.substring(0, 3) + "...";
                }
                this.$invoke('search', 'setCityFn', val);
                this.isShowCity = false;
                this.city = val;
            },
            selHisKeyWordFn: function selHisKeyWordFn(event) {
                this.$invoke('search', 'setSearchInputFn', event.currentTarget.dataset.his);
            },
            delHisCellFn: function delHisCellFn(event) {
                var del = event.currentTarget.dataset.del;
                var userSpecialInfo = wx.getStorageSync(_constants.USER_OPERATE_INFO) || {};
                this.keywordhisList = (0, _lodash.filter)(userSpecialInfo.keywordhisList, function (item, index) {
                    return item != del;
                });
                userSpecialInfo.keywordhisList = this.keywordhisList;
                wx.setStorageSync(_constants.USER_OPERATE_INFO, userSpecialInfo);
            },
            selPeoBadgeFn: function selPeoBadgeFn(event) {
                this.$invoke('search', 'setSearchInputFn', event.target.dataset.peoBadge);
            },
            trJobListFn: function trJobListFn(event) {
                //显示职位
                this.isShowJobList = true;
                this.isShowCorpList = false;
                this.isShowCityName = false;
            },
            trCorpListFn: function trCorpListFn(event) {
                //显示公司
                this.isShowCorpList = true;
                this.isShowJobList = false;
                this.isShowCityName = false;
            },
            bindRegionChange: function bindRegionChange(event) {
                this.areaidStatus = false;
                this.indexRegion = event.detail.value;
                this.city = this.areaid[this.indexRegion]; //???
                this.refreshListData();
            },
            bindIndustryChange: function bindIndustryChange(event) {
                this.industryidStatus = false;
                this.indexIndustry = event.detail.value;
                this.refreshListData();
            },
            bindPublicChange: function bindPublicChange(event) {

                this.publicdateStatus = false;
                this.indexPublic = event.detail.value;
                this.refreshListData();
            },
            bindNatureChange: function bindNatureChange(event) {
                this.natureStatus = false;
                this.indexNature = event.detail.value;
                this.refreshListData();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SearchPage, [{
        key: 'onLoad',
        value: function onLoad(options) {
            var _this2 = this;

            if (options.jobname !== undefined) {
                this.isUnderSearch = true;
                this.isShowJobList = true;
                this.keyword = options.jobname;
                this.$apply();
                this.doPosiSearch(options.jobname);
            }
            this.loginInfo = wx.getStorageSync(_constants.LOGIN_INFO) || {};
            var userSpecialInfo = wx.getStorageSync(_constants.USER_OPERATE_INFO) || {};
            if (userSpecialInfo.city) {
                this.city = userSpecialInfo.city;
            } else {
                this.city = '全国';
            }
            if (userSpecialInfo.keywordhisList) {
                this.keywordhisList = userSpecialInfo.keywordhisList;
            }
            var that = this;
            // 获取数据字典
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
                                that.areaid = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.data.returnMsg);
                            }
                        });
                        break;
                    case "DICT_COMP_INDUSTRY":
                        // 期望行业
                        _this2.getDictData(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.industryid = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.data.returnMsg);
                            }
                        });
                        break;
                    case "DICT_JOB_PUB_DATE":
                        // 发布时间
                        _this2.getDictData(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.publicdate = arr;
                                that.$apply();
                            } else {
                                _tip2.default.error(json.data.returnMsg);
                            }
                        });
                        break;
                    case "DICT_COMP_NATURE":
                        //企业性质
                        _this2.getDictData(item).then(function (json) {
                            if (json.data.returnCode == "AAAAAAA") {
                                var arr = [];
                                json.data.data.forEach(function (item, index) {
                                    arr.push(item.label);
                                });
                                that.nature = arr;
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
        key: 'onReachBottom',


        /**
         * 页面上拉触底事件的处理函数
         */
        value: function onReachBottom(event) {
            var that = this;
            that.showLoading = true;
            if (that.isShowJobList) {
                // console.log(that.totalJobPage + "===" + that.currentPage);
                //判断总页数是否大于翻页数
                if (that.totalJobPage > that.currentPage) {
                    //防止重复加载
                    if (that.preventRepeatReuqest) {
                        return true;
                    }
                    that.preventRepeatReuqest = true;
                    that.currentPage++;
                    that.doPosiSearch(that.keyword, that.currentPage);
                    that.preventRepeatReuqest = false;
                } else {
                    that.showLoading = false;
                }
            }
            if (that.isShowCorpList) {
                // console.log(that.totalCorpPage + "===" + that.currentPage);
                //判断总页数是否大于翻页数
                if (that.totalCorpPage > that.currentPage) {
                    //防止重复加载
                    if (that.preventRepeatReuqest) {
                        return true;
                    }
                    that.preventRepeatReuqest = true;
                    that.currentPage++;
                    that.doCorpSearch(that.keyword, that.currentPage);
                    that.preventRepeatReuqest = false;
                } else {
                    that.showLoading = false;
                }
            }
        }

        //职位搜索

    }, {
        key: 'doPosiSearch',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(keyword, currentPage) {
                var that, region_name, json, userSpecialInfo;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                that = this;
                                region_name = '';

                                if (that.city == '全国' || that.areaid[that.indexRegion] == '全部') {
                                    region_name = '';
                                } else {
                                    region_name = that.areaid[that.indexRegion] || that.city;
                                }
                                _context.next = 5;
                                return _api2.default.getCompanyjob({
                                    query: {
                                        head: {
                                            "transcode": "Q0001",
                                            "type": "h"
                                        },
                                        data: {
                                            pageNo: currentPage || "1",
                                            keyword: that.keyword,
                                            areaid: region_name,
                                            industryid: that.industryid[that.indexIndustry] || "",
                                            publicdate: that.publicdate[that.indexPublic] || ""
                                        }
                                    }
                                });

                            case 5:
                                json = _context.sent;

                                if (json.data.returnCode == "AAAAAAA") {
                                    if (json.data.data.num == 0) {
                                        // tip.toast('搜索结果为空');
                                        that.isJobEmpty = true; //暂无数据
                                        that.jobNum = 0;
                                    } else {
                                        userSpecialInfo = wx.getStorageSync(_constants.USER_OPERATE_INFO) || {};

                                        if (that.keywordhisList.indexOf(keyword) == -1) {
                                            that.keywordhisList.push(keyword);
                                            if (that.keywordhisList.length > 8) {
                                                that.keywordhisList.shift();
                                            }
                                            userSpecialInfo.keywordhisList = that.keywordhisList;
                                            console.log(that.keywordhisList);
                                            wx.setStorageSync(_constants.USER_OPERATE_INFO, userSpecialInfo);
                                        }
                                        that.hunterjobList = [].concat(_toConsumableArray(that.hunterjobList), _toConsumableArray(json.data.data.list));
                                        that.jobNum = json.data.data.num;
                                        that.totalJobPage = parseInt(json.data.data.num / 10);
                                        that.isJobEmpty = false;
                                        // console.log("查找职位", "isShowCorpList", that.isShowCorpList, "isShowJobList", that.isShowJobList, "isJobEmpty", that.isJobEmpty, "isCorpEmpty", that.isCorpEmpty);
                                    }
                                    that.$apply();
                                    that.showLoading = false;
                                } else {
                                    _tip2.default.error(json.data.returnMsg);
                                }

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function doPosiSearch(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return doPosiSearch;
        }()

        //查找公司(已登录)

    }, {
        key: 'doCorpSearch',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(keyword, currentPage) {
                var that, region_name, json, userSpecialInfo;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                that = this;
                                region_name = '';

                                if (that.city == '全国' || that.areaid[that.indexRegion] == '全部') {
                                    region_name = '';
                                } else {
                                    region_name = that.areaid[that.indexRegion] || that.city;
                                }
                                _context2.next = 5;
                                return _api2.default.searchCorp({
                                    query: {
                                        head: {
                                            "transcode": "I0002",
                                            "type": "h"
                                        },
                                        data: {
                                            token: that.loginInfo.token,
                                            tokenKey: that.loginInfo.tokenKey,
                                            p: currentPage || "1",
                                            keywork: that.keyword,
                                            city: region_name,
                                            industry: that.industryid[that.indexIndustry] || "",
                                            nature: that.nature[that.indexNature] || ""
                                        }
                                    }
                                });

                            case 5:
                                json = _context2.sent;

                                if (json.data.returnCode == "AAAAAAA") {
                                    if (json.data.data.num == 0) {
                                        // tip.toast('搜索结果为空');
                                        that.isCorpEmpty = true; //暂无数据
                                        that.corpNum = 0;
                                    } else {
                                        userSpecialInfo = wx.getStorageSync(_constants.USER_OPERATE_INFO) || {};

                                        if (that.keywordhisList.indexOf(keyword) == -1) {
                                            that.keywordhisList.push(keyword);
                                            userSpecialInfo.keywordhisList = that.keywordhisList;
                                            wx.setStorageSync(_constants.USER_OPERATE_INFO, userSpecialInfo);
                                        }
                                        that.corplist = [].concat(_toConsumableArray(that.corplist), _toConsumableArray(json.data.data.list));
                                        that.corpNum = json.data.data.num;
                                        that.totalCorpPage = parseInt(json.data.data.num / 10);
                                        that.isCorpEmpty = false;
                                        // console.log("查找公司", "isShowCorpList", that.isShowCorpList, "isShowJobList", that.isShowJobList, "isCorpEmpty", that.isCorpEmpty, "isJobEmpty", that.isJobEmpty);
                                    }
                                    that.$apply();
                                    that.showLoading = false;
                                } else {
                                    _tip2.default.error(json.data.returnMsg);
                                }

                            case 7:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function doCorpSearch(_x3, _x4) {
                return _ref3.apply(this, arguments);
            }

            return doCorpSearch;
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

            function getDictData(_x5) {
                return _ref4.apply(this, arguments);
            }

            return getDictData;
        }()

        //刷新数据

    }, {
        key: 'refreshListData',
        value: function refreshListData() {
            var that = this;
            var keyword = that.keyword;
            that.isShowJobList && that.doPosiSearch(keyword);
            that.isShowCorpList && that.doCorpSearch(keyword);
            that.hunterjobList = [];
            that.corplist = [];
        }
    }]);

    return SearchPage;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(SearchPage , 'pages/search/search'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJwZW9TZWFyY2giLCJyZXF1aXJlIiwicmVnaW9ucyIsIlNlYXJjaFBhZ2UiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImlzU2hvd0NpdHkiLCJpc1VuZGVyU2VhcmNoIiwia2V5d29yZCIsImh1bnRlcmpvYkxpc3QiLCJjb3JwbGlzdCIsImNpdHkiLCJrZXl3b3JkaGlzTGlzdCIsImlzU2hvd0pvYkxpc3QiLCJpc1Nob3dDb3JwTGlzdCIsInNob3dMb2FkaW5nIiwiaXNKb2JFbXB0eSIsImlzQ29ycEVtcHR5IiwiY3VycmVudFBhZ2UiLCJ0b3RhbEpvYlBhZ2UiLCJ0b3RhbENvcnBQYWdlIiwiZGljdGlvbmFyeUxpc3QiLCJhcmVhaWQiLCJpbmR1c3RyeWlkIiwicHVibGljZGF0ZSIsIm5hdHVyZSIsImluZGV4UmVnaW9uIiwiaW5kZXhJbmR1c3RyeSIsImluZGV4UHVibGljIiwiaW5kZXhOYXR1cmUiLCJhcmVhaWRTdGF0dXMiLCJpbmR1c3RyeWlkU3RhdHVzIiwicHVibGljZGF0ZVN0YXR1cyIsIm5hdHVyZVN0YXR1cyIsImlzU2hvd0NpdHlOYW1lIiwibG9naW5JbmZvIiwiam9iTnVtIiwiY29ycE51bSIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInNlYXJjaCIsImNpdHlsaXN0IiwiY29tbXBvc2kiLCJib3R0b21sb2FkbW9yZSIsIm1ldGhvZHMiLCJlbXB0eSIsInRoYXQiLCJ3eCIsInJlbW92ZVN0b3JhZ2UiLCJrZXkiLCJzdWNjZXNzIiwicmVzIiwicGFyZW50U2VhcmNoRm4iLCJ2YWwiLCJkb1Bvc2lTZWFyY2giLCJkb0NvcnBTZWFyY2giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJtYXNrIiwiZHVyYXRpb24iLCJjb25zb2xlIiwibG9nIiwicGFyZW50VHJTaG93Q2l0eUZuIiwicGFyZW50VW5kZXJTZWFyY2hGbiIsInBhcmVudENpdHlOYW1lRm4iLCJsZW5ndGgiLCJzdWJzdHJpbmciLCIkaW52b2tlIiwic2VsSGlzS2V5V29yZEZuIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImhpcyIsImRlbEhpc0NlbGxGbiIsImRlbCIsInVzZXJTcGVjaWFsSW5mbyIsImdldFN0b3JhZ2VTeW5jIiwiaXRlbSIsImluZGV4Iiwic2V0U3RvcmFnZVN5bmMiLCJzZWxQZW9CYWRnZUZuIiwidGFyZ2V0IiwicGVvQmFkZ2UiLCJ0ckpvYkxpc3RGbiIsInRyQ29ycExpc3RGbiIsImJpbmRSZWdpb25DaGFuZ2UiLCJkZXRhaWwiLCJ2YWx1ZSIsInJlZnJlc2hMaXN0RGF0YSIsImJpbmRJbmR1c3RyeUNoYW5nZSIsImJpbmRQdWJsaWNDaGFuZ2UiLCJiaW5kTmF0dXJlQ2hhbmdlIiwib3B0aW9ucyIsImpvYm5hbWUiLCJ1bmRlZmluZWQiLCIkYXBwbHkiLCJmb3JFYWNoIiwiZ2V0RGljdERhdGEiLCJ0aGVuIiwianNvbiIsInJldHVybkNvZGUiLCJhcnIiLCJwdXNoIiwibGFiZWwiLCJlcnJvciIsInJldHVybk1zZyIsInByZXZlbnRSZXBlYXRSZXVxZXN0IiwicmVnaW9uX25hbWUiLCJnZXRDb21wYW55am9iIiwicXVlcnkiLCJoZWFkIiwicGFnZU5vIiwibnVtIiwiaW5kZXhPZiIsInNoaWZ0IiwibGlzdCIsInBhcnNlSW50Iiwic2VhcmNoQ29ycCIsInRva2VuIiwidG9rZW5LZXkiLCJwIiwia2V5d29yayIsImluZHVzdHJ5IiwiZ3JvdXBjb2RlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFlBQVlDLFFBQVEsOEJBQVIsQ0FBbEI7QUFDQSxJQUFPQyxVQUFVRCxRQUFRLHFCQUFSLENBQWpCOztJQUdxQkUsVTs7Ozs7Ozs7Ozs7Ozs7a01BRWpC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QUtsQyxjQUFMLElBQXFCa0MsS0FBS1MsWUFBTCxDQUFrQmpELE9BQWxCLENBQXJCO0FBQ0F3QyxpQkFBS3ZDLGFBQUwsR0FBcUIsRUFBckI7QUFDQXVDLGlCQUFLdEMsUUFBTCxHQUFnQixFQUFoQjtBQUNIOzs7O0VBN1ltQyxlQUFLcUgsSTs7a0JBQXhCN0gsVSIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XHJcbmltcG9ydCB7VVNFUl9PUEVSQVRFX0lORk8sIExPR0lOX0lORk99IGZyb20gJy4uLy4uL3V0aWxzL2NvbnN0YW50cyc7XHJcbmltcG9ydCB0aXAgZnJvbSAnLi4vLi4vdXRpbHMvdGlwJztcclxuaW1wb3J0IFNlYXJjaCBmcm9tICcuLi8uLi9jb21wb25lbnRzL3NlYXJjaCc7XHJcbmltcG9ydCBDaXR5TGlzdCBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NpdHlsaXN0JztcclxuaW1wb3J0IENvbW1Qb3NpIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbXBvc2knO1xyXG5pbXBvcnQgQ29ycExpc3QgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb3JwbGlzdCc7XHJcbmltcG9ydCBCb3R0b21Mb2FkTW9yZSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9ib3R0b21sb2FkbW9yZVwiO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnbG9kYXNoJztcclxuY29uc3QgcGVvU2VhcmNoID0gcmVxdWlyZSgnLi4vLi4vZGF0YS9wZW9zZWFyY2gtZGF0YS5qcycpO1xyXG5jb25zdCAgcmVnaW9ucyA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL3JlZ2lvbnMnKTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hQYWdlIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuXHJcbiAgICBjb25maWc9e1xyXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKInLFxyXG4gICAgfVxyXG5cclxuICAgIGRhdGE9e1xyXG4gICAgICAgIGlzU2hvd0NpdHk6IGZhbHNlLFxyXG4gICAgICAgIGlzVW5kZXJTZWFyY2g6IGZhbHNlLCAgICAgICAvL+aYr+WQpuWcqOaQnOe0oueKtuaAgVxyXG4gICAgICAgIGtleXdvcmQ6ICcnLCAgICAvL+i+k+WFpeWtl+autVxyXG4gICAgICAgIGh1bnRlcmpvYkxpc3Q6IFtdLCAgICAgICAvL+acjeWKoeWZqOi/lOWbnlxyXG4gICAgICAgIGNvcnBsaXN0OiBbXSxcclxuICAgICAgICBwZW9TZWFyY2g6IHBlb1NlYXJjaCxcclxuICAgICAgICBjaXR5OiAnJyxcclxuICAgICAgICBrZXl3b3JkaGlzTGlzdDogW10sXHJcbiAgICAgICAgaXNTaG93Sm9iTGlzdDogZmFsc2UsXHJcbiAgICAgICAgaXNTaG93Q29ycExpc3Q6IGZhbHNlLFxyXG4gICAgICAgIHNob3dMb2FkaW5nOiBmYWxzZSxcclxuICAgICAgICBpc0pvYkVtcHR5OiBmYWxzZSxcclxuICAgICAgICBpc0NvcnBFbXB0eTogZmFsc2UsXHJcbiAgICAgICAgY3VycmVudFBhZ2U6IDEsICAgLy/lvZPliY3pobXpnaJcclxuICAgICAgICB0b3RhbEpvYlBhZ2U6IDAsICAgIC8v5oC75pWwXHJcbiAgICAgICAgdG90YWxDb3JwUGFnZTogMCxcclxuICAgICAgICByZWdpb25zOiByZWdpb25zLFxyXG4gICAgICAgIGRpY3Rpb25hcnlMaXN0OiBbXCJESUNUX0NPTVBfQ0lUWVwiLCBcIkRJQ1RfQ09NUF9JTkRVU1RSWVwiLCBcIkRJQ1RfSk9CX1BVQl9EQVRFXCIsIFwiRElDVF9DT01QX05BVFVSRVwiXSxcclxuICAgICAgICBhcmVhaWQ6IFtdLFxyXG4gICAgICAgIGluZHVzdHJ5aWQ6IFtdLFxyXG4gICAgICAgIHB1YmxpY2RhdGU6IFtdLFxyXG4gICAgICAgIG5hdHVyZTogW10sXHJcbiAgICAgICAgaW5kZXhSZWdpb246IFwiXCIsXHJcbiAgICAgICAgaW5kZXhJbmR1c3RyeTogXCJcIixcclxuICAgICAgICBpbmRleFB1YmxpYzogXCJcIixcclxuICAgICAgICBpbmRleE5hdHVyZTogXCJcIixcclxuICAgICAgICBhcmVhaWRTdGF0dXM6IHRydWUsXHJcbiAgICAgICAgaW5kdXN0cnlpZFN0YXR1czogdHJ1ZSxcclxuICAgICAgICBwdWJsaWNkYXRlU3RhdHVzOiB0cnVlLFxyXG4gICAgICAgIG5hdHVyZVN0YXR1czogdHJ1ZSxcclxuICAgICAgICBpc1Nob3dDaXR5TmFtZTogdHJ1ZSxcclxuICAgICAgICBsb2dpbkluZm86IHt9LFxyXG4gICAgICAgIGpvYk51bTogMCxcclxuICAgICAgICBjb3JwTnVtOiAwXHJcbiAgICB9XHJcblxyXG4gICAkcmVwZWF0ID0ge1wiaHVudGVyam9iTGlzdFwiOntcImNvbVwiOlwiY29tbXBvc2lcIixcInByb3BzXCI6XCJzeW5jUG9zaWRhdGEuc3luY1wifSxcImNvcnBsaXN0XCI6e1wiY29tXCI6XCJjb3JwbGlzdFwiLFwicHJvcHNcIjpcInN5bmNDb3JwZGF0YS5zeW5jXCJ9fTtcclxuJHByb3BzID0ge1wiY29tbXBvc2lcIjp7XCJ2LWJpbmQ6c3luY1Bvc2lkYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJodW50ZXJqb2JMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwiaW5kZXhcIn19LFwiY29ycGxpc3RcIjp7XCJ2LWJpbmQ6c3luY0NvcnBkYXRhLnN5bmNcIjp7XCJ2YWx1ZVwiOlwiaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJjb3JwbGlzdFwiLFwiaXRlbVwiOlwiaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImluZGV4XCJ9fSxcInNlYXJjaFwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDppc1Nob3dDaXR5TmFtZS5zeW5jXCI6XCJpc1Nob3dDaXR5TmFtZVwifSxcImNpdHlsaXN0XCI6e1widi1iaW5kOmNpdHlTZWxlY3RlZC5zeW5jXCI6XCJjaXR5XCJ9LFwiYm90dG9tbG9hZG1vcmVcIjp7XCJ2LWJpbmQ6c3luY1Nob3cuc3luY1wiOlwic2hvd0xvYWRpbmdcIixcIm1lc3NhZ2VcIjpcIuato+WcqOWKoOi9vVwifX07XHJcbiRldmVudHMgPSB7XCJzZWFyY2hcIjp7XCJ2LW9uOnNlYXJjaEZuXCI6XCJwYXJlbnRTZWFyY2hGblwiLFwidi1vbjp0clNob3dDaXR5Rm5cIjpcInBhcmVudFRyU2hvd0NpdHlGblwiLFwidi1vbjp0clVuZGVyU2VhcmNoRm5cIjpcInBhcmVudFVuZGVyU2VhcmNoRm5cIn0sXCJjaXR5bGlzdFwiOntcInYtb246Y2l0eU5hbWVGblwiOlwicGFyZW50Q2l0eU5hbWVGblwifX07XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICAgIHNlYXJjaDogU2VhcmNoLFxyXG4gICAgICAgIGNpdHlsaXN0OiBDaXR5TGlzdCxcclxuICAgICAgICBjb21tcG9zaTogQ29tbVBvc2ksXHJcbiAgICAgICAgY29ycGxpc3Q6IENvcnBMaXN0LFxyXG4gICAgICAgIGJvdHRvbWxvYWRtb3JlOiBCb3R0b21Mb2FkTW9yZSxcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKG9wdGlvbnMpIHtcclxuICAgICAgICBpZihvcHRpb25zLmpvYm5hbWUhPT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgdGhpcy5pc1VuZGVyU2VhcmNoPXRydWU7XHJcbiAgICAgICAgICB0aGlzLmlzU2hvd0pvYkxpc3Q9dHJ1ZTtcclxuICAgICAgICAgIHRoaXMua2V5d29yZD1vcHRpb25zLmpvYm5hbWVcclxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgICAgIHRoaXMuZG9Qb3NpU2VhcmNoKG9wdGlvbnMuam9ibmFtZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sb2dpbkluZm8gPSAgd3guZ2V0U3RvcmFnZVN5bmMoTE9HSU5fSU5GTykgfHwge307XHJcbiAgICAgICAgbGV0IHVzZXJTcGVjaWFsSW5mbyA9IHd4LmdldFN0b3JhZ2VTeW5jKFVTRVJfT1BFUkFURV9JTkZPKSB8fCB7fTtcclxuICAgICAgICBpZiAodXNlclNwZWNpYWxJbmZvLmNpdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaXR5ID0gdXNlclNwZWNpYWxJbmZvLmNpdHk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jaXR5ID0gJ+WFqOWbvSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHVzZXJTcGVjaWFsSW5mby5rZXl3b3JkaGlzTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmtleXdvcmRoaXNMaXN0ID0gdXNlclNwZWNpYWxJbmZvLmtleXdvcmRoaXNMaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyDojrflj5bmlbDmja7lrZflhbhcclxuICAgICAgICB0aGF0LmRpY3Rpb25hcnlMaXN0LmZvckVhY2goKGl0ZW0saW5kZXgpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChpdGVtKXtcclxuICAgICAgICAgICAgY2FzZSBcIkRJQ1RfQ09NUF9DSVRZXCI6Ly8g5Z+O5biCXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldERpY3REYXRhKGl0ZW0pLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnIgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqc29uLmRhdGEuZGF0YS5mb3JFYWNoKChpdGVtLGluZGV4KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hcmVhaWQgPSBhcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRJQ1RfQ09NUF9JTkRVU1RSWVwiOi8vIOacn+acm+ihjOS4mlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWN0RGF0YShpdGVtKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gW11cclxuICAgICAgICAgICAgICAgICAgICAgICAganNvbi5kYXRhLmRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW5kdXN0cnlpZCA9IGFycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLnJldHVybk1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiRElDVF9KT0JfUFVCX0RBVEVcIjovLyDlj5HluIPml7bpl7RcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGljdERhdGEoaXRlbSkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoanNvbi5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzb24uZGF0YS5kYXRhLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtLmxhYmVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnB1YmxpY2RhdGUgPSBhcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlwLmVycm9yKGpzb24uZGF0YS5yZXR1cm5Nc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIkRJQ1RfQ09NUF9OQVRVUkVcIjovL+S8geS4muaAp+i0qFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWN0RGF0YShpdGVtKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqc29uLmRhdGEucmV0dXJuQ29kZSA9PSBcIkFBQUFBQUFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gW11cclxuICAgICAgICAgICAgICAgICAgICAgICAganNvbi5kYXRhLmRhdGEuZm9yRWFjaCgoaXRlbSxpbmRleCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0ubGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF0dXJlID0gYXJyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpcC5lcnJvcihqc29uLmRhdGEucmV0dXJuTXNnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzPXtcclxuICAgICAgICBlbXB0eSgpeyAvL+a4heepuuaQnOe0ouWOhuWPsuiusOW9lVxyXG4gICAgICAgICAgdmFyIHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICB3eC5yZW1vdmVTdG9yYWdlKHtcclxuICAgICAgICAgICAga2V5OiAndXNlclNwZWNpYWxJbmZvJyxcclxuICAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcclxuICAgICAgICAgICAgICB0aGF0LmtleXdvcmRoaXNMaXN0PVtdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJlbnRTZWFyY2hGbih2YWwpIHsgLy/mkJzntKLlhbPplK7lrZdcclxuICAgICAgICAgICAgdGhpcy5pc1VuZGVyU2VhcmNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5rZXl3b3JkID0gdmFsO1xyXG4gICAgICAgICAgICB0aGlzLmRvUG9zaVNlYXJjaCh2YWwpO1xyXG4gICAgICAgICAgICB0aGlzLmRvQ29ycFNlYXJjaCh2YWwpO1xyXG4gICAgICAgICAgICB0aGlzLmh1bnRlcmpvYkxpc3QgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5jb3JwbGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5Yqg6L295LitXCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImxvYWRpbmdcIixcclxuICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2YWwpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJlbnRUclNob3dDaXR5Rm4odmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTaG93Q2l0eSA9IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhcmVudFVuZGVyU2VhcmNoRm4odmFsKXsvL+a4heepuuaQnOe0ouahhuWGheWuueWQju+8jOS4jeWcqOaQnOe0oueKtuaAgVxyXG4gICAgICAgICAgICB0aGlzLmlzVW5kZXJTZWFyY2ggPSB2YWw7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTaG93Sm9iTGlzdCA9IHZhbDtcclxuICAgICAgICAgICAgdGhpcy5pc1Nob3dDb3JwTGlzdCA9IHZhbDtcclxuICAgICAgICAgICAgdGhpcy5pc1Nob3dDaXR5TmFtZSA9IHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJlbnRDaXR5TmFtZUZuKHZhbCl7XHJcbiAgICAgICAgICAgIGlmKHZhbC5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwuc3Vic3RyaW5nKDAsIDMpICsgXCIuLi5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiRpbnZva2UoJ3NlYXJjaCcsICdzZXRDaXR5Rm4nLCB2YWwpO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd0NpdHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jaXR5ID0gdmFsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsSGlzS2V5V29yZEZuKGV2ZW50KXtcclxuICAgICAgICAgICAgdGhpcy4kaW52b2tlKCdzZWFyY2gnLCAnc2V0U2VhcmNoSW5wdXRGbicsIGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5oaXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsSGlzQ2VsbEZuKGV2ZW50KXtcclxuICAgICAgICAgICAgbGV0IGRlbCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5kZWw7XHJcbiAgICAgICAgICAgIGxldCB1c2VyU3BlY2lhbEluZm8gPSB3eC5nZXRTdG9yYWdlU3luYyhVU0VSX09QRVJBVEVfSU5GTykgfHwge307XHJcbiAgICAgICAgICAgIHRoaXMua2V5d29yZGhpc0xpc3QgPSBmaWx0ZXIodXNlclNwZWNpYWxJbmZvLmtleXdvcmRoaXNMaXN0LCAoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtICE9IGRlbDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHVzZXJTcGVjaWFsSW5mby5rZXl3b3JkaGlzTGlzdCA9IHRoaXMua2V5d29yZGhpc0xpc3Q7XHJcbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFVTRVJfT1BFUkFURV9JTkZPLCB1c2VyU3BlY2lhbEluZm8pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VsUGVvQmFkZ2VGbihldmVudCl7XHJcbiAgICAgICAgICAgIHRoaXMuJGludm9rZSgnc2VhcmNoJywgJ3NldFNlYXJjaElucHV0Rm4nLCBldmVudC50YXJnZXQuZGF0YXNldC5wZW9CYWRnZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ckpvYkxpc3RGbihldmVudCl7Ly/mmL7npLrogYzkvY1cclxuICAgICAgICAgICAgdGhpcy5pc1Nob3dKb2JMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5pc1Nob3dDb3JwTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd0NpdHlOYW1lID0gZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ckNvcnBMaXN0Rm4oZXZlbnQpey8v5pi+56S65YWs5Y+4XHJcbiAgICAgICAgICAgIHRoaXMuaXNTaG93Q29ycExpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd0pvYkxpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pc1Nob3dDaXR5TmFtZSA9IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZFJlZ2lvbkNoYW5nZShldmVudCl7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYWlkU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXhSZWdpb24gPSBldmVudC5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2l0eSA9IHRoaXMuYXJlYWlkW3RoaXMuaW5kZXhSZWdpb25dOyAgLy8/Pz9cclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoTGlzdERhdGEoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJpbmRJbmR1c3RyeUNoYW5nZShldmVudCl7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kdXN0cnlpZFN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4SW5kdXN0cnkgPSBldmVudC5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaExpc3REYXRhKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBiaW5kUHVibGljQ2hhbmdlKGV2ZW50KXtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHVibGljZGF0ZVN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4UHVibGljID0gZXZlbnQuZGV0YWlsLnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hMaXN0RGF0YSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmluZE5hdHVyZUNoYW5nZShldmVudCl7XHJcbiAgICAgICAgICAgIHRoaXMubmF0dXJlU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXhOYXR1cmUgPSBldmVudC5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaExpc3REYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIG9uUmVhY2hCb3R0b20oZXZlbnQpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC5zaG93TG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgaWYodGhhdC5pc1Nob3dKb2JMaXN0KSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoYXQudG90YWxKb2JQYWdlICsgXCI9PT1cIiArIHRoYXQuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgICAgICAvL+WIpOaWreaAu+mhteaVsOaYr+WQpuWkp+S6jue/u+mhteaVsFxyXG4gICAgICAgICAgICBpZiAoKHRoYXQudG90YWxKb2JQYWdlKSA+IHRoYXQuY3VycmVudFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY3VycmVudFBhZ2UrKztcclxuICAgICAgICAgICAgICAgIHRoYXQuZG9Qb3NpU2VhcmNoKHRoYXQua2V5d29yZCwgdGhhdC5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhhdC5pc1Nob3dDb3JwTGlzdCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGF0LnRvdGFsQ29ycFBhZ2UgKyBcIj09PVwiICsgdGhhdC5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgICAgIC8v5Yik5pat5oC76aG15pWw5piv5ZCm5aSn5LqO57+76aG15pWwXHJcbiAgICAgICAgICAgIGlmICgodGhhdC50b3RhbENvcnBQYWdlKSA+IHRoYXQuY3VycmVudFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgIC8v6Ziy5q2i6YeN5aSN5Yqg6L29XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5wcmV2ZW50UmVwZWF0UmV1cWVzdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY3VycmVudFBhZ2UrKztcclxuICAgICAgICAgICAgICAgIHRoYXQuZG9Db3JwU2VhcmNoKHRoYXQua2V5d29yZCwgdGhhdC5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnByZXZlbnRSZXBlYXRSZXVxZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v6IGM5L2N5pCc57SiXHJcbiAgICBhc3luYyBkb1Bvc2lTZWFyY2goa2V5d29yZCwgY3VycmVudFBhZ2UpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBsZXQgcmVnaW9uX25hbWUgPSAnJ1xyXG4gICAgICAgIGlmICh0aGF0LmNpdHkgPT0gJ+WFqOWbvScgfHwgdGhhdC5hcmVhaWRbdGhhdC5pbmRleFJlZ2lvbl0gPT0gJ+WFqOmDqCcgKSB7XHJcbiAgICAgICAgICAgIHJlZ2lvbl9uYW1lID0gJyc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVnaW9uX25hbWUgPSB0aGF0LmFyZWFpZFt0aGF0LmluZGV4UmVnaW9uXSB8fCB0aGF0LmNpdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuZ2V0Q29tcGFueWpvYih7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJRMDAwMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHBhZ2VObzogY3VycmVudFBhZ2UgfHwgXCIxXCIsXHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkOiB0aGF0LmtleXdvcmQsXHJcbiAgICAgICAgICAgICAgICBhcmVhaWQ6IHJlZ2lvbl9uYW1lLFxyXG4gICAgICAgICAgICAgICAgaW5kdXN0cnlpZDogdGhhdC5pbmR1c3RyeWlkW3RoYXQuaW5kZXhJbmR1c3RyeV0gfHwgXCJcIixcclxuICAgICAgICAgICAgICAgIHB1YmxpY2RhdGU6IHRoYXQucHVibGljZGF0ZVt0aGF0LmluZGV4UHVibGljXSB8fCBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoanNvbi5kYXRhLnJldHVybkNvZGUgPT0gXCJBQUFBQUFBXCIpIHtcclxuICAgICAgICAgICAgaWYgKGpzb24uZGF0YS5kYXRhLm51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB0aXAudG9hc3QoJ+aQnOe0oue7k+aenOS4uuepuicpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc0pvYkVtcHR5ID0gdHJ1ZTsgIC8v5pqC5peg5pWw5o2uXHJcbiAgICAgICAgICAgICAgICB0aGF0LmpvYk51bSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoVVNFUl9PUEVSQVRFX0lORk8pIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5rZXl3b3JkaGlzTGlzdC5pbmRleE9mKGtleXdvcmQpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5rZXl3b3JkaGlzTGlzdC5wdXNoKGtleXdvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoYXQua2V5d29yZGhpc0xpc3QubGVuZ3RoPjgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhhdC5rZXl3b3JkaGlzTGlzdC5zaGlmdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJTcGVjaWFsSW5mby5rZXl3b3JkaGlzTGlzdCA9ICB0aGF0LmtleXdvcmRoaXNMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQua2V5d29yZGhpc0xpc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoVVNFUl9PUEVSQVRFX0lORk8sIHVzZXJTcGVjaWFsSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0Lmh1bnRlcmpvYkxpc3QgPSBbLi4udGhhdC5odW50ZXJqb2JMaXN0LCAuLi5qc29uLmRhdGEuZGF0YS5saXN0XTtcclxuICAgICAgICAgICAgICAgIHRoYXQuam9iTnVtID0ganNvbi5kYXRhLmRhdGEubnVtO1xyXG4gICAgICAgICAgICAgICAgdGhhdC50b3RhbEpvYlBhZ2UgPXBhcnNlSW50KGpzb24uZGF0YS5kYXRhLm51bSAvIDEwKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNKb2JFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmn6Xmib7ogYzkvY1cIiwgXCJpc1Nob3dDb3JwTGlzdFwiLCB0aGF0LmlzU2hvd0NvcnBMaXN0LCBcImlzU2hvd0pvYkxpc3RcIiwgdGhhdC5pc1Nob3dKb2JMaXN0LCBcImlzSm9iRW1wdHlcIiwgdGhhdC5pc0pvYkVtcHR5LCBcImlzQ29ycEVtcHR5XCIsIHRoYXQuaXNDb3JwRW1wdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHRoYXQuc2hvd0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLnJldHVybk1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5p+l5om+5YWs5Y+4KOW3sueZu+W9lSlcclxuICAgIGFzeW5jIGRvQ29ycFNlYXJjaChrZXl3b3JkLCBjdXJyZW50UGFnZSkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGxldCByZWdpb25fbmFtZSA9ICcnO1xyXG4gICAgICAgIGlmICh0aGF0LmNpdHkgPT0gJ+WFqOWbvScgfHwgdGhhdC5hcmVhaWRbdGhhdC5pbmRleFJlZ2lvbl0gPT0gJ+WFqOmDqCcgKSB7XHJcbiAgICAgICAgICAgIHJlZ2lvbl9uYW1lID0gJyc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVnaW9uX25hbWUgPSB0aGF0LmFyZWFpZFt0aGF0LmluZGV4UmVnaW9uXSB8fCB0aGF0LmNpdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGpzb24gPSBhd2FpdCBhcGkuc2VhcmNoQ29ycCh7XHJcbiAgICAgICAgcXVlcnk6IHtcclxuICAgICAgICAgICAgaGVhZDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0cmFuc2NvZGVcIjogXCJJMDAwMlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiaFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHRva2VuOiB0aGF0LmxvZ2luSW5mby50b2tlbixcclxuICAgICAgICAgICAgICAgIHRva2VuS2V5OiB0aGF0LmxvZ2luSW5mby50b2tlbktleSxcclxuICAgICAgICAgICAgICAgIHA6IGN1cnJlbnRQYWdlIHx8IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAga2V5d29yazogdGhhdC5rZXl3b3JkLFxyXG4gICAgICAgICAgICAgICAgY2l0eTogcmVnaW9uX25hbWUsXHJcbiAgICAgICAgICAgICAgICBpbmR1c3RyeTogdGhhdC5pbmR1c3RyeWlkW3RoYXQuaW5kZXhJbmR1c3RyeV0gfHwgXCJcIixcclxuICAgICAgICAgICAgICAgIG5hdHVyZTogdGhhdC5uYXR1cmVbdGhhdC5pbmRleE5hdHVyZV0gfHwgXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKGpzb24uZGF0YS5yZXR1cm5Db2RlID09IFwiQUFBQUFBQVwiKSB7XHJcbiAgICAgICAgICAgIGlmIChqc29uLmRhdGEuZGF0YS5udW0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gdGlwLnRvYXN0KCfmkJzntKLnu5PmnpzkuLrnqbonKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNDb3JwRW1wdHkgPSB0cnVlOyAgLy/mmoLml6DmlbDmja5cclxuICAgICAgICAgICAgICAgIHRoYXQuY29ycE51bSA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlclNwZWNpYWxJbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoVVNFUl9PUEVSQVRFX0lORk8pIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgaWYodGhhdC5rZXl3b3JkaGlzTGlzdC5pbmRleE9mKGtleXdvcmQpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5rZXl3b3JkaGlzTGlzdC5wdXNoKGtleXdvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJTcGVjaWFsSW5mby5rZXl3b3JkaGlzTGlzdCA9ICB0aGF0LmtleXdvcmRoaXNMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFVTRVJfT1BFUkFURV9JTkZPLCB1c2VyU3BlY2lhbEluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5jb3JwbGlzdCA9IFsuLi50aGF0LmNvcnBsaXN0LCAuLi5qc29uLmRhdGEuZGF0YS5saXN0XTtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29ycE51bSA9IGpzb24uZGF0YS5kYXRhLm51bTtcclxuICAgICAgICAgICAgICAgIHRoYXQudG90YWxDb3JwUGFnZSA9cGFyc2VJbnQoanNvbi5kYXRhLmRhdGEubnVtIC8gMTApO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc0NvcnBFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLmn6Xmib7lhazlj7hcIiwgXCJpc1Nob3dDb3JwTGlzdFwiLCB0aGF0LmlzU2hvd0NvcnBMaXN0LCBcImlzU2hvd0pvYkxpc3RcIiwgdGhhdC5pc1Nob3dKb2JMaXN0LCBcImlzQ29ycEVtcHR5XCIsIHRoYXQuaXNDb3JwRW1wdHksIFwiaXNKb2JFbXB0eVwiLCB0aGF0LmlzSm9iRW1wdHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XHJcbiAgICAgICAgICAgIHRoYXQuc2hvd0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aXAuZXJyb3IoanNvbi5kYXRhLnJldHVybk1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5pWw5o2u5a2X5YW4XHJcbiAgICBhc3luYyBnZXREaWN0RGF0YShncm91cGNvZGUpIHtcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgYXBpLmdldERpY3REYXRhKHtcclxuICAgICAgICBxdWVyeToge1xyXG4gICAgICAgICAgICBoZWFkOiB7XHJcbiAgICAgICAgICAgICAgICBcInRyYW5zY29kZVwiOiBcIkRDMDAxXCIsXHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJoXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgXCJncm91cGNvZGVcIjogZ3JvdXBjb2RlLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxBbGxcIjogXCJ0cnVlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yi35paw5pWw5o2uXHJcbiAgICByZWZyZXNoTGlzdERhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgY29uc3Qga2V5d29yZCA9IHRoYXQua2V5d29yZDtcclxuICAgICAgICB0aGF0LmlzU2hvd0pvYkxpc3QmJnRoYXQuZG9Qb3NpU2VhcmNoKGtleXdvcmQpO1xyXG4gICAgICAgIHRoYXQuaXNTaG93Q29ycExpc3QmJnRoYXQuZG9Db3JwU2VhcmNoKGtleXdvcmQpO1xyXG4gICAgICAgIHRoYXQuaHVudGVyam9iTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoYXQuY29ycGxpc3QgPSBbXTtcclxuICAgIH1cclxufVxyXG4iXX0=