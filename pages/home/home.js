// pages/home/home.js
const API = require('../../utils/api');
const AREA = require('../../utils/area');
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
    show:false,
    areaList:AREA.default,
    loading:true,
    areaText:'',
    iconNav: [{
        imgPath: '../../images/qy-server.png',
        title: "企业服务",
        url: "../magic/magic"
      },
      {
        imgPath: '../../images/fl-server.png',
        title: "法律服务",
        url: "../naming/naming"
      }
    ]
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onConfirm(e){
    this.setData({
      areaText:e.detail.values[1].name+e.detail.values[2].name
    })
    this.onClose();
  },
  // 获取轮播图
  getCarouselData() {
    let _this = this
    API.carousel({})
      .then(res => {
        console.log(res)
        _this.setData({
          background:res.data.carousels
        })
      })
  },
  onMagic(e) {
    let _this = this
    let userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    if(userInfo==''||userInfo==undefined){
      wx.redirectTo({
        url: '../login/login',
      })
    }else{
      API.isSignIn({},{uid:userInfo.user_id})
      .then(res => {
        if(res.message=='已登录'){
          wx.setStorageSync('loginToken', res.data.login_token);
          wx.setStorageSync('userInfo', res.data.user);
          let url = e.currentTarget.dataset.url
          wx.navigateTo({
            url: url
          })
        }else{
          wx.showToast({
            title: 'res.message',
            icon:"none"
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '../login/login',
            })
          }, 3000);
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCarouselData()//轮播
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
      selected: 0
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
