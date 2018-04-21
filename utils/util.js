const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const trxAmountStyle = trxType => {
  switch (trxType) {
    case 'pay':
    case 'transfer':
      return 'minus';
      break;
    default:
      return 'plus';
  }
}

const trxStyle = trx => {
  if (trx.selected) { return 'selected'; }
  else if (!trx.displayed || trx.synced) { return 'hidden'; }
  else return ''
}

const trxInitial = trx => {
  trx.selected = false
  trx.displayed = true
  trx.synced = false
  trx.amount_style = trxAmountStyle(trx.trans_type)
  trx.style = trxStyle(trx)
  return trx
}

const compareTrxDate = (trx1, trx2) => {
  if (trx1.date_time < trx2.date_time) {
    return -1;
  }
  if (trx1.date_time > trx2.date_time) {
    return 1;
  }
  return 0;
}

const compareTrxAmount = (trx1, trx2) => {
  if (Number(trx1.amount) < Number(trx2.amount)) {
    return -1;
  }
  if (Number(trx1.amount) > Number(trx2.amount)) {
    return 1;
  }
  return 0;
}

const compareTrxMemo = (trx1, trx2) => {
  if (trx1.memo < trx2.memo) {
    return -1;
  }
  if (trx1.memo > trx2.memo) {
    return 1;
  }
  return 0;
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  trxAmountStyle: trxAmountStyle,
  trxStyle: trxStyle,
  trxInitial: trxInitial,
  compareTrxDate: compareTrxDate,
  compareTrxAmount: compareTrxAmount,
  compareTrxMemo: compareTrxMemo
}
