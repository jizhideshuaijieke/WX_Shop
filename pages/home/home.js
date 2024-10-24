const myBehaviors = require('../../behaviors/behavior1.js'); //
Page({
    behaviors: [myBehaviors],
    data: {
        swiperList: [],
        cateList: []
    },
    //获取轮播图图片
    getSwiperImages() {
        wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
            method: 'GET',
            success: (res) => {
                if (res.statusCode != 200) { //数据请求失败
                    this.showToast()
                } else {
                    this.setData({
                        swiperList: res.data.message,
                        // console.log(res) 不能放在setData内
                    });
                    console.log(res)
                }
            },
        });
    },
    //获取分类数据
    getCateItems() {
        wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
            method: 'GET',
            success: (res) => {
                if (res.statusCode != 200) {
                    this.showToast()
                } else {
                    this.setData({
                        cateList: res.data.message,
                    });
                    console.log(res)
                }
            },
        });
    },
    onLoad: function (options) {
        this.getSwiperImages(), this.getCateItems()
    },
    onReady() {},
    onShow() {},
    onHide() {},
    onUnload() {},
    onPullDownRefresh() {},
    onReachBottom() {},
    onShareAppMessage() {}
})