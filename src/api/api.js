import {
    wxRequest
} from '../utils/wxrequest';

// const apimall = 'http://192.168.1.242:8082/mobile';
const apimall = 'http://192.168.1.251:8089/mobile';

// const apimall = 'https://m.51jrq.com/mobile';
const apiGps = 'https://apis.map.qq.com/ws/geocoder/v1';

//得到首页banner图片列表
const getMobileHomeBanner = (params) => wxRequest(params, apimall + '/api/ad_show/getMobileHomeBanner');

//获取职位
const  getCompanyjob = (params) => wxRequest(params, apimall + '/api/companyjob');

//获取公司列表
const  getCompanyList = (params) => wxRequest(params, apimall + '/api/company');

//查找公司
const  searchCorp = (params) => wxRequest(params, apimall + '/api/imain');

//地址解析
const getCityName = (params) => wxRequest(params, apiGps + `/?address=${params.address}&key=RULBZ-ZPFRX-4XV4F-7NALT-RMEQV-Y3BVT`);

//获取小程序码
const getWxaCode = (params) => wxRequest(params, apimall + '/wx/createwxaqrcode');

//获取个人信息
const getPimg = (params) => wxRequest(params, apimall + '/api/pimg');

//图片转base64
const trBase64 = (params) => wxRequest(params, apimall + '/img/index');

//获取access_token
var getAccessToken = (params) => wxRequest(params, apimall + '/wx/get');

//获取我的收藏及投递记录
const  getCollectJob = (params) => wxRequest(params, apimall + '/api/persoanl');

// 获取简历信息
const  getResumeInfo = (params) => wxRequest(params, apimall + '/api/my');

// 获取数据字典数据
const  getDictData = (params) => wxRequest(params, apimall + '/api/dictionary');

// 用户登录
const  loginIn = (params) => wxRequest(params, apimall + '/api/login');

// 个人用户注册获取短信验证码
const  getVerifyCode = (params) => wxRequest(params, apimall + '/api/regphone');

// 修改头像
const  changeHeadImg = (params) => wxRequest(params, apimall + '/api/pimg');

// 导入简历
const  importResume = (params) => wxRequest(params, apimall + '/api/importResume');

// 找回密码
const  resetPassword = (params) => wxRequest(params, apimall + '/api/password_old');

// 简历投递流程
const  getProcessView = (params) => wxRequest(params, apimall + '/api/ai/deliveryprocess');

// 简历投递流程
const  getLoginCode = (params) => wxRequest(params, apimall + '/api/sendVerificationCode');

// 删除工作简历
const  delExperience = (params) => wxRequest(params, apimall + '/api/my');

// 附件简历预览
const  rfile = (params) => wxRequest(params, apimall + '/api/rfile');

const  interviewDetails = (params) => wxRequest(params, apimall + '/api/getInterviewDetail');



module.exports = {
    apimall,
    getMobileHomeBanner,
    getCompanyjob,
    searchCorp,
    getCompanyList,
    getCityName,
    getWxaCode,
    getPimg,
    trBase64,
    getAccessToken,
    getCollectJob,
    getResumeInfo,
    getDictData,
    loginIn,
    getVerifyCode,
    importResume,
    changeHeadImg,
    resetPassword,
    getProcessView,
    getLoginCode,
    delExperience,
    rfile,
    interviewDetails
}
