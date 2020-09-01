// pages/my/my.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
  },

  // 退出登录
  onSignOut() {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function (sm) {
        if (sm.confirm) {
          let token = wx.getStorageSync('loginToken');
          API.signOut({
              user_id: _this.data.userInfo.user_id,
            },token)
            .then(res => {
              console.log(res)
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
              wx.clearStorage();
              setTimeout(() => {
                wx.reLaunch({
                  url: '../home/home',
                })
              }, 3000);
            })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 跳转登录页
  onLogin(){
    wx.redirectTo({
      url: '../login/login',
    })
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo
    })
    console.log(userInfo)
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
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