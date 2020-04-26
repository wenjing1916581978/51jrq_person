import wepy from 'wepy';
import tip from './tip'

const wxRequest = (params = {}, url) => {
    return new Promise(function (resolve, reject) {
        let data = params.query || {};
        wepy.request({
            url: url,
            method: params.method || 'POST',
            data: data,
            header: { 'Content-Type': 'application/json' },
            success: function(res) {
              console.log('回调',res)
              if(res.data.returnCode&&res.data.returnCode=="1000009"){
                wx.removeStorage({
                  key: 'loginData',
                  success (res) {
                    wx.navigateTo({
                      url: '/pages/login/login'
                    })
                  }
                })
                wx.removeStorageSync('login')
              }else{
                resolve(res)
              }

            },
            fail: function(err){
                reject(err)
            }
        });
    });
}

module.exports = {
    wxRequest
}
