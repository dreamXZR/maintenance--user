
const app = getApp();
var api = getApp().globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    address: '',
    region: [],
    customItem: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    
  },
  
  //提交个人信息
  formSubmit: function (e) {
    var that = this;
    var form_data = e.detail.value; //提交信息
    if (form_data.name == '' || form_data.phone == '' || form_data.address == '') {
      wx.showToast({
        title: '请填写完整信息',
        icon:'none'
      })
      return false;
    }
    form_data.user_id = wx.getStorageSync('user_id');
    form_data.province = that.data.region[0];
    form_data.city = that.data.region[1];
    form_data.area = that.data.region[2];
    wx.request({
      url: api + 'setInfo',
      method: 'POST',
      data: form_data,
      success: function (res) {

        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }
    })

  },
  bindRegionChange: function (e) {

    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */

  onShow: function () {
    var that = this;
    wx.request({
      url: api + 'user/' + wx.getStorageSync('user_id'),
      success: function (res) {
        that.setData({
          name: res.data.name,
          phone: res.data.phone,
          address: res.data.address,
          region: [res.data.province, res.data.city, res.data.area]
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