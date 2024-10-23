const myBehaviors = require('../../behaviors/behavior1.js');//
Page({
    behaviors: [myBehaviors],
    data: {
        swiperList: []
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
    onLoad: function (options) {
        this.getSwiperImages()
    },
    onReady() {},
    onShow() {},
    onHide() {},
    onUnload() {},
    onPullDownRefresh() {},
    onReachBottom() {},
    onShareAppMessage() {}
})