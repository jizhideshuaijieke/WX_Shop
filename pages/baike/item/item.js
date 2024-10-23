import {createStoreBindings} from 'mobx-miniprogram-bindings'
import {store} from '../../../store/store'

Page({
  data: {
    queryTitleName: {} //空对象,获取页面初次加载时传入的参数
  },
  //监听页面加载函数
  onLoad(options) {//options是页面跳转过来时传递的参数
    this.setData({
      queryTitleName: options
    })
    this.storeBindings = createStoreBindings(this, {
        store,
        fields:['numA','numB','sum'],
        actions:['updateNum1']
    })
  },
  onReady() {
    wx.setNavigationBarTitle({//该函数只能放在onReady之后
      title: this.data.queryTitleName.title
    })
  },
  btnHandler(e){
      this.updateNum1(e.target.dataset.arg1)
  },
  onShow() {

  },
  onHide() {

  },
  //监听页面卸载函数
  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  },
  onShareAppMessage() {

  }
})