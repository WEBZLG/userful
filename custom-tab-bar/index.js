Component({
  data: {
    selected: 0,
    color: "#333333",
    selectedColor: "#277CFB",
    icon: {
      normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
      active: 'https://img.yzcdn.cn/vant/user-active.png',
    },
    list: [{
      pagePath: "/pages/home/home",
      iconPath: "/images/icon-xy1.png",
      selectedIconPath: "/images/icon-xy2.png",
      text: "学院"
    }, {
      pagePath: "/pages/service/service",
      iconPath: "/images/icon-qy1.png",
      selectedIconPath: "/images/icon-qy2.png",
      text: "企服"
    },{
      pagePath: "/pages/my/my",
      iconPath: "/images/icon-wd1.png",
      selectedIconPath: "/images/icon-wd2.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})