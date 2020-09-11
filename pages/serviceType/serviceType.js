// pages/serviceType/serviceType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    iconNav: [{
      title: "工商财税",
      id: 0
    },
    {
      title: "人力资源",
      id: 1
    },
    {
      title: "知识产权",
      id: 2
    },
    {
      title: "税收筹划",
      id: 3
    },
  ]
  },
  // 类型切换
  onChange(event) {
    console.log(event)
  },
  // 详情
  onDetail(e){
    wx.navigateTo({
      url: '../serviceDetail/serviceDetail',
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