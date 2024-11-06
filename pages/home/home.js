const myBehaviors = require('../../behaviors/behavior1.js');
Page({
    behaviors: [myBehaviors],
    data: {
        swiperList: [],
        cateList: [],
        floorList: []
    },
    goToSearch(){
        wx.navigateTo({
          url: '/subpkg/search/search',
        })
    },
    //获取轮播图图片
    getSwiperItems() {
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
                }
            },
        });
    },
    //分类点击导航
    // 在微信小程序中，event.currentTarget.dataset.item 用于获取通过 data- 属性传递的自定义数据。具体来说：
    // event: 这是事件对象，它在事件触发时被传递给事件处理函数。
    // currentTarget: 表示触发事件的当前组件（比如点击的 <image> 标签）。即使事件被冒泡，currentTarget 依然指向最初绑定事件的组件。
    // dataset: 小程序自动将所有 data- 开头的属性收集到 dataset 对象中。
    // item: 表示我们定义的 data-item 的数据值。event.currentTarget.dataset.item 就是将 data-item 传递的内容提取出来。
    CateNavigator(event) {
        let item = event.currentTarget.dataset.item;
        if (item.name == "分类") {
            wx.switchTab({ //跳转到Tab页面
                url: '/pages/cate/cate',
            })
        }
    },
    //获取楼层数据
    getFloorItems() {
        wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
            method: 'GET',
            success: (res) => {
                if (res.statusCode != 200) {
                    this.showToast()
                } else {
                    this.setData({
                        floorList: res.data.message
                    });
                }
            },
        });
    },
    //商品导航
    productNavigator(event) {
        let item = event.currentTarget.dataset.items
        let s = item.navigator_url.split('?', 2)//将地址的参数部分分割出来
        wx.navigateTo({
            url: '/subpkg/goods_list/goods_list' + s[1],
        })
    },
    onLoad: function (options) {
        this.getSwiperItems(), this.getCateItems(), this.getFloorItems()
    },
    onReady() {},
    onShow() {},
    onHide() {},
    onUnload() {},
    onPullDownRefresh() {},
    onReachBottom() {},
    onShareAppMessage() {}
})