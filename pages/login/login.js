// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoIcon:'../../img/logo.png',
    comid:'',
    mobile:'',
    pwd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否登录
    var token = wx.getStorageSync('token');
    if (token) {
      wx.switchTab({
        url: '../home/home'
      })
    }
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
  
  },
  //用户输入数据
  comid:function(e){
    this.setData({
      comid:e.detail.value
    });
  },
  mobile: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  pwd: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  //点击登录
  login:function (){
    var that = this;
    wx.request({
      url: app.globalData.apiUrl +'/shoplogin/login',
      data:{
        comcode:this.data.comid,
        loginid:this.data.mobile,
        password:this.data.pwd,
        clienttype:4
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.status == 0) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          //储存token
          wx.setStorageSync('token', res.data.token);
          //跳转首页
          wx.reLaunch({
            url: '../home/home',
          })
        } else {
          wx.showModal({
            title: '登录失败',
            content: res.data.text
          })
        }
      }
    })
  }
})