const myBehaviors = require('../../behaviors/behavior1.js');
Page({
  behaviors: [myBehaviors],
  data: {
    //缺失图片商品的展示图
    defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
    goodsList: [],
    amount: 0,
    queryObject: {
      // 查询关键词
      query: '',
      // 商品分类Id
      cid: '',
      // 页码值
      pagenum: 1,
      // 每页显示多少条数据
      pagesize: 10
    }
  },
  // options 是微信小程序中的一个对象，它包含了在页面跳转时携带的查询参数
  onLoad(options) {
    this.paramentConvey(options),
    this.getGoodsList()
  },
  paramentConvey(options) {
    this.setData({
      'queryObject.query': options.query || '',
      'queryObject.cid': options.cid || ''
    })
    console.log(options)
    console.log(this.data.queryObject)
  },
  getGoodsList() {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      method: 'GET',
      data: {
        queryObj: this.data.queryObject
      },
      success: (res) => {
        if (res.data.meta.status != 200) {
          this.showToast();
          return;
        } else {
          this.setData({
            goodsList: res.data.message.goods,
            amount: res.data.message.total
          })
          console.log(this.data.goodsList)
        }
      }
    })
  },

})