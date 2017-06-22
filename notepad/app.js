//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://tom.com/user/listUser',
            data: {
              code: res.code
            }
          })
        } else {
          console.log(res.errMsg);
        }
      },
      fail: function () {
        // 调用微信弹窗接口
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法正常使用******的功能体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      },
      complete: function() {
        console.log("login complete");
      }

    });
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})