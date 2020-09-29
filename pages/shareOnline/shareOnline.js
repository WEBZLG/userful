const API = require('../../utils/api');
// const AREA = require('../../utils/area');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    dataList: [],
    canvasShow: true,
  },
  // 列表跳转
  checkLogin(e) {
    let _this = this
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo == '' || userInfo == undefined) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      API.isSignIn({}, {
          uid: userInfo.user_id
        })
        .then(res => {
          if (res.message == '已登录') {
            wx.setStorageSync('loginToken', res.data.login_token);
            wx.setStorageSync('userInfo', res.data.user);
            _this.share(e)
          } else {
            wx.showToast({
              title: 'res.message',
              icon: "none"
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '../login/login',
              })
            }, 1500);
          }
        })
    }
  },
// 分享
share(e) {
  let id = e.currentTarget.dataset.id
  let title = e.currentTarget.dataset.title
  API.share({
    content_id:id,
    page:'pages/onlineDetail/onlineDetail'
  }).then(res => {
    let that = this
    let codeUrl = API.IMG_BASE_URL + res.data.qrcode
    let backUrl = API.IMG_BASE_URL + '/uploads/head_img/20200929/UHNIfPpmEUQt99eZTH9W3j5mQSTmE18FGYsFFG1n.jpeg'
    wx.showLoading({
      title: '生成海报中',
    })
    API.getImage(codeUrl).then(res => {
      let codePath = res.path
      API.getImage(backUrl).then(res => {
        let backPath = res.path
        API.getImageAll([codePath, backPath]).then((res) => {
          const ctx = wx.createCanvasContext('canvas')
          // 底图
          ctx.drawImage(res[1].path, 0, 0, 300, 200);
          // 小程序码
          ctx.drawImage(res[0].path, 10, 120, 60, 60)
          if (title.length <= 16) {
            ctx.setFillStyle('#FF2742')//文字颜色：默认黑色
            ctx.setFontSize(16)//设置字体大小，默认10
            ctx.fillText(title, 90, 90)
          }
          if (title.length <= 32) {
            let firstLine = title.substring(0, 16);
            let secondLine = title.substring(16, 32);
            ctx.setFillStyle('#FF2742')//文字颜色：默认黑色
            ctx.setFontSize(16)//设置字体大小，默认10
            ctx.fillText(firstLine, 90, 90)
            ctx.fillText(secondLine, 90, 110)
          } else {
            let firstLine = title.substring(0, 16);
            let secondLine = title.substring(16, 31) + '...';
            ctx.setFillStyle('#FF2742')//文字颜色：默认黑色
            ctx.setFontSize(16)//设置字体大小，默认10
            ctx.fillText(firstLine, 90, 90)
            ctx.fillText(secondLine, 90, 110)
          }
      
          ctx.stroke()
          ctx.draw()
          wx.hideLoading()
          that.setData({
            canvasShow: false
          })
        })
      })
    })
  })
},
// 生成图片保存相册
savePhoto() {
  let that = this
  wx.showLoading({
    title: '正在保存',
    mask: true,
  })
  wx.canvasToTempFilePath({
    canvasId: 'canvas',
    success: function (res) {
      wx.hideLoading()
      let tempFilePath = res.tempFilePath;
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success(res) {
          wx.showModal({
            content: '图片已保存到相册，赶紧晒一下吧~',
            showCancel: false,
            confirmText: '好的',
            confirmColor: '#333',
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  canvasShow: true
                })
              }
            },
            fail: function (res) {
              that.setData({
                canvasShow: true
              })
            }
          })
        },
        fail: function (err) {
          if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
            //console.log("当初用户拒绝，再次发起授权")
            wx.showModal({
              content: '是否打开权限设置？',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#333',
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success(settingdata) {
                      //console.log(settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showToast({
                          title: '点击保存到相册按钮',
                          mask: true,
                          icon: "none"
                        })
                      } else {
                        wx.showToast({
                          title: '拒绝权限，无法保存图片',
                          mask: true,
                          icon: "none"
                        })
                        setTimeout(() => {
                          that.setData({
                            canvasShow: true
                          })
                        }, 2000);
                      }
                    }
                  })
                }
              },
              fail: function (res) {
                that.setData({
                  canvasShow: true
                })
              }
            })
          } else if (err.errMsg == "saveImageToPhotosAlbum:fail:auth denied") {
            wx.showToast({
              title: '拒绝权限，无法保存图片',
              mask: true,
              icon: "none"
            })
            setTimeout(() => {
              that.setData({
                canvasShow: true
              })
            }, 2000);
          }
        }
      })
    }
  });
},
  // 关闭分享
  showClose() {
    this.setData({
      canvasShow: true
    })
  },
  // 获取列表
  getList(id, page) {
    let _this = this
    API.articelList({
      menu_id: id,
      page: page,
      page_size: 15
    }).then(res => {
      if (page == 1) {
        _this.setData({
          dataList: res.data.contents
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
            dataList: _this.concat(res.data.contents)
          })
        }
      }
    })
  },
  // 查看详情
  onDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../onlineDetail/onlineDetail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let title = options.title
    this.setData({
      id: id
    })
    wx.setNavigationBarTitle({
      title: title
    })
    this.getList(id, 1)
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
    let id = this.data.id
    this.setData({
      page: 1
    })
    this.getList(id, 1)
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _this = this
    let id = this.data.id
    this.setData({
      page: _this.data.page * 1 + 1
    })
    this.getList(id, _this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})