var app = getApp()
Page({
  data: {
    status1:'正常',
    status2:'已下架',
    hiddenmodalput: true, //初始隐藏
    id:'',
    newPrice:'',
    classid:'22',
     token: ''
  },
  navbarTap: function (e) {
    var that = this;
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      classid: e.currentTarget.dataset.classid
    })
    //发送请求查询数据
    wx.request({
      url: app.globalData.apiUrl +'/shopmall/getgoodlist',
      data: {
        token: 'GBD-4-T8tE1CSJlf',
        classid: e.currentTarget.dataset.classid,
        status:'1'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res);
        that.setData({
          goodsList: res.data.list
        })
      }
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    //加载页面获取token
    var token = wx.getStorageSync('token');
    this.setData({
      token: token
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    //页面加载默认查询商品分类
    wx.request({
      url: app.globalData.apiUrl +'/shopmall/getclass',
      data:{
        token: this.data.token,
        status:'1'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          navbar: res.data.list,
          currentTab: 0
        })
      }
    })
    //加载页面默认发送请求查询未付款数据
    wx.request({
      url: app.globalData.apiUrl +'/shopmall/getgoodlist',
      data: {
        token: this.data.token,
        classid: '22',
        status:'1'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        that.setData({
          goodsList: res.data.list
        })
      }
    })
  },
  //修改商品上下架
  status:function(e){
    var that = this;
    //获取参数修改状态
    var is_ok = e.currentTarget.dataset.is_ok;
    var id = e.currentTarget.dataset.id
    if (is_ok == 0){
      is_ok = 1;
    }else{
      is_ok = 0;
    }
    wx.request({
      url: app.globalData.apiUrl +'/shopmall/editgoodstatus',
      data:{
        token: this.data.token,
        goodid:id,
        status:is_ok
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.data == 1){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          that.goods(that.data.classid);
        }else{
          wx.showToast({
            title: '修改失败',
            icon: 'faile',
            duration: 2000
          })
        }
      }
    })
  },
  // 修改价格
  changePrice:function(e){
    var id = e.currentTarget.dataset.id;
    var price = e.currentTarget.dataset.price;
    this.setData({
      hiddenmodalput: false, //显示模态
      id: id,
    })
  },
  //取消按钮  
    cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //输入价格后确认
  confirm: function () {
    var newPrice = this.data.newPrice;
    var goods_id = this.data.id;
    var that = this;
    this.setData({
      hiddenmodalput: true
    })
    wx.request({
      url: app.globalData.apiUrl +'/shopmall/editgoodprice',
      data: {
        token: this.data.token,
        goodid: goods_id,
        price: newPrice
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data == 1) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          that.goods(that.data.classid);
        } else {
          wx.showToast({
            title: '修改失败',
            icon: 'faile',
            duration: 2000
          })
        }

      }
    })
  },
  //新价格赋值
  newPrice: function (e) {
    this.setData({
      newPrice: e.detail.value
    })
  },
  onShow: function () {
    // console.log(this.data)
  },
  //查看单个商品的信息
  goodsInfo: function (goods_id){
    var that = this;
    wx.request({
      url: app.globalData.apiUrl +'/shopmall/getgoodinfo',
      data:{
        token: this.data.token,
        goodid: goods_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        that.setData({
          goodsList: res.data
        })
      }
    })
  },
  //根绝类别id查看商品列表
  goods:function (classid){
    var that = this;
    wx.request({
      url: app.globalData.apiUrl +'/shopmall/getgoodlist',
      data: {
        token: this.data.token,
        classid: classid,
        status: '1'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          goodsList: res.data.list
        })
      }
    })
  }
})
