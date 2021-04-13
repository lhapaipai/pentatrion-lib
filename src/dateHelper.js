function pad(number) {
  if ( number < 10 ) {
    return '0' + number;
  }
  return number;
}

export function toIsoString(datetime, complete = false) {
  let dateStr = datetime.getUTCFullYear() +
    '-' + pad( datetime.getUTCMonth() + 1 ) +
    '-' + pad( datetime.getUTCDate() );
  if (!complete) {
    return dateStr;
  }
  return dateStr +
  'T' + pad( datetime.getUTCHours() ) +
  '-' + pad( datetime.getUTCMinutes() );
}