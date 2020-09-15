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
    imgUrl: API.IMG_BASE_URL,
    fileList: [],
    id: '',
    content: '',
    urlArray: [],//网络地址变量
    pathArray: [],//本地地址变量
    storeList:[]//图片中间变量
  },
  bindTextArea: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 删除图片
  deleteImg(index) {
    console.log(index)
    let _this = this
    let idx = index.detail.index
    this.setData({
      fileList: _this.data.fileList.delete(idx),
      storeList: _this.data.storeList.delete(idx)
    })
  },
  // 选择图片后本地地址
  afterRead(event) {
    console.log(event.detail.file)
    let _this = this
    this.setData({
      fileList: _this.data.fileList.concat(event.detail.file),
      storeList:_this.data.storeList.concat(event.detail.file)
    })
  },
  // 发布/修改商机
  onRelease() {
    let _this = this
    let id = this.data.id
    let content = this.data.content
    if (content == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return false
    }
    if (_this.data.fileList.length == 0) {
      API.myBusinessSet({
        id: id,
        content: content,
        image: JSON.stringify(_this.data.urlArray)
      }).then(res => {
        wx.showToast({
          title: res.message
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 1500);
      })
    } else {
      _this.data.storeList.forEach(element => {
        if (element.url) {
          _this.setData({
            urlArray: _this.data.urlArray.concat(element.url)
          })
        } else {
          _this.setData({
            pathArray: _this.data.pathArray.concat(element)
          })
        }
      });
      API.uploadImgs({
        'file_name': 'image'
      }, _this.data.pathArray).then(res => {
        res.forEach(element => {
          console.log(element)
          _this.setData({
            urlArray: _this.data.urlArray.concat(element.data.path)
          })
        });
        API.myBusinessSet({
          id: id,
          content: content,
          image: JSON.stringify(_this.data.urlArray)
        }).then(res => {
          wx.showToast({
            title: res.message
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            })
          }, 1500);
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    if (options.item) {
      let item = JSON.parse(options.item)
      let imgUrl = this.data.imgUrl
      let newImage = []
      if (item.image.length > 0) {
        item.image.forEach(element => {
          newImage.push({
            url: imgUrl + element
          })
          _this.setData({
            storeList:_this.data.storeList.concat({
              url: element
            })
          })
        });
      }
      this.setData({
        content: item.content,
        fileList: newImage,
        id:1
      })
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
  // onShareAppMessage: function () {

  // }
})