// pages/service/service.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:API.IMG_BASE_URL,//图片路径
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    loading:true,
    iconNav: [{
        imgPath: '../../images/1.png',
        title: "工商财税",
        url: "../magic/magic"
      },
      {
        imgPath: '../../images/2.png',
        title: "人力资源",
        url: "../naming/naming"
      },
      {
        imgPath: '../../images/10.png',
        title: "知识产权",
        url: "../naming/naming"
      },
      {
        imgPath: '../../images/5.png',
        title: "税收筹划",
        url: "../naming/naming"
      },
      {
        imgPath: '../../images/8.png',
        title: "企业印刷",
        url: "../naming/naming"
      },
      {
        imgPath: '../../images/7.png',
        title: "办公家具",
        url: "../naming/naming"
      },
      {
        imgPath: '../../images/6.png',
        title: "查看更多",
        url: "../naming/naming"
      }
    ]
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
  onShareAppMessage: function () {

  }
})