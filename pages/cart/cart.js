// 获取全局应用实例
const app = getApp();
Page({
  data: {
    cart: [],
    selectedItem: [], //复选选中的购物车中的物品
    selectedItemCount: 0,
    selectedTotalCost: 0,
  },
  //每次显示页面都会调用
  onShow() {
    this.setData({
      cart: app.globalData.cart
    })
    this.setBadge()
  },
  changeStatu(event) {
    const idx = event.currentTarget.dataset.idx
    this.setData({
      //使用 动态属性名（computed property names）,动态计算出数组的索引，并更新数组中的该元素
      [`selectedItem[${idx}]`]: event.detail,

    })
    if (event.detail) {
      this.setData({
        selectedTotalCost: this.data.selectedTotalCost + this.data.cart[idx].goods_price,
        selectedItemCount: this.data.selectedItemCount + 1
      })
    } else {
      this.setData({
        selectedTotalCost: this.data.selectedTotalCost - this.data.cart[idx].goods_price,
        selectedItemCount: this.data.selectedItemCount - 1
      })
    }
  },
  deleteCartItem(event) {
    let index = event.currentTarget.dataset.idx;
    this.data.cart.splice(index, 1);
    this.setData({
      cart: this.data.cart,
    });
    this.setBadge()
    app.saveCart()
  },
  checkOut(){
    // console.log("?")
    wx.navigateTo({
      url: '/subpkg/myaddress/myaddress'
    })
  },
  setBadge() {
    const total = this.data.cart.reduce((sum, item) => sum + item.goods_count, 0);
    wx.setTabBarBadge({
      index: 2,
      text: total > 99 ? "99+" : total.toString()
    })
  },
})