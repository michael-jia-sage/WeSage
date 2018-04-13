// pages/index/list.js
const App = getApp()
import transactionArray from './mock.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    transactionArray,
  },

  touchS: function (e) {  // touchstart
    let startX = App.Touches.getClientX(e)
    startX && this.setData({ startX })
  },
  touchM: function (e) {  // touchmove
    let transactionArray = App.Touches.touchM(e, this.data.transactionArray, this.data.startX)
    transactionArray && this.setData({ transactionArray })

  },
  touchE: function (e) {  // touchend
    const width = 150  // 定义操作列表宽度
    let transactionArray = App.Touches.touchE(e, this.data.transactionArray, this.data.startX, width)
    transactionArray && this.setData({ transactionArray })
  },
  itemSync: function (e) {  // itemDelete
    // let itemData = App.Touches.deleteItem(e, this.data.itemData)
    // itemData && this.setData({ itemData })
  },
  itemDetail: function (e) {
    wx.navigateTo({
      url: 'detail?id=' + e.currentTarget.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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