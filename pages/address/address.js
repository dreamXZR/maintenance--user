var app = getApp();
var api = getApp().globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      servers: getApp().globalData.servers,
      present_id: options.present_id
    })
    //礼物信息
    wx.request({
      url: api + 'presents/' + options.present_id,
      success:function(res){
        that.setData({
          gift_name:res.data.name,
          gift_point:res.data.point,
          gift_image:res.data.image
        })
      }
    })
    //兑换信息
    wx.request({
      url: api + 'user/' + wx.getStorageSync('user_id'),
      success:function(res){
        that.setData({
          name:res.data.name,
          phone:res.data.phone,
          address: res.data.province + res.data.city + res.data.area+res.data.address
        })
      }
    })
  },
  //积分兑换
  formSubmit: function (e) {
    var that = this;
    var form_data = e.detail.value; //提交信息
    if (form_data.name == '' || form_data.phone == '' || form_data.address == '') {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return false;
    }
    form_data.user_id = wx.getStorageSync('user_id');
    form_data.present_id=that.data.present_id;
    
    wx.request({
      url: api + 'exchange',
      method: 'POST',
      data: form_data,
      success: function (res) {
        if (res.data.status) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            success: function () {
              setTimeout(function () {
                wx.navigateBack({})
              }, 2000)
            }
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      }
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