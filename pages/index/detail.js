// pages/index/detail.js
var sprintf = require('../../utils/sprintf.js').sprintf
const App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  singleSync: function (e) {
    // prepare data
    var res = 'nothing'
    var trans = this.data.trans
    var rData = sprintf('{"date_time": "%1s", "trans_type": "%2s", "trans_id": "%3s", "amount": "%4s", "memo": "%5s"}', trans.data_time, trans.trans_type, trans.trans_id, trans.amount, trans.memo)
    console.log('send data is:', rData)

    // call API to sync
    wx.request({
      // wfa-api request test url
      url: 'https://lyh-api.gameharbor.com.cn/wesage',
      method: "GET",
      dataType: "json",
      data: rData,
      success: function (result) {
        console.log("result data is:", result.data)   
        res = result.data.value

        // remove synced transaction
        var mockTransactions = App.globalData.mockTransactions
        for (let j = 0; j < mockTransactions.length; j++) {
          if (trans.id == mockTransactions[j].id) {
            mockTransactions[j].synced = true
          }
        }
        App.globalData.mockTransactions = mockTransactions

        // show results
        wx.showModal({
          title: 'Sync Completed',
          content: 'This transaction has been synced to Sage Accounting.',
          showCancel: false,
          confirmText: 'Okay',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ trans: App.globalData.trans })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})