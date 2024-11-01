Page({
    data: {
        cateList: [],
        activeIndex: 1
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
                    // console.log()
                }
            },
        })
    },
    //切换侧边栏的索引
    changeCategory(event){
       this.setData({
            activeIndex : event.detail
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