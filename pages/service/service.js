// pages/service/service.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    loading: true,
    iconNav: [{
        imgPath: '../../images/1.png',
        title: "工商财税",
        id: 0
      },
      {
        imgPath: '../../images/2.png',
        title: "人力资源",
        id: 1
      },
      {
        imgPath: '../../images/10.png',
        title: "知识产权",
        id: 2
      },
      {
        imgPath: '../../images/8.png',
        title: "许可资质代办",
        id: 3
      },
      {
        imgPath: '../../images/3.png',
        title: "法律服务",
        id: 4
      }
    ]
  },
  // 跳转服务类型
  onServiceType(e) {
    let type = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../serviceType/serviceType?type='+type,
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
    this.setData({
      loading: false,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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
  onShareAppMessage: function (res) {
    var that = this;
    let code =  wx.getStorageSync('userInfo').p_code;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '商云社',
      path: '/page/home/home?p='+code
    }
  },
  onShareTimeline(res){
    return {
      title: '商云社'
    }
  }
})