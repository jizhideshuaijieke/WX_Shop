module.exports = Behavior({
    data: {

    },
    properties: {

    },
    methods: {
        showToast() {
            wx.showToast({
                title: '数据加载失败！',
                duration: 1000,
                icon: 'none'
            })
        }
    }
})