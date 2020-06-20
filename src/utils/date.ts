const addZero = (number: number) => {
  if (number < 10) return `0${number}`;
  return `${number}`;
};

const getFormattedDate = (date: Date) => {
  return `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${addZero(
    date.getFullYear()
  )}`;
};

const getIssueTimeFormat = (date: Date) => {
  return `${addZero(date.getMonth() + 1)}/${addZero(date.getDate())}/${addZero(
    date.getFullYear()
  )}`;
};

export { getFormattedDate, getIssueTimeFormat };
