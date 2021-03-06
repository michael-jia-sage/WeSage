//app.js
import Touches from './utils/Touches.js'
import mockTransactions from './pages/index/mock.js'
const util = require('./utils/util.js')

App({
  globalData: {
    userInfo: null,
    trans: null,
    mockTransactions: mockTransactions,
    realInvoices: []
  },
  Touches: new Touches(),
  onLaunch: function () {
    // Initialize mock up data
    for (let i = 0; i < mockTransactions.length; i++) {
      mockTransactions[i] = util.trxInitial(mockTransactions[i])
    }

    // get invoices from Sage
    wx.request({
      // wfa-api request test url
      url: 'https://lyh-api.gameharbor.com.cn/sage/invoices',
      method: "GET",
      dataType: "json",
      success: function (result) {
        console.log("result data is:", result.data)
        //res = result.data.value
        var realInvoices = []
        var inv = null
        for (let i = 0; i < result.data.$items.length; i++) {
          inv = result.data.$items[i]
          realInvoices.push({
            id: inv.displayed_as, 
            amount: inv.total_amount, 
            trans_type: inv.status.displayed_as, 
            date_time: inv.date, 
            due_date: inv.due_date,
            trans_id: inv.id, 
            memo: inv.contact.displayed_as
          })
        }
        getApp().globalData.realInvoices = realInvoices
      }
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})