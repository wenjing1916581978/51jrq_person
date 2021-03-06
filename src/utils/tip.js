/**
 * 提示与加载工具类
 */
export default class Tips {
    constructor() {
      this.isLoading = false;
    }
    /**
     * 弹出提示框
     */
  
    static success(title="成功", duration = 500) {
      setTimeout(() => {
        wx.showToast({
          title: title, 
          icon: "success",
          mask: true,
          duration: duration
        });
      }, 300);
      if (duration > 0) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, duration);
        });
      }
    }
  
    /**
     * 弹出确认窗口
     */
    static confirm(text, payload = {}, title = "提示") {
      return new Promise((resolve, reject) => {
        wx.showModal({
          title: title,
          content: text,
          showCancel: true,
          success: res => {
            if (res.confirm) {
              resolve(payload);
            } else if (res.cancel) {
              reject(payload);
            }
          },
          fail: res => {
            reject(payload);
          }
        });
      });
    }
  
    static toast(title="加载", onHide, icon = "success") {
      setTimeout(() => {
        wx.showToast({
          title: title,
          icon: icon,
          mask: true,
          duration: 500
        });
      }, 300);
  
      // 隐藏结束回调
      if (onHide) {
        setTimeout(() => {
          onHide();
        }, 500);
      }
    }
  
    /**
     * 警告框
     */
    static alert(title="警告") {
      wx.showToast({
        title: title,
        image: "/images/icons/alert.png",
        mask: true,
        duration: 1500
      });
    }
  
    /**
     * 错误框
     */
  
    static error(title="错误", onHide) {
      wx.showToast({
        title: title,
        icon: "none",
        mask: true,
        duration: 1500
      });
      // 隐藏结束回调
      if (onHide) {
        setTimeout(() => {
          onHide();
        }, 1500);
      }
    }
  
    /**
     * 弹出加载提示
     */
    static loading(title = "加载中") {
      if (Tips.isLoading) {
        return;
      }
      Tips.isLoading = true;
      wx.showLoading({
        title: title,
        mask: true
      });
    }
  
    /**
     * 加载完毕
     */
    static loaded() {
      if (Tips.isLoading) {
        Tips.isLoading = false;
        wx.hideLoading();
      }
    }
  
    static share(title, url, desc) {
      return {
        title: title,
        path: url,
        desc: desc,
        success: function(res) {
          Tips.toast("分享成功");
        }
      };
    }
  }
  
  /**
   * 静态变量，是否加载中
   */
  Tips.isLoading = false;
  