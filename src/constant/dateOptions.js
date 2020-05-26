export const YEAR_OPTIONS = (() => {
  let today = new Date().getFullYear()
  //1970 ~ today
  let startDay = 1970
  let arr = []
  for (let i = startDay; i <= today; i ++) {
    arr.push(i)
  }
  return arr.reverse()
})()

export const MONTH_OPTIONS = [
  {
    key: 1,
    value: 'January',
  },
  {
    key: 2,
    value: 'February',
  },
  {
    key: 3,
    value: 'March',
  },
  {
    key: 4,
    value: 'April',
  },
  {
    key: 5,
    value: 'May',
  },
  {
    key: 6,
    value: 'June',
  },
  {
    key: 7,
    value: 'July',
  },
  {
    key: 8,
    value: 'August',
  },
  {
    key: 9,
    value: 'September',
  },
  {
    key: 10,
    value: 'October',
  },
  {
    key: 11,
    value: 'November',
  },
  {
    key: 12,
    value: 'December',
  },
].reverse()