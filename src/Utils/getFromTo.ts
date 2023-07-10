import moment from 'moment';

export default (val: string) => {
  let from = '';
  let to = moment().toISOString();
  const zone = 'Z';
  const offsetInMinutes = new Date().getTimezoneOffset();
  const offsetInHours = offsetInMinutes / -60;
  const nineHoursEarlier =
    moment()
      .subtract(9 + offsetInHours, 'hours')
      .toISOString()
      .split('.')[0] + zone;

  if (val === 'today') {
    from = moment(nineHoursEarlier).format('YYYY-MM-DDT09:00:00') + zone;
  } else if (val === 'yesterday') {
    from =
      moment(nineHoursEarlier)
        .subtract(1, 'days')
        .format('YYYY-MM-DDT09:00:00') + zone;
    to = moment(nineHoursEarlier).format('YYYY-MM-DDT09:00:00') + zone;
  } else if (val === 'last_week') {
    from =
      moment(nineHoursEarlier)
        .subtract(7, 'days')
        .format('YYYY-MM-DDT09:00:00') + zone;
  } else if (val === 'last_month') {
    from =
      moment(nineHoursEarlier)
        .subtract(1, 'month')
        .format('YYYY-MM-DDT09:00:00') + zone;
  }

  return [from, to];
};
