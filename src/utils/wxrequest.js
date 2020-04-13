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
                resolve(res)
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
