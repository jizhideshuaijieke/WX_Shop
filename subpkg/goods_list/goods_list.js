const myBehaviors = require('../../behaviors/behavior1.js');
Page({
  behaviors: [myBehaviors],
  data: {
    //节流阀
    isloading: false,
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
  onReachBottom() {
    //有请求没有完成
    if (this.data.isloading) return;
    // 判断是否还有下一页数据
    if (this.data.queryObject.pagenum * this.data.queryObject.pagesize >= this.data.amount) {
      wx.showToast({
        title: '数据全部加载完毕！',
        icon: 'none'
      })
      return;
    }
    //页码自增加一
    this.data.queryObject.pagenum = this.data.queryObject.pagenum + 1,
      this.getGoodsList()
  },
  onPullDownRefresh() {
    //重置关键数据
    this.setData({
      'queryObject.pagenum': 1,
      total: 0,
      isloading: false,
      goodsList: []
    })
    //重新获取数据,并将停止上拉刷新作为回调函数
    this.getGoodsList(() => wx.stopPullDownRefresh())
  },
  paramentConvey(options) {
    this.setData({
      'queryObject.query': options.query || '',
      'queryObject.cid': options.cid || ''
    })
  },
  getGoodsList(cb) {
    //发起请求，打开节流阀
    this.data.isloading = true;
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      method: 'GET',
      data: this.data.queryObject,
      success: (res) => {
        if (res.data.meta.status != 200) {
          this.showToast();
          return;
        } else {
          this.setData({
            goodsList: [...this.data.goodsList, ...res.data.message.goods],
            amount: res.data.message.total
          })
          this.data.isloading = false;

          // cb && cb(); 是一种常见的 JavaScript 写法， 用来安全地调用可选的回调函数 cb。 具体来说， 这行代码的作用是：
          // 短路求值检查： cb && cb() 利用了逻辑与( && ) 的短路特性。 它首先检查 cb 是否存在（ 即 cb 不为 null、 undefined 或 false）， 如果 cb 是有效的函数， 那么 cb && cb() 的左边会返回 true， 就会继续执行 cb()， 从而调用 cb。
          // 安全调用回调函数： 如果 cb 没有传入（ 例如 undefined）， 这个表达式会在 cb 为 false 时短路， 不执行 cb()， 从而避免报错。 因此， 这是一个安全检查， 可以在调用 cb() 之前确保 cb 的有效性。
          cb && cb()
        }
      }
    })
  },
  naviToDetail(event) {
    let brand = event.currentTarget.dataset.brand;
    wx.navigateTo({
      url: '/subpkg/goods_detail/goods_detail?goods_id=' + brand.goods_id
    })
  },
})