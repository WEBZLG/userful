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
    canvas: '',
    ctx: ''
  },
  // 分享
  share(e) {
    let that = this;
    let code = wx.getStorageSync('userInfo').p_code;
    if (code == undefined) {
      code = ""
    }
    let id = e.currentTarget.dataset.id
    // 分享文章
    const query = wx.createSelectorQuery(); //如果是在组件中，则改成 this.createSelectorQuery()
    query.select('#canvas').fields({
      node: true,
      rect: true
    }, res => {
      const canvas = res.node;
      const ctx = canvas.getContext('2d');
      canvas.width = 300; //本地图像的width
      canvas.height = 300; //本地图像的height
      this.setData({
        canvas,
        ctx
      });
      this.drawBackground()
      this.drawCode(id)
      this.setData({
        canvasShow:false
      });
    }).exec();
  },
  // 绘制背景
  drawBackground() {
    let canvas = this.data.canvas
    let ctx = this.data.ctx
    let img = canvas.createImage(); //canvas 2d 通过此函数创建一个图片对象
    img.onload = (e) => {
      ctx.drawImage(img, 0, 0, 300, 300);
      let text = '接小程序开发，web开发，H5开发，小程序云开发，PHP开发'
      let moy =  '阅读直接微信扫码'
      ctx.font = '14px sans-serif';
      ctx.fillStyle = "rgba(5, 117, 115)";
      if (text.length <= 16) {
        ctx.fillText(text,60, 120)
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.font = 'normal bold 16px sans-serif';
        ctx.fillStyle = "red";
        ctx.fillText(moy, 80,280)
      }
      if (text.length <= 32) {
        let firstLine = text.substring(0, 16);
        let secondLine = text.substring(16, 32);
        ctx.fillText(firstLine, 60,120)
        ctx.fillText(secondLine, 60,140)
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.font = 'normal bold 16px sans-serif';
        ctx.fillStyle = "red";
        ctx.fillText(moy, 80,280)
      } else {
        let firstLine = text.substring(0, 16);
        let secondLine = text.substring(16, 32) + '...';
        ctx.fillText(firstLine, 60,120)
        ctx.fillText(secondLine, 60,140)
        ctx.font = 'normal bold 16px sans-serif';
        ctx.fillStyle = "red";
        ctx.fillText(moy,80, 280)
      }
    }
    img.src = "/images/read.jpg";
  },

  // 绘制二维码
  drawCode(id) {
    let canvas = this.data.canvas
    let ctx = this.data.ctx
    API.share({
      content_id:id,
      page:'pages/onlineDetail/onlineDetail'
    }).then(res => {
      let code = canvas.createImage(); //创建img对象
      code.onload = () => {
        ctx.drawImage(code, 0, 220, 60, 80);
      };
      let codeUrl = API.IMG_BASE_URL + res.data.qrcode
      code.src = codeUrl
    })
  },
  // 保存图片
  savePicter() {
    let _this = this
    let canvas = this.data.canvas
    wx.canvasToTempFilePath({
      canvas,
      wwidth: 300,
      height: 200,
      destWidth: 300,
      destHeight: 200,
      success(res) {
        API.savePicture(res.tempFilePath,function () {
          _this.setData({
            canvasShow: true
          })
        })
      }
    })
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