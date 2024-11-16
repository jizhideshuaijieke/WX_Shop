const myBehaviors = require('../../behaviors/behavior1.js');
// 获取全局应用实例
const app = getApp();
Page({
    behaviors: [myBehaviors],
    data: {
        goodsInfo: [],
    },
    onLoad(options) {
        let goodsId = options.goods_id;
        this.getGoodsDetails(goodsId);
    },
    getGoodsDetails(cid) {
        wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
            method: 'GET',
            data: {
                goods_id: cid
            },
            success: (res) => {
                if (res.data.meta.status != 200) {
                    this.showToast();
                    return;
                } else {
                    //将webp格式转换成jpg（webp可能不能在ios正常显示）
                    res.data.message.goods_introduce = res.data.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg')
                    this.setData({
                        goodsInfo: res.data.message
                    })
                    // console.log(this.data.goodsInfo)
                }
            }
        })
    },
    preview(event) {
        const index = event.currentTarget.dataset.idx;
        // 调用 wx.previewImage 方法预览图片
        wx.previewImage({
            // 预览时，默认显示图片的索引
            current: index,
            // 所有图片的 URL 地址数组
            urls: this.data.goodsInfo.pics.map(x => x.pics_big) // 将图片地址映射成数组,箭头函数简略了函数体
        });
    },
    naviToSp(event) {
        // console.log(event)
        let sp = event.currentTarget.dataset.origin;
        if (sp == "购物车") {
            wx.switchTab({
                url: '/pages/cart/cart',
            })
        }
    },
    addToCart() {
        const cart = app.globalData.cart;
        // 检查购物车中是否已经存在该商品，如果find成功返回查找元素的引用
        //===是严格等于，包括类型相等
        const exitingItem = cart.find(item => this.data.goodsInfo.goods_id === item.goodsInfo)
        if (exitingItem) {
            exitingItem.goods_count++;
        } else {
            cart.push({
                ... this.data.goodsInfo,
                goods_count: 1
            });
            // console.log(app.globalData.cart)
        }

        app.globalData.cart = cart;
        app.saveCart();

        wx.showToast({
            title: '已加入购物车',
            icon: 'success',
            duration: 2000
        });
    }
})