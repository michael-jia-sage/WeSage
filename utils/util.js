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
  else if (trx.filtered || trx.synced) { return 'hidden'; }
  else return ''
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  trxAmountStyle: trxAmountStyle,
  trxStyle: trxStyle
}
