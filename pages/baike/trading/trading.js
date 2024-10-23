Page({
    data: {
        queryTitleName: {}, //空对象,获取页面初次加载时传入的参数
    },
    async getInfor() {//声明一个异步函数(Promise化网络请求函数)
        //解构赋值语法，从 wx.p.request 的返回结果中提取 data 属性，并将其重命名为 res
        const {data:res} =await wx.p.request({//等待 wx.p.request 返回Promise并解析其结果
            method: 'GET',
            url: 'https://applet-base-api-t.itheima.net/api/get',
            data:{
                name:String,
                age:Number
            },
        })
        console.log(res)
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