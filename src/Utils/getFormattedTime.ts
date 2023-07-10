import moment from 'moment';

export default (time, countryCode = 'en') => {
  if (!time) {
    return;
  }
  const formattedTime = moment(time);
  return formattedTime.format(
    countryCode === 'en' ? 'DD/MM/YYYY h:mm A' : 'DD/MM/YYYY HH:mm',
  );
};
