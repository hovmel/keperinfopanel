export const getFormattedTimeNow = () => {
  const now = new Date();
  return (
    now.getDate() +
    '.' +
    (now.getMonth() + 1) +
    '.' +
    now.getFullYear() +
    ' ' +
    now.getHours() +
    ':' +
    now.getMinutes() +
    ':' +
    now.getSeconds()
  );
};

export const extractDateFromSessionItem = item => {
  let date = '';
  if (
    item.PROPERTY_START_SESSION_VALUE &&
    item.PROPERTY_START_SESSION_VALUE.length > 0
  ) {
    date = item.PROPERTY_START_SESSION_VALUE.split(' ')[0];
  } else if (
    item.PROPERTY_STOP_SESSION_VALUE &&
    item.PROPERTY_STOP_SESSION_VALUE.length > 0
  ) {
    date = item.PROPERTY_STOP_SESSION_VALUE.split(' ')[0];
  } else {
    return null;
  }
  let year = date.split('.')[2];
  let day = parseInt(date.split('.')[0], 10);
  let monthIndex = parseInt(date.split('.')[1], 10);
  return new Date(year, monthIndex - 1, day);
};
