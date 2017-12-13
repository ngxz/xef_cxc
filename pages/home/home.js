// pages/home/home.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderI:'../../img/order_i.png',
    goodsI:'../../img/goods_i.png',
    payI:'../../img/pay_i2.png',
    tableI:'../../img/table_i.png',
    codeI:'../../img/code_i2.png',
    manaI:'../../img/mana_i.png',
    boxI:'../../img/box_i.png',
    soI:'../../img/so_i.png',
    lineI:'../../img/line_03_01.png',
    date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
    zhangdan: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否登录
    var token = wx.getStorageSync('token');
    if(!token){
      wx.reLaunch({
        url: '../login/login'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //请求今日数据
    var that = this;
    wx.request({
      url: app.globalData.apiUrl+'/shopmall/getzhangdan',
      data: {
        token: wx.getStorageSync('token'),
        date: this.data.date,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          zhangdan: res.data,
        })
      }
    })
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