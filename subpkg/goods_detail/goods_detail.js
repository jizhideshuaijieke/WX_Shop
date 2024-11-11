const myBehaviors = require('../../behaviors/behavior1.js');
Page({
  behaviors: [myBehaviors],
  data: {
    goodsInfo: [],
  },
  onLoad(options) {
    let goodsId = options.goods_id;
    this.getGoodsDetails(goodsId);
  },
  getGoodsDetails(cid) {
    // console.log(cid)
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
      method: 'GET',
      data: {
        goods_id: cid
      },
      success: (res) => {
        if (res.data.meta.status != 200) {
          this.showToast();
          return;
        } else {
          this.setData({
            goodsInfo: res.data.message
          })
        }
      }
    })
  },
  preview(event) {
    const index = event.currentTarget.dataset.idx;
    // 调用 wx.previewImage 方法预览图片
    wx.previewImage({
      // 预览时，默认显示图片的索引
      current: index,
      // 所有图片的 URL 地址数组
      urls: this.data.goodsInfo.pics.map(x => x.pics_big) // 将图片地址映射成数组,箭头函数简略了函数体
    });
  }
})