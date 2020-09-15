//封装请求函数
const UTIL = require('./util.js')
const API_BASE_URL = 'https://api-qiye.chengyue.online'; //api地址
const IMG_BASE_URL = 'https://images-qiye.chengyue.online'; //图片地址
// noToken不传用户token传固定token/noUid不传用户user_id
const request = (url, method, data, noToken, noUid) => {
  //获取登录token 
  let userToken = wx.getStorageSync('loginToken');
  let loginToken = noToken == true ? '$10$Xmd/LvGEoHInQ4ISXisPJOm54ULeCFU82WgDyyM5U2j2WfO3rND2K' : userToken;
  // 获取用户id
  if (noUid == '' || noUid == undefined) {
    let userInfoId = wx.getStorageSync('userInfo').user_id;
    data.user_id = userInfoId
  }
  //获取的当前时间戳（10位）
  data.timestamp = Math.round(new Date().getTime() / 1000).toString();
  //通过md5加密验签
  data.sign = UTIL.getMD5Sign(data, loginToken)
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: API_BASE_URL + url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        if (request.statusCode == '200') {
          resolve(request.data)
          wx.hideLoading()
        } else if (request.statusCode == '401') {
          wx.hideLoading()
          if (request.data.message == "您当前不是会员或会员已过期，请开通会员后再访问") {
            wx.showModal({
              title: '提示',
              content: '您当前不是会员或会员已过期，是否立即开通会员或续费？',
              success: function (sm) {
                if (sm.confirm) {
                  wx.redirectTo({
                    url: '../vip/vip',
                  })
                } else if (sm.cancel) {
                  wx.navigateBack({
                    delta: 0,
                  })
                }
              }
            })
          } else {
            wx.showToast({
              title: request.data.message,
              icon: 'none'
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 0,
              })
            }, 1500);
          }
        } else {
          wx.showToast({
            title: request.data.message,
            icon: 'none'
          })
        }
      },
      fail(error) {
        console.log(error)
        if (error.errMsg) {
          wx.showToast({
            title: error.errMsg,
            icon: 'none'
          })
        } else {
          reject(error)
          wx.showToast({
            title: error.data.message,
            icon: 'none'
          })
        }
      }
    })
  });
}
// 调用
// const API = require('../../utils/api');
// API.gethotsongs({type:7,}).then(res => {})

// 单图上传
const uploadImg = (param, path) => {
  return new Promise((resolve, reject) => {
    //获取的当前时间戳（10位）
    param.timestamp = Math.round(new Date().getTime() / 1000).toString();
    let token = '$10$Xmd/LvGEoHInQ4ISXisPJOm54ULeCFU82WgDyyM5U2j2WfO3rND2K';
    //通过md5加密验签
    param.sign = UTIL.getMD5Sign(param, token)
    console.log(param)
    wx.uploadFile({
      url: API_BASE_URL + '/upload_img',
      filePath: path,
      name: 'file',
      formData: param,
      success(res) {
        let data = JSON.parse(res.data)
        resolve(data)
        console.log(data)
      },
      fail(error) {
        reject(error)
        wx.showToast({
          title: error.data.message,
          icon: 'none'
        })
      }
    })
  })
}

//多张图片上传
const uploadImgs = (param, tempFilePaths) => {
  wx.showLoading({
    title: "上传中"
  });
  return new Promise((presolve, preject) => {
    let uploads = []
    //获取的当前时间戳（10位）
    param.timestamp = Math.round(new Date().getTime() / 1000).toString();
    let token = '$10$Xmd/LvGEoHInQ4ISXisPJOm54ULeCFU82WgDyyM5U2j2WfO3rND2K';
    //通过md5加密验签
    param.sign = UTIL.getMD5Sign(param, token)
    tempFilePaths.map((item, i) => {
      uploads[i] = new Promise((resolve, reject) => {
        wx.uploadFile({
          url: API_BASE_URL + '/upload_img',
          filePath: item.path,
          name: "file",
          formData: param,
          success(res) {
            resolve(JSON.parse(res.data))
          },
          fail(err) {
            console.log(err)
            wx.hideLoading()
          }
        })
      })
    })
    Promise.all(uploads).then(res => {
      //图片上传完成
      presolve(res)
      wx.hideLoading()
    }).catch(err => {
      preject(err)
      wx.hideLoading()
      wx.showToast({
        title: '上传失败请重试',
        icon: 'none'
      })
    })
  })
}

// 获取图片信息
const getImage = (url) => {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src: url,
      success: function (res) {
        resolve(res)
      },
      fail: function (error) {
        reject(error)
      }
    })
  })
}
const getImageAll = (image_src) => {
  let that = this;
  var all = [];
  image_src.map(function (item) {
    all.push(getImage(item))
  })
  return Promise.all(all)
}
// 结果api
module.exports = {
  IMG_BASE_URL,
  API_BASE_URL,
  getImage,
  getImageAll,
  // 注册
  regist: (data) => {
    return request('/register', 'post', data, true, true)
  },
  // 登录
  login: (data) => {
    return request('/login', 'post', data, true, true)
  },
  // 重置密码
  resetPwd: (data) => {
    return request('/reset_pass', 'post', data)
  },
  // 轮播图
  carousel: (data) => {
    return request('/carousel/get', 'post', data, true, true)
  },
  //退出登录
  signOut: (data) => {
    return request('/logout', 'post', data)
  },
  //检验是否登录
  isSignIn: (data, uid) => {
    console.log(data)
    console.log(uid)
    return request('/check_login/' + uid.uid, 'post', data, true, true)
  },

  //修改密码
  changePwd: (data) => {
    return request('/user/update', 'post', data)
  },
  //修改手机
  changePhone: (data) => {
    return request('/user/update', 'post', data)
  },
  //实名
  certification: (data) => {
    return request('/user/real', 'post', data)
  },
  // 单图上传
  uploadImg: (param, path) => {
    return uploadImg(param, path)
  },
  // 多图上传
  uploadImgs: (param, data) => {
    return uploadImgs(param, data)
  },
  // 太阳码
  share: (data) => {
    return request('/user/qrcode', 'post', data)
  },
  // 文章列表
  articelList: (data) => {
    return request('/content/get', 'post', data, true, true)
  },
  // 文章详情
  articelDetail: (data, aid) => {
    return request('/content/detail/' + aid, 'post', data, true, true)
  },
  // 服务列表
  servicelList: (data) => {
    return request('/service/get', 'post', data, true, true)
  },
  // 商机列表
  businessList: (data) => {
    return request('/business/get', 'post', data, true, true)
  },
  // 商机详情
  businessDetail: (data, id) => {
    return request('/business/detail/' + id, 'post', data, true, true)
  },
  // 商机详情
  myBusiness: (data) => {
    return request('/user_business/get', 'post', data)
  },
  // 发布商机
  myBusinessSet: (data) => {
    return request('/user_business/set', 'post', data)
  },
    // 删除商机
  myBusinessDelete: (data) => {
    return request('/user_business/delete', 'post', data)
  }
}