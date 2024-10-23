// 微信API里的异步回调函数Promise化
import {promisifyAll} from 'miniprogram-api-promise'
const wxp = wx.p = {}
promisifyAll(wx, wxp)
App({
    onLaunch(){},
    onHide(){}
})