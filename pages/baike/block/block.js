Page({
    data: {
        count: 0,
        colorList: [],
        queryTitleName: {}
    },
    onLoad: function (options) {
        this.setData({
            queryTitleName: options
        })
        for (let i = 1; i <= 6; i++) {
            this.getRandomColor()
        }
    },
    countAdd() {
        /*在微信小程序中,这种写法并不是在参数的位置写函数体，而是一个对象字面量的写法。
        { count: 0 } 是一个对象字面量，表示将 count 属性的值设置为 0。
        花括号 {} 用于定义一个对象，而不是函数体。
        对象字面量的语法是用花括号包裹一组键值对，其中键和值之间用冒号分隔。
        这个对象作为参数传递给 setData 方法，用于更新页面的数据*/
        this.setData({ //this 关键字指的是当前页面的实例对象
            count: this.data.count + 1
        })
    },
    pullDownFresh() { //自定义下拉刷新
        this.setData({
            count: 0
        })
        wx.showLoading({
            title: '加载中...',
        })
        setTimeout(function () {
            wx.hideLoading();
        }, 500);
        wx.stopPullDownRefresh() //赋值成功就停止下拉的刷新
    },
    //获取随机颜色方法
    getRandomColor() {
        //RGB颜色：[0,255]表示红绿蓝的强度
        let r = Math.floor(Math.random() * 256); //Math.random()随机生成[0,1)之间的一个浮点数
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        this.setData({
            //加上...是扩展出原数组的所有元素，如果不加就相当于数组嵌套
            colorList: [...this.data.colorList, `rgb(${r},${g},${b})`]
        });
    },
    onReady() {
        wx.setNavigationBarTitle({
            title: this.data.queryTitleName.title
        })
    },
    onShow() {},
    onHide() {},
    onUnload() {},
    onPullDownRefresh() {
        this.pullDownFresh()
    },
    onReachBottom() {
        for (let i = 1; i <= 10; i++) {
            this.getRandomColor()
        }
    },
    onShareAppMessage() {}
})