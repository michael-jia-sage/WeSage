// pages/index/list.js
const App = getApp()
const util = require('../../utils/util.js')
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
        subtotal: (Number(this.data.subtotal) + times * Number(trans.amount)).toFixed(2)
      })
    } else {
      this.setData({ 
        selected: this.data.selected - 1, 
        subtotal: (Number(this.data.subtotal) - times * Number(trans.amount)).toFixed(2)
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
    this.setData({ selected, subtotal: subtotal.toFixed(2), myTransactions })
    this.setData({ disabled: this.data.selected <= 0 })
  },

  unselectAll: function (e) {
    var myTransactions = this.data.myTransactions
    for (let i = 0; i < myTransactions.length; i++) {
      myTransactions[i].selected = false
      myTransactions[i].style = util.trxStyle(myTransactions[i])
    }
    this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions })
  },

  showAll: function (e) {
    var mockTransactions = App.globalData.mockTransactions
    for (let i = 0; i < mockTransactions.length; i++) {
      mockTransactions[i].displayed = true
    }
    App.globalData.mockTransactions = mockTransactions
    this.onLoad()
    // for (let i = 0; i < mockTransactions.length; i++) {
    //   mockTransactions[i] = util.trxInitial(mockTransactions[i])
    // }
    // this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions: mockTransactions })
  },

  showReceive: function (e) {
    // var myTransactions = []
    var mockTransactions = App.globalData.mockTransactions
    for (let i = 0; i < mockTransactions.length; i++) {
      // if (mockTransactions[i].trans_type == 'receive') {
        // myTransactions.push(util.trxInitial(mockTransactions[i]))
      // }
      mockTransactions[i].displayed = mockTransactions[i].trans_type == 'receive'
    }
    // this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions })
    App.globalData.mockTransactions = mockTransactions
    this.onLoad()
  },

  showPayments: function (e) {
    // var myTransactions = []
    var mockTransactions = App.globalData.mockTransactions
    for (let i = 0; i < mockTransactions.length; i++) {
      // if (mockTransactions[i].trans_type == 'pay') {
      //   myTransactions.push(util.trxInitial(mockTransactions[i]))
      // }
      mockTransactions[i].displayed = mockTransactions[i].trans_type == 'pay'
    }
    // this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions })
    App.globalData.mockTransactions = mockTransactions
    this.onLoad()
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

  sortByMemo: function (e) {
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

  syncSelected: function (e) {
    // prepare data
    var res = 'nothing'
    var trans = null
    var rData = ''
    var singleTrans = ''
    var firstTrans = true
    
    for (let i = 0; i < this.data.myTransactions.length; i++) {
      trans = this.data.myTransactions[i]
      if (trans.selected) {
        singleTrans = sprintf('{"date_time": "%1s", "trans_type": "%2s", "trans_id": "%3s", "amount": "%4s", "memo": "%5s"}', trans.data_time, trans.trans_type, trans.trans_id, trans.amount, trans.memo)
        if (firstTrans) {
          firstTrans = false
          rData = singleTrans
        } else {
          rData = rData + ',' + singleTrans
        }
      }
    }
    rData = sprintf('{"trans": [%1s]}', rData)
    console.log('send data is:', rData)

    // call API to sync
    var that = this
    wx.request({
      // wfa-api request test url
      url: 'https://lyh-api.gameharbor.com.cn/wesage',
      method: "GET",
      dataType: "json",
      data: rData,
      success: function (result) {
        console.log("result data is:", result.data)
        res = result.data.value
        // show results
        wx.showModal({
          title: 'Sync Completed',
          content: 'Transactions have been synced to Sage Accounting.',
          showCancel: false,
          confirmText: 'Okay',
          success: function (res) {
          }
        })
        // remove synced transactions
        var myTransactions = that.data.myTransactions
        var mockTransactions = App.globalData.mockTransactions
        for (let i = 0; i < myTransactions.length; i++) {
          if (myTransactions[i].selected) {
            for (let j = 0; j < mockTransactions.length; j++) {
              if (myTransactions[i].id == mockTransactions[j].id) {
                mockTransactions[j].synced = true
              }
            }
          }
        }
        App.globalData.mockTransactions = mockTransactions
        // that.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions: newTransactions })
        that.onLoad()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myTransactions = []
    var mockTransactions = App.globalData.mockTransactions
    for (let i = 0; i < mockTransactions.length; i++) {
      if (!mockTransactions[i].synced && mockTransactions[i].displayed) {
        myTransactions.push(util.trxInitial(mockTransactions[i]))
      }
    }
    this.setData({ selected: 0, subtotal: 0, disabled: true, myTransactions })
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
    this.onLoad()
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