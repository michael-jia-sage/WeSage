// pages/index/Invoices.js
const App = getApp()
const util = require('../../utils/util.js')
// import mockTransactions from './mock_invoices.js'
var mockTransactions = []
var sprintf = require('../../utils/sprintf.js').sprintf

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myTransactions: [],
    selected: 0,
    subtotal: 0,
    disabled: true,
    sortBy: 'date',
    sortOrder: 'desc'
  },

  itemSelect: function (e) {
  },

  showAll: function (e) {
    for (let i = 0; i < mockTransactions.length; i++) {
      mockTransactions[i] = util.trxInitial(mockTransactions[i])
    }
    this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions: mockTransactions })
  },

  showPaid: function (e) {
    var myTransactions = []
    for (let i = 0; i < mockTransactions.length; i++) {
      if (mockTransactions[i].trans_type == 'Paid') {
        myTransactions.push(util.trxInitial(mockTransactions[i]))
      }
    }
    this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions })
  },

  showUnPaid: function (e) {
    var myTransactions = []
    for (let i = 0; i < mockTransactions.length; i++) {
      if (mockTransactions[i].trans_type == 'UnPaid') {
        myTransactions.push(util.trxInitial(mockTransactions[i]))
      }
    }
    this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions })
  },

  sortByDate: function (e) {
    var sortedTrans = []
    var sortOrder = 'desc'
    if (this.data.sortBy != 'date' || this.data.sortOrder == 'asc') {
      sortedTrans = this.data.myTransactions.sort(util.compareTrxDateDesc)
    } else {
      sortOrder = 'asc'
      sortedTrans = this.data.myTransactions.sort(util.compareTrxDateAsc)
    }
    this.setData({
      sortBy: 'date',
      sortOrder: sortOrder,
      myTransactions: sortedTrans
    })
  },

  sortByAmount: function (e) {
    var sortedTrans = []
    var sortOrder = 'desc'
    if (this.data.sortBy != 'amount' || this.data.sortOrder == 'asc') {
      sortedTrans = this.data.myTransactions.sort(util.compareTrxAmountDesc)
    } else {
      sortOrder = 'asc'
      sortedTrans = this.data.myTransactions.sort(util.compareTrxAmountAsc)
    }
    this.setData({
      sortBy: 'amount',
      sortOrder: sortOrder,
      myTransactions: sortedTrans
    })
  },

  sortByCust: function (e) {
    var sortedTrans = []
    var sortOrder = 'asc'
    if (this.data.sortBy != 'memo' || this.data.sortOrder == 'desc') {
      sortedTrans = this.data.myTransactions.sort(util.compareTrxMemoAsc)
    } else {
      sortOrder = 'desc'
      sortedTrans = this.data.myTransactions.sort(util.compareTrxMemoDesc)
    }
    this.setData({
      sortBy: 'memo',
      sortOrder: sortOrder,
      myTransactions: sortedTrans
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    mockTransactions = App.globalData.realInvoices
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