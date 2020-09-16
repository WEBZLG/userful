// pages/home/home.js
const API = require('../../utils/api');
const AREA = require('../../utils/area');
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: API.IMG_BASE_URL, //图片路径
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    show: false,
    areaList: AREA.default,
    loading: true,
    areaText: '',//地址
    dataList:[],//每日一课
    iconNav: [{
        imgPath: '../../images/xueyuan.png',
        title: "儒商学院",
        id: 1
      }, {
        imgPath: '../../images/jc-icon.png',
        title: "创业基础",
        id: 2
      }, {
        imgPath: '../../images/cz-icon.png',
        title: "创业进阶",
        id: 3
      }, {
        imgPath: '../../images/qy-server.png',
        title: "企业管理",
        id: 4
      }, {
        imgPath: '../../images/anli.png',
        title: "行业案例",
        id: 5
      },
      {
        imgPath: '../../images/weixin.png',
        title: "微商课程",
        id: 6
      },
      {
        imgPath: '../../images/taobao.png',
        title: "电商课程",
        id: 7
      },
      {
        imgPath: '../../images/douyin.png',
        title: "自媒体课程",
        id: 8
      }
    ]
  },
  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onConfirm(e) {
    this.setData({
      areaText: (typeof (e.detail.values[0]) == 'undefined' || e.detail.values[0].code == '' ? '全国' : e.detail.values[0].name) + (typeof (e.detail.values[1]) == 'undefined' || e.detail.values[1].code == '' ? '' : e.detail.values[1].name) + (typeof (e.detail.values[2]) == 'undefined' || e.detail.values[2].code == '' ? '' : e.detail.values[2].name),
      province: typeof (e.detail.values[0]) == 'undefined' || e.detail.values[0].code == '' ? '' : e.detail.values[0].name,
      city: typeof (e.detail.values[1]) == 'undefined' || e.detail.values[1].code == '' ? '' : e.detail.values[1].name,
      area: typeof (e.detail.values[2]) == 'undefined' || e.detail.values[2].code == '' ? '' : e.detail.values[2].name,
    })
    this.onClose();
  },
  // 获取轮播图
  getCarouselData() {
    let _this = this
    API.carousel({})
      .then(res => {
        console.log(res)
        _this.setData({
          background: res.data.carousels
        })
      })
  },
  // 列表跳转
  onArticle(e) {
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
            let id = e.currentTarget.dataset.id
            let title = e.currentTarget.dataset.title
            wx.navigateTo({
              url: '../publish/publish?id=' + id+'&title='+title
            })
          } else {
            wx.showToast({
              title: 'res.message',
              icon: "none"
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '../login/login',
              })
            }, 3000);
          }
        })
    }
  },
  // 获取位置
  getUserLocation: function () {
    let _this = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      _this.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          _this.getLocation();
        } else {
          //调用wx.getLocation的API
          _this.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        _this.getLocal(latitude, longitude)
      },
      fail: function (res) {
        //console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let _this = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        //console.log('getLocal')
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        let area = res.result.ad_info.district
        _this.setData({
          province: province,
          city: city,
          area: area,
          latitude: latitude,
          longitude: longitude,
          areaText: city + area
        })
      },
      fail: function (res) {},
      complete: function (res) {}
    });
  },
  // 获取每日列表
  getList() {
    let _this = this
    API.articelList({
      menu_id: 9,
      page:1,
      page_size:5
    }).then(res => {
      console.log(res)
      _this.setData({
        dataList: res.data.contents
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'OQYBZ-GMQKD-X3I4Q-H4YNU-3TDQ5-PWFAQ' //自己的key秘钥
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      loading: false,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCarouselData() //轮播
    this.getList() //每日一课
    this.getUserLocation();
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
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
    this.getCarouselData() //轮播
    this.getList() //每日一课
    wx.stopPullDownRefresh();
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