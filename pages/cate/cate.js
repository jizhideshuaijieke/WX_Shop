Page({
    data: {
        cateList: [],
        activeIndex: 0,
        scrollTop: 0, // 滚动条位置
    },
    //获取分类数据
    getCateList() {
        wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
            method: 'GET',
            success: (res) => {
                if (res.statusCode != 200) {
                    this.showToast()
                } else {
                    this.setData({
                        cateList: res.data.message
                    });
                }
            },
        })
    },
    //切换侧边栏的索引
    changeCategory(event) {
        this.setData({
            activeIndex: event.detail, // 更新选中的分类
            scrollTop: 0, // 重置滚动条位置
        })
    },
    //导航到商品详情页
    naviToBrand(event) {
        let brand = event.currentTarget.dataset.brand;
        wx.navigateTo({
            url: '/subpkg/goods_list/goods_list?cid=' + brand.cat_name
        })
    },
    onLoad(options) {
        this.getCateList()
    },
    onReady() {

    },
    onShow() {

    },
    onHide() {

    },
    onUnload() {

    },
    onPullDownRefresh() {

    },
    onReachBottom() {

    },
    onShareAppMessage() {

    }
})