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

const compareTrxDateAsc = (trx1, trx2) => {
  return compareTrxDate(trx1.date_time, trx2.date_time, 'asc');
}
const compareTrxDateDesc = (trx1, trx2) => {
  return compareTrxDate(trx1.date_time, trx2.date_time, 'desc');
}
const compareTrxDate = (date_time1, date_time2, order) => {
  if (date_time1 < date_time2) {
    return order == 'asc' ? -1 : 1;
  }
  if (date_time1 > date_time2) {
    return order == 'asc' ? 1 : -1;
  }
  return 0;
}

const compareTrxAmountAsc = (trx1, trx2) => {
  return compareTrxAmount(trx1.amount, trx2.amount, 'asc');
}
const compareTrxAmountDesc = (trx1, trx2) => {
  return compareTrxAmount(trx1.amount, trx2.amount, 'desc');
}
const compareTrxAmount = (amount1, amount2, order) => {
  if (Number(amount1) < Number(amount2)) {
    return order == 'asc' ? -1 : 1;
  }
  if (Number(amount1) > Number(amount2)) {
    return order == 'asc' ? 1 : -1;
  }
  return 0;
}


const compareTrxMemoAsc = (trx1, trx2) => {
  return compareTrxMemo(trx1.memo, trx2.memo, 'asc');
}
const compareTrxMemoDesc = (trx1, trx2) => {
  return compareTrxMemo(trx1.memo, trx2.memo, 'desc');
}
const compareTrxMemo = (memo1, memo2, order) => {
  if (memo1 < memo2) {
    return order == 'asc' ? -1 : 1;
  }
  if (memo1 > memo2) {
    return order == 'asc' ? 1 : -1;
  }
  return 0;
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  trxAmountStyle: trxAmountStyle,
  trxStyle: trxStyle,
  trxInitial: trxInitial,
  compareTrxDateAsc: compareTrxDateAsc,
  compareTrxDateDesc: compareTrxDateDesc,
  compareTrxAmountAsc: compareTrxAmountAsc,
  compareTrxAmountDesc: compareTrxAmountDesc,
  compareTrxMemoAsc: compareTrxMemoAsc,
  compareTrxMemoDesc: compareTrxMemoDesc
}
