// pages/business/business.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    dataList: []
  },
  // 名片
  onCard(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../card/card?id='+id,
    })
  },
  // 商机详情
  onBusinessDetail() {
    wx.navigateTo({
      url: '../businessDetail/businessDetail',
    })
  },
  // 商机列表
  getList(page) {
    let _this = this
    API.businessList({
      page: page
    }).then(res => {
      console.log(res)
      if (page == 1) {
        _this.setData({
          dataList: res.data.users
        })
      } else {
        if (res.data.contents.length == 0) {
          _this.setData({
            page: _this.data.page - 1
          })
          wx.showToast({
            title: '无更多数据了~',
            iocn: "none"
          })
        } else {
          _this.setData({
            dataList: _this.concat(res.data.users)
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(1)
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
    this.setData({
      page:1
    })
    this.getList(1)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _this = this
    this.setData({
      page: _this.data.page * 1 + 1
    })
    this.getList(_this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})