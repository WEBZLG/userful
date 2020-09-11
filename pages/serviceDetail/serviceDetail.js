// pages/serviceDetail/serviceDetail.js
const API = require('../../utils/api');
const AREA = require('../../utils/area');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    areaList: AREA.default,
    loading: true,
    areaText: '全国',
  },
  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onConfirm(e) {
    if (e.detail.values[0].code == '') {
      this.setData({
        areaText: '全国'
      })
    } else {
      this.setData({
        areaText: e.detail.values[1].name + e.detail.values[2].name
      })
    }
    this.onClose();
  },
  onClickButton() {

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