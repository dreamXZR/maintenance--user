var app = getApp();
var api = getApp().globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  address: function () {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      servers: getApp().globalData.servers
    })
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
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo,
    })
    wx.request({
      url: api + 'getUserInfo',
      method: 'POST',
      data: {
        user_id: wx.getStorageSync('user_id')
      },
      success: function (res) {
        that.setData({
          point: res.data.point,
        })
      }
    });
    wx.request({
      url: api + 'presentList',
      success: function (res) {
        that.setData({
          items: res.data
        })
      }
    })
  },
  exchange: function (e) {
    wx.request({
      url: api + 'isExchange',
      method: 'POST',
      data: {
        present_id: e.currentTarget.dataset.id,
        user_id: wx.getStorageSync('user_id')
      },
      success: function (res) {
        if (res.data.status == 0) {
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        } else {
          wx.navigateTo({
            url: '/pages/address/address?present_id=' + e.currentTarget.dataset.id
          })
          
        }

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