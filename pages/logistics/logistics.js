const app = getApp();
var api = getApp().globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:[],
  },
  
  //提交物流信息
  formSubmit: function (e) {
    var that = this;
    var form_data = e.detail.value; //提交信息
    if (form_data.user_logi_number == '' || form_data.user_logi_phone == '' || that.data.tempFilePaths[0] == '') {
      wx.showToast({
        title: '请填写完整信息',
        icon:'none'
      })
      return false;
    }
    form_data.user_id = wx.getStorageSync('user_id');

    wx.uploadFile({
      url: api + 'orders',
      filePath: that.data.tempFilePaths[0],
      name: 'user_logi_receipt',
      formData: form_data,
      success: function (res) {
        var json = JSON.parse(res.data);
        if (json.status){
          wx.showToast({
            title: json.message,
            icon: 'none',
            success:function(){
              setTimeout(function(){
                wx.redirectTo({
                  url: '../index/index',
                })
              },2000)
            }
          })
        }else{
          wx.showToast({
            title: json.message,
            icon:'none'
          })
        }
        
      }

    });

  },
  //选择照片
  img_item: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        that.setData({
          ['tempFilePaths[' + e.target.id + ']']: res.tempFilePaths[0]
        })
      }
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