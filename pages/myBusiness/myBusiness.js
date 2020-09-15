// pages/myBusiness/myBusiness.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    dataList: [],
    page: 1
  },
  onRelease() {
    wx.navigateTo({
      url: '../release/release',
    })
  },
  // 获取列表
  getList(page) {
    let _this = this
    API.myBusiness({
      page: page
    }).then(res => {
      console.log(res)
      if (page == 1) {
        _this.setData({
          dataList: res.data.business
        })
      } else {
        if (res.data.business.length == 0) {
          _this.setData({
            page: _this.data.page - 1
          })
          wx.showToast({
            title: '无更多数据了~',
            iocn: "none"
          })
        } else {
          _this.setData({
            dataList: _this.concat(res.data.business)
          })
        }
      }
    })
  },
  // 删除商机
  onDelete(e) {
    let _this = this
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '删除商机',
      content: '确定要删除该商机？',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          API.myBusinessDelete({
            id: id
          }).then(res => {
            wx.showToast({
              title: res.message,
            })
            setTimeout(() => {
              _this.onShow()
            }, 1000);
          })

        }
      }
    })
  },
  // 修改商机
  onChange(e){
    let item = e.currentTarget.dataset.item
    console.log(item)
    item = JSON.stringify(item)
    wx.navigateTo({
      url: '../release/release?item='+item,
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
    this.getList(1)
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
      page: 1
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