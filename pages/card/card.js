// pages/card/card.js
const API = require('../../utils/api');
const { array } = require('../../utils/md5');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    content:''
  },
  // 商机详情
  // onBusinessDetail(){
  //   wx.navigateTo({
  //     url: '../businessDetail/businessDetail',
  //   })
  // },
  //图片预览事件
  imgView: function (e) {
    let _this = this
    let src = this.data.imgUrl+e.currentTarget.dataset.img[0];//获取data-src
    let imgList = e.currentTarget.dataset.img;//获取data-list
    let imgLists = new Array()
    imgList.forEach(element => {
      imgLists.push(_this.data.imgUrl+element)
    });
    //图片预览
    wx.previewImage({
      current:src, // 当前显示图片的http链接
      urls: imgLists // 需要预览的图片http链接列表
    })
  },
  getDetail(id){
    API.businessDetail({},id).then(res=>{
      console.log(res)
      this.setData({
        content:res.data.user
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.getDetail(id)
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