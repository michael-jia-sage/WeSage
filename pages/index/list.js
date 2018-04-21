// pages/index/list.js
const App = getApp()
const util = require('../../utils/util.js')
import mockTransactions from './mock.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myTransactions: [],
    selected: 0,
    subtotal: 0,
    disabled: true
  },

  touchS: function (e) {  // touchstart
    let startX = App.Touches.getClientX(e)
    startX && this.setData({ startX })
  },
  touchM: function (e) {  // touchmove
    let myTransactions = App.Touches.touchM(e, this.data.myTransactions, this.data.startX)
    myTransactions && this.setData({ myTransactions })

  },
  touchE: function (e) {  // touchend
    const width = 300  // 定义操作列表宽度
    let myTransactions = App.Touches.touchE(e, this.data.myTransactions, this.data.startX, width)
    myTransactions && this.setData({ myTransactions })
  },
  itemViewSync: function (e) {
    App.globalData.trans = this.data.myTransactions[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: 'detail'
    })
  },
  itemSelect: function (e) {
    var idx = e.currentTarget.dataset.index
    var trans = this.data.myTransactions[idx]
    trans.selected = !trans.selected
    trans.style = util.trxStyle(trans)
    this.setData({ myTransactions: this.data.myTransactions })
    var times = trans.amount_style == 'plus' ? 1 : -1
    if (trans.selected) {
      this.setData({ 
        selected: this.data.selected + 1, 
        subtotal: this.data.subtotal + times * Number(trans.amount) 
      })
    } else {
      this.setData({ 
        selected: this.data.selected - 1, 
        subtotal: this.data.subtotal - times * Number(trans.amount)
      })
    }
    this.setData({ disabled: this.data.selected <= 0 })
  },

  selectAll: function (e) {
    var myTransactions = this.data.myTransactions
    var selected = myTransactions.length, subtotal = 0
    for (let i = 0; i < selected; i++) {
      myTransactions[i].selected = true
      myTransactions[i].style = util.trxStyle(myTransactions[i])
      if (myTransactions[i].amount_style == 'plus') {
        subtotal += Number(myTransactions[i].amount)
      } else {
        subtotal -= Number(myTransactions[i].amount)
      }
    }
    this.setData({ selected, subtotal, myTransactions })
  },

  unselectAll: function (e) {
    var myTransactions = this.data.myTransactions
    for (let i = 0; i < myTransactions.length; i++) {
      myTransactions[i].selected = false
      myTransactions[i].style = util.trxStyle(myTransactions[i])
    }
    this.setData({ selected: 0, subtotal: 0, myTransactions })
  },

  showAll: function (e) {
    for (let i = 0; i < mockTransactions.length; i++) {
      mockTransactions[i] = util.trxInitial(mockTransactions[i])
    }
    this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions: mockTransactions })
  },

  showReceive: function (e) {
    var myTransactions = []
    for (let i = 0; i < mockTransactions.length; i++) {
      if (mockTransactions[i].trans_type == 'receive') {
        myTransactions.push(util.trxInitial(mockTransactions[i]))
      }
    }
    this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions })
  },

  showPayments: function (e) {
    var myTransactions = []
    for (let i = 0; i < mockTransactions.length; i++) {
      if (mockTransactions[i].trans_type == 'pay') {
        myTransactions.push(util.trxInitial(mockTransactions[i]))
      }
    }
    this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions })
  },

  sortByDate: function (e) {
    this.setData({
      myTransactions: this.data.myTransactions.sort(util.compareTrxDate)
    })
  },

  sortByAmount: function (e) {
    this.setData({
      myTransactions: this.data.myTransactions.sort(util.compareTrxAmount)
    })
  },

  sortByMemo: function (e) {
    this.setData({
      myTransactions: this.data.myTransactions.sort(util.compareTrxMemo)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (let i = 0; i < mockTransactions.length; i++) {
      mockTransactions[i] = util.trxInitial(mockTransactions[i])
    }
    this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions: mockTransactions })
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