//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hidden: true,
    list: [
      {
        uuid: '123',
        title: '你好',
        text: '你好'
      },
      {
        uuid: '123',
        title: '你好',
        text: '你好'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  pullUpLoad: function (e) {
    console.log("上拉拉加载更多...." + this.data.page)

  },
  onPullDownRefresh: function (e) {
    console.log("下拉刷新....");    
    var that = this;
    that.setData({hidden:false})
    
    wx.request({
      url: 'https://tom.com/operation/getRecentlyNote',
      header: {

      },
      success: function(res) {

        that.setData({list:res.data, hidden: true })
        wx.stopPullDownRefresh();
      }
    })
  }
})
