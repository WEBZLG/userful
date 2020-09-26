// pages/serviceType/serviceType.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    servecrList: [],
    phone: '',
    loading: true
  },
  // 类型切换
  onChange(event) {
    this.setData({
      activeKey: event.detail,
      loading: true
    })
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 1000);
  },
  // 详情
  onDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../serviceDetail/serviceDetail?id=' + id,
    })
  },
  // 获取列表
  getList() {
    let _this = this
    API.servicelList({}).then(res => {
      //console.log(res.data)
      _this.setData({
        servecrList: res.data.service_list,
        phone: res.data.service_mobile
      })
    })
  },
  // 打电话
  onPhone(e) {
    let phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type
    this.setData({
      activeKey: type
    })
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    setTimeout(() => {
      this.setData({
        loading: false
      })
    }, 1500);
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
  // onShareAppMessage: function () {

  // }
})