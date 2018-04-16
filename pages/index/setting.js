// pages/index/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inv_ledgers: ['4500: Ledger1', '4600: Ledger2', '4700: Ledger3', '4800: Ledger4', '4900: Ledger5', '5000: Ledger6', '5100: Ledger7', '5200: Ledger8'],
    inv_index: 0,
    pay_ledgers: ['9500: Ledger1', '9600: Ledger2', '9700: Ledger3', '9800: Ledger4', '9900: Ledger5', '9000: Ledger6', '9100: Ledger7', '9200: Ledger8'],
    pay_index: 0
  },

  bindInvLedgerPickerChange: function (e) {
    console.log('invoice ledger selection changes to ', e.detail.value)
    this.setData({
      inv_index: e.detail.value
    })
  },
  bindPayLedgerPickerChange: function (e) {
    console.log('payment ledger selection changes to ', e.detail.value)
    this.setData({
      pay_index: e.detail.value
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