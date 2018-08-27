var api = getApp().globalData.api;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat: '39.906575',
    lng: '116.40289',
    markers: [],
    shoplist: [{ lat: 39.906575, lng: 116.40289 }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  index: function () {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  my: function () {
    wx.navigateTo({
      url: '/pages/my/my'
    })
  },
  schedule: function () {
    wx.navigateTo({
      url: '/pages/order-list/order-list'
    })
  },
  logistics: function () {
    wx.navigateTo({
      url: '/pages/logistics/logistics'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    this.mapCtx = wx.createMapContext('map');
    var that = this;
    if (!wx.getStorageSync('user_id')) {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      // 获取用户信息
      wx.request({
        url: api + 'getUserInfo',
        method: 'POST',
        data: {
          user_id: wx.getStorageSync('user_id'),
        },
        success: function (res) {
          getApp().globalData.userInfo = res.data
        }
      })
    }
  },
  reLocation: function () {
    //定位
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var res = res;
        var _lat = res.latitude;
        var _lng = res.longitude;
        // that.setData({
        //   lat: _lat,
        //   lng: _lng
        // });
      },
    });
  },
  openLocationByWeiXin:function(res){
   
    var index = res.markerId;
    //使用微信内置地图打开
    wx.openLocation({
      latitude: Number(this.data.markers[index].latitude),
      longitude: Number(this.data.markers[index].longitude),
      scale: 18,
      name: this.data.name,
      address: this.data.address
    })
  },
  setShopMarker: function (shop) {
    //在地图中标记出位置
    var that = this;
    var markersArr = new Array();
    for (var i = 0; i < shop.length; i++) {
      markersArr[i] = {
        iconPath: '/images/location.png',
        id: i,
        latitude: shop[i].lat,
        longitude: shop[i].lng,
        width: 32,
        height: 32,
        // callout: {
        //   content: "",
        //   color: "#ff0000",
        //   fontSize: "16",
        //   borderRadius: "10",
        //   bgColor: "#ffffff",
        //   padding: "10",
        //   boxShadow: '4px 8px 16px 0 rgba(0)',
        //   display: "ALWAYS"
        // }
      }
    }
    that.setData({
      markers: markersArr
    });
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    
    var that = this;
    
    wx.request({
      url: api + 'compayInfo',
      success: function (res) {
        var latitude = res.data.compay_info.latitude;
        var longitude = res.data.compay_info.longitude;
        that.setData({
          name: res.data.compay_info.name,
          address: res.data.compay_info.address,
          phone: res.data.compay_info.phone,
          lng: longitude,
          lat: latitude,
          shoplist: [{ lat:latitude, lng:longitude }]
        })
        that.reLocation();
        that.setShopMarker(that.data.shoplist);
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