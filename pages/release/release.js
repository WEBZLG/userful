// pages/release/release.js
const API = require('../../utils/api');
const AREA = require('../../utils/area');
Array.prototype.delete = function (delIndex) {
  var temArray = [];
  for (var i = 0; i < this.length; i++) {
    if (i != delIndex) {
      temArray.push(this[i]);
    }
  }
  return temArray;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:API.IMG_BASE_URL,
    fileList: [],
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
    // 删除图片
    deleteImg(index) {
      console.log(index)
      let _this = this
      let idx = index.detail.index
      this.setData({
        fileList: _this.data.fileList.delete(idx)
      })
    },
    // 选择图片后本地地址
    afterRead(event) {
      console.log(event.detail.file)
      let _this = this
      this.setData({
        fileList: _this.data.fileList.concat(event.detail.file)
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