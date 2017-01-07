//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  listenSwiper:function(e) {
      //打印信息
      console.log(e)
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
