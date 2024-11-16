App({
	globalData: {
		cart: [] //全局购物车数据
	},
	onLaunch() {
		this.getCart();
	},
	getCart() {
		//同步执行： wx.setStorageSync 会立即将数据存储到本地，并且在存储完成后才会继续执行后续代码，适合在需要等待存储完成后再做其他操作的场景。
		//异步执行： wx.setStorage 是异步的，它会将数据存储到本地后立即返回，不会等待存储完成，适合不需要立即依赖存储结果的场景。
		const cart = wx.getStorageSync('cart') || [];
		this.globalData.cart = cart;
	},
	saveCart() {
		// 保存购物车数据到本地存储
		wx.setStorageSync('cart', this.globalData.cart);
	}
})