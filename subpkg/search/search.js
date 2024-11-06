const myBehaviors = require('../../behaviors/behavior1.js');
Page({
    behaviors: [myBehaviors],
    data: {
        timer: null,
        keyWord: '',
        tempWord: '',
        searchResults: [], //搜索建议列表
        searchHistory: [], //搜索历史列表
    },
    deleteHistory(event) {
        let index = event.currentTarget.dataset.idx;
        this.data.searchHistory.splice(index, 1);
        this.setData({
            searchHistory: this.data.searchHistory,
        });
    },
    onSearch() {//搜索触发
        this.setData({
            keyWord: this.data.tempWord
        })
        this.loadToHistory()
    },

    loadToHistory() {
        this.setData({
            searchHistory: [...this.data.searchHistory, this.data.keyWord]
        });
    },
    inputChange(event) { //输入变化监控函数
        let value = event.detail;
        clearTimeout(this.data.timer); //清除之前的定时器
        // 判断输入框是否为空
        if (!value) {
            this.setData({
                tempWord: value,
                searchResults: []
            });
            return;
        }
        // 设置一个新的定时器，延迟100毫秒后执行内部的回调函数
        this.timer = setTimeout(() => {
            this.setData({
                tempWord: value
            });
            this.getSearchResults();
        }, 100)
    },
    // 根据搜索关键词，搜索商品建议列表
    async getSearchResults() {
        wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',
            method: 'GET',
            data: {
                query: this.data.tempWord
            }, // 将查询参数放在对象中
            success: (res) => {
                if (res.data.meta.status != 200) {
                    this.showToast();
                    return;
                } else {
                    this.setData({
                        searchResults: res.data.message
                    });
                }
            },
            fail: (error) => {
                wx.showToast({
                    title: '请求出错',
                    icon: 'none',
                });
            }
        });
    },
    naviToBrand(event) {
        let brand = event.currentTarget.dataset.brand;
        wx.navigateTo({
            url: '/subpkg/goods_detail/goods_detail?goods_id=' + brand.goods_id
        })
    },
    onLoad(options) {

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