const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function padTimeNumber(num: number): string {
  const numStr = '00' + num;

  return numStr.substring(numStr.length - 2);
}

export function humanTimeExpression(date: Date): string {
  const delta = Math.round((+new Date - (+date)) / 1000);

  if (delta < 30) {
    return 'now';
  }

  if (delta < MINUTE) {
    return delta + ' seconds ago';
  }

  if (delta < 2 * MINUTE) {
    return 'a minute ago';
  }

  if (delta < HOUR) {
    return Math.floor(delta / MINUTE) + ' minutes ago';
  }

  if (Math.floor(delta / HOUR) === 1) {
    return 'an hour ago';
  }

  if (delta < DAY) {
    return Math.floor(delta / HOUR) + ' hours ago';
  }

  if (delta < DAY * 2) {
    return 'yesterday';
  }

  return `${date.getDate()}, ${MONTHS[date.getMonth()]} at ${padTimeNumber(date.getHours())}:${padTimeNumber(date.getMinutes())}`;
}
