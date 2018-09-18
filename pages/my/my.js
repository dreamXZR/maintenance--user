var app = getApp();
var api = getApp().globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    getUserInfoFail: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  myinfo: function () {
    wx.navigateTo({
      url: '/pages/myinfo/myinfo'
    })
  },
  integral: function () {
    wx.navigateTo({
      url: '/pages/integral/integral'
    })
  },
  message: function () {
    wx.navigateTo({
      url: '/pages/message/message'
    })
  },
  record: function () {
    wx.navigateTo({
      url: '/pages/record/record'
    })
  },
  present:function(){
    wx.navigateTo({
      url: '/pages/present/present',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo) {
      
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            openid: res.userInfo.openId,
            hasUserInfo: true
          })
        }
      })
    }
    var that=this
    wx.request({
      url: api +'getUserInfo',
      method:'POST',
      data:{
        user_id:wx.getStorageSync('user_id')
      },
      success:function(res){
        that.setData({
          num: res.data.notification_count
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})