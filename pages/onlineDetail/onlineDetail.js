// pages/pubDetail/pubDetail.js
const API = require('../../utils/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:''
  },
  // 获取列表
  getDetail(id) {
    let _this = this
    API.articelDetail({},id).then(res => {
      //console.log(res)
      _this.setData({
        dataList:res.data.content
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.scene) {
      const scene = decodeURIComponent(options.scene)
      console.log(scene)
      let id = scene.split('&')[1].split('=')[1]
      this.getDetail(id)
      let code = scene.split('=')[1]
      wx.setStorageSync('p_code', code);
    }else{
      let id = options.id
      let code = options.p
      wx.setStorageSync('p_code', code);
      this.getDetail(id)
    }
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
  onShareAppMessage: function (res) {
    var that = this;
    let title = this.data.dataList.title
    let id = this.data.dataList.id
    let code =  wx.getStorageSync('userInfo').p_code;
    if(code==undefined){
      code=""
    }
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: title,
      path: '/pages/home/home?p='+code+'&id='+id
    }
  },
  onShareTimeline(res){
    let title = this.data.dataList.title
    let id = this.data.dataList.id
    let code =  wx.getStorageSync('userInfo').p_code;
    if(code==undefined){
      code=""
    }
    return {
      title: title,
      query: {
        p: code,
        id:id
      },
    }
  }
})