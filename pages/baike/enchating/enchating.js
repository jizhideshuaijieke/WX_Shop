Page({
    data: {
        queryTitleName: {}, //空对象,获取页面初次加载时传入的参数
        active: 0,
    },
    onLoad(options) { //options是页面跳转过来时传递的参数
        this.setData({
            queryTitleName: options
        })
    },
    onReady() {
        wx.setNavigationBarTitle({ //该函数只能放在onReady之后
            title: this.data.queryTitleName.title
        })
    },
    onChange(event) {
        // event.detail 的值为当前选中项的索引
        this.setData({
            active: event.detail
        });
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